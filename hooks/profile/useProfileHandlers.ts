import { useCallback } from "react";
import { UserProfile } from "../../utils/database";

interface UseProfileHandlersProps {
  userProfile: UserProfile | null;
  profileImage: string | null;
  profileVideo: string | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useProfileHandlers = ({
  userProfile,
  profileImage,
  profileVideo,
  updateProfile,
}: UseProfileHandlersProps) => {
  const createUpdateHandler = useCallback(
    (fieldName: keyof UserProfile) => {
      return async (newValue: string) => {
        const updates: Partial<UserProfile> = {
          [fieldName]: newValue,
          profileImage: profileImage || undefined,
          profileVideo: profileVideo || undefined,
        };
        updateProfile(updates);
      };
    },
    [profileImage, profileVideo, updateProfile]
  );

  const handleGenderChange = useCallback(
    async (newGender: string) => {
      const genderMap: Record<string, string> = {
        radio_0: "Male",
        radio_1: "Female",
        radio_2: "Other",
      };
      const genderValue = genderMap[newGender] || newGender;
      updateProfile({ gender: genderValue });
    },
    [updateProfile]
  );

  const handleCountryChange = useCallback(
    async (newCountry: string) => {
      updateProfile({
        country: newCountry,
        prefecture: undefined,
        city1: undefined,
        city2: undefined,
      });
    },
    [updateProfile]
  );

  const handlePrefectureChange = useCallback(
    async (newPrefecture: string) => {
      updateProfile({
        prefecture: newPrefecture,
        city1: undefined,
        city2: undefined,
      });
    },
    [updateProfile]
  );

  return {
    handleNameChange: createUpdateHandler("name"),
    handleAgeChange: createUpdateHandler("age"),
    handleGenderChange,
    handleCountryChange,
    handlePrefectureChange,
    handleCity1Change: createUpdateHandler("city1"),
    handleCity2Change: createUpdateHandler("city2"),
    handlePostalCodeChange: createUpdateHandler("postalCode"),
    handleStreetAddressChange: createUpdateHandler("streetAddress"),
    handlePhoneNumberChange: createUpdateHandler("phoneNumber"),
    handleEmailChange: createUpdateHandler("email"),
    handleVisaTypeChange: createUpdateHandler("visaType"),
    handleVisaValidityPeriodChange: createUpdateHandler("visaValidityPeriod"),
    handleResidenceStatusChange: createUpdateHandler("residenceStatus"),
    handleResidenceStatusChangeScheduleChange: createUpdateHandler(
      "residenceStatusChangeSchedule"
    ),
    handleJapaneseLevelChange: createUpdateHandler("japaneseLevel"),
    handleAvailableFromTimeChange: createUpdateHandler("availableFromTime"),
    handleAvailableToTimeChange: createUpdateHandler("availableToTime"),
    handleCurrentOccupationChange: createUpdateHandler("currentOccupation"),
    handleDesiredJobTypeChange: createUpdateHandler("desiredJobType"),
    handleWorkHistoryChange: createUpdateHandler("workHistory"),
    handleAvailableDaysChange: createUpdateHandler("availableDays"),
    handlePreferredWorkStyleChange: createUpdateHandler("preferredWorkStyle"),
    handleStationChange: createUpdateHandler("homeStation"),
    handleTimeToStationFromHomeChange: createUpdateHandler(
      "timeToStationFromHome"
    ),
    handleSchoolStationChange: createUpdateHandler("schoolStation"),
    handleTimeToStationFromSchoolChange: createUpdateHandler(
      "timeToStationFromSchool"
    ),
  };
};
