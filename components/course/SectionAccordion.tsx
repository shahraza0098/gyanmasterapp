// import { useState } from "react";
// import {
//   LayoutAnimation,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   UIManager,
//   View,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// import { Section } from "@/types/course";
// import LessonItem from "./LessonItem";

// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// interface Props {
//   section: Section;
//   initiallyExpanded?: boolean;
//   onLessonPress(lessonId: string): void;
// }

// export default function SectionAccordion({
//   section,
//   initiallyExpanded = false,
//   onLessonPress,
// }: Props) {
//   const [expanded, setExpanded] =
//     useState(initiallyExpanded);

//   const completedLessons =
//     section.lessons.filter(
//       (lesson) => lesson.progress?.completed
//     ).length;

//   function toggle() {
//     LayoutAnimation.configureNext(
//       LayoutAnimation.Presets.easeInEaseOut
//     );

//     setExpanded((prev) => !prev);
//   }

//   return (
//     <View style={styles.container}>
//       <Pressable
//         style={styles.header}
//         onPress={toggle}
//       >
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>
//             {section.title}
//           </Text>

//           <Text style={styles.subtitle}>
//             {completedLessons}/
//             {section.lessons.length} Lessons Completed
//           </Text>
//         </View>

//         <Ionicons
//           name={
//             expanded
//               ? "chevron-up"
//               : "chevron-down"
//           }
//           size={24}
//           color="#2563EB"
//         />
//       </Pressable>

//       {expanded && (
//         <View style={styles.lessons}>
//           {section.lessons.map((lesson) => (
//             <LessonItem
//               key={lesson.id}
//               lesson={lesson}
//               onPress={() =>
//                 onLessonPress(lesson.id)
//               }
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     marginBottom: 18,
//     overflow: "hidden",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 18,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   subtitle: {
//     marginTop: 6,
//     color: "#6B7280",
//     fontSize: 13,
//   },

//   lessons: {
//     paddingHorizontal: 14,
//     paddingBottom: 14,
//   },
// });





//gemini UI

import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Section } from "@/types/course";
import LessonItem from "./LessonItem";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  section: Section;
  initiallyExpanded?: boolean;
  onLessonPress(lessonId: string): void;
}

export default function SectionAccordion({
  section,
  initiallyExpanded = false,
  onLessonPress,
}: Props) {
  const [expanded, setExpanded] =
    useState(initiallyExpanded);

  const completedLessons =
    section.lessons.filter(
      (lesson) => lesson.progress?.completed
    ).length;

  function toggle() {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setExpanded((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={toggle}
      >
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>
            {section.title}
          </Text>

          <Text style={styles.subtitle}>
            {completedLessons} / {section.lessons.length} Lessons Completed
          </Text>
        </View>

        <View style={styles.iconWrapper}>
          <Ionicons
            name={
              expanded
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color="#3B82F6"
          />
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.lessons}>
          {section.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              onPress={() =>
                onLessonPress(lesson.id)
              }
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, // Matches CourseInfo and CourseHeader
    marginBottom: 20,
    overflow: "hidden",
    // Premium floating card shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 22, // Extra vertical padding for elegance
  },
  
  headerTextContainer: {
    flex: 1,
    paddingRight: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.4,
  },

  subtitle: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },
  
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF", // Soft blue background for the chevron
    justifyContent: "center",
    alignItems: "center",
  },

  lessons: {
    paddingHorizontal: 16,
    paddingBottom: 8, // Less bottom padding because the LessonItems have their own marginBottom
  },
});