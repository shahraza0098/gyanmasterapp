export interface MyCourseCategory {
  id: string;

  name: string;

  slug: string;

  bannerUrl: string | null;
}

export interface MyCourse {
  id: string;

  title: string;

  slug: string;

  description: string;

  thumbnailUrl: string;

  level: string;

  price: number;

  totalDuration: number;

  sectionCount: number;

  totalLessons: number;

  completedLessons: number;

  progress: number;

  completed: boolean;

  certificateAvailable: boolean;

  lastLessonId: string | null;

  category: MyCourseCategory;
}

export interface MyCourseStats {
  total: number;

  ongoing: number;

  completed: number;
}

export interface MyCoursesResponse {
  stats: MyCourseStats;

  all: MyCourse[];

  ongoing: MyCourse[];

  completed: MyCourse[];
}