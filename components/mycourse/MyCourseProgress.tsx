import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  progress: number;
}

export default function MyCourseProgress({
  progress,
}: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: "100%",

    borderRadius: 999,

    overflow: "hidden",

    backgroundColor: "#E2E8F0",
  },

  progress: {
    height: "100%",

    borderRadius: 999,

    backgroundColor: "#2563EB",
  },
});