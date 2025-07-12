import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabBarBackground() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
