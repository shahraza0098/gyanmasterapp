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


// import { SafeAreaView } from "react-native-safe-area-context";
// import { View, Text, Pressable, Alert } from "react-native";

// export default function AuthScreen() {
//   console.log("AuthScreen rendered");
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 24,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 32,
//             fontWeight: "700",
//             marginBottom: 12,
//           }}
//         >
//           🎉 It Works!
//         </Text>

//         <Text
//           style={{
//             fontSize: 16,
//             textAlign: "center",
//             color: "#666",
//             marginBottom: 32,
//           }}
//         >
//           If you can see this screen, Expo Router is working correctly.
//         </Text>

//         <Pressable
//           onPress={() => Alert.alert("Success", "Button pressed")}
//           style={{
//             backgroundColor: "#1ea4d9",
//             paddingHorizontal: 24,
//             paddingVertical: 14,
//             borderRadius: 12,
//           }}
//         >
//           <Text
//             style={{
//               color: "#fff",
//               fontSize: 16,
//               fontWeight: "600",
//             }}
//           >
//             Test Button
//           </Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }