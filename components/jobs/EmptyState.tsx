import React from "react";
import { Text, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface EmptyStateProps {
  message?: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subtitle,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="items-center">
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {message || t("home.allJobsCompleted")}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          marginTop: 8,
        }}
      >
        {subtitle || t("home.waitForNewJobs")}
      </Text>
    </View>
  );
};
