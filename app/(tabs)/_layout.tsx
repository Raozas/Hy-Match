import { Tabs } from "expo-router";
import { House, PaperPlaneTilt, HandWithdraw } from "phosphor-react-native";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <House size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <HandWithdraw size={28} color={color} weight="fill" />
          ),
        }}
      />
    </Tabs>
  );
}
