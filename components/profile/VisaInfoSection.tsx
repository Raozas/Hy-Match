import React from "react";
import { View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import TextComponent from "../TextComponent";
import TextWithIcon from "../TextWithIcon";

interface VisaInfoSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  onVisaTypeChange: (value: string) => void;
  onVisaValidityPeriodChange: (value: string) => void;
  onResidenceStatusChange: (value: string) => void;
  onResidenceStatusChangeScheduleChange: (value: string) => void;
  onJapaneseLevelChange: (value: string) => void;
}

export const VisaInfoSection: React.FC<VisaInfoSectionProps> = ({
  userProfile,
  isEditable,
  onVisaTypeChange,
  onVisaValidityPeriodChange,
  onResidenceStatusChange,
  onResidenceStatusChangeScheduleChange,
  onJapaneseLevelChange,
}) => {
  const { t } = useLanguage();

  return (
    <View>
      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="Certificate"
          text={userProfile?.visaType || t("profile.visaType")}
          type="select"
          info={t("profile.info.visaType")}
          options={["Student", "Work", "Tourist", "Other"]}
          className="!w-[183px] !text-[12px]"
          onValueChange={onVisaTypeChange}
          editable={isEditable}
        />
        <TextComponent
          text={userProfile?.visaValidityPeriod || t("profile.validityPeriod")}
          type="input"
          className="!w-[153px] !text-[14px]"
          label={t("profile.validityPeriod")}
          onValueChange={onVisaValidityPeriodChange}
          editable={isEditable}
        />
      </View>
      <Separator width={360} />

      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="Newspaper"
          text={userProfile?.residenceStatus || t("profile.residenceStatus")}
          type="select"
          info={t("profile.info.residenceStatus")}
          options={["Student", "Work", "Tourist", "Other"]}
          className="!w-[183px] !text-[12px]"
          onValueChange={onResidenceStatusChange}
          editable={isEditable}
        />
        <TextComponent
          text={
            userProfile?.residenceStatusChangeSchedule ||
            t("profile.changeSchedule")
          }
          type="input"
          className="!w-[153px] !text-[14px]"
          label={t("profile.changeSchedule")}
          onValueChange={onResidenceStatusChangeScheduleChange}
          editable={isEditable}
        />
      </View>
      <Separator width={360} />

      <TextWithIcon
        icon="ChatsCircle"
        text={userProfile?.japaneseLevel || t("profile.japaneseLevel")}
        type="select"
        info={t("profile.info.japaneseLevel")}
        options={["N5", "N4", "N3", "N2", "N1"]}
        className="!w-[183px] !text-[12px]"
        onValueChange={onJapaneseLevelChange}
        editable={isEditable}
      />
      <Separator width={360} />
    </View>
  );
};
