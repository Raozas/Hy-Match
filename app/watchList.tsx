import CardComponent, { JobData } from "@/components/CardComponent";
import ContactModal from "@/components/ContactModal";
import FilterDropdown from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import JobListItem from "@/components/JobListItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useJobFiltering } from "@/hooks/jobs/useJobFiltering";
import { useJobList } from "@/hooks/jobs/useJobList";
import { router } from "expo-router";
import { X } from "phosphor-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WatchListScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [isJobDetailModalVisible, setIsJobDetailModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  const { jobList, isRefreshing, handleRefresh, handleJobStatusChange } =
    useJobList(); // Get pending jobs

  const { filteredJobs, handleApplyFilters } = useJobFiltering(jobList);

  const handleJobPress = (job: JobData) => {
    setSelectedJob(job);
    setIsJobDetailModalVisible(true);
  };

  const handleContactPress = () => {
    setIsJobDetailModalVisible(false);
    setIsContactModalVisible(true);
  };

  const closeJobDetailModal = () => {
    setIsJobDetailModalVisible(false);
    setSelectedJob(null);
  };

  const closeContactModal = () => {
    setIsContactModalVisible(false);
  };

  const renderJobItem = ({ item }: { item: JobData }) => (
    <JobListItem
      jobData={item}
      onStatusChange={handleJobStatusChange}
      onPress={() => handleJobPress(item)}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <HeaderComponent
        title={t("watchList.title")}
        leftButton="Back"
        onLeftPress={() => router.back()}
        rightButton="Filter"
        onRightPress={() => setIsFilterVisible(true)}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            📥 {t("watchList.newJobs")}
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            {filteredJobs.length} {t("list.jobsCount")}
          </Text>
        </View>

        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {jobList.length === 0 ? (
                <>
                  <Text
                    style={[styles.emptyText, { color: colors.textSecondary }]}
                  >
                    ⏳ {t("list.loading")}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={[styles.emptyText, { color: colors.textSecondary }]}
                  >
                    📭 {t("watchList.noNewJobs")}
                  </Text>
                  <Text
                    style={[
                      styles.emptySubtext,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {t("watchList.checkBackLater")}
                  </Text>
                </>
              )}
            </View>
          }
        />
      </View>

      <FilterDropdown
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApplyFilters={handleApplyFilters}
        jobs={jobList}
      />

      <Modal
        visible={isJobDetailModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeJobDetailModal}
      >
        <SafeAreaView
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("list.jobDetails")}
            </Text>
            <TouchableOpacity
              onPress={closeJobDetailModal}
              style={[styles.closeButton, { backgroundColor: colors.surface }]}
            >
              <X size={20} color={colors.text} weight="bold" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            {selectedJob && <CardComponent jobData={selectedJob} />}
          </View>

          <View style={styles.contactButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.contactButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={handleContactPress}
            >
              <Text style={styles.contactButtonText}>
                📞 {t("contact.howToContact")}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <ContactModal
        visible={isContactModalVisible}
        onClose={closeContactModal}
        jobTitle={selectedJob?.position}
        contactInfo={{
          company: selectedJob?.company,
          phone: "+81-3-1234-5678",
          email: "contact@company.com",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  contactButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  contactButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  contactButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});
