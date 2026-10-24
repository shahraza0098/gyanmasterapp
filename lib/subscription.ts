// import { Subscription } from "@/types/Student";

// const ACTIVE_STATUSES = [
//   "AUTHENTICATED",
//   "ACTIVE",
// ];

// export function hasPlatformAccess(
//   subscription?: Subscription | null
// ) {
//   if (!subscription) {
//     return false;
//   }

//   if (!ACTIVE_STATUSES.includes(subscription.status)) {
//     return false;
//   }

//   const now = new Date();

//   /**
//    * Trial
//    */
//   if (subscription.trialEndAt) {
//     return (
//       new Date(subscription.trialEndAt) >
//       now
//     );
//   }

//   /**
//    * Paid Subscription
//    */
//   if (subscription.currentPeriodEnd) {
//     return (
//       new Date(
//         subscription.currentPeriodEnd
//       ) > now
//     );
//   }

//   return false;
// }

// export function isTrialActive(
//   subscription?: Subscription | null
// ) {
//   if (!subscription?.trialEndAt) {
//     return false;
//   }

//   return (
//     new Date(subscription.trialEndAt) >
//     new Date()
//   );
// }

// export function isSubscriptionActive(
//   subscription?: Subscription | null
// ) {
//   if (
//     !subscription?.currentPeriodEnd
//   ) {
//     return false;
//   }

//   return (
//     new Date(
//       subscription.currentPeriodEnd
//     ) > new Date()
//   );
// }

// export function getRemainingTrialDays(
//   subscription?: Subscription | null
// ) {
//   if (!subscription?.trialEndAt) {
//     return 0;
//   }

//   const end = new Date(
//     subscription.trialEndAt
//   );

//   const now = new Date();

//   const diff =
//     end.getTime() - now.getTime();

//   if (diff <= 0) {
//     return 0;
//   }

//   return Math.ceil(
//     diff / (1000 * 60 * 60 * 24)
//   );
// }

// export function getNextBillingDate(
//   subscription?: Subscription | null
// ) {
//   if (!subscription) {
//     return null;
//   }

//   return (
//     subscription.nextChargeAt ??
//     subscription.currentPeriodEnd ??
//     null
//   );
// }





//bug fixed(bug: first trial was checking)


import { Subscription } from "@/types/Student";

const BLOCKED_STATUSES = [
  "EXPIRED",
  "PAUSED",
  "HALTED",
  "CANCELLED",
  "COMPLETED",
];

function isWindowActive(
  start?: string | null,
  end?: string | null
): boolean {
  if (!end) return false;
  const now = new Date();
  if (new Date(end) <= now) return false;
  if (start && new Date(start) > now) return false;
  return true;
}

export function isTrialActive(
  subscription?: Subscription | null
): boolean {
  return isWindowActive(
    subscription?.trialStartAt,
    subscription?.trialEndAt
  );
}

export function isSubscriptionActive(
  subscription?: Subscription | null
): boolean {
  return isWindowActive(
    subscription?.currentPeriodStart,
    subscription?.currentPeriodEnd
  );
}

/**
 * Same rule as the backend (backend/src/lib/subscription-access.js).
 * Only used when the server's `access` field is missing.
 */
export function hasPlatformAccess(
  subscription?: Subscription | null
): boolean {
  if (!subscription) return false;

  if (BLOCKED_STATUSES.includes(subscription.status)) {
    return false;
  }

  return (
    isTrialActive(subscription) ||
    isSubscriptionActive(subscription)
  );
}

export function getRemainingTrialDays(
  subscription?: Subscription | null
): number {
  if (!subscription?.trialEndAt) {
    return 0;
  }

  const end = new Date(
    subscription.trialEndAt
  );

  const now = new Date();

  const diff =
    end.getTime() - now.getTime();

  if (diff <= 0) {
    return 0;
  }

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
}

export function getNextBillingDate(
  subscription?: Subscription | null
): string | null {
  if (!subscription) {
    return null;
  }

  return (
    subscription.nextChargeAt ??
    subscription.currentPeriodEnd ??
    null
  );
}