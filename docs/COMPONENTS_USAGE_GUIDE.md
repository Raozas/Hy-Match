# Components Usage Guide

This guide helps you choose and use the right component for your forms in the HyMatch application.

## Component Overview

| Component         | Purpose                            | Best For                                        |
| ----------------- | ---------------------------------- | ----------------------------------------------- |
| **TextWithIcon**  | Rich form inputs with icon support | Profile forms, complex selections, radio groups |
| **TextComponent** | Simple, clean text inputs          | Basic forms, secondary inputs, minimal design   |

## Quick Decision Guide

### Use TextWithIcon when you need:

- ✅ Visual icons to represent field types
- ✅ Radio button groups
- ✅ Country selection with flags
- ✅ Info tooltips and help text
- ✅ Multiple icon combinations
- ✅ Rich interaction types

### Use TextComponent when you need:

- ✅ Simple, clean text inputs
- ✅ Floating label animations
- ✅ Minimal visual design
- ✅ Basic dropdown selections
- ✅ Lighter component weight

## Component Comparison

### Visual Appearance

**TextWithIcon:**

```
[🏢] ┌─────────────────┐
     │ Office Building │  <- Rich visual with icon
     └─────────────────┘
```

**TextComponent:**

```
     ┌─────────────────┐
     │ Building Name   │  <- Clean, minimal
     └─────────────────┘
      Label Text
```

### Feature Matrix

| Feature               | TextWithIcon | TextComponent | Notes                             |
| --------------------- | ------------ | ------------- | --------------------------------- |
| **Basic Text Input**  | ✅           | ✅            | Both support text input           |
| **Icon Display**      | ✅           | ❌            | TextWithIcon shows icons          |
| **Floating Labels**   | ❌           | ✅            | TextComponent has animated labels |
| **Dropdown Select**   | ✅           | ✅            | Both support selection            |
| **Radio Buttons**     | ✅           | ❌            | Only TextWithIcon                 |
| **Country Selection** | ✅           | ❌            | With flag display                 |
| **Info Tooltips**     | ✅           | ❌            | Help text support                 |
| **Multiple Icons**    | ✅           | ❌            | 2+ icons per component            |
| **Custom Colors**     | ✅           | ❌            | Radio button colors               |
| **Editable States**   | ✅           | ✅            | Both support disable              |

## Complete Form Examples

### User Profile Form (Mixed Usage)

```tsx
import TextWithIcon from "@/components/TextWithIcon";
import TextComponent from "@/components/TextComponent";

export default function ProfileForm() {
  return (
    <View className="p-4 gap-4">
      {/* Primary fields - Use TextWithIcon for visual hierarchy */}
      <TextWithIcon
        icon="IdentificationCard"
        text={profile?.name || ""}
        type="input"
        className="w-[280px]"
        onValueChange={handleNameChange}
        info="Enter your full legal name"
        editable={isEditable}
      />

      <TextWithIcon
        icon="Cake"
        text={profile?.age || "Select Age"}
        type="select"
        options={ageOptions}
        className="w-[150px]"
        onValueChange={handleAgeChange}
        editable={isEditable}
      />

      {/* Gender selection with radio buttons */}
      <TextWithIcon
        text="Gender"
        icon="GenderMale"
        type="radio"
        radioNum="3"
        radioLabel="*icon*GenderMale|*icon*GenderFemale|*text*Other"
        radioColor="same&#FF6B6B&#4ECDC4"
        editable={isEditable}
        onValueChange={handleGenderChange}
      />

      <TextWithIcon
        icon="GlobeHemisphereEast"
        text={profile?.country || "Select Country"}
        type="selectCountry"
        className="w-[240px]"
        onValueChange={handleCountryChange}
        editable={isEditable}
      />

      {/* Secondary fields - Use TextComponent for cleaner look */}
      <View className="mt-6">
        <Text className="text-lg font-bold mb-4">Additional Information</Text>

        <TextComponent
          text={profile?.streetAddress || ""}
          type="input"
          label="Street Address"
          className="w-[300px]"
          onValueChange={handleStreetAddressChange}
          editable={isEditable}
        />

        <TextComponent
          text={profile?.workHistory || ""}
          type="input"
          label="Work Experience"
          className="w-[300px]"
          onValueChange={handleWorkHistoryChange}
          editable={isEditable}
        />

        <View className="flex-row gap-3">
          <TextComponent
            text={profile?.availableFromTime || ""}
            type="select"
            options={timeOptions}
            className="w-[120px]"
            onValueChange={handleFromTimeChange}
            editable={isEditable}
          />

          <TextComponent
            text={profile?.availableToTime || ""}
            type="select"
            options={timeOptions}
            className="w-[120px]"
            onValueChange={handleToTimeChange}
            editable={isEditable}
          />
        </View>
      </View>
    </View>
  );
}
```

