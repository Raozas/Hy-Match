/**
 * Database Gender Field Test
 * 
 * This file contains test functions to verify that the gender field
 * has been properly added to the database schema and functionality.
 */

import { databaseService, UserProfile } from './utils/database';

// Test function to verify gender field support
export const testGenderField = async () => {
  try {
    console.log('Testing gender field in database...');
    
    // Test 1: Create a profile with gender
    const testProfile: UserProfile = {
      name: 'Test User',
      age: '25',
      gender: 'Female',
      country: 'Japan',
      email: 'test@example.com'
    };
    
    // Save the profile
    const profileId = await databaseService.saveUserProfile(testProfile);
    console.log('✅ Profile saved with gender field, ID:', profileId);
    
    // Test 2: Retrieve the profile and verify gender field
    const retrievedProfile = await databaseService.getUserProfile();
    
    if (retrievedProfile && retrievedProfile.gender === 'Female') {
      console.log('✅ Gender field correctly saved and retrieved:', retrievedProfile.gender);
    } else {
      console.log('❌ Gender field not properly saved or retrieved');
    }
    
    // Test 3: Database health check
    const isHealthy = await databaseService.checkDatabaseHealth();
    if (isHealthy) {
      console.log('✅ Database health check passed');
    } else {
      console.log('❌ Database health check failed');
    }
    
    console.log('Gender field test completed');
    return true;
    
  } catch (error) {
    console.error('❌ Gender field test failed:', error);
    return false;
  }
};

// Test different gender values
export const testGenderVariations = async () => {
  const genderValues = ['Male', 'Female', 'Other', 'Non-binary', 'Prefer not to say'];
  
  for (const gender of genderValues) {
    try {
      const testProfile: UserProfile = {
        name: `Test User ${gender}`,
        gender: gender
      };
      
      await databaseService.saveUserProfile(testProfile);
      const retrieved = await databaseService.getUserProfile();
      
      if (retrieved?.gender === gender) {
        console.log(`✅ Gender "${gender}" saved and retrieved correctly`);
      } else {
        console.log(`❌ Gender "${gender}" failed to save/retrieve`);
      }
    } catch (error) {
      console.log(`❌ Error testing gender "${gender}":`, error);
    }
  }
};

// Usage instructions:
/*
To test the gender field functionality:

1. Import the test functions in your component:
   import { testGenderField, testGenderVariations } from './test-gender-database';

2. Call the test function in useEffect or button press:
   useEffect(() => {
     testGenderField();
   }, []);

3. Check the console for test results.

4. For comprehensive testing:
   testGenderVariations();
*/
