import React from "react";
import { View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import TextWithIcon from "../TextWithIcon";

interface ContactInfoSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  onPhoneNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  userProfile,
  isEditable,
  onPhoneNumberChange,
  onEmailChange,
}) => {
  const { t } = useLanguage();

  return (
    <View>
      <TextWithIcon
        icon="Numpad"
        text={userProfile?.phoneNumber || ""}
        className="w-[347px]"
        type="input"
        info={t("profile.info.phoneNumber")}
        onValueChange={onPhoneNumberChange}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="At"
        text={userProfile?.email || ""}
        className="w-[347px]"
        type="input"
        info={t("profile.info.email")}
        onValueChange={onEmailChange}
        editable={isEditable}
      />
      <Separator width={360} />
    </View>
  );
};
