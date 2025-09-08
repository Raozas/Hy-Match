import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import TextWithIcon from "../TextWithIcon";

interface AddressSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  prefectureOptions: string[];
  cityOptions: string[];
  onPostalCodeChange: (value: string) => void;
  onPrefectureChange: (value: string) => void;
  onCity1Change: (value: string) => void;
  onCity2Change: (value: string) => void;
  onStreetAddressChange: (value: string) => void;
  onAutoFill: () => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  userProfile,
  isEditable,
  prefectureOptions,
  cityOptions,
  onPostalCodeChange,
  onPrefectureChange,
  onCity1Change,
  onCity2Change,
  onStreetAddressChange,
  onAutoFill,
}) => {
  const { t } = useLanguage();

  return (
    <View>
      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="CurrencyKzt"
          text={userProfile?.postalCode || ""}
          type="input"
          className="w-[174px]"
          info={t("profile.info.postalCode")}
          onValueChange={onPostalCodeChange}
          editable={isEditable}
        />
        <TouchableOpacity
          onPress={onAutoFill}
          className="h-[50px] bg-[#E8F4FD] border border-[#4A9EFF] rounded-lg flex justify-center items-center px-3"
          disabled={isEditable === "no"}
        >
          <Text className="text-[#4A9EFF] font-medium text-[12px] text-center">
            {t("profile.autoFillAddress")}
          </Text>
        </TouchableOpacity>
      </View>
      <Separator width={360} />

      <TextWithIcon
        icon="MapPinArea"
        text={userProfile?.prefecture || t("profile.selectPrefecture")}
        className="w-[347px]"
        type="select"
        info={t("profile.info.prefecture")}
        options={
          prefectureOptions.length > 0
            ? prefectureOptions
            : ["Select a country first"]
        }
        onValueChange={onPrefectureChange}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="MapTrifold"
        text={userProfile?.city1 || t("profile.selectCity1")}
        className="w-[347px]"
        info={t("profile.info.city")}
        type="select"
        options={
          cityOptions.length > 0
            ? cityOptions
            : ["Select a country/prefecture first"]
        }
        onValueChange={onCity1Change}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="MapTrifold"
        text={userProfile?.city2 || t("profile.selectCity2")}
        info={t("profile.info.city")}
        className="w-[347px]"
        type="select"
        options={
          cityOptions.length > 0
            ? cityOptions
            : ["Select a country/prefecture first"]
        }
        onValueChange={onCity2Change}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="BuildingApartment"
        text={userProfile?.streetAddress || ""}
        className="w-[347px]"
        type="input"
        info={t("profile.info.streetAddress")}
        onValueChange={onStreetAddressChange}
        editable={isEditable}
      />
      <Separator width={360} />
    </View>
  );
};
