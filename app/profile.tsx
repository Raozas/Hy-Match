import { Separator } from "@/components/CardComponent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import HeaderComponent from "@/components/HeaderComponent";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import TextComponent from "@/components/TextComponent";
import TextWithIcon from "@/components/TextWithIcon";
import VideoPickerComponent from "@/components/VideoPickerComponent";
import WeekDays from "@/components/WeekDays";
import { useTheme } from "@/contexts/ThemeContext";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { DownloadSimple } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { databaseService, UserProfile } from "../utils/database";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileVideo, setProfileVideo] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<"yes" | "no">("no");
  const [saveButtonText, setSaveButtonText] = useState("編集");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);

  // Dynamic location options
  const [prefectureOptions, setPrefectureOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  // Debounce timer ref
  const saveTimeoutRef = React.useRef<number | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      // Add a small delay to ensure database is ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      const profile = await databaseService.getUserProfile();
      if (profile) {
        setUserProfile(profile);
        setProfileImage(profile.profileImage || null);
        setProfileVideo(profile.profileVideo || null);
        // Only update location options on initial load
        updateLocationOptions(profile.country, profile.prefecture);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Create a minimal default profile if database fails
      setUserProfile({
        name: "Default User",
        age: "20",
        country: "Japan",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced save function to avoid interrupting user input
  const debouncedSave = React.useCallback((updatedProfile: UserProfile) => {
    setPendingChanges(true);

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for saving (500ms delay)
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await databaseService.saveUserProfile(updatedProfile);
        setPendingChanges(false);
        console.log("Profile saved successfully");
      } catch (error) {
        console.error("Error saving profile:", error);
        setPendingChanges(false);
      }
    }, 10000);
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleNameChange = async (newName: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: newName,
      age: userProfile?.age,
      country: userProfile?.country,
      homeStation: userProfile?.homeStation,
      timeToStationFromHome: userProfile?.timeToStationFromHome,
      schoolStation: userProfile?.schoolStation,
      timeToStationFromSchool: userProfile?.timeToStationFromSchool,
      postalCode: userProfile?.postalCode,
      prefecture: userProfile?.prefecture,
      city1: userProfile?.city1,
      city2: userProfile?.city2,
      streetAddress: userProfile?.streetAddress,
      phoneNumber: userProfile?.phoneNumber,
      email: userProfile?.email,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    // Update state immediately for responsive UI
    setUserProfile(updatedProfile);
    // Save to database with debounce
    debouncedSave(updatedProfile);
  };

  const handleAgeChange = async (newAge: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      age: newAge,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleGenderChange = async (newGender: string) => {
    const genderMap: Record<string, string> = {
      radio_0: "Male",
      radio_1: "Female",
      radio_2: "Other",
    };

    const genderValue = genderMap[newGender] || newGender;

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      age: userProfile?.age,
      country: userProfile?.country,
      gender: genderValue,
      homeStation: userProfile?.homeStation,
      timeToStationFromHome: userProfile?.timeToStationFromHome,
      schoolStation: userProfile?.schoolStation,
      timeToStationFromSchool: userProfile?.timeToStationFromSchool,
      postalCode: userProfile?.postalCode,
      prefecture: userProfile?.prefecture,
      city1: userProfile?.city1,
      city2: userProfile?.city2,
      streetAddress: userProfile?.streetAddress,
      phoneNumber: userProfile?.phoneNumber,
      email: userProfile?.email,
      visaType: userProfile?.visaType,
      visaValidityPeriod: userProfile?.visaValidityPeriod,
      residenceStatus: userProfile?.residenceStatus,
      residenceStatusChangeSchedule: userProfile?.residenceStatusChangeSchedule,
      japaneseLevel: userProfile?.japaneseLevel,
      availableFromTime: userProfile?.availableFromTime,
      availableToTime: userProfile?.availableToTime,
      currentOccupation: userProfile?.currentOccupation,
      desiredJobType: userProfile?.desiredJobType,
      workHistory: userProfile?.workHistory,
      availableDays: userProfile?.availableDays,
      preferredWorkStyle: userProfile?.preferredWorkStyle,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
    console.log("Gender updated:", genderValue);
  };

  const handleCountryChange = async (newCountry: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      country: newCountry,
      prefecture: undefined, // Reset prefecture when country changes
      city1: undefined, // Reset cities when country changes
      city2: undefined,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);

    // Update location options for new country immediately for better UX
    updateLocationOptions(newCountry);
  };

  const handleStationChange = async (newStation: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      homeStation: newStation,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleTimeToStationFromHomeChange = async (newTime: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      timeToStationFromHome: newTime,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleSchoolStationChange = async (newStation: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      schoolStation: newStation,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleTimeToStationFromSchoolChange = async (newTime: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      timeToStationFromSchool: newTime,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleImageSelected = async (imageUri: string) => {
    setProfileImage(imageUri);

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      profileImage: imageUri,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleImageReset = async () => {
    setProfileImage(null);

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      profileImage: undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleVideoUpdate = async (videoUri: string) => {
    setProfileVideo(videoUri);

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      profileImage: profileImage || undefined,
      profileVideo: videoUri,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleVideoReset = async () => {
    setProfileVideo(null);

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      profileImage: profileImage || undefined,
      profileVideo: undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handlePostalCodeChange = async (newPostalCode: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      postalCode: newPostalCode,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handlePrefectureChange = async (newPrefecture: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      prefecture: newPrefecture,
      city1: undefined, // Reset cities when prefecture changes
      city2: undefined,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);

    // Update city options for new prefecture immediately
    if (userProfile?.country) {
      updateLocationOptions(userProfile.country, newPrefecture);
    }
  };

  const handleCity1Change = async (newCity1: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      city1: newCity1,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleCity2Change = async (newCity2: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      city2: newCity2,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleStreetAddressChange = async (newStreetAddress: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      streetAddress: newStreetAddress,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handlePhoneNumberChange = async (newPhoneNumber: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      phoneNumber: newPhoneNumber,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleEmailChange = async (newEmail: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      email: newEmail,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleVisaTypeChange = async (newVisaType: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      visaType: newVisaType,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleVisaValidityPeriodChange = async (newPeriod: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      visaValidityPeriod: newPeriod,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleResidenceStatusChange = async (newStatus: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      residenceStatus: newStatus,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleResidenceStatusChangeScheduleChange = async (
    newSchedule: string
  ) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      residenceStatusChangeSchedule: newSchedule,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleJapaneseLevelChange = async (newLevel: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      japaneseLevel: newLevel,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleAvailableFromTimeChange = async (newTime: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      availableFromTime: newTime,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleAvailableToTimeChange = async (newTime: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      availableToTime: newTime,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleCurrentOccupationChange = async (newOccupation: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      currentOccupation: newOccupation,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleDesiredJobTypeChange = async (newJobType: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      desiredJobType: newJobType,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleWorkHistoryChange = async (newHistory: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      workHistory: newHistory,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handleAvailableDaysChange = async (newDays: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      availableDays: newDays,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const handlePreferredWorkStyleChange = async (newWorkStyle: string) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: userProfile?.name || "Default Name",
      preferredWorkStyle: newWorkStyle,
      profileImage: profileImage || undefined,
      profileVideo: profileVideo || undefined,
    };

    setUserProfile(updatedProfile);
    debouncedSave(updatedProfile);
  };

  const updateLocationOptions = (countryCode?: string, prefecture?: string) => {
    if (!countryCode) {
      setPrefectureOptions([]);
      setCityOptions([]);
      return;
    }

    // Get country code from country name mapping
    const countryCodeMap: Record<string, string> = {
      Japan: "JP",
      Uzbekistan: "UZ",
      Russia: "RU",
      "United Kingdom": "GB",
      Spain: "ES",
      Germany: "DE",
    };

    const code = countryCodeMap[countryCode] || countryCode;

    //prefecture options
    const prefectures = databaseService.getPrefecturesByCountry(code);
    setPrefectureOptions(prefectures.map((p) => p.name));

    // city options
    if (prefecture) {
      const cities = databaseService.getCitiesByPrefecture(prefecture, code);
      setCityOptions(cities.map((c) => c.name));
    } else {
      const allCities = databaseService.getCitiesByCountry(code);
      setCityOptions(allCities.map((c) => c.name));
    }
  };

  // Only update location options when country or prefecture changes, and not during initial load
  useEffect(() => {
    if (userProfile?.country && !isLoading) {
      updateLocationOptions(userProfile.country, userProfile.prefecture);
    }
  }, [userProfile?.country, userProfile?.prefecture, isLoading]);

  const handleSaveEdit = async () => {
    if (isEditable === "no") {
      // Enable editing
      setIsEditable("yes");
      setSaveButtonText("保存");
    } else {
      // Force save any pending changes immediately
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }

      if (userProfile && pendingChanges) {
        try {
          await databaseService.saveUserProfile(userProfile);
          setPendingChanges(false);
          console.log("Profile saved successfully");
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      }

      setIsEditable("no");
      setSaveButtonText("編集");
    }
  };

  const handleDownloadProfile = async () => {
    try {
      if (!userProfile) {
        Alert.alert("Error", "No profile data to export");
        return;
      }

      // Convert profile image to base64 if exists
      let imageBase64 = "";
      if (profileImage) {
        try {
          console.log("Profile image URI:", profileImage);
          // Check if the image is a local file URI
          if (profileImage.startsWith("file://")) {
            console.log("Converting local file to base64...");
            const base64 = await FileSystem.readAsStringAsync(profileImage, {
              encoding: FileSystem.EncodingType.Base64,
            });
            // Determine the image type (assuming jpg/jpeg for now, but you might want to detect this)
            const imageType = profileImage.toLowerCase().includes(".png")
              ? "png"
              : "jpeg";
            imageBase64 = `data:image/${imageType};base64,${base64}`;
            console.log(
              "Base64 conversion successful, length:",
              imageBase64.length
            );
          } else if (profileImage.startsWith("data:")) {
            // Already a base64 data URL
            imageBase64 = profileImage;
            console.log("Image already in base64 format");
          } else {
            // For other URIs, try to fetch and convert
            console.warn(
              "Image URI type not supported for PDF generation:",
              profileImage
            );
          }
        } catch (error) {
          console.warn("Could not convert image to base64:", error);
        }
      } else {
        console.log("No profile image to include in PDF");
      }

      // Generate HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Profile - ${userProfile.name || "User"}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 20px;
              color: #333;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #48A6AC;
              padding-bottom: 20px;
            }
            .profile-image {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: cover;
              margin: 0 auto 15px;
              display: block;
              border: 3px solid #48A6AC;
            }
            .name {
              font-size: 28px;
              font-weight: bold;
              color: #48A6AC;
              margin: 0;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background: white;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .table th {
              background: #48A6AC;
              color: white;
              padding: 12px;
              text-align: left;
              font-weight: bold;
              border: 1px solid #ddd;
            }
            .table td {
              padding: 12px;
              border: 1px solid #ddd;
              vertical-align: top;
            }
            .table tr:nth-child(even) {
              background: #f9f9f9;
            }
            .section {
              margin: 30px 0;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #48A6AC;
              margin-bottom: 15px;
              border-bottom: 1px solid #48A6AC;
              padding-bottom: 5px;
            }
            .flag {
              font-size: 18px;
              margin-right: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            ${imageBase64 ? `<img src="${imageBase64}" class="profile-image" alt="Profile Photo" />` : `<div class="profile-image" style="background: #DAE3FF; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #002775;">📷</div>`}
            <h1 class="name">${userProfile.name || "User Profile"}</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h2 class="section-title">Personal Information</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Name</strong></td>
                <td>${userProfile.name || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Age</strong></td>
                <td>${userProfile.age || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Gender</strong></td>
                <td>${userProfile.gender || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>${userProfile.country || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Phone Number</strong></td>
                <td>${userProfile.phoneNumber || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>${userProfile.email || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Address Information</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Postal Code</strong></td>
                <td>${userProfile.postalCode || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Prefecture</strong></td>
                <td>${userProfile.prefecture || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>City 1</strong></td>
                <td>${userProfile.city1 || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>City 2</strong></td>
                <td>${userProfile.city2 || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Street Address</strong></td>
                <td>${userProfile.streetAddress || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Transportation</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Home Station</strong></td>
                <td>${userProfile.homeStation || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Time to Home Station</strong></td>
                <td>${userProfile.timeToStationFromHome || "Not specified"} minutes</td>
              </tr>
              <tr>
                <td><strong>School Station</strong></td>
                <td>${userProfile.schoolStation || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Time to School Station</strong></td>
                <td>${userProfile.timeToStationFromSchool || "Not specified"} minutes</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Visa & Status Information</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Visa Type</strong></td>
                <td>${userProfile.visaType || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Visa Validity Period</strong></td>
                <td>${userProfile.visaValidityPeriod || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Residence Status</strong></td>
                <td>${userProfile.residenceStatus || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Status Change Schedule</strong></td>
                <td>${userProfile.residenceStatusChangeSchedule || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Japanese Level</strong></td>
                <td>${userProfile.japaneseLevel || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Availability</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Available Days</strong></td>
                <td>${userProfile.availableDays ? userProfile.availableDays.split("&").join(", ") : "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Available From</strong></td>
                <td>${userProfile.availableFromTime || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Available To</strong></td>
                <td>${userProfile.availableToTime || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">Work Information</h2>
            <table class="table">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td><strong>Current Occupation</strong></td>
                <td>${userProfile.currentOccupation || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Desired Job Type</strong></td>
                <td>${userProfile.desiredJobType || "Not specified"}</td>
              </tr>
              <tr>
                <td><strong>Work History</strong></td>
                <td>${userProfile.workHistory || "Not specified"}</td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `;

      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Share or save the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Profile PDF",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("Success", `PDF saved to: ${uri}`);
      }

      console.log("PDF generated successfully:", uri);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    }
  };

  return (
    <ErrorBoundary>
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className="flex-1"
      >
        <HeaderComponent
          leftButton="Info"
          onLeftPress={() => alert("Show user info")}
          rightButton="Close"
          title="Profile"
          onRightPress={() => console.log("Close profile")}
        />
        <ScrollView
          className="flex-1 px-4 mt-[-25px] py-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="IdentificationCard"
              text={userProfile?.name || "Enter your name"}
              type="input"
              className="w-[240px]"
              onValueChange={handleNameChange}
              info="Enter your full name as it appears on official documents."
              editable={isEditable}
            />
            <ImagePickerComponent
              currentImage={profileImage}
              onImageSelected={handleImageSelected}
              onImageReset={handleImageReset}
            />
            <VideoPickerComponent
              currentVideo={profileVideo}
              onVideoSelected={handleVideoUpdate}
              onVideoReset={handleVideoReset}
            />
          </View>
          <Separator width={360} />
          <TextWithIcon
            icon="Cake"
            text={userProfile?.age || "年齢"}
            type="select"
            info="Choose your age from the list below."
            options={[
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
            ]}
            className="w-[150px]"
            onValueChange={handleAgeChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="GlobeHemisphereEast"
            text={userProfile?.country || "Select your country"}
            type="selectCountry"
            className="w-[240px]"
            onValueChange={handleCountryChange}
            info="Choose your country of residence. This helps us provide location-specific information."
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            text="Gender Selection"
            icon="GenderMale&GenderFemale"
            type="radio"
            radioNum="3"
            radioLabel="*icon*GenderMale|*icon*GenderFemale|*text*その他"
            radioColor="same&#FF6B6B&#4ECDC4"
            editable={isEditable}
            onValueChange={handleGenderChange}
            info="Select your gender"
            currentValue={userProfile?.gender}
          />
          <Separator width={360} />
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="HouseLine&Footprints"
              text={userProfile?.homeStation || "自宅最寄り駅"}
              type="select"
              info="Choose your home station from the list below."
              options={[
                "Shinjuku",
                "Shibuya",
                "Ikebukuro",
                "Tokyo",
                "Yokohama",
              ]}
              className="!w-[183px] !text-[12px]"
              onValueChange={handleStationChange}
              editable={isEditable}
            />
            <TextWithIcon
              icon="Footprints"
              text={userProfile?.timeToStationFromHome || "~"}
              type="select"
              info="Choose the number of minutes to your home station."
              options={["5", "10", "15", "20", "25", "30"]}
              className="!w-[153px] !text-[14px]"
              editable={isEditable}
              onValueChange={handleTimeToStationFromHomeChange}
            />
          </View>
          <Separator width={360} />
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="Buildings&Footprints"
              text={userProfile?.schoolStation || "学校最寄り駅"}
              type="select"
              info="Choose your school station from the list below."
              options={[
                "Shinjuku",
                "Shibuya",
                "Ikebukuro",
                "Tokyo",
                "Yokohama",
              ]}
              className="!w-[183px] !text-[12px]"
              onValueChange={handleSchoolStationChange}
              editable={isEditable}
            />
            <TextWithIcon
              icon="Footprints"
              text={userProfile?.timeToStationFromSchool || "~"}
              type="select"
              info="Choose the number of minutes to your school station."
              options={["5", "10", "15", "20", "25", "30"]}
              className="!w-[153px] !text-[14px]"
              onValueChange={handleTimeToStationFromSchoolChange}
              editable={isEditable}
            />
          </View>
          <Separator width={360} />
          <TextWithIcon
            icon="CurrencyKzt"
            text={userProfile?.postalCode || "郵便番号"}
            type="input"
            className="w-[174px]"
            info="Enter your postal code. This helps us provide location-specific information."
            onValueChange={handlePostalCodeChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="MapPinArea"
            text={userProfile?.prefecture || "都道府県を選んでください"}
            className="w-[347px]"
            type="select"
            info="Choose your prefecture from the list below."
            options={
              prefectureOptions.length > 0
                ? prefectureOptions
                : ["Select a country first"]
            }
            onValueChange={handlePrefectureChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="MapTrifold"
            text={userProfile?.city1 || "市区町村1を選んでください"}
            className="w-[347px]"
            info="Select your city or town from the list below."
            type="select"
            options={
              cityOptions.length > 0
                ? cityOptions
                : ["Select a country/prefecture first"]
            }
            onValueChange={handleCity1Change}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="MapTrifold"
            text={userProfile?.city2 || "市区町村2を選んでください"}
            info="Select your city or town from the list below."
            className="w-[347px]"
            type="select"
            options={
              cityOptions.length > 0
                ? cityOptions
                : ["Select a country/prefecture first"]
            }
            onValueChange={handleCity2Change}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="BuildingApartment"
            text={userProfile?.streetAddress || "番地・建物名"}
            className="w-[347px]"
            type="input"
            info="Enter your street address, including building name if applicable."
            onValueChange={handleStreetAddressChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="Numpad"
            text={userProfile?.phoneNumber || "電話番号"}
            className="w-[347px]"
            type="input"
            info="Enter your phone number."
            onValueChange={handlePhoneNumberChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="At"
            text={userProfile?.email || "メールアドレス"}
            className="w-[347px]"
            type="input"
            info="Enter your email address for account verification and notifications."
            onValueChange={handleEmailChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="Certificate"
              text={userProfile?.visaType || "ビザの種類"}
              type="select"
              info="Choose your visa type from the list below."
              options={["Student", "Work", "Tourist", "Other"]}
              className="!w-[183px] !text-[12px]"
              onValueChange={handleVisaTypeChange}
              editable={isEditable}
            />
            <TextComponent
              text={userProfile?.visaValidityPeriod || "有効期間"}
              type="input"
              className="!w-[153px] !text-[14px]"
              label="有効期間"
              onValueChange={handleVisaValidityPeriodChange}
              editable={isEditable}
            />
          </View>
          <Separator width={360} />
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="Newspaper"
              text={userProfile?.residenceStatus || "在留資格"}
              type="select"
              info="Choose your Status of residence from the list below."
              options={["Student", "Work", "Tourist", "Other"]}
              className="!w-[183px] !text-[12px]"
              onValueChange={handleResidenceStatusChange}
              editable={isEditable}
            />
            <TextComponent
              text={
                userProfile?.residenceStatusChangeSchedule ||
                "在留資格の変更予定"
              }
              type="input"
              className="!w-[153px] !text-[14px]"
              label="変更予定"
              onValueChange={handleResidenceStatusChangeScheduleChange}
              editable={isEditable}
            />
          </View>
          <Separator width={360} />
          <TextWithIcon
            icon="ChatsCircle"
            text={userProfile?.japaneseLevel || "日本語レベル"}
            type="select"
            info="Choose your Japanese language proficiency level from the list below."
            options={["N5", "N4", "N3", "N2", "N1"]}
            className="!w-[183px] !text-[12px]"
            onValueChange={handleJapaneseLevelChange}
            editable={isEditable}
          />
          <Separator width={360} />

          <WeekDays
            onAir={userProfile?.availableDays || ""}
            useHours="no"
            editable={isEditable}
            onAirChange={handleAvailableDaysChange}
            info="Select the days you are available to work. You can choose multiple days."
          />
          <Separator width={360} />
          <View className="flex-row gap-[11px]">
            <TextWithIcon
              icon="Clock"
              text={userProfile?.availableFromTime || "何時から"}
              type="select"
              info="Choose your available from time."
              options={[
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
              ]}
              className="!w-[193px] !text-[16px]"
              onValueChange={handleAvailableFromTimeChange}
              editable={isEditable}
            />

            <TextComponent
              text={userProfile?.availableToTime || "何時まで"}
              type="select"
              className="!w-[143px] !text-[12px]"
              options={[
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
                "21:00",
                "22:00",
                "23:00",
              ]}
              onValueChange={handleAvailableToTimeChange}
              editable={isEditable}
            />
          </View>
          <Separator width={360} />
          <TextWithIcon
            icon="Briefcase"
            text={userProfile?.currentOccupation || "現在の職業/学生"}
            type="input"
            info="Enter your current occupation or student status."
            className="!w-[347px] !text-[16px]"
            onValueChange={handleCurrentOccupationChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="Bank"
            text={userProfile?.desiredJobType || "希望の職種"}
            type="input"
            info="Enter your desired job type."
            className="!w-[347px] !text-[16px]"
            onValueChange={handleDesiredJobTypeChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <TextWithIcon
            icon="Table"
            text={userProfile?.workHistory || "過去の職歴・バイト歴"}
            type="input"
            info="Enter your work history and part-time job experience."
            className="!w-[347px] !text-[16px]"
            onValueChange={handleWorkHistoryChange}
            editable={isEditable}
          />
          <Separator width={360} />
          <View className="flex-row justify-center items-center  gap-[11px]">
            <TouchableOpacity onPress={handleSaveEdit}>
              <View className="h-[60px] w-[90px] bg-[#ECF7F8] border border-[#48A6AC] rounded-lg flex px-[16px] py-[8px]">
                <Text className="text-[#48A6AC] font-semibold text-[28px]">
                  {saveButtonText}
                </Text>
                {pendingChanges && (
                  <View className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownloadProfile}>
              <View className="h-[60px] w-[90px] bg-[#EFEDFF] border border-[#555AE9] rounded-lg flex-row px-[11px] py-[12px] ">
                <Text className="text-[#555AE9] font-semibold text-[28px] mt-[-4px]">
                  DL
                </Text>
                <DownloadSimple size={32} color="#555AE9" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}
