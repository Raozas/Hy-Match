import { JobData } from "@/components/CardComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import jobDataJson from "../data/jobData.json";

interface JobContextType {
  jobs: JobData[];
  updateJobStatus: (
    jobId: string,
    newStatus: JobData["status"]
  ) => Promise<void>;
  getJobsByStatus: (status: JobData["status"]) => JobData[];
  getPendingJobs: () => JobData[];
  refreshJobs: () => Promise<void>;
  resetAllJobsToPending: () => Promise<void>;
  clearStorage: () => Promise<void>;
  isLoading: boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEY = "hymatch_jobs";

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Save jobs to storage
  const saveJobs = useCallback(async (updatedJobs: JobData[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
      console.log("Jobs saved to storage");
    } catch (error) {
      console.error("Error saving jobs:", error);
    }
  }, []);

  // Load jobs from storage or use default data
  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedJobs = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedJobs) {
        const parsedJobs = JSON.parse(storedJobs) as JobData[];
        setJobs(parsedJobs);
        console.log(`Loaded ${parsedJobs.length} jobs from storage`);
      } else {
        // First time - use initial data from JSON
        const initialJobs = (jobDataJson as { jobs: JobData[] }).jobs;
        setJobs(initialJobs);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobs));
        console.log(`Initialized with ${initialJobs.length} jobs from JSON`);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      // Fallback to JSON data
      const fallbackJobs = (jobDataJson as { jobs: JobData[] }).jobs;
      setJobs(fallbackJobs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update job status
  const updateJobStatus = useCallback(
    async (jobId: string, newStatus: JobData["status"]) => {
      setJobs((prevJobs) => {
        const updatedJobs = prevJobs.map((job) =>
          job.id.toString() === jobId ? { ...job, status: newStatus } : job
        );
        saveJobs(updatedJobs);
        console.log(`Updated job ${jobId} to status: ${newStatus}`);
        return updatedJobs;
      });
    },
    [saveJobs]
  );

  // Get jobs by status
  const getJobsByStatus = useCallback(
    (status: JobData["status"]) => {
      return jobs.filter((job) => job.status === status);
    },
    [jobs]
  );

  // Get pending jobs
  const getPendingJobs = useCallback(() => {
    return jobs.filter((job) => job.status === "pending");
  }, [jobs]);

  // Refresh jobs from storage
  const refreshJobs = useCallback(async () => {
    await loadJobs();
  }, [loadJobs]);

  // Reset all jobs to pending status from original JSON data
  const resetAllJobsToPending = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Resetting all jobs to pending status...");

      // Get fresh jobs from JSON and reset all to pending
      const initialJobs = (jobDataJson as { jobs: JobData[] }).jobs.map(
        (job) => ({
          ...job,
          status: "pending" as JobData["status"],
        })
      );

      setJobs(initialJobs);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobs));
      console.log(`Reset ${initialJobs.length} jobs to pending status`);
    } catch (error) {
      console.error("Error resetting jobs to pending:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear storage and reset to initial data
  const clearStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log("Storage cleared");

      // Reset to initial data from JSON
      const initialJobs = (jobDataJson as { jobs: JobData[] }).jobs;
      setJobs(initialJobs);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobs));
      console.log(`Reset to ${initialJobs.length} initial jobs`);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const value: JobContextType = {
    jobs,
    updateJobStatus,
    getJobsByStatus,
    getPendingJobs,
    refreshJobs,
    resetAllJobsToPending,
    clearStorage,
    isLoading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
