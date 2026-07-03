
import { Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function AppLayout() {


  // if (!isSignedIn) {
  //   return <Redirect href="/(auth)/auth" />;
  // }

  return <Slot />;
}
