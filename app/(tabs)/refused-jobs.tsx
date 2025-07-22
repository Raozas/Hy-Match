import { JobData } from "@/components/CardComponent";
import HeaderComponent from "@/components/HeaderComponent";
import ListComponent from "@/components/ListComponent";
import { useJobs } from "@/contexts/JobContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RefusedJobsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { getJobsByStatus, updateJobStatus, jobs } = useJobs();
  const [refusedJobs, setRefusedJobs] = useState<JobData[]>([]);

  // Refresh jobs when screen comes into focus or when jobs change
  useFocusEffect(
    useCallback(() => {
      const refused = getJobsByStatus("refusal");
      setRefusedJobs(refused);
    }, [getJobsByStatus, jobs])
  );

  const handleJobStatusChange = async (
    jobId: string,
    newStatus: JobData["status"]
  ) => {
    // Update job status using context
    await updateJobStatus(jobId, newStatus);

    // Update local state to reflect changes
    const updatedJobs = refusedJobs.filter(
      (job) => job.id.toString() !== jobId || newStatus === "refusal"
    );
    setRefusedJobs(updatedJobs);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <HeaderComponent
        leftButton="Back"
        title={t("header.refusedJobs")}
        onLeftPress={() => router.navigate("/(tabs)")}
      />

      <View className="flex-1">
        <ListComponent
          jobs={refusedJobs}
          filterStatus="refusal"
          onJobStatusChange={handleJobStatusChange}
        />
      </View>
    </SafeAreaView>
  );
}
