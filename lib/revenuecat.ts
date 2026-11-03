/**
 * RevenueCat service — isolated helper for Google Play subscriptions.
 *
 * Uses the already-installed react-native-purchases (v10.11.0).
 * API key comes from EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY.
 */

import { Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  type PurchasesPackage,
  type SubscriptionOption,
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
} from "react-native-purchases";

// ── Constants ──────────────────────────────────────────────────────
const ENTITLEMENT_ID = "gyanmaster_premium";

// ── Configuration ──────────────────────────────────────────────────

/** Purchases.configure has run in this app process (it must run only once). */
let sdkConfigured = false;

/** A signed-in user is active in RevenueCat. */
let isConfigured = false;

/**
 * Configure RevenueCat with the authenticated Clerk user ID.
 * The first call configures the SDK; after a logout, later calls switch
 * identity with Purchases.logIn instead of configuring again.
 * Safe to call multiple times while the same user is signed in.
 */
export async function configureRevenueCat(
  clerkUserId: string
): Promise<void> {
  if (isConfigured) return;

  if (sdkConfigured) {
    await Purchases.logIn(clerkUserId);
    isConfigured = true;
    return;
  }

  const apiKey =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY
      : undefined;

  if (!apiKey) {
    console.warn(
      "[RevenueCat] No API key found for platform:",
      Platform.OS
    );
    return;
  }

  if (__DEV__) {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  }

  Purchases.configure({
    apiKey,
    appUserID: clerkUserId,
  });

  sdkConfigured = true;
  isConfigured = true;
}

/**
 * Switch RevenueCat identity on logout.
 * Resets to anonymous so next login gets a clean slate.
 */
export async function resetRevenueCat(): Promise<void> {
  if (!isConfigured) return;

  try {
    await Purchases.logOut();
  } catch {
    // logOut throws if already anonymous — safe to ignore
  }

  isConfigured = false;
  attributionSetup = null;
}

/**
 * Log in with a new Clerk user ID (e.g. after switching accounts).
 * This merges/creates the RevenueCat user identity.
 */
export async function loginRevenueCat(
  clerkUserId: string
): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.logIn(clerkUserId);
  return customerInfo;
}

// ── Attribution ────────────────────────────────────────────────────

// Max time a purchase waits for attribution setup before going ahead.
const ATTRIBUTION_WAIT_MS = 3000;

let attributionSetup: Promise<void> | null = null;

/**
 * Set the subscriber attributes RevenueCat's Meta Ads (Conversions API)
 * integration needs to match subscription events to this install:
 * - device identifiers ($gpsAdId, $androidId, $ip, …) via
 *   Purchases.collectDeviceIdentifiers()
 * - the Meta SDK anonymous ID ($fbAnonId) via Purchases.setFBAnonymousID()
 *
 * Runs once per configure; later calls return the same promise.
 * Never rejects — attribution is optional and must not block the app.
 * Identifier values are never logged.
 */
export function setupRevenueCatAttribution(
  getMetaAnonymousId: () => Promise<string | null>
): Promise<void> {
  if (!isConfigured) return Promise.resolve();

  if (!attributionSetup) {
    attributionSetup = (async () => {
      try {
        await Purchases.collectDeviceIdentifiers();
      } catch {
        console.warn("[RevenueCat] Could not collect device identifiers");
      }

      try {
        const anonymousId = (await getMetaAnonymousId())?.trim();
        if (anonymousId) {
          await Purchases.setFBAnonymousID(anonymousId);
        } else if (__DEV__) {
          console.log("[RevenueCat] Meta anonymous ID unavailable; skipped");
        }
      } catch {
        console.warn("[RevenueCat] Could not set Meta anonymous ID");
      }
    })();
  }

  return attributionSetup;
}

/**
 * Give in-flight attribution setup a short head start so the first
 * purchase carries the identifiers. Bounded, so a slow or failing
 * native call never holds up checkout.
 */
async function waitForAttributionSetup(): Promise<void> {
  if (!attributionSetup) return;

  let timer: ReturnType<typeof setTimeout> | undefined;
  await Promise.race([
    attributionSetup,
    new Promise<void>((resolve) => {
      timer = setTimeout(resolve, ATTRIBUTION_WAIT_MS);
    }),
  ]);
  clearTimeout(timer);
}

// ── Customer info ──────────────────────────────────────────────────

export async function getCustomerInfo(): Promise<CustomerInfo> {
  return Purchases.getCustomerInfo();
}

// ── Entitlement check ──────────────────────────────────────────────

export function hasGyanMasterPremium(
  customerInfo: CustomerInfo
): boolean {
  return (
    customerInfo.entitlements.active[ENTITLEMENT_ID] !==
    undefined
  );
}

/**
 * Convenience: fetch customer info and check entitlement in one call.
 */
export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const info = await getCustomerInfo();
    return hasGyanMasterPremium(info);
  } catch {
    return false;
  }
}

// ── Offerings / packages ───────────────────────────────────────────

export async function getMonthlyPackage(): Promise<PurchasesPackage | null> {
  const offerings = await Purchases.getOfferings();

  if (!offerings.current) {
    console.warn("[RevenueCat] No current offering");
    return null;
  }

  const monthly = offerings.current.monthly;

  if (!monthly) {
    console.warn(
      "[RevenueCat] No monthly package in current offering"
    );
    return null;
  }

  return monthly;
}

