import { JobData } from "@/components/CardComponent";
import FilterDropdown, { FilterOptions } from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import SwipeableCard from "@/components/SwipeableCard";
import { useTheme } from "@/contexts/ThemeContext";
import { Heart, Trash } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import jobDataJson from "../../data/jobData.json";
import "../../global.css";

export default function HomeScreen() {
  const { colors } = useTheme();

  const jobData = jobDataJson as { jobs: JobData[] };
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    sortBy: "",
    professions: [],
    japaneseLevel: [],
    salaryRange: [900, 1800],
    commutingEase: [],
    rating: [],
  });

  useEffect(() => {
    // Simple initialization with JSON data
    console.log("Loading jobs from JSON...");
    setJobs(jobData.jobs);
    console.log(`Loaded ${jobData.jobs.length} jobs`);
  }, []);

  useEffect(() => {
    applyFiltersToJobs();
  }, [jobs, currentFilters]);

  const applyFiltersToJobs = () => {
    let filtered = [...jobs];

    // Filter to only show pending jobs (not already swiped)
    filtered = filtered.filter((job) => job.status === "pending");

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

  const handleSwipeLeft = async (swipedJob: JobData) => {
    console.log(`Refused job ${swipedJob.id}, moving to next`);

    // Update local state only (no database)
    const updatedJobs = jobs.map((job) =>
      job.id === swipedJob.id ? { ...job, status: "refusal" as const } : job
    );
    setJobs(updatedJobs);

    const newIndex = currentJobIndex + 1;
    setCurrentJobIndex(newIndex);
    setSwipeDirection(null);
  };

  const handleSwipeRight = async (swipedJob: JobData) => {
    console.log(`Chose job ${swipedJob.id}, moving to next`);

    // Update local state only (no database)
    const updatedJobs = jobs.map((job) =>
      job.id === swipedJob.id ? { ...job, status: "choosed" as const } : job
    );
    setJobs(updatedJobs);

    const newIndex = currentJobIndex + 1;
    setCurrentJobIndex(newIndex);
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
          leftButton="List"
          title="仕事一覧"
          rightButton="Filter"
          onLeftPress={() => console.log("List pressed")}
          onRightPress={() => {
            console.log("Filter button pressed");
            setFilterVisible(true);
          }}
        />

        <View className="flex-1 items-center justify-center mt-[-40px]">
          {currentJob ? (
            <SwipeableCard
              jobData={currentJob}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeStateChange={handleSwipeStateChange}
              className=""
            />
          ) : (
            <View className="items-center">
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}
              >
                すべての仕事を確認しました！
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 14,
                  marginTop: 8,
                }}
              >
                新しい仕事が追加されるまでお待ちください
              </Text>
            </View>
          )}
        </View>

        <FilterDropdown
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApplyFilters={handleApplyFilters}
          jobs={jobs}
        />

        {/* Swipe Instructions */}
        {currentJob && (
          <View className="px-4" style={{ marginBottom: 20 }}>
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
                    swipeDirection === "left" ? "#642B9D" : colors.textSecondary
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
