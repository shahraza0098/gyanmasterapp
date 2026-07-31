import React from "react";
import {
  Image,
  Pressable,
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
    <View style={[styles.card, { backgroundColor: theme.isDark ? theme.accentPlum : theme.accentTeal }]}>
      {/* Subtle decorative background circles */}
      <View style={styles.decorCircleTopRight} />
      <View style={styles.decorCircleBottomRight} />

      {/* Top right Edit button */}
      {/* <Pressable
        style={styles.editButton}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile"
      >
        <Feather name="edit-2" size={16} color="#FFFFFF" />
      </Pressable> */}

      {/* Main Avatar + Greeting Row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarBorder}>
          <Image
            source={{
              uri:
                profile.imageUrl ||
                "https://ugiibwvynhixlceaknll.supabase.co/storage/v1/object/public/GyanMaster/assets/profile_boy.png",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText} numberOfLines={1}>
            {profile.name}
          </Text>
        </View>
      </View>

      {/* Student illustration sitting on bottom right */}
      {/* <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
        }}
        style={styles.illustration}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#5271FF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 24,
    minHeight: 156,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginVertical: 6,
    shadowColor: "#5271FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  decorCircleTopRight: {
    position: "absolute",
    right: -25,
    top: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorCircleBottomRight: {
    position: "absolute",
    right: 50,
    bottom: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
  },
  editButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  avatarBorder: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 75,
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 2,
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    letterSpacing: -0.4,
  },
  illustration: {
    position: "absolute",
    right: 12,
    bottom: 0,
    width: 105,
    height: 105,
    resizeMode: "contain",
    zIndex: 15,
  },
});
