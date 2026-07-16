import api from "./api";

import type {
  Lesson,
  LessonResponse,
  UpdateLessonProgressResponse,
} from "@/types/lesson";

class LessonService {
  /**
   * Fetch a lesson with:
   * - Bunny Stream URL
   * - Previous / Next lesson
   * - User progress
   */
  async getLesson(
    lessonId: string
  ): Promise<Lesson> {
    const response =
      await api.get<LessonResponse>(
        `/student/lesson/${lessonId}`
      );

    return response.data.data;
  }

  /**
   * Update lesson progress.
   */
  async updateProgress(
    lessonId: string,
    watchedSeconds: number
  ) {
    const response =
      await api.post<UpdateLessonProgressResponse>(
        "/progress",
        {
          lessonId,
          watchedSeconds,
        }
      );

    return response.data.data;
  }
}

export default new LessonService();