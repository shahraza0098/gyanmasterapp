import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";
import { router } from "expo-router";

import { useSubscription } from "@/hooks/useSubscription";
import { verifySubscription } from "@/services/subscription.service";

// ── Design tokens ────────────────────────────────────────────────
// Ink-and-gold: a study-lamp palette rather than the default
// cream/terracotta or acid-on-black combos — warm accent light
// against a near-black page, like reading after hours.
const COLORS = {
  bg: "#0E0E16",
  surface: "#181822",
  surfaceRaised: "#20202C",
  border: "#2A2A38",
  accent: "#E7B94C",
  accentDim: "#5C4A22",
  text: "#F4F2EC",
  textMuted: "#8E8CA0",
  success: "#3ECF8E",
  danger: "#E5636B",
};

// Static plan facts — these describe the plan, not the live
// Razorpay resource. Don't call /subscriptions/create until the
// user actually taps "Start trial"; that endpoint has a side
// effect (it creates a real Razorpay subscription).
const PLAN = {
  trialAmount: 1,
  trialDays: 3,
  monthlyAmount: 499,
};

type Status =
  | "idle"
  | "starting"
  | "checkout"
  | "verifying"
  | "success"
  | "already_active"
  | "error";

export default function SubscriptionScreen() {
  const { create, error: createError } = useSubscription();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const busy =
    status === "starting" || status === "checkout" || status === "verifying";

  const handleSubscribe = useCallback(async () => {
    setMessage(null);
    setStatus("starting");

    const data = await create("plan_TDruEbSbh3cg7W");

    if (!data) {
      if (createError?.startsWith("ALREADY_SUBSCRIBED")) {
        setStatus("already_active");
      } else {
        setStatus("error");
        setMessage(createError ?? "Couldn't start your trial. Try again.");
      }
      return;
    }

    setStatus("checkout");
    try {
      const key = data.keyId ?? data.key;
      const trialAmount = data.trialAmount ?? data.plan?.trialAmount ?? PLAN.trialAmount;
      const monthlyAmount = data.monthlyAmount ?? data.plan?.price ?? PLAN.monthlyAmount;

      if (!key || !data.subscriptionId) {
        throw new Error("Missing Razorpay checkout details from server.");
      }

      const result = await RazorpayCheckout.open({
        key,
        subscription_id: data.subscriptionId,
        name: "Premium",
        description: `₹${trialAmount} today, then ₹${monthlyAmount}/mo`,
        theme: { color: COLORS.accent },
      });

      setStatus("verifying");
      const verified = await verifySubscription({
        razorpay_payment_id: result.razorpay_payment_id,
        razorpay_subscription_id: result.razorpay_subscription_id,
        razorpay_signature: result.razorpay_signature,
      });

      if (verified?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage("Payment went through but couldn't be verified. Contact support.");
      }
    } catch (error) {
      // Customer closed checkout or the payment failed — not a hard
      // error worth alarming them with, just reset.
      const checkoutMessage =
        error instanceof Error
          ? error.message
          : "Razorpay checkout was cancelled.";

      const normalizedMessage =
        checkoutMessage.toLowerCase();
      const userCancelled =
        normalizedMessage.includes("cancel") ||
        normalizedMessage.includes("dismiss") ||
        normalizedMessage.includes("closed");

      setStatus(userCancelled ? "idle" : "error");
      setMessage(userCancelled ? null : checkoutMessage);
    }
  }, [create, createError]);

  if (status === "success") {
    return <SuccessState onDone={() => router.back()} />;
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[COLORS.bg, "#131320", COLORS.bg]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Feather name="x" size={20} color={COLORS.textMuted} />
          </Pressable>

          <Text style={styles.eyebrow}>PREMIUM</Text>
          <Text style={styles.headline}>Every course.{"\n"}One membership.</Text>
          <Text style={styles.subhead}>
            Try it for {PLAN.trialDays} days for ₹{PLAN.trialAmount}, then
            ₹{PLAN.monthlyAmount}/month. Cancel anytime before it renews.
          </Text>

          <TrialTimeline />

          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.priceLabel}>Today</Text>
                <Text style={styles.priceValue}>₹{PLAN.trialAmount}</Text>
              </View>
              <Feather name="arrow-right" size={16} color={COLORS.textMuted} />
              <View>
                <Text style={styles.priceLabel}>
                  From day {PLAN.trialDays + 1}
                </Text>
                <Text style={styles.priceValueMuted}>
                  ₹{PLAN.monthlyAmount}/mo
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Feature text="Unlimited access to every course" />
            <Feature text="Certificates on completion" />
            <Feature text="Cancel from Settings, anytime" />
          </View>

          {status === "already_active" && (
            <Banner
              tone="info"
              text="You already have a subscription."
              action="Manage it"
              onPress={() => router.push("/(root)/(tabs)/profile")}
            />
          )}

          {status === "error" && message && (
            <Banner tone="danger" text={message} />
          )}

          <Pressable
            onPress={handleSubscribe}
            disabled={busy || status === "already_active"}
            style={({ pressed }) => [
              styles.cta,
              (busy || status === "already_active") && styles.ctaDisabled,
              pressed && !busy && styles.ctaPressed,
            ]}
          >
            {busy ? (
              <ActivityIndicator color={COLORS.bg} />
            ) : (
              <Text style={styles.ctaText}>
                Start {PLAN.trialDays}-day trial — ₹{PLAN.trialAmount}
              </Text>
            )}
          </Pressable>

          <Text style={styles.terms}>
            By continuing you authorize a recurring mandate of up to
            ₹{PLAN.monthlyAmount}/month via Razorpay, charged automatically
            after your trial ends unless you cancel first.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── Signature element ────────────────────────────────────────────
// This is the one place the design takes a real position: the trial
// is genuinely a 3-step sequence, so a literal timeline earns its
// keep here rather than decorating a list that isn't ordered.
function TrialTimeline() {
  return (
    <View style={styles.timeline}>
      {Array.from({ length: PLAN.trialDays }).map((_, i) => (
        <React.Fragment key={i}>
          <View style={styles.timelineNode}>
            <View style={styles.timelineDot} />
            <Text style={styles.timelineLabel}>Day {i + 1}</Text>
          </View>
          <View style={styles.timelineConnector} />
        </React.Fragment>
      ))}
      <View style={styles.timelinePill}>
        <Text style={styles.timelinePillText}>₹{PLAN.monthlyAmount}/mo</Text>
      </View>
    </View>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.featureRow}>
      <Feather name="check" size={16} color={COLORS.accent} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

function Banner({
  tone,
  text,
  action,
  onPress,
}: {
  tone: "info" | "danger";
  text: string;
  action?: string;
  onPress?: () => void;
}) {
  const color = tone === "danger" ? COLORS.danger : COLORS.accent;
  return (
    <View style={[styles.banner, { borderColor: color }]}>
      <Feather
        name={tone === "danger" ? "alert-circle" : "info"}
        size={16}
        color={color}
      />
      <Text style={styles.bannerText}>{text}</Text>
      {action && (
        <Pressable onPress={onPress}>
          <Text style={[styles.bannerAction, { color }]}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

function SuccessState({ onDone }: { onDone: () => void }) {
  return (
    <View style={[styles.root, styles.successRoot]}>
      <LinearGradient
        colors={[COLORS.bg, "#131320", COLORS.bg]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.successContent}>
        <View style={styles.successIcon}>
          <Feather name="check" size={28} color={COLORS.bg} />
        </View>
        <Text style={styles.successTitle}>You&apos;re in</Text>
        <Text style={styles.successBody}>
          Your {PLAN.trialDays}-day trial has started. We&apos;ll remind you before
          the first ₹{PLAN.monthlyAmount} charge.
        </Text>
        <Pressable onPress={onDone} style={styles.cta}>
          <Text style={styles.ctaText}>Start learning</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  safe: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 40 },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  headline: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subhead: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  timelineNode: { alignItems: "center", width: 44 },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginBottom: 6,
  },
  timelineLabel: { color: COLORS.textMuted, fontSize: 11 },
  timelineConnector: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 17,
  },
  timelinePill: {
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.accentDim,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    marginBottom: 17,
  },
  timelinePillText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "700",
  },
  priceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priceLabel: { color: COLORS.textMuted, fontSize: 12, marginBottom: 4 },
  priceValue: { color: COLORS.text, fontSize: 26, fontWeight: "700" },
  priceValueMuted: { color: COLORS.text, fontSize: 18, fontWeight: "600" },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  featureText: { color: COLORS.text, fontSize: 14 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  bannerText: { color: COLORS.text, fontSize: 13, flex: 1 },
  bannerAction: { fontSize: 13, fontWeight: "700" },
  cta: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOpacity: 0.25,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
    }),
  },
  ctaDisabled: { opacity: 0.6 },
  ctaPressed: { opacity: 0.85 },
  ctaText: { color: "#ff9500", fontSize: 16, fontWeight: "700" },
  terms: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 16,
  },
  successRoot: {},
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  successBody: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
});
