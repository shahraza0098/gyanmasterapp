import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { Category } from "@/types/home";

interface Props {
  categories: Category[];
  onPress(category: Category): void;
}

export default function CategoryList({
  categories,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
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
    overflow: "hidden",
    marginRight: 14,
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