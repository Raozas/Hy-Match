import { useCallback, useEffect, useMemo, useState } from "react";
import { JobData } from "../../components/CardComponent";
import { useJobs } from "../../contexts/JobContext";
import { useJobFiltering } from "./useJobFiltering";

export const useSwipeableCards = () => {
  const { jobs, updateJobStatus, resetAllJobsToPending, isLoading } = useJobs();

  // Memoize pending jobs to prevent unnecessary re-renders
  const pendingJobs = useMemo(
    () => jobs.filter((job) => job.status === "pending"),
    [jobs]
  );

  const { filteredJobs, handleApplyFilters, resetFilters } =
    useJobFiltering(pendingJobs);

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const currentJob =
    currentJobIndex < filteredJobs.length
      ? filteredJobs[currentJobIndex]
      : null;
  const nextCards = filteredJobs.slice(
    currentJobIndex + 1,
    currentJobIndex + 4
  );

  const handleSwipeLeft = useCallback(
    async (swipedJob: JobData) => {
      await updateJobStatus(swipedJob.id.toString(), "refusal");
      setCurrentJobIndex((prev) => prev + 1);
      setSwipeDirection(null);
    },
    [updateJobStatus]
  );

  const handleSwipeRight = useCallback(
    async (swipedJob: JobData) => {
      await updateJobStatus(swipedJob.id.toString(), "choosed");
      setCurrentJobIndex((prev) => prev + 1);
      setSwipeDirection(null);
    },
    [updateJobStatus]
  );

  const handleSwipeStateChange = useCallback(
    (direction: "left" | "right" | null) => {
      setSwipeDirection(direction);
    },
    []
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await resetAllJobsToPending();
      resetFilters();
      setCurrentJobIndex(0);
      setSwipeDirection(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    } finally {
      setRefreshing(false);
    }
  }, [resetAllJobsToPending, resetFilters]);

  // Reset current job index when filtered jobs change, but only if we're beyond the available jobs
  useEffect(() => {
    if (filteredJobs.length > 0 && currentJobIndex >= filteredJobs.length) {
      setCurrentJobIndex(0);
    }
  }, [filteredJobs.length]);

  return {
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
  };
};
