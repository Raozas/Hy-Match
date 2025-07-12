import * as ImagePicker from "expo-image-picker";
import { UserFocus, X } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";

interface ImagePickerComponentProps {
  onImageSelected?: (imageUri: string) => void;
  onImageReset?: () => void;
  currentImage?: string | null;
  className?: string;
}

const ImagePickerComponent = ({
  onImageSelected,
  onImageReset,
  currentImage,
  className,
}: ImagePickerComponentProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentImage || null
  );

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to select an image.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const resetImage = async () => {
    Alert.alert(
      "Reset Profile Image",
      "Are you sure you want to remove your profile image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              setSelectedImage(null);

              // Call the reset callback if provided
              onImageReset?.();

              Alert.alert("Success", "Profile image reset successfully!");
            } catch (error) {
              console.error("Error resetting image:", error);
              Alert.alert("Error", "Failed to reset image. Please try again.");
            }
          },
        },
      ]
    );
  };

  const showImageOptions = () => {
    Alert.alert("Profile Image", "What would you like to do?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Choose Image",
        onPress: pickImage,
      },
      ...(selectedImage
        ? [
            {
              text: "Reset Image",
              style: "destructive" as const,
              onPress: resetImage,
            },
          ]
        : []),
    ]);
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);

        // Call the callback if provided
        onImageSelected?.(imageUri);

        Alert.alert("Success", "Profile image updated successfully!");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={showImageOptions}
        className={`bg-[#D9D9D9] w-[48px] h-[48px] rounded-[8px] items-center justify-center overflow-hidden ${className || ""}`}
        activeOpacity={0.7}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-full rounded-[8px]"
            resizeMode="cover"
          />
        ) : (
          <UserFocus size={32} color="#002775" />
        )}
      </TouchableOpacity>

      {/* Reset button when image exists */}
      {selectedImage && (
        <TouchableOpacity
          onPress={resetImage}
          className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
          activeOpacity={0.7}
        >
          <X size={12} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePickerComponent;
