// // import React, { useState, useCallback } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Pressable,
// //   ActivityIndicator,
// //   ScrollView,
// //   Platform,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { Feather } from "@expo/vector-icons";
// // import RazorpayCheckout from "react-native-razorpay";
// // import { router } from "expo-router";

// // import { useStudentContext } from "@/providers/StudentProvider";

// // import { useSubscription } from "@/hooks/useSubscription";
// // import { verifySubscription } from "@/services/subscription.service";

// // // ── Design tokens ────────────────────────────────────────────────
// // // Ink-and-gold: a study-lamp palette rather than the default
// // // cream/terracotta or acid-on-black combos — warm accent light
// // // against a near-black page, like reading after hours.
// // const COLORS = {
// //   bg: "#0E0E16",
// //   surface: "#181822",
// //   surfaceRaised: "#20202C",
// //   border: "#2A2A38",
// //   accent: "#E7B94C",
// //   accentDim: "#5C4A22",
// //   text: "#F4F2EC",
// //   textMuted: "#8E8CA0",
// //   success: "#3ECF8E",
// //   danger: "#E5636B",
// // };

// // // Static plan facts — these describe the plan, not the live
// // // Razorpay resource. Don't call /subscriptions/create until the
// // // user actually taps "Start trial"; that endpoint has a side
// // // effect (it creates a real Razorpay subscription).
// // const PLAN = {
// //   trialAmount: 1,
// //   trialDays: 3,
// //   monthlyAmount: 499,
// // };

// // type Status =
// //   | "idle"
// //   | "starting"
// //   | "checkout"
// //   | "verifying"
// //   | "success"
// //   | "already_active"
// //   | "error";

// // export default function SubscriptionScreen() {
// //   const { create, error: createError } = useSubscription();
// //   const [status, setStatus] = useState<Status>("idle");
// //   const [message, setMessage] = useState<string | null>(null);


// //   const {
// //       student,
// //       loading,
// //       refreshStudent,
// //       setStudent,
// //     } = useStudentContext();
// //   const busy =
// //     status === "starting" || status === "checkout" || status === "verifying";


// //      const handleNavAfterSubs = () => {
// //   refreshStudent();
// //   router.replace("/courses");
// // };
// //   const handleSubscribe = useCallback(async () => {
// //     setMessage(null);
// //     setStatus("starting");

// //     const data = await create("plan_TDruEbSbh3cg7W");
// //     console.log("subscription created data:", data)
// //     if (!data) {
// //       if (createError?.startsWith("ALREADY_SUBSCRIBED")) {
// //         setStatus("already_active");
// //       } else {
// //         setStatus("error");
// //         setMessage(createError ?? "Couldn't start your trial. Try again.");
// //       }
// //       return;
// //     }

// //     setStatus("checkout");
// //     try {
// //       const key = data.keyId ?? data.key;
// //       const trialAmount = data.trialAmount ?? data.plan?.trialAmount ?? PLAN.trialAmount;
// //       const monthlyAmount = data.monthlyAmount ?? data.plan?.price ?? PLAN.monthlyAmount;

// //       if (!key || !data.subscriptionId) {
// //         throw new Error("Missing Razorpay checkout details from server.");
// //       }
// // console.log("Opening Razorpay");

// //       const result = await RazorpayCheckout.open({
// //         key,
// //         subscription_id: data.subscriptionId,
// //         name: "Premium",
// //         description: `₹${trialAmount} today, then ₹${monthlyAmount}/mo`,
// //         theme: { color: COLORS.accent },
// //       });

// //       console.log("result coming: ", result)
// //       setStatus("verifying");

// //       console.log("Calling verify API");
// //       const verified = await verifySubscription({
// //         razorpay_payment_id: result.razorpay_payment_id,
// //         razorpay_subscription_id: result.razorpay_subscription_id,
// //         razorpay_signature: result.razorpay_signature,
// //       });

// //       console.log("Verify response", verified);

// //       if (verified?.ok) {
// //         setStatus("success");
// //       } else {
// //         setStatus("error");
// //         setMessage("Payment went through but couldn't be verified. Contact support.");
// //       }
// //     } catch (error) {
// //       // Customer closed checkout or the payment failed — not a hard
// //       // error worth alarming them with, just reset.

// //       console.log("Checkout error", error);
// //       const checkoutMessage =
// //         error instanceof Error
// //           ? error.message
// //           : "Razorpay checkout was cancelled.";

// //       const normalizedMessage =
// //         checkoutMessage.toLowerCase();
// //       const userCancelled =
// //         normalizedMessage.includes("cancel") ||
// //         normalizedMessage.includes("dismiss") ||
// //         normalizedMessage.includes("closed");

// //       setStatus(userCancelled ? "idle" : "error");
// //       setMessage(userCancelled ? null : checkoutMessage);
// //     }
// //   }, [create, createError]);

// //   if (status === "success") {
// //     return <SuccessState onDone={handleNavAfterSubs} />;
// //   }

// //   return (
// //     <View style={styles.root}>
// //       <LinearGradient
// //         colors={[COLORS.bg, "#131320", COLORS.bg]}
// //         style={StyleSheet.absoluteFill}
// //       />
// //       <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
// //         <ScrollView
// //           contentContainerStyle={styles.scroll}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           <Pressable
// //             onPress={() => router.back()}
// //             hitSlop={12}
// //             style={styles.backButton}
// //           >
// //             <Feather name="x" size={20} color={COLORS.textMuted} />
// //           </Pressable>

