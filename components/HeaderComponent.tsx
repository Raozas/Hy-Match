import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import {
  ArrowLeft,
  Check,
  DotsThreeVertical,
  Info,
  List,
  MagnifyingGlass,
  Moon,
  Plus,
  Sliders,
  Sun,
  X,
} from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const iconMap = {
  List,
  Filter: Sliders,
  Back: ArrowLeft,
  Menu: DotsThreeVertical,
  Search: MagnifyingGlass,
  Add: Plus,
  Close: X,
  Check,
  Info,
  Sun,
  Moon,
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
  showThemeToggle?: boolean;
}

const HeaderButton = ({ type, onPress }: HeaderButtonProps) => {
  const { colors } = useTheme();
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
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      className="h-[40px] w-[40px] rounded-full border items-center justify-center"
    >
      <IconComponent size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  const IconComponent = isDark ? Sun : Moon;

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      className="h-[40px] w-[40px] rounded-full border items-center justify-center ml-2"
    >
      <IconComponent size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const HeaderTitle = ({ title }: HeaderTitleProps) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center">
      <ThemedText
        type="defaultSemiBold"
        className="text-[18px]"
        style={{ color: colors.text }}
      >
        {title}
      </ThemedText>
    </View>
  );
};

const HeaderComponent = ({
  leftButton,
  title,
  rightButton,
  onLeftPress,
  onRightPress,
  className,
  showThemeToggle = true,
}: HeaderComponentProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
      }}
      className={`flex-row items-center gap-2 h-[90px] w-full px-4 border-b mb-8 ${className || ""}`}
    >
      <View className="w-[40px]">
        {leftButton && <HeaderButton type={leftButton} onPress={onLeftPress} />}
      </View>
      <HeaderTitle title={title} />
      <View className="flex-row items-center">
        {rightButton && (
          <HeaderButton type={rightButton} onPress={onRightPress} />
        )}
        {showThemeToggle && <ThemeToggle />}
      </View>
    </View>
  );
};

export default HeaderComponent;
