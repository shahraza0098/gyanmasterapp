// import React from "react";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";

// import type {
//   LessonNavigationItem,
// } from "@/types/lesson";

// interface Props {
//   previousLesson: LessonNavigationItem | null;

//   nextLesson: LessonNavigationItem | null;
// }

// function LessonCard({
//   lesson,
//   direction,
// }: {
//   lesson: LessonNavigationItem | null;
//   direction: "previous" | "next";
// }) {
//   const disabled = !lesson;

//   const icon =
//     direction === "previous"
//       ? "arrow-left"
//       : "arrow-right";

//   const title =
//     direction === "previous"
//       ? "Previous Lesson"
//       : "Next Lesson";

//   const navigate = () => {
//     if (!lesson) return;

//     router.replace({
//       pathname: "/lesson/[lessonId]",
//       params: {
//         lessonId: lesson.id,
//       },
//     });
//   };

//   return (
//     <Pressable
//       disabled={disabled}
//       onPress={navigate}
//       style={[
//         styles.card,
//         disabled &&
//           styles.disabledCard,
//       ]}
//     >
//       {direction === "previous" && (
//         <Feather
//           name={icon}
//           size={22}
//           color={
//             disabled
//               ? "#CBD5E1"
//               : "#2563EB"
//           }
//         />
//       )}

//       <View style={styles.content}>
//         <Text
//           style={[
//             styles.label,
//             direction === "next" && {
//               textAlign: "right",
//             },
//           ]}
//         >
//           {title}
//         </Text>

//         <Text
//           numberOfLines={2}
//           style={[
//             styles.lessonTitle,
//             disabled &&
//               styles.disabledText,
//             direction === "next" && {
//               textAlign: "right",
//             },
//           ]}
//         >
//           {lesson
//             ? lesson.title
//             : direction === "previous"
//             ? "First lesson"
//             : "Course completed 🎉"}
//         </Text>

//         {lesson && (
//           <Text
//             numberOfLines={1}
//             style={[
//               styles.section,
//               direction === "next" && {
//                 textAlign: "right",
//               },
//             ]}
//           >
//             {lesson.sectionTitle}
//           </Text>
//         )}
//       </View>

//       {direction === "next" && (
//         <Feather
//           name={icon}
//           size={22}
//           color={
//             disabled
//               ? "#CBD5E1"
//               : "#2563EB"
//           }
//         />
//       )}
//     </Pressable>
//   );
// }

// export default function LessonNavigation({
//   previousLesson,
//   nextLesson,
// }: Props) {
//   return (
//     <View style={styles.container}>
//       <LessonCard
//         lesson={previousLesson}
//         direction="previous"
//       />

//       <LessonCard
//         lesson={nextLesson}
//         direction="next"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 28,
//     gap: 16,
//     marginBottom: 40,
//   },

//   card: {
//     backgroundColor: "#FFFFFF",

//     borderRadius: 18,

//     padding: 18,

//     flexDirection: "row",

//     alignItems: "center",

//     justifyContent: "space-between",

//     shadowColor: "#000",

//     shadowOpacity: 0.05,

//     shadowRadius: 8,

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },

//     elevation: 3,
//   },

//   disabledCard: {
//     opacity: 0.55,
//   },

//   content: {
//     flex: 1,
//     marginHorizontal: 14,
//   },

//   label: {
//     fontSize: 12,

//     color: "#64748B",

//     fontFamily:
//       "Poppins-Medium",

//     marginBottom: 6,
//   },

//   lessonTitle: {
//     fontSize: 16,

//     color: "#0F172A",

//     fontFamily:
//       "Poppins-SemiBold",

//     lineHeight: 24,
//   },

//   section: {
//     marginTop: 6,

//     fontSize: 13,

//     color: "#94A3B8",

//     fontFamily:
//       "Poppins-Regular",
//   },

//   disabledText: {
//     color: "#94A3B8",
//   },
// });





//gemini UI

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import type { LessonNavigationItem } from "@/types/lesson";

interface Props {
  previousLesson: LessonNavigationItem | null;
  nextLesson: LessonNavigationItem | null;
}

function LessonCard({
  lesson,
  direction,
}: {
  lesson: LessonNavigationItem | null;
  direction: "previous" | "next";
}) {
  const disabled = !lesson;
  const isNext = direction === "next";

  const icon = isNext ? "arrow-right" : "arrow-left";
  const title = isNext ? "Next Lesson" : "Previous Lesson";

  const navigate = () => {
    if (!lesson) return;

    router.replace({
      pathname: "/lesson/[lessonId]",
      params: { lessonId: lesson.id },
    });
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={navigate}
      style={({ pressed }) => [
        styles.card,
        disabled && styles.disabledCard,
        pressed && !disabled && styles.cardPressed,
      ]}
    >
      {!isNext && (
        <Feather
          name={icon}
          size={24}
          color={disabled ? "#CBD5E1" : "#3B82F6"}
        />
      )}

      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            isNext && styles.textRight,
          ]}
        >
          {title}
        </Text>

        <Text
          numberOfLines={2}
          style={[
            styles.lessonTitle,
            disabled && styles.disabledText,
            isNext && styles.textRight,
          ]}
        >
          {lesson
            ? lesson.title
            : !isNext
            ? "First lesson"
            : "Course completed 🎉"}
        </Text>

        {lesson && (
          <Text
            numberOfLines={1}
            style={[
              styles.section,
              isNext && styles.textRight,
            ]}
          >
            {lesson.sectionTitle}
          </Text>
        )}
      </View>

      {isNext && (
        <Feather
          name={icon}
          size={24}
          color={disabled ? "#CBD5E1" : "#3B82F6"}
        />
      )}
    </Pressable>
  );
}

export default function LessonNavigation({
  previousLesson,
  nextLesson,
}: Props) {
  return (
    <View style={styles.container}>
      <LessonCard lesson={previousLesson} direction="previous" />
      <LessonCard lesson={nextLesson} direction="next" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 16,
    marginBottom: 40,
  },
  
  // --- Card Styles ---
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    // Subtle border for crisp edges
    borderWidth: 1,
    borderColor: "#F1F5F9",

    // Elegant shadow for iOS
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    
    // Elevation for Android
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: "#F8FAFC",
  },
  disabledCard: {
    opacity: 0.6,
    backgroundColor: "#FAFAFA",
    borderColor: "#F1F5F9",
    shadowOpacity: 0,
    elevation: 0,
  },

  // --- Content & Typography ---
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  textRight: {
    textAlign: "right",
  },
  label: {
    fontSize: 11,
    color: "#64748B", // Slate gray
    fontFamily: "Poppins-SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 16,
    color: "#1E293B", // Dark slate
    fontFamily: "Poppins-SemiBold",
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  section: {
    marginTop: 4,
    fontSize: 13,
    color: "#94A3B8",
    fontFamily: "Poppins-Medium",
  },
  disabledText: {
    color: "#94A3B8",
  },
});