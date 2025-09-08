import { Heart, Trash } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface SwipeInstructionsProps {
  swipeDirection: "left" | "right" | null;
}

export const SwipeInstructions: React.FC<SwipeInstructionsProps> = ({
  swipeDirection,
}) => {
  const { colors } = useTheme();

  return (
    <View
      className="px-4"
      style={{
        marginBottom: 20,
        bottom: 20,
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <View className="flex-row justify-between items-center">
        <View
          className="h-[48px] w-[48px] rounded-full items-center justify-center"
          style={{
            backgroundColor:
              swipeDirection === "left" ? "#B9BFFF80" : "#F5F5F580",
          }}
        >
          <Trash
            size={32}
            color={swipeDirection === "left" ? "#642B9D" : colors.textSecondary}
            weight="fill"
          />
        </View>
        <View
          className="h-[48px] w-[48px] rounded-full items-center justify-center"
          style={{
            backgroundColor:
              swipeDirection === "right" ? "#FFD3D3" : "#F5F5F580",
          }}
        >
          <Heart
            size={32}
            color={
              swipeDirection === "right" ? "#FF6060" : colors.textSecondary
            }
            weight="fill"
          />
        </View>
      </View>
    </View>
  );
};
