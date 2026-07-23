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
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>

        <InfoRow icon="mail" label="Email" value={profile.email} />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <InfoRow icon="phone" label="Phone" value={profile.phone ?? "Not added"} />
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.appearanceHeading}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
            <Text style={[styles.description, { color: theme.textMuted }]}>
              Choose how GyanMaster looks on this device.
            </Text>
          </View>
          <Feather name={theme.isDark ? "moon" : "sun"} size={20} color={theme.primary} />
        </View>

        <View style={[styles.selector, { backgroundColor: theme.surfaceMuted }]}>
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
                  styles.option,
                  selected && { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.optionText, { color: selected ? theme.text : theme.textMuted }]}>
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

function InfoRow({ icon, label, value }: { icon: "mail" | "phone"; label: string; value: string }) {
  const theme = useAppTheme();

  return (
    <View style={styles.infoRow}>
      <View style={[styles.iconWrap, { backgroundColor: theme.primarySoft }]}>
        <Feather name={icon} size={17} color={theme.primary} />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{label}</Text>
        <Text selectable style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { borderWidth: 1, borderRadius: 20, padding: 18 },
  sectionTitle: { fontFamily: "Poppins-SemiBold", fontSize: 17 },
  infoRow: { alignItems: "center", flexDirection: "row", paddingVertical: 14 },
  iconWrap: { alignItems: "center", borderRadius: 12, height: 40, justifyContent: "center", width: 40 },
  infoTextWrap: { flex: 1, marginLeft: 12 },
  infoLabel: { fontFamily: "Poppins-Medium", fontSize: 12 },
  infoValue: { fontFamily: "Poppins-Regular", fontSize: 14, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth },
  appearanceHeading: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  description: { fontFamily: "Poppins-Regular", fontSize: 13, lineHeight: 19, marginTop: 3 },
  selector: { borderRadius: 14, flexDirection: "row", gap: 4, marginTop: 16, padding: 4 },
  option: { alignItems: "center", borderRadius: 10, borderWidth: 1, borderColor: "transparent", flex: 1, paddingVertical: 10 },
  optionText: { fontFamily: "Poppins-Medium", fontSize: 12 },
});
