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
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
} from "react-native-purchases";

// ── Constants ──────────────────────────────────────────────────────
const ENTITLEMENT_ID = "gyanmaster_premium";

// ── Configuration ──────────────────────────────────────────────────

let isConfigured = false;

/**
 * Configure RevenueCat with the authenticated Clerk user ID.
 * Safe to call multiple times — subsequent calls are no-ops.
 */
export async function configureRevenueCat(
  clerkUserId: string
): Promise<void> {
  if (isConfigured) return;

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

  isConfigured = true;
  console.log(
    "[RevenueCat] Configured for user:",
    clerkUserId
  );
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

    const { customerInfo } =
      await Purchases.purchasePackage(monthly);

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
