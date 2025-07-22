import { JobData } from "@/components/CardComponent";
import ContactModal from "@/components/ContactModal";
import { CustomBottomNav } from "@/components/CustomBottomNav";
import FilterDropdown, { FilterOptions } from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import SwipeableCard from "@/components/SwipeableCard";
import { useJobs } from "@/contexts/JobContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Heart, Trash } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const {
    getPendingJobs,
    updateJobStatus,
    jobs,
    isLoading,
    resetAllJobsToPending,
  } = useJobs();

  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    sortBy: "",
    professions: [],
    japaneseLevel: [],
    salaryRange: [900, 1800],
    commutingEase: [],
    rating: [],
  });

  useEffect(() => {
    if (!isLoading) {
      applyFiltersToJobs();
    }
  }, [currentFilters, isLoading]);

  // Load jobs on initial mount
  useEffect(() => {
    if (!isLoading && filteredJobs.length === 0) {
      applyFiltersToJobs();
    }
  }, [isLoading]);

  // Manage currentJobIndex when filteredJobs changes
  useEffect(() => {
    if (currentJobIndex >= filteredJobs.length && filteredJobs.length > 0) {
      setCurrentJobIndex(0);
    }
  }, [filteredJobs, currentJobIndex]);

  const applyFiltersToJobs = () => {
    // Get pending jobs from context
    let filtered = getPendingJobs();

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
        switch (currentFilters.sortBy) {
          case "salary":
            const aSalaryMatch = a.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
            const bSalaryMatch = b.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
            if (aSalaryMatch && bSalaryMatch) {
              const aMaxSalary = parseInt(aSalaryMatch[2].replace(",", ""));
              const bMaxSalary = parseInt(bSalaryMatch[2].replace(",", ""));
              return bMaxSalary - aMaxSalary; // Highest salary first
            }
            return 0;

          case "walkTime":
            const aWalkTime = parseInt(a.walkTime.replace(/[^\d]/g, "")) || 0;
            const bWalkTime = parseInt(b.walkTime.replace(/[^\d]/g, "")) || 0;
            return aWalkTime - bWalkTime; // Shortest time first

          case "rating":
            return parseFloat(b.rating) - parseFloat(a.rating); // Highest rating first

          default:
            return 0;
        }
      });
    }

    setFilteredJobs(filtered);
    setCurrentJobIndex(0); // Reset to first job when filters change
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setCurrentFilters(filters);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Reset all jobs to pending status (this fetches fresh jobs)
      await resetAllJobsToPending();

      // Reset filters to default
      setCurrentFilters({
        sortBy: "",
        professions: [],
        japaneseLevel: [],
        salaryRange: [900, 1800],
        commutingEase: [],
        rating: [],
      });

      // Reapply filters to refresh the job list
      await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay for better UX
      applyFiltersToJobs();

      // Reset current job index
      setCurrentJobIndex(0);
      setSwipeDirection(null);
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSwipeLeft = async (swipedJob: JobData) => {
    // Update job status in context
    await updateJobStatus(swipedJob.id.toString(), "refusal");

    // Remove job from filtered array immediately
    setFilteredJobs((prev) =>
      prev.filter((job) => job.id.toString() !== swipedJob.id.toString())
    );

    setSwipeDirection(null);
  };

  const handleSwipeRight = async (swipedJob: JobData) => {
    // Update job status in context
    await updateJobStatus(swipedJob.id.toString(), "choosed");

    // Remove job from filtered array immediately
    setFilteredJobs((prev) =>
      prev.filter((job) => job.id.toString() !== swipedJob.id.toString())
    );

    setSwipeDirection(null);
  };

  const handleSwipeStateChange = (direction: "left" | "right" | null) => {
    setSwipeDirection(direction);
  };

  const currentJob = filteredJobs[currentJobIndex];

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
        <HeaderComponent
          title={t("header.jobList")}
          leftButton="List"
          rightButton="Filter"
          onRightPress={() => setFilterVisible(true)}
        />

        <ScrollView
          contentContainerStyle={{ flex: 1, padding: 0 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]} // Android
              tintColor={colors.primary} // iOS
              title={t("common.pullToRefresh") || "Pull to refresh"}
              titleColor={colors.textSecondary}
            />
          }
        >
          <View className="flex-1 items-center justify-center absolute　left-4">
            {currentJob ? (
              <SwipeableCard
                key={`${currentJob.id}-${currentJobIndex}`}
                jobData={currentJob}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSwipeStateChange={handleSwipeStateChange}
                className=""
              />
            ) : (
              <View className="items-center">
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {t("home.allJobsCompleted")}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  {t("home.waitForNewJobs")}
                </Text>
              </View>
            )}
          </View>

          {/* Swipe Instructions */}
          {currentJob && (
            <View className="px-4" style={{ marginBottom: 20, bottom: 20, position: "absolute", left: 0, right: 0 }}>
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
                    color={
                      swipeDirection === "left"
                        ? "#642B9D"
                        : colors.textSecondary
                    }
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
                      swipeDirection === "right"
                        ? "#FF6060"
                        : colors.textSecondary
                    }
                    weight="fill"
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <FilterDropdown
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApplyFilters={handleApplyFilters}
          jobs={jobs}
        />

        <ContactModal
          visible={contactModalVisible}
          onClose={() => setContactModalVisible(false)}
          jobTitle={currentJob?.position}
          contactInfo={{
            phone: currentJob
              ? `+81-3-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`
              : "+81-3-1234-5678",
            email: currentJob
              ? `hr@${currentJob.company
                  .replace(/株式会社|有限会社/g, "")
                  .toLowerCase()
                  .replace(/\s+/g, "")}.co.jp`
              : "contact@company.co.jp",
            company: currentJob?.company || "Company",
          }}
        />

        <CustomBottomNav onContactPress={() => setContactModalVisible(true)} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 130,
    width: 290,
    bottom: 0,
    left: 0,
  },
});
