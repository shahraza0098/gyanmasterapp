import { Stack, Redirect, usePathname } from "expo-router";
import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useEffect, useRef, useState } from "react";
import { configureRevenueCat, resetRevenueCat } from "@/lib/revenuecat";
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import { API_URL } from "../config/api";
import { setTokenGetter } from "@/services/api";
import { SplashScreenController } from "@/components/splash-screen-controller";
import {StudentProvider} from "@/providers/StudentProvider"
import {useStudent} from "@/hooks/useStudent"
import { ThemeProvider } from "@/providers/ThemeProvider";
SplashScreen.preventAutoHideAsync();

// function AppNavigator() {
//   const pathname = usePathname();
//   console.log("Current pathname:", pathname);
//   const { getToken, isSignedIn, isLoaded } = useAuth();

//   const [checking, setChecking] = useState(true);
//   const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
//     null
//   );

//   const isOnboardingPath = pathname.startsWith("/onboarding");
//   const isAuthPath = pathname === "/auth" || pathname.startsWith("/auth");
//   const isRootPath = pathname === "/";

//   useEffect(() => {
//     const checkStudent = async () => {
//       if (!isLoaded) return;

//       if (!isSignedIn) {
//         setChecking(false);
//         return;
//       }

//       try {
//         const token = await getToken();
//         console.log("API URL:", `${API_URL}/api/student/me`);
//         const res = await fetch(`${API_URL}/api/student/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//            if (res.status === 404) {
//             setOnboardingComplete(false);
//              return;
//             }


//            const data = await res.json();
//             if (!res.ok) {
//                console.log(data);
//               return;
//            }
//         console.log("Student data:", data);
        

//         setOnboardingComplete(data.data.onboardingComplete);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setChecking(false);
//       }
//     };

//     checkStudent();
//   }, [isLoaded, isSignedIn]);


// //new code 
// useEffect(() => {
//   setTokenGetter(getToken);
// }, [getToken]);

//   if (!isLoaded || checking) {
//     return null;
//   }

//   // Not signed in
//   if (!isSignedIn) {
//     if (!isAuthPath) {
//       return <Redirect href="/(auth)/auth" />;
//     }
//   }

//   // Signed in but onboarding incomplete
//   if (isSignedIn && onboardingComplete === false && !isOnboardingPath) {
//     return <Redirect href="/onboarding" />;
//   }

//   // Signed in and onboarding complete
//   if (isSignedIn && onboardingComplete === true && isOnboardingPath) {
//     return <Redirect href="/" />;
//   }

//   return (
//     <>
//     <SplashScreenController />
//   <Stack screenOptions={{ headerShown: false }} />
//   </>
//   );
// }


function AppNavigator() {
  const pathname = usePathname();

  const {
    isLoaded,
    isSignedIn,
    getToken,
  } = useAuth();

  const {
    student,
    loading,
  } = useStudent();


  // console.log("stuedent data:  ", student)
  const isAuthPath =
    pathname.startsWith("/(auth)") ||
    pathname === "/auth";

  const isOnboardingPath =
    pathname.startsWith("/onboarding");

  const { user } = useUser();
  const rcConfiguredForRef = useRef<string | null>(null);

  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  // Configure RevenueCat when Clerk user is available
  useEffect(() => {
    if (isSignedIn && user?.id && rcConfiguredForRef.current !== user.id) {
      configureRevenueCat(user.id).catch((err) =>
        console.warn("[RevenueCat] Config failed:", err)
      );
      rcConfiguredForRef.current = user.id;
    }

    if (!isSignedIn && rcConfiguredForRef.current) {
      resetRevenueCat().catch((err) =>
        console.warn("[RevenueCat] Reset failed:", err)
      );
      rcConfiguredForRef.current = null;
    }
  }, [isSignedIn, user?.id]);

  if (!isLoaded || loading) {
    return <SplashScreenController />;
  }

  /**
   * Not signed in
   */
  if (!isSignedIn) {
    if (!isAuthPath) {
      return <Redirect href="/(auth)/auth" />;
    }

    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    );
  }

  /**
   * User not created yet
   */
  if (!student) {
    if (!isOnboardingPath) {
      return (
        <Redirect href="/onboarding" />
      );
    }

    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    );
  }

  /**
   * User exists but onboarding incomplete
   */
  if (
    !student.onboardingComplete &&
    !isOnboardingPath
  ) {
    return (
      <Redirect href="/onboarding" />
    );
  }

  /**
   * Prevent returning to onboarding
   */
  if (
    student.onboardingComplete &&
    isOnboardingPath
  ) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ThemeProvider>
        <StudentProvider>
          <AppNavigator />
        </StudentProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
