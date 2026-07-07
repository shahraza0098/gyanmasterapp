// import React, { useMemo, useState } from "react";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// interface LessonDescriptionProps {
//   description: string | null;
// }

// const PREVIEW_LENGTH = 220;

// export default function LessonDescription({
//   description,
// }: LessonDescriptionProps) {
//   const [expanded, setExpanded] =
//     useState(false);

//   const hasDescription =
//     !!description?.trim();

//   const shouldCollapse =
//     (description?.length ?? 0) >
//     PREVIEW_LENGTH;

//   const content = useMemo(() => {
//     if (!hasDescription)
//       return "No description available.";

//     if (
//       expanded ||
//       !shouldCollapse
//     )
//       return description!;

//     return (
//       description!.slice(
//         0,
//         PREVIEW_LENGTH
//       ) + "..."
//     );
//   }, [
//     description,
//     expanded,
//     hasDescription,
//     shouldCollapse,
//   ]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         About this lesson
//       </Text>

//       <Text style={styles.description}>
//         {content}
//       </Text>

//       {shouldCollapse && (
//         <Pressable
//           onPress={() =>
//             setExpanded(!expanded)
//           }
//           hitSlop={8}
//         >
//           <Text style={styles.button}>
//             {expanded
//               ? "Read Less"
//               : "Read More"}
//           </Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 24,

//     backgroundColor: "#FFFFFF",

//     borderRadius: 18,

//     padding: 18,

//     shadowColor: "#000",

//     shadowOpacity: 0.05,

//     shadowRadius: 10,

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },

//     elevation: 3,
//   },

//   heading: {
//     fontSize: 18,

//     fontFamily:
//       "Poppins-SemiBold",

//     color: "#0F172A",

//     marginBottom: 12,
//   },

//   description: {
//     fontSize: 15,

//     lineHeight: 26,

//     color: "#475569",

//     fontFamily:
//       "Poppins-Regular",
//   },

//   button: {
//     marginTop: 14,

//     color: "#2563EB",

//     fontSize: 14,

//     fontFamily:
//       "Poppins-SemiBold",
//   },
// });








//gemini UI


import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LessonDescriptionProps {
  description: string | null;
}

const PREVIEW_LENGTH = 220;

export default function LessonDescription({ description }: LessonDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const hasDescription = !!description?.trim();
  const shouldCollapse = (description?.length ?? 0) > PREVIEW_LENGTH;

  const content = useMemo(() => {
    if (!hasDescription) return "No description available.";
    if (expanded || !shouldCollapse) return description!;

    return description!.slice(0, PREVIEW_LENGTH) + "...";
  }, [description, expanded, hasDescription, shouldCollapse]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About this lesson</Text>

      <Text style={styles.description}>{content}</Text>

      {shouldCollapse && (
        <Pressable
          onPress={() => setExpanded(!expanded)}
          hitSlop={12}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {expanded ? "Read Less" : "Read More"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    
    // Subtle border for clean definition
    borderWidth: 1,
    borderColor: "#F1F5F9",

    // Elegant, soft shadow (iOS)
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,

    // Elevation (Android)
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#1E293B",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    lineHeight: 26,
    color: "#475569",
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#3B82F6", // Modern crisp blue
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});