import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { Heart, Phone, Trash } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomBottomNavProps {
  onContactPress: () => void;
}

export const CustomBottomNav: React.FC<CustomBottomNavProps> = ({
  onContactPress,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.tabBackground , // Use tabBackground for custom navigation
        borderTopColor: colors.border,
        borderTopWidth: 1,
        paddingBottom: 20,
        paddingTop: 8,
        paddingHorizontal: 16,
        // Add more styling options:
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: -2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 8, // For Android shadow
      }}
    >
      {/* Left - Refused Jobs */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/refused-jobs")}
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 8,
        //   backgroundColor: colors.surface,
        }}
      >
        <Trash size={28} color={colors.iconSecondary} weight="fill" />
        <Text
          style={{
            color: colors.iconSecondary,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {t("header.refusedJobs")}
        </Text>
      </TouchableOpacity>

      {/* Middle - Contact Modal */}
      <TouchableOpacity
        onPress={onContactPress}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          backgroundColor: colors.tabIconBackground, 
          borderRadius: 8, 
          borderColor: colors.border,
        }}
      >
        <Phone size={28} color={colors.iconSecondary} weight="fill" />
      </TouchableOpacity>

      {/* Right - Chosen Jobs */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/chosen-jobs")}
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 8,
        }}
      >
        <Heart size={28} color={colors.iconSecondary} weight="fill" />
        <Text
          style={{
            color: colors.iconSecondary,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {t("header.chosenJobs")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
