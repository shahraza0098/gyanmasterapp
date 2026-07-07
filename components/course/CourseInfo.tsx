// import { StyleSheet, Text, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// interface Props {
//   description: string;
//   lessonCount: number;
//   sectionCount: number;
//   totalDuration: number;
//   progress: number;
//   completedLessons: number;
//   level: string;
// }

// function formatDuration(seconds: number) {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);

//   if (hours === 0) {
//     return `${minutes} min`;
//   }

//   return `${hours}h ${minutes}m`;
// }

// export default function CourseInfo({
//   description,
//   lessonCount,
//   sectionCount,
//   totalDuration,
//   progress,
//   completedLessons,
//   level,
// }: Props) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.statsRow}>
//         <View style={styles.statCard}>
//           <Ionicons
//             name="play-circle-outline"
//             size={24}
//             color="#2563EB"
//           />
//           <Text style={styles.value}>{lessonCount}</Text>
//           <Text style={styles.label}>Lessons</Text>
//         </View>

//         <View style={styles.statCard}>
//           <Ionicons
//             name="albums-outline"
//             size={24}
//             color="#2563EB"
//           />
//           <Text style={styles.value}>{sectionCount}</Text>
//           <Text style={styles.label}>Sections</Text>
//         </View>

//         <View style={styles.statCard}>
//           <Ionicons
//             name="time-outline"
//             size={24}
//             color="#2563EB"
//           />
//           <Text style={styles.value}>
//             {formatDuration(totalDuration)}
//           </Text>
//           <Text style={styles.label}>Duration</Text>
//         </View>
//       </View>

//       <View style={styles.levelContainer}>
//         <Text style={styles.levelBadge}>
//           {level}
//         </Text>
//       </View>

//       <Text style={styles.heading}>
//         Description
//       </Text>

//       <Text style={styles.description}>
//         {description}
//       </Text>

//       <View style={styles.progressContainer}>
//         <View style={styles.progressHeader}>
//           <Text style={styles.heading}>
//             Your Progress
//           </Text>

//           <Text style={styles.percent}>
//             {progress}%
//           </Text>
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

//         <Text style={styles.completed}>
//           {completedLessons} lessons completed
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 18,
//     marginBottom: 20,
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   statCard: {
//     alignItems: "center",
//     flex: 1,
//   },

//   value: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginTop: 8,
//     color: "#111827",
//   },

//   label: {
//     color: "#6B7280",
//     marginTop: 4,
//     fontSize: 13,
//   },

//   levelContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//   },

//   levelBadge: {
//     alignSelf: "flex-start",
//     backgroundColor: "#DBEAFE",
//     color: "#2563EB",
//     fontWeight: "600",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },

//   heading: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 10,
//   },

//   description: {
//     color: "#4B5563",
//     lineHeight: 22,
//   },

//   progressContainer: {
//     marginTop: 24,
//   },

//   progressHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   percent: {
//     color: "#2563EB",
//     fontWeight: "700",
//     fontSize: 16,
//   },

//   progressBackground: {
//     height: 8,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 20,
//     overflow: "hidden",
//   },

//   progressFill: {
//     height: "100%",
//     backgroundColor: "#2563EB",
//   },

//   completed: {
//     marginTop: 10,
//     color: "#6B7280",
//     fontSize: 14,
//   },
// });


//gemini UI

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  description: string;
  lessonCount: number;
  sectionCount: number;
  totalDuration: number;
  progress: number;
  completedLessons: number;
  level: string;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}m`;
}

export default function CourseInfo({
  description,
  lessonCount,
  sectionCount,
  totalDuration,
  progress,
  completedLessons,
  level,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="play-circle-outline"
              size={24}
              color="#3B82F6" // Modern, brighter blue
            />
          </View>
          <Text style={styles.value}>{lessonCount}</Text>
          <Text style={styles.label}>Lessons</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="albums-outline"
              size={24}
              color="#3B82F6"
            />
          </View>
          <Text style={styles.value}>{sectionCount}</Text>
          <Text style={styles.label}>Sections</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="time-outline"
              size={24}
              color="#3B82F6"
            />
          </View>
          <Text style={styles.value}>
            {formatDuration(totalDuration)}
          </Text>
          <Text style={styles.label}>Duration</Text>
        </View>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelBadge}>
          {level}
        </Text>
      </View>

      <Text style={styles.heading}>
        Description
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.headingStyle}>
            Your Progress
          </Text>

          <Text style={styles.percent}>
            {progress}%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.completed}>
          {completedLessons} lessons completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, // Matches the smooth 24px radius of your header
    padding: 24, // Increased padding for a more breathable layout
    marginBottom: 24,
    // Added a very subtle shadow for a premium floating card effect
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2, // For Android
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  statCard: {
    alignItems: "center",
    flex: 1,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF", // Soft blue background for the icon
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A", // Deep slate
    letterSpacing: -0.5,
  },

  label: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },

  levelContainer: {
    marginTop: 16,
    marginBottom: 24,
  },

  levelBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9", // Sleek gray instead of heavy blue
    color: "#475569",
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 1, // Premium editorial tracking
    textTransform: "uppercase",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8, // Sharper border radius for internal tags
    overflow: "hidden",
  },

  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  
  // A variant of heading without bottom margin for the flex row
  headingStyle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.4,
  },

  description: {
    color: "#475569",
    lineHeight: 24, // Increased line height for excellent readability
    fontSize: 15,
  },

  progressContainer: {
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9", // A subtle separator line makes the card look structured
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  percent: {
    color: "#3B82F6",
    fontWeight: "800",
    fontSize: 16,
  },

  progressBackground: {
    height: 10, // Slightly thicker for a modern tactile feel
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
  },

  completed: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },
});