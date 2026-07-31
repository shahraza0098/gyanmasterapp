

//gemini UI

import React from "react";
import {
  RefreshControl, 
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { useLesson } from "@/hooks/useLesson";
import { useLessonPlayer } from "@/hooks/useLessonPlayer";

import LessonHeader from "@/components/lesson/LessonHeader";
import VideoPlayer from "@/components/lesson/VideoPlayer";
import LessonProgress from "@/components/lesson/LessonProgress";
import LessonDescription from "@/components/lesson/LessonDescription";
import LessonNavigation from "@/components/lesson/LessonNavigation";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useAppTheme } from "@/providers/ThemeProvider";

export default function LessonScreen() {
  const theme = useAppTheme();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  const { lesson, loading, refreshing, error, refresh } = useLesson(lessonId);

  console.log("Lesson URL:", lesson?.streamUrl);

  /**
   * Lesson Player Configuration
   */
  const player = useLessonPlayer({
    lessonId: lesson?.id ?? "",
    duration: lesson?.duration ?? 0,
    initialWatchedSeconds: lesson?.watchedSeconds ?? 0,
  });

  /**
   * Loading State
   */
  if (loading) {
    return <LoadingState message="Loading your lesson…" />;
  }

  /**
   * Error / Not Found State
   */
  if (!lesson) {
    return (
      <ErrorState
        title={error ?? "Unable to load lesson"}
        message="Please try again or check your connection."
        onRetry={refresh}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.headerWrapper}>
          <LessonHeader
            courseTitle={lesson.course.title}
            sectionTitle={lesson.section.title}
            lessonTitle={lesson.title}
          />
        </View>

        {/* Media & Progress Card */}
        <View style={[styles.mediaCard, { backgroundColor: theme.surface, shadowColor: theme.text }]}>
          <VideoPlayer
            streamUrl={lesson.streamUrl}
            watchedSeconds={player.watchedSeconds}
            onTimeUpdate={player.onTimeUpdate}
            onEnded={player.onEnded}
          />
          <View style={[styles.progressWrapper, { borderTopColor: theme.border }]}>
            <LessonProgress
              watchedSeconds={player.watchedSeconds}
              duration={lesson.duration}
              completed={player.completed}
            />
          </View>
        </View>

        {/* Lesson Details */}
        <View style={styles.detailsWrapper}>
          <LessonDescription description={lesson.description} />
        </View>

        {/* Footer Navigation */}
        <View style={styles.navigationWrapper}>
          <LessonNavigation
            previousLesson={lesson.previousLesson}
            nextLesson={lesson.nextLesson}
          />
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSafeArea} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  // --- Layout Wrappers ---
  headerWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mediaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 28,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  progressWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  detailsWrapper: {
    paddingHorizontal: 20,
    marginBottom: 36,
  },
  navigationWrapper: {
    paddingHorizontal: 20,
  },
  bottomSafeArea: {
    height: 40,
  },
});






//claude

// import React from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useLocalSearchParams } from "expo-router";

// import { useLesson } from "@/hooks/useLesson";
// import { useLessonPlayer } from "@/hooks/useLessonPlayer";

// import LessonHeader from "@/components/lesson/LessonHeader";
// import VideoPlayer from "@/components/lesson/VideoPlayer";
// import LessonProgress from "@/components/lesson/LessonProgress";
// import LessonDescription from "@/components/lesson/LessonDescription";
// import LessonNavigation from "@/components/lesson/LessonNavigation";

// export default function LessonScreen() {
//   const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

//   const { lesson, loading, refreshing, error, refresh } = useLesson(lessonId);

//   console.log("Lesson URL:", lesson?.streamUrl);

//   /**
//    * Lesson Player Configuration
//    */
//   const player = useLessonPlayer({
//     lessonId: lesson?.id ?? "",
//     duration: lesson?.duration ?? 0,
//     initialWatchedSeconds: lesson?.watchedSeconds ?? 0,
//   });

