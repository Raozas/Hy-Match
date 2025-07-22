import { JobData } from "@/components/CardComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
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

  // Load jobs from storage or use default data
  const loadJobs = async () => {
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
  };

  // Save jobs to storage
  const saveJobs = async (updatedJobs: JobData[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
      console.log("Jobs saved to storage");
    } catch (error) {
      console.error("Error saving jobs:", error);
    }
  };

  // Update job status
  const updateJobStatus = async (
    jobId: string,
    newStatus: JobData["status"]
  ) => {
    const updatedJobs = jobs.map((job) =>
      job.id.toString() === jobId ? { ...job, status: newStatus } : job
    );

    setJobs(updatedJobs);
    await saveJobs(updatedJobs);

    console.log(`Updated job ${jobId} to status: ${newStatus}`);
  };

  // Get jobs by status
  const getJobsByStatus = (status: JobData["status"]) => {
    return jobs.filter((job) => job.status === status);
  };

  // Get pending jobs
  const getPendingJobs = () => {
    return jobs.filter((job) => job.status === "pending");
  };

  // Refresh jobs from storage
  const refreshJobs = async () => {
    await loadJobs();
  };

  // Reset all jobs to pending status from original JSON data
  const resetAllJobsToPending = async () => {
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
  };

  // Clear storage and reset to initial data
  const clearStorage = async () => {
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
  };

  // Initialize on mount
  useEffect(() => {
    loadJobs();
  }, []);

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
