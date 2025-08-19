import { ErrorBoundary } from "@/components/ErrorBoundary";
import HeaderComponent from "@/components/HeaderComponent";
import { AddressSection } from "@/components/profile/AddressSection";
import { ContactInfoSection } from "@/components/profile/ContactInfoSection";
import { PersonalInfoSection } from "@/components/profile/PersonalInfoSection";
import { ProfileActionButtons } from "@/components/profile/ProfileActionButtons";
import { TransportationSection } from "@/components/profile/TransportationSection";
import { VisaInfoSection } from "@/components/profile/VisaInfoSection";
import { WorkInfoSection } from "@/components/profile/WorkInfoSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocationData } from "@/hooks/profile/useLocationData";
import { usePDFGenerator } from "@/hooks/profile/usePDFGenerator";
import { useProfileData } from "@/hooks/profile/useProfileData";
import { useProfileHandlers } from "@/hooks/profile/useProfileHandlers";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { getAddressByPostalCode } from "../utils/postalCodeData";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const {
    userProfile,
    profileImage,
    profileVideo,
    isLoading,
    setProfileImage,
    setProfileVideo,
    updateProfile,
  } = useProfileData();

  const {
    handleNameChange,
    handleAgeChange,
    handleGenderChange,
    handleCountryChange,
    handlePrefectureChange,
    handleCity1Change,
    handleCity2Change,
    handlePostalCodeChange,
    handleStreetAddressChange,
    handlePhoneNumberChange,
    handleEmailChange,
    handleVisaTypeChange,
    handleVisaValidityPeriodChange,
    handleResidenceStatusChange,
    handleResidenceStatusChangeScheduleChange,
    handleJapaneseLevelChange,
    handleAvailableFromTimeChange,
    handleAvailableToTimeChange,
    handleCurrentOccupationChange,
    handleDesiredJobTypeChange,
    handleWorkHistoryChange,
    handleAvailableDaysChange,
    handleStationChange,
    handleTimeToStationFromHomeChange,
    handleSchoolStationChange,
    handleTimeToStationFromSchoolChange,
  } = useProfileHandlers({
    userProfile,
    profileImage,
    profileVideo,
    updateProfile,
  });

  const { prefectureOptions, cityOptions, updateLocationOptions } =
    useLocationData();
  const { generateProfilePDF } = usePDFGenerator();

  const [isEditable, setIsEditable] = useState<"yes" | "no">("no");
  const [saveButtonText, setSaveButtonText] = useState(t("profile.edit"));

  useEffect(() => {
    if (userProfile?.country && !isLoading) {
      updateLocationOptions(userProfile.country, userProfile.prefecture);
    }
  }, [
    userProfile?.country,
    userProfile?.prefecture,
    isLoading,
    updateLocationOptions,
  ]);

  const handleImageSelected = useCallback(
    async (imageUri: string) => {
      setProfileImage(imageUri);
      updateProfile({ profileImage: imageUri });
    },
    [setProfileImage, updateProfile]
  );

  const handleImageReset = useCallback(async () => {
    setProfileImage(null);
    updateProfile({ profileImage: undefined });
  }, [setProfileImage, updateProfile]);

  const handleVideoUpdate = useCallback(
    async (videoUri: string) => {
      setProfileVideo(videoUri);
      updateProfile({ profileVideo: videoUri });
    },
    [setProfileVideo, updateProfile]
  );

  const handleVideoReset = useCallback(async () => {
    setProfileVideo(null);
    updateProfile({ profileVideo: undefined });
  }, [setProfileVideo, updateProfile]);

  const handleAutoFillAddress = useCallback(async () => {
    if (!userProfile?.postalCode) {
      Alert.alert(t("alert.error"), "Please enter a postal code first");
      return;
    }

    const addressInfo = getAddressByPostalCode(userProfile.postalCode);
    if (!addressInfo) {
      Alert.alert(
        t("alert.error"),
        "Postal code not found. Supported cities: Tokyo, London, Moscow, Tashkent"
      );
      return;
    }

    updateProfile({
      country: addressInfo.country,
      prefecture: addressInfo.prefecture,
      city1: addressInfo.city1,
      city2: addressInfo.city2,
      streetAddress: addressInfo.streetAddress,
    });

    updateLocationOptions(addressInfo.country, addressInfo.prefecture);

    Alert.alert(
      t("alert.success"),
      `Address auto-filled for ${addressInfo.city1}, ${addressInfo.prefecture}, ${addressInfo.country}`
    );
  }, [userProfile?.postalCode, updateProfile, updateLocationOptions, t]);

  const handleSaveEdit = useCallback(async () => {
    if (isEditable === "no") {
      setIsEditable("yes");
      setSaveButtonText(t("profile.save"));
    } else {
      setIsEditable("no");
      setSaveButtonText(t("profile.edit"));
    }
  }, [isEditable, t]);

  const handleDownloadProfile = useCallback(async () => {
    if (userProfile) {
      await generateProfilePDF(userProfile, profileImage);
    }
  }, [userProfile, profileImage, generateProfilePDF]);

  return (
    <ErrorBoundary>
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className="flex-1"
      >
        <HeaderComponent
          leftButton="Info"
          onLeftPress={() => alert(t("alert.showUserInfo"))}
          rightButton="Close"
          title={t("header.profile")}
          onRightPress={() => router.back()}
        />
        <ScrollView
          className="flex-1 px-4 mt-[-25px] py-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <PersonalInfoSection
            userProfile={userProfile}
            isEditable={isEditable}
            onNameChange={handleNameChange}
            onAgeChange={handleAgeChange}
            onGenderChange={handleGenderChange}
            onCountryChange={handleCountryChange}
            profileImage={profileImage}
            profileVideo={profileVideo}
            onImageSelected={handleImageSelected}
            onImageReset={handleImageReset}
            onVideoSelected={handleVideoUpdate}
            onVideoReset={handleVideoReset}
          />

          <TransportationSection
            userProfile={userProfile}
            isEditable={isEditable}
            onStationChange={handleStationChange}
            onTimeToStationFromHomeChange={handleTimeToStationFromHomeChange}
            onSchoolStationChange={handleSchoolStationChange}
            onTimeToStationFromSchoolChange={
              handleTimeToStationFromSchoolChange
            }
          />

          <AddressSection
            userProfile={userProfile}
            isEditable={isEditable}
            prefectureOptions={prefectureOptions}
            cityOptions={cityOptions}
            onPostalCodeChange={handlePostalCodeChange}
            onPrefectureChange={handlePrefectureChange}
            onCity1Change={handleCity1Change}
            onCity2Change={handleCity2Change}
            onStreetAddressChange={handleStreetAddressChange}
            onAutoFill={handleAutoFillAddress}
          />

          <ContactInfoSection
            userProfile={userProfile}
            isEditable={isEditable}
            onPhoneNumberChange={handlePhoneNumberChange}
            onEmailChange={handleEmailChange}
          />

          <VisaInfoSection
            userProfile={userProfile}
            isEditable={isEditable}
            onVisaTypeChange={handleVisaTypeChange}
            onVisaValidityPeriodChange={handleVisaValidityPeriodChange}
            onResidenceStatusChange={handleResidenceStatusChange}
            onResidenceStatusChangeScheduleChange={
              handleResidenceStatusChangeScheduleChange
            }
            onJapaneseLevelChange={handleJapaneseLevelChange}
          />

          <WorkInfoSection
            userProfile={userProfile}
            isEditable={isEditable}
            onCurrentOccupationChange={handleCurrentOccupationChange}
            onDesiredJobTypeChange={handleDesiredJobTypeChange}
            onWorkHistoryChange={handleWorkHistoryChange}
            onAvailableDaysChange={handleAvailableDaysChange}
            onAvailableFromTimeChange={handleAvailableFromTimeChange}
            onAvailableToTimeChange={handleAvailableToTimeChange}
          />

          <ProfileActionButtons
            saveButtonText={saveButtonText}
            onSaveEdit={handleSaveEdit}
            onDownloadProfile={handleDownloadProfile}
          />
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}
