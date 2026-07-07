import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { MyCourse } from "@/types/MyCourse";

import MyCourseCard from "./MyCourseCard";

interface Props {
  courses: MyCourse[];
}

export default function MyCourseGrid({
  courses,
}: Props) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <MyCourseCard
            course={item}
            onPress={() =>
              router.push({
                pathname: "/course/[id]",
                params: {
                  id: item.id,
                },
              })
            }
            onContinue={() => {
              if (!item.lastLessonId) return;

              router.push({
                pathname: "/lesson/[lessonId]",
                params: {
                  lessonId: item.lastLessonId,
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },

  row: {
    justifyContent: "space-between",
  },

  item: {
    width: "48%",
    marginBottom: 18,
  },
});