import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Check, X } from "phosphor-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { JobData } from "./CardComponent";

interface FilterDropdownProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  jobs: JobData[];
}

export interface FilterOptions {
  sortBy: string;
  professions: string[];
  japaneseLevel: string[];
  salaryRange: [number, number];
  commutingEase: string[];
  rating: string[];
}

// Sort sub-options
const salaryTypeOptions = [
  { id: "hourly", label: "salary.hourly", icon: "⏰" },
  { id: "daily", label: "salary.daily", icon: "📅" },
  { id: "weekly", label: "salary.weekly", icon: "📊" },
  { id: "monthly", label: "salary.monthly", icon: "🗓️" },
];

const salaryAmountOptions = {
  hourly: [
    { id: "900-1200", label: "¥900 - ¥1200", icon: "💴" },
    { id: "1200-1500", label: "¥1200 - ¥1500", icon: "💵" },
    { id: "1500-1800", label: "¥1500 - ¥1800", icon: "💶" },
    { id: "1800+", label: "¥1800+", icon: "💰" },
  ],
  daily: [
    { id: "7000-10000", label: "¥7,000 - ¥10,000", icon: "💴" },
    { id: "10000-12000", label: "¥10,000 - ¥12,000", icon: "💵" },
    { id: "12000-15000", label: "¥12,000 - ¥15,000", icon: "💶" },
    { id: "15000+", label: "¥15,000+", icon: "💰" },
  ],
  weekly: [
    { id: "35000-50000", label: "¥35,000 - ¥50,000", icon: "💴" },
    { id: "50000-70000", label: "¥50,000 - ¥70,000", icon: "💵" },
    { id: "70000-90000", label: "¥70,000 - ¥90,000", icon: "💶" },
    { id: "90000+", label: "¥90,000+", icon: "💰" },
  ],
  monthly: [
    { id: "150000-200000", label: "¥150,000 - ¥200,000", icon: "💴" },
    { id: "200000-250000", label: "¥200,000 - ¥250,000", icon: "💵" },
    { id: "250000-300000", label: "¥250,000 - ¥300,000", icon: "💶" },
    { id: "300000+", label: "¥300,000+", icon: "💰" },
  ],
};

const timeOptions = [
  { id: "5min", label: "time.5minutes", icon: "🚶‍♀️" },
  { id: "10min", label: "time.10minutes", icon: "🚶" },
  { id: "15min", label: "time.15minutes", icon: "🚌" },
  { id: "20min", label: "time.20minutes", icon: "🚃" },
  { id: "30min", label: "time.30minutes", icon: "🚊" },
  { id: "45min", label: "time.45minutes", icon: "🚇" },
  { id: "60min", label: "time.60minutes", icon: "🚄" },
];

const dateRangeOptions = [
  { id: "today", label: "date.today", icon: "📅" },
  { id: "yesterday", label: "date.yesterday", icon: "📋" },
  { id: "last7days", label: "date.last7Days", icon: "📊" },
  { id: "last30days", label: "date.last30Days", icon: "🗓️" },
  { id: "thisMonth", label: "date.thisMonth", icon: "📆" },
  { id: "lastMonth", label: "date.lastMonth", icon: "🗓️" },
];

const sortOptions = [
  { id: "salary", label: "filter.bySalary", icon: "💰" },
  { id: "walkTime", label: "filter.commutingTimeHome", icon: "🚶" },
  {
    id: "commutingFromSchool",
    label: "filter.commutingTimeSchool",
    icon: "🎓",
  },
  { id: "publicationDate", label: "filter.byPublicationDate", icon: "📅" },
];

const filterOptions = [
  { id: "profession", label: "filter.desiredProfession", icon: "💼" },
  { id: "japanese", label: "filter.japaneseLevel", icon: "🗾" },
  { id: "salary", label: "filter.salaryRange", icon: "💵" },
  { id: "commuting", label: "filter.commutingEase", icon: "🚌" },
  { id: "rating", label: "filter.rating", icon: "⭐" },
];

const professionOptions = [
  { id: "sorting", label: "profession.sorting", icon: "📦" },
  { id: "delivery", label: "profession.delivery", icon: "🚚" },
  { id: "cleaning", label: "profession.cleaning", icon: "🧹" },
  { id: "cashier", label: "profession.cashier", icon: "💳" },
  { id: "warehouse", label: "profession.warehouse", icon: "🏭" },
  { id: "cooking", label: "profession.cookingAssistant", icon: "👨‍🍳" },
];

