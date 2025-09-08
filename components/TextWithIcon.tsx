import { ThemedText } from "@/components/ThemedText";
import {
  At,
  Bank,
  Briefcase,
  BuildingApartment,
  BuildingOffice,
  Buildings,
  Cake,
  CalendarDots,
  CaretDown,
  Certificate,
  ChatsCircle,
  Clock,
  CurrencyJpy,
  CurrencyKzt,
  Footprints,
  GenderFemale,
  GenderMale,
  GitCommit,
  GlobeHemisphereEast,
  GraduationCap,
  HouseLine,
  IdentificationCard,
  Info,
  MapPin,
  MapPinArea,
  MapTrifold,
  Newspaper,
  Numpad,
  Star,
  Table,
  Train,
  Tram,
  X,
} from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const iconMap = {
  BuildingOffice,
  Buildings,
  Clock,
  CalendarDots,
  MapPin,
  CurrencyJpy,
  GraduationCap,
  ChatsCircle,
  Tram,
  Train,
  HouseLine,
  Footprints,
  Star,
  GitCommit,
  CaretDown,
  IdentificationCard,
  Cake,
  GlobeHemisphereEast,
  Info,
  CurrencyKzt,
  MapPinArea,
  MapTrifold,
  BuildingApartment,
  Numpad,
  At,
  Newspaper,
  Certificate,
  GenderMale,
  GenderFemale,
  Briefcase,
  Bank,
  Table,
};

type IconName = keyof typeof iconMap;
type ComponentType =
  | "default"
  | "LanSkill"
  | "TrainSt"
  | "input"
  | "select"
  | "selectCountry"
  | "radio";

// Country flags mapping
const countryFlags = {
  Japan: "🇯🇵",
  USA: "🇺🇸",
  "United Kingdom": "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Russia: "🇷🇺",
  Uzbekistan: "🇺🇿",
  China: "🇨🇳",
  India: "🇮🇳",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
  Brazil: "🇧🇷",
  Mexico: "🇲🇽",
  Argentina: "🇦🇷",
  Chile: "🇨🇱",
  Colombia: "🇨🇴",
  Peru: "🇵🇪",
  Venezuela: "🇻🇪",
  "South Korea": "🇰🇷",
  "North Korea": "🇰🇵",
  Thailand: "🇹🇭",
  Vietnam: "🇻🇳",
  Philippines: "🇵🇭",
  Indonesia: "🇮🇩",
  Malaysia: "🇲🇾",
  Singapore: "🇸🇬",
  "Saudi Arabia": "🇸🇦",
  "United Arab Emirates": "🇦🇪",
  Turkey: "🇹🇷",
  Israel: "🇮🇱",
  Egypt: "🇪🇬",
  "South Africa": "🇿🇦",
  Nigeria: "🇳🇬",
  Kenya: "🇰🇪",
  Morocco: "🇲🇦",
  Ethiopia: "🇪🇹",
  Ghana: "🇬🇭",
  Algeria: "🇩🇿",
  Poland: "🇵🇱",
  Ukraine: "🇺🇦",
  Belarus: "🇧🇾",
  Kazakhstan: "🇰🇿",
  Kyrgyzstan: "🇰🇬",
  Tajikistan: "🇹🇯",
  Turkmenistan: "🇹🇲",
  Azerbaijan: "🇦🇿",
  Armenia: "🇦🇲",
  Georgia: "🇬🇪",
};

interface TextWithIconProps {
  icon: string;
  text: string;
  className?: string;
  type?: ComponentType;
  options?: string[];
  onValueChange?: (value: string) => void;
  text2nd?: string;
  info?: string;
  editable?: "yes" | "no";
  // Radio specific props
  radioNum?: string;
  radioLabel?: string;
  radioColor?: string;
  currentValue?: string;
}

