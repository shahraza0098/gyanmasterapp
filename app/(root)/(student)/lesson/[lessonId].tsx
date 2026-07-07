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
//   const { lessonId } = useLocalSearchParams<{
//     lessonId: string;
//   }>();

//   const {
//     lesson,
//     loading,
//     refreshing,
//     error,
//     refresh,
//   } = useLesson(lessonId);

// console.log("lesson Url", lesson?.streamUrl);
  
//   /**
//    * Lesson Player
//    */

//   const player = useLessonPlayer({
//   lessonId: lesson?.id ?? "",
//   duration: lesson?.duration ?? 0,
//   initialWatchedSeconds:
//     lesson?.watchedSeconds ?? 0,
// });

//   /**
//    * Wait until lesson is loaded before
//    * creating the player UI.
//    */
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

//   if (!lesson) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={styles.error}>
//           {error ??
//             "Unable to load lesson."}
//         </Text>
//       </SafeAreaView>
//     );
//   }


//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={
//           styles.content
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//           />
//         }
//       >
//         <LessonHeader
//           courseTitle={
//             lesson.course.title
//           }
//           sectionTitle={
//             lesson.section.title
//           }
//           lessonTitle={lesson.title}
//         />

//         <VideoPlayer
//           streamUrl={
//             lesson.streamUrl
//           }
//           watchedSeconds={
//             player.watchedSeconds
//           }
//           onTimeUpdate={
//             player.onTimeUpdate
//           }
//           onEnded={player.onEnded}
//         />

//         <LessonProgress
//           watchedSeconds={
//             player.watchedSeconds
//           }
//           duration={
//             lesson.duration
//           }
//           completed={
//             player.completed
//           }
//         />

//         <LessonDescription
//           description={
//             lesson.description
//           }
//         />

//         <LessonNavigation
//           previousLesson={
//             lesson.previousLesson
//           }
//           nextLesson={
//             lesson.nextLesson
//           }
//         />

//         <View
//           style={
//             styles.bottomSpacing
//           }
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor:
//       "#F8FAFC",
//   },

//   content: {
//     paddingHorizontal: 20,

//     paddingTop: 12,

//     paddingBottom: 40,
//   },

//   center: {
//     flex: 1,

//     justifyContent: "center",

//     alignItems: "center",

//     backgroundColor:
//       "#F8FAFC",
//   },

//   error: {
//     fontSize: 16,

//     color: "#EF4444",

//     textAlign: "center",

//     fontFamily:
//       "Poppins-Medium",

//     paddingHorizontal: 30,
//   },

//   bottomSpacing: {
//     height: 30,
//   },
// });




//gemini UI

import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
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

export default function LessonScreen() {
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
    return (
      <SafeAreaView style={styles.centerState}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.stateText}>Loading your lesson...</Text>
      </SafeAreaView>
    );
  }

  /**
   * Error / Not Found State
   */
  if (!lesson) {
    return (
      <SafeAreaView style={styles.centerState}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>
            {error ?? "Unable to load lesson"}
          </Text>
          <Text style={styles.errorSubtext}>
            Please pull down to refresh and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#3B82F6"
            colors={["#3B82F6"]}
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
        <View style={styles.mediaCard}>
          <VideoPlayer
            streamUrl={lesson.streamUrl}
            watchedSeconds={player.watchedSeconds}
            onTimeUpdate={player.onTimeUpdate}
            onEnded={player.onEnded}
          />
          <View style={styles.progressWrapper}>
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
    backgroundColor: "#F4F7FA", // Modern, slightly cooler soft background
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  // --- States (Loading/Error) ---
  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FA",
  },
  stateText: {
    marginTop: 16,
    fontSize: 15,
    color: "#64748B",
    fontFamily: "Poppins-Medium",
  },
  errorContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    color: "#1E293B",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
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
    // Elegant soft shadow for iOS
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    // Elevation for Android
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