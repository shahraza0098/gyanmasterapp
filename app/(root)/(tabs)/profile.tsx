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

import { useProfile } from "@/hooks/useProfile";

export default function ProfileScreen() {
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
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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