// //           <Text style={styles.eyebrow}>PREMIUM</Text>
// //           <Text style={styles.headline}>Every course.{"\n"}One membership.</Text>
// //           <Text style={styles.subhead}>
// //             Try it for {PLAN.trialDays} days for ₹{PLAN.trialAmount}, then
// //             ₹{PLAN.monthlyAmount}/month. Cancel anytime before it renews.
// //           </Text>

// //           <TrialTimeline />

// //           <View style={styles.priceCard}>
// //             <View style={styles.priceRow}>
// //               <View>
// //                 <Text style={styles.priceLabel}>Today</Text>
// //                 <Text style={styles.priceValue}>₹{PLAN.trialAmount}</Text>
// //               </View>
// //               <Feather name="arrow-right" size={16} color={COLORS.textMuted} />
// //               <View>
// //                 <Text style={styles.priceLabel}>
// //                   From day {PLAN.trialDays + 1}
// //                 </Text>
// //                 <Text style={styles.priceValueMuted}>
// //                   ₹{PLAN.monthlyAmount}/mo
// //                 </Text>
// //               </View>
// //             </View>
// //             <View style={styles.divider} />
// //             <Feature text="Unlimited access to every course" />
// //             <Feature text="Certificates on completion" />
// //             <Feature text="Cancel from Settings, anytime" />
// //           </View>

// //           {status === "already_active" && (
// //             <Banner
// //               tone="info"
// //               text="You already have a subscription."
// //               action="Manage it"
// //               onPress={() => router.push("/(root)/(tabs)/profile")}
// //             />
// //           )}

// //           {status === "error" && message && (
// //             <Banner tone="danger" text={message} />
// //           )}

// //           <Pressable
// //             onPress={handleSubscribe}
// //             disabled={busy || status === "already_active"}
// //             style={({ pressed }) => [
// //               styles.cta,
// //               (busy || status === "already_active") && styles.ctaDisabled,
// //               pressed && !busy && styles.ctaPressed,
// //             ]}
// //           >
// //             {busy ? (
// //               <ActivityIndicator color={COLORS.bg} />
// //             ) : (
// //               <Text style={styles.ctaText}>
// //                 Start {PLAN.trialDays}-day trial — ₹{PLAN.trialAmount}
// //               </Text>
// //             )}
// //           </Pressable>

// //           <Text style={styles.terms}>
// //             By continuing you authorize a recurring mandate of up to
// //             ₹{PLAN.monthlyAmount}/month via Razorpay, charged automatically
// //             after your trial ends unless you cancel first.
// //           </Text>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </View>
// //   );
// // }

// // // ── Signature element ────────────────────────────────────────────
// // // This is the one place the design takes a real position: the trial
// // // is genuinely a 3-step sequence, so a literal timeline earns its
// // // keep here rather than decorating a list that isn't ordered.
// // function TrialTimeline() {
// //   return (
// //     <View style={styles.timeline}>
// //       {Array.from({ length: PLAN.trialDays }).map((_, i) => (
// //         <React.Fragment key={i}>
// //           <View style={styles.timelineNode}>
// //             <View style={styles.timelineDot} />
// //             <Text style={styles.timelineLabel}>Day {i + 1}</Text>
// //           </View>
// //           <View style={styles.timelineConnector} />
// //         </React.Fragment>
// //       ))}
// //       <View style={styles.timelinePill}>
// //         <Text style={styles.timelinePillText}>₹{PLAN.monthlyAmount}/mo</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // function Feature({ text }: { text: string }) {
// //   return (
// //     <View style={styles.featureRow}>
// //       <Feather name="check" size={16} color={COLORS.accent} />
// //       <Text style={styles.featureText}>{text}</Text>
// //     </View>
// //   );
// // }

// // function Banner({
// //   tone,
// //   text,
// //   action,
// //   onPress,
// // }: {
// //   tone: "info" | "danger";
// //   text: string;
// //   action?: string;
// //   onPress?: () => void;
// // }) {
// //   const color = tone === "danger" ? COLORS.danger : COLORS.accent;
// //   return (
// //     <View style={[styles.banner, { borderColor: color }]}>
// //       <Feather
// //         name={tone === "danger" ? "alert-circle" : "info"}
// //         size={16}
// //         color={color}
// //       />
// //       <Text style={styles.bannerText}>{text}</Text>
// //       {action && (
// //         <Pressable onPress={onPress}>
// //           <Text style={[styles.bannerAction, { color }]}>{action}</Text>
// //         </Pressable>
// //       )}
// //     </View>
// //   );
// // }