const japaneseLevels = [
  { id: "N1", label: "N1", icon: "🥇" },
  { id: "N2", label: "N2", icon: "🥈" },
  { id: "N3", label: "N3", icon: "🥉" },
  { id: "N4", label: "N4", icon: "📚" },
  { id: "N5", label: "N5", icon: "📖" },
];

const salaryRanges = [
  { id: "900-1200", label: "¥900 - ¥1200", icon: "💴" },
  { id: "1200-1500", label: "¥1200 - ¥1500", icon: "💵" },
  { id: "1500-1800", label: "¥1500 - ¥1800", icon: "💶" },
  { id: "1800+", label: "¥1800+", icon: "💰" },
];

const commutingOptions = [
  { id: "5min", label: "time.5minutes", icon: "🚶‍♀️" },
  { id: "10min", label: "time.10minutes", icon: "🚶" },
  { id: "15min", label: "time.15minutes", icon: "🚌" },
  { id: "20min", label: "time.20minutes", icon: "🚃" },
];

const ratingOptions = [
  { id: "3.0+", label: "3.0+", icon: "⭐" },
  { id: "3.5+", label: "3.5+", icon: "⭐⭐" },
  { id: "4.0+", label: "4.0+", icon: "⭐⭐⭐" },
  { id: "4.5+", label: "4.5+", icon: "⭐⭐⭐⭐" },
];

const SmallTextWithIcon = ({
  icon,
  text,
  selected,
  onPress,
}: {
  icon: string;
  text: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-3 px-4"
      style={{
        backgroundColor: selected ? colors.primary + "20" : "transparent",
        borderBottomWidth: 1,
        borderBottomColor: colors.border + "30",
      }}
    >
      <View className="flex-row items-center flex-1">
        <Text style={{ fontSize: 16, marginRight: 8 }}>{icon}</Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            fontWeight: selected ? "600" : "400",
          }}
        >
          {text}
        </Text>
      </View>
      {selected && <Check size={16} color={colors.primary} weight="bold" />}
    </TouchableOpacity>
  );
};

