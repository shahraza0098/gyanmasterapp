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

import { useStudent } from "@/hooks/useStudent";
import { useAppTheme } from "@/providers/ThemeProvider";

import {
  hasPlatformAccess,
} from "@/lib/subscription";

export default function RootLayout() {
  const theme = useAppTheme();
  const {
    student,
    loading,
  } = useStudent();


  console.log("root layout student console: ", student)
  const segments = useSegments();

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

  /**
   * Subscription
   */
  if (
    !hasPlatformAccess(
      student.subscription
    )
  ) {
    return (
      <Redirect
        href="/subscription"
      />
    );
  }

  return <Slot />;
}
