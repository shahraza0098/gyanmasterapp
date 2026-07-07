/**
 * Course information shown on the lesson screen.
 */
export interface LessonCourse {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  level: string;
}

/**
 * Section containing the current lesson.
 */
export interface LessonSection {
  id: string;
  title: string;
}

/**
 * Previous / Next lesson.
 */
export interface LessonNavigationItem {
  id: string;
  title: string;
  slug: string;
  duration: number;
  sectionId: string;
  sectionTitle: string;
}

/**
 * Progress for the current lesson.
 */
export interface LessonProgress {
  watchedSeconds: number;
  completed: boolean;
}

/**
 * Complete lesson returned from
 * GET /api/student/lesson/:lessonId
 */
export interface Lesson {
  id: string;

  title: string;

  slug: string;

  description: string | null;

  duration: number;

  thumbnailUrl: string | null;

  /**
   * Bunny signed HLS stream URL.
   */
  streamUrl: string;

  /**
   * Bunny video id.
   */
  videoId?: string;

  watchedSeconds: number;

  completed: boolean;

  course: LessonCourse;

  section: LessonSection;

  previousLesson: LessonNavigationItem | null;

  nextLesson: LessonNavigationItem | null;
}

/**
 * API Response
 */
export interface LessonResponse {
  message: string;
  data: Lesson;
}

/**
 * Progress API Request
 */
export interface UpdateLessonProgressRequest {
  lessonId: string;
  watchedSeconds: number;
}

/**
 * POST /api/student/progress response
 */
export interface UpdateLessonProgressResponse {
  message: string;

  data: {
    lessonId: string;

    watchedSeconds: number;

    completed: boolean;

    courseProgress: number;

    completedLessons: number;

    totalLessons: number;
  };
}