export default function FilterDropdown({
  visible,
  onClose,
  onApplyFilters,
  jobs,
}: FilterDropdownProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedSortSubOptions, setSelectedSortSubOptions] = useState<{
    salaryType?: string;
    salaryAmount?: string;
    walkTime?: string;
    commutingTime?: string;
    dateRange?: string;
    expandedSalaryType?: string;
  }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    profession: [],
    japanese: [],
    salary: [],
    commuting: [],
    rating: [],
  });

  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null
  );
  const [subDropdownPosition, setSubDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [activeSalaryRangeDropdown, setActiveSalaryRangeDropdown] = useState<
    string | null
  >(null);

  const handleFilterSelect = (filterId: string) => {
    if (activeSubDropdown === filterId) {
      setActiveSubDropdown(null);
      setSubDropdownPosition(null);
    } else {
      setActiveSubDropdown(filterId);
      setSubDropdownPosition({
        top: 300,
        left: 100,
      });
    }
  };

  const handleSortSelect = (sortId: string) => {
    if (activeSubDropdown === sortId) {
      setActiveSubDropdown(null);
      setSubDropdownPosition(null);
    } else {
      setSelectedSort(sortId);
      setActiveSubDropdown(sortId);
      setSubDropdownPosition({
        top: 150,
        left: 100,
      });
    }
  };

  const handleOptionSelect = (category: string, optionId: string) => {
    if (category === "sort") {
      setSelectedSort(optionId);
      setActiveSubDropdown(null);
    } else if (category.startsWith("sort_")) {
      // Handle sort sub-options
      const sortType = category.replace("sort_", "");
      setSelectedSortSubOptions((prev) => ({
        ...prev,
        [sortType]: optionId,
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(optionId)
          ? prev[category].filter((id) => id !== optionId)
          : [...prev[category], optionId],
      }));
    }
  };

  const applyFilters = () => {
    const filters: FilterOptions = {
      sortBy: selectedSort,
      professions: selectedFilters.profession,
      japaneseLevel: selectedFilters.japanese,
      salaryRange: [900, 1800], 
      commutingEase: selectedFilters.commuting,
      rating: selectedFilters.rating,
    };
    onApplyFilters(filters);
    onClose();
  };

  const clearAllFilters = () => {
    setSelectedSort("");
    setSelectedSortSubOptions({});
    setSelectedFilters({
      profession: [],
      japanese: [],
      salary: [],
      commuting: [],
      rating: [],
    });
    setActiveSubDropdown(null);
    setSubDropdownPosition(null);
    setActiveSalaryRangeDropdown(null);
  };

  const getSubOptions = (filterId: string) => {
    switch (filterId) {
      case "salary":
        if (
          activeSubDropdown === "salary" &&
          selectedSortSubOptions.salaryType
        ) {
          return (
            salaryAmountOptions[
              selectedSortSubOptions.salaryType as keyof typeof salaryAmountOptions
            ] || []
          );
        }
        return salaryTypeOptions;
      case "walkTime":
      case "commutingFromSchool":
        return timeOptions;
      case "profession":
        return professionOptions;
      case "japanese":
        return japaneseLevels;
      case "commuting":
        return commutingOptions;
      case "rating":
        return ratingOptions;
      case "publicationDate":
        return dateRangeOptions;
      default:
        return [];
    }
  };

  if (!visible) return null;

  // Sub-dropdown component
  const SubDropdown = () => {
    if (!activeSubDropdown || !subDropdownPosition) return null;

    const isFilterOption = filterOptions.find(
      (f) => f.id === activeSubDropdown
    );
    const isSortOption = sortOptions.find((s) => s.id === activeSubDropdown);
    const currentOption = isFilterOption || isSortOption;

    return (
      <View
        style={{
          position: "absolute",
          top: subDropdownPosition.top,
          left: subDropdownPosition.left,
          zIndex: 1002,
          backgroundColor: colors.background,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
          maxHeight: 350,
          width: 230,
        }}
      >
        {/* Sub-dropdown header */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text
            style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
          >
            {currentOption ? t(currentOption.label) : ""}
          </Text>
        </View>

        {/* Sub-dropdown close button */}
        <TouchableOpacity
          onPress={() => {
            setActiveSubDropdown(null);
            setSubDropdownPosition(null);
          }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1003,
            backgroundColor: colors.surface,
            borderRadius: 15,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <X size={16} color={colors.text} weight="bold" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Special handling for salary sort option */}
          {activeSubDropdown === "salary" && (
            <View style={{ padding: 12 }}>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  fontWeight: "bold",
                  marginBottom: 16,
                }}
              >
                {t("salary.selectTypeAndRange")}
              </Text>

              {salaryTypeOptions.map((typeOption) => (
                <View key={typeOption.id} style={{ marginBottom: 12 }}>
                  
                  <View
                    className="flex-row items-center justify-between"
                    style={{ marginBottom: 8 }}
                  >
                    <View className="flex-row items-center flex-1">
                      <Text style={{ fontSize: 16, marginRight: 8 }}>
                        {typeOption.icon}
                      </Text>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        {t(typeOption.label)}:
                      </Text>
                    </View>

                    {/* Select dropdown for salary amounts */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.surface,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.border,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        minWidth: 120,
                        maxWidth: 140,
                      }}
                      onPress={() => {
                        setActiveSalaryRangeDropdown(typeOption.id);
                        setSelectedSortSubOptions((prev) => ({
                          ...prev,
                          salaryType: typeOption.id,
                        }));
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {selectedSortSubOptions.salaryType === typeOption.id &&
                        selectedSortSubOptions.salaryAmount
                          ? salaryAmountOptions[
                              typeOption.id as keyof typeof salaryAmountOptions
                            ]?.find(
                              (opt) =>
                                opt.id === selectedSortSubOptions.salaryAmount
                            )?.label || t("salary.selectRange")
                          : t("salary.selectRange")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Regular sub-options for other sort and filter options */}
          {activeSubDropdown !== "salary" &&
            getSubOptions(activeSubDropdown).map((subOption) => {
              const isSelected = isSortOption
                ? selectedSortSubOptions[
                    activeSubDropdown as keyof typeof selectedSortSubOptions
                  ] === subOption.id
                : selectedFilters[activeSubDropdown]?.includes(subOption.id) ||
                  false;

              return (
                <SmallTextWithIcon
                  key={subOption.id}
                  icon={subOption.icon}
                  text={
                    subOption.label.includes(".")
                      ? t(subOption.label)
                      : subOption.label
                  }
                  selected={isSelected}
                  onPress={() => {
                    if (isSortOption) {
                      setSelectedSortSubOptions((prev) => ({
                        ...prev,
                        [activeSubDropdown]: subOption.id,
                      }));
                    } else {
                      handleOptionSelect(activeSubDropdown, subOption.id);
                    }
                  }}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  };

  // Salary Range Modal Dropdown
  const SalaryRangeDropdown = () => {
    if (!activeSalaryRangeDropdown) return null;

    const salaryType = activeSalaryRangeDropdown;
    const amountOptions =
      salaryAmountOptions[salaryType as keyof typeof salaryAmountOptions] || [];
    const typeOption = salaryTypeOptions.find((opt) => opt.id === salaryType);

    return (
      <View
        style={{
          position: "absolute",
          top: 200,
          right: 20,
          zIndex: 1004,
          backgroundColor: colors.background,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 7,
          maxHeight: 300,
          width: 200,
        }}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text
            style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
          >
            {typeOption?.icon} {typeOption ? t(typeOption.label) : ""}{" "}
            {t("salary.range")}
          </Text>
        </View>

        {/* Close button */}
        <TouchableOpacity
          onPress={() => setActiveSalaryRangeDropdown(null)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1005,
            backgroundColor: colors.surface,
            borderRadius: 15,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <X size={16} color={colors.text} weight="bold" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {amountOptions.map((amountOption) => (
            <TouchableOpacity
              key={amountOption.id}
              onPress={() => {
                setSelectedSortSubOptions((prev) => ({
                  ...prev,
                  salaryAmount: amountOption.id,
                }));
                setActiveSalaryRangeDropdown(null);
              }}
              style={{
                backgroundColor:
                  selectedSortSubOptions.salaryAmount === amountOption.id
                    ? colors.primary + "20"
                    : "transparent",
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border + "30",
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Text style={{ fontSize: 16, marginRight: 8 }}>
                    {amountOption.icon}
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      fontWeight:
                        selectedSortSubOptions.salaryAmount === amountOption.id
                          ? "600"
                          : "400",
                    }}
                  >
                    {amountOption.label}
                  </Text>
                </View>
                {selectedSortSubOptions.salaryAmount === amountOption.id && (
                  <Check size={16} color={colors.primary} weight="bold" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 30,
          right: 0,
          zIndex: 1000,
          backgroundColor: colors.background,
          borderRadius: 12,
          margin: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
          maxHeight: "80%",
          width: 250,
        }}
      >
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1001,
            backgroundColor: colors.surface,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <X size={20} color={colors.text} weight="bold" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Sort Section */}
          <View
            className="flex-row justify-between items-center py-4 px-4"
            style={{
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
            >
              📊 {t("filter.sortBy")}
            </Text>
          </View>

          <View>
            {sortOptions.map((option) => (
              <SmallTextWithIcon
                key={option.id}
                icon={option.icon}
                text={t(option.label)}
                selected={selectedSort === option.id}
                onPress={() => handleSortSelect(option.id)}
              />
            ))}
          </View>

          {/* Filter Section */}
          <View
            className="flex-row justify-between items-center py-4 px-4"
            style={{
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
            >
              🔍 {t("filter.filters")}
            </Text>
          </View>

          <View>
            {filterOptions.map((option) => (
              <SmallTextWithIcon
                key={option.id}
                icon={option.icon}
                text={t(option.label)}
                selected={activeSubDropdown === option.id}
                onPress={() => handleFilterSelect(option.id)}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row p-4 gap-3 mt-4">
            <TouchableOpacity
              onPress={clearAllFilters}
              className="flex-1 py-3 px-4 rounded-lg border"
              style={{ borderColor: colors.border }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                🗑️ {t("filter.clearAll")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={applyFilters}
              className="flex-1 py-3 px-4 rounded-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                ✅ {t("filter.applyFilters")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Separate Sub-dropdown */}
      <SubDropdown />

      {/* Separate Salary Range Dropdown */}
      <SalaryRangeDropdown />
    </>
  );
}
