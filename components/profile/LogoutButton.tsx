import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { Feather } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export default function LogoutButton({
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Feather
        name="log-out"
        size={20}
        color="#FFFFFF"
      />

      <Text style={styles.text}>
        Logout
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,

    borderRadius: 14,

    backgroundColor: "#EF4444",

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",
  },

  text: {
    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 16,

    fontFamily: "Poppins-SemiBold",
  },
});