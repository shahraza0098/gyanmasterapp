import { SafeAreaView } from "react-native-safe-area-context";
import { AuthView } from "@clerk/expo/native";

export default function AuthScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <AuthView
        mode="signInOrUp"
      
      />
    </SafeAreaView>
  );
}

