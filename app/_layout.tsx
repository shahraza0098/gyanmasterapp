import { Stack, Redirect, usePathname } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useEffect, useState } from "react";
import "./global.css";

import { API_URL } from "../config/api";
import { setTokenGetter } from "@/services/api";

function AppNavigator() {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const [checking, setChecking] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null
  );

  const isOnboardingPath = pathname.startsWith("/onboarding");
  const isAuthPath = pathname === "/auth" || pathname.startsWith("/auth");
  const isRootPath = pathname === "/";

  useEffect(() => {
    const checkStudent = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setChecking(false);
        return;
      }

      try {
        const token = await getToken();
        console.log("API URL:", `${API_URL}/api/student/me`);
        const res = await fetch(`${API_URL}/api/student/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

           if (res.status === 404) {
            setOnboardingComplete(false);
             return;
            }


           const data = await res.json();
            if (!res.ok) {
               console.log(data);
              return;
           }
        console.log("Student data:", data);
        

        setOnboardingComplete(data.data.onboardingComplete);
      } catch (err) {
        console.log(err);
      } finally {
        setChecking(false);
      }
    };

    checkStudent();
  }, [isLoaded, isSignedIn]);


//new code 
useEffect(() => {
  setTokenGetter(getToken);
}, [getToken]);

  if (!isLoaded || checking) {
    return null;
  }

  // Not signed in
  if (!isSignedIn) {
    if (!isAuthPath) {
      return <Redirect href="/(auth)/auth" />;
    }
  }

  // Signed in but onboarding incomplete
  if (isSignedIn && onboardingComplete === false && !isOnboardingPath) {
    return <Redirect href="/onboarding" />;
  }

  // Signed in and onboarding complete
  if (isSignedIn && onboardingComplete === true && isOnboardingPath) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <AppNavigator />
    </ClerkProvider>
  );
}