// // function SuccessState({ onDone }: { onDone: () => void }) {
// //   return (
// //     <View style={[styles.root, styles.successRoot]}>
// //       <LinearGradient
// //         colors={[COLORS.bg, "#131320", COLORS.bg]}
// //         style={StyleSheet.absoluteFill}
// //       />
// //       <SafeAreaView style={styles.successContent}>
// //         <View style={styles.successIcon}>
// //           <Feather name="check" size={28} color={COLORS.bg} />
// //         </View>
// //         <Text style={styles.successTitle}>You&apos;re in</Text>
// //         <Text style={styles.successBody}>
// //           Your {PLAN.trialDays}-day trial has started. We&apos;ll remind you before
// //           the first ₹{PLAN.monthlyAmount} charge.
// //         </Text>
// //         <Pressable onPress={onDone} style={styles.cta}>
// //           <Text style={styles.ctaText}>Start learning</Text>
// //         </Pressable>
// //       </SafeAreaView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   root: { flex: 1, backgroundColor: COLORS.bg },
// //   safe: { flex: 1 },
// //   scroll: { padding: 24, paddingBottom: 40 },
// //   backButton: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     backgroundColor: COLORS.surface,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginBottom: 24,
// //   },
// //   eyebrow: {
// //     color: COLORS.accent,
// //     fontSize: 12,
// //     fontWeight: "700",
// //     letterSpacing: 2,
// //     marginBottom: 8,
// //   },
// //   headline: {
// //     color: COLORS.text,
// //     fontSize: 32,
// //     fontWeight: "700",
// //     lineHeight: 38,
// //     letterSpacing: -0.5,
// //     marginBottom: 12,
// //   },
// //   subhead: {
// //     color: COLORS.textMuted,
// //     fontSize: 15,
// //     lineHeight: 22,
// //     marginBottom: 28,
// //   },
// //   timeline: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: 28,
// //   },
// //   timelineNode: { alignItems: "center", width: 44 },
// //   timelineDot: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 5,
// //     backgroundColor: COLORS.accent,
// //     marginBottom: 6,
// //   },
// //   timelineLabel: { color: COLORS.textMuted, fontSize: 11 },
// //   timelineConnector: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: COLORS.border,
// //     marginBottom: 17,
// //   },
// //   timelinePill: {
// //     backgroundColor: COLORS.surfaceRaised,
// //     borderWidth: 1,
// //     borderColor: COLORS.accentDim,
// //     borderRadius: 14,
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     marginLeft: 8,
// //     marginBottom: 17,
// //   },
// //   timelinePillText: {
// //     color: COLORS.accent,
// //     fontSize: 12,
// //     fontWeight: "700",
// //   },
// //   priceCard: {
// //     backgroundColor: COLORS.surface,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: COLORS.border,
// //     padding: 20,
// //     marginBottom: 20,
// //   },
// //   priceRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     marginBottom: 16,
// //   },
// //   priceLabel: { color: COLORS.textMuted, fontSize: 12, marginBottom: 4 },
// //   priceValue: { color: COLORS.text, fontSize: 26, fontWeight: "700" },
// //   priceValueMuted: { color: COLORS.text, fontSize: 18, fontWeight: "600" },
// //   divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
// //   featureRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 10,
// //     marginBottom: 10,
// //   },
// //   featureText: { color: COLORS.text, fontSize: 14 },
// //   banner: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 8,
// //     borderWidth: 1,
// //     borderRadius: 12,
// //     padding: 12,
// //     marginBottom: 16,
// //   },
// //   bannerText: { color: COLORS.text, fontSize: 13, flex: 1 },
// //   bannerAction: { fontSize: 13, fontWeight: "700" },
// //   cta: {
// //     backgroundColor: COLORS.accent,
// //     borderRadius: 16,
// //     paddingVertical: 17,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 4,
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: COLORS.accent,
// //         shadowOpacity: 0.25,
// //         shadowRadius: 16,
// //         shadowOffset: { width: 0, height: 8 },
// //       },
// //       android: { elevation: 4 },
// //     }),
// //   },
// //   ctaDisabled: { opacity: 0.6 },
// //   ctaPressed: { opacity: 0.85 },
// //   ctaText: { color: "#ff9500", fontSize: 16, fontWeight: "700" },
// //   terms: {
// //     color: COLORS.textMuted,
// //     fontSize: 11,
// //     lineHeight: 16,
// //     textAlign: "center",
// //     marginTop: 16,
// //   },
// //   successRoot: {},
// //   successContent: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: 32,
// //   },
// //   successIcon: {
// //     width: 64,
// //     height: 64,
// //     borderRadius: 32,
// //     backgroundColor: COLORS.success,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginBottom: 20,
// //   },
// //   successTitle: {
// //     color: COLORS.text,
// //     fontSize: 24,
// //     fontWeight: "700",
// //     marginBottom: 8,
// //   },
// //   successBody: {
// //     color: COLORS.textMuted,
// //     fontSize: 14,
// //     textAlign: "center",
// //     lineHeight: 20,
// //     marginBottom: 32,
// //   },
// // });





// //gemini UI


// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ActivityIndicator,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// import RazorpayCheckout from "react-native-razorpay";
// import { router } from "expo-router";

// import { useStudentContext } from "@/providers/StudentProvider";
// import { useSubscription } from "@/hooks/useSubscription";
// import { verifySubscription } from "@/services/subscription.service";

// // ── Design tokens ────────────────────────────────────────────────
// const COLORS = {
//   bg: "#09090E",
//   surface: "#12121A",
//   surfaceRaised: "#181824",
//   border: "#2A2A38",
//   accent: "#FFC72C", // Matched to the gold/yellow in the screenshot
//   accentDim: "#5C4A22",
//   text: "#FFFFFF",
//   textMuted: "#9CA3AF", // Slightly lighter grey for readability
//   success: "#3ECF8E",
//   danger: "#E5636B",
// };

