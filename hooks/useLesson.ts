import { useCallback, useEffect, useRef, useState } from "react";

import LessonService from "@/services/lesson.service";

import type { Lesson } from "@/types/lesson";

interface UseLessonReturn {
  lesson: Lesson | null;

  loading: boolean;

  refreshing: boolean;

  error: string | null;

  refresh: () => Promise<void>;
}

export function useLesson(
  lessonId: string
): UseLessonReturn {
  const [lesson, setLesson] =
    useState<Lesson | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /**
   * Prevent state updates after unmount.
   */
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchLesson = useCallback(
    async (isRefresh = false) => {
      if (!lessonId) return;

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const data =
          await LessonService.getLesson(
            lessonId
          );

        if (!mountedRef.current) return;

        setLesson(data);
      } catch (err: any) {
        if (!mountedRef.current) return;

        setError(
          err?.response?.data?.message ??
            err?.message ??
            "Failed to load lesson."
        );
      } finally {
        if (!mountedRef.current) return;

        setLoading(false);
        setRefreshing(false);
      }
    },
    [lessonId]
  );

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  const refresh = useCallback(async () => {
    await fetchLesson(true);
  }, [fetchLesson]);

  return {
    lesson,

    loading,

    refreshing,

    error,

    refresh,
  };
}