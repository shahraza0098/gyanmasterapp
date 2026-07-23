import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  title?: string;

  description?: string;
}

export default function EmptyMyCourse({
  title = "No Courses Found",

  description = "Your courses will appear here once available.",
}: Props) {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: theme.surfaceMuted }]}>
        <Feather
          name="book-open"
          size={40}
          color={theme.textMuted}
        />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>

      <Text style={[styles.description, { color: theme.textMuted }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,

    alignItems: "center",

    paddingHorizontal: 30,
  },

  icon: {
    width: 90,
    height: 90,

    borderRadius: 45,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 20,

    color: "#0F172A",

    fontFamily: "Poppins-SemiBold",
  },

  description: {
    marginTop: 10,

    textAlign: "center",

    fontSize: 14,

    color: "#64748B",

    lineHeight: 22,

    fontFamily: "Poppins-Regular",
  },
});
