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
          backgroundColor: colors.tabBackground || colors.surface, // Use tabBackground or fallback to surface
          borderTopColor: colors.border,
          borderTopWidth: 1,
          // You can add more styling here:
          // opacity: 0.9, // For transparency
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: -2 },
          // shadowOpacity: 0.1,
          // shadowRadius: 4,
        },
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
