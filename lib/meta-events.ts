/**
 * Meta (Facebook) App Events — typed helpers around
 * react-native-fbsdk-next's AppEventsLogger (v13.4.3).
 *
 * Rules for everything in this file:
 * - Only stable, non-personal identifiers (course / lesson / product IDs).
 *   Never pass names, emails, phone numbers, Clerk tokens or payment data.
 * - Logging must never crash the app: every call is wrapped in try/catch
 *   and missing optional params are dropped.
 * - Subscription lifecycle events (StartTrial, Subscribe, Purchase) are
 *   sent to Meta by RevenueCat's Meta Ads integration (Conversions API).
 *   Do NOT log them from here, or Meta will count them twice.
 */

import { Platform } from "react-native";
import {
  AppEventsLogger,
  type Params,
} from "react-native-fbsdk-next";

// ── Event & parameter names ────────────────────────────────────────

/**
 * Standard event names. Values come from the native SDK constants;
 * the literal fallbacks match Meta's documented names and are used only
 * when the native module is unavailable (e.g. web, Expo Go), where
 * logging is a no-op anyway.
 */
const StandardEvents = {
  CompletedRegistration:
    AppEventsLogger.AppEvents?.CompletedRegistration ??
    "fb_mobile_complete_registration",
  ViewedContent:
    AppEventsLogger.AppEvents?.ViewedContent ?? "fb_mobile_content_view",
  InitiatedCheckout:
    AppEventsLogger.AppEvents?.InitiatedCheckout ??
    "fb_mobile_initiated_checkout",
} as const;

const StandardParams = {
  ContentType:
    AppEventsLogger.AppEventParams?.ContentType ?? "fb_content_type",
  ContentID: AppEventsLogger.AppEventParams?.ContentID ?? "fb_content_id",
  Currency: AppEventsLogger.AppEventParams?.Currency ?? "fb_currency",
  NumItems: AppEventsLogger.AppEventParams?.NumItems ?? "fb_num_items",
  RegistrationMethod:
    AppEventsLogger.AppEventParams?.RegistrationMethod ??
    "fb_registration_method",
} as const;

/**
 * Custom events — used only where Meta has no standard equivalent.
 * Names: letters, numbers, underscores, hyphens, spaces; max 40 chars.
 */
export const MetaCustomEvents = {
  Login: "Login",
  LessonStarted: "LessonStarted",
  LessonCompleted: "LessonCompleted",
} as const;

/** Custom parameter keys shared across events. */
const CustomParams = {
  CourseId: "course_id",
  LessonId: "lesson_id",
  CategoryId: "category_id",
  CourseLevel: "course_level",
} as const;

const ContentTypes = {
  Course: "course",
  Lesson: "lesson",
  Subscription: "subscription",
} as const;

// ── Core logger ────────────────────────────────────────────────────

type OptionalParams = Record<string, string | number | null | undefined>;

const IS_NATIVE = Platform.OS === "android" || Platform.OS === "ios";

/** Drop null/undefined/empty/non-finite values so the SDK never sees them. */
function cleanParams(params?: OptionalParams): Params {
  const clean: Params = {};

  if (!params) return clean;

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;

    if (typeof value === "number") {
      if (Number.isFinite(value)) clean[key] = value;
      continue;
    }

    const trimmed = value.trim();
    if (trimmed) clean[key] = trimmed;
  }

  return clean;
}

/**
 * Log any event safely. Prefer the typed helpers below; use this
 * directly only when adding a new event.
 */
export function logMetaEvent(
  eventName: string,
  params?: OptionalParams,
  valueToSum?: number
): void {
  if (!IS_NATIVE) return;

  try {
    const clean = cleanParams(params);

    if (typeof valueToSum === "number" && Number.isFinite(valueToSum)) {
      AppEventsLogger.logEvent(eventName, valueToSum, clean);
    } else {
      AppEventsLogger.logEvent(eventName, clean);
    }

    if (__DEV__) {
      console.log("[MetaEvents]", eventName, clean);
    }
  } catch (error) {
    if (__DEV__) {
      console.warn("[MetaEvents] Failed to log", eventName, error);
    }
  }
}

// ── Auth ───────────────────────────────────────────────────────────

/** Account fully created (Clerk sign-up + GyanMaster profile saved). */
export function logCompleteRegistration(options?: {
  method?: string;
}): void {
  logMetaEvent(StandardEvents.CompletedRegistration, {
    [StandardParams.RegistrationMethod]: options?.method,
  });
}

/** Returning user signed in interactively (not a restored session). */
export function logLogin(): void {
  logMetaEvent(MetaCustomEvents.Login);
}

// ── Content ────────────────────────────────────────────────────────

export interface CourseViewParams {
  courseId: string;
  categoryId?: string | null;
  level?: string | null;
}

/** Course details screen loaded successfully. */
export function logViewCourse({
  courseId,
  categoryId,
  level,
}: CourseViewParams): void {
  if (!courseId) return;

  logMetaEvent(StandardEvents.ViewedContent, {
    [StandardParams.ContentType]: ContentTypes.Course,
    [StandardParams.ContentID]: courseId,
    [CustomParams.CategoryId]: categoryId,
    [CustomParams.CourseLevel]: level,
  });
}

// ── Lessons ────────────────────────────────────────────────────────

export interface LessonEventParams {
  lessonId: string;
  courseId?: string | null;
}

function lessonParams({ lessonId, courseId }: LessonEventParams) {
  return {
    [StandardParams.ContentType]: ContentTypes.Lesson,
    [StandardParams.ContentID]: lessonId,
    [CustomParams.LessonId]: lessonId,
    [CustomParams.CourseId]: courseId,
  };
}

/** Video playback actually started for a lesson. */
export function logLessonStarted(params: LessonEventParams): void {
  if (!params.lessonId) return;
  logMetaEvent(MetaCustomEvents.LessonStarted, lessonParams(params));
}

/** Backend confirmed the lesson as completed. */
export function logLessonCompleted(params: LessonEventParams): void {
  if (!params.lessonId) return;
  logMetaEvent(MetaCustomEvents.LessonCompleted, lessonParams(params));
}

// ── Checkout ───────────────────────────────────────────────────────

export interface CheckoutParams {
  productId: string;
  price?: number | null;
  currency?: string | null;
}

/**
 * Google Play checkout is being launched for a subscription product.
 * RevenueCat does not send this event, so there is no duplication.
 */
export function logInitiateCheckout({
  productId,
  price,
  currency,
}: CheckoutParams): void {
  if (!productId) return;

  logMetaEvent(
    StandardEvents.InitiatedCheckout,
    {
      [StandardParams.ContentType]: ContentTypes.Subscription,
      [StandardParams.ContentID]: productId,
      [StandardParams.NumItems]: 1,
      [StandardParams.Currency]: currency,
    },
    price ?? undefined
  );
}

// ── Attribution ────────────────────────────────────────────────────

/**
 * Meta SDK anonymous app-user ID. RevenueCat's Meta Ads integration
 * needs it (via Purchases.setFBAnonymousID) to match server-side
 * subscription events to this install.
 */
export async function getMetaAnonymousId(): Promise<string | null> {
  if (!IS_NATIVE) return null;

  try {
    return await AppEventsLogger.getAnonymousID();
  } catch {
    return null;
  }
}
