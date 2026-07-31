import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { CourseCard } from "@/types/home";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  title: string;
  courses: CourseCard[];
  onPress(course: CourseCard): void;
}

function formatDuration(seconds?: number | null) {
  if (!seconds) return "0 min";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}m`;
}

export default function CourseHorizontalList({
  title,
  courses,
  onPress,
}: Props) {
  const theme = useAppTheme();
  if (!courses.length) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme.text }]}>{title}</Text>

      <FlatList
        horizontal
        data={courses}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                shadowColor: theme.isDark ? "#000000" : "#0F172A",
              },
            ]}
            onPress={() => onPress(item)}
          >
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={styles.image}
              contentFit="cover"
            />

            <View style={styles.content}>
              <Text
                numberOfLines={2}
                style={[styles.title, { color: theme.text }]}
              >
                {item.title}
              </Text>

              <Text style={[styles.category, { color: theme.textMuted }]}>
                {item.category.name}
              </Text>

              <View style={[styles.levelContainer, { backgroundColor: theme.primarySoft }]}>
                <Text style={[styles.level, { color: theme.primary }]}>
                  {item.level}
                </Text>
              </View>

              <View style={[styles.progressBackground, { backgroundColor: theme.surfaceMuted }]}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${item.progress}%`,
                    },
                  ]}
                />
              </View>

              <Text style={[styles.progressText, { color: theme.textMuted }]}>
                {item.progress}% Completed
              </Text>

              <View style={styles.footer}>
                <View style={styles.info}>
                  <Ionicons
                    name="book-outline"
                    size={15}
                    color={theme.textMuted}
                  />

                  <Text style={[styles.infoText, { color: theme.textMuted }]}>
                    {item.totalLessons}
                  </Text>
                </View>

                <View style={styles.info}>
                  <Ionicons
                    name="time-outline"
                    size={15}
                    color={theme.textMuted}
                  />

                  <Text style={[styles.infoText, { color: theme.textMuted }]}>
                    {formatDuration(item.totalDuration)}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },

  list: {
    paddingRight: 20,
  },

  card: {
    width: 270,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 16,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 8,
  },

  image: {
    width: "100%",
    height: 160,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  category: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 14,
  },

  levelContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },

  level: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 12,
  },

  progressBackground: {
    marginTop: 15,
    height: 7,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#2563EB",
  },

  progressText: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 4,
    color: "#6B7280",
    fontSize: 13,
  },
});
