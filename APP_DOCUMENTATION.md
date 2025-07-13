# HyMatch - Job Matching App

## 📱 Application Overview

HyMatch is a React Native job matching application built with Expo that allows users to browse and interact with job listings through a swipeable card interface. The app uses session-based state management for simplicity and focuses on user experience with modern UI components.

## 🏗️ Architecture Overview

### **State Management Strategy**

- **Session-based Local State**: All job interactions are stored in React state during the session
- **No Database Persistence for Jobs**: Job status changes (swiped left/right) are temporary and reset on app restart
- **User Profile Persistence**: Only user profile data is stored in SQLite database
- **JSON Data Source**: Job listings are loaded from `data/jobData.json`

---

## 📂 File Structure & Component Guide

### **🎯 Main App Structure**

#### **`app/_layout.tsx`**

- **Purpose**: Root layout component for the entire app
- **Features**: Sets up navigation, theme provider, and global app configuration
- **Dependencies**: Theme context, navigation setup

#### **`app/(tabs)/_layout.tsx`**

- **Purpose**: Tab navigation layout component
- **Features**: Configures bottom tab navigation with icons and styling
- **Tabs**: Home (swipe interface), Explore (job list)

---

### **🏠 Core Screen Components**

#### **`app/(tabs)/index.tsx` - Home Screen (Main Swipe Interface)**

- **Purpose**: Primary job swiping interface where users make job decisions
- **Key Features**:
  - Loads jobs from JSON data (`jobData.json`)
  - Implements swipeable card interface for job browsing
  - Handles swipe left (reject) and swipe right (accept) actions
  - Applies filtering and sorting to job listings
  - Shows swipe direction indicators (heart/trash icons)
  - Session-based state management (no database persistence)
- **State Management**:
  - `jobs`: All jobs loaded from JSON
  - `filteredJobs`: Jobs after applying filters
  - `currentJobIndex`: Current position in job stack
  - `currentFilters`: Active filter options
- **Components Used**: SwipeableCard, FilterDropdown, HeaderComponent
- **Data Flow**: JSON → Local State → Filtered Jobs → SwipeableCard

#### **`app/(tabs)/explore.tsx` - Job List Screen**

- **Purpose**: Displays filtered job lists with status-based categorization
- **Key Features**:
  - Shows jobs in list format with status filtering
  - Displays job counts for each status category
  - Allows job status changes through list interactions
  - Pull-to-refresh functionality
  - Modal view for detailed job information
- **Filter Categories**: All, Pending, Chosen, Refused
- **Components Used**: ListComponent, HeaderComponent
- **Data Flow**: JSON → Props → ListComponent → Job Status Updates

#### **`app/profile.tsx` - User Profile Screen**

- **Purpose**: User profile management and settings
- **Features**: User information display and editing capabilities
- **Database**: Uses SQLite for persistent user data storage

---

### **🎴 Card & Interaction Components**

#### **`components/SwipeableCard.tsx` - Swipeable Job Card**

- **Purpose**: Interactive card component for job swiping
- **Key Features**:
  - Gesture-based swiping (left/right)
  - Visual feedback during swipe gestures
  - Swipe threshold detection
  - Callback functions for swipe completion
- **Props**: `jobData`, `onSwipeLeft`, `onSwipeRight`, `onSwipeStateChange`
- **Dependencies**: react-native-gesture-handler for swipe gestures

#### **`components/CardComponent.tsx` - Job Information Display**

- **Purpose**: Displays detailed job information in card format
- **Key Features**:
  - Company name, position, salary information
  - Language requirements and commute details
  - Station information with codes
  - Working hours and ratings display
  - Reusable separator and line components
- **Interface**: `JobData` - defines job data structure
- **Dependencies**: TextWithIcon, WeekDays components

#### **`components/JobListItem.tsx` - List Item for Job Display**

- **Purpose**: Compact job display for list views
- **Key Features**:
  - Swipeable actions for status changes
  - Touch interaction for detailed view
  - Status-dependent swipe options
  - Visual status indicators
- **Swipe Actions**: Choose (pending→chosen), Refuse (pending→refused)
- **Dependencies**: react-native-gesture-handler

---

### **📋 List & Navigation Components**

#### **`components/ListComponent.tsx` - Job List Manager**

- **Purpose**: Manages job list display with filtering and status management
- **Key Features**:
  - Horizontal scrollable status filter tabs
  - Job status counting and display
  - Modal for detailed job view
  - Refresh functionality through ref methods
  - Props-based job data (no direct database calls)
- **Filter Tabs**: All, Pending (保留中), Chosen (選択済み), Refused (拒否済み)
- **Props**: `jobs`, `filterStatus`, `onJobStatusChange`
- **State**: Local display jobs, filter selection, modal visibility

#### **`components/HeaderComponent.tsx` - App Header**

- **Purpose**: Consistent header across all screens
- **Features**: Title display, left/right action buttons, theme-aware styling
- **Props**: `leftButton`, `title`, `rightButton`, button press handlers

---

### **🔍 Filter & Search Components**

#### **`components/FilterDropdown.tsx` - Advanced Filtering**

- **Purpose**: Comprehensive filtering interface for job listings
- **Filter Categories**:
  - **Sort Options**: Salary, Commute Time (Home/School), Publication Date
  - **Profession Filter**: 13 job categories (仕分け, 配送, 清掃, etc.)
  - **Japanese Level**: N1-N5 proficiency levels
  - **Salary Range**: Adjustable ¥900-¥1800 range with +/-50 buttons
  - **Commute Ease**: Time ranges (~5分 to ~25分)
  - **Rating Filter**: 3.0+ to 4.5+ rating thresholds
