import api from "./api";

import { StudentResponse } from "@/types/Student";

export async function getStudent() {
  const response =
    await api.get<StudentResponse>(
      "/student/me"
    );

  return response.data.data.user;
}