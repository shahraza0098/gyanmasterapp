export interface LessonProgress {
  watchedSeconds: number;
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  slug: string;
  position: number;
  duration: number;
  thumbnailUrl?: string;
  isPreview: boolean;
  videoId: string;

  progress: LessonProgress | null;
}

export interface Section {
  id: string;
  title: string;
  position: number;

  lessons: Lesson[];
}

export interface CourseDetails {
  id: string;

  title: string;

  slug: string;

  description: string;

  thumbnailUrl: string;

  level: string;

  category: {
    id: string;
    name: string;
    bannerUrl: string;
  };

  sections: Section[];
}

export interface CourseResponse {
  message: string;

  data: CourseDetails;
}