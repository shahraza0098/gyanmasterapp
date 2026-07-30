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

  return (
    <View style={styles.menuRow}>
      <View style={[styles.iconCircle, { backgroundColor: "#26C6DA" }]}>
        <Feather name="award" size={22} color="#FFFFFF" />
      </View>

      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.text }]}>
          {subscription.plan.name || "Subscription Plan"}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          {trialActive
            ? `${trialDaysRemaining} ${trialDaysRemaining === 1 ? "day" : "days"} left in trial • Ends ${formatDate(subscription.trialEndAt)}`
            : `Active • Next billing ${formatDate(subscription.nextChargeAt ?? subscription.currentPeriodEnd)}`}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          { backgroundColor: theme.isDark ? "#064E3B" : "#ECFDF5" },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: theme.isDark ? "#A7F3D0" : "#047857" },
          ]}
        >
          {trialActive ? "Trial active" : "Active"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 8,
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
  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
  },
});
