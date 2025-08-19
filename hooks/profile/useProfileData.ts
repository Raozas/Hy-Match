import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "../../utils/database";

export const useProfileData = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileVideo, setProfileVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
        setProfileImage(profile.profileImage || null);
        setProfileVideo(profile.profileVideo || null);
      } else {
        const defaultProfile: UserProfile = {
          name: "",
          age: "",
          country: "",
        };
        setUserProfile(defaultProfile);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      setUserProfile({
        name: "",
        age: "",
        country: "",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToStorage = useCallback(async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
    } catch (error) {
      console.error("Error saving profile to storage:", error);
    }
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<UserProfile>) => {
      setUserProfile((prevProfile) => {
        const updatedProfile: UserProfile = {
          ...prevProfile,
          name: prevProfile?.name || "",
          ...updates,
        };
        saveToStorage(updatedProfile);
        return updatedProfile;
      });
    },
    [saveToStorage]
  );

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  return {
    userProfile,
    profileImage,
    profileVideo,
    isLoading,
    setProfileImage,
    setProfileVideo,
    updateProfile,
    saveToStorage,
  };
};
