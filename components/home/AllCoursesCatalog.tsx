// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Image } from "expo-image";
// import { Ionicons } from "@expo/vector-icons";

// import { CourseCard } from "@/types/home";
// import { useAppTheme } from "@/providers/ThemeProvider";

// interface Props {
//   courses: CourseCard[];
//   onPress(course: CourseCard): void;
// }

// function formatDuration(seconds?: number | null) {
//   if (!seconds) return "Self-paced";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   return hours ? `${hours}h ${minutes}m` : `${minutes} min`;
// }

// function formatPrice(price: number) {
//   return price > 0 ? `₹${price.toLocaleString("en-IN")}` : "Free";
// }

// export default function AllCoursesCatalog({ courses, onPress }: Props) {
//   const theme = useAppTheme();

//   if (!courses.length) return null;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={[styles.heading, { color: theme.text }]}>All Courses</Text>
//           <Text style={[styles.subtitle, { color: theme.textMuted }]}>
//             Explore {courses.length} published {courses.length === 1 ? "course" : "courses"}
//           </Text>
//         </View>
//         <View style={[styles.count, { backgroundColor: theme.primarySoft }]}>
//           <Text style={[styles.countText, { color: theme.primary }]}>{courses.length}</Text>
//         </View>
//       </View>

//       <View style={styles.list}>
//         {courses.map((course) => (
//           <Pressable
//             key={course.id}
//             accessibilityRole="button"
//             accessibilityLabel={`Open ${course.title}`}
//             onPress={() => onPress(course)}
//             style={({ pressed }) => [
//               styles.card,
//               { backgroundColor: theme.surface, borderColor: theme.border },
//               pressed && styles.cardPressed,
//             ]}
//           >
//             <Image source={{ uri: course.thumbnailUrl }} style={styles.image} contentFit="cover" />
//             <View style={styles.content}>
//               <View style={styles.titleRow}>
//                 <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
//                   {course.title}
//                 </Text>
//                 <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
//               </View>
//               <Text numberOfLines={1} style={[styles.category, { color: theme.textMuted }]}>
//                 {course.category.name}
//               </Text>
//               <View style={styles.metaRow}>
//                 <View style={[styles.level, { backgroundColor: theme.primarySoft }]}>
//                   <Text style={[styles.levelText, { color: theme.primary }]}>{course.level}</Text>
//                 </View>
//                 <View style={styles.metaItem}>
//                   <Ionicons name="book-outline" size={14} color={theme.textMuted} />
//                   <Text style={[styles.metaText, { color: theme.textMuted }]}>{course.totalLessons} lessons</Text>
//                 </View>
//                 <View style={styles.metaItem}>
//                   <Ionicons name="time-outline" size={14} color={theme.textMuted} />
//                   <Text style={[styles.metaText, { color: theme.textMuted }]}>{formatDuration(course.totalDuration)}</Text>
//                 </View>
//               </View>
//               <Text style={[styles.price, { color: theme.text }]}>{formatPrice(course.price)}</Text>
//             </View>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { gap: 16 },
//   header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
//   heading: { fontSize: 22, fontWeight: "700", letterSpacing: -0.4 },
//   subtitle: { marginTop: 4, fontSize: 14, fontWeight: "500" },
//   count: { minWidth: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
//   countText: { fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
//   list: { gap: 14 },
//   card: { minHeight: 132, flexDirection: "row", overflow: "hidden", borderWidth: 1, borderRadius: 20, borderCurve: "continuous", boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" },
//   cardPressed: { opacity: 0.88, transform: [{ scale: 0.985 }] },
//   image: { width: 112, alignSelf: "stretch" },
//   content: { flex: 1, padding: 14, justifyContent: "space-between", gap: 8 },
//   titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
//   title: { flex: 1, fontSize: 16, lineHeight: 21, fontWeight: "700" },
//   category: { fontSize: 13, fontWeight: "500" },
//   metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8 },
//   level: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
//   levelText: { fontSize: 11, fontWeight: "700" },
//   metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
//   metaText: { fontSize: 11, fontWeight: "500" },
//   price: { fontSize: 14, fontWeight: "800" },
// });



//gemini UI


// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Image } from "expo-image";
// import { Ionicons } from "@expo/vector-icons";

// import { CourseCard } from "@/types/home";
// import { useAppTheme } from "@/providers/ThemeProvider";

// interface Props {
//   courses: CourseCard[];
//   onPress(course: CourseCard): void;
// }

// function formatDuration(seconds?: number | null) {
//   if (!seconds) return "Self-paced";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   return hours ? `${hours}h ${minutes}m` : `${minutes} min`;
// }

// function formatPrice(price: number) {
//   return price > 0 ? `₹${price.toLocaleString("en-IN")}` : "Free";
// }

