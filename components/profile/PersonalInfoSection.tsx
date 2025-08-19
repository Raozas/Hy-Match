import React from "react";
import { View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { Separator } from "../CardComponent";
import ImagePickerComponent from "../ImagePickerComponent";
import TextWithIcon from "../TextWithIcon";
import VideoPickerComponent from "../VideoPickerComponent";

interface PersonalInfoSectionProps {
  userProfile: any;
  isEditable: "yes" | "no";
  onNameChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  profileImage: string | null;
  profileVideo: string | null;
  onImageSelected: (imageUri: string) => void;
  onImageReset: () => void;
  onVideoSelected: (videoUri: string) => void;
  onVideoReset: () => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  userProfile,
  isEditable,
  onNameChange,
  onAgeChange,
  onGenderChange,
  onCountryChange,
  profileImage,
  profileVideo,
  onImageSelected,
  onImageReset,
  onVideoSelected,
  onVideoReset,
}) => {
  const { t } = useLanguage();

  return (
    <View>
      <View className="flex-row gap-[11px]">
        <TextWithIcon
          icon="IdentificationCard"
          text={userProfile?.name || ""}
          type="input"
          className="w-[240px]"
          onValueChange={onNameChange}
          info={t("profile.info.name")}
          editable={isEditable}
        />
        <ImagePickerComponent
          currentImage={profileImage}
          onImageSelected={onImageSelected}
          onImageReset={onImageReset}
        />
        <VideoPickerComponent
          currentVideo={profileVideo}
          onVideoSelected={onVideoSelected}
          onVideoReset={onVideoReset}
        />
      </View>
      <Separator width={360} />

      <TextWithIcon
        icon="Cake"
        text={userProfile?.age || "Select age"}
        type="select"
        info={t("profile.info.age")}
        options={Array.from({ length: 15 }, (_, i) => (16 + i).toString())}
        className="w-[150px]"
        onValueChange={onAgeChange}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        icon="GlobeHemisphereEast"
        text={userProfile?.country || "Select country"}
        type="selectCountry"
        className="w-[240px]"
        onValueChange={onCountryChange}
        info={t("profile.info.country")}
        editable={isEditable}
      />
      <Separator width={360} />

      <TextWithIcon
        text="Gender Selection"
        icon="GenderMale&GenderFemale"
        type="radio"
        radioNum="3"
        radioLabel={`*icon*GenderMale|*icon*GenderFemale|*text*${t("profile.other")}`}
        radioColor="same&#FF6B6B&#4ECDC4"
        editable={isEditable}
        onValueChange={onGenderChange}
        info={t("profile.info.gender")}
        currentValue={userProfile?.gender}
      />
      <Separator width={360} />
    </View>
  );
};
