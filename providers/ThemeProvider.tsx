import { StatusBar } from "expo-status-bar";
import "expo-sqlite/localStorage/install";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

const THEME_PREFERENCE_KEY = "gyanmaster.theme-preference";

export type ThemePreference = "system" | "light" | "dark";

export type AppTheme = {
  isDark: boolean;
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primarySoft: string;
  danger: string;
  dangerSoft: string;
};

const lightTheme: AppTheme = {
  isDark: false,
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F9",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#64748B",
  primary: "#2563EB",
  primarySoft: "#DBEAFE",
  danger: "#DC2626",
  dangerSoft: "#FEF2F2",
};

const darkTheme: AppTheme = {
  isDark: true,
  background: "#0F172A",
  surface: "#172033",
  surfaceMuted: "#243047",
  border: "#334155",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  primary: "#60A5FA",
  primarySoft: "#1E3A5F",
  danger: "#FCA5A5",
  dangerSoft: "#451A1A",
};

type ThemeContextValue = AppTheme & {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  ...lightTheme,
  preference: "system",
  setPreference: () => undefined,
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    try {
      const storedPreference = localStorage.getItem(THEME_PREFERENCE_KEY);

      if (
        storedPreference === "system" ||
        storedPreference === "light" ||
        storedPreference === "dark"
      ) {
        setPreference(storedPreference);
      }
    } catch {
      // The app can still follow the system theme if local persistence is unavailable.
    }
  }, []);

  const updatePreference = (nextPreference: ThemePreference) => {
    try {
      localStorage.setItem(THEME_PREFERENCE_KEY, nextPreference);
    } catch {
      // Apply the choice for this session even if it cannot be saved.
    }
    setPreference(nextPreference);
  };

  const theme = useMemo(
    () => {
      const resolvedScheme =
        preference === "system" ? colorScheme : preference;

      return resolvedScheme === "dark" ? darkTheme : lightTheme;
    },
    [colorScheme, preference],
  );

  return (
    <ThemeContext.Provider
      value={{ ...theme, preference, setPreference: updatePreference }}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}

export function getTheme(colorScheme: ColorSchemeName): AppTheme {
  return colorScheme === "dark" ? darkTheme : lightTheme;
}
