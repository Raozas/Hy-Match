import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('profile.db');

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
  postalCode?: string;
  prefecture?: string;
  city1?: string;
  city2?: string;
  streetAddress?: string;
  phoneNumber?: string;
  email?: string;
  profileImage?: string;
  profileVideo?: string;
  // New fields for visa and work information
  visaType?: string;
  visaValidityPeriod?: string;
  residenceStatus?: string;
  residenceStatusChangeSchedule?: string;
  japaneseLevel?: string;
  availableFromTime?: string;
  availableToTime?: string;
  currentOccupation?: string;
  desiredJobType?: string;
  workHistory?: string;
  availableDays?: string;
  preferredWorkStyle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Prefecture {
  id: number;
  name: string;
  countryCode: string;
}

export interface City {
  id: number;
  name: string;
  prefectureId: number;
  countryCode: string;
}

// Location data for supported countries
const LOCATION_DATA = {
  JP: {
    name: "Japan",
    prefectures: [
      { id: 1, name: "東京都", countryCode: "JP" },
      { id: 2, name: "大阪府", countryCode: "JP" },
      { id: 3, name: "愛知県", countryCode: "JP" },
      { id: 4, name: "北海道", countryCode: "JP" },
      { id: 5, name: "福岡県", countryCode: "JP" },
      { id: 6, name: "神奈川県", countryCode: "JP" },
      { id: 7, name: "埼玉県", countryCode: "JP" },
      { id: 8, name: "千葉県", countryCode: "JP" },
      { id: 9, name: "兵庫県", countryCode: "JP" },
      { id: 10, name: "京都府", countryCode: "JP" },
      { id: 11, name: "広島県", countryCode: "JP" },
      { id: 12, name: "宮城県", countryCode: "JP" },
      { id: 13, name: "静岡県", countryCode: "JP" },
      { id: 14, name: "茨城県", countryCode: "JP" },
      { id: 15, name: "新潟県", countryCode: "JP" }
    ],
    cities: [
      // Tokyo
      { id: 1, name: "Shinjuku", prefectureId: 1, countryCode: "JP" },
      { id: 2, name: "Shibuya", prefectureId: 1, countryCode: "JP" },
      { id: 3, name: "Ikebukuro", prefectureId: 1, countryCode: "JP" },
      { id: 4, name: "Harajuku", prefectureId: 1, countryCode: "JP" },
      { id: 5, name: "Akihabara", prefectureId: 1, countryCode: "JP" },
      // Osaka
      { id: 6, name: "Osaka City", prefectureId: 2, countryCode: "JP" },
      { id: 7, name: "Sakai", prefectureId: 2, countryCode: "JP" },
      { id: 8, name: "Takatsuki", prefectureId: 2, countryCode: "JP" },
      // Aichi
      { id: 9, name: "Nagoya", prefectureId: 3, countryCode: "JP" },
      { id: 10, name: "Toyota", prefectureId: 3, countryCode: "JP" },
      // Hokkaido
      { id: 11, name: "Sapporo", prefectureId: 4, countryCode: "JP" },
      { id: 12, name: "Hakodate", prefectureId: 4, countryCode: "JP" }
    ]
  },
  UZ: {
    name: "Uzbekistan",
    prefectures: [
      { id: 16, name: "Tashkent", countryCode: "UZ" },
      { id: 17, name: "Samarkand", countryCode: "UZ" },
      { id: 18, name: "Bukhara", countryCode: "UZ" },
      { id: 19, name: "Andijan", countryCode: "UZ" },
      { id: 20, name: "Fergana", countryCode: "UZ" },
      { id: 21, name: "Namangan", countryCode: "UZ" },
      { id: 22, name: "Kashkadarya", countryCode: "UZ" },
      { id: 23, name: "Surkhandarya", countryCode: "UZ" }
    ],
    cities: [
      // Tashkent
      { id: 13, name: "Tashkent City", prefectureId: 16, countryCode: "UZ" },
      { id: 14, name: "Chirchiq", prefectureId: 16, countryCode: "UZ" },
      { id: 15, name: "Angren", prefectureId: 16, countryCode: "UZ" },
      // Samarkand
      { id: 16, name: "Samarkand City", prefectureId: 17, countryCode: "UZ" },
      { id: 17, name: "Kattakurgan", prefectureId: 17, countryCode: "UZ" },
      // Bukhara
      { id: 18, name: "Bukhara City", prefectureId: 18, countryCode: "UZ" },
      { id: 19, name: "Gijduvan", prefectureId: 18, countryCode: "UZ" }
    ]
  },
  RU: {
    name: "Russia",
    prefectures: [
      { id: 24, name: "Moscow Oblast", countryCode: "RU" },
      { id: 25, name: "Saint Petersburg", countryCode: "RU" },
      { id: 26, name: "Novosibirsk Oblast", countryCode: "RU" },
      { id: 27, name: "Yekaterinburg Oblast", countryCode: "RU" },
      { id: 28, name: "Kazan Oblast", countryCode: "RU" },
      { id: 29, name: "Nizhny Novgorod Oblast", countryCode: "RU" },
      { id: 30, name: "Samara Oblast", countryCode: "RU" },
      { id: 31, name: "Rostov Oblast", countryCode: "RU" }
    ],
    cities: [
      // Moscow Oblast
      { id: 20, name: "Moscow", prefectureId: 24, countryCode: "RU" },
      { id: 21, name: "Balashikha", prefectureId: 24, countryCode: "RU" },
      { id: 22, name: "Podolsk", prefectureId: 24, countryCode: "RU" },
      // Saint Petersburg
      { id: 23, name: "Saint Petersburg", prefectureId: 25, countryCode: "RU" },
      { id: 24, name: "Pushkin", prefectureId: 25, countryCode: "RU" },
      // Novosibirsk
      { id: 25, name: "Novosibirsk", prefectureId: 26, countryCode: "RU" },
      { id: 26, name: "Berdsk", prefectureId: 26, countryCode: "RU" }
    ]
  },
  GB: {
    name: "United Kingdom",
    prefectures: [
      { id: 32, name: "England", countryCode: "GB" },
      { id: 33, name: "Scotland", countryCode: "GB" },
      { id: 34, name: "Wales", countryCode: "GB" },
      { id: 35, name: "Northern Ireland", countryCode: "GB" }
    ],
    cities: [
      // England
      { id: 27, name: "London", prefectureId: 32, countryCode: "GB" },
      { id: 28, name: "Manchester", prefectureId: 32, countryCode: "GB" },
      { id: 29, name: "Birmingham", prefectureId: 32, countryCode: "GB" },
      { id: 30, name: "Liverpool", prefectureId: 32, countryCode: "GB" },
      // Scotland
      { id: 31, name: "Edinburgh", prefectureId: 33, countryCode: "GB" },
      { id: 32, name: "Glasgow", prefectureId: 33, countryCode: "GB" },
      // Wales
      { id: 33, name: "Cardiff", prefectureId: 34, countryCode: "GB" },
      { id: 34, name: "Swansea", prefectureId: 34, countryCode: "GB" }
    ]
  },
  ES: {
    name: "Spain",
    prefectures: [
      { id: 36, name: "Madrid", countryCode: "ES" },
      { id: 37, name: "Catalonia", countryCode: "ES" },
      { id: 38, name: "Andalusia", countryCode: "ES" },
      { id: 39, name: "Valencia", countryCode: "ES" },
      { id: 40, name: "Galicia", countryCode: "ES" },
      { id: 41, name: "Castile and León", countryCode: "ES" },
      { id: 42, name: "Basque Country", countryCode: "ES" }
    ],
    cities: [
      // Madrid
      { id: 35, name: "Madrid City", prefectureId: 36, countryCode: "ES" },
      { id: 36, name: "Alcalá de Henares", prefectureId: 36, countryCode: "ES" },
      { id: 37, name: "Getafe", prefectureId: 36, countryCode: "ES" },
      // Catalonia
      { id: 38, name: "Barcelona", prefectureId: 37, countryCode: "ES" },
      { id: 39, name: "Girona", prefectureId: 37, countryCode: "ES" },
      { id: 40, name: "Tarragona", prefectureId: 37, countryCode: "ES" },
      // Andalusia
      { id: 41, name: "Seville", prefectureId: 38, countryCode: "ES" },
      { id: 42, name: "Málaga", prefectureId: 38, countryCode: "ES" },
      { id: 43, name: "Granada", prefectureId: 38, countryCode: "ES" }
    ]
  },
  DE: {
    name: "Germany",
    prefectures: [
      { id: 43, name: "Bavaria", countryCode: "DE" },
      { id: 44, name: "North Rhine-Westphalia", countryCode: "DE" },
      { id: 45, name: "Baden-Württemberg", countryCode: "DE" },
      { id: 46, name: "Lower Saxony", countryCode: "DE" },
      { id: 47, name: "Hesse", countryCode: "DE" },
      { id: 48, name: "Saxony", countryCode: "DE" },
      { id: 49, name: "Rhineland-Palatinate", countryCode: "DE" }
    ],
    cities: [
      // Bavaria
      { id: 44, name: "Munich", prefectureId: 43, countryCode: "DE" },
      { id: 45, name: "Nuremberg", prefectureId: 43, countryCode: "DE" },
      { id: 46, name: "Augsburg", prefectureId: 43, countryCode: "DE" },
      // North Rhine-Westphalia
      { id: 47, name: "Cologne", prefectureId: 44, countryCode: "DE" },
      { id: 48, name: "Düsseldorf", prefectureId: 44, countryCode: "DE" },
      { id: 49, name: "Dortmund", prefectureId: 44, countryCode: "DE" },
      // Baden-Württemberg
      { id: 50, name: "Stuttgart", prefectureId: 45, countryCode: "DE" },
      { id: 51, name: "Mannheim", prefectureId: 45, countryCode: "DE" }
    ]
  }
};

