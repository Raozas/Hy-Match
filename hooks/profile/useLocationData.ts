import { useCallback, useState } from "react";
import { databaseService } from "../../utils/database";

export const useLocationData = () => {
  const [prefectureOptions, setPrefectureOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const updateLocationOptions = useCallback(
    (countryCode?: string, prefecture?: string) => {
      if (!countryCode) {
        setPrefectureOptions([]);
        setCityOptions([]);
        return;
      }

      const countryCodeMap: Record<string, string> = {
        Japan: "JP",
        Uzbekistan: "UZ",
        Russia: "RU",
        "United Kingdom": "GB",
        Spain: "ES",
        Germany: "DE",
      };

      const code = countryCodeMap[countryCode] || countryCode;

      // Prefecture options
      const prefectures = databaseService.getPrefecturesByCountry(code);
      setPrefectureOptions(prefectures.map((p) => p.name));

      // City options
      if (prefecture) {
        const cities = databaseService.getCitiesByPrefecture(prefecture, code);
        setCityOptions(cities.map((c) => c.name));
      } else {
        const allCities = databaseService.getCitiesByCountry(code);
        setCityOptions(allCities.map((c) => c.name));
      }
    },
    []
  );

  return {
    prefectureOptions,
    cityOptions,
    updateLocationOptions,
  };
};
