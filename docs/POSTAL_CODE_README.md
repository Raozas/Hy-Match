# Postal Code Utility README

This document describes the postal code utility and lists all available postal codes in the project.

## Overview

The utility provides a mapping from postal codes to address information for major cities in Japan, the United Kingdom, Russia, and Uzbekistan. It also includes functions to look up address details by postal code.

## Usage

- File: `utils/postalCodeData.ts`
- Main exports:
  - `getAddressByPostalCode(postalCode: string): AddressInfo | null`
  - `getSupportedCountries(): string[]`
  - `isPostalCodeSupported(postalCode: string): boolean`

## Available Postal Codes

### Japan

- 100-0001
- 100-0002
- 100-0003
- 100-0004
- 100-0005
- 150-0001
- 150-0002
- 160-0022
- 170-0013

### United Kingdom

- SW1A 1AA
- SW1A 2AA
- EC1A 1BB
- W1A 0AX
- E1 6AN
- SE1 9GF
- NW1 6XE
- SW7 2DD

### Russia

- 101000
- 103132
- 109012
- 119019
- 125009
- 115035
- 107078

### Uzbekistan

- 100000
- 100001
- 100011
- 100015
- 100017
- 100031
- 100047
- 100070

---

_Last updated: August 26, 2025_
