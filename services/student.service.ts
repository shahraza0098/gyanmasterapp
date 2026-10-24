import api from "./api";

import { StudentResponse } from "@/types/Student";

export async function getStudent() {
  const response =
    await api.get<StudentResponse>(
      "/student/me"
    );

  const { user, access } = response.data.data;

  return { ...user, access: access ?? null };
}