import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme, ThemePreference } from "@/providers/ThemeProvider";
import { Profile } from "@/types/profile";

interface Props {
  profile: Profile;
}

const appearanceOptions: { label: string; value: ThemePreference }[] = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function ProfileSettings({ profile }: Props) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      {/* PROFILE / Email Row (Orange icon) */}
      <View style={styles.menuRow}>
        <View style={[styles.iconCircle, { backgroundColor: "#FFB74D" }]}>
          <Feather name="at-sign" size={22} color="#FFFFFF" />
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: theme.text }]}>PROFILE</Text>
          <Text selectable style={[styles.subtitle, { color: theme.textMuted }]}>
            {profile.email}
          </Text>
        </View>
      </View>

      {/* Phone Number Row (Pink icon) */}
      <View style={styles.menuRow}>
        <View style={[styles.iconCircle, { backgroundColor: "#FF60D2" }]}>
          <Feather name="phone" size={20} color="#FFFFFF" />
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: theme.text }]}>Phone number</Text>
          <Text selectable style={[styles.subtitle, { color: theme.textMuted }]}>
            {profile.phone ?? "Not added"}
          </Text>
        </View>
      </View>

      {/* Appearance / Theme preference Row (Purple icon) */}
      <View style={styles.menuRow}>
        <View style={[styles.iconCircle, { backgroundColor: "#8C7DFF" }]}>
          <Feather
            name={theme.isDark ? "moon" : "sun"}
            size={22}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: theme.text }]}>Appearance</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Theme preference
          </Text>
        </View>

        <View
          style={[
            styles.selectorContainer,
            { backgroundColor: theme.surfaceMuted },
          ]}
        >
          {appearanceOptions.map((option) => {
            const selected = theme.preference === option.value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${option.label} appearance`}
                onPress={() => theme.setPreference(option.value)}
                style={[
                  styles.optionBtn,
                  selected && {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: selected ? theme.text : theme.textMuted },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
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
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    marginTop: 2,
  },
  selectorContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 3,
    gap: 4,
  },
  optionBtn: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
  },
});
