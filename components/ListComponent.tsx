import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import jobDataJson from "../data/jobData.json";
import { JobData } from "./CardComponent";
import HeaderComponent from "./HeaderComponent";
import JobListItem from "./JobListItem";

interface ListComponentProps {
  filterStatus?: "all" | "pending" | "choosed" | "refusal";
  title?: string;
  showHeader?: boolean;
}

export default function ListComponent({
  filterStatus = "all",
  title = "Job List",
  showHeader = false,
}: ListComponentProps) {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "choosed" | "refusal"
  >(filterStatus);

  // Type assertion for the imported JSON data
  const jobData = jobDataJson as { jobs: JobData[] };
  const [jobs, setJobs] = useState<JobData[]>(jobData.jobs);

  // Filter jobs based on status
  const filteredJobs =
    selectedFilter === "all"
      ? jobs
      : jobs.filter((job) => job.status === selectedFilter);

  const handleStatusChange = (jobId: string, newStatus: JobData["status"]) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FFA500";
      case "choosed":
        return "#4CAF50";
      case "refusal":
        return "#F44336";
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "保留中";
      case "choosed":
        return "選択済み";
      case "refusal":
        return "拒否済み";
      default:
        return status;
    }
  };

  const FilterButton = ({
    filter,
    label,
  }: {
    filter: typeof selectedFilter;
    label: string;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(filter)}
      className={`px-4 py-2 rounded-full border ${
        selectedFilter === filter ? "border-blue-500" : "border-gray-300"
      }`}
      style={{
        backgroundColor:
          selectedFilter === filter ? colors.primary : colors.surface,
        borderColor: selectedFilter === filter ? colors.primary : colors.border,
      }}
    >
      <Text
        style={{
          color: selectedFilter === filter ? "white" : colors.text,
          fontWeight: selectedFilter === filter ? "600" : "400",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      {showHeader && (
        <HeaderComponent
          leftButton="Back"
          title={title}
          rightButton="Filter"
          onLeftPress={() => console.log("Back pressed")}
          onRightPress={() => console.log("Filter pressed")}
        />
      )}

      <View className="flex-1 px-4 mt-[-50px]">
        {/* Filter Buttons */}
        <View className="flex-row gap-3 py-4">
          <FilterButton filter="all" label="全て" />
          <FilterButton filter="pending" label="保留中" />
          <FilterButton filter="choosed" label="選択済み" />
          <FilterButton filter="refusal" label="拒否済み" />
        </View>

        {/* Job Count */}
        <View className="flex-row items-center justify-between mb-4">
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
            {filteredJobs.length} 件の仕事
          </Text>
          <View className="flex-row items-center gap-2">
            <View
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getStatusColor(selectedFilter) }}
            />
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              {selectedFilter === "all"
                ? "全ステータス"
                : getStatusText(selectedFilter)}
            </Text>
          </View>
        </View>

        {/* Jobs List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {filteredJobs.length > 0 ? (
            <View className="mx-[-7px]">
              {filteredJobs.map((job, index) => (
                <View key={job.id} className="relative">
                  {/* Status Badge */}
                  <View
                    className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full"
                    style={{ backgroundColor: getStatusColor(job.status) }}
                  >
                    <Text className="text-white text-xs font-semibold">
                      {getStatusText(job.status)}
                    </Text>
                  </View>

                  {/* Job List Item */}
                  <JobListItem
                    jobData={job}
                    className="w-full"
                    onPress={() => console.log(`Selected job: ${job.id}`)}
                    onStatusChange={handleStatusChange}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {selectedFilter === "all"
                  ? "仕事が見つかりませんでした"
                  : `${getStatusText(selectedFilter)}の仕事はありません`}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
