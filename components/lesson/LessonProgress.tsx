// import React, { useMemo } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// interface LessonProgressProps {
//   watchedSeconds: number;
//   duration: number;
//   completed: boolean;
// }

// export default function LessonProgress({
//   watchedSeconds,
//   duration,
//   completed,
// }: LessonProgressProps) {
//   const progress = useMemo(() => {
//     if (duration <= 0) return 0;

//     return Math.min(
//       watchedSeconds / duration,
//       1
//     );
//   }, [watchedSeconds, duration]);

//   const percentage = Math.round(
//     progress * 100
//   );

//   const formatTime = (
//     seconds: number
//   ) => {
//     const hrs = Math.floor(seconds / 3600);

//     const mins = Math.floor(
//       (seconds % 3600) / 60
//     );

//     const secs = Math.floor(
//       seconds % 60
//     );

//     if (hrs > 0) {
//       return `${hrs}:${String(
//         mins
//       ).padStart(2, "0")}:${String(
//         secs
//       ).padStart(2, "0")}`;
//     }

//     return `${mins}:${String(
//       secs
//     ).padStart(2, "0")}`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>
//           Lesson Progress
//         </Text>

//         {completed && (
//           <View style={styles.badge}>
//             <Text
//               style={styles.badgeText}
//             >
//               ✓ Completed
//             </Text>
//           </View>
//         )}
//       </View>

//       <View style={styles.progressBar}>
//         <View
//           style={[
//             styles.progressFill,
//             {
//               width: `${percentage}%`,
//             },
//           ]}
//         />
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.time}>
//           {formatTime(
//             watchedSeconds
//           )}{" "}
//           /{" "}
//           {formatTime(duration)}
//         </Text>

//         <Text
//           style={styles.percent}
//         >
//           {percentage}%
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 24,

//     padding: 18,

//     borderRadius: 18,

//     backgroundColor: "#FFFFFF",

//     shadowColor: "#000",

//     shadowOpacity: 0.05,

//     shadowRadius: 10,

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },

//     elevation: 3,
//   },

//   header: {
//     flexDirection: "row",

//     justifyContent:
//       "space-between",

//     alignItems: "center",

//     marginBottom: 16,
//   },

//   title: {
//     fontSize: 18,

//     fontFamily:
//       "Poppins-SemiBold",

//     color: "#0F172A",
//   },

//   badge: {
//     backgroundColor:
//       "#DCFCE7",

//     paddingHorizontal: 12,

//     paddingVertical: 6,

//     borderRadius: 999,
//   },

//   badgeText: {
//     color: "#16A34A",

//     fontSize: 12,

//     fontFamily:
//       "Poppins-SemiBold",
//   },

//   progressBar: {
//     height: 10,

//     borderRadius: 999,

//     overflow: "hidden",

//     backgroundColor:
//       "#E2E8F0",
//   },

//   progressFill: {
//     height: "100%",

//     backgroundColor:
//       "#2563EB",

//     borderRadius: 999,
//   },

//   footer: {
//     marginTop: 12,

//     flexDirection: "row",

//     justifyContent:
//       "space-between",
//   },

//   time: {
//     fontSize: 13,

//     color: "#64748B",

//     fontFamily:
//       "Poppins-Medium",
//   },

//   percent: {
//     fontSize: 14,

//     color: "#2563EB",

//     fontFamily:
//       "Poppins-SemiBold",
//   },
// });









//gemini UI


import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface LessonProgressProps {
  watchedSeconds: number;
  duration: number;
  completed: boolean;
}

export default function LessonProgress({
  watchedSeconds,
  duration,
  completed,
}: LessonProgressProps) {
  const progress = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(watchedSeconds / duration, 1);
  }, [watchedSeconds, duration]);

  const percentage = Math.round(progress * 100);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lesson Progress</Text>

        {completed && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓ Completed</Text>
          </View>
        )}
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.time}>
          {formatTime(watchedSeconds)} / {formatTime(duration)}
        </Text>

        <Text style={styles.percent}>{percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    
    // Subtle border for clean definition
    borderWidth: 1,
    borderColor: "#F1F5F9",

    // Elegant, soft shadow (iOS)
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 12,

    // Elevation (Android)
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1E293B", // Deep slate
    letterSpacing: -0.2,
  },
  badge: {
    backgroundColor: "#ECFDF5", // Soft emerald background
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#10B981", // Crisp emerald text
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.2,
  },
  progressBar: {
    height: 8, // Slimmed down for elegance
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#F1F5F9", // Lighter, softer track color
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6", // Modern primary blue
    borderRadius: 4,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 13,
    color: "#64748B", // Slate gray
    fontFamily: "Poppins-Medium",
  },
  percent: {
    fontSize: 14,
    color: "#3B82F6", // Matches progress bar
    fontFamily: "Poppins-SemiBold",
  },
});