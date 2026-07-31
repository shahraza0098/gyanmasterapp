import { useCallback, useEffect, useState } from "react";

import HomeService from "@/services/home.service";
import { HomeResponse } from "@/types/home";
import { getErrorMessage } from "@/utils/errorMessages";

export function useHome() {
  const [home, setHome] = useState<HomeResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchHome = useCallback(async () => {
    try {
      setError(null);

      const data = await HomeService.getHome();

      setHome(data);
    } catch (err: unknown) {
      console.log("Home Error:", err);

      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await fetchHome();
  }, [fetchHome]);

  return {
    home,

    user: home?.user,

    continueLearning: home?.continueLearning ?? null,

    categories: home?.categories ?? [],

    featuredCourses: home?.featuredCourses ?? [],

    allCourses: home?.allCourses ?? [],

    popularCourses: home?.popularCourses ?? [],

    trendingCourses: home?.trendingCourses ?? [],

    loading,

    refreshing,

    error,

    refresh,
  };
}
