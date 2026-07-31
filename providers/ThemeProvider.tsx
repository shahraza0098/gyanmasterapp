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
  accentRose: string;
  accentGold: string;
  accentTeal: string;
  accentPlum: string;
  accentCrimson: string;
};

const lightTheme: AppTheme = {
  isDark: false,
  background: "#E8E9EB",
  surface: "#FFFFFF",
  surfaceMuted: "#CCCDC6",
  border: "#CCCDC6",
  text: "#262626",
  textMuted: "#746D69",
  primary: "#066466",
  primarySoft: "#0664661F",
  danger: "#950E1D",
  dangerSoft: "#950E1D1F",
  accentRose: "#AB606F",
  accentGold: "#DEB041",
  accentTeal: "#066466",
  accentPlum: "#6A2B56",
  accentCrimson: "#950E1D",
};

const darkTheme: AppTheme = {
  isDark: true,
  background: "#262626",
  surface: "#333230",
  surfaceMuted: "#746D69",
  border: "#746D69",
  text: "#E8E9EB",
  textMuted: "#ACADA8",
  primary: "#DEB041",
  primarySoft: "#DEB04126",
  danger: "#AB606F",
  dangerSoft: "#AB606F26",
  accentRose: "#AB606F",
  accentGold: "#DEB041",
  accentTeal: "#066466",
  accentPlum: "#6A2B56",
  accentCrimson: "#950E1D",
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
