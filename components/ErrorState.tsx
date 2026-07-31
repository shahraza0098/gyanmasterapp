import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/providers/ThemeProvider";

interface ErrorStateProps {
  /** The error message to display. */
  message?: string | null;

  /** Custom title (defaults to "Something went wrong"). */
  title?: string;

  /** Callback fired when the user taps "Try Again". */
  onRetry?: () => void;

  /**
   * If true, wraps the error in a ScrollView with RefreshControl
   * so pull-to-refresh works on the error state.
   */
  onRefresh?: () => void;

  /** Whether the refresh indicator is active. */
  refreshing?: boolean;
}

export default function ErrorState({
  message,
  title = "Something went wrong",
  onRetry,
  onRefresh,
  refreshing = false,
}: ErrorStateProps) {
  const theme = useAppTheme();

  const content = (
    <View style={styles.inner}>
      {/* Icon */}
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.dangerSoft },
        ]}
      >
        <Feather
          name="wifi-off"
          size={32}
          color={theme.danger}
        />
      </View>

      {/* Title */}
      <Text
        style={[styles.title, { color: theme.text }]}
      >
        {title}
      </Text>

      {/* Message */}
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

      {/* Retry Button */}
      {onRetry ? (
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: theme.primary },
          ]}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Feather
            name="refresh-cw"
            size={16}
            color="#FFFFFF"
            style={styles.retryIcon}
          />
          <Text style={styles.retryText}>
            Try Again
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  // If onRefresh is provided, wrap in a ScrollView so pull-to-refresh works
  if (onRefresh) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  inner: {
    alignItems: "center",
    paddingHorizontal: 40,
  },

  // --- Icon ---
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  // --- Text ---
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
  },

  // --- Button ---
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
