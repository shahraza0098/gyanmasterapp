import { useCallback, useEffect, useState } from "react";

import { getProfile } from "@/services/profile.service";

import { Profile } from "@/types/profile";
import { getErrorMessage } from "@/utils/errorMessages";

export function useProfile() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadProfile =
    useCallback(async () => {
      try {
        setError(null);
        const data = await getProfile();
        setProfile(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await loadProfile();
  }, [loadProfile]);

  return {
    profile,

    loading,

    refreshing,

    error,

    refresh,
  };
}