import api from "./api";

import { Profile } from "@/types/profile";

interface ApiResponse<T> {
  message: string;
  data: T;
}

export async function getProfile(): Promise<Profile> {
  const response = await api.get<
    ApiResponse<{
      user: Profile;
    }>
  >("/student/me");

  return response.data.data.user;
}