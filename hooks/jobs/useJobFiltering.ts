import { useCallback, useMemo, useState } from "react";
import { JobData } from "../../components/CardComponent";

export interface FilterOptions {
  sortBy: string;
  sortOrder: "asc" | "desc";
  professions: string[];
  japaneseLevel: string[];
  salaryRange: [number, number];
  commutingEase: string[];
  rating: string[];
}

export const useJobFiltering = (jobs: JobData[]) => {
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    sortBy: "",
    sortOrder: "asc",
    professions: [],
    japaneseLevel: [],
    salaryRange: [900, 1800],
    commutingEase: [],
    rating: [],
  });

  const applyFilters = useCallback(
    (filters: FilterOptions, jobsToFilter: JobData[] = jobs) => {
      let filtered = [...jobsToFilter];

      // Filter by professions
      if (filters.professions.length > 0) {
        filtered = filtered.filter((job) =>
          filters.professions.includes(job.position)
        );
      }

      // Filter by Japanese level
      if (filters.japaneseLevel.length > 0) {
        filtered = filtered.filter((job) =>
          filters.japaneseLevel.includes(job.languageSkill)
        );
      }

      // Filter by salary range
      filtered = filtered.filter((job) => {
        const salaryMatch = job.salary.match(/¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/);
        if (salaryMatch) {
          const minSalary = parseInt(salaryMatch[1].replace(",", ""));
          const maxSalary = parseInt(salaryMatch[2].replace(",", ""));
          return (
            minSalary >= filters.salaryRange[0] &&
            maxSalary <= filters.salaryRange[1]
          );
        }
        return true;
      });

      // Filter by commuting ease
      if (filters.commutingEase.length > 0) {
        filtered = filtered.filter((job) =>
          filters.commutingEase.includes(job.walkTime)
        );
      }

      // Filter by rating
      if (filters.rating.length > 0) {
        filtered = filtered.filter((job) => {
          const jobRating = parseFloat(job.rating);
          return filters.rating.some((ratingFilter) => {
            const minRating = parseFloat(ratingFilter.replace("+", ""));
            return jobRating >= minRating;
          });
        });
      }

      // Sort the filtered jobs
      if (filters.sortBy) {
        filtered.sort((a, b) => {
          let comparison = 0;

          switch (filters.sortBy) {
            case "salary":
              const aSalaryMatch = a.salary.match(
                /¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/
              );
              const bSalaryMatch = b.salary.match(
                /¥(\d+,?\d*)\s*~\s*(\d+,?\d*)/
              );
              if (aSalaryMatch && bSalaryMatch) {
                const aMaxSalary = parseInt(aSalaryMatch[2].replace(",", ""));
                const bMaxSalary = parseInt(bSalaryMatch[2].replace(",", ""));
                comparison = bMaxSalary - aMaxSalary;
              }
              break;
            case "walkTime":
            case "commutingFromSchool":
              const aWalkTime = parseInt(a.walkTime.replace(/[^\d]/g, "")) || 0;
              const bWalkTime = parseInt(b.walkTime.replace(/[^\d]/g, "")) || 0;
              comparison = aWalkTime - bWalkTime;
              break;
            case "rating":
              comparison = parseFloat(b.rating) - parseFloat(a.rating);
              break;
            case "publicationDate":
              const aId = parseInt(a.id) || 0;
              const bId = parseInt(b.id) || 0;
              comparison = bId - aId;
              break;
          }

          return filters.sortOrder === "desc" ? comparison : -comparison;
        });
      }

      return filtered;
    },
    [jobs]
  );

  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return applyFilters(currentFilters);
  }, [jobs, currentFilters, applyFilters]);

  const handleApplyFilters = useCallback((filters: FilterOptions) => {
    setCurrentFilters(filters);
  }, []);

  const resetFilters = useCallback(() => {
    const defaultFilters: FilterOptions = {
      sortBy: "",
      sortOrder: "asc",
      professions: [],
      japaneseLevel: [],
      salaryRange: [900, 1800],
      commutingEase: [],
      rating: [],
    };
    setCurrentFilters(defaultFilters);
  }, []);

  return {
    filteredJobs,
    currentFilters,
    handleApplyFilters,
    resetFilters,
    applyFilters,
  };
};
