# TextWithIcon Component Guide

A versatile React Native component that displays text with an icon and supports multiple interaction types including input, select, radio buttons, and more.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Component Types](#component-types)
- [Props Reference](#props-reference)
- [Examples](#examples)
- [Radio Button Features](#radio-button-features)
- [Icon Support](#icon-support)
- [Styling](#styling)

## Basic Usage

```tsx
import TextWithIcon from "@/components/TextWithIcon";

<TextWithIcon icon="Star" text="Basic Text" type="default" editable="yes" />;
```

## Component Types

### 1. Default (`type="default"`)

Simple text display with icon.

```tsx
<TextWithIcon icon="Star" text="Default Text" type="default" />
```

### 2. Input (`type="input"`)

Text input field with icon.

```tsx
<TextWithIcon
  icon="IdentificationCard"
  text="Enter your name"
  type="input"
  className="w-[240px]"
  onValueChange={(value) => console.log(value)}
  editable="yes"
/>
```

### 3. Select (`type="select"`)

Dropdown selection with options.

```tsx
<TextWithIcon
  icon="Cake"
  text="Select Age"
  type="select"
  options={["18", "19", "20", "21", "22"]}
  onValueChange={(value) => console.log(value)}
  editable="yes"
/>
```

### 4. Country Select (`type="selectCountry"`)

Special dropdown for country selection with flags.

```tsx
<TextWithIcon
  icon="GlobeHemisphereEast"
  text="Select Country"
  type="selectCountry"
  onValueChange={(value) => console.log(value)}
  editable="yes"
/>
```

### 5. Radio Buttons (`type="radio"`)

Radio button group with customizable options.

```tsx
<TextWithIcon
  text="Gender Selection"
  icon="GenderMale"
  type="radio"
  radioNum="3"
  radioLabel="*icon*GenderMale|*icon*GenderFemale|*text*Other"
  radioColor="same&#FF6B6B&#4ECDC4"
  editable="yes"
  onValueChange={(value) => console.log(value)}
/>
```

### 6. Language Skill (`type="LanSkill"`)

Special display for language proficiency levels.

```tsx
<TextWithIcon icon="ChatsCircle" text="N2" type="LanSkill" />
```

### 7. Train Station (`type="TrainSt"`)

Special display for train station information.

```tsx
<TextWithIcon icon="Train" text="Shinjuku" text2nd="15" type="TrainSt" />
```

## Props Reference

| Prop            | Type                      | Default     | Description                        |
| --------------- | ------------------------- | ----------- | ---------------------------------- |
| `icon`          | `string`                  | -           | Icon name from supported icon list |
| `text`          | `string`                  | -           | Display text or placeholder        |
| `type`          | `ComponentType`           | `"default"` | Component behavior type            |
| `className`     | `string`                  | -           | Additional styling classes         |
| `options`       | `string[]`                | `[]`        | Options for select type            |
| `onValueChange` | `(value: string) => void` | -           | Value change callback              |
| `text2nd`       | `string`                  | -           | Secondary text (for TrainSt type)  |
| `info`          | `string`                  | -           | Info tooltip text                  |
| `editable`      | `"yes" \| "no"`           | `"yes"`     | Whether component is editable      |
| `radioNum`      | `string`                  | `"2"`       | Number of radio buttons            |
| `radioLabel`    | `string`                  | `""`        | Radio button labels                |
| `radioColor`    | `string`                  | `"same"`    | Radio button colors                |

## Radio Button Features

### Label Format

Radio labels support icons and text with special syntax:

- **Icon only**: `*icon*IconName`
- **Text only**: `*text*Text Label`
- **Icon + Text**: `*icon*IconName&*text*Text Label`
- **Multiple options**: Separate with `|`

### Examples:

```tsx
// Icons only
radioLabel = "*icon*GenderMale|*icon*GenderFemale|*icon*Star";

// Text only
radioLabel = "*text*Option 1|*text*Option 2|*text*Option 3";

// Mixed
radioLabel = "*icon*Star&*text*Important|*text*Normal|*icon*Clock&*text*Time";
```

### Color Customization

Control individual radio button colors:

```tsx
// Default color for all
radioColor = "same";

// Different colors (order matches radio buttons)
radioColor = "same&#FF6B6B&#4ECDC4";
// 1st: default blue, 2nd: red, 3rd: teal

// All custom colors
radioColor = "#FFD93D&#6BCF7F&#FF6B6B";
```

### Layout

- Radio buttons display horizontally (`flex-row`)
- Automatically wrap to new lines if needed
- Compact spacing for better UI

## Icon Support

### Available Icons

The component supports these icons from Phosphor React Native:

**Basic Icons:**

- `Star`, `Clock`, `Info`, `At`, `Cake`

**Building & Location:**

- `BuildingOffice`, `Buildings`, `BuildingApartment`
- `HouseLine`, `MapPin`, `MapPinArea`, `MapTrifold`

**Transportation:**

- `Train`, `Tram`, `Footprints`

**Business & Work:**

- `Certificate`, `Newspaper`, `GraduationCap`

**Communication:**

- `ChatsCircle`, `Numpad`

**Gender:**

- `GenderMale`, `GenderFemale`

**Currency & Location:**

- `CurrencyJpy`, `CurrencyKzt`
- `GlobeHemisphereEast`

**UI Elements:**

- `CaretDown`, `GitCommit`, `CalendarDots`

### Multiple Icons

You can display two icons by separating with `&`:

```tsx
<TextWithIcon icon="HouseLine&Footprints" text="Home Station" type="select" />
```

## Styling

### Size Classes

Control text size with className:

```tsx
className = "!text-[16px]"; // Custom size
className = "!text-[12px]"; // Small text
className = "!text-[20px]"; // Large text
```

### Width Control

Set component width:

```tsx
className = "w-[240px]"; // Fixed width
className = "!w-[183px]"; // Override width
className = "min-w-[100px]"; // Minimum width
```

### Combining Styles

```tsx
className = "w-[240px] !text-[14px]";
```

## Complete Examples

### User Profile Form

```tsx
// Name input
<TextWithIcon
  icon="IdentificationCard"
  text="Enter your name"
  type="input"
  className="w-[240px]"
  onValueChange={handleNameChange}
  info="Enter your full name as it appears on official documents."
  editable="yes"
/>

// Age selection
<TextWithIcon
  icon="Cake"
  text="Select Age"
  type="select"
  options={["18", "19", "20", "21", "22", "23", "24", "25"]}
  className="w-[150px]"
  onValueChange={handleAgeChange}
  editable="yes"
/>

// Country selection
<TextWithIcon
  icon="GlobeHemisphereEast"
  text="Select Country"
  type="selectCountry"
  className="w-[240px]"
  onValueChange={handleCountryChange}
  editable="yes"
/>

// Gender selection with radio buttons
<TextWithIcon
  text="Gender"
  icon="GenderMale"
  type="radio"
  radioNum="3"
  radioLabel="*icon*GenderMale|*icon*GenderFemale|*text*Other"
  radioColor="same&#FF6B6B&#4ECDC4"
  editable="yes"
  onValueChange={handleGenderChange}
/>
```

### Work Preference Form

```tsx
<TextWithIcon
  text="Work Style"
  icon="BuildingOffice"
  type="radio"
  radioNum="3"
  radioLabel="*icon*BuildingOffice&*text*Office|*icon*HouseLine&*text*Remote|*text*Hybrid"
  radioColor="#1E40AF&#059669&#DC2626"
  editable="yes"
  onValueChange={handleWorkStyleChange}
/>
```

### Japanese Language Level

```tsx
<TextWithIcon
  icon="ChatsCircle"
  text="Japanese Level"
  type="select"
  options={["N5", "N4", "N3", "N2", "N1"]}
  className="!w-[183px] !text-[12px]"
  onValueChange={handleJapaneseLevelChange}
  editable="yes"
/>
```

## Best Practices

1. **Consistent Sizing**: Use consistent width classes across related components
2. **Icon Selection**: Choose icons that clearly represent the field purpose
3. **Radio Labels**: Keep radio labels concise and clear
4. **Color Coordination**: Use colors that match your app's design system
5. **Accessibility**: Always provide meaningful text labels
6. **Validation**: Handle value changes appropriately in your callbacks

## Error Handling

The component handles various edge cases:

- Missing icons default to available alternatives
- Empty radio labels show no text (no default "Option" text)
- Invalid colors fall back to default blue
- Disabled state (editable="no") reduces opacity and disables interactions

## TypeScript Support

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { ComponentType } from "@/components/TextWithIcon";

type MyType = ComponentType; // "default" | "input" | "select" | etc.
```
