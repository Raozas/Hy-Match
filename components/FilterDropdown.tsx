import { useTheme } from "@/contexts/ThemeContext";
import { CaretDown, CaretUp, Check, X } from "phosphor-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { JobData } from "./CardComponent";

interface FilterDropdownProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  jobs: JobData[];
}

export interface SortOption {
  id: string;
  label: string;
  value: "salary" | "walkTime" | "commutingFromSchool" | "publicationDate";
}

export interface FilterOptions {
  sortBy: string;
  professions: string[];
  japaneseLevel: string[];
  salaryRange: [number, number];
  commutingEase: string[];
  rating: string[];
}

const sortOptions: SortOption[] = [
  { id: "salary", label: "By Salary", value: "salary" },
  { id: "walkTime", label: "Commuting Time (from Home)", value: "walkTime" },
  {
    id: "commutingFromSchool",
    label: "Commuting Time (from School)",
    value: "commutingFromSchool",
  },
  {
    id: "publicationDate",
    label: "By Publication Date",
    value: "publicationDate",
  },
];

const professionOptions = [
  "仕分け",
  "配送",
  "清掃",
  "レジ",
  "倉庫作業",
  "調理補助",
  "データ入力",
  "販売員",
  "事務補助",
  "梱包作業",
  "受付",
  "ピッキング",
  "製造補助",
];

const japaneseLevels = ["N1", "N2", "N3", "N4", "N5"];

const commutingEaseOptions = ["~5分", "~10分", "~15分", "~20分", "~25分"];

const ratingOptions = ["3.0+", "3.5+", "4.0+", "4.5+"];

export default function FilterDropdown({
  visible,
  onClose,
  onApplyFilters,
  jobs,
}: FilterDropdownProps) {
  const { colors } = useTheme();

  const [sortBy, setSortBy] = useState<string>("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedJapaneseLevels, setSelectedJapaneseLevels] = useState<
    string[]
  >([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([900, 1800]);
  const [selectedCommutingEase, setSelectedCommutingEase] = useState<string[]>(
    []
  );
  const [selectedRating, setSelectedRating] = useState<string[]>([]);

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    sort: true,
    profession: false,
    japanese: false,
    salary: false,
    commuting: false,
    rating: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleProfession = (profession: string) => {
    setSelectedProfessions((prev) =>
      prev.includes(profession)
        ? prev.filter((p) => p !== profession)
        : [...prev, profession]
    );
  };

  const toggleJapaneseLevel = (level: string) => {
    setSelectedJapaneseLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleCommutingEase = (ease: string) => {
    setSelectedCommutingEase((prev) =>
      prev.includes(ease) ? prev.filter((e) => e !== ease) : [...prev, ease]
    );
  };

  const toggleRating = (rating: string) => {
    setSelectedRating((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const applyFilters = () => {
    const filters: FilterOptions = {
      sortBy,
      professions: selectedProfessions,
      japaneseLevel: selectedJapaneseLevels,
      salaryRange,
      commutingEase: selectedCommutingEase,
      rating: selectedRating,
    };
    onApplyFilters(filters);
    onClose();
  };

  const clearAllFilters = () => {
    setSortBy("");
    setSelectedProfessions([]);
    setSelectedJapaneseLevels([]);
    setSalaryRange([900, 1800]);
    setSelectedCommutingEase([]);
    setSelectedRating([]);
  };

  if (!visible) return null;

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: string;
  }) => (
    <TouchableOpacity
      onPress={() => toggleSection(section)}
      className="flex-row justify-between items-center py-3 px-4"
      style={{ backgroundColor: colors.surface }}
    >
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
        {title}
      </Text>
      {expandedSections[section] ? (
        <CaretUp size={20} color={colors.text} />
      ) : (
        <CaretDown size={20} color={colors.text} />
      )}
    </TouchableOpacity>
  );

  const OptionItem = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-2 px-4"
      style={{
        backgroundColor: selected ? colors.primary + "20" : "transparent",
      }}
    >
      <Text style={{ color: colors.text, fontSize: 14 }}>{label}</Text>
      {selected && <Check size={16} color={colors.primary} weight="bold" />}
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        position: "absolute",
        top: 30,
        right: 0,
        left: 0,
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
        {/* Sort By Section */}
        <SectionHeader title="Sort by:" section="sort" />
        {expandedSections.sort && (
          <View>
            {sortOptions.map((option) => (
              <OptionItem
                key={option.id}
                label={option.label}
                selected={sortBy === option.id}
                onPress={() => setSortBy(option.id)}
              />
            ))}
          </View>
        )}

        {/* Profession Filter */}
        <SectionHeader title="Desired Profession" section="profession" />
        {expandedSections.profession && (
          <View>
            {professionOptions.map((profession) => (
              <OptionItem
                key={profession}
                label={profession}
                selected={selectedProfessions.includes(profession)}
                onPress={() => toggleProfession(profession)}
              />
            ))}
          </View>
        )}

        {/* Japanese Level Filter */}
        <SectionHeader title="Japanese Level" section="japanese" />
        {expandedSections.japanese && (
          <View className="flex-row flex-wrap p-4">
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => toggleJapaneseLevel(level)}
                className="m-1 px-3 py-2 rounded-full border"
                style={{
                  backgroundColor: selectedJapaneseLevels.includes(level)
                    ? colors.primary
                    : colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: selectedJapaneseLevels.includes(level)
                      ? "white"
                      : colors.text,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Salary Range */}
        <SectionHeader title="Salary Range" section="salary" />
        {expandedSections.salary && (
          <View className="p-4">
            <Text
              style={{ color: colors.text, fontSize: 14, marginBottom: 10 }}
            >
              ¥{salaryRange[0]} - ¥{salaryRange[1]}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              Use buttons below to adjust salary range:
            </Text>
            <View className="flex-row justify-between mb-3">
              <TouchableOpacity
                onPress={() =>
                  setSalaryRange([
                    Math.max(900, salaryRange[0] - 50),
                    salaryRange[1],
                  ])
                }
                className="px-3 py-2 rounded"
                style={{ backgroundColor: colors.surface }}
              >
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  Min -50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSalaryRange([
                    Math.min(1750, salaryRange[0] + 50),
                    salaryRange[1],
                  ])
                }
                className="px-3 py-2 rounded"
                style={{ backgroundColor: colors.surface }}
              >
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  Min +50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSalaryRange([
                    salaryRange[0],
                    Math.max(950, salaryRange[1] - 50),
                  ])
                }
                className="px-3 py-2 rounded"
                style={{ backgroundColor: colors.surface }}
              >
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  Max -50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSalaryRange([
                    salaryRange[0],
                    Math.min(1800, salaryRange[1] + 50),
                  ])
                }
                className="px-3 py-2 rounded"
                style={{ backgroundColor: colors.surface }}
              >
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  Max +50
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Commuting Ease */}
        <SectionHeader title="Commuting Ease" section="commuting" />
        {expandedSections.commuting && (
          <View>
            {commutingEaseOptions.map((ease) => (
              <OptionItem
                key={ease}
                label={ease}
                selected={selectedCommutingEase.includes(ease)}
                onPress={() => toggleCommutingEase(ease)}
              />
            ))}
          </View>
        )}

        {/* Rating */}
        <SectionHeader title="Rating" section="rating" />
        {expandedSections.rating && (
          <View>
            {ratingOptions.map((rating) => (
              <OptionItem
                key={rating}
                label={rating}
                selected={selectedRating.includes(rating)}
                onPress={() => toggleRating(rating)}
              />
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row p-4 gap-3">
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
              }}
            >
              Clear All
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
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
