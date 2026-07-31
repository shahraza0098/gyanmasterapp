import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  onPress: () => void;
}

export default function LogoutButton({
  onPress,
}: Props) {
  const theme = useAppTheme();

  return (
    <Pressable
      style={styles.menuRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
    >
      <View style={[styles.iconCircle, { backgroundColor: theme.accentCrimson }]}>
        <Feather
          name="log-out"
          size={20}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.text }]}>
          Sign out
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});