import { Tabs } from "expo-router";
import { Heart, Phone, Trash } from "phosphor-react-native";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          display: "none", // Hide the default tab bar
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
          title: t("contact.howToContact"),
          tabBarIcon: ({ color }) => (
            <Phone size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="refused-jobs"
        options={{
          title: t("header.refusedJobs"),
          tabBarIcon: ({ color }) => (
            <Trash size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen-jobs"
        options={{
          title: t("header.chosenJobs"),
          tabBarIcon: ({ color }) => (
            <Heart size={28} color={color} weight="fill" />
          ),
        }}
      />
    </Tabs>
  );
}