// const PLAN = {
//   trialAmount: 1,
//   trialDays: 3,
//   monthlyAmount: 499,
// };

// type Status =
//   | "idle"
//   | "starting"
//   | "checkout"
//   | "verifying"
//   | "success"
//   | "already_active"
//   | "error";

// export default function SubscriptionScreen() {
//   const { create, error: createError } = useSubscription();
//   const [status, setStatus] = useState<Status>("idle");
//   const [message, setMessage] = useState<string | null>(null);

//   const { student, loading, refreshStudent, setStudent } = useStudentContext();
//   const busy =
//     status === "starting" || status === "checkout" || status === "verifying";

//   const handleNavAfterSubs = () => {
//     refreshStudent();
//     router.replace("/courses");
//   };

//   const handleSubscribe = useCallback(async () => {
//     setMessage(null);
//     setStatus("starting");

//     const data = await create("plan_TDruEbSbh3cg7W");
//     console.log("subscription created data:", data);
//     if (!data) {
//       if (createError?.startsWith("ALREADY_SUBSCRIBED")) {
//         setStatus("already_active");
//       } else {
//         setStatus("error");
//         setMessage(createError ?? "Couldn't start your trial. Try again.");
//       }
//       return;
//     }

//     setStatus("checkout");
//     try {
//       const key = data.keyId ?? data.key;
//       const trialAmount =
//         data.trialAmount ?? data.plan?.trialAmount ?? PLAN.trialAmount;
//       const monthlyAmount =
//         data.monthlyAmount ?? data.plan?.price ?? PLAN.monthlyAmount;

//       if (!key || !data.subscriptionId) {
//         throw new Error("Missing Razorpay checkout details from server.");
//       }
//       console.log("Opening Razorpay");

//       const result = await RazorpayCheckout.open({
//         key,
//         subscription_id: data.subscriptionId,
//         name: "Premium",
//         description: `₹${trialAmount} today, then ₹${monthlyAmount}/mo`,
//         theme: { color: COLORS.accent },
//       });

//       console.log("result coming: ", result);
//       setStatus("verifying");

//       console.log("Calling verify API");
//       const verified = await verifySubscription({
//         razorpay_payment_id: result.razorpay_payment_id,
//         razorpay_subscription_id: result.razorpay_subscription_id,
//         razorpay_signature: result.razorpay_signature,
//       });

//       console.log("Verify response", verified);

//       if (verified?.ok) {
//         setStatus("success");
//       } else {
//         setStatus("error");
//         setMessage(
//           "Payment went through but couldn't be verified. Contact support."
//         );
//       }
//     } catch (error) {
//       console.log("Checkout error", error);
//       const checkoutMessage =
//         error instanceof Error
//           ? error.message
//           : "Razorpay checkout was cancelled.";

//       const normalizedMessage = checkoutMessage.toLowerCase();
//       const userCancelled =
//         normalizedMessage.includes("cancel") ||
//         normalizedMessage.includes("dismiss") ||
//         normalizedMessage.includes("closed");

//       setStatus(userCancelled ? "idle" : "error");
//       setMessage(userCancelled ? null : checkoutMessage);
//     }
//   }, [create, createError]);

//   if (status === "success") {
//     return <SuccessState onDone={handleNavAfterSubs} />;
//   }

//   return (
//     <View style={styles.root}>
//       <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
//         <ScrollView
//           contentContainerStyle={styles.scroll}
//           showsVerticalScrollIndicator={false}
//         >
//           <Pressable
//             onPress={() => router.back()}
//             hitSlop={12}
//             style={styles.backButton}
//           >
//             <Feather name="x" size={20} color={COLORS.text} />
//           </Pressable>

//           <Text style={styles.eyebrow}>PREMIUM</Text>
//           <Text style={styles.headline}>Every course.{"\n"}One membership.</Text>
//           <Text style={styles.subhead}>
//             Try it for {PLAN.trialDays} days for just ₹{PLAN.trialAmount}.{"\n"}
//             Cancel anytime before it renews.
//           </Text>

//           <TrialTimeline />

//           {/* Pricing Card Section */}
//           <View style={styles.priceCard}>
//             <Text style={styles.priceCardSubtitle}>
//               {PLAN.trialDays}-day trial
//             </Text>

//             <View style={styles.giantPriceRow}>
//               {/* Accents surrounding the price as seen in screenshot */}
//               <Feather name="minimize-2" size={20} color={COLORS.accent} style={{ transform: [{ rotate: '45deg' }] }} />
//               <Text style={styles.giantPriceText}>₹{PLAN.trialAmount}</Text>
//               <Feather name="minimize-2" size={20} color={COLORS.accent} style={{ transform: [{ rotate: '-135deg' }] }} />
//             </View>

//             <View style={styles.dividerContainer}>
//               <View style={styles.dividerLine} />
//               <View style={styles.dividerCircle}>
//                 <Feather name="arrow-down" size={14} color={COLORS.textMuted} />
//               </View>
//             </View>

