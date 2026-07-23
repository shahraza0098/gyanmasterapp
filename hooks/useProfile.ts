import { useCallback, useEffect, useState } from "react";

import { getProfile } from "@/services/profile.service";

import { Profile } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadProfile =
    useCallback(async () => {
      try {
        setError("");
        const data =await getProfile();
        setProfile(data);
      } catch (error: any) {
        setError(
          error?.response?.data?.message ??
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const refresh = () => {
    setRefreshing(true);

    loadProfile();
  };

  return {
    profile,

    loading,

    refreshing,

    error,

    refresh,
  };
}