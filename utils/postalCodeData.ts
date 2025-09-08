// Postal code to address mapping for major cities
export interface AddressInfo {
  country: string;
  prefecture: string;
  city1: string;
  city2?: string;
  streetAddress?: string;
}

export const postalCodeDatabase: Record<string, AddressInfo> = {
  // Tokyo, Japan postal codes
  "100-0001": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Chiyoda",
    city2: "Chiyoda",
    streetAddress: "Chiyoda",
  },
  "100-0002": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Chiyoda",
    city2: "Chiyoda",
    streetAddress: "Kokyo Gaien",
  },
  "100-0003": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Chiyoda",
    city2: "Chiyoda",
    streetAddress: "Hitotsubashi",
  },
  "100-0004": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Chiyoda",
    city2: "Chiyoda",
    streetAddress: "Otemachi",
  },
  "100-0005": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Chiyoda",
    city2: "Chiyoda",
    streetAddress: "Marunouchi",
  },
  "150-0001": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Shibuya",
    city2: "Shibuya",
    streetAddress: "Jingumae",
  },
  "150-0002": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Shibuya",
    city2: "Shibuya",
    streetAddress: "Shibuya",
  },
  "160-0022": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Shinjuku",
    city2: "Shinjuku",
    streetAddress: "Shinjuku",
  },
  "170-0013": {
    country: "Japan",
    prefecture: "Tokyo",
    city1: "Toshima",
    city2: "Ikebukuro",
    streetAddress: "Higashi-Ikebukuro",
  },

  // London, UK postal codes
  "SW1A 1AA": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Westminster",
    city2: "Westminster",
    streetAddress: "Buckingham Palace",
  },
  "SW1A 2AA": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Westminster",
    city2: "Westminster",
    streetAddress: "Westminster",
  },
  "EC1A 1BB": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "City of London",
    city2: "City of London",
    streetAddress: "City",
  },
  "W1A 0AX": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Westminster",
    city2: "Oxford Street",
    streetAddress: "Oxford Street",
  },
  "E1 6AN": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Tower Hamlets",
    city2: "Whitechapel",
    streetAddress: "Whitechapel",
  },
  "SE1 9GF": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Southwark",
    city2: "London Bridge",
    streetAddress: "London Bridge",
  },
  "NW1 6XE": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Camden",
    city2: "Camden Town",
    streetAddress: "Camden",
  },
  "SW7 2DD": {
    country: "United Kingdom",
    prefecture: "London",
    city1: "Kensington and Chelsea",
    city2: "South Kensington",
    streetAddress: "South Kensington",
  },

  // Moscow, Russia postal codes
  "101000": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Central Administrative Okrug",
    city2: "Tverskoy District",
    streetAddress: "Red Square area",
  },
  "103132": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Central Administrative Okrug",
    city2: "Tverskoy District",
    streetAddress: "Tverskaya Street",
  },
  "109012": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Central Administrative Okrug",
    city2: "Zamoskvorechye District",
    streetAddress: "Zamoskvorechye",
  },
  "119019": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Central Administrative Okrug",
    city2: "Arbat District",
    streetAddress: "Arbat",
  },
  "125009": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Northern Administrative Okrug",
    city2: "Tverskoy District",
    streetAddress: "Mokhovaya Street",
  },
  "115035": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Southern Administrative Okrug",
    city2: "Zamoskvorechye District",
    streetAddress: "Pyatnitskaya Street",
  },
  "107078": {
    country: "Russia",
    prefecture: "Moscow",
    city1: "Eastern Administrative Okrug",
    city2: "Sokolniki District",
    streetAddress: "Sokolniki",
  },

  // Tashkent, Uzbekistan postal codes
  "100000": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Shaykhantakhur District",
    city2: "Central Tashkent",
    streetAddress: "Independence Square area",
  },
  "100001": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Mirzo-Ulugbek District",
    city2: "Mirzo-Ulugbek",
    streetAddress: "Amir Temur Street",
  },
  "100011": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Mirobod District",
    city2: "Mirobod",
    streetAddress: "Navoi Street",
  },
  "100015": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Olmazor District",
    city2: "Olmazor",
    streetAddress: "Babur Street",
  },
  "100017": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Yunusabad District",
    city2: "Yunusabad",
    streetAddress: "Maksim Gorky Street",
  },
  "100031": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Chilanzar District",
    city2: "Chilanzar",
    streetAddress: "Chilanzar",
  },
  "100047": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Sergeli District",
    city2: "Sergeli",
    streetAddress: "Sergeli",
  },
  "100070": {
    country: "Uzbekistan",
    prefecture: "Tashkent",
    city1: "Yashnabad District",
    city2: "Yashnabad",
    streetAddress: "Mustaqillik Avenue",
  },
};

// Function to get address info by postal code
export const getAddressByPostalCode = (
  postalCode: string
): AddressInfo | null => {
  // Normalize postal code (remove spaces, convert to uppercase)
  const normalizedCode = postalCode.replace(/\s+/g, " ").trim().toUpperCase();

  // Try exact match first
  if (postalCodeDatabase[normalizedCode]) {
    return postalCodeDatabase[normalizedCode];
  }

  // Try without spaces for flexibility
  const codeWithoutSpaces = normalizedCode.replace(/\s+/g, "");
  if (postalCodeDatabase[codeWithoutSpaces]) {
    return postalCodeDatabase[codeWithoutSpaces];
  }

  // Try with spaces for UK format
  if (codeWithoutSpaces.length >= 5) {
    const ukFormat =
      codeWithoutSpaces.slice(0, -3) + " " + codeWithoutSpaces.slice(-3);
    if (postalCodeDatabase[ukFormat]) {
      return postalCodeDatabase[ukFormat];
    }
  }

  return null;
};

// Function to get supported countries
export const getSupportedCountries = (): string[] => {
  const countries = new Set<string>();
  Object.values(postalCodeDatabase).forEach((addr) =>
    countries.add(addr.country)
  );
  return Array.from(countries);
};

// Function to check if postal code is supported
export const isPostalCodeSupported = (postalCode: string): boolean => {
  return getAddressByPostalCode(postalCode) !== null;
};
