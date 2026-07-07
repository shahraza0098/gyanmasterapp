import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { isLoaded, isSignedIn } = useAuth({
    treatPendingAsSignedOut: false,
  });

  if (!isLoaded) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#000" size="large" />
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/auth" />;
  }

  return <Slot />;
}