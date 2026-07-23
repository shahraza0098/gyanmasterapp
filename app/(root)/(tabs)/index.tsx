

// import { useState } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
// } from "react-native";
// import { router } from "expo-router";

// import { useHome } from "@/hooks/useHome";

// import GreetingHeader from "@/components/home/GreetingHeader";
// import SearchBar from "@/components/home/SearchBar";
// import ContinueLearningCard from "@/components/home/ContinueLearningCard";
// import CategoryList from "@/components/home/CategoryList";
// import CourseHorizontalList from "@/components/home/CourseHorizontalList";

// export default function HomeScreen() {
//   const {
//     user,
//     continueLearning,
//     categories,
//     featuredCourses,
//     popularCourses,
//     trendingCourses,
//     loading,
//     refreshing,
//     refresh,
//     error,
//   } = useHome();



//   const [search, setSearch] = useState("");

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={styles.error}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   console.log("featuredCourses", featuredCourses);
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={refresh}
//           />
//         }
//       >
//         <GreetingHeader
//           name={user?.name}
//           image={user?.image}
//         />

//         <SearchBar
//           value={search}
//           onChangeText={setSearch}
//         />

//         <ContinueLearningCard
//           data={continueLearning}
//           onPress={() => {
//             if (!continueLearning) return;

//             router.push({
//               pathname: "/lesson/[lessonId]",
//               params: {
//                 lessonId: continueLearning.lessonId,
//               },
//             });
//           }}
//         />

//         <CategoryList
//           categories={categories}
//           onPress={(category) =>
//             router.push({
//               pathname: "/courses",
//               params: {
//                 categoryId: category.id,
//               },
//             })
//           }
//         />

//         <CourseHorizontalList
//           title="Featured Courses"
//           courses={featuredCourses}
//           onPress={(course) =>
//             router.push(`/course/${course.id}`)
//           }
//         />

//         <CourseHorizontalList
//           title="Popular Courses"
//           courses={popularCourses}
//           onPress={(course) =>
//             router.push(`/course/${course.id}`)
//           }
//         />

//         <CourseHorizontalList
//           title="Trending Courses"
//           courses={trendingCourses}
//           onPress={(course) =>
//             router.push(`/course/${course.id}`)
//           }
//         />
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
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   error: {
//     color: "red",
//     fontSize: 16,
//   },
// });




//UI change by Gemini

import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,

  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { useHome } from "@/hooks/useHome";

import GreetingHeader from "@/components/home/GreetingHeader";
import SearchBar from "@/components/home/SearchBar";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
import CategoryList from "@/components/home/CategoryList";
import CourseHorizontalList from "@/components/home/CourseHorizontalList";
import { useAppTheme } from "@/providers/ThemeProvider";

export default function HomeScreen() {
  const theme = useAppTheme();
  const {
    user,
    continueLearning,
    categories,
    featuredCourses,
    popularCourses,
    trendingCourses,
    loading,
    refreshing,
    refresh,
    error,
  } = useHome();

  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textMuted }]}>Curating your experience...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />
        <View style={[styles.errorContainer, { backgroundColor: theme.dangerSoft, borderColor: theme.danger }]}>
          <Text style={[styles.errorTitle, { color: theme.danger }]}>Oops! Something went wrong</Text>
          <Text style={[styles.errorText, { color: theme.danger }]}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  console.log("featuredCourses", featuredCourses);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} backgroundColor={theme.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        <GreetingHeader 
          name={user?.name} 
          image={user?.image} 
        />

        <SearchBar 
          value={search} 
          onChangeText={setSearch} 
        />

        <ContinueLearningCard
          data={continueLearning}
          onPress={() => {
            if (!continueLearning) return;

            router.push({
              pathname: "/lesson/[lessonId]",
              params: {
                lessonId: continueLearning.lessonId,
              },
            });
          }}
        />

        <CategoryList
          categories={categories}
          onPress={(category) =>
            router.push({
              pathname: "/courses",
              params: {
                categoryId: category.id,
              },
            })
          }
        />

        <CourseHorizontalList
          title="Featured Courses"
          courses={featuredCourses}
          onPress={(course) => router.push(`/course/${course.id}`)}
        />

        <CourseHorizontalList
          title="Popular Courses"
          courses={popularCourses}
          onPress={(course) => router.push(`/course/${course.id}`)}
        />

        <CourseHorizontalList
          title="Trending Courses"
          courses={trendingCourses}
          onPress={(course) => router.push(`/course/${course.id}`)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Clean, modern slate-50 background
  },
  content: {
    paddingHorizontal: 24, // Slightly wider padding for an elegant frame
    paddingTop: 16,
    paddingBottom: 48,
    gap: 28, // Adds perfect, consistent spacing between all child components automatically
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  
  // --- Loading State Styles ---
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  // --- Error State Styles ---
  errorContainer: {
    marginHorizontal: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#FEF2F2",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  errorTitle: {
    color: "#991B1B",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
