import api from "./api";
import { AxiosError } from "axios";

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  key?: string;
  keyId?: string;
  trialAmount?: number;
  monthlyAmount?: number;
  trialDays?: number;
  trialEndAt?: string;
  plan?: {
    id: string;
    name: string;
    description: string;
    price: number;
    trialAmount: number;
    trialDays: number;
  };
}

export interface VerifySubscriptionPayload {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface VerifySubscriptionResponse {
  ok: boolean;
  status: string;
}

export interface SubscriptionConflictError {
  error?: string;
  message?: string;
  status?: string; // e.g. "ACTIVE", "AUTHENTICATED"
}

interface CreateSubscriptionApiResponse {
  message: string;
  data: CreateSubscriptionResponse;
}

export async function createSubscription(planId?: string) {
  try {
    const response = await api.post<CreateSubscriptionApiResponse>(
      "/subscription/create",
      planId ? { planId } : {}
    );
    return response.data.data;
  } catch (err) {
    const axiosErr = err as AxiosError<SubscriptionConflictError>;
    if (axiosErr.response?.status === 409) {
      const existingStatus =
        axiosErr.response.data?.status ?? "UNKNOWN";
      throw new Error(`ALREADY_SUBSCRIBED:${existingStatus}`);
    }
    throw err;
  }
}

export async function verifySubscription(payload: VerifySubscriptionPayload) {
  const response = await api.post<VerifySubscriptionResponse>(
    "/subscription/verify",
    payload
  );
  return response.data;
}

export async function cancelSubscription() {
  const response = await api.post<{ ok: boolean }>(
    "/subscription/cancel"
  );
  return response.data;
}
