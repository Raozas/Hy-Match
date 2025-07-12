import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import {
  ArrowLeft,
  Check,
  DotsThreeVertical,
  FunnelSimple,
  List,
  MagnifyingGlass,
  Plus,
  X,
  Sliders,
  Info
} from "phosphor-react-native";

const iconMap = {
  List,
  Filter: Sliders,
  Back: ArrowLeft,
  Menu: DotsThreeVertical,
  Search: MagnifyingGlass,
  Add: Plus,
  Close: X,
  Check,
  Info
};

type IconName = keyof typeof iconMap;

interface HeaderButtonProps {
  type: IconName;
  onPress?: () => void;
}

interface HeaderTitleProps {
  title: string;
}

interface HeaderComponentProps {
  leftButton?: IconName;
  title: string;
  rightButton?: IconName;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  className?: string;
}

const HeaderButton = ({ type, onPress }: HeaderButtonProps) => {
  const IconComponent = iconMap[type];

  const handlePress = () => {
    // Handle special navigation cases
    if (type === "List") {
      router.push("/profile");
    } else if (type === "Back" || type === "Close") {
      router.back();
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="h-[40px] w-[40px] rounded-full bg-[#F0F0F0] items-center justify-center"
    >
      <IconComponent size={24} color="#000000" />
    </TouchableOpacity>
  );
};

const HeaderTitle = ({ title }: HeaderTitleProps) => (
  <View className="flex-1 items-center">
    <ThemedText type="defaultSemiBold" className="text-[18px] text-[#000000]">
      {title}
    </ThemedText>
  </View>
);

const HeaderComponent = ({
  leftButton,
  title,
  rightButton,
  onLeftPress,
  onRightPress,
  className,
}: HeaderComponentProps) => (
  <View
    className={`flex-row items-center gap-2 h-[90px] w-full px-4 bg-white shadow-slate-700 shadow-md mb-8 ${className || ""}`}
  >
    <View className="w-[40px]">
      {leftButton && <HeaderButton type={leftButton} onPress={onLeftPress} />}
    </View>
    <HeaderTitle title={title} />
    <View className="w-[40px]">
      {rightButton && (
        <HeaderButton type={rightButton} onPress={onRightPress} />
      )}
    </View>
  </View>
);

export default HeaderComponent;
