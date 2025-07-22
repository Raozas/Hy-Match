import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "phosphor-react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardComponent, { JobData } from "./CardComponent";
import HeaderComponent from "./HeaderComponent";
import JobListItem from "./JobListItem";

interface ListComponentProps {
  jobs?: JobData[]; // Accept jobs as props instead of loading from database
  filterStatus?: "all" | "pending" | "choosed" | "refusal";
  title?: string;
  showHeader?: boolean;
  refreshControl?: React.ReactElement<any>;
  onJobStatusChange?: (jobId: string, newStatus: JobData["status"]) => void; // Callback for status changes
}

export interface ListComponentRef {
  refreshData: () => Promise<void>;
}

const ListComponent = forwardRef<ListComponentRef, ListComponentProps>(
  (
    {
      jobs = [], // Default to empty array
      filterStatus = "all",
      title = "Job List",
      showHeader = false,
      refreshControl,
      onJobStatusChange,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const { t } = useLanguage();

    const [displayJobs, setDisplayJobs] = useState<JobData[]>(jobs);
    const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Update display jobs when props change
    useEffect(() => {
      setDisplayJobs(jobs);
    }, [jobs]);

    useImperativeHandle(ref, () => ({
      refreshData: async () => {
        // Since we're using props, no additional refresh needed
      },
    }));

    // Use all jobs (no filtering)
    const filteredJobs = displayJobs;

    const handleStatusChange = (
      jobId: string,
      newStatus: JobData["status"]
    ) => {
      // Update local state
      const updatedJobs = displayJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      );
      setDisplayJobs(updatedJobs);

      // Call parent callback if provided
      if (onJobStatusChange) {
        onJobStatusChange(jobId, newStatus);
      }
    };

    const handleJobPress = (job: JobData) => {
      setSelectedJob(job);
      setIsModalVisible(true);
    };

    const closeModal = () => {
      setIsModalVisible(false);
      setSelectedJob(null);
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
          return t("filter.pending");
        case "choosed":
          return t("filter.chosen");
        case "refusal":
          return t("filter.refused");
        default:
          return status;
      }
    };

    const getStatusCount = () => {
      return displayJobs.length;
    };

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
          <View className="flex-row items-center justify-between mb-4 mt-4">
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}
            >
              {filteredJobs.length} {t("list.jobsCount")}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={refreshControl}
          >
            {isLoading ? (
              <View className="flex-1 items-center justify-center py-20">
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {t("list.loading")}
                </Text>
              </View>
            ) : filteredJobs.length > 0 ? (
              <View className="mx-[-7px]">
                {filteredJobs.map((job, index) => (
                  <View key={job.id} className="relative">
                    <View
                      className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full"
                      style={{ backgroundColor: getStatusColor(job.status) }}
                    >
                      <Text className="text-white text-xs font-semibold">
                        {getStatusText(job.status)}
                      </Text>
                    </View>

                    <JobListItem
                      jobData={job}
                      className="w-full"
                      onPress={() => handleJobPress(job)}
                      onStatusChange={(jobId, newStatus) =>
                        handleStatusChange(jobId, newStatus)
                      }
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
                  {t("list.noJobsFound")}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: 20,
                paddingTop: 20,
                paddingBottom: 20,
                margin: 20,
                width: "95%",
                maxHeight: "90%",
              }}
            >
              <View className="flex-row justify-between items-center mb-4">
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "600",
                    marginLeft: 20,
                  }}
                >
                  {t("list.jobDetails")}
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={{
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: colors.surface,
                  }}
                >
                  <X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {selectedJob && (
                  <View className="items-center">
                    <CardComponent jobData={selectedJob} />
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
);

ListComponent.displayName = "ListComponent";

export default ListComponent;
