import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { getRemainingTrialDays, isTrialActive } from "@/lib/subscription";
import { useAppTheme } from "@/providers/ThemeProvider";
import { Subscription } from "@/types/Student";

interface Props {
  subscription?: Subscription | null;
}

function formatDate(value?: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function SubscriptionDetails({ subscription }: Props) {
  const theme = useAppTheme();

  if (!subscription) return null;

  const trialActive = isTrialActive(subscription);
  const trialDaysRemaining = getRemainingTrialDays(subscription);
  const trialBackground = theme.isDark ? "#064E3B" : "#ECFDF5";
  const trialText = theme.isDark ? "#A7F3D0" : "#047857";

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.headingRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Subscription</Text>
          <Text style={[styles.plan, { color: theme.textMuted }]}>{subscription.plan.name}</Text>
        </View>
        <View style={[styles.status, { backgroundColor: trialBackground }]}>
          <Text style={[styles.statusText, { color: trialText }]}>
            {trialActive ? "Trial active" : "Active"}
          </Text>
        </View>
      </View>

      {trialActive ? (
        <View style={[styles.trialNotice, { backgroundColor: theme.primarySoft }]}>
          <Feather name="clock" size={18} color={theme.primary} />
          <View style={styles.trialTextWrap}>
            <Text style={[styles.trialTitle, { color: theme.text }]}>
              {trialDaysRemaining} {trialDaysRemaining === 1 ? "day" : "days"} left in your trial
            </Text>
            <Text style={[styles.trialDate, { color: theme.textMuted }]}>
              Your trial ends on {formatDate(subscription.trialEndAt)}.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.details}>
          <DateRow label="Started" value={formatDate(subscription.currentPeriodStart)} />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <DateRow label="Current period ends" value={formatDate(subscription.currentPeriodEnd)} />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <DateRow label="Next billing date" value={formatDate(subscription.nextChargeAt ?? subscription.currentPeriodEnd)} />
        </View>
      )}
    </View>
  );
}

function DateRow({ label, value }: { label: string; value: string }) {
  const theme = useAppTheme();

  return (
    <View style={styles.dateRow}>
      <Text style={[styles.dateLabel, { color: theme.textMuted }]}>{label}</Text>
      <Text selectable style={[styles.dateValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 20, padding: 18 },
  headingRow: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  title: { fontFamily: "Poppins-SemiBold", fontSize: 17 },
  plan: { fontFamily: "Poppins-Regular", fontSize: 13, marginTop: 2 },
  status: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  statusText: { fontFamily: "Poppins-SemiBold", fontSize: 11 },
  trialNotice: { alignItems: "center", borderRadius: 14, flexDirection: "row", marginTop: 18, padding: 14 },
  trialTextWrap: { flex: 1, marginLeft: 10 },
  trialTitle: { fontFamily: "Poppins-SemiBold", fontSize: 14 },
  trialDate: { fontFamily: "Poppins-Regular", fontSize: 12, marginTop: 2 },
  details: { marginTop: 14 },
  dateRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 11 },
  dateLabel: { fontFamily: "Poppins-Regular", fontSize: 13 },
  dateValue: { fontFamily: "Poppins-Medium", fontSize: 13 },
  divider: { height: StyleSheet.hairlineWidth },
});
