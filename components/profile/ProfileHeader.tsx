import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { Profile } from "@/types/profile";
import { useAppTheme } from "@/providers/ThemeProvider";

interface Props {
  profile: Profile;
}

export default function ProfileHeader({
  profile,
}: Props) {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      {profile.imageUrl ? (
        <Image
          source={{
            uri: profile.imageUrl,
          }}
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatarPlaceholder, { backgroundColor: theme.surfaceMuted }]}>
          <Feather
            name="user"
            size={40}
            color={theme.textMuted}
          />
        </View>
      )}

      <Text style={[styles.name, { color: theme.text }]}>
        {profile.name}
      </Text>

      {/* <Text style={[styles.email, { color: theme.textMuted }]}>
        {profile.email}
      </Text>

      <Text style={[styles.phone, { color: theme.textMuted }]}>
        {profile.phone ??
          "Phone not added"}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    marginTop: 40,

    marginBottom: 40,
  },

  avatar: {
    width: 110,

    height: 110,

    borderRadius: 55,
  },

  avatarPlaceholder: {
    width: 110,

    height: 110,

    borderRadius: 55,

    backgroundColor: "#E2E8F0",

    justifyContent: "center",

    alignItems: "center",
  },

  name: {
    marginTop: 18,

    fontSize: 24,

    fontFamily: "Poppins-Bold",

    color: "#0F172A",
  },

  email: {
    marginTop: 6,

    fontSize: 15,

    color: "#64748B",

    fontFamily: "Poppins-Regular",
  },

  phone: {
    marginTop: 6,

    fontSize: 15,

    color: "#64748B",

    fontFamily: "Poppins-Regular",
  },
});
