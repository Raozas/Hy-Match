import * as ImagePicker from "expo-image-picker";
import { VideoView, useVideoPlayer } from "expo-video";
import { Play, PlayCircle, X } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, Dimensions, Modal, TouchableOpacity, View } from "react-native";

interface VideoPickerComponentProps {
  onVideoSelected?: (videoUri: string) => void;
  onVideoReset?: () => void;
  currentVideo?: string | null;
  className?: string;
}

const VideoPickerComponent = ({
  onVideoSelected,
  onVideoReset,
  currentVideo,
  className,
}: VideoPickerComponentProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(
    currentVideo || null
  );
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Create video players at component level to avoid conditional hook calls
  const thumbnailPlayer = useVideoPlayer(selectedVideo || "", (player) => {
    player.muted = true;
    player.loop = false;
  });

  const modalPlayer = useVideoPlayer(selectedVideo || "", (player) => {
    if (selectedVideo && isVideoModalVisible) {
      player.play();
      player.loop = true;
    }
  });

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to select a video.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const resetVideo = async () => {
    Alert.alert(
      "Reset Profile Video",
      "Are you sure you want to remove your profile video?",
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
              setSelectedVideo(null);

              // Call the reset callback if provided
              onVideoReset?.();

              Alert.alert("Success", "Profile video reset successfully!");
            } catch (error) {
              console.error("Error resetting video:", error);
              Alert.alert("Error", "Failed to reset video. Please try again.");
            }
          },
        },
      ]
    );
  };

  const showVideoOptions = () => {
    Alert.alert("Profile Video", "What would you like to do?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Choose Video",
        onPress: pickVideo,
      },
      ...(selectedVideo
        ? [
            {
              text: "View Video",
              onPress: () => setIsVideoModalVisible(true),
            },
            {
              text: "Reset Video",
              style: "destructive" as const,
              onPress: resetVideo,
            },
          ]
        : []),
    ]);
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "videos",
        allowsEditing: false,
        quality: 0.8,
        videoMaxDuration: 30,
      });

      if (!result.canceled && result.assets[0]) {
        const videoUri = result.assets[0].uri;
        console.log("Selected video URI:", videoUri);

        setSelectedVideo(videoUri);

        try {
          // Call the callback if provided
          onVideoSelected?.(videoUri);

          Alert.alert("Success", "Profile video updated successfully!");
        } catch (dbError) {
          console.error("Database error:", dbError);
          const errorMessage =
            dbError instanceof Error ? dbError.message : String(dbError);
          Alert.alert(
            "Database Error",
            `Failed to save video to database: ${errorMessage}`
          );
        }
      } else {
        console.log("Video selection was canceled or no video selected");
      }
    } catch (error) {
      console.error("Error picking video:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert(
        "Error",
        `Failed to select video: ${errorMessage}. Please try again.`
      );
    }
  };

  return (
    <>
      <View className="relative">
        <TouchableOpacity
          onPress={showVideoOptions}
          className={`bg-[#D9D9D9] w-[48px] h-[48px] rounded-[8px] items-center justify-center overflow-hidden ${
            className || ""
          }`}
          activeOpacity={0.7}
        >
          {selectedVideo ? (
            <View className="w-full h-full relative">
              <VideoView
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                player={thumbnailPlayer}
                allowsFullscreen={false}
                allowsPictureInPicture={false}
              />
              {/* Play overlay */}
              <View className="absolute inset-0 items-center justify-center bg-black/20 rounded-[8px]">
                <Play size={20} color="white" weight="fill" />
              </View>
            </View>
          ) : (
            <PlayCircle size={32} color="#9C0000" />
          )}
        </TouchableOpacity>

        {/* Reset button when video exists */}
        {selectedVideo && (
          <TouchableOpacity
            onPress={resetVideo}
            className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
            activeOpacity={0.7}
          >
            <X size={12} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Video Modal */}
      <Modal
        visible={isVideoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVideoModalVisible(false)}
      >
        <View className="flex-1 bg-black/90 items-center justify-center">
          {/* Close button */}
          <TouchableOpacity
            onPress={() => setIsVideoModalVisible(false)}
            className="absolute top-12 right-4 z-10 bg-black/50 rounded-full w-10 h-10 items-center justify-center"
            activeOpacity={0.7}
          >
            <X size={24} color="white" weight="bold" />
          </TouchableOpacity>

          {/* Video player */}
          {selectedVideo && (
            <VideoView
              style={{
                width: screenWidth * 0.9,
                height: screenHeight * 0.7,
              }}
              player={modalPlayer}
              allowsFullscreen={true}
              allowsPictureInPicture={false}
              showsTimecodes={true}
            />
          )}
        </View>
      </Modal>
    </>
  );
};

export default VideoPickerComponent;
