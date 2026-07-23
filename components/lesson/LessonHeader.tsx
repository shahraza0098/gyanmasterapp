

// //gemini UI


// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// interface LessonHeaderProps {
//   courseTitle: string;
//   sectionTitle: string;
//   lessonTitle: string;
// }

// export default function LessonHeader({
//   courseTitle,
//   sectionTitle,
//   lessonTitle,
// }: LessonHeaderProps) {
//   return (
//     <View style={styles.container}>
//       <Text numberOfLines={1} style={styles.course}>
//         {courseTitle}
//       </Text>

//       <Text numberOfLines={1} style={styles.section}>
//         {sectionTitle}
//       </Text>

//       <Text style={styles.lesson}>
//         {lessonTitle}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   course: {
//     fontSize: 12,
//     color: "#3B82F6", // Crisp, modern primary blue
//     fontFamily: "Poppins-SemiBold",
//     textTransform: "uppercase",
//     letterSpacing: 0.8, // Widened for an elegant eyebrow look
//     marginBottom: 4,
//   },
//   section: {
//     fontSize: 15,
//     color: "#64748B", // Modern slate gray
//     fontFamily: "Poppins-Medium",
//     marginBottom: 10,
//   },
//   lesson: {
//     fontSize: 26,
//     color: "#0F172A", // Deep slate for high contrast
//     fontFamily: "Poppins-Bold",
//     lineHeight: 34,
//     letterSpacing: -0.5, // Tightened for a premium heading feel
//   },
// });





//clauide


import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/ThemeProvider";

interface LessonHeaderProps {
  courseTitle: string;
  sectionTitle: string;
  lessonTitle: string;
}

export default function LessonHeader({
  courseTitle,
  sectionTitle,
  lessonTitle,
}: LessonHeaderProps) {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={styles.eyebrowRow}>
        <View style={[styles.coursePill, { backgroundColor: theme.primarySoft }]}>
          <Text numberOfLines={1} style={[styles.course, { color: theme.primary }]}>
            {courseTitle}
          </Text>
        </View>
        <View style={[styles.dot, { backgroundColor: theme.border }]} />
        <Text numberOfLines={1} style={[styles.section, { color: theme.textMuted }]}>
          {sectionTitle}
        </Text>
      </View>

      <Text style={[styles.lesson, { color: theme.text }]}>{lessonTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  coursePill: {
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  course: {
    fontSize: 10.5,
    color: "#F97316",
    fontFamily: "Poppins-SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#C9C2B4",
    marginHorizontal: 8,
  },
  section: {
    fontSize: 13,
    color: "#8A8578",
    fontFamily: "Poppins-Medium",
    flexShrink: 1,
  },
  lesson: {
    fontSize: 28,
    color: "#1A1523",
    fontFamily: "Poppins-Bold",
    lineHeight: 36,
    letterSpacing: -0.8,
  },
});
