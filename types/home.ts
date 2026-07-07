export interface UserSummary {
  id: string;
  name: string;
  username: string;
  image?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  bannerUrl: string;
}

export interface CourseCard {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  description: string;
  level: string;
  price: number;
category: {
    id: string;
    name: string;
  };
  totalDuration: number | null;

  progress: number;

  completedLessons: number;

  totalLessons: number;

  sectionCount: number;
}

export interface ContinueLearning {
  lessonId: string;

  lessonTitle: string;

  watchedSeconds: number;

  duration: number;

  progress: number;

  completed: boolean;

  thumbnailUrl?: string | null;

  course: {
    id: string;

    title: string;

    thumbnailUrl: string;
  };
}

export interface HomeResponse {
  user: UserSummary;

  continueLearning: ContinueLearning | null;

  categories: Category[];

  featuredCourses: CourseCard[];

  popularCourses: CourseCard[];

  trendingCourses: CourseCard[];
}