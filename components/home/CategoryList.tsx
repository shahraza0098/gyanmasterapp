import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { Category } from "@/types/home";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  categories: Category[];
  onPress(category: Category): void;
}

export default function CategoryList({
  categories,
  onPress,
}: Props) {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme.text }]}>Categories</Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                borderColor: theme.border,
                shadowColor: theme.isDark ? "#000000" : "#0F172A",
              },
            ]}
            onPress={() => onPress(item)}
          >
            <Image
              source={{ uri: item.bannerUrl }}
              style={styles.image}
              contentFit="cover"
            />

            <View style={styles.overlay}>
              <Text numberOfLines={1} style={styles.title}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111827",
  },

  list: {
    paddingRight: 20,
  },

  card: {
    width: 140,
    height: 90,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
    padding: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
