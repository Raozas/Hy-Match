import React from "react";
import { View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import TextWithIcon from "../TextWithIcon";

interface TransportationSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  onStationChange: (value: string) => void;
  onTimeToStationFromHomeChange: (value: string) => void;
  onSchoolStationChange: (value: string) => void;
  onTimeToStationFromSchoolChange: (value: string) => void;
}

export const TransportationSection: React.FC<TransportationSectionProps> = ({
  userProfile,
  isEditable,
  onStationChange,
  onTimeToStationFromHomeChange,
  onSchoolStationChange,
  onTimeToStationFromSchoolChange,
}) => {
  const { t } = useLanguage();

  const stationOptions = [
    "Shinjuku",
    "Shibuya",
    "Ikebukuro",
    "Tokyo",
    "Yokohama",
  ];
  const timeOptions = ["5", "10", "15", "20", "25", "30"];

  return (
    <View>
      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="HouseLine&Footprints"
          text={userProfile?.homeStation || t("profile.homeStation")}
          type="select"
          info={t("profile.info.homeStation")}
          options={stationOptions}
          className="!w-[183px] !text-[12px]"
          onValueChange={onStationChange}
          editable={isEditable}
        />
        <TextWithIcon
          icon="Footprints"
          text={userProfile?.timeToStationFromHome || "~"}
          type="select"
          info={t("profile.info.timeToHome")}
          options={timeOptions}
          className="!w-[153px] !text-[14px]"
          editable={isEditable}
          onValueChange={onTimeToStationFromHomeChange}
        />
      </View>
      <Separator width={360} />

      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="Buildings&Footprints"
          text={userProfile?.schoolStation || t("profile.schoolStation")}
          type="select"
          info={t("profile.info.schoolStation")}
          options={stationOptions}
          className="!w-[183px] !text-[12px]"
          onValueChange={onSchoolStationChange}
          editable={isEditable}
        />
        <TextWithIcon
          icon="Footprints"
          text={userProfile?.timeToStationFromSchool || "~"}
          type="select"
          info={t("profile.info.timeToSchool")}
          options={timeOptions}
          className="!w-[153px] !text-[14px]"
          onValueChange={onTimeToStationFromSchoolChange}
          editable={isEditable}
        />
      </View>
      <Separator width={360} />
    </View>
  );
};