- **Features**:
  - Collapsible sections for organized UI
  - Clear All functionality (resets all filters)
  - Apply Filters with immediate effect
  - Persistent filter state during session
- **Interface**: `FilterOptions` - defines filter structure

---

### **🎨 UI & Utility Components**

#### **`components/TextComponent.tsx` - Text Display**

- **Purpose**: Standardized text display with theme support
- **Features**: Consistent typography, theme-aware colors

#### **`components/TextWithIcon.tsx` - Icon + Text Display**

- **Purpose**: Combined icon and text display for job details
- **Features**: Various icon types, customizable styling, secondary text support
- **Icon Types**: BuildingOffice, GraduationCap, CurrencyJpy, ChatsCircle, etc.

#### **`components/WeekDays.tsx` - Schedule Display**

- **Purpose**: Displays working days and hours
- **Features**: Visual day selection, hours display, editable/read-only modes

#### **`components/ImagePickerComponent.tsx` - Image Selection**

- **Purpose**: Image selection and upload functionality
- **Features**: Camera and gallery access, image cropping

#### **`components/VideoPickerComponent.tsx` - Video Selection**

- **Purpose**: Video selection and upload functionality
- **Features**: Video recording and gallery selection

---

### **🎭 Theme & Context**

#### **`contexts/ThemeContext.tsx` - Theme Management**

- **Purpose**: Centralized theme and color management
- **Features**:
  - Light/dark mode support
  - Consistent color palette across app
  - Theme switching functionality
- **Colors**: background, surface, primary, text, textSecondary, border

---

### **🗄️ Data & Storage**

#### **`data/jobData.json` - Job Listings Data**

- **Purpose**: Static job data source
- **Structure**: Array of job objects with all required properties
- **Fields**: id, company, position, salary, languageSkill, walkTime, station, etc.

#### **`utils/database.ts` - Database Service**

- **Purpose**: SQLite database management (User Profiles Only)
- **Features**:
  - User profile CRUD operations
  - Location data management (prefectures, cities)
  - Database initialization and health checks
  - **Note**: Job-related methods removed for simplification
- **Tables**: user_profiles, prefectures, cities

---

## 🔄 Data Flow Architecture

### **Job Data Flow**

```
jobData.json → index.tsx (useState) → FilterDropdown → filteredJobs → SwipeableCard
                     ↓
            explore.tsx (props) → ListComponent → JobListItem
```

### **State Management Flow**

```
1. App Launch → Load JSON data → Set initial state
2. User Interaction → Update local state → Re-render UI
3. Filter Application → Process jobs → Update filtered results
4. Session End → All job states reset (no persistence)
```

### **User Profile Flow**

```
Profile Screen → DatabaseService → SQLite → Persistent Storage
```

---

## 🚀 Key Features

### **✨ Swipe Interface**

- Intuitive left/right swipe gestures
- Visual feedback during swipes
- Automatic progression through job stack
- Reset functionality for new sessions

### **📊 Filtering System**

- Multi-category filtering
- Real-time filter application
- Clear all functionality
- Horizontal scrollable filter tabs

### **📱 Responsive Design**

- Horizontal scrolling for filter overflow
- Modal dialogs for detailed views
- Theme-aware components
- Consistent spacing and typography

### **⚡ Performance**

- Session-based state (no database overhead for jobs)
- Efficient filtering algorithms
- Lazy loading where applicable
- Optimized re-renders

---

## 🛠️ Development Notes

### **State Strategy Decision**

- **Simplified Architecture**: Removed job database persistence for easier maintenance
- **Session-based**: Job interactions are temporary, suitable for demo/prototype
- **User Data Persistence**: Only user profiles need permanent storage

### **Component Design Philosophy**

- **Separation of Concerns**: Each component has a specific responsibility
- **Props-based Communication**: Parent components manage state, children receive props
- **Reusable Components**: Common UI elements are abstracted into reusable components
- **Theme Consistency**: All components use centralized theme system

### **Future Considerations**

- Add job persistence if needed (database service ready)
- Implement push notifications for new jobs
- Add job application tracking
- Enhance filtering with location-based sorting

---

## 📱 User Journey

1. **App Launch**: User sees swipeable job cards loaded from JSON
2. **Job Browsing**: Swipe right (accept) or left (reject) jobs
3. **Filtering**: Apply filters to find specific types of jobs
4. **List View**: Switch to explore tab to see categorized job lists
5. **Job Details**: Tap on jobs for detailed modal view
6. **Status Management**: Change job status through list interactions
7. **Session End**: All interactions reset on app restart

---

## 🎯 Component Dependencies

```
App Root
├── ThemeContext (Global)
├── Navigation Tabs
│   ├── Home Tab (index.tsx)
│   │   ├── SwipeableCard
│   │   │   └── CardComponent
│   │   │       ├── TextWithIcon
│   │   │       └── WeekDays
│   │   ├── FilterDropdown
│   │   └── HeaderComponent
│   └── Explore Tab (explore.tsx)
│       ├── ListComponent
│       │   ├── JobListItem
│       │   └── CardComponent (Modal)
│       └── HeaderComponent
└── Database Service (User Profiles Only)
```

This documentation provides a comprehensive overview of the HyMatch application structure, making it easy to understand the purpose and functionality of each component and how they work together to create the complete user experience.
