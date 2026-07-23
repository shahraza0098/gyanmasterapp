


// //gemini UI


// import React, { useMemo } from "react";
// import { StyleSheet, Text, View } from "react-native";

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
//     return Math.min(watchedSeconds / duration, 1);
//   }, [watchedSeconds, duration]);

//   const percentage = Math.round(progress * 100);

//   const formatTime = (seconds: number) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);

//     if (hrs > 0) {
//       return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
//     }

//     return `${mins}:${String(secs).padStart(2, "0")}`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Lesson Progress</Text>

//         {completed && (
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>✓ Completed</Text>
//           </View>
//         )}
//       </View>

//       <View style={styles.progressBar}>
//         <View
//           style={[
//             styles.progressFill,
//             { width: `${percentage}%` },
//           ]}
//         />
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.time}>
//           {formatTime(watchedSeconds)} / {formatTime(duration)}
//         </Text>

//         <Text style={styles.percent}>{percentage}%</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 20,
    
//     // Subtle border for clean definition
//     borderWidth: 1,
//     borderColor: "#F1F5F9",

//     // Elegant, soft shadow (iOS)
//     shadowColor: "#0F172A",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.03,
//     shadowRadius: 12,

//     // Elevation (Android)
//     elevation: 2,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 16,
//     fontFamily: "Poppins-SemiBold",
//     color: "#1E293B", // Deep slate
//     letterSpacing: -0.2,
//   },
//   badge: {
//     backgroundColor: "#ECFDF5", // Soft emerald background
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   badgeText: {
//     color: "#10B981", // Crisp emerald text
//     fontSize: 12,
//     fontFamily: "Poppins-SemiBold",
//     letterSpacing: 0.2,
//   },
//   progressBar: {
//     height: 8, // Slimmed down for elegance
//     borderRadius: 4,
//     overflow: "hidden",
//     backgroundColor: "#F1F5F9", // Lighter, softer track color
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#3B82F6", // Modern primary blue
//     borderRadius: 4,
//   },
//   footer: {
//     marginTop: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   time: {
//     fontSize: 13,
//     color: "#64748B", // Slate gray
//     fontFamily: "Poppins-Medium",
//   },
//   percent: {
//     fontSize: 14,
//     color: "#3B82F6", // Matches progress bar
//     fontFamily: "Poppins-SemiBold",
//   },
// });




//claide


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

  const accent = completed ? "#10B981" : "#F97316";
  const accentBg = completed ? "#ECFDF5" : "#FFF1E6";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Progress</Text>
            {completed && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Completed</Text>
              </View>
            )}
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentage}%`, backgroundColor: accent },
              ]}
            />
          </View>

          <Text style={styles.time}>
            {formatTime(watchedSeconds)} / {formatTime(duration)}
          </Text>
        </View>

        <View style={[styles.circleBadge, { backgroundColor: accentBg, borderColor: accent }]}>
          <Text style={[styles.circlePercent, { color: accent }]}>{percentage}</Text>
          <Text style={[styles.circleSign, { color: accent }]}>%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftCol: {
    flex: 1,
    marginRight: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 12.5,
    fontFamily: "Poppins-SemiBold",
    color: "#8A8578",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  badge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: "#10B981",
    fontSize: 10.5,
    fontFamily: "Poppins-SemiBold",
  },
  progressBar: {
    height: 5,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#EFEAE0",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  time: {
    marginTop: 8,
    fontSize: 12,
    color: "#A9A395",
    fontFamily: "Poppins-Medium",
  },
  circleBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  circlePercent: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    letterSpacing: -0.5,
  },
  circleSign: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 1,
    marginTop: 4,
  },
});