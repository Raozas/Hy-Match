import FilterDropdown from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import ListComponent from "@/components/ListComponent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useJobFiltering } from "@/hooks/jobs/useJobFiltering";
import { useJobList } from "@/hooks/jobs/useJobList";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RefusedJobsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [filterVisible, setFilterVisible] = useState(false);

  const { jobList: refusedJobs, handleJobStatusChange } = useJobList("refusal");

  const { filteredJobs, handleApplyFilters } = useJobFiltering(refusedJobs);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <HeaderComponent
        leftButton="Back"
        title={t("header.refusedJobs")}
        onLeftPress={() => router.navigate("/(tabs)")}
        rightButton="Filter"
        onRightPress={() => setFilterVisible(true)}
      />

      <View className="flex-1">
        <ListComponent
          jobs={filteredJobs}
          filterStatus="refusal"
          onJobStatusChange={handleJobStatusChange}
        />
      </View>

      <FilterDropdown
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApplyFilters={handleApplyFilters}
        jobs={refusedJobs}
      />
    </SafeAreaView>
  );
}