// export default function AllCoursesCatalog({ courses, onPress }: Props) {
//   const theme = useAppTheme();

//   if (!courses.length) return null;

//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerTextGroup}>
//           <Text style={[styles.heading, { color: theme.text }]}>
//             All Courses
//           </Text>
//           <Text style={[styles.subtitle, { color: theme.textMuted }]}>
//             Explore {courses.length} published {courses.length === 1 ? "course" : "courses"}
//           </Text>
//         </View>
//         <View style={[styles.countBadge, { backgroundColor: theme.primarySoft }]}>
//           <Text style={[styles.countText, { color: theme.primary }]}>
//             {courses.length}
//           </Text>
//         </View>
//       </View>

//       {/* Catalog List */}
//       <View style={styles.list}>
//         {courses.map((course) => (
//           <Pressable
//             key={course.id}
//             accessibilityRole="button"
//             accessibilityLabel={`Open ${course.title}`}
//             onPress={() => onPress(course)}
//             style={({ pressed }) => [
//               styles.card,
//               { backgroundColor: theme.surface, borderColor: theme.border },
//               pressed && styles.cardPressed,
//             ]}
//           >
//             {/* Inset Thumbnail */}
//             <Image 
//               source={{ uri: course.thumbnailUrl }} 
//               style={styles.image} 
//               contentFit="cover" 
//               transition={200}
//             />

//             {/* Card Content */}
//             <View style={styles.content}>
//               <View style={styles.topSection}>
//                 <View style={styles.categoryRow}>
//                   <Text numberOfLines={1} style={[styles.category, { color: theme.textMuted }]}>
//                     {course.category.name}
//                   </Text>
//                   <View style={[styles.levelBadge, { backgroundColor: theme.primarySoft }]}>
//                     <Text style={[styles.levelText, { color: theme.primary }]}>
//                       {course.level}
//                     </Text>
//                   </View>
//                 </View>

//                 <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
//                   {course.title}
//                 </Text>
//               </View>

//               <View style={styles.bottomSection}>
//                 <View style={styles.metaContainer}>
//                   <View style={styles.metaItem}>
//                     <Ionicons name="book-outline" size={14} color={theme.textMuted} />
//                     <Text style={[styles.metaText, { color: theme.textMuted }]}>
//                       {course.totalLessons} lessons
//                     </Text>
//                   </View>
//                   <View style={styles.metaDot} />
//                   <View style={styles.metaItem}>
//                     <Ionicons name="time-outline" size={14} color={theme.textMuted} />
//                     <Text style={[styles.metaText, { color: theme.textMuted }]}>
//                       {formatDuration(course.totalDuration)}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.priceRow}>
//                   <Text style={[styles.price, { color: theme.text }]}>
//                     {formatPrice(course.price)}
//                   </Text>
//                   <Ionicons name="arrow-forward-circle" size={24} color={theme.primary} />
//                 </View>
//               </View>
//             </View>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     gap: 24,
//     paddingVertical: 8,
//   },

//   // --- Header ---
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 4,
//   },
//   headerTextGroup: {
//     flex: 1,
//     paddingRight: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "800",
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     marginTop: 4,
//     fontSize: 14,
//     fontWeight: "500",
//     letterSpacing: 0.2,
//   },
//   countBadge: {
//     minWidth: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 12,
//   },
//   countText: {
//     fontSize: 15,
//     fontWeight: "800",
//     fontVariant: ["tabular-nums"],
//   },

//   // --- List & Card ---
//   list: {
//     gap: 16,
//   },
//   card: {
//     flexDirection: "row",
//     padding: 12,
//     borderWidth: 1,
//     borderRadius: 24,
//     borderCurve: "continuous",

//     // Smooth, premium shadow cross-platform
//     shadowColor: "#0F172A",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.06,
//     shadowRadius: 16,
//     elevation: 4,
//   },
//   cardPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },

//   // --- Image ---
//   image: {
//     width: 110,
//     height: 128,
//     borderRadius: 16,
//     borderCurve: "continuous",
//   },

//   // --- Content ---
//   content: {
//     flex: 1,
//     marginLeft: 16,
//     justifyContent: "space-between",
//     paddingVertical: 2,
//   },
//   topSection: {
//     gap: 6,
//   },
//   categoryRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   category: {
//     fontSize: 12,
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     flex: 1,
//     paddingRight: 8,
//   },
//   levelBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   levelText: {
//     fontSize: 10,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   title: {
//     fontSize: 16,
//     lineHeight: 22,
//     fontWeight: "700",
//     letterSpacing: -0.2,
//   },

