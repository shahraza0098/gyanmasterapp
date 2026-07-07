import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  onSearch?: () => void;
}

export default function MyCourseHeader({
  onSearch,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          My Courses
        </Text>

        <Text style={styles.subtitle}>
          Continue your learning journey
        </Text>
      </View>

      <Pressable
        onPress={onSearch}
        style={styles.searchButton}
      >
        <Feather
          name="search"
          size={22}
          color="#1E293B"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,

    fontSize: 14,
    color: "#64748B",

    fontFamily: "Poppins-Regular",
  },

  searchButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
});