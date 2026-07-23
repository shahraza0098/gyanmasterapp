import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { MyCourse } from "@/types/MyCourse";

import MyCourseProgress from "./MyCourseProgress";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  course: MyCourse;

  onPress: () => void;

  onContinue?: () => void;

  onCertificate?: () => void;
}

export default function MyCourseCard({
  course,
  onPress,
  onContinue,
  onCertificate,
}: Props) {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <Image
        source={{
          uri: course.thumbnailUrl,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: theme.text }]}
        >
          {course.title}
        </Text>

        <Text style={[styles.level, { color: theme.textMuted }]}> 
          {course.level}
        </Text>

        {!course.completed && (
          <>
            <View
              style={styles.progressHeader}
            >
              <Text
                style={[styles.progressText, { color: theme.primary }]}
              >
                {course.progress}%
              </Text>

              <Text
                style={[styles.lessonCount, { color: theme.textMuted }]}
              >
                {course.completedLessons}/
                {course.totalLessons}
              </Text>
            </View>

            <MyCourseProgress
              progress={course.progress}
            />

            <Pressable
              onPress={onContinue}
              style={[styles.button, { backgroundColor: theme.primary }]}
            >
              <Feather
                name="play-circle"
                size={16}
                color="#FFFFFF"
              />

              <Text
                style={styles.buttonText}
              >
                Continue
              </Text>
            </Pressable>
          </>
        )}

        {course.completed && (
          <Pressable
            onPress={onCertificate}
            style={styles.certificateButton}
          >
            <Feather
              name="award"
              size={16}
              color="#16A34A"
            />

            <Text
              style={
                styles.certificateText
              }
            >
              Certificate
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    overflow: "hidden",

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "#E2E8F0",
  },

  image: {
    width: "100%",

    height: 110,

    resizeMode: "cover",
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 15,

    color: "#0F172A",

    fontFamily: "Poppins-SemiBold",

    minHeight: 42,
  },

  level: {
    marginTop: 4,

    fontSize: 12,

    color: "#64748B",

    fontFamily: "Poppins-Regular",
  },

  progressHeader: {
    marginTop: 12,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  progressText: {
    fontSize: 12,

    color: "#2563EB",

    fontFamily: "Poppins-SemiBold",
  },

  lessonCount: {
    fontSize: 12,

    color: "#94A3B8",

    fontFamily: "Poppins-Regular",
  },

  button: {
    marginTop: 14,

    backgroundColor: "#2563EB",

    borderRadius: 10,

    height: 40,

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",
  },

  buttonText: {
    marginLeft: 8,

    color: "#FFFFFF",

    fontSize: 13,

    fontFamily: "Poppins-Medium",
  },

  certificateButton: {
    marginTop: 16,

    height: 40,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: "#16A34A",

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",
  },

  certificateText: {
    marginLeft: 8,

    color: "#16A34A",

    fontSize: 13,

    fontFamily: "Poppins-Medium",
  },
});
