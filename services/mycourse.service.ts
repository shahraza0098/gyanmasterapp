import api from "./api";

import { MyCoursesResponse } from "@/types/MyCourse";

interface ApiResponse<T> {
  message: string;
  data: T;
}

/**
 * Fetch all courses available to the current student.
 * Includes:
 * - All Courses
 * - In Progress
 * - Completed
 * - Dashboard Stats
 */
export async function getMyCourses(): Promise<MyCoursesResponse> {
  const response = await api.get<ApiResponse<MyCoursesResponse>>(
    "/student/my-courses"
  );

  return response.data.data;
}


export async function searchMyCourses(search: string) {
  const response = await api.get<ApiResponse<MyCoursesResponse>>(
    "/student/my-courses",
    {
      params: {
        search,
      },
    }
  );

  return response.data.data;
}

export async function getMyCoursesByCategory(
  categoryId: string
) {
  const response = await api.get<ApiResponse<MyCoursesResponse>>(
    "/my-courses",
    {
      params: {
        categoryId,
      },
    }
  );

  return response.data.data;
}