### Work Preference Form

```tsx
export default function WorkPreferenceForm() {
  return (
    <View className="p-4 gap-6">
      {/* Work style selection with visual icons */}
      <TextWithIcon
        text="Preferred Work Style"
        icon="BuildingOffice"
        type="radio"
        radioNum="3"
        radioLabel="*icon*BuildingOffice&*text*Office|*icon*HouseLine&*text*Remote|*text*Hybrid"
        radioColor="#1E40AF&#059669&#DC2626"
        editable="yes"
        onValueChange={handleWorkStyleChange}
      />

      {/* Job preferences with icons for visual clarity */}
      <TextWithIcon
        icon="Certificate"
        text={profile?.desiredJobType || ""}
        type="input"
        className="w-[300px]"
        onValueChange={handleJobTypeChange}
        info="Describe your ideal job type"
        editable="yes"
      />

      <TextWithIcon
        icon="CurrencyJpy"
        text={profile?.expectedSalary || ""}
        type="input"
        className="w-[200px]"
        onValueChange={handleSalaryChange}
        editable="yes"
      />

      {/* Detailed text inputs without icons for clean look */}
      <TextComponent
        text={profile?.workExperience || ""}
        type="input"
        label="Previous Work Experience"
        className="w-[350px]"
        onValueChange={handleExperienceChange}
        editable="yes"
      />

      <TextComponent
        text={profile?.skills || ""}
        type="input"
        label="Skills and Qualifications"
        className="w-[350px]"
        onValueChange={handleSkillsChange}
        editable="yes"
      />
    </View>
  );
}
```

## Form Validation Patterns

### Using Both Components with Validation

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validateAndSave = async (field: string, value: string) => {
  let error = "";

  // Validation logic
  switch (field) {
    case "name":
      if (!value.trim()) error = "Name is required";
      break;
    case "email":
      if (!value.includes("@")) error = "Invalid email format";
      break;
    case "age":
      if (!value) error = "Please select your age";
      break;
  }

  // Update errors
  setErrors((prev) => ({ ...prev, [field]: error }));

  // Save if valid
  if (!error) {
    await saveProfileField(field, value);
  }
};

