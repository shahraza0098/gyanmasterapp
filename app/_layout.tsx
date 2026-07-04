import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import "./global.css"
import { usePathname } from "expo-router";
export default function RootLayout() {
  const pathname = usePathname();
  console.log(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
  console.log(pathname);
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
