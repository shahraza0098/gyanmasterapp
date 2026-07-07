// import React from "react";
// import { Text, View } from "react-native";

// export default function CoursesScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Courses</Text>
//     </View>
//   );
// }




import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  CourseTab,
} from "@/components/mycourse/MyCourseTabs";

import MyCourseHeader from "@/components/mycourse/MyCourseHeader";
import MyCourseTabs from "@/components/mycourse/MyCourseTabs";
import MyCourseCard from "@/components/mycourse/MyCourseCard";
import EmptyMyCourse from "@/components/mycourse/EmptyMyCourse";

import { useMyCourse } from "@/hooks/useMyCourses";

import { router } from "expo-router";

export default function CoursesScreen() {
  const {
    courses,
    loading,
    refreshing,
    error,
    refresh,
  } = useMyCourse();

  console.log("courses", courses);
  const [tab, setTab] =
    useState<CourseTab>("all");

  const courseList = useMemo(() => {
    if (!courses) return [];

    switch (tab) {
      case "ongoing":
        return courses.ongoing;

      case "completed":
        return courses.completed;

      default:
        return courses.all;
    }
  }, [courses, tab]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  if (!courses) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          styles.columnWrapper
        }
        contentContainerStyle={
          styles.content
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        ListHeaderComponent={
          <>
            <MyCourseHeader />

            <MyCourseTabs
              activeTab={tab}
              stats={courses.stats}
              onChange={setTab}
            />
          </>
        }
        ListEmptyComponent={
          <EmptyMyCourse />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <MyCourseCard
              course={item}
              onPress={() =>
                router.push({
                  pathname:
                    "/course/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
              onContinue={() => {
                if (!item.lastLessonId)
                  return;

                router.push({
                  pathname:
                    "/lesson/[lessonId]",
                  params: {
                    lessonId:
                      item.lastLessonId,
                  },
                });
              }}
              onCertificate={() => {
                console.log(
                  "Certificate",
                  item.id
                );
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      "#F8FAFC",
  },

  content: {
    paddingHorizontal: 20,

    paddingBottom: 100,

    paddingTop: 10,
  },

  columnWrapper: {
    justifyContent:
      "space-between",
  },

  item: {
    width: "48%",

    marginBottom: 18,
  },

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor:
      "#F8FAFC",
  },

  error: {
    color: "#EF4444",

    fontSize: 16,

    fontFamily:
      "Poppins-Medium",
  },
});