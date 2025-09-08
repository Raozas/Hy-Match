import { CalendarDots, Clock, Info, X } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

interface WeekDaysProps {
  onAir?: string;
  hours?: string;
  useHours?: "yes" | "no";
  editable?: "yes" | "no";
  onAirChange?: (newOnAir: string) => void;
  info?: string;
}

const WeekDays = ({
  onAir = "",
  hours,
  useHours = "yes",
  editable = "no",
  onAirChange,
  info,
}: WeekDaysProps) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [localOnAir, setLocalOnAir] = useState(onAir);
  const [infoVisible, setInfoVisible] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const onAirDays = localOnAir ? localOnAir.split("&") : [];
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

  const handleDayPress = (day: string) => {
    if (editable === "no") return;

    let newOnAirDays;
    if (onAirDays.includes(day)) {
      newOnAirDays = onAirDays.filter((d) => d !== day);
    } else {
      newOnAirDays = [...onAirDays, day];
    }

    const newOnAir = newOnAirDays.join("&");
    setLocalOnAir(newOnAir);
    onAirChange?.(newOnAir);
  };

  const handleInfoPress = () => {
    if (infoVisible && info) {
      // Show info modal instead of alert
      setIsInfoModalVisible(true);
    }
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalVisible(false);
    setInfoVisible(false);
    setTapCount(0);
  };

  const handleIconAreaPress = () => {
    if (!infoVisible && info) {
      // Info icon is hidden, count taps to bring it back
      const newTapCount = tapCount + 1;
      setTapCount(newTapCount);

      if (newTapCount >= 3) {
        setInfoVisible(true);
        setTapCount(0);
      }
    }
  };

  const renderDay = (day: string) => {
    const isOnAir = onAirDays.includes(day);
    const bgColor = isOnAir ? "bg-[#E99C4B]" : "bg-[#A5A7A4]";

    const dayContent = (
      <View
        className={`h-[32px] w-[32px] ${bgColor} rounded-full items-center justify-center p-0`}
      >
        <Text className="font-semibold text-[14px] mt-[-5px]">{day}</Text>
      </View>
    );

    if (editable === "yes") {
      return (
        <TouchableOpacity
          key={day}
          onPress={() => handleDayPress(day)}
          activeOpacity={0.7}
        >
          {dayContent}
        </TouchableOpacity>
      );
    }

    return <View key={day}>{dayContent}</View>;
  };

  return (
    <View className="flex-row items-center gap-4 w-full">
      <TouchableWithoutFeedback onPress={handleIconAreaPress}>
        <View className="h-[48px] w-[48px] rounded-full bg-[#EBDFCC] items-center justify-center p-0 relative">
          <CalendarDots size={32} color="#002775" weight="duotone" />
          {info && infoVisible && (
            <TouchableOpacity
              onPress={handleInfoPress}
              className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center"
            >
              <Info size={14} weight="bold" color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View className="flex-col items-center gap-2">
        <View className="flex-row items-center justify-between w-[248px]">
          {weekDays.map(renderDay)}
        </View>
        {useHours === "yes" && (
          <View className="flex-row items-center gap-2">
            <Clock size={15} color={colors.text} />
            <Text
              style={{ color: colors.text, fontSize: 14, fontWeight: "600" }}
            >
              {hours || "9:00 ~ 18:00"}
            </Text>
          </View>
        )}
      </View>

      {/* Info Modal */}
      <Modal
        visible={isInfoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseInfoModal}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View
            className="bg-white rounded-3xl p-6 w-full max-w-sm mx-4"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="h-[48px] w-[48px] rounded-full bg-[#EBDFCC] items-center justify-center">
                  <CalendarDots size={32} color="#002775" weight="duotone" />
                </View>

                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.text }}
                >
                  {t("field.schedule")}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleCloseInfoModal}
                className="p-2"
                activeOpacity={0.7}
              >
                <X size={24} color={colors.text} weight="bold" />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-60">
              <Text
                className="text-base leading-6"
                style={{ color: colors.textSecondary }}
              >
                {info}
              </Text>
            </ScrollView>

            <TouchableOpacity
              onPress={handleCloseInfoModal}
              className="mt-6 py-3 px-6 rounded-xl items-center"
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                {t("common.done")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WeekDays;
