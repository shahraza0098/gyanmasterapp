export interface AuthResponse {
  message: string;
  data: {
    onboardingComplete: boolean;
  };
}


export interface UseAuthReturn {
  isSignedIn: boolean;
  isLoaded: boolean;
  getToken: () => Promise<string | null>;
}