class DatabaseService {
  constructor() {
    try {
      console.log('Initializing DatabaseService...');
      this.initDatabase();
      console.log('DatabaseService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DatabaseService:', error);
      throw error;
    }
  }

  // Public method to initialize database
  initDatabase() {
    try {
      // Create the user profiles table with ALL columns from the start
      db.execSync(
        `CREATE TABLE IF NOT EXISTS user_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age TEXT,
          gender TEXT,
          country TEXT,
          home_station TEXT,
          time_to_station_from_home TEXT,
          school_station TEXT,
          time_to_station_from_school TEXT,
          postal_code TEXT,
          prefecture TEXT,
          city1 TEXT,
          city2 TEXT,
          street_address TEXT,
          phone_number TEXT,
          email TEXT,
          profile_image TEXT,
          profile_video TEXT,
          visa_type TEXT,
          visa_validity_period TEXT,
          residence_status TEXT,
          residence_status_change_schedule TEXT,
          japanese_level TEXT,
          available_from_time TEXT,
          available_to_time TEXT,
          current_occupation TEXT,
          desired_job_type TEXT,
          work_history TEXT,
          available_days TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      console.log('Database tables created successfully');
      
      console.log('Database initialization complete');
      
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async saveUserProfile(profile: UserProfile): Promise<number> {
    try {
      // First, ensure database is healthy
      await this.ensureTableExists();
      
      // Use runSync for direct execution
      const result = db.runSync(
        `INSERT OR REPLACE INTO user_profiles 
         (name, age, gender, country, home_station, time_to_station_from_home, school_station, time_to_station_from_school, 
          postal_code, prefecture, city1, city2, street_address, phone_number, email, profile_image, profile_video,
          visa_type, visa_validity_period, residence_status, residence_status_change_schedule, japanese_level,
          available_from_time, available_to_time, current_occupation, desired_job_type, work_history, available_days, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          profile.name, 
          profile.age || '', 
          profile.gender || '',
          profile.country || '', 
          profile.homeStation || '', 
          profile.timeToStationFromHome || '',
          profile.schoolStation || '',
          profile.timeToStationFromSchool || '',
          profile.postalCode || '',
          profile.prefecture || '',
          profile.city1 || '',
          profile.city2 || '',
          profile.streetAddress || '',
          profile.phoneNumber || '',
          profile.email || '',
          profile.profileImage || '', 
          profile.profileVideo || '',
          profile.visaType || '',
          profile.visaValidityPeriod || '',
          profile.residenceStatus || '',
          profile.residenceStatusChangeSchedule || '',
          profile.japaneseLevel || '',
          profile.availableFromTime || '',
          profile.availableToTime || '',
          profile.currentOccupation || '',
          profile.desiredJobType || '',
          profile.workHistory || '',
          profile.availableDays || ''
        ]
      );
      
      console.log('User profile saved successfully');
      return result.lastInsertRowId;
        
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  // New method to ensure table exists
  private async ensureTableExists(): Promise<void> {
    try {
      const tableExists = db.getFirstSync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_profiles'"
      );
      
      if (!tableExists) {
        console.log('Table does not exist, creating...');
        this.initDatabase();
      }
    } catch (error) {
      console.log('Error checking table existence, reinitializing database...');
      this.initDatabase();
    }
  }

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      // First ensure table exists
      await this.ensureTableExists();
      
      // Try async method first
      const result = await db.getFirstAsync<any>(
        'SELECT * FROM user_profiles ORDER BY id DESC LIMIT 1'
      );
      
      if (result) {
        return {
          id: result.id,
          name: result.name,
          age: result.age,
          gender: result.gender,
          country: result.country,
          homeStation: result.home_station,
          timeToStationFromHome: result.time_to_station_from_home,
          schoolStation: result.school_station,
          timeToStationFromSchool: result.time_to_station_from_school,
          postalCode: result.postal_code,
          prefecture: result.prefecture,
          city1: result.city1,
          city2: result.city2,
          streetAddress: result.street_address,
          phoneNumber: result.phone_number,
          email: result.email,
          profileImage: result.profile_image,
          profileVideo: result.profile_video,
          visaType: result.visa_type,
          visaValidityPeriod: result.visa_validity_period,
          residenceStatus: result.residence_status,
          residenceStatusChangeSchedule: result.residence_status_change_schedule,
          japaneseLevel: result.japanese_level,
          availableFromTime: result.available_from_time,
          availableToTime: result.available_to_time,
          currentOccupation: result.current_occupation,
          desiredJobType: result.desired_job_type,
          workHistory: result.work_history,
          availableDays: result.available_days,
          preferredWorkStyle: result.preferred_work_style,
          createdAt: result.created_at,
          updatedAt: result.updated_at
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user profile (async):', error);
      
      // Fallback to sync method
      try {
        console.log('Attempting sync fallback for getUserProfile...');
        const result = db.getFirstSync(
          'SELECT * FROM user_profiles ORDER BY id DESC LIMIT 1'
        ) as any;
        
        if (result) {
          return {
            id: result.id,
            name: result.name,
            age: result.age,
            gender: result.gender,
            country: result.country,
            homeStation: result.home_station,
            timeToStationFromHome: result.time_to_station_from_home,
            schoolStation: result.school_station,
            timeToStationFromSchool: result.time_to_station_from_school,
            postalCode: result.postal_code,
            prefecture: result.prefecture,
            city1: result.city1,
            city2: result.city2,
            streetAddress: result.street_address,
            phoneNumber: result.phone_number,
            email: result.email,
            profileImage: result.profile_image,
            profileVideo: result.profile_video,
            visaType: result.visa_type,
            visaValidityPeriod: result.visa_validity_period,
            residenceStatus: result.residence_status,
            residenceStatusChangeSchedule: result.residence_status_change_schedule,
            japaneseLevel: result.japanese_level,
            availableFromTime: result.available_from_time,
            availableToTime: result.available_to_time,
            currentOccupation: result.current_occupation,
            desiredJobType: result.desired_job_type,
            workHistory: result.work_history,
            availableDays: result.available_days,
            preferredWorkStyle: result.preferred_work_style,
            createdAt: result.created_at,
            updatedAt: result.updated_at
          };
        }
        
        return null;
      } catch (fallbackError) {
        console.error('Sync fallback also failed:', fallbackError);
        // The database service will handle reset internally if needed
        await this.resetDatabase();
        return null;
      }
    }
  }

  async updateProfile(id: number, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const result = await db.runAsync(
        `UPDATE user_profiles 
         SET name = ?, age = ?, country = ?, home_station = ?, time_to_station_from_home = ?, 
             school_station = ?, time_to_station_from_school = ?, postal_code = ?, prefecture = ?, 
             city1 = ?, city2 = ?, street_address = ?, phone_number = ?, email = ?, 
             profile_image = ?, profile_video = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [
          updates.name || '', 
          updates.age || '', 
          updates.country || '', 
          updates.homeStation || '', 
          updates.timeToStationFromHome || '',
          updates.schoolStation || '',
          updates.timeToStationFromSchool || '',
          updates.postalCode || '',
          updates.prefecture || '',
          updates.city1 || '',
          updates.city2 || '',
          updates.streetAddress || '',
          updates.phoneNumber || '',
          updates.email || '',
          updates.profileImage || '', 
          updates.profileVideo || '',
          id
        ]
      );
      return result.changes > 0;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async deleteProfile(id: number): Promise<boolean> {
    try {
      const result = await db.runAsync('DELETE FROM user_profiles WHERE id = ?', [id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  }

  // Location data methods
  getPrefecturesByCountry(countryCode: string): Prefecture[] {
    const countryData = LOCATION_DATA[countryCode as keyof typeof LOCATION_DATA];
    return countryData ? countryData.prefectures : [];
  }

  getCitiesByCountry(countryCode: string): City[] {
    const countryData = LOCATION_DATA[countryCode as keyof typeof LOCATION_DATA];
    return countryData ? countryData.cities : [];
  }

  getCitiesByPrefecture(prefectureName: string, countryCode: string): City[] {
    const countryData = LOCATION_DATA[countryCode as keyof typeof LOCATION_DATA];
    if (!countryData) return [];
    
    const prefecture = countryData.prefectures.find(p => p.name === prefectureName);
    if (!prefecture) return [];
    
    return countryData.cities.filter(city => city.prefectureId === prefecture.id);
  }

  getAllSupportedCountries(): Array<{code: string, name: string}> {
    return Object.entries(LOCATION_DATA).map(([code, data]) => ({
      code,
      name: data.name
    }));
  }

  async resetDatabase(): Promise<void> {
    try {
      console.log('Resetting database...');
      db.execSync('DROP TABLE IF EXISTS user_profiles;');
      this.initDatabase();
      console.log('Database reset complete');
    } catch (error) {
      console.error('Error resetting database:', error);
      throw error;
    }
  }

  async checkDatabaseHealth(): Promise<boolean> {
    try {
      const columns = db.getAllSync(`PRAGMA table_info(user_profiles);`);
      console.log('Database columns:', columns);
      
      const testResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM user_profiles');
      console.log('Database health check passed:', testResult);
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Test method to verify database is working
  testDatabase(): boolean {
    try {
      console.log('Testing database connection...');
      
      // Test database connection
      const result = db.runSync('SELECT 1 as test');
      console.log('Database test result:', result);
      
      return true;
    } catch (error) {
      console.error('Database test failed:', error);
      return false;
    }
  }

  // Method to get detailed database info
  getDatabaseInfo(): any {
    try {
      const tables = db.getAllSync(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );
      
      return {
        tables,
        isWorking: true
      };
    } catch (error) {
      console.error('Error getting database info:', error);
      return {
        tables: [],
        isWorking: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const databaseService = new DatabaseService();
