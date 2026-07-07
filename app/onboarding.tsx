import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/expo";
import { API_URL } from "../config/api";

export default function OnboardingScreen() {
  const { getToken } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Missing info", "Please enter your name and email to continue.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        Alert.alert("Sign in required", "Please sign in again to continue.");
        return;
      }

      const response = await fetch(`${API_URL}/api/student/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          username: username.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save profile");
      }

      router.replace("/(root)/(tabs)");
    } catch (error) {
      Alert.alert("Onboarding failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24, justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#111827" }}>
            Welcome to GyanMaster
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: "#6b7280", lineHeight: 24 }}>
            Tell us a little about yourself so we can personalize your learning journey.
          </Text>

          <View style={{ marginTop: 24, gap: 14 }}>
            <TextInput
              placeholder="Full name"
              value={name}
              onChangeText={setName}
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
            <TextInput
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
            <TextInput
              placeholder="Phone (optional)"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
            <TextInput
              placeholder="Username (optional)"
              value={username}
              autoCapitalize="none"
              onChangeText={setUsername}
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
            />
          </View>
        </View>

        <Pressable
          onPress={handleContinue}
          disabled={loading}
          style={{ backgroundColor: loading ? "#93c5fd" : "#2563eb", paddingVertical: 14, borderRadius: 14, alignItems: "center" }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Continue</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
