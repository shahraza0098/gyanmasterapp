// import { View, TextInput, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// interface SearchBarProps {
//   value: string;
//   onChangeText(text: string): void;
// }

// export default function SearchBar({
//   value,
//   onChangeText,
// }: SearchBarProps) {
//   return (
//     <View style={styles.container}>
//       <Ionicons
//         name="search"
//         size={22}
//         color="#777"
//       />

//       <TextInput
//         placeholder="Search courses..."
//         value={value}
//         onChangeText={onChangeText}
//         style={styles.input}
//         placeholderTextColor="#888"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 52,
//     borderRadius: 14,
//     backgroundColor: "#F3F4F6",

//     flexDirection: "row",
//     alignItems: "center",

//     paddingHorizontal: 16,

//     marginBottom: 24,
//   },

//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
// });



//gemini UI

import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

interface SearchBarProps {
  value: string;
  onChangeText(text: string): void;
}

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.text }]}>
      <Ionicons
        name="search"
        size={22}
        color={theme.textMuted}
      />

      <TextInput
        placeholder="Search courses..."
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { color: theme.text }]}
        placeholderTextColor={theme.textMuted}
        selectionColor={theme.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56, // Slightly taller for a more premium, touch-friendly feel
    borderRadius: 16, // Smoother, rounder corners
    backgroundColor: "#FFFFFF", // Pure white to pop against the #F8FAFC app background
    
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

    // Removed marginBottom: 24 because your HomeScreen now uses `gap` for perfect spacing!
    
    // Added a very soft, elegant drop shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2, // Soft elevation for Android
    
    // Subtle border gives it a crisp edge
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#0F172A", // Deep slate for highly readable, crisp typed text
    letterSpacing: 0.2,
  },
});
