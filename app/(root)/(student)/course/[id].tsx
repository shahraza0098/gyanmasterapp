// import { useMemo } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useLocalSearchParams, router } from "expo-router";

// import { useCourse } from "@/hooks/useCourse";

// import CourseHeader from "@/components/course/CourseHeader";
// import CourseInfo from "@/components/course/CourseInfo";
// import SectionAccordion from "@/components/course/SectionAccordion";

// export default function CourseScreen() {
//   const { id } = useLocalSearchParams();

//   const {
//     course,
//     loading,
//     refreshing,
//     refresh,
//     error,
//   } = useCourse(id);

//   const lessonCount = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce(
//       (total, section) => total + section.lessons.length,
//       0
//     );
//   }, [course]);

//   const completedLessons = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce((total, section) => {
//       return (
//         total +
//         section.lessons.filter(
//           (lesson) => lesson.progress?.completed
//         ).length
//       );
//     }, 0);
//   }, [course]);

//   const totalDuration = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce((total, section) => {
//       return (
//         total +
//         section.lessons.reduce(
//           (lessonTotal, lesson) =>
//             lessonTotal + lesson.duration,
//           0
//         )
//       );
//     }, 0);
//   }, [course]);

//   const progress = useMemo(() => {
//     if (!lessonCount) return 0;

//     return Math.round(
//       (completedLessons / lessonCount) * 100
//     );
//   }, [lessonCount, completedLessons]);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator
//           size="large"
//           color="#2563EB"
//         />
//       </SafeAreaView>
//     );
//   }

//   if (error || !course) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={styles.error}>
//           {error ?? "Course not found"}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//           />
//         }
//         contentContainerStyle={styles.content}
//       >
//                 <CourseHeader
//           title={course.title}
//           thumbnailUrl={course.thumbnailUrl}
//           category={course.category.name}
//           level={course.level}
//         />

//         <CourseInfo
//           description={course.description}
//           lessonCount={lessonCount}
//           sectionCount={course.sections.length}
//           totalDuration={totalDuration}
//           progress={progress}
//           completedLessons={completedLessons}
//           level={course.level}
//         />

//         <Text style={styles.sectionTitle}>
//           Course Content
//         </Text>

