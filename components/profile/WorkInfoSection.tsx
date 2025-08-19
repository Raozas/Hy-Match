import React from "react";
import { View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import TextComponent from "../TextComponent";
import TextWithIcon from "../TextWithIcon";
import WeekDays from "../WeekDays";

interface WorkInfoSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  onCurrentOccupationChange: (value: string) => void;
  onDesiredJobTypeChange: (value: string) => void;
  onWorkHistoryChange: (value: string) => void;
  onAvailableDaysChange: (value: string) => void;
  onAvailableFromTimeChange: (value: string) => void;
  onAvailableToTimeChange: (value: string) => void;
}

export const WorkInfoSection: React.FC<WorkInfoSectionProps> = ({
  userProfile,
  isEditable,
  onCurrentOccupationChange,
  onDesiredJobTypeChange,
  onWorkHistoryChange,
  onAvailableDaysChange,
  onAvailableFromTimeChange,
  onAvailableToTimeChange,
}) => {
  const { t } = useLanguage();

  const timeOptions = [
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const extendedTimeOptions = [...timeOptions, "21:00", "22:00", "23:00"];

  return (
    <View>
      <WeekDays
        onAir={userProfile?.availableDays || ""}
        useHours="no"
        editable={isEditable}
        onAirChange={onAvailableDaysChange}
        info={t("profile.info.availableDays")}
      />
      <Separator width={360} />

      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="Clock"
          text={
            userProfile?.availableFromTime || t("profile.availableFromTime")
          }
          type="select"
          info={t("profile.info.availableFromTime")}
          options={timeOptions}
          className="!w-[193px] !text-[16px]"
          onValueChange={onAvailableFromTimeChange}
          editable={isEditable}
        />
        <TextComponent
          text={userProfile?.availableToTime || t("profile.availableToTime")}
          type="select"
          className="!w-[143px] !text-[12px]"
          options={extendedTimeOptions}
          onValueChange={onAvailableToTimeChange}
          editable={isEditable}
        />
      </View>
      <Separator width={360} />

      <TextWithIcon
        icon="Briefcase"
        text={userProfile?.currentOccupation || ""}
        type="input"
        info={t("profile.info.currentOccupation")}
        className="!w-[347px] !text-[16px]"
        onValueChange={onCurrentOccupationChange}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="Bank"
        text={userProfile?.desiredJobType || ""}
        type="input"
        info={t("profile.info.desiredJobType")}
        className="!w-[347px] !text-[16px]"
        onValueChange={onDesiredJobTypeChange}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="Table"
        text={userProfile?.workHistory || ""}
        type="input"
        info={t("profile.info.workHistory")}
        className="!w-[347px] !text-[16px]"
        onValueChange={onWorkHistoryChange}
        editable={isEditable}
      />
      <Separator width={360} />
    </View>
  );
};
