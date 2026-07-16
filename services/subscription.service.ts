import api from "./api";
import { AxiosError } from "axios";

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  keyId: string;
  trialAmount: number;
  monthlyAmount: number;
  trialEndAt: string;
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
  error: string;
  status: string; // e.g. "ACTIVE", "AUTHENTICATED"
}

export async function createSubscription(planId?: string) {
  try {
    const response = await api.post<CreateSubscriptionResponse>(
      "/subscription/create",
      planId ? { planId } : {}
    );
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<SubscriptionConflictError>;
    if (axiosErr.response?.status === 409) {
      throw new Error(`ALREADY_SUBSCRIBED:${axiosErr.response.data.status}`);
    }
    throw err;
  }
}

export async function verifySubscription(payload: VerifySubscriptionPayload) {
  const response = await api.post<VerifySubscriptionResponse>(
    "/api/subscription/verify",
    payload
  );
  return response.data;
}

export async function cancelSubscription() {
  const response = await api.post<{ ok: boolean }>(
    "/api/subscription/cancel"
  );
  return response.data;
}
