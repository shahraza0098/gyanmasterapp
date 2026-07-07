import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type CourseTab =
  | "all"
  | "ongoing"
  | "completed";

interface Props {
  activeTab: CourseTab;

  stats: {
    total: number;

    ongoing: number;

    completed: number;
  };

  onChange: (
    tab: CourseTab
  ) => void;
}

export default function MyCourseTabs({
  activeTab,
  stats,
  onChange,
}: Props) {
  const tabs = [
    {
      key: "all",
      label: `All (${stats.total})`,
    },

    {
      key: "ongoing",
      label: `In Progress (${stats.ongoing})`,
    },

    {
      key: "completed",
      label: `Completed (${stats.completed})`,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active =
          activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() =>
              onChange(
                tab.key as CourseTab
              )
            }
            style={[
              styles.tab,

              active &&
                styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.label,

                active &&
                  styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginBottom: 20,
  },

  tab: {
    marginRight: 24,

    paddingBottom: 8,
  },

  activeTab: {
    borderBottomWidth: 3,

    borderBottomColor:
      "#2563EB",
  },

  label: {
    fontSize: 15,

    color: "#64748B",

    fontFamily:
      "Poppins-Medium",
  },

  activeLabel: {
    color: "#2563EB",
  },
});