const TextWithIcon = ({
  icon,
  text,
  className,
  type = "default",
  options = [],
  onValueChange,
  text2nd,
  info,
  editable = "yes",
  radioNum = "2",
  radioLabel = "",
  radioColor = "same",
  currentValue,
}: TextWithIconProps) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const iconNames = icon.split("&");
  const isMultipleIcons = iconNames.length > 1;
  const [inputValue, setInputValue] = useState(text);
  const [selectedValue, setSelectedValue] = useState(text);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  // Sync inputValue and selectedValue with text prop
  useEffect(() => {
    setInputValue(text);
    setSelectedValue(text);
  }, [text]);

  // Sync radio selection with currentValue for gender
  useEffect(() => {
    if (type === "radio" && currentValue) {
      // Map gender values back to radio format
      const genderToRadioMap: Record<string, string> = {
        Male: "radio_0",
        Female: "radio_1",
        Other: "radio_2",
      };
      const radioValue = genderToRadioMap[currentValue];
      if (radioValue) {
        setSelectedRadio(radioValue);
      }
    }
  }, [currentValue, type]);

  // Extract text size from className prop
  const getTextSizeClass = () => {
    if (className?.includes("text-[")) {
      const match = className.match(/!?text-\[[^\]]+\]/);
      return match ? match[0] : "text-[16px]";
    }
    return "text-[16px]";
  };
  const [tapCount, setTapCount] = useState(0);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onValueChange?.(value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
    onValueChange?.(value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
    onValueChange?.(value);
  };

  // Parse radio labels to extract icons and text
  const parseRadioLabels = (labelString: string) => {
    if (!labelString) return [];

    // Split by both & and | separators
    const labels = labelString.split(/[&|]/);
    return labels.map((label) => {
      const iconMatch = label.match(/\*icon\*([^*]+)/);
      const textMatch = label.match(/\*text\*([^*]+)/);

      return {
        icon: iconMatch ? iconMatch[1] : null,
        text: textMatch
          ? textMatch[1]
          : label.replace(/\*icon\*[^*]*|\*text\*[^*]*/g, "").trim() || "",
      };
    });
  };

  // Parse radio colors
  const parseRadioColors = (colorString: string) => {
    if (!colorString) return [];

    const colors = colorString.split("&");
    return colors.map((color) => color.trim());
  };

  const handleInfoPress = () => {
    if (infoVisible) {
      // Show info modal instead of alert
      setIsInfoModalVisible(true);
    }
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalVisible(false);
    setInfoVisible(false);
    setTapCount(0);
  };

  // Function to get field name based on icon
  const getFieldName = () => {
    const iconToFieldMap: Record<string, string> = {
      BuildingOffice: "field.company",
      GraduationCap: "field.position",
      CurrencyJpy: "field.salary",
      ChatsCircle: "field.languageSkill",
      "HouseLine&Footprints": "field.walkTime",
      Tram: "field.station",
      Star: "field.rating",
      Clock: "field.hours",
      CalendarDots: "field.schedule",
      IdentificationCard: "field.id",
      Cake: "field.age",
      GlobeHemisphereEast: "field.country",
      MapPin: "field.location",
      At: "field.email",
      Numpad: "field.phone",
      Certificate: "field.certification",
      Briefcase: "field.jobType",
      Bank: "field.bankInfo",
    };

    // Handle multiple icons (like "HouseLine&Footprints")
    if (iconNames.length > 1) {
      const combinedIcon = iconNames.join("&");
      const translationKey =
        iconToFieldMap[combinedIcon] ||
        iconToFieldMap[iconNames[0]] ||
        "field.information";
      return t(translationKey);
    }

    const translationKey = iconToFieldMap[icon] || "field.information";
    return t(translationKey);
  };

  const handleIconAreaPress = () => {
    if (!infoVisible && info) {
      // Info icon is hidden, count taps to bring it back
      const newTapCount = tapCount + 1;
      setTapCount(newTapCount);

      if (newTapCount >= 3) {
        setInfoVisible(true);
        setTapCount(0);
      }
    }
  };

  const renderContent = () => {
    switch (type) {
      case "input":
        return (
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            editable={editable === "yes"}
            className={`${getTextSizeClass()} h-[46px] pl-2 pt-0 font-semibold border-solid border-[1px] rounded-[8px] pb-1 ${
              className?.includes("w-") ? "" : "min-w-[100px]"
            }`}
            style={{
              color: colors.text,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: editable === "no" ? 0.6 : 1,
            }}
            placeholder={text}
            placeholderTextColor={colors.textSecondary}
          />
        );

      case "select":
        return (
          <View className="relative">
            <TouchableOpacity
              onPress={() =>
                editable === "yes" && setIsDropdownOpen(!isDropdownOpen)
              }
              disabled={editable === "no"}
              className={`flex-row items-center gap-2 border-solid border-[1px] rounded-[8px] px-3 py-2 h-[48px] justify-between ${
                className?.includes("w-") ? "" : "min-w-[98px]"
              }`}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                opacity: editable === "no" ? 0.6 : 1,
              }}
            >
              <ThemedText
                type="defaultSemiBold"
                className={`${getTextSizeClass()} font-semibold`}
                style={{ color: colors.text }}
              >
                {selectedValue || text}
              </ThemedText>
              <CaretDown size={16} color={colors.text} />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View
                className={`absolute top-12 left-0 rounded-lg shadow-lg z-10 ${
                  className?.includes("w-") ? "w-full" : "min-w-[98px]"
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
                      onPress={() => handleSelectChange(option)}
                      className="px-3 py-2 last:border-b-0"
                      style={{
                        borderBottomColor: colors.border,
                        borderBottomWidth: index < options.length - 1 ? 1 : 0,
                      }}
                    >
                      <Text
                        className={`${getTextSizeClass()}`}
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

      case "selectCountry":
        const countryOptions = Object.keys(countryFlags);
        return (
          <View className="relative">
            <TouchableOpacity
              onPress={() =>
                editable === "yes" && setIsDropdownOpen(!isDropdownOpen)
              }
              disabled={editable === "no"}
              className={`flex-row items-center gap-2 border-solid border-[1px] rounded-[8px] px-3 py-2 h-[48px] justify-between ${
                className?.includes("w-") ? "" : "min-w-[120px]"
              }`}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                opacity: editable === "no" ? 0.6 : 1,
              }}
            >
              <View className="flex-row items-center gap-2">
                {selectedValue &&
                  countryFlags[selectedValue as keyof typeof countryFlags] && (
                    <Text className="text-[20px]">
                      {countryFlags[selectedValue as keyof typeof countryFlags]}
                    </Text>
                  )}
                <ThemedText
                  type="defaultSemiBold"
                  className={`${getTextSizeClass()} font-semibold`}
                  style={{ color: colors.text }}
                >
                  {selectedValue || text}
                </ThemedText>
              </View>
              <CaretDown size={16} color={colors.text} />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View
                className={`absolute top-12 left-0 rounded-lg shadow-lg z-10 ${
                  className?.includes("w-") ? "w-full" : "min-w-[200px]"
                }`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <ScrollView
                  style={{
                    maxHeight: countryOptions.length > 10 ? 250 : undefined,
                  }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={countryOptions.length > 10}
                >
                  {countryOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectChange(option)}
                      className="flex-row items-center gap-3 px-3 py-2 last:border-b-0"
                      style={{
                        borderBottomColor: colors.border,
                        borderBottomWidth:
                          index < countryOptions.length - 1 ? 1 : 0,
                      }}
                    >
                      <Text className="text-[20px]">
                        {countryFlags[option as keyof typeof countryFlags]}
                      </Text>
                      <Text
                        className={`${getTextSizeClass()}`}
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

      case "radio":
        const numRadios = parseInt(radioNum) || 2;
        const radioLabels = parseRadioLabels(radioLabel);
        const radioColors = parseRadioColors(radioColor);

        return (
          <View className="flex-row flex-wrap gap-4 w-full">
            {Array.from({ length: numRadios }, (_, index) => {
              const labelData = radioLabels[index] || {
                icon: null,
                text: "",
              };
              const radioValue = `radio_${index}`;

              // Get color for this radio button
              const currentColor =
                radioColors[index] === "same" || !radioColors[index]
                  ? "#002775"
                  : radioColors[index];

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    editable === "yes" && handleRadioChange(radioValue)
                  }
                  disabled={editable === "no"}
                  className="flex-row items-center gap-2 py-1"
                  style={{
                    opacity: editable === "no" ? 0.6 : 1,
                  }}
                >
                  {/* Radio button */}
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center`}
                    style={{
                      borderColor:
                        selectedRadio === radioValue ? currentColor : "#acacac",
                    }}
                  >
                    {selectedRadio === radioValue && (
                      <View
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: currentColor }}
                      />
                    )}
                  </View>

                  {/* Label with optional icon */}
                  <View className="flex-row items-center gap-1">
                    {labelData.icon && iconMap[labelData.icon as IconName] && (
                      <View className="w-6 h-6 items-center justify-center">
                        {React.createElement(
                          iconMap[labelData.icon as IconName],
                          {
                            size: 20,
                            color: currentColor,
                            weight: "duotone",
                          }
                        )}
                      </View>
                    )}
                    {labelData.text && (
                      <Text
                        className={`${getTextSizeClass()} font-medium`}
                        style={{ color: colors.text }}
                      >
                        {labelData.text}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case "LanSkill":
        return (
          <View className="flex-col items-center gap-0 w-[80px]">
            <ThemedText
              type="defaultSemiBold"
              className="text-[20px] mb-[-10px]"
              style={{ color: colors.text }}
            >
              {text || ""}
            </ThemedText>
            <GitCommit size={32} color={colors.text} />
          </View>
        );

      case "TrainSt":
        return (
          <View className="flex-col gap-1 items-center w-[80px]">
            <View className="h-[31px] w-[31px]  rounded-full border border-[#00771A] p-[2px]">
              <ThemedText
                type="defaultSemiBold"
                className="!text-[10px]"
                style={{ color: colors.text }}
              >
                {text2nd || ""}
              </ThemedText>
            </View>
            <ThemedText
              type="defaultSemiBold"
              className="text-[15px]"
              style={{ color: colors.text }}
            >
              {text || ""}
            </ThemedText>
          </View>
        );

      default:
        return (
          <Text
            className={`${getTextSizeClass()} font-medium`}
            style={{ color: colors.text }}
          >
            {text || ""}
          </Text>
        );
    }
  };

  return (
    <View className={`flex-row items-center gap-3 ${className || ""}`}>
      <TouchableOpacity
        onPress={handleIconAreaPress}
        className="h-[48px] w-[48px] rounded-full bg-[#EBDFCC] items-center justify-center p-0 relative"
        activeOpacity={!infoVisible && info ? 0.3 : 1}
      >
        {isMultipleIcons ? (
          <>
            {/* First icon - left top */}
            {iconNames[0] &&
              iconMap[iconNames[0] as IconName] &&
              React.createElement(iconMap[iconNames[0] as IconName], {
                size: 23,
                color: "#002775",
                weight: "duotone",
                style: { position: "absolute", top: 8, left: 8 },
              })}
            {/* Second icon - right bottom */}
            {iconNames[1] &&
              iconMap[iconNames[1] as IconName] &&
              React.createElement(iconMap[iconNames[1] as IconName], {
                size: 23,
                color: "#9C0000",
                weight: "duotone",
                style: { position: "absolute", bottom: 6, right: 6 },
              })}
          </>
        ) : (
          React.createElement(iconMap[icon as IconName], {
            size: 32,
            color: "#002775",
            weight: "duotone",
          })
        )}

        {/* Info icon in top right corner - only show when infoVisible is true */}
        {info && infoVisible && (
          <TouchableOpacity
            onPress={handleInfoPress}
            className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center"
            activeOpacity={0.7}
          >
            <Info size={10} color="white" weight="bold" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View className="flex-1 h-[48px] justify-center">{renderContent()}</View>

      {/* Info Modal */}
      <Modal
        visible={isInfoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseInfoModal}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View
            className="bg-white rounded-3xl p-6 w-full max-w-sm mx-4"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="h-[48px] w-[48px] rounded-full bg-[#EBDFCC] items-center justify-center">
                  {isMultipleIcons ? (
                    <>
                      {/* First icon - left top */}
                      {iconNames[0] &&
                        iconMap[iconNames[0] as IconName] &&
                        React.createElement(iconMap[iconNames[0] as IconName], {
                          size: 23,
                          color: "#002775",
                          weight: "duotone",
                          style: { position: "absolute", top: 8, left: 8 },
                        })}
                      {/* Second icon - right bottom */}
                      {iconNames[1] &&
                        iconMap[iconNames[1] as IconName] &&
                        React.createElement(iconMap[iconNames[1] as IconName], {
                          size: 23,
                          color: "#9C0000",
                          weight: "duotone",
                          style: { position: "absolute", bottom: 6, right: 6 },
                        })}
                    </>
                  ) : (
                    React.createElement(iconMap[icon as IconName], {
                      size: 32,
                      color: "#002775",
                      weight: "duotone",
                    })
                  )}
                </View>

                {/* Field name */}
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.text }}
                >
                  {getFieldName()}
                </Text>
              </View>

              {/* Close button */}
              <TouchableOpacity
                onPress={handleCloseInfoModal}
                className="p-2"
                activeOpacity={0.7}
              >
                <X size={24} color={colors.text} weight="bold" />
              </TouchableOpacity>
            </View>

            {/* Info content */}
            <ScrollView className="max-h-60">
              <Text
                className="text-base leading-6"
                style={{ color: colors.textSecondary }}
              >
                {info}
              </Text>
            </ScrollView>

            {/* Done button */}
            <TouchableOpacity
              onPress={handleCloseInfoModal}
              className="mt-6 py-3 px-6 rounded-xl items-center"
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                {t("common.done")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TextWithIcon;
