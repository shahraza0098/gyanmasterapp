// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

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
//       <Text
//         numberOfLines={1}
//         style={styles.course}
//       >
//         {courseTitle}
//       </Text>

//       <Text
//         numberOfLines={1}
//         style={styles.section}
//       >
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
//     marginBottom: 20,
//   },

//   course: {
//     fontSize: 13,

//     color: "#2563EB",

//     fontFamily: "Poppins-SemiBold",

//     marginBottom: 6,
//   },

//   section: {
//     fontSize: 14,

//     color: "#64748B",

//     fontFamily: "Poppins-Medium",

//     marginBottom: 8,
//   },

//   lesson: {
//     fontSize: 24,

//     color: "#0F172A",

//     fontFamily: "Poppins-Bold",

//     lineHeight: 34,
//   },
// });



//gemini UI


import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.course}>
        {courseTitle}
      </Text>

      <Text numberOfLines={1} style={styles.section}>
        {sectionTitle}
      </Text>

      <Text style={styles.lesson}>
        {lessonTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
  },
  course: {
    fontSize: 12,
    color: "#3B82F6", // Crisp, modern primary blue
    fontFamily: "Poppins-SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.8, // Widened for an elegant eyebrow look
    marginBottom: 4,
  },
  section: {
    fontSize: 15,
    color: "#64748B", // Modern slate gray
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
  },
  lesson: {
    fontSize: 26,
    color: "#0F172A", // Deep slate for high contrast
    fontFamily: "Poppins-Bold",
    lineHeight: 34,
    letterSpacing: -0.5, // Tightened for a premium heading feel
  },
});

