import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
}

export const lightTheme: ThemeColors = {
  background: "#FFFFFF",
  surface: "#F8F9FA",
  primary: "#48A6AC",
  secondary: "#555AE9",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  card: "#FFFFFF",
  accent: "#10B981",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
};

export const darkTheme: ThemeColors = {
  background: "#111827",
  surface: "#1F2937",
  primary: "#60C7D2",
  secondary: "#6366F1",
  text: "#F9FAFB",
  textSecondary: "#D1D5DB",
  border: "#374151",
  card: "#1F2937",
  accent: "#34D399",
  error: "#F87171",
  success: "#34D399",
  warning: "#FBBF24",
};

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@theme_mode";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
