import { CalendarDots, Clock } from "phosphor-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WeekDaysProps {
  onAir?: string;
  hours?: string;
  useHours?: "yes" | "no";
  editable?: "yes" | "no";
  onAirChange?: (newOnAir: string) => void;
}

const WeekDays = ({
  onAir = "",
  hours,
  useHours = "yes",
  editable = "no",
  onAirChange,
}: WeekDaysProps) => {
  const [localOnAir, setLocalOnAir] = useState(onAir);
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

  const renderDay = (day: string) => {
    const isOnAir = onAirDays.includes(day);
    const bgColor = isOnAir ? "bg-[#E9A6A6]" : "bg-[#C7C7C7]";

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
      <View className="h-[48px] w-[48px] rounded-full bg-[#DAE3FF] items-center justify-center p-0 relative">
        <CalendarDots size={32} color="#002775" weight="duotone" />
      </View>
      <View className="flex-col items-center gap-2">
        <View className="flex-row items-center justify-between w-[248px]">
          {weekDays.map(renderDay)}
        </View>
        {useHours === "yes" && (
          <View className="flex-row items-center gap-2">
            <Clock size={15} color="#002775" />
            <Text className="text-[#002775] text-[14px] font-semibold">
              {hours || "9:00 ~ 18:00"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WeekDays;
