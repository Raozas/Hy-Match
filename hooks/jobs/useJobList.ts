import { useCallback, useEffect, useState } from "react";
import { JobData } from "../../components/CardComponent";
import { useJobs } from "../../contexts/JobContext";

export const useJobList = (status?: JobData["status"]) => {
  const {
    jobs,
    getJobsByStatus,
    getPendingJobs,
    updateJobStatus,
    refreshJobs,
    isLoading,
  } = useJobs();

  const [jobList, setJobList] = useState<JobData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadJobs = useCallback(() => {
    if (status) {
      const statusJobs = getJobsByStatus(status);
      setJobList(statusJobs);
    } else {
      const pendingJobs = getPendingJobs();
      setJobList(pendingJobs);
    }
  }, [status, getJobsByStatus, getPendingJobs]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshJobs();
      loadJobs();
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshJobs, loadJobs]);

  const handleJobStatusChange = useCallback(
    async (jobId: string, newStatus: JobData["status"]) => {
      try {
        await updateJobStatus(jobId, newStatus);

        if (status && status !== newStatus) {
          // Remove from current list if status changed
          setJobList((prev) => prev.filter((job) => job.id !== jobId));
        } else {
          // Reload jobs if no specific status filter
          loadJobs();
        }
      } catch (error) {
        console.error("Error updating job status:", error);
      }
    },
    [updateJobStatus, status, loadJobs]
  );

  useEffect(() => {
    if (!isLoading) {
      if (status) {
        const statusJobs = getJobsByStatus(status);
        setJobList(statusJobs);
      } else {
        const pendingJobs = getPendingJobs();
        setJobList(pendingJobs);
      }
    }
  }, [jobs, isLoading, status]);

  return {
    jobList,
    isRefreshing,
    isLoading,
    handleRefresh,
    handleJobStatusChange,
    loadJobs,
  };
};
