import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserProfile {
  id?: number;
  name: string;
  age?: string;
  gender?: string;
  country?: string;
  homeStation?: string;
  timeToStationFromHome?: string;
  schoolStation?: string;
  timeToStationFromSchool?: string;
  profileImage?: string;
  profileVideo?: string;
  phoneNumber?: string;
  email?: string;
  postalCode?: string;
  prefecture?: string;
  city1?: string;
  city2?: string;
  streetAddress?: string;
  visaType?: string;
  visaValidityPeriod?: string;
  residenceStatus?: string;
  residenceStatusChangeSchedule?: string;
  japaneseLevel?: string;
  availableDays?: string;
  availableFromTime?: string;
  availableToTime?: string;
  currentOccupation?: string;
  desiredJobType?: string;
  workHistory?: string;
  preferredWorkStyle?: string;
}

interface Prefecture {
  name: string;
}

interface City {
  name: string;
}

class DatabaseService {
  private readonly PROFILE_KEY = "hymatch_user_profile";

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await AsyncStorage.getItem(this.PROFILE_KEY);
      if (profileData) {
        return JSON.parse(profileData) as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }

  async saveUserProfile(profile: UserProfile): Promise<number> {
    try {
      const profileWithId = { ...profile, id: profile.id || 1 };
      await AsyncStorage.setItem(this.PROFILE_KEY, JSON.stringify(profileWithId));
      console.log("Profile saved successfully");
      return profileWithId.id;
    } catch (error) {
      console.error("Error saving profile:", error);
      throw error;
    }
  }

  // Mock data for prefectures - you can expand this
  getPrefecturesByCountry(countryCode: string): Prefecture[] {
    const prefectureData: Record<string, Prefecture[]> = {
      JP: [
        { name: "Tokyo" },
        { name: "Osaka" },
        { name: "Kyoto" },
        { name: "Kanagawa" },
        { name: "Chiba" },
        { name: "Saitama" },
        { name: "Hiroshima" },
        { name: "Fukuoka" },
        { name: "Aichi" },
        { name: "Hyogo" }
      ],
      US: [
        { name: "California" },
        { name: "New York" },
        { name: "Texas" },
        { name: "Florida" }
      ],
      UZ: [
        { name: "Tashkent" },
        { name: "Samarkand" },
        { name: "Bukhara" },
        { name: "Fergana" }
      ]
    };
    
    return prefectureData[countryCode] || prefectureData.JP;
  }

  // Mock data for cities
  getCitiesByPrefecture(prefecture: string, countryCode: string): City[] {
    const cityData: Record<string, City[]> = {
      Tokyo: [
        { name: "Shibuya" },
        { name: "Shinjuku" },
        { name: "Harajuku" },
        { name: "Ginza" },
        { name: "Akihabara" },
        { name: "Ueno" }
      ],
      Osaka: [
        { name: "Namba" },
        { name: "Osaka Station" },
        { name: "Tennoji" },
        { name: "Sumiyoshi" }
      ],
      Kyoto: [
        { name: "Kyoto Station" },
        { name: "Gion" },
        { name: "Arashiyama" },
        { name: "Kiyomizu" }
      ]
    };

    return cityData[prefecture] || [
      { name: "City Center" },
      { name: "Downtown" },
      { name: "Suburb Area" }
    ];
  }

  getCitiesByCountry(countryCode: string): City[] {
    // Return all cities for a country
    const allCities: City[] = [];
    const prefectures = this.getPrefecturesByCountry(countryCode);
    
    prefectures.forEach(prefecture => {
      const cities = this.getCitiesByPrefecture(prefecture.name, countryCode);
      allCities.push(...cities);
    });

    return allCities;
  }

  async resetDatabase(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PROFILE_KEY);
      console.log("Profile database reset complete");
    } catch (error) {
      console.error("Error resetting database:", error);
      throw error;
    }
  }

  async checkDatabaseHealth(): Promise<boolean> {
    try {
      // Simple health check - try to read from storage
      await AsyncStorage.getItem(this.PROFILE_KEY);
      return true;
    } catch (error) {
      console.error("Database health check failed:", error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
