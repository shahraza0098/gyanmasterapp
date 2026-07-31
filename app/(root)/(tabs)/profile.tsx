// import React from "react";
// import { Text, View } from "react-native";

// export default function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile</Text>
//     </View>
//   );
// }



import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useClerk } from "@clerk/expo";

import ProfileHeader from "@/components/profile/ProfileHeader";
import LogoutButton from "@/components/profile/LogoutButton";
import ProfileSettings from "@/components/profile/ProfileSettings";
import SubscriptionDetails from "@/components/profile/SubscriptionDetails";

import { useProfile } from "@/hooks/useProfile";
import { useAppTheme } from "@/providers/ThemeProvider";
import { useStudentContext } from "@/providers/StudentProvider";

export default function ProfileScreen() {
  const theme = useAppTheme();
  const { student } = useStudentContext();
  const {
    profile,
    loading,
    refreshing,
    error,
    refresh,
  } = useProfile();

  const { signOut } = useClerk();

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.danger }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader profile={profile} />

        <View style={styles.menuContainer}>
          <ProfileSettings profile={profile} />

          <SubscriptionDetails subscription={student?.subscription} />

          <LogoutButton onPress={() => signOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E9EB",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexGrow: 1,
  },
  menuContainer: {
    marginTop: 14,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
