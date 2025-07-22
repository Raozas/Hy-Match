import { ThemedText } from "@/components/ThemedText";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import {
  ArrowLeft,
  Check,
  DotsThreeVertical,
  Globe,
  Info,
  List,
  MagnifyingGlass,
  Moon,
  Plus,
  Sliders,
  Sun,
  User,
  X,
} from "phosphor-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  Globe,
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
  showLanguageSwitcher?: boolean;
}

const HeaderButton = ({ type, onPress }: HeaderButtonProps) => {
  const { colors } = useTheme();
  const IconComponent = iconMap[type];

  const handlePress = () => {
    // Handle special navigation cases
    if (onPress) {
      onPress();
    } else if (type === "List") {
      router.push("/profile");
    } else if (type === "Back" || type === "Close") {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: colors.headerBtn,
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
        backgroundColor: colors.headerBtn,
        borderColor: colors.border,
      }}
      className="h-[40px] w-[40px] rounded-full border items-center justify-center ml-2"
    >
      <IconComponent size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const LanguageSwitcher = () => {
  const { colors } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: t("language.english") },
    { code: "ja", label: t("language.japanese") },
    { code: "uz", label: t("language.uzbek") },
  ];

  const getCurrentLanguageLabel = () => {
    const current = languages.find((lang) => lang.code === currentLanguage);
    return current?.label || "EN";
  };

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    setIsDropdownVisible(false);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        style={{
          backgroundColor: colors.headerBtn,
          borderColor: colors.border,
        }}
        className="h-[40px] w-[40px] rounded-full border items-center justify-center ml-2"
      >
        <Globe size={20} color={colors.text} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View
          style={{
            position: "absolute",
            top: 45,
            right: 0,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
            zIndex: 1000,
          }}
          className="rounded-lg border min-w-[120px] py-2"
        >
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => handleLanguageSelect(language.code)}
              style={{
                backgroundColor:
                  currentLanguage === language.code
                    ? colors.primary + "20"
                    : "transparent",
              }}
              className="px-4 py-3 flex-row items-center justify-between"
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: currentLanguage === language.code ? "600" : "400",
                }}
              >
                {language.label}
              </Text>
              {currentLanguage === language.code && (
                <Check size={16} color={colors.primary} weight="bold" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// User Menu Dropdown Component (Profile, Theme, Language)
const UserMenuDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, currentLanguage, setLanguage } = useLanguage();
  const { colors, isDark, toggleTheme } = useTheme();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: t("language.english"), flag: "🇺🇸" },
    { code: "ja", label: t("language.japanese"), flag: "🇯🇵" },
    { code: "uz", label: t("language.uzbek"), flag: "🇺🇿" },
  ];

  const menuItems = [
    {
      icon: User,
      label: t("header.profile"),
      action: () => {
        router.push("/profile");
        setDropdownOpen(false);
      },
    },
    {
      icon: isDark ? Sun : Moon,
      label: t("header.themeMode"),
      action: () => {
        toggleTheme();
        setDropdownOpen(false);
      },
    },
  ];

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
        style={{
          backgroundColor: colors.headerBtn,
          borderColor: colors.border,
        }}
        className="h-[40px] w-[40px] rounded-full border items-center justify-center"
      >
        <List
          size={20}
          color={colors.text}
          weight={dropdownOpen ? "fill" : "regular"}
        />
      </TouchableOpacity>

      {dropdownOpen && (
        <View
          style={{
            position: "absolute",
            top: 45,
            left: 0,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
            zIndex: 1000,
          }}
          className="rounded-lg border min-w-[180px] py-2"
        >
          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              className="px-4 py-3 flex-row items-center border-b"
              style={{ borderBottomColor: colors.border + "40" }}
            >
              <item.icon size={18} color={colors.text} weight="regular" />
              <Text className="text-sm ml-3" style={{ color: colors.text }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Language Section */}
          <View
            className="px-4 py-3 border-t"
            style={{ borderTopColor: colors.border + "40" }}
          >
            <View className="flex-row items-center mb-2">
              <Globe size={16} color={colors.text} weight="regular" />
              <Text
                className="text-xs ml-2 font-medium opacity-70"
                style={{ color: colors.text }}
              >
                {t("header.language")}
              </Text>
            </View>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => {
                  setLanguage(lang.code);
                  setDropdownOpen(false);
                }}
                className="flex-row items-center justify-between py-2 pl-2"
                style={{
                  backgroundColor:
                    currentLanguage === lang.code
                      ? colors.primary + "15"
                      : "transparent",
                }}
              >
                <View className="flex-row items-center space-x-2">
                  <Text className="text-sm">{lang.flag}</Text>
                  <Text className="text-xs" style={{ color: colors.text }}>
                    {lang.label}
                  </Text>
                </View>
                {currentLanguage === lang.code && (
                  <Check size={14} color={colors.primary} weight="bold" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
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
  showLanguageSwitcher = true,
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
        {leftButton && leftButton === "List" ? (
          <UserMenuDropdown />
        ) : leftButton ? (
          <HeaderButton type={leftButton} onPress={onLeftPress} />
        ) : null}
      </View>
      <HeaderTitle title={title} />
      <View className="flex-row items-center">
        {rightButton && (
          <HeaderButton type={rightButton} onPress={onRightPress} />
        )}
        {/* Hide individual theme and language switchers when using List dropdown */}
        {(!leftButton || leftButton !== "List") && showLanguageSwitcher && (
          <LanguageSwitcher />
        )}
        {(!leftButton || leftButton !== "List") && showThemeToggle && (
          <ThemeToggle />
        )}
      </View>
    </View>
  );
};

export default HeaderComponent;
