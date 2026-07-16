import { Subscription } from "@/types/Student";

const ACTIVE_STATUSES = [
  "AUTHENTICATED",
  "ACTIVE",
];

export function hasPlatformAccess(
  subscription?: Subscription | null
) {
  if (!subscription) {
    return false;
  }

  if (
    !ACTIVE_STATUSES.includes(
      subscription.status
    )
  ) {
    return false;
  }

  const now = new Date();

  /**
   * Trial
   */
  if (subscription.trialEndAt) {
    return (
      new Date(subscription.trialEndAt) >
      now
    );
  }

  /**
   * Paid Subscription
   */
  if (subscription.currentPeriodEnd) {
    return (
      new Date(
        subscription.currentPeriodEnd
      ) > now
    );
  }

  return false;
}

export function isTrialActive(
  subscription?: Subscription | null
) {
  if (!subscription?.trialEndAt) {
    return false;
  }

  return (
    new Date(subscription.trialEndAt) >
    new Date()
  );
}

export function isSubscriptionActive(
  subscription?: Subscription | null
) {
  if (
    !subscription?.currentPeriodEnd
  ) {
    return false;
  }

  return (
    new Date(
      subscription.currentPeriodEnd
    ) > new Date()
  );
}

export function getRemainingTrialDays(
  subscription?: Subscription | null
) {
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
) {
  if (!subscription) {
    return null;
  }

  return (
    subscription.nextChargeAt ??
    subscription.currentPeriodEnd ??
    null
  );
}