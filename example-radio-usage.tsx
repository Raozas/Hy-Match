import TextWithIcon from "@/components/TextWithIcon";
import React, { useState } from "react";
import { Text, View } from "react-native";

// Example of how to use the improved TextWithIcon component with radio type
export default function RadioExample() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <View className="p-4 gap-6">
      <Text className="text-xl font-bold mb-4">
        TextWithIcon Radio Examples
      </Text>

      {/* Example 1: Basic radio with 2 options */}
      <TextWithIcon
        text="Choose Option"
        icon="Star"
        type="radio"
        radioNum="2"
        radioLabel="*icon*Star&*text*Important|*icon*Clock&*text*Schedule"
        editable="yes"
        onValueChange={(value) => setSelectedValue(value)}
      />

      {/* Example 2: Icons only with custom colors */}
      <TextWithIcon
        text="Gender Selection"
        icon="GenderMale"
        type="radio"
        radioNum="3"
        radioLabel="*icon*GenderMale|*icon*GenderFemale|*text*その他"
        radioColor="same&#FF6B6B&#4ECDC4"
        editable="yes"
        onValueChange={(value) => console.log("Gender:", value)}
      />

      {/* Example 3: Icons only (no text) with different colors */}
      <TextWithIcon
        text="Quick Icons"
        icon="Star"
        type="radio"
        radioNum="2"
        radioLabel="*icon*Star|*icon*Clock"
        radioColor="#FFD93D&#6BCF7F"
        editable="yes"
        onValueChange={(value) => console.log("Icons only:", value)}
      />

      {/* Example 4: Radio with 3 options, mixed icon and text */}
      <TextWithIcon
        text="Work Preference"
        icon="BuildingOffice"
        type="radio"
        radioNum="3"
        radioLabel="*icon*BuildingOffice&*text*Office Work|*icon*HouseLine&*text*Remote Work|*text*Hybrid"
        editable="yes"
        onValueChange={(value) => console.log("Selected:", value)}
      />

      {/* Example 3: Simple text-only radio options */}
      <TextWithIcon
        text="Experience Level"
        icon="GraduationCap"
        type="radio"
        radioNum="4"
        radioLabel="*text*Beginner|*text*Intermediate|*text*Advanced|*text*Expert"
        editable="yes"
        onValueChange={(value) => console.log("Experience:", value)}
      />

      {/* Example 4: Language skill levels */}
      <TextWithIcon
        text="Japanese Level"
        icon="ChatsCircle"
        type="radio"
        radioNum="5"
        radioLabel="*text*N5 (Beginner)|*text*N4 (Elementary)|*text*N3 (Intermediate)|*text*N2 (Upper-Int)|*text*N1 (Advanced)"
        editable="yes"
        onValueChange={(value) => console.log("Japanese Level:", value)}
      />

      {/* Display selected value */}
      {selectedValue && (
        <View className="mt-4 p-3 bg-blue-100 rounded">
          <Text>Selected Value: {selectedValue}</Text>
        </View>
      )}
    </View>
  );
}

/* 
USAGE EXPLANATION:

1. Basic Usage:
   <TextWithIcon
     text="Label Text"
     icon="IconName"
     type="radio"
     radioNum="2"                    // Number of radio options to create
     radioLabel="..."                // Label format (see below)
     editable="yes"
     onValueChange={(value) => {...}}
   />

2. Radio Label Format:
   - Separate multiple labels with "|" (preferred) or "&"
   - For icon + text: "*icon*IconName&*text*Label Text"
   - For icon only: "*icon*IconName" (no text will show)
   - For text only: "*text*Label Text"
   - Mix and match: "*icon*Star&*text*Important|*icon*Clock|*text*Normal"

3. Radio Color Format:
   - Use radioColor prop to customize colors
   - Separate multiple colors with "&"
   - "same" = use default color (#002775)
   - Custom hex: "#FF6B6B" for custom color
   - Example: "same&#FF6B6B&#4ECDC4" (1st=default, 2nd=red, 3rd=teal)

4. Layout:
   - Radio buttons are displayed horizontally (flex-row)
   - They wrap to new lines if needed
   - Compact spacing for better UI

3. Available Icons:
   Use any icon from the iconMap in TextWithIcon.tsx:
   - Star, Clock, BuildingOffice, HouseLine, GraduationCap
   - ChatsCircle, MapPin, Train, Tram, Certificate, etc.

4. Value Handling:
   - Returns "radio_0", "radio_1", "radio_2", etc.
   - You can map these to meaningful values in your onValueChange handler

5. Styling:
   - Non-floating labels (as requested)
   - Icon and text combinations
   - Disabled state support via editable prop
*/
