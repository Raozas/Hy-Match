import { JobData } from "@/components/CardComponent";
import FilterDropdown, { FilterOptions } from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import ListComponent from "@/components/ListComponent";
import { useJobs } from "@/contexts/JobContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChosenJobsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { getJobsByStatus, updateJobStatus, jobs } = useJobs();
  const [chosenJobs, setChosenJobs] = useState<JobData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    sortBy: "",
    sortOrder: "asc",
    professions: [],
    japaneseLevel: [],
    salaryRange: [900, 1800],
    commutingEase: [],
    rating: [],
  });

  // Refresh jobs when screen comes into focus or when jobs change
  useFocusEffect(
    useCallback(() => {
      const chosen = getJobsByStatus("choosed");
      setChosenJobs(chosen);
    }, [getJobsByStatus, jobs])
  );

  // Apply filters whenever chosenJobs or currentFilters change
  useEffect(() => {
    applyFiltersToJobs();
  }, [chosenJobs, currentFilters]);

  const applyFiltersToJobs = () => {
    let filtered = [...chosenJobs];

    // Filter by professions
    if (currentFilters.professions.length > 0) {
      filtered = filtered.filter((job) =>
        currentFilters.professions.includes(job.position)
      );
    }

    // Filter by Japanese level
    if (currentFilters.japaneseLevel.length > 0) {
      filtered = filtered.filter((job) =>
        currentFilters.japaneseLevel.includes(job.languageSkill)
      );
    }

    // Filter by salary range
    filtered = filtered.filter((job) => {
      const salaryMatch = job.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
      if (salaryMatch) {
        const minSalary = parseInt(salaryMatch[1].replace(",", ""));
        const maxSalary = parseInt(salaryMatch[2].replace(",", ""));
        const inRange =
          minSalary >= currentFilters.salaryRange[0] &&
          maxSalary <= currentFilters.salaryRange[1];
        return inRange;
      }
      return true;
    });

    // Filter by commuting ease
    if (currentFilters.commutingEase.length > 0) {
      filtered = filtered.filter((job) =>
        currentFilters.commutingEase.includes(job.walkTime)
      );
    }

    // Filter by rating
    if (currentFilters.rating.length > 0) {
      filtered = filtered.filter((job) => {
        const jobRating = parseFloat(job.rating);
        return currentFilters.rating.some((ratingFilter) => {
          const minRating = parseFloat(ratingFilter.replace("+", ""));
          return jobRating >= minRating;
        });
      });
    }

    // Sort the filtered jobs
    if (currentFilters.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (currentFilters.sortBy) {
          case "salary":
            const aSalaryMatch = a.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
            const bSalaryMatch = b.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
            if (aSalaryMatch && bSalaryMatch) {
              const aMaxSalary = parseInt(aSalaryMatch[2].replace(",", ""));
              const bMaxSalary = parseInt(bSalaryMatch[2].replace(",", ""));
              comparison = bMaxSalary - aMaxSalary;
            }
            break;

          case "walkTime":
          case "commutingFromSchool":
            const aWalkTime = parseInt(a.walkTime.replace(/[^\d]/g, "")) || 0;
            const bWalkTime = parseInt(b.walkTime.replace(/[^\d]/g, "")) || 0;
            comparison = aWalkTime - bWalkTime;
            break;

          case "rating":
            comparison = parseFloat(b.rating) - parseFloat(a.rating);
            break;

          case "publicationDate":
            const aId = parseInt(a.id) || 0;
            const bId = parseInt(b.id) || 0;
            comparison = bId - aId;
            break;

          default:
            comparison = 0;
        }

        // Apply sort order (asc/desc)
        return currentFilters.sortOrder === "desc" ? comparison : -comparison;
      });
    }

    setFilteredJobs(filtered);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setCurrentFilters(filters);
  };

  const handleJobStatusChange = async (
    jobId: string,
    newStatus: JobData["status"]
  ) => {
    // Update job status using context
    await updateJobStatus(jobId, newStatus);

    // Update local state to reflect changes
    const updatedJobs = chosenJobs.filter(
      (job) => job.id.toString() !== jobId || newStatus === "choosed"
    );
    setChosenJobs(updatedJobs);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <HeaderComponent
        leftButton="Back"
        title={t("header.chosenJobs")}
        onLeftPress={() => router.navigate("/(tabs)")}
        rightButton="Filter"
        onRightPress={() => setFilterVisible(true)}
      />

      <View className="flex-1">
        <ListComponent
          jobs={filteredJobs}
          filterStatus="choosed"
          onJobStatusChange={handleJobStatusChange}
        />
      </View>

      <FilterDropdown
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApplyFilters={handleApplyFilters}
        jobs={chosenJobs}
      />
    </SafeAreaView>
  );
}
