// import { Redirect, Slot } from "expo-router";
// import { useAuth } from "@clerk/expo";
// import { ActivityIndicator } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function AppLayout() {
//   const { isLoaded, isSignedIn } = useAuth({
//     treatPendingAsSignedOut: false,
//   });

//   if (!isLoaded) {
//     return (
//       <SafeAreaView
//         style={{
//           backgroundColor: "#fff",
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator color="#000" size="large" />
//       </SafeAreaView>
//     );
//   }

//   if (!isSignedIn) {
//     return <Redirect href="/(auth)/auth" />;
//   }

//   return <Slot />;
// }





import {
  Redirect,
  Slot,
  useSegments,
} from "expo-router";

import {
  ActivityIndicator,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import { useStudent } from "@/hooks/useStudent";
import { useAppTheme } from "@/providers/ThemeProvider";

import {
  hasPlatformAccess,
} from "@/lib/subscription";

import { checkPremiumStatus } from "@/lib/revenuecat";

export default function RootLayout() {
  const theme = useAppTheme();
  const {
    student,
    loading,
  } = useStudent();

  const [rcPremium, setRcPremium] = useState<boolean | null>(null);

  console.log("root layout student console: ", student)
  const segments = useSegments();

  // Backend decides access (trial window or paid ₹499 period is current).
  const serverAccess = student
    ? student.access?.hasAccess ??
      hasPlatformAccess(student.subscription)
    : false;

  // Only if the backend says "no access", ask RevenueCat directly. This covers
  // the few seconds after a purchase before the webhook reaches the backend.
  useEffect(() => {
    if (!student || !student.onboardingComplete || serverAccess) {
      setRcPremium(null);
      return;
    }

    let cancelled = false;

    checkPremiumStatus()
      .then((isPremium) => {
        if (!cancelled) setRcPremium(isPremium);
      })
      .catch(() => {
        if (!cancelled) setRcPremium(false);
      });

    return () => {
      cancelled = true;
    };
  }, [student?.id, student?.onboardingComplete, serverAccess]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  /**
   * Student not loaded
   */
  if (!student) {
    return (
      <Redirect href="/(auth)/auth" />
    );
  }

  /**
   * Onboarding
   */
  if (!student.onboardingComplete) {
    return (
      <Redirect href="/onboarding" />
    );
  }

  if (serverAccess) {
    return <Slot />;
  }

  /**
   * Backend said no access — wait for the RevenueCat fallback check
   * to avoid a flash redirect right after purchase.
   */
  if (rcPremium === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!rcPremium) {
    return (
      <Redirect
        href="/subscription"
      />
    );
  }

  return <Slot />;
}
