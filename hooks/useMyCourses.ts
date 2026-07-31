import { useCallback, useEffect, useState } from "react";

import { getMyCourses } from "@/services/mycourse.service";

import { MyCoursesResponse } from "@/types/MyCourse";
import { getErrorMessage } from "@/utils/errorMessages";

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
    } catch (err: unknown) {
      console.log(err);

      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await loadCourses();
  }, [loadCourses]);

  return {
    courses,

    loading,

    refreshing,

    error,

    refresh,
  };
}