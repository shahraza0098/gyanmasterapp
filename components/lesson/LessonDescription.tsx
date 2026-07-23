




// //gemini UI


// import React, { useMemo, useState } from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// interface LessonDescriptionProps {
//   description: string | null;
// }

// const PREVIEW_LENGTH = 220;

// export default function LessonDescription({ description }: LessonDescriptionProps) {
//   const [expanded, setExpanded] = useState(false);

//   const hasDescription = !!description?.trim();
//   const shouldCollapse = (description?.length ?? 0) > PREVIEW_LENGTH;

//   const content = useMemo(() => {
//     if (!hasDescription) return "No description available.";
//     if (expanded || !shouldCollapse) return description!;

//     return description!.slice(0, PREVIEW_LENGTH) + "...";
//   }, [description, expanded, hasDescription, shouldCollapse]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>About this lesson</Text>

//       <Text style={styles.description}>{content}</Text>

//       {shouldCollapse && (
//         <Pressable
//           onPress={() => setExpanded(!expanded)}
//           hitSlop={12}
//           style={({ pressed }) => [
//             styles.buttonContainer,
//             pressed && styles.buttonPressed,
//           ]}
//         >
//           <Text style={styles.buttonText}>
//             {expanded ? "Read Less" : "Read More"}
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
//     borderRadius: 20,
//     padding: 24,
    
//     // Subtle border for clean definition
//     borderWidth: 1,
//     borderColor: "#F1F5F9",

//     // Elegant, soft shadow (iOS)
//     shadowColor: "#0F172A",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.04,
//     shadowRadius: 16,

//     // Elevation (Android)
//     elevation: 2,
//   },
//   heading: {
//     fontSize: 18,
//     fontFamily: "Poppins-SemiBold",
//     color: "#1E293B",
//     marginBottom: 12,
//     letterSpacing: -0.3,
//   },
//   description: {
//     fontSize: 15,
//     lineHeight: 26,
//     color: "#475569",
//     fontFamily: "Poppins-Regular",
//   },
//   buttonContainer: {
//     marginTop: 16,
//     alignSelf: "flex-start",
//   },
//   buttonPressed: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: "#3B82F6", // Modern crisp blue
//     fontSize: 14,
//     fontFamily: "Poppins-SemiBold",
//   },
// });







import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

interface LessonDescriptionProps {
  description: string | null;
}

const PREVIEW_LENGTH = 220;

export default function LessonDescription({ description }: LessonDescriptionProps) {
  const theme = useAppTheme();
  const [expanded, setExpanded] = useState(false);

  const hasDescription = !!description?.trim();
  const shouldCollapse = (description?.length ?? 0) > PREVIEW_LENGTH;

  const content = useMemo(() => {
    if (!hasDescription) return "No description available.";
    if (expanded || !shouldCollapse) return description!;

    return description!.slice(0, PREVIEW_LENGTH) + "...";
  }, [description, expanded, hasDescription, shouldCollapse]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.accentBar} />

      <View style={styles.body}>
        <Text style={[styles.heading, { color: theme.textMuted }]}>About this lesson</Text>

        <Text style={[styles.description, { color: theme.text }]}>{content}</Text>

        {shouldCollapse && (
          <Pressable
            onPress={() => setExpanded(!expanded)}
            hitSlop={12}
            style={({ pressed }) => [
              styles.buttonContainer,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.buttonText, { color: theme.primary }]}>
              {expanded ? "Read less" : "Read more"}
            </Text>
            <Feather
              name={expanded ? "chevron-up" : "chevron-down"}
              size={14}
              color={theme.primary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0EBE3",
  },
  accentBar: {
    width: 5,
    backgroundColor: "#F97316",
  },
  body: {
    flex: 1,
    padding: 22,
  },
  heading: {
    fontSize: 12.5,
    fontFamily: "Poppins-SemiBold",
    color: "#8A8578",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 25,
    color: "#3A3630",
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    marginTop: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1.5,
    borderColor: "#F97316",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#F97316",
    fontSize: 12.5,
    fontFamily: "Poppins-SemiBold",
  },
});