//             <Text style={styles.priceCardSubtitle}>Then</Text>
//             <Text style={styles.futurePriceText}>
//               ₹{PLAN.monthlyAmount}/month
//             </Text>
//             <Text style={styles.priceCardFooter}>
//               Billed automatically after trial ends
//             </Text>
//           </View>

//           {/* Features Card Section */}
//           <View style={styles.featuresCard}>
//             <Feature text="Unlimited access to every course" />
//             <Feature text="Certificates on completion" />
//             <Feature text="Cancel from Settings, anytime" />
//           </View>

//           {status === "already_active" && (
//             <Banner
//               tone="info"
//               text="You already have a subscription."
//               action="Manage it"
//               onPress={() => router.push("/(root)/(tabs)/profile")}
//             />
//           )}

//           {status === "error" && message && (
//             <Banner tone="danger" text={message} />
//           )}

//           {/* Hidden/Dynamic CTA - Keeps logic exactly same but styling matches darker theme */}
//           {status !== "already_active" && (
//             <Pressable
//               onPress={handleSubscribe}
//               disabled={busy}
//               style={({ pressed }) => [
//                 styles.cta,
//                 busy && styles.ctaDisabled,
//                 pressed && !busy && styles.ctaPressed,
//               ]}
//             >
//               {busy ? (
//                 <ActivityIndicator color={COLORS.bg} />
//               ) : (
//                 <Text style={styles.ctaText}>
//                   Start {PLAN.trialDays}-day trial
//                 </Text>
//               )}
//             </Pressable>
//           )}

//           {/* Terms Section mapped exactly to layout */}
//           <View style={styles.termsContainer}>
//             <Text style={styles.termsHeading}>How it works</Text>
//             <Text style={styles.terms}>
//               By continuing you authorize a recurring mandate of ₹
//               {PLAN.monthlyAmount}/month via Razorpay, charged automatically
//               after your trial ends unless you cancel first.
//             </Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

// // ── Redesigned Signature Elements ────────────────────────────────
// function TrialTimeline() {
//   return (
//     <View style={styles.timeline}>
//       {/* Absolute line connector traversing across */}
//       <View style={styles.timelineTrack} />

//       {Array.from({ length: PLAN.trialDays }).map((_, i) => (
//         <View key={i} style={styles.timelineNode}>
//           <View style={styles.timelineDot} />
//           <Text style={styles.timelineLabel}>Day {i + 1}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// function Feature({ text }: { text: string }) {
//   return (
//     <View style={styles.featureRow}>
//       <Feather name="check" size={16} color={COLORS.accent} />
//       <Text style={styles.featureText}>{text}</Text>
//     </View>
//   );
// }

// function Banner({
//   tone,
//   text,
//   action,
//   onPress,
// }: {
//   tone: "info" | "danger";
//   text: string;
//   action?: string;
//   onPress?: () => void;
// }) {
//   const color = tone === "danger" ? COLORS.danger : COLORS.accent;
//   return (
//     <View style={[styles.banner, { borderColor: color }]}>
//       <Feather
//         name={tone === "danger" ? "alert-circle" : "info"}
//         size={16}
//         color={color}
//       />
//       <Text style={styles.bannerText}>{text}</Text>
//       {action && (
//         <Pressable onPress={onPress}>
//           <Text style={[styles.bannerAction, { color }]}>{action} &gt;</Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// function SuccessState({ onDone }: { onDone: () => void }) {
//   return (
//     <View style={[styles.root, styles.successRoot]}>
//       <SafeAreaView style={styles.successContent}>
//         <View style={styles.successIcon}>
//           <Feather name="check" size={28} color={COLORS.bg} />
//         </View>
//         <Text style={styles.successTitle}>You&apos;re in</Text>
//         <Text style={styles.successBody}>
//           Your {PLAN.trialDays}-day trial has started. We&apos;ll remind you
//           before the first ₹{PLAN.monthlyAmount} charge.
//         </Text>
//         <Pressable onPress={onDone} style={styles.cta}>
//           <Text style={styles.ctaText}>Start learning</Text>
//         </Pressable>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: COLORS.bg },
//   safe: { flex: 1 },
//   scroll: { padding: 24, paddingBottom: 40 },
//   backButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "transparent",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//     marginLeft: -8,
//   },
//   eyebrow: {
//     color: COLORS.accent,
//     fontSize: 12,
//     fontWeight: "800",
//     letterSpacing: 1.5,
//     marginBottom: 12,
//   },
//   headline: {
//     color: COLORS.text,
//     fontSize: 34,
//     fontWeight: "700",
//     lineHeight: 40,
//     letterSpacing: -0.5,
//     marginBottom: 16,
//   },
//   subhead: {
//     color: COLORS.textMuted,
//     fontSize: 15,
//     lineHeight: 22,
//     marginBottom: 32,
//   },
//   timeline: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 24,
//     paddingHorizontal: 20,
//     position: "relative",
//   },
//   timelineTrack: {
//     position: "absolute",
//     top: 5, // Vertically centered with the dots
//     left: 40,
//     right: 40,
//     height: 1,
//     backgroundColor: COLORS.border,
//     zIndex: 1,
//   },
//   timelineNode: { 
//     alignItems: "center", 
//     zIndex: 2, 
//     backgroundColor: COLORS.bg 
//   },
//   timelineDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: COLORS.accent,
//     marginBottom: 8,
//   },
//   timelineLabel: { color: COLORS.textMuted, fontSize: 13 },
//   priceCard: {
//     backgroundColor: COLORS.surface,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingVertical: 28,
//     paddingHorizontal: 20,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   priceCardSubtitle: {
//     color: COLORS.textMuted,
//     fontSize: 15,
//     marginBottom: 8,
//   },
//   giantPriceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 16,
//     marginVertical: 4,
//   },
//   giantPriceText: {
//     color: COLORS.text,
//     fontSize: 72,
//     fontWeight: "700",
//     includeFontPadding: false,
//   },
//   dividerContainer: {
//     width: "100%",
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 24,
//   },
//   dividerLine: {
//     width: "100%",
//     height: 1,
//     backgroundColor: COLORS.border,
//   },
//   dividerCircle: {
//     position: "absolute",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   futurePriceText: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 6,
//   },
//   priceCardFooter: {
//     color: COLORS.textMuted,
//     fontSize: 12,
//   },
//   featuresCard: {
//     backgroundColor: COLORS.surface,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     padding: 20,
//     marginBottom: 20,
//     gap: 12,
//   },
//   featureRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   featureText: { color: COLORS.text, fontSize: 14 },
//   banner: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//   },
//   bannerText: { color: COLORS.text, fontSize: 14, flex: 1 },
//   bannerAction: { fontSize: 14, fontWeight: "600" },
//   cta: {
//     backgroundColor: "#FFDE4E", // Changing to match a neutral minimal scheme if needed, but keeping prominent
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   ctaDisabled: { opacity: 0.6 },
//   ctaPressed: { opacity: 0.85 },
//   ctaText: { color: "#769826", fontSize: 16, fontWeight: "700" },
//   termsContainer: {
//     marginTop: 8,
//   },
//   termsHeading: {
//     color: COLORS.accent,
//     fontSize: 15,
//     fontWeight: "700",
//     marginBottom: 6,
//   },
//   terms: {
//     color: COLORS.textMuted,
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   successRoot: {},
//   successContent: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 32,
//   },
//   successIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: COLORS.success,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   successTitle: {
//     color: COLORS.text,
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 8,
//   },
//   successBody: {
//     color: COLORS.textMuted,
//     fontSize: 14,
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 32,
//   },
// });














