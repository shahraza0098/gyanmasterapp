import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth({
    treatPendingAsSignedOut: false,
  });

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Slot />;
}