import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function BlurTabBarBackground() {
  const { isDark } = useTheme();

  return (
    <BlurView
      // Adapt tint to theme
      tint={isDark ? "dark" : "light"}
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
