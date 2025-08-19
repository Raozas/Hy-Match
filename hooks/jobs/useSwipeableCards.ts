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

  // Memoize current job and next cards for better performance
  const currentJob = useMemo(
    () =>
      currentJobIndex < filteredJobs.length
        ? filteredJobs[currentJobIndex]
        : null,
    [currentJobIndex, filteredJobs]
  );

  const nextCards = useMemo(
    () => filteredJobs.slice(currentJobIndex + 1, currentJobIndex + 4),
    [filteredJobs, currentJobIndex]
  );

  const handleSwipeLeft = useCallback(
    async (swipedJob: JobData) => {
      // Clear swipe direction immediately to prevent state bleed
      setSwipeDirection(null);

      // Optimistic update for better UX
      setCurrentJobIndex((prev) => prev + 1);

      // Update job status asynchronously
      try {
        await updateJobStatus(swipedJob.id.toString(), "refusal");
      } catch (error) {
        console.error("Error updating job status:", error);
        // Revert on error
        setCurrentJobIndex((prev) => Math.max(0, prev - 1));
      }
    },
    [updateJobStatus]
  );

  const handleSwipeRight = useCallback(
    async (swipedJob: JobData) => {
      // Clear swipe direction immediately to prevent state bleed
      setSwipeDirection(null);

      // Optimistic update for better UX
      setCurrentJobIndex((prev) => prev + 1);

      // Update job status asynchronously
      try {
        await updateJobStatus(swipedJob.id.toString(), "choosed");
      } catch (error) {
        console.error("Error updating job status:", error);
        // Revert on error
        setCurrentJobIndex((prev) => Math.max(0, prev - 1));
      }
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
