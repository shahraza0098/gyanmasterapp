import { useCallback, useEffect, useState } from "react";

import { getMyCourses } from "@/services/mycourse.service";

import { MyCoursesResponse } from "@/types/MyCourse";

export function useMyCourse() {
  const [courses, setCourses] =
    useState<MyCoursesResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      setError(null);

      const data = await getMyCourses();

      setCourses(data);
    } catch (error: any) {
      console.log(error);

      setError(
        error?.response?.data?.message ??
          "Failed to fetch courses."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const refresh = () => {
    setRefreshing(true);

    loadCourses();
  };

  return {
    courses,

    loading,

    refreshing,

    error,

    refresh,
  };
}