//         {course.sections.map((section, index) => (
//           <SectionAccordion
//             key={section.id}
//             section={section}
//             initiallyExpanded={index === 0}
//             onLessonPress={(lessonId) =>
//               router.push({
//                 pathname: "/lesson/[lessonId]",
//                 params: {
//                   lessonId,
//                 },
//               })
//             }
//           />
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   content: {
//     padding: 16,
//     paddingBottom: 40,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   error: {
//     fontSize: 16,
//     color: "#EF4444",
//     textAlign: "center",
//   },

//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 16,
//     marginTop: 6,
//   },
// });




//claude UI

// import { useMemo } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useLocalSearchParams, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// import { useCourse } from "@/hooks/useCourse";

// import CourseHeader from "@/components/course/CourseHeader";
// import CourseInfo from "@/components/course/CourseInfo";
// import SectionAccordion from "@/components/course/SectionAccordion";

// export default function CourseScreen() {
//   const { id } = useLocalSearchParams();

//   const {
//     course,
//     loading,
//     refreshing,
//     refresh,
//     error,
//   } = useCourse(id);

//   const lessonCount = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce(
//       (total, section) => total + section.lessons.length,
//       0
//     );
//   }, [course]);

//   const completedLessons = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce((total, section) => {
//       return (
//         total +
//         section.lessons.filter(
//           (lesson) => lesson.progress?.completed
//         ).length
//       );
//     }, 0);
//   }, [course]);

//   const totalDuration = useMemo(() => {
//     if (!course) return 0;

//     return course.sections.reduce((total, section) => {
//       return (
//         total +
//         section.lessons.reduce(
//           (lessonTotal, lesson) =>
//             lessonTotal + lesson.duration,
//           0
//         )
//       );
//     }, 0);
//   }, [course]);

//   const progress = useMemo(() => {
//     if (!lessonCount) return 0;

//     return Math.round(
//       (completedLessons / lessonCount) * 100
//     );
//   }, [lessonCount, completedLessons]);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#2563EB" />
//         <Text style={styles.loadingText}>Loading course…</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error || !course) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <View style={styles.errorIconWrap}>
//           <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
//         </View>
//         <Text style={styles.error}>
//           {error ?? "Course not found"}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//             tintColor="#2563EB"
//           />
//         }
//         contentContainerStyle={styles.content}
//       >
//         <CourseHeader
//           title={course.title}
//           thumbnailUrl={course.thumbnailUrl}
//           category={course.category.name}
//           level={course.level}
//         />

//         <CourseInfo
//           description={course.description}
//           lessonCount={lessonCount}
//           sectionCount={course.sections.length}
//           totalDuration={totalDuration}
//           progress={progress}
//           completedLessons={completedLessons}
//           level={course.level}
//         />

//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>Course Content</Text>
//           <View style={styles.countBadge}>
//             <Text style={styles.countBadgeText}>
//               {course.sections.length} {course.sections.length === 1 ? "section" : "sections"}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.accordionGroup}>
//           {course.sections.map((section, index) => (
//             <SectionAccordion
//               key={section.id}
//               section={section}
//               initiallyExpanded={index === 0}
//               onLessonPress={(lessonId) =>
//                 router.push({
//                   pathname: "/lesson/[lessonId]",
//                   params: {
//                     lessonId,
//                   },
//                 })
//               }
//             />
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   content: {
//     padding: 16,
//     paddingBottom: 48,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8FAFC",
//     paddingHorizontal: 32,
//   },

//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#6B7280",
//   },

//   errorIconWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#FEE2E2",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },

//   error: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#374151",
//     textAlign: "center",
//   },

//   sectionHeaderRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 12,
//     marginBottom: 14,
//   },

//   sectionTitle: {
//     fontSize: 21,
//     fontWeight: "800",
//     color: "#111827",
//     letterSpacing: 0.2,
//   },

//   countBadge: {
//     backgroundColor: "#EFF6FF",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 999,
//   },

//   countBadgeText: {
//     fontSize: 12.5,
//     fontWeight: "700",
//     color: "#2563EB",
//   },

//   accordionGroup: {
//     gap: 10,
//   },
// });



//gemini UI


import { useMemo } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

import { useCourse } from "@/hooks/useCourse";

import CourseHeader from "@/components/course/CourseHeader";
import CourseInfo from "@/components/course/CourseInfo";
import SectionAccordion from "@/components/course/SectionAccordion";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useAppTheme } from "@/providers/ThemeProvider";

export default function CourseScreen() {
  const theme = useAppTheme();
  const { id } = useLocalSearchParams();

  const {
    course,
    loading,
    refreshing,
    refresh,
    error,
  } = useCourse(typeof id === "string" ? id : id[0]);

  const lessonCount = useMemo(() => {
    if (!course) return 0;

    return course.sections.reduce(
      (total, section) => total + section.lessons.length,
      0
    );
  }, [course]);

  const completedLessons = useMemo(() => {
    if (!course) return 0;

    return course.sections.reduce((total, section) => {
      return (
        total +
        section.lessons.filter(
          (lesson) => lesson.progress?.completed
        ).length
      );
    }, 0);
  }, [course]);

  const totalDuration = useMemo(() => {
    if (!course) return 0;

    return course.sections.reduce((total, section) => {
      return (
        total +
        section.lessons.reduce(
          (lessonTotal, lesson) =>
            lessonTotal + lesson.duration,
          0
        )
      );
    }, 0);
  }, [course]);

  const progress = useMemo(() => {
    if (!lessonCount) return 0;

    return Math.round(
      (completedLessons / lessonCount) * 100
    );
  }, [lessonCount, completedLessons]);

  if (loading) {
    return <LoadingState message="Loading course…" />;
  }

  if (error || !course) {
    return (
      <ErrorState
        title="Couldn't load this course"
        message={error ?? "Course not found"}
        onRetry={refresh}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        contentContainerStyle={styles.content}
      >
        <CourseHeader
          title={course.title}
          thumbnailUrl={course.thumbnailUrl}
          category={course.category.name}
          level={course.level}
        />

        <CourseInfo
          description={course.description}
          lessonCount={lessonCount}
          sectionCount={course.sections.length}
          totalDuration={totalDuration}
          progress={progress}
          completedLessons={completedLessons}
          level={course.level}
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Course Content
        </Text>

        {course.sections.map((section, index) => (
          <SectionAccordion
            key={section.id}
            section={section}
            initiallyExpanded={index === 0}
            onLessonPress={(lessonId) =>
              router.push({
                pathname: "/lesson/[lessonId]",
                params: {
                  lessonId,
                },
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 56,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
    marginTop: 32,
    letterSpacing: -0.5,
  },
});
