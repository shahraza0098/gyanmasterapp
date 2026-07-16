// useSubscription.ts
import { useState } from "react";
import {
  createSubscription,
  CreateSubscriptionResponse,
} from "@/services/subscription.service";

export function useSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (planId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data: CreateSubscriptionResponse = await createSubscription(planId);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
}