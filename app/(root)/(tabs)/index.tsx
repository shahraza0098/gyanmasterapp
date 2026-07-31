

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
import AllCoursesCatalog from "@/components/home/AllCoursesCatalog";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useAppTheme } from "@/providers/ThemeProvider";

export default function HomeScreen() {
  const theme = useAppTheme();
  const {
    user,
    continueLearning,
    categories,
    featuredCourses,
    allCourses,
    popularCourses,
    trendingCourses,
    loading,
    refreshing,
    refresh,
    error,
  } = useHome();

  const [search, setSearch] = useState("");

  if (loading) {
    return <LoadingState message="Curating your experience…" />;
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load your feed"
        message={error}
        onRetry={refresh}
        onRefresh={refresh}
        refreshing={refreshing}
      />
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

        <AllCoursesCatalog
          courses={allCourses}
          onPress={(course) => router.push(`/course/${course.id}`)}
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

        <CategoryList
          categories={categories}
          onPress={(category) =>
            router.push({
              pathname: "/courses",
              params: { categoryId: category.id },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
    gap: 28,
  },
});