//   // --- Meta & Footer ---
//   bottomSection: {
//     gap: 12,
//   },
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   metaItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   metaDot: {
//     width: 3,
//     height: 3,
//     borderRadius: 1.5,
//     backgroundColor: "#CBD5E1", // Soft separator dot
//   },
//   metaText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   price: {
//     fontSize: 17,
//     fontWeight: "800",
//     letterSpacing: -0.3,
//   },
// });




//Claude UI
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { CourseCard } from "@/types/home";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  courses: CourseCard[];
  onPress(course: CourseCard): void;
}

function formatDuration(seconds?: number | null) {
  if (!seconds) return "Self-paced";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes} min`;
}

function formatPrice(price: number) {
  return price > 0 ? `₹${price.toLocaleString("en-IN")}` : "Free";
}

export default function AllCoursesCatalog({
  courses,
  onPress,
}: Props) {
  const theme = useAppTheme();

  if (!courses.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
              },
            ]}
          >
            All Courses
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textMuted,
              },
            ]}
          >
            Explore {courses.length} published{" "}
            {courses.length === 1 ? "course" : "courses"}
          </Text>
        </View>

        <View
          style={[
            styles.count,
            {
              backgroundColor: theme.primarySoft,
              shadowColor: theme.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              {
                color: theme.primary,
              },
            ]}
          >
            {courses.length}
          </Text>
        </View>
      </View>

      <View style={styles.list}>
        {courses.map((course) => (
          <Pressable
            key={course.id}
            accessibilityRole="button"
            accessibilityLabel={`Open ${course.title}`}
            onPress={() => onPress(course)}
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.cardPressed,
            ]}
          >
            <View
              style={[
                styles.shadowContainer,
                {
                  shadowColor: theme.isDark
                    ? "#000"
                    : "#111827",
                },
              ]}
            >
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#E5E7EB",
                  },
                ]}
              >
                <View style={styles.imageWrap}>
                  <Image
                    source={{
                      uri: course.thumbnailUrl,
                    }}
                    style={styles.image}
                    contentFit="cover"
                  />

                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0,0,0,0.55)",
                    ]}
                    style={styles.imageOverlay}
                  />

                  <View
                    style={[
                      styles.level,
                      {
                        backgroundColor:
                          "rgba(0,0,0,0.72)",
                      },
                    ]}
                  >
                    <Text style={styles.levelText}>
                      {course.level}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.category,
                        {
                          color: theme.primary,
                        },
                      ]}
                    >
                      {course.category.name.toUpperCase()}
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={[
                        styles.title,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      {course.title}
                    </Text>
                  </View>

                  <View style={styles.footerRow}>
                    <View style={styles.metaGroup}>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="book-outline"
                          size={14}
                          color={theme.textMuted}
                        />

                        <Text
                          style={[
                            styles.metaText,
                            {
                              color: theme.textMuted,
                            },
                          ]}
                        >
                          {course.totalLessons} lessons
                        </Text>
                      </View>

                      <View style={styles.metaDot} />

                      <View style={styles.metaItem}>
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color={theme.textMuted}
                        />

                        <Text
                          style={[
                            styles.metaText,
                            {
                              color: theme.textMuted,
                            },
                          ]}
                        >
                          {formatDuration(
                            course.totalDuration
                          )}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.priceRow}>
                      <Text
                        style={[
                          styles.price,
                          {
                            color: theme.text,
                          },
                        ]}
                      >
                        {formatPrice(course.price)}
                      </Text>

                      <View
                        style={[
                          styles.chevronWrap,
                          {
                            backgroundColor:
                              theme.primarySoft,
                          },
                        ]}
                      >
                        <Ionicons
                          name="arrow-forward"
                          size={18}
                          color={theme.primary}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingBottom: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },

  count: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },

  countText: {
    fontSize: 14,
    fontWeight: "800",
  },

  list: {
    gap: 20,
  },

  pressable: {
    borderRadius: 24,
  },

  /**
   * Shadow container
   * Don't use overflow:hidden here
   */
  shadowContainer: {
    borderRadius: 24,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.12,

    shadowRadius: 18,

    elevation: 10,

    backgroundColor: "transparent",
  },

  /**
   * Actual card
   */
  card: {
    borderRadius: 24,

    overflow: "hidden",

    borderWidth: 1,

    backgroundColor: "#fff",
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.96,
  },

  imageWrap: {
    width: "100%",
    height: 180,

    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: "65%",
  },

  level: {
    position: "absolute",

    top: 14,
    left: 14,

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 18,
  },

  levelText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  content: {
    padding: 18,
    gap: 18,
  },

  category: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 25,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  metaGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
  },

  metaText: {
    fontSize: 12,
    fontWeight: "500",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
  },

  chevronWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,

    alignItems: "center",
    justifyContent: "center",
  },
});