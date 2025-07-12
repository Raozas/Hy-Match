import React from "react";
import { View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import TextWithIcon from "./TextWithIcon";
import WeekDays from "./WeekDays";

export const Separator = ({ width = 332 }: { width?: number }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
        width,
      }}
    />
  );
};

export const HorizontalLine = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 78,
        width: 1,
        backgroundColor: colors.border,
        marginVertical: -15,
      }}
    />
  );
};

interface CardComponentProps {
  className?: string;
}

const CardComponent = ({ className }: CardComponentProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      className={`flex-col gap-2 h-[590px] w-[360px] rounded-[33px] border-solid border-[1px] px-2.5 py-6  ${className || ""}`}
    >
      <TextWithIcon icon="BuildingOffice" text="株式会社" />
      <Separator />
      <TextWithIcon icon="GraduationCap" text="仕分け" />
      <Separator />
      <View className="flex-row items-center">
        <TextWithIcon
          icon="CurrencyJpy"
          text="¥1,000 ~ 1,500"
          className="w-[174px]"
        />
        <HorizontalLine />
        <TextWithIcon
          icon="ChatsCircle"
          text="N2"
          type="LanSkill"
          className="w-[164px] ml-2.5"
        />
      </View>
      <Separator />
      <View className="flex-row items-center">
        <TextWithIcon
          icon="HouseLine&Footprints"
          text="~15分"
          className="w-[174px]"
        />
        <HorizontalLine />
        <TextWithIcon
          icon="Tram"
          text="渋谷駅"
          className="w-[164px] ml-2.5"
          type="TrainSt"
          text2nd="JA12"
        />
      </View>
      <Separator />
      <WeekDays
        onAir="月&火&水&木"
        hours="9:00~17:00"
        useHours="yes"
        editable="no"
        onAirChange={(newOnAir) => console.log(newOnAir)}
      />
      <Separator />
      <TextWithIcon icon="Star" text="" className="w-[174px]" />
    </View>
  );
};

export default CardComponent;
