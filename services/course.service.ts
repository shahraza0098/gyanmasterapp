import api from "./api";

import { CourseDetails } from "@/types/course";

class CourseService {
  async getCourse(
    courseId: string
  ): Promise<CourseDetails> {
    const response = await api.get(
      `/course/${courseId}`
    );

    return response.data.data;
  }
}

export default new CourseService();