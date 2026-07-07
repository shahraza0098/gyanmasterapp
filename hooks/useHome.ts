import { useCallback, useEffect, useState } from "react";

import HomeService from "@/services/home.service";
import { HomeResponse } from "@/types/home";

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
    } catch (err: any) {
      console.log("Home Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  const refresh = async () => {
    setRefreshing(true);

    await fetchHome();
  };

  return {
    home,

    user: home?.user,

    continueLearning: home?.continueLearning ?? null,

    categories: home?.categories ?? [],

    featuredCourses: home?.featuredCourses ?? [],

    popularCourses: home?.popularCourses ?? [],

    trendingCourses: home?.trendingCourses ?? [],

    loading,

    refreshing,

    error,

    refresh,
  };
}