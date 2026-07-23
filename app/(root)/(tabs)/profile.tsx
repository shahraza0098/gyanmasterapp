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
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useClerk } from "@clerk/expo";

import ProfileHeader from "@/components/profile/ProfileHeader";
import LogoutButton from "@/components/profile/LogoutButton";
import ProfileSettings from "@/components/profile/ProfileSettings";

import { useProfile } from "@/hooks/useProfile";
import { useAppTheme } from "@/providers/ThemeProvider";

export default function ProfileScreen() {
  const theme = useAppTheme();
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
        contentContainerStyle={
          styles.content
        }
      >
        <ProfileHeader
          profile={profile}
        />

        <ProfileSettings profile={profile} />

        <LogoutButton
          onPress={() => signOut()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,

    flexGrow: 1,

    justifyContent:
      "space-between",
  },

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },
});
