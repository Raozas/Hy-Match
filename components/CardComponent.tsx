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

export interface JobData {
  id: string;
  company: string;
  position: string;
  salary: string;
  languageSkill: string;
  walkTime: string;
  station: string;
  stationCode: string;
  onAir: string;
  hours: string;
  rating: string;
  status: "pending" | "choosed" | "refusal";
}

interface CardComponentProps {
  jobData: JobData;
  className?: string;
}

const CardComponent = ({ jobData, className }: CardComponentProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      className={`flex-col gap-2 h-[590px] w-[360px] rounded-[33px] border-solid border-[1px] px-2.5 py-6  ${className || ""}`}
    >
      <TextWithIcon icon="BuildingOffice" text={jobData.company} />
      <Separator />
      <TextWithIcon icon="GraduationCap" text={jobData.position} />
      <Separator />
      <View className="flex-row items-center">
        <TextWithIcon
          icon="CurrencyJpy"
          text={jobData.salary}
          className="w-[174px]"
        />
        <HorizontalLine />
        <TextWithIcon
          icon="ChatsCircle"
          text={jobData.languageSkill}
          type="LanSkill"
          className="w-[164px] ml-2.5"
        />
      </View>
      <Separator />
      <View className="flex-row items-center">
        <TextWithIcon
          icon="HouseLine&Footprints"
          text={jobData.walkTime}
          className="w-[174px]"
        />
        <HorizontalLine />
        <TextWithIcon
          icon="Tram"
          text={jobData.station}
          className="w-[164px] ml-2.5"
          type="TrainSt"
          text2nd={jobData.stationCode}
        />
      </View>
      <Separator />
      <WeekDays
        onAir={jobData.onAir}
        hours={jobData.hours}
        useHours="yes"
        editable="no"
        onAirChange={(newOnAir) => console.log(newOnAir)}
      />
      <Separator />
      <TextWithIcon icon="Star" text={jobData.rating} className="w-[174px]" />
    </View>
  );
};

export default CardComponent;