//   /**
//    * Loading State
//    */
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.centerState}>
//         <ActivityIndicator size="large" color="#4F46E5" />
//         <Text style={styles.stateText}>Loading your lesson...</Text>
//       </SafeAreaView>
//     );
//   }

//   /**
//    * Error / Not Found State
//    */
//   if (!lesson) {
//     return (
//       <SafeAreaView style={styles.centerState}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorIcon}>⚠️</Text>
//           <Text style={styles.errorTitle}>
//             {error ?? "Unable to load lesson"}
//           </Text>
//           <Text style={styles.errorSubtext}>
//             Please pull down to refresh and try again.
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//             tintColor="#4F46E5"
//             colors={["#4F46E5"]}
//           />
//         }
//       >
//         {/* Header Section */}
//         <View style={styles.headerWrapper}>
//           <LessonHeader
//             courseTitle={lesson.course.title}
//             sectionTitle={lesson.section.title}
//             lessonTitle={lesson.title}
//           />
//         </View>

//         {/* Media & Progress Card */}
//         <View style={styles.mediaCard}>
//           <VideoPlayer
//             streamUrl={lesson.streamUrl}
//             watchedSeconds={player.watchedSeconds}
//             onTimeUpdate={player.onTimeUpdate}
//             onEnded={player.onEnded}
//           />
//           <View style={styles.progressWrapper}>
//             <LessonProgress
//               watchedSeconds={player.watchedSeconds}
//               duration={lesson.duration}
//               completed={player.completed}
//             />
//           </View>
//         </View>

//         {/* Lesson Details */}
//         <View style={styles.detailsWrapper}>
//           <LessonDescription description={lesson.description} />
//         </View>

//         {/* Footer Navigation */}
//         <View style={styles.navigationWrapper}>
//           <LessonNavigation
//             previousLesson={lesson.previousLesson}
//             nextLesson={lesson.nextLesson}
//           />
//         </View>

//         {/* Bottom Spacer */}
//         <View style={styles.bottomSafeArea} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F8FB",
//   },
//   scrollContent: {
//     paddingTop: 12,
//     paddingBottom: 24,
//   },

//   // --- States (Loading/Error) ---
//   centerState: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F7F8FB",
//   },
//   stateText: {
//     marginTop: 16,
//     fontSize: 15,
//     color: "#64748B",
//     fontFamily: "Poppins-Medium",
//   },
//   errorContainer: {
//     alignItems: "center",
//     paddingHorizontal: 40,
//   },
//   errorIcon: {
//     fontSize: 44,
//     marginBottom: 16,
//   },
//   errorTitle: {
//     fontSize: 18,
//     color: "#1E293B",
//     textAlign: "center",
//     fontFamily: "Poppins-SemiBold",
//     marginBottom: 8,
//   },
//   errorSubtext: {
//     fontSize: 14,
//     color: "#64748B",
//     textAlign: "center",
//     fontFamily: "Poppins-Regular",
//     lineHeight: 20,
//   },

//   // --- Layout Wrappers ---
//   headerWrapper: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   mediaCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 28,
//     marginHorizontal: 16,
//     marginBottom: 28,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#F1F4F9",
//     shadowColor: "#0F172A",
//     shadowOffset: { width: 0, height: 14 },
//     shadowOpacity: 0.06,
//     shadowRadius: 26,
//     elevation: 4,
//   },
//   progressWrapper: {
//     paddingHorizontal: 20,
//     paddingVertical: 18,
//     borderTopWidth: 1,
//     borderTopColor: "#F1F4F9",
//   },
//   detailsWrapper: {
//     paddingHorizontal: 20,
//     marginBottom: 36,
//   },
//   navigationWrapper: {
//     paddingHorizontal: 20,
//   },
//   bottomSafeArea: {
//     height: 40,
//   },
// });