//claude design — migrated from Razorpay to RevenueCat

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
// RazorpayCheckout import kept but no longer called:
// import RazorpayCheckout from "react-native-razorpay";
import { router } from "expo-router";
import { useClerk } from "@clerk/expo";

import { useStudentContext } from "@/providers/StudentProvider";
import {
  purchaseMonthlyPackage,
  restorePurchases,
  getMonthlyPackage,
  getTrialSubscriptionOption,
  checkPremiumStatus,
  type PurchaseResult,
} from "@/lib/revenuecat";
import type { PurchasesPackage } from "react-native-purchases";
import { logInitiateCheckout } from "@/lib/meta-events";

// ── Design tokens ────────────────────────────────────────────────
// Kept for passing direct hex values to icon 'color' props.
const COLORS = {
  bg: "#09090E",
  surface: "#12121A",
  surfaceRaised: "#181824",
  border: "#2A2A38",
  accent: "#FFC72C",
  accentDim: "#5C4A22",
  text: "#FFFFFF",
  textMuted: "#9CA3AF",
  success: "#3ECF8E",
  danger: "#E5636B",
};

// Fallback plan info (used if Google Play product info is unavailable)
const PLAN = {
  introPrice: "₹4",
  introDays: 3,
  monthlyPrice: "₹499",
  monthlyAmount: 499,
};

type Status =
  | "idle"
  | "loading_package"
  | "purchasing"
  | "restoring"
  | "success"
  | "already_active"
  | "error";

export default function SubscriptionScreen() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [monthlyPkg, setMonthlyPkg] = useState<PurchasesPackage | null>(null);

  const { student, refreshStudent } = useStudentContext();
  const { signOut } = useClerk();

  const busy =
    status === "loading_package" ||
    status === "purchasing" ||
    status === "restoring";

  // Load the monthly package from RevenueCat on mount
  useEffect(() => {
    let cancelled = false;

    async function loadPackage() {
      try {
        const pkg = await getMonthlyPackage();
        if (!cancelled) setMonthlyPkg(pkg);
      } catch (err) {
        console.warn("[Subscription] Failed to load package:", err);
      }
    }

    loadPackage();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derive display prices from RevenueCat product, specific trial option, or fallback
  const product = monthlyPkg?.product;
  const trialOption = monthlyPkg ? getTrialSubscriptionOption(monthlyPkg) : null;
  const activeIntroPhase = trialOption?.introPhase ?? trialOption?.freePhase;

  const displayMonthlyPrice =
    trialOption?.fullPricePhase?.price?.formatted ??
    product?.priceString ??
    PLAN.monthlyPrice;

  const displayIntroPrice =
    activeIntroPhase?.price?.formatted ??
    product?.introPrice?.priceString ??
    PLAN.introPrice;

  const displayIntroDays = activeIntroPhase?.billingPeriod
    ? `${activeIntroPhase.billingPeriod.value} ${
        activeIntroPhase.billingPeriod.unit === "DAY"
          ? activeIntroPhase.billingPeriod.value === 1
            ? "day"
            : "days"
          : activeIntroPhase.billingPeriod.unit.toLowerCase()
      }`
    : product?.introPrice
    ? `${product.introPrice.periodNumberOfUnits} ${
        product.introPrice.periodUnit === "DAY"
          ? product.introPrice.periodNumberOfUnits === 1
            ? "day"
            : "days"
          : product.introPrice.periodUnit.toLowerCase()
      }`
    : `${PLAN.introDays} days`;

  const handleNavAfterSubs = () => {
    refreshStudent();
    router.replace("/courses");
  };

  // Blocks a second tap before the "purchasing" state has re-rendered,
  // so one checkout can't log InitiateCheckout or start Google Play twice.
  const purchaseInFlight = useRef(false);

  const runSubscribe = async () => {
    setMessage(null);
    setStatus("purchasing");

    // Meta InitiateCheckout — only when a purchasable product is loaded,
    // i.e. this tap actually opens Google Play checkout. Trial/subscribe
    // outcomes are sent to Meta by RevenueCat, not from the app.
    if (monthlyPkg) {
      const trialPrice = activeIntroPhase
        ? activeIntroPhase.price.amountMicros / 1000000
        : monthlyPkg.product.price;

      logInitiateCheckout({
        productId: monthlyPkg.product.identifier,
        price: trialPrice,
        currency:
          activeIntroPhase?.price?.currencyCode ??
          monthlyPkg.product.currencyCode,
      });
    }

    const result: PurchaseResult = await purchaseMonthlyPackage();

    if (result.cancelled) {
      // User cancelled — just go back to idle
      setStatus("idle");
      return;
    }

    if (result.success && result.isPremium) {
      setStatus("success");
      return;
    }

    if (result.success && !result.isPremium) {
      // Purchase succeeded but entitlement not yet active
      // (can happen during processing)
      setStatus("error");
      setMessage(
        "Purchase completed but your premium access is being processed. Please restart the app."
      );
      return;
    }

    // Error case
    setStatus("error");
    setMessage(
      result.errorMessage ?? "Something went wrong. Please try again."
    );
  };

  const handleSubscribe = async () => {
    if (busy || purchaseInFlight.current) return;
    purchaseInFlight.current = true;

    try {
      await runSubscribe();
    } finally {
      purchaseInFlight.current = false;
    }
  };

  const handleRestore = useCallback(async () => {
    if (busy) return;

    setMessage(null);
    setStatus("restoring");

    const result = await restorePurchases();

    if (result.isPremium) {
      setStatus("success");
      return;
    }

    if (result.success && !result.isPremium) {
      setStatus("idle");
      setMessage("No active subscription found. Subscribe to get premium access.");
      return;
    }

    setStatus("error");
    setMessage(
      result.errorMessage ?? "Could not restore purchases. Try again later."
    );
  }, [busy]);

  if (status === "success") {
    return <SuccessState onDone={handleNavAfterSubs} />;
  }

  return (
    <View className="flex-1 bg-[#09090E]">
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <ScrollView
          contentContainerClassName="p-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              onPress={() => signOut()}
              className="w-10 h-10 rounded-full bg-[#E5636B] items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Sign out"
            >
              <Feather name="log-out" size={18} color="#ffffffff" />
            </Pressable>
          </View>

          <Text className="text-[#FFC72C] text-xs font-extrabold tracking-[1.5px] mb-3">
            PREMIUM
          </Text>
          <Text className="text-white text-[34px] font-bold leading-[40px] tracking-[-0.5px] mb-4">
            Every course.{"\n"}One membership.
          </Text>
          <Text className="text-[#9CA3AF] text-[15px] leading-[22px] mb-8">
            Try it for {displayIntroDays} for just {displayIntroPrice}.{"\n"}
            Cancel anytime before it renews.
          </Text>

          <TrialTimeline introPrice={displayIntroPrice} introDays={displayIntroDays} />

          {/* Pricing Card Section */}
          <View className="bg-[#12121A] rounded-2xl border border-[#2A2A38] py-7 px-5 items-center mb-4">
            <Text className="text-[#9CA3AF] text-[15px] mb-2">
              Introductory offer
            </Text>

            <View className="flex-row items-center gap-4 my-1">
              <Feather
                name="minimize-2"
                size={20}
                color={COLORS.accent}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
              <Text
                className="text-white text-[72px] font-bold"
                style={{ includeFontPadding: false }}
              >
                {displayIntroPrice}
              </Text>
              <Feather
                name="minimize-2"
                size={20}
                color={COLORS.accent}
                style={{ transform: [{ rotate: "-135deg" }] }}
              />
            </View>

            <Text className="text-[#9CA3AF] text-xs mt-1 mb-4">
              for {displayIntroDays}
            </Text>

            <View className="w-full relative items-center justify-center my-6">
              <View className="w-full h-[1px] bg-[#2A2A38]" />
              <View className="absolute w-7 h-7 rounded-full bg-[#2A2A38] items-center justify-center">
                <Feather name="arrow-down" size={14} color={COLORS.textMuted} />
              </View>
            </View>

            <Text className="text-[#9CA3AF] text-[15px] mb-2">Then</Text>
            <Text className="text-white text-base font-bold mb-[6px]">
              {displayMonthlyPrice}/month
            </Text>
            <Text className="text-[#9CA3AF] text-xs">
              Billed automatically · Auto-renews monthly
            </Text>
          </View>

          {/* Features Card Section */}
          <View className="bg-[#12121A] rounded-xl border border-[#2A2A38] p-5 mb-5 gap-3">
            <Feature text="Unlimited access to every course" />
            <Feature text="Certificates on completion" />
            <Feature text="Manage or cancel via Google Play" />
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

          {/* Idle message (e.g. after restore with no subscription) */}
          {status === "idle" && message && (
            <Banner tone="info" text={message} />
          )}

          {status !== "already_active" && (
            <Pressable
              onPress={handleSubscribe}
              disabled={busy}
              className={`bg-[#FFDE4E] rounded-lg py-4 items-center justify-center mb-3 mt-2 active:opacity-85 ${
                busy ? "opacity-60" : "opacity-100"
              }`}
            >
              {busy && status === "purchasing" ? (
                <ActivityIndicator color={COLORS.bg} />
              ) : (
                <Text className="text-[#09090E] text-base font-bold">
                  Subscribe — {displayIntroPrice} for {displayIntroDays}
                </Text>
              )}
            </Pressable>
          )}

          {/* Restore purchases */}
          <Pressable
            onPress={handleRestore}
            disabled={busy}
            className={`py-3 items-center justify-center mb-5 ${
              busy ? "opacity-40" : "opacity-100"
            }`}
          >
            {busy && status === "restoring" ? (
              <ActivityIndicator color={COLORS.textMuted} />
            ) : (
              <Text className="text-[#9CA3AF] text-sm underline">
                Restore purchases
              </Text>
            )}
          </Pressable>

          {/* Terms Section */}
          <View className="mt-2">
            <Text className="text-[#FFC72C] text-[15px] font-bold mb-[6px]">
              How it works
            </Text>
            <Text className="text-[#9CA3AF] text-[13px] leading-[18px]">
              Your subscription is processed through Google Play.
              {"\n\n"}• {displayIntroPrice} introductory offer for {displayIntroDays}
              {"\n"}• Then {displayMonthlyPrice}/month, auto-renewing
              {"\n"}• Cancel anytime from Google Play subscriptions
              {"\n\n"}Payment is charged to your Google Play account.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── Redesigned Signature Elements ────────────────────────────────
function TrialTimeline({
  introPrice,
  introDays,
}: {
  introPrice: string;
  introDays: string;
}) {
  return (
    <View className="flex-row justify-between items-center mb-6 px-5 relative">
      <View className="absolute top-[5px] left-10 right-10 h-[1px] bg-[#2A2A38] z-0" />

      <View className="items-center z-10 bg-[#09090E]">
        <View className="w-[10px] h-[10px] rounded-[5px] bg-[#FFC72C] mb-2" />
        <Text className="text-[#9CA3AF] text-[13px]">Today</Text>
      </View>

      <View className="items-center z-10 bg-[#09090E] px-2">
        <View className="w-[10px] h-[10px] rounded-[5px] bg-[#FFC72C] mb-2" />
        <Text className="text-[#9CA3AF] text-[13px]">{introDays}</Text>
      </View>

      <View className="items-center z-10 bg-[#09090E]">
        <View className="w-[10px] h-[10px] rounded-[5px] bg-[#9CA3AF] mb-2" />
        <Text className="text-[#9CA3AF] text-[13px]">Monthly</Text>
      </View>
    </View>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View className="flex-row items-center gap-3">
      <Feather name="check" size={16} color={COLORS.accent} />
      <Text className="text-white text-sm">{text}</Text>
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
  const isDanger = tone === "danger";
  const color = isDanger ? COLORS.danger : COLORS.accent;

  return (
    <View
      className={`flex-row items-center gap-2 border rounded-lg p-4 mb-6 ${
        isDanger ? "border-[#E5636B]" : "border-[#FFC72C]"
      }`}
    >
      <Feather
        name={isDanger ? "alert-circle" : "info"}
        size={16}
        color={color}
      />
      <Text className="text-white text-sm flex-1">{text}</Text>
      {action && (
        <Pressable onPress={onPress}>
          <Text
            className={`text-sm font-semibold ${
              isDanger ? "text-[#E5636B]" : "text-[#FFC72C]"
            }`}
          >
            {action} &gt;
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function SuccessState({ onDone }: { onDone: () => void }) {
  return (
    <View className="flex-1 bg-[#09090E]">
      <SafeAreaView className="flex-1 items-center justify-center p-8">
        <View className="w-16 h-16 rounded-full bg-[#3ECF8E] items-center justify-center mb-5">
          <Feather name="check" size={28} color={COLORS.bg} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">You&apos;re in!</Text>
        <Text className="text-[#9CA3AF] text-sm text-center leading-5 mb-8">
          Your GyanMaster Premium subscription is now active.
          Enjoy unlimited access to every course!
        </Text>
        <Pressable
          onPress={onDone}
          className="bg-[#FFDE4E] rounded-lg py-4 px-8 items-center justify-center mb-5 active:opacity-85"
        >
          <Text className="text-[#09090E] text-base font-bold">Start learning</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}