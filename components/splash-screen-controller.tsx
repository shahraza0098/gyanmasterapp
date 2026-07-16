import { useAuth } from "@clerk/expo";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function SplashScreenController() {
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore if already hidden.
      });
    }
  }, [isLoaded]);

  return null;
}
