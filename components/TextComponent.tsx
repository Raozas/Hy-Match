import { CaretDown } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemedText } from "./ThemedText";

type TextComponentType = "input" | "select" | "default";

interface TextComponentProps {
  text: string;
  type?: TextComponentType;
  className?: string;
  info?: string;
  options?: string[];
  onValueChange?: (value: string) => void;
  label?: string;
  editable?: "yes" | "no";
}

export default function TextComponent({
  text,
  type = "default",
  className = "",
  info,
  options = [],
  onValueChange,
  label,
  editable = "yes",
}: TextComponentProps) {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [labelAnimation] = useState(
    new Animated.Value(inputValue || text ? 1 : 0)
  );

  // Sync inputValue with text prop
  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const getTextSizeClass = (className: string): string => {
    const textSizeMatch = className.match(/!?text-\[(\d+)px\]/);
    if (textSizeMatch) {
      const size = parseInt(textSizeMatch[1]);
      if (size <= 10) return "text-xs";
      if (size <= 12) return "text-sm";
      if (size <= 14) return "text-base";
      if (size <= 16) return "text-lg";
      return "text-xl";
    }
    return "text-sm";
  };

  const textSizeClass = getTextSizeClass(className);

  const animateLabel = (toValue: number) => {
    Animated.timing(labelAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!inputValue) {
      animateLabel(0);
    }
    handleInputSubmit();
  };

  const handleInputSubmit = () => {
    if (onValueChange && inputValue !== text) {
      onValueChange(inputValue);
    }
  };

  const handleSelectOption = (option: string) => {
    if (onValueChange) {
      onValueChange(option);
    }
    setIsDropdownOpen(false);
  };

  const showInfo = () => {
    if (info) {
      setIsInfoVisible(true);
      setTimeout(() => setIsInfoVisible(false), 3000);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "input":
        return (
          <View className="relative">
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onSubmitEditing={handleInputSubmit}
              placeholder={!label ? text : ""}
              editable={editable === "yes"}
              className={`px-3 rounded-lg border ${textSizeClass} ${className}`}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
                height: 48,
                paddingTop: label ? 10 : 12,
                paddingBottom: label ? 8 : 12,
                opacity: editable === "no" ? 0.6 : 1,
              }}
              placeholderTextColor={colors.textSecondary}
            />
            {label && (
              <Animated.View
                style={{
                  position: "absolute",
                  left: 12,
                  top: labelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 4],
                  }),
                  zIndex: 1,
                }}
                pointerEvents="none"
              >
                <Animated.Text
                  style={{
                    fontSize: labelAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [14, 10],
                    }),
                    color: labelAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["#999", "#666"],
                    }),
                    backgroundColor: "white",
                    paddingHorizontal: 4,
                  }}
                >
                  {label}
                </Animated.Text>
              </Animated.View>
            )}
          </View>
        );

      case "select":
        return (
          <View className="relative">
            <TouchableOpacity
              onPress={() =>
                editable === "yes" && setIsDropdownOpen(!isDropdownOpen)
              }
              onLongPress={showInfo}
              disabled={editable === "no"}
              className={`flex-row items-center gap-2 border-solid border-[1px] rounded-[8px] px-3 py-2 justify-between ${className}`}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                height: 48,
                paddingTop: label ? 20 : 12,
                paddingBottom: label ? 8 : 12,
                opacity: editable === "no" ? 0.6 : 1,
              }}
            >
              <ThemedText
                className={`${textSizeClass} font-semibold`}
                style={{ color: colors.text }}
              >
                {text}
              </ThemedText>
              <CaretDown size={16} color={colors.text} />
            </TouchableOpacity>
            {label && (
              <View
                style={{
                  position: "absolute",
                  left: 12,
                  top: 4,
                  zIndex: 1,
                }}
                pointerEvents="none"
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.textSecondary,
                    backgroundColor: colors.surface,
                    paddingHorizontal: 4,
                  }}
                >
                  {label}
                </Text>
              </View>
            )}
            {isDropdownOpen && (
              <View
                className={`absolute top-12 left-0 rounded-lg shadow-lg z-10 ${
                  className?.includes("w-") ? "w-full" : "min-w-[150px]"
                }`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <ScrollView
                  style={{ maxHeight: options.length > 10 ? 250 : undefined }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={options.length > 10}
                >
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectOption(option)}
                      className="px-3 py-2 last:border-b-0"
                      style={{
                        borderBottomColor: colors.border,
                        borderBottomWidth: index < options.length - 1 ? 1 : 0,
                      }}
                    >
                      <Text
                        className={`${textSizeClass}`}
                        style={{ color: colors.text }}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        );

      default:
        return (
          <View className="relative">
            <TouchableOpacity
              onLongPress={showInfo}
              className={`bg-gray-100 px-3 rounded-lg border border-gray-300 ${className}`}
              style={{
                height: 48,
                paddingTop: label ? 20 : 12,
                paddingBottom: label ? 8 : 12,
              }}
            >
              <ThemedText className={`${textSizeClass} text-gray-700`}>
                {text}
              </ThemedText>
            </TouchableOpacity>
            {label && (
              <View
                style={{
                  position: "absolute",
                  left: 12,
                  top: 4,
                  zIndex: 1,
                }}
                pointerEvents="none"
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#666",
                    backgroundColor: "#f3f4f6",
                    paddingHorizontal: 4,
                  }}
                >
                  {label}
                </Text>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <View className="relative">
      {renderContent()}

      {/* Info popup */}
      {isInfoVisible && info && (
        <View className="absolute top-full left-0 right-0 mt-1 bg-black bg-opacity-80 rounded-lg p-2 z-50">
          <Text className="text-white text-xs">{info}</Text>
        </View>
      )}
    </View>
  );
}