return (
  <View>
    {/* Primary field with icon and validation */}
    <TextWithIcon
      icon="IdentificationCard"
      text={profile?.name || ""}
      type="input"
      className="w-[280px]"
      onValueChange={(value) => validateAndSave("name", value)}
      info="Enter your full legal name"
      editable="yes"
    />
    {errors.name && <Text className="text-red-500 text-sm">{errors.name}</Text>}

    {/* Clean secondary field */}
    <TextComponent
      text={profile?.email || ""}
      type="input"
      label="Email Address"
      className="w-[280px]"
      onValueChange={(value) => validateAndSave("email", value)}
      editable="yes"
    />
    {errors.email && (
      <Text className="text-red-500 text-sm">{errors.email}</Text>
    )}
  </View>
);
```

## Responsive Design Patterns

### Mobile-First Layout

```tsx
export default function ResponsiveForm() {
  return (
    <ScrollView className="flex-1 p-4">
      {/* Full width on mobile */}
      <View className="w-full mb-4">
        <TextWithIcon
          icon="IdentificationCard"
          text={profile?.name || ""}
          type="input"
          className="w-full"
          onValueChange={handleNameChange}
          editable="yes"
        />
      </View>

      {/* Side by side on larger screens */}
      <View className="flex-row flex-wrap gap-3 mb-4">
        <View className="flex-1 min-w-[150px]">
          <TextWithIcon
            icon="Cake"
            text={profile?.age || "Age"}
            type="select"
            options={ageOptions}
            className="w-full"
            onValueChange={handleAgeChange}
            editable="yes"
          />
        </View>

        <View className="flex-1 min-w-[150px]">
          <TextComponent
            text={profile?.city || ""}
            type="input"
            label="City"
            className="w-full"
            onValueChange={handleCityChange}
            editable="yes"
          />
        </View>
      </View>

      {/* Radio buttons adapt naturally */}
      <TextWithIcon
        text="Work Preference"
        icon="BuildingOffice"
        type="radio"
        radioNum="3"
        radioLabel="*icon*BuildingOffice&*text*Office|*icon*HouseLine&*text*Remote|*text*Hybrid"
        editable="yes"
        onValueChange={handleWorkStyleChange}
      />
    </ScrollView>
  );
}
```

## Performance Considerations

### Component Selection for Performance

**TextWithIcon** (Heavier):

- More features and logic
- Icon rendering overhead
- Radio button state management
- Use for primary, important fields

**TextComponent** (Lighter):

- Minimal feature set
- Faster rendering
- Less memory usage
- Use for secondary fields or long forms

### Optimization Tips

```tsx
// ✅ Good: Use TextComponent for many simple fields
const SecondaryFields = React.memo(() => (
  <View>
    {fields.map((field) => (
      <TextComponent
        key={field.id}
        text={field.value}
        type="input"
        label={field.label}
        onValueChange={(value) => updateField(field.id, value)}
      />
    ))}
  </View>
));

// ✅ Good: Use TextWithIcon for key visual fields
const PrimaryFields = () => (
  <View>
    <TextWithIcon icon="IdentificationCard" {...nameProps} />
    <TextWithIcon icon="GlobeHemisphereEast" {...countryProps} />
  </View>
);
```

## Accessibility Guidelines

### Screen Reader Support

```tsx
// ✅ Good: Clear, descriptive text
<TextWithIcon
  icon="IdentificationCard"
  text="Enter your full legal name"
  type="input"
  onValueChange={handleNameChange}
  info="This should match your passport or ID"
/>

// ✅ Good: Meaningful labels
<TextComponent
  text={profile?.email || ""}
  type="input"
  label="Email Address"
  onValueChange={handleEmailChange}
/>

// ✅ Good: Clear radio options
<TextWithIcon
  text="Gender Identity"
  type="radio"
  radioLabel="*text*Male|*text*Female|*text*Non-binary|*text*Prefer not to say"
  onValueChange={handleGenderChange}
/>
```

## Common Patterns and Anti-Patterns

### ✅ Good Patterns

```tsx
// Mixed usage for visual hierarchy
<TextWithIcon icon="Star" text="Important Field" type="input" />
<TextComponent text="" label="Supporting Detail" type="input" />

// Consistent styling within sections
<View className="gap-3">
  <TextComponent className="w-[200px]" />
  <TextComponent className="w-[200px]" />
  <TextComponent className="w-[200px]" />
</View>

// Logical grouping
<Text className="section-title">Personal Info</Text>
{/* Use TextWithIcon for visual impact */}

<Text className="section-title">Additional Details</Text>
{/* Use TextComponent for clean inputs */}
```

### ❌ Anti-Patterns

```tsx
// ❌ Bad: Inconsistent widths
<TextComponent className="w-[150px]" />
<TextComponent className="w-[200px]" />
<TextComponent className="w-[180px]" />

// ❌ Bad: Overusing TextWithIcon for everything
<TextWithIcon icon="Star" text="Minor detail" />
<TextWithIcon icon="Info" text="Another minor detail" />

// ❌ Bad: No clear visual hierarchy
// All fields look the same without grouping
```

## Conclusion

- **TextWithIcon**: Perfect for primary fields, visual hierarchy, and complex interactions
- **TextComponent**: Ideal for secondary fields, clean design, and performance-critical sections

Choose based on the importance and complexity of each field in your form!
