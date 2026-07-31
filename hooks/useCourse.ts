import {
  useCallback,
  useEffect,
  useState,
} from "react";

import CourseService from "@/services/course.service";

import { CourseDetails } from "@/types/course";
import { getErrorMessage } from "@/utils/errorMessages";

export function useCourse(courseId: string) {
  const [course, setCourse] =
    useState<CourseDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      setError(null);

      const data =
        await CourseService.getCourse(
          courseId
        );

      setCourse(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await fetchCourse();
  }, [fetchCourse]);

  return {
    course,

    loading,

    refreshing,

    error,

    refresh,
  };
}