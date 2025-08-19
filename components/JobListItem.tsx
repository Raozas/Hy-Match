import { Check, X } from "phosphor-react-native";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { JobData } from "./CardComponent";
import TextComponent from "./TextComponent";
import TextWithIcon from "./TextWithIcon";

interface JobListItemProps {
  jobData: JobData;
  onPress?: () => void;
  onStatusChange?: (jobId: string, newStatus: JobData["status"]) => void;
  className?: string;
}

const JobListItem = ({
  jobData,
  onPress,
  onStatusChange,
  className,
}: JobListItemProps) => {
  const { colors } = useTheme();
  const { t, translateJobData } = useLanguage();

  // Translate job data based on current language
  const translatedJobData = translateJobData(jobData);

  const getSwipeActions = () => {
    switch (jobData.status) {
      case "pending":
        return [
          {
            action: "choose",
            label: t("swipe.choose"),
            icon: Check,
            backgroundColor: "#4CAF50",
            newStatus: "choosed" as const,
          },
          {
            action: "refuse",
            label: t("swipe.refuse"),
            icon: X,
            backgroundColor: "#F44336",
            newStatus: "refusal" as const,
          },
        ];
      case "choosed":
        return [
          {
            action: "refuse",
            label: t("swipe.refuse"),
            icon: X,
            backgroundColor: "#F44336",
            newStatus: "refusal" as const,
          },
        ];
      case "refusal":
        return [
          {
            action: "choose",
            label: t("swipe.choose"),
            icon: Check,
            backgroundColor: "#4CAF50",
            newStatus: "choosed" as const,
          },
        ];
      default:
        return [];
    }
  };

  const handleStatusChange = (newStatus: JobData["status"]) => {
    onStatusChange?.(jobData.id, newStatus);
  };

  const renderRightActions = (
    progress: Animated.AnimatedAddition<number>,
    dragX: Animated.AnimatedAddition<number>
  ) => {
    const actions = getSwipeActions();

    if (actions.length === 0) return null;

    return (
      <View className="flex-row">
        {actions.map((actionItem, index) => {
          const trans = dragX.interpolate({
            inputRange: [-((index + 1) * 80), -(index * 80), 0],
            outputRange: [0, index * 80, (index + 1) * 80],
            extrapolate: "clamp",
          });

          const scale = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={actionItem.action}
              style={{
                transform: [{ translateX: trans }, { scale }],
                backgroundColor: actionItem.backgroundColor,
                width: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handleStatusChange(actionItem.newStatus)}
                className="w-full h-full items-center justify-center"
                activeOpacity={0.7}
              >
                <actionItem.icon size={24} color="white" weight="bold" />
                <Text className="text-white text-xs font-semibold mt-1">
                  {actionItem.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
      friction={2}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`flex-row items-center p-2 py-4 justify-between border ${className || ""}`}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <TextWithIcon
          icon="BuildingOffice"
          text={translatedJobData.company}
          className="text-[12px] w-[140px]"
          type="default"
        />

        <TextComponent
          text={translatedJobData.position}
          type="default"
          className="text-[12px]"
        />
        <TextComponent
          text={translatedJobData.salary}
          type="default"
          className="text-[12px]"
        />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default JobListItem;
