import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

import LessonService from "@/services/lesson.service";
import { logLessonCompleted } from "@/lib/meta-events";

interface UseLessonPlayerParams {
  lessonId: string;
  duration: number;
  initialWatchedSeconds: number;
  /** Used only for analytics parameters. */
  courseId?: string;
  /** Lesson was already completed before this session. */
  initiallyCompleted?: boolean;
}

interface UseLessonPlayerReturn {
  watchedSeconds: number;

  completed: boolean;

  onTimeUpdate: (seconds: number) => void;

  onEnded: () => Promise<void>;

  saveNow: () => Promise<void>;
}

const SAVE_INTERVAL = 15;

const COMPLETION_PERCENTAGE = 90;

export function useLessonPlayer({
  lessonId,
  duration,
  initialWatchedSeconds,
  courseId,
  initiallyCompleted = false,
}: UseLessonPlayerParams): UseLessonPlayerReturn {
  /**
   * UI state
   */
  const [watchedSeconds, setWatchedSeconds] =
    useState(initialWatchedSeconds);

  /**
   * Internal refs
   */
  const currentPosition =
    useRef(initialWatchedSeconds);

  const lastSavedPosition =
    useRef(initialWatchedSeconds);

  const saving =
    useRef(false);

  /**
   * Meta LessonCompleted is logged once, when the backend first reports
   * this lesson as completed.
   */
  const completionLogged =
    useRef(initiallyCompleted);

  useEffect(() => {
    completionLogged.current = initiallyCompleted;
  }, [lessonId, initiallyCompleted]);

  /**
   * Reset when lesson changes
   */
  useEffect(() => {
    setWatchedSeconds(initialWatchedSeconds);

    currentPosition.current =
      initialWatchedSeconds;

    lastSavedPosition.current =
      initialWatchedSeconds;
  }, [lessonId, initialWatchedSeconds]);

  /**
   * Save helper
   */
  const saveProgress =
    useCallback(
      async (seconds: number) => {
        if (!lessonId) return;

        if (saving.current) return;

        saving.current = true;

        try {
          const result =
            await LessonService.updateProgress(
              lessonId,
              seconds
            );

          lastSavedPosition.current =
            seconds;

          if (
            result?.completed &&
            !completionLogged.current
          ) {
            completionLogged.current = true;
            logLessonCompleted({ lessonId, courseId });
          }
        } catch (error) {
          console.log(
            "Failed to save lesson progress",
            error
          );
        } finally {
          saving.current = false;
        }
      },
      [lessonId, courseId]
    );

  /**
   * Called every second from VideoPlayer
   */
  const onTimeUpdate =
    useCallback(
      (seconds: number) => {
        const safeSeconds = Math.min(
          Math.floor(seconds),
          duration
        );

        currentPosition.current =
          safeSeconds;

        setWatchedSeconds(safeSeconds);

        /**
         * Save every 15 seconds
         */
        if (
          safeSeconds -
            lastSavedPosition.current >=
          SAVE_INTERVAL
        ) {
          saveProgress(safeSeconds);
        }
      },
      [duration, saveProgress]
    );

  /**
   * Save immediately
   */
  const saveNow =
    useCallback(async () => {
      if (
        currentPosition.current >
        lastSavedPosition.current
      ) {
        await saveProgress(
          currentPosition.current
        );
      }
    }, [saveProgress]);

  /**
   * Lesson completed
   */
  const onEnded =
    useCallback(async () => {
      currentPosition.current =
        duration;

      setWatchedSeconds(duration);

      await saveProgress(duration);
    }, [duration, saveProgress]);

  /**
   * Save when app goes to background
   */
  useEffect(() => {
    const subscription =
      AppState.addEventListener(
        "change",
        async (
          state: AppStateStatus
        ) => {
          if (
            state === "background" ||
            state === "inactive"
          ) {
            await saveNow();
          }
        }
      );

    return () => {
      subscription.remove();
    };
  }, [saveNow]);

  /**
   * Save on unmount
   */
  useEffect(() => {
    return () => {
      saveNow();
    };
  }, [saveNow]);

  const completed =
    watchedSeconds >=
    Math.floor(
      (duration *
        COMPLETION_PERCENTAGE) /
        100
    );

  return {
    watchedSeconds,

    completed,

    onTimeUpdate,

    onEnded,

    saveNow,
  };
}