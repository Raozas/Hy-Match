// Simple test to verify database schema
const { databaseService } = require("./utils/database.ts");

async function testDatabase() {
  try {
    console.log("Testing database schema...");

    // Test saving a profile with new fields
    const testProfile = {
      name: "Test User",
      age: "25",
      country: "Japan",
      visaType: "Student",
      visaValidityPeriod: "2025-12-31",
      residenceStatus: "Student",
      japaneseLevel: "N3",
      availableFromTime: "9:00",
      availableToTime: "17:00",
      currentOccupation: "Student",
      desiredJobType: "IT Engineer",
      workHistory: "Part-time job at convenience store",
      availableDays: "MON,TUE,WED,THU,FRI",
    };

    console.log("Saving test profile...");
    await databaseService.saveUserProfile(testProfile);

    console.log("Retrieving profile...");
    const retrievedProfile = await databaseService.getUserProfile();

    console.log("Retrieved profile:", retrievedProfile);

    if (retrievedProfile) {
      console.log("✅ Database test successful!");
      console.log("New fields are working:");
      console.log("- Visa Type:", retrievedProfile.visaType);
      console.log("- Japanese Level:", retrievedProfile.japaneseLevel);
      console.log("- Available Days:", retrievedProfile.availableDays);
    } else {
      console.log("❌ Database test failed - no profile retrieved");
    }
  } catch (error) {
    console.error("❌ Database test failed:", error);
  }
}

// Don't run automatically, just export for manual testing
module.exports = { testDatabase };
