type AppEnv = "development" | "staging" | "production";

const API_URL_BY_ENV: Record<AppEnv, string> = {
  development: "https://www.gyanmaster.com",
  staging: "https://staging.gyanmaster.com",
  production: "https://www.gyanmaster.com",
};

const rawAppEnv = process.env.EXPO_PUBLIC_APP_ENV;
const normalizedAppEnv =
  rawAppEnv === "development" ||
  rawAppEnv === "staging" ||
  rawAppEnv === "production"
    ? rawAppEnv
    : undefined;

const fallbackEnv: AppEnv = __DEV__ ? "development" : "production";
const selectedEnv: AppEnv = normalizedAppEnv ?? fallbackEnv;

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? API_URL_BY_ENV[selectedEnv];
export const APP_ENV = selectedEnv;