/**
 * Find the trial / promotional subscription option on Google Play.
 * Specifically looks for 'trial-1rs-3days' or options with an intro/free phase.
 */
export function getTrialSubscriptionOption(
  pkg: PurchasesPackage
): SubscriptionOption | null {
  const options = pkg.product.subscriptionOptions;
  if (!options || options.length === 0) return null;

  // 1. Match known offer ID from Google Play Console ("trial-1rs-3days")
  const byOfferId = options.find(
    (opt) =>
      opt.id.includes("trial-1rs-3days") ||
      opt.id.toLowerCase().includes("trial")
  );
  if (byOfferId) return byOfferId;

  // 2. Look for any option that has an introductory phase (e.g. ₹4 for 3 days)
  const byIntro = options.find((opt) => opt.introPhase !== null);
  if (byIntro) return byIntro;

  // 3. Look for any option with a free trial phase (if applicable)
  const byFree = options.find((opt) => opt.freePhase !== null);
  if (byFree) return byFree;

  // 4. Any non-base option
  const nonBase = options.find((opt) => !opt.isBasePlan);
  if (nonBase) return nonBase;

  return null;
}

// ── Purchase ───────────────────────────────────────────────────────

export interface PurchaseResult {
  success: boolean;
  customerInfo: CustomerInfo | null;
  isPremium: boolean;
  cancelled: boolean;
  errorMessage: string | null;
}

export async function purchaseMonthlyPackage(): Promise<PurchaseResult> {
  try {
    const monthly = await getMonthlyPackage();

    if (!monthly) {
      return {
        success: false,
        customerInfo: null,
        isPremium: false,
        cancelled: false,
        errorMessage:
          "Monthly subscription is currently unavailable. Please try again later.",
      };
    }

    await waitForAttributionSetup();

    let customerInfo: CustomerInfo;

    // On Android, explicitly target the trial offer option so Google Play
    // presents "₹4.00 for 3 days" with ₹499/mo autopay, rather than defaulting
    // to the immediate ₹499 base plan.
    const trialOption =
      Platform.OS === "android" ? getTrialSubscriptionOption(monthly) : null;

    if (trialOption) {
      console.log(
        "[RevenueCat] Purchasing specific trial subscription option:",
        trialOption.id,
        "pricingPhases:",
        trialOption.pricingPhases?.map((p) => ({
          price: p.price.formatted,
          period: `${p.billingPeriod.value} ${p.billingPeriod.unit}`,
        }))
      );
      const purchaseResult =
        await Purchases.purchaseSubscriptionOption(trialOption);
      customerInfo = purchaseResult.customerInfo;
    } else {
      console.log(
        "[RevenueCat] No specific trial option found, purchasing via purchasePackage"
      );
      const purchaseResult =
        await Purchases.purchasePackage(monthly);
      customerInfo = purchaseResult.customerInfo;
    }

    const isPremium = hasGyanMasterPremium(customerInfo);

    return {
      success: true,
      customerInfo,
      isPremium,
      cancelled: false,
      errorMessage: null,
    };
  } catch (error: unknown) {
    // RevenueCat error with userCancelled flag
    if (
      error &&
      typeof error === "object" &&
      "userCancelled" in error &&
      (error as { userCancelled: boolean }).userCancelled
    ) {
      return {
        success: false,
        customerInfo: null,
        isPremium: false,
        cancelled: true,
        errorMessage: null,
      };
    }

    // RevenueCat typed errors
    if (
      error &&
      typeof error === "object" &&
      "code" in error
    ) {
      const rcError = error as {
        code: string;
        message?: string;
      };

      switch (rcError.code) {
        case PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR:
          return {
            success: false,
            customerInfo: null,
            isPremium: false,
            cancelled: false,
            errorMessage:
              "Purchases are not allowed on this device.",
          };
        case PURCHASES_ERROR_CODE.PURCHASE_INVALID_ERROR:
          return {
            success: false,
            customerInfo: null,
            isPremium: false,
            cancelled: false,
            errorMessage:
              "This purchase is invalid. Please try again.",
          };
        case PURCHASES_ERROR_CODE.PRODUCT_ALREADY_PURCHASED_ERROR:
          return {
            success: false,
            customerInfo: null,
            isPremium: false,
            cancelled: false,
            errorMessage:
              "You already have an active subscription. Try restoring purchases.",
          };
        case PURCHASES_ERROR_CODE.NETWORK_ERROR:
          return {
            success: false,
            customerInfo: null,
            isPremium: false,
            cancelled: false,
            errorMessage:
              "Network error. Check your connection and try again.",
          };
        default:
          break;
      }
    }

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong with the purchase.";

    return {
      success: false,
      customerInfo: null,
      isPremium: false,
      cancelled: false,
      errorMessage: message,
    };
  }
}

// ── Restore purchases ──────────────────────────────────────────────

export interface RestoreResult {
  success: boolean;
  customerInfo: CustomerInfo | null;
  isPremium: boolean;
  errorMessage: string | null;
}

export async function restorePurchases(): Promise<RestoreResult> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = hasGyanMasterPremium(customerInfo);

    return {
      success: true,
      customerInfo,
      isPremium,
      errorMessage: null,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not restore purchases. Try again later.";

    return {
      success: false,
      customerInfo: null,
      isPremium: false,
      errorMessage: message,
    };
  }
}
