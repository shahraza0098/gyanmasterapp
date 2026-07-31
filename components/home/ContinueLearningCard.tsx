import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

import { ContinueLearning } from "@/types/home";

interface Props {
  data: ContinueLearning | null;
  onPress(): void;
}

export default function ContinueLearningCard({
  data,
  onPress,
}: Props) {
  const theme = useAppTheme();
  if (!data) return null;

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.isDark ? "#000000" : "#0F172A",
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={{
          uri:
            data.thumbnailUrl ||
            data.course.thumbnailUrl,
        }}
        style={styles.image}
        contentFit="cover"
      />

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[styles.courseTitle, { color: theme.text }]}
        >
          {data.course.title}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.lessonTitle, { color: theme.textMuted }]}
        >
          {data.lessonTitle}
        </Text>

        <View style={[styles.progressContainer, { backgroundColor: theme.surfaceMuted }]}>
          <View
            style={[
              styles.progress,
              {
                width: `${data.progress}%`,
              },
            ]}
          />
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.progressText, { color: theme.textMuted }]}>
            {data.progress}% completed
          </Text>

          <View style={[styles.playButton, { backgroundColor: theme.primary }]}>
            <Ionicons
              name="play"
              color="#fff"
              size={18}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },

  image: {
    width: 120,
    height: 140,
  },

  content: {
    flex: 1,

    padding: 16,

    justifyContent: "space-between",
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  lessonTitle: {
    marginTop: 6,

    fontSize: 15,

    color: "#666",
  },

  progressContainer: {
    height: 6,

    borderRadius: 10,

    overflow: "hidden",

    backgroundColor: "#ECECEC",

    marginVertical: 12,
  },

  progress: {
    height: "100%",

    backgroundColor: "#2563EB",
  },

  bottomRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  progressText: {
    color: "#666",

    fontSize: 13,
  },

  playButton: {
    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: "#2563EB",

    alignItems: "center",

    justifyContent: "center",
  },
});




//gemini UI


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
//         color="#94A3B8" // Updated to a softer, modern slate color
//       />

//       <TextInput
//         placeholder="Search courses..."
//         value={value}
//         onChangeText={onChangeText}
//         style={styles.input}
//         placeholderTextColor="#94A3B8"
//         selectionColor="#2563EB" // Matches the brand blue from your loading state
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 56, // Slightly taller for a more premium, touch-friendly feel
//     borderRadius: 16, // Smoother, rounder corners
//     backgroundColor: "#FFFFFF", // Pure white to pop against the #F8FAFC app background
    
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,

//     // Removed marginBottom: 24 because your HomeScreen now uses `gap` for perfect spacing!
    
//     // Added a very soft, elegant drop shadow
//     shadowColor: "#0F172A",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.04,
//     shadowRadius: 12,
//     elevation: 2, // Soft elevation for Android
    
//     // Subtle border gives it a crisp edge
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },

//   input: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#0F172A", // Deep slate for highly readable, crisp typed text
//     letterSpacing: 0.2,
//   },
// });
