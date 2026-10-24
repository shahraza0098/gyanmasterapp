export type SubscriptionStatus =
  | "CREATED"
  | "AUTHENTICATED"
  | "ACTIVE"
  | "PAUSED"
  | "HALTED"
  | "CANCELLED"
  | "COMPLETED"
  | "EXPIRED";

export interface Plan {
  id: string;

  name: string;

  description?: string;

  trialDays: number;

  trialAmount: number;

  price: number;

  billingInterval: "MONTHLY" | "YEARLY";
}

export interface Subscription {
  id: string;

  status: SubscriptionStatus;

  razorpaySubscriptionId: string;

  trialStartAt?: string | null;

  trialEndAt?: string | null;

  currentPeriodStart?: string | null;

  currentPeriodEnd?: string | null;

  nextChargeAt?: string | null;

  cancelledAt?: string | null;

  provider?: string;
  revenueCatProductId?: string | null;
  willRenew?: boolean;

  plan?: Plan | null;
}

export interface Student {
  id: string;

  clerkUserId: string;

  name: string;

  email: string;

  phone?: string;

  username?: string;

  avatarUrl?: string;

  onboardingComplete: boolean;

  subscription?: Subscription | null;
}

export interface StudentResponse {
  message: string;

  data: {
    user: Student;
  };
}