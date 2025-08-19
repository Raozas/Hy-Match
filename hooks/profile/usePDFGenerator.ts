import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useCallback } from "react";
import { Alert } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { UserProfile } from "../../utils/database";

export const usePDFGenerator = () => {
  const { t } = useLanguage();

  const generateProfilePDF = useCallback(
    async (userProfile: UserProfile, profileImage?: string | null) => {
      try {
        if (!userProfile) {
          Alert.alert(t("alert.error"), t("alert.noProfileData"));
          return;
        }

        let imageBase64 = "";
        if (profileImage) {
          try {
            if (profileImage.startsWith("file://")) {
              const base64 = await FileSystem.readAsStringAsync(profileImage, {
                encoding: FileSystem.EncodingType.Base64,
              });
              const imageType = profileImage.toLowerCase().includes(".png")
                ? "png"
                : "jpeg";
              imageBase64 = `data:image/${imageType};base64,${base64}`;
            } else if (profileImage.startsWith("data:")) {
              imageBase64 = profileImage;
            }
          } catch (error) {
            console.warn("Could not convert image to base64:", error);
          }
        }

        const htmlContent = generateHTMLContent(userProfile, imageBase64);

        const { uri } = await Print.printToFileAsync({
          html: htmlContent,
          base64: false,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: "application/pdf",
            dialogTitle: "Share Profile PDF",
            UTI: "com.adobe.pdf",
          });
        } else {
          Alert.alert(t("alert.success"), `${t("alert.pdfSavedTo")}${uri}`);
        }

        console.log("PDF generated successfully:", uri);
      } catch (error) {
        console.error("Error generating PDF:", error);
        Alert.alert(t("alert.error"), t("alert.pdfGenerationFailed"));
      }
    },
    [t]
  );

  const generateHTMLContent = useCallback(
    (userProfile: UserProfile, imageBase64: string) => {
      return `
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
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td><strong>Name</strong></td><td>${userProfile.name || "Not specified"}</td></tr>
            <tr><td><strong>Age</strong></td><td>${userProfile.age || "Not specified"}</td></tr>
            <tr><td><strong>Gender</strong></td><td>${userProfile.gender || "Not specified"}</td></tr>
            <tr><td><strong>Country</strong></td><td>${userProfile.country || "Not specified"}</td></tr>
            <tr><td><strong>Phone Number</strong></td><td>${userProfile.phoneNumber || "Not specified"}</td></tr>
            <tr><td><strong>Email</strong></td><td>${userProfile.email || "Not specified"}</td></tr>
          </table>
        </div>

        <div class="section">
          <h2 class="section-title">Address Information</h2>
          <table class="table">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td><strong>Postal Code</strong></td><td>${userProfile.postalCode || "Not specified"}</td></tr>
            <tr><td><strong>Prefecture</strong></td><td>${userProfile.prefecture || "Not specified"}</td></tr>
            <tr><td><strong>City 1</strong></td><td>${userProfile.city1 || "Not specified"}</td></tr>
            <tr><td><strong>City 2</strong></td><td>${userProfile.city2 || "Not specified"}</td></tr>
            <tr><td><strong>Street Address</strong></td><td>${userProfile.streetAddress || "Not specified"}</td></tr>
          </table>
        </div>

        <div class="section">
          <h2 class="section-title">Work Information</h2>
          <table class="table">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td><strong>Current Occupation</strong></td><td>${userProfile.currentOccupation || "Not specified"}</td></tr>
            <tr><td><strong>Desired Job Type</strong></td><td>${userProfile.desiredJobType || "Not specified"}</td></tr>
            <tr><td><strong>Work History</strong></td><td>${userProfile.workHistory || "Not specified"}</td></tr>
            <tr><td><strong>Available Days</strong></td><td>${userProfile.availableDays ? userProfile.availableDays.split("&").join(", ") : "Not specified"}</td></tr>
            <tr><td><strong>Available From</strong></td><td>${userProfile.availableFromTime || "Not specified"}</td></tr>
            <tr><td><strong>Available To</strong></td><td>${userProfile.availableToTime || "Not specified"}</td></tr>
          </table>
        </div>
      </body>
      </html>
    `;
    },
    []
  );

  return { generateProfilePDF };
};
