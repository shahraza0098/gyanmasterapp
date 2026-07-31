import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/providers/ThemeProvider";

interface LoadingStateProps {
  /** Optional message to show below the spinner. */
  message?: string;
}

export default function LoadingState({
  message = "Loading…",
}: LoadingStateProps) {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={styles.inner}>
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />
        {message ? (
          <Text
            style={[
              styles.message,
              { color: theme.textMuted },
            ]}
          >
            {message}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
