import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable
} from "react-native";
import { router } from "expo-router";
import { useAuth, useClerk } from "@clerk/expo";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/providers/ThemeProvider";
import { getErrorMessage } from "@/utils/errorMessages";

export default function OnboardingScreen() {
  const theme = useAppTheme();
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  console.log("API_URL:", API_URL);
  console.log("name:", name);

  const handleContinue = async () => {
    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!trimmedName) {
      Alert.alert("Missing Info", "Please enter your full name to continue.");
      return;
    }

    if (!cleanPhone) {
      Alert.alert("Missing Info", "Please enter your phone number to continue.");
      return;
    }

    if (cleanPhone.length !== 10) {
      Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        Alert.alert("Sign in required", "Please sign in again to continue.");
        return;
      }

      console.log("Token:", token);

      const response = await fetch(`${API_URL}/api/student/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: cleanPhone,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      console.log("Status:", response.status);

      if (!response.ok) {
        const rawMsg = data?.message || data?.error || "Unable to save profile";
        throw new Error(rawMsg);
      }

      router.replace("/(root)/(tabs)");
    } catch (error) {
      Alert.alert("Onboarding failed", getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Decorative Background Blobs for Glassmorphism Context */}
      <View style={[styles.blob, styles.blobTopLeft]} />
      <View style={[styles.blob, styles.blobBottomRight]} />
      <View style={[styles.blob, styles.blobCenter]} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.headerContainer}>
              <View style={styles.headerRow}>
                <Text style={[styles.title, { color: theme.text, flex: 1 }]}>Welcome to GyanMaster</Text>
                <Pressable
                  onPress={() => signOut()}
                  style={[styles.logoutButton, { backgroundColor: theme.accentCrimson }]}
                  accessibilityRole="button"
                  accessibilityLabel="Sign out"
                >
                  <Feather name="log-out" size={18} color="#ffffffff" />
                </Pressable>
              </View>
              <Text style={[styles.subtitle, { color: theme.textMuted }]}>
                Tell us a little about yourself so we can personalize your learning journey.
              </Text>
            </View>

            {/* Glassmorphism Card */}
            <View style={[styles.glassCard, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.text }]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textMuted }]}>Full Name</Text>
                <TextInput
                  placeholder="Eon Morgon"
                  placeholderTextColor={theme.textMuted}
                  value={name}
                  onChangeText={setName}
                  style={[styles.input, { backgroundColor: theme.surfaceMuted, borderColor: theme.border, color: theme.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textMuted }]}>Phone Number</Text>
                <TextInput
                  placeholder="9876543210"
                  placeholderTextColor={theme.textMuted}
                  value={phone}
                  keyboardType="number-pad"
                  maxLength={10}
                  onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
                  style={[styles.input, { backgroundColor: theme.surfaceMuted, borderColor: theme.border, color: theme.text }]}
                />
              </View>
            </View>
          </View>

          {/* Replaced Pressable with TouchableOpacity */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={loading}
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: loading ? "#93C5FD" : theme.primary }, loading && styles.buttonDisabled]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Complete Profile</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  /* Background Decorative Blobs */
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
  },
  blobTopLeft: {
    top: -50,
    left: -80,
    backgroundColor: "#93C5FD",
  },
  blobBottomRight: {
    bottom: -100,
    right: -50,
    backgroundColor: "#C4B5FD",
  },
  blobCenter: {
    top: "40%",
    left: "10%",
    backgroundColor: "#A7F3D0",
    width: 250,
    height: 250,
    opacity: 0.2,
  },
  /* Header Styles */
  headerContainer: {
    marginBottom: 32,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
    fontWeight: "400",
  },
  /* Glassmorphism Card Style */
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    // iOS Shadow
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    // Android Shadow
    elevation: 4,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  optional: {
    textTransform: "none",
    fontWeight: "400",
    color: "#94A3B8",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1E293B",
  },
  /* Button Styles */
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // Button Shadow
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#A5B4FC",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
