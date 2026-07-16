import api from "./api";

import { HomeResponse } from "@/types/home";

class HomeService {
  async getHome(): Promise<HomeResponse> {
     console.log("Fetching home data...");
    const response = await api.get("/student/home");
    console.log("Home data fetched:");
    return response.data.data;
  }
}

export default new HomeService();