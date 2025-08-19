import ContactModal from "@/components/ContactModal";
import { CustomBottomNav } from "@/components/CustomBottomNav";
import FilterDropdown from "@/components/FilterDropdown";
import HeaderComponent from "@/components/HeaderComponent";
import SwipeableCard from "@/components/SwipeableCard";
import { EmptyState } from "@/components/jobs/EmptyState";
import { SwipeInstructions } from "@/components/jobs/SwipeInstructions";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useSwipeableCards } from "@/hooks/jobs/useSwipeableCards";
import React, { useCallback, useMemo, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [filterVisible, setFilterVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const {
    currentJob,
    nextCards,
    swipeDirection,
    refreshing,
    isLoading,
    filteredJobs,
    handleSwipeLeft,
    handleSwipeRight,
    handleSwipeStateChange,
    onRefresh,
    handleApplyFilters,
  } = useSwipeableCards();

  // Memoize handlers to prevent unnecessary re-renders
  const handleFilterPress = useCallback(() => setFilterVisible(true), []);
  const handleFilterClose = useCallback(() => setFilterVisible(false), []);
  const handleContactPress = useCallback(
    () => setContactModalVisible(true),
    []
  );
  const handleContactClose = useCallback(
    () => setContactModalVisible(false),
    []
  );

  // Memoize contact info to prevent recalculation
  const contactInfo = useMemo(
    () => ({
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
    }),
    [currentJob]
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
        <HeaderComponent
          title={t("header.jobList")}
          leftButton="List"
          rightButton="Filter"
          onRightPress={handleFilterPress}
        />

        <ScrollView
          contentContainerStyle={{ flex: 1, padding: 0 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
              title={t("common.pullToRefresh") || "Pull to refresh"}
              titleColor={colors.textSecondary}
            />
          }
        >
          <View className="flex-1 items-center justify-center absolute left-4">
            {currentJob ? (
              <SwipeableCard
                key={currentJob.id} 
                jobData={currentJob}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSwipeStateChange={handleSwipeStateChange}
                className=""
                nextCards={nextCards}
                maxVisibleCards={3}
              />
            ) : (
              <EmptyState />
            )}
          </View>

          {currentJob && <SwipeInstructions swipeDirection={swipeDirection} />}
        </ScrollView>

        <FilterDropdown
          visible={filterVisible}
          onClose={handleFilterClose}
          onApplyFilters={handleApplyFilters}
          jobs={filteredJobs}
        />

        <ContactModal
          visible={contactModalVisible}
          onClose={handleContactClose}
          jobTitle={currentJob?.position}
          contactInfo={contactInfo}
        />

        <CustomBottomNav onContactPress={handleContactPress} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
