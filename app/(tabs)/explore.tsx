import { JobData } from "@/components/CardComponent";
import HeaderComponent from "@/components/HeaderComponent";
import ListComponent, { ListComponentRef } from "@/components/ListComponent";
import { useTheme } from "@/contexts/ThemeContext";
import jobData from "@/data/jobData.json";
import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const listComponentRef = useRef<ListComponentRef>(null);

  // Load jobs from JSON data
  useEffect(() => {
    setJobs(jobData.jobs as JobData[]);
  }, []);

  const handleJobStatusChange = (
    jobId: string,
    newStatus: JobData["status"]
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("Refreshing job list...");

    // Trigger refresh in ListComponent if it has a refresh method
    if (listComponentRef.current && listComponentRef.current.refreshData) {
      await listComponentRef.current.refreshData();
    }

    // Simulate minimum refresh time for better UX
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
        <HeaderComponent
          leftButton="List"
          title="選択した仕事"
          onLeftPress={() => console.log("List pressed")}
        />
        <ListComponent
          ref={listComponentRef}
          jobs={jobs}
          filterStatus="choosed"
          onJobStatusChange={handleJobStatusChange}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
              progressBackgroundColor={colors.surface}
            />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
