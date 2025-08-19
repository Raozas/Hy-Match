// Test file to demonstrate postal code autofill functionality
import {
  getAddressByPostalCode,
  getSupportedCountries,
  isPostalCodeSupported,
} from "../utils/postalCodeData";

// Test function to demonstrate the functionality
export const testPostalCodeAutoFill = () => {
  console.log("=== Postal Code Auto-Fill Demo ===");

  // Test Tokyo postal codes
  console.log("\n--- Tokyo, Japan ---");
  const tokyoCodes = ["100-0001", "150-0002", "160-0022"];
  tokyoCodes.forEach((code) => {
    const result = getAddressByPostalCode(code);
    console.log(`${code}:`, result);
  });

  // Test London postal codes
  console.log("\n--- London, UK ---");
  const londonCodes = ["SW1A 1AA", "W1A 0AX", "E1 6AN"];
  londonCodes.forEach((code) => {
    const result = getAddressByPostalCode(code);
    console.log(`${code}:`, result);
  });

  // Test Moscow postal codes
  console.log("\n--- Moscow, Russia ---");
  const moscowCodes = ["101000", "119019", "125009"];
  moscowCodes.forEach((code) => {
    const result = getAddressByPostalCode(code);
    console.log(`${code}:`, result);
  });

  // Test Tashkent postal codes
  console.log("\n--- Tashkent, Uzbekistan ---");
  const tashkentCodes = ["100000", "100015", "100031"];
  tashkentCodes.forEach((code) => {
    const result = getAddressByPostalCode(code);
    console.log(`${code}:`, result);
  });

  // Test invalid postal codes
  console.log("\n--- Invalid Postal Codes ---");
  const invalidCodes = ["99999", "INVALID", "123"];
  invalidCodes.forEach((code) => {
    const result = getAddressByPostalCode(code);
    console.log(`${code}:`, result || "Not found");
  });

  // Show supported countries
  console.log("\n--- Supported Countries ---");
  console.log(getSupportedCountries());

  // Test postal code support check
  console.log("\n--- Support Check ---");
  console.log("100-0001 supported:", isPostalCodeSupported("100-0001"));
  console.log("SW1A 1AA supported:", isPostalCodeSupported("SW1A 1AA"));
  console.log("INVALID supported:", isPostalCodeSupported("INVALID"));
};

// Example usage scenarios
export const usageExamples = {
  // Scenario 1: User enters Tokyo postal code
  tokyoExample: {
    input: "100-0005",
    expected: {
      country: "Japan",
      prefecture: "Tokyo",
      city1: "Chiyoda",
      city2: "Chiyoda",
      streetAddress: "Marunouchi",
    },
  },

  // Scenario 2: User enters London postal code
  londonExample: {
    input: "SW1A 1AA",
    expected: {
      country: "United Kingdom",
      prefecture: "London",
      city1: "Westminster",
      city2: "Westminster",
      streetAddress: "Buckingham Palace",
    },
  },

  // Scenario 3: User enters Moscow postal code
  moscowExample: {
    input: "101000",
    expected: {
      country: "Russia",
      prefecture: "Moscow",
      city1: "Central Administrative Okrug",
      city2: "Tverskoy District",
      streetAddress: "Red Square area",
    },
  },

  // Scenario 4: User enters Tashkent postal code
  tashkentExample: {
    input: "100000",
    expected: {
      country: "Uzbekistan",
      prefecture: "Tashkent",
      city1: "Shaykhantakhur District",
      city2: "Central Tashkent",
      streetAddress: "Independence Square area",
    },
  },
};

// Run the test
if (require.main === module) {
  testPostalCodeAutoFill();
}
