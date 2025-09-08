# TextComponent Guide

A simple React Native component for text input and selection without icons. Provides floating label animation and clean styling.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Component Types](#component-types)
- [Props Reference](#props-reference)
- [Examples](#examples)
- [Styling](#styling)
- [Features](#features)

## Basic Usage

```tsx
import TextComponent from "@/components/TextComponent";

<TextComponent
  text="Enter text here"
  type="input"
  label="Label Text"
  editable="yes"
/>;
```

## Component Types

### 1. Default (`type="default"`)

Simple text display.

```tsx
<TextComponent text="Default Text" type="default" />
```

### 2. Input (`type="input"`)

Text input field with floating label animation.

```tsx
<TextComponent
  text="Enter your email"
  type="input"
  label="Email Address"
  className="w-[240px]"
  onValueChange={(value) => console.log(value)}
  editable="yes"
/>
```

### 3. Select (`type="select"`)

Dropdown selection without icon.

```tsx
<TextComponent
  text="Select Option"
  type="select"
  options={["Option 1", "Option 2", "Option 3"]}
  className="w-[200px]"
  onValueChange={(value) => console.log(value)}
  editable="yes"
/>
```

## Props Reference

| Prop            | Type                               | Default     | Description                           |
| --------------- | ---------------------------------- | ----------- | ------------------------------------- |
| `text`          | `string`                           | -           | Display text or input value           |
| `type`          | `"default" \| "input" \| "select"` | `"default"` | Component type                        |
| `className`     | `string`                           | `""`        | Additional styling classes            |
| `info`          | `string`                           | -           | Info text (not currently implemented) |
| `options`       | `string[]`                         | `[]`        | Options for select type               |
| `onValueChange` | `(value: string) => void`          | -           | Value change callback                 |
| `label`         | `string`                           | -           | Floating label text                   |
| `editable`      | `"yes" \| "no"`                    | `"yes"`     | Whether component is editable         |

## Examples

### Profile Form Fields

#### Input Fields

```tsx
// Basic text input
<TextComponent
  text=""
  type="input"
  label="Street Address"
  className="w-[300px]"
  onValueChange={handleStreetAddressChange}
  editable="yes"
/>

// With initial value
<TextComponent
  text={userProfile?.email || ""}
  type="input"
  label="Email Address"
  className="w-[280px]"
  onValueChange={handleEmailChange}
  editable="yes"
/>
```

#### Select Dropdowns

```tsx
// Time selection
<TextComponent
  text={userProfile?.availableToTime || "Select Time"}
  type="select"
  options={[
    "6:00", "7:00", "8:00", "9:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00"
  ]}
  className="w-[150px]"
  onValueChange={handleTimeChange}
  editable="yes"
/>

// Status selection
<TextComponent
  text="Select Status"
  type="select"
  options={["Active", "Inactive", "Pending"]}
  className="w-[180px]"
  onValueChange={handleStatusChange}
  editable="yes"
/>
```

### Complex Form Layout

```tsx
// Side-by-side components
<View className="flex-row gap-3">
  <TextComponent
    text={userProfile?.visaValidityPeriod || ""}
    type="input"
    label="Visa Validity"
    className="w-[150px] text-[14px]"
    onValueChange={handleVisaValidityChange}
    editable={isEditable}
  />

  <TextComponent
    text={userProfile?.residenceStatus || ""}
    type="input"
    label="Residence Status"
    className="w-[150px] text-[14px]"
    onValueChange={handleResidenceStatusChange}
    editable={isEditable}
  />
</View>
```

## Styling

### Size Classes

Control text size and component dimensions:

```tsx
// Text size
className = "text-[16px]"; // Default size
className = "text-[14px]"; // Smaller text
className = "text-[12px]"; // Small text

// Width control
className = "w-[240px]"; // Fixed width
className = "w-[150px]"; // Narrow width
className = "w-full"; // Full width

// Combined styling
className = "w-[200px] text-[14px]";
```

### Override Classes

Use `!` prefix to override default styles:

```tsx
className = "!w-[153px] !text-[14px]";
```

## Features

### 1. Floating Label Animation

- Label floats up when input is focused or has content
- Smooth animation transition
- Automatic positioning

### 2. Responsive Dropdown

- Scrollable when many options
- Auto-sizing based on content
- Clean border and shadow styling

### 3. Editable State Management

- Visual feedback when disabled (reduced opacity)
- Prevents interaction when `editable="no"`
- Maintains consistent styling

### 4. Focus Management

- Proper focus states for inputs
- Visual feedback during interaction
- Keyboard handling

## Usage in Profile Forms

### Personal Information

```tsx
// Name input
<TextComponent
  text={userProfile?.name || ""}
  type="input"
  label="Full Name"
  className="w-[300px]"
  onValueChange={handleNameChange}
  editable={isEditable}
/>

// Contact information
<TextComponent
  text={userProfile?.phoneNumber || ""}
  type="input"
  label="Phone Number"
  className="w-[250px]"
  onValueChange={handlePhoneChange}
  editable={isEditable}
/>
```

### Work Information

```tsx
// Current occupation
<TextComponent
  text={userProfile?.currentOccupation || ""}
  type="input"
  label="Current Job"
  className="w-[300px]"
  onValueChange={handleOccupationChange}
  editable={isEditable}
/>

// Work history
<TextComponent
  text={userProfile?.workHistory || ""}
  type="input"
  label="Work Experience"
  className="w-[350px]"
  onValueChange={handleWorkHistoryChange}
  editable={isEditable}
/>
```

### Time and Availability

```tsx
// Available hours
<View className="flex-row gap-3">
  <TextComponent
    text={userProfile?.availableFromTime || ""}
    type="select"
    options={timeOptions}
    className="w-[120px] text-[12px]"
    onValueChange={handleFromTimeChange}
    editable={isEditable}
  />

  <TextComponent
    text={userProfile?.availableToTime || ""}
    type="select"
    options={timeOptions}
    className="w-[120px] text-[12px]"
    onValueChange={handleToTimeChange}
    editable={isEditable}
  />
</View>
```

## Comparison with TextWithIcon

| Feature           | TextComponent | TextWithIcon        |
| ----------------- | ------------- | ------------------- |
| Icon Support      | ❌ No         | ✅ Yes              |
| Radio Buttons     | ❌ No         | ✅ Yes              |
| Country Selection | ❌ No         | ✅ Yes (with flags) |
| Floating Label    | ✅ Yes        | ❌ No               |
| Multiple Icons    | ❌ No         | ✅ Yes              |
| Info Tooltips     | ❌ No         | ✅ Yes              |
| Simpler API       | ✅ Yes        | ❌ More complex     |

## When to Use TextComponent

Choose `TextComponent` when you need:

- Simple text input without icon decoration
- Clean, minimalist design
- Floating label animation
- Basic dropdown selection
- Lighter weight component

Choose `TextWithIcon` when you need:

- Visual icon representation
- Radio button groups
- Country selection with flags
- Info tooltips
- More interactive features

## Best Practices

1. **Consistent Labeling**: Always provide clear, descriptive labels
2. **Appropriate Width**: Set widths that accommodate expected content
3. **Group Related Fields**: Use consistent styling for related inputs
4. **Validation**: Handle validation in your `onValueChange` callbacks
5. **Accessibility**: Ensure labels are meaningful for screen readers

## TypeScript Support

The component is fully typed:

```tsx
import TextComponent, { TextComponentType } from "@/components/TextComponent";

// Type definitions
type MyType = TextComponentType; // "default" | "input" | "select"

// Props interface
interface MyFormProps {
  onValueChange: (value: string) => void;
  editable: "yes" | "no";
}
```

## Error Handling

The component gracefully handles:

- Empty or undefined text values
- Missing options arrays
- Invalid className formats
- Focus state management
- Animation cleanup
