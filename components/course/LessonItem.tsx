// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Image } from "expo-image";
// import { Ionicons } from "@expo/vector-icons";

// import { Lesson } from "@/types/course";

// interface Props {
//   lesson: Lesson;
//   onPress(): void;
// }

// function formatDuration(seconds: number) {
//   const min = Math.floor(seconds / 60);

//   if (min < 60) {
//     return `${min} min`;
//   }

//   const hours = Math.floor(min / 60);
//   const minutes = min % 60;

//   return `${hours}h ${minutes}m`;
// }

// export default function LessonItem({
//   lesson,
//   onPress,
// }: Props) {
//   const progress =
//     lesson.progress && lesson.duration > 0
//       ? Math.min(
//           100,
//           Math.round(
//             (lesson.progress.watchedSeconds /
//               lesson.duration) *
//               100
//           )
//         )
//       : 0;

//   return (
//     <Pressable
//       style={styles.container}
//       onPress={onPress}
//     >
//       <Image
//         source={{
//           uri: lesson.thumbnailUrl,
//         }}
//         style={styles.thumbnail}
//         contentFit="cover"
//       />

//       <View style={styles.content}>
//         <Text
//           numberOfLines={2}
//           style={styles.title}
//         >
//           {lesson.title}
//         </Text>

//         <View style={styles.infoRow}>
//           <Ionicons
//             name="time-outline"
//             size={14}
//             color="#6B7280"
//           />

//           <Text style={styles.infoText}>
//             {formatDuration(lesson.duration)}
//           </Text>

//           {lesson.isPreview && (
//             <>
//               <Ionicons
//                 name="eye-outline"
//                 size={14}
//                 color="#10B981"
//                 style={{ marginLeft: 12 }}
//               />

//               <Text
//                 style={[
//                   styles.infoText,
//                   {
//                     color: "#10B981",
//                   },
//                 ]}
//               >
//                 Preview
//               </Text>
//             </>
//           )}
//         </View>

//         <View style={styles.progressBackground}>
//           <View
//             style={[
//               styles.progressFill,
//               {
//                 width: `${progress}%`,
//               },
//             ]}
//           />
//         </View>
//       </View>

//       <View style={styles.right}>
//         {lesson.progress?.completed ? (
//           <Ionicons
//             name="checkmark-circle"
//             size={28}
//             color="#22C55E"
//           />
//         ) : progress > 0 ? (
//           <Ionicons
//             name="play-circle"
//             size={28}
//             color="#2563EB"
//           />
//         ) : (
//           <Ionicons
//             name="play-circle-outline"
//             size={28}
//             color="#9CA3AF"
//           />
//         )}
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 14,
//   },

//   thumbnail: {
//     width: 90,
//     height: 70,
//     borderRadius: 12,
//     backgroundColor: "#E5E7EB",
//   },

//   content: {
//     flex: 1,
//     marginHorizontal: 14,
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },

//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//   },

//   infoText: {
//     marginLeft: 4,
//     color: "#6B7280",
//     fontSize: 13,
//   },

//   progressBackground: {
//     marginTop: 12,
//     height: 6,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   progressFill: {
//     height: "100%",
//     backgroundColor: "#2563EB",
//   },

//   right: {
//     marginLeft: 10,
//   },
// });




//gemini UI

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

import { Lesson } from "@/types/course";

interface Props {
  lesson: Lesson;
  onPress(): void;
}

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);

  if (min < 60) {
    return `${min} min`;
  }

  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  return `${hours}h ${minutes}m`;
}

export default function LessonItem({
  lesson,
  onPress,
}: Props) {
  const theme = useAppTheme();
  const progress =
    lesson.progress && lesson.duration > 0
      ? Math.min(
          100,
          Math.round(
            (lesson.progress.watchedSeconds /
              lesson.duration) *
              100
          )
        )
      : 0;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.surfaceMuted }]}
      onPress={onPress}
    >
      <Image
        source={{
          uri: lesson.thumbnailUrl,
        }}
        style={styles.thumbnail}
        contentFit="cover"
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: theme.text }]}
        >
          {lesson.title}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color={theme.textMuted}
          />

          <Text style={[styles.infoText, { color: theme.textMuted }]}>
            {formatDuration(lesson.duration)}
          </Text>

          {lesson.isPreview && (
            <>
              <Ionicons
                name="eye-outline"
                size={14}
                color="#10B981" // Kept your emerald green for previews
                style={{ marginLeft: 12 }}
              />

              <Text
                style={[
                  styles.infoText,
                  {
                    color: "#10B981",
                    fontWeight: "600",
                  },
                ]}
              >
                Preview
              </Text>
            </>
          )}
        </View>

        <View style={[styles.progressBackground, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.right}>
        {lesson.progress?.completed ? (
          <Ionicons
            name="checkmark-circle"
            size={28}
            color="#10B981" // Swapped to emerald to match preview green for consistency
          />
        ) : progress > 0 ? (
          <Ionicons
            name="play-circle"
            size={28}
            color={theme.primary}
          />
        ) : (
          <Ionicons
            name="play-circle-outline"
            size={28}
            color={theme.textMuted}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Soft nested background to contrast with the white Accordion card
    borderRadius: 16,
    padding: 10, // Slightly tighter padding to let the thumbnail stretch more
    marginBottom: 12,
  },

  thumbnail: {
    width: 96,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
  },

  content: {
    flex: 1,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
    lineHeight: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    marginLeft: 4,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },

  progressBackground: {
    marginTop: 10,
    height: 6,
    backgroundColor: "#E2E8F0", // Slightly darker than the container for contrast
    borderRadius: 6,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 6, // Ensures the fill has rounded edges even at 50%
  },

  right: {
    marginLeft: 4,
    marginRight: 6,
  },
});
