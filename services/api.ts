import axios from "axios";
import { API_URL } from "@/config/api";

let tokenGetter: (() => Promise<string | null>) | null = null;

export const setTokenGetter = (
  getter: () => Promise<string | null>
) => {
  tokenGetter = getter;
};

const api = axios.create({
  baseURL: `${API_URL}/api/student`,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  if (tokenGetter) {
    const token = await tokenGetter();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;