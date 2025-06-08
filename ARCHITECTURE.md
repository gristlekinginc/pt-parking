
# Paleo Treats Parking Monitor - Architecture Documentation

## 🏗️ Application Overview

This is a single-page React application that monitors the parking status for Paleo Treats using a fun, branded interface. The app displays real-time parking data, analytics charts, and sensor statistics with a playful pink and purple theme.

## 📁 Project Structure

```
src/
├── components/
│   ├── analytics/           # Analytics dashboard components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── PaleoTreatsLogo.tsx # Main branding header
│   └── ParkingStatusCard.tsx # Live status display
├── hooks/
│   └── useParkingSensor.tsx # Parking data management
├── pages/
│   └── Index.tsx           # Main page component
└── App.tsx                 # Root application component
```

## 🎯 Core Components Architecture

### 1. Main Application Flow
- **App.tsx** → **Index.tsx** → All child components
- Data flows from `useParkingSensor` hook to display components
- Real-time updates every 5 seconds via simulated sensor data

### 2. Component Hierarchy

```
Index.tsx (Main Page)
├── PaleoTreatsLogo.tsx
├── ParkingStatusCard.tsx
├── Refresh Button
└── ParkingAnalytics.tsx
    ├── SensorStatsCards.tsx
    ├── MonthlyHoursChart.tsx
    ├── HourlyOccupancyChart.tsx
    ├── WeeklyTrendsChart.tsx
    ├── SensorTechnicalData.tsx
    └── InsightsSection.tsx
```

## 📊 Component Breakdown

### Live Status Components

#### PaleoTreatsLogo.tsx
**Purpose**: Brand header with animated heart logo
**Location**: `src/components/PaleoTreatsLogo.tsx`
**Used in**: `Index.tsx`
**Features**: 
- Animated heart icon with pulse effect
- Paleo Treats branding
- Pink gradient background

#### ParkingStatusCard.tsx
**Purpose**: Main live status display showing if parking spot is occupied/vacant
**Location**: `src/components/ParkingStatusCard.tsx`
**Used in**: `Index.tsx`
**Props**: 
- `isOccupied: boolean` - Current parking status
- `lastUpdated: Date` - Timestamp of last sensor reading
- `sensorStatus: 'online' | 'offline'` - Sensor connectivity status
**Features**:
- Large status display with icons
- Color-coded backgrounds (green for vacant, orange for occupied)
- Sensor status badge
- Animated elements

### Analytics Dashboard Components

#### ParkingAnalytics.tsx
**Purpose**: Container component for all analytics widgets
**Location**: `src/components/ParkingAnalytics.tsx`
**Used in**: `Index.tsx`
**Features**: Responsive grid layout for analytics components

#### SensorStatsCards.tsx
**Purpose**: Quick stats overview in card format
**Location**: `src/components/analytics/SensorStatsCards.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Displays**:
- Monthly parking hours (203h)
- Peak usage percentage (88%)
- Current availability (40%)
- Total data packets (15.2k)

#### MonthlyHoursChart.tsx
**Purpose**: Bar chart showing parking hours by month
**Location**: `src/components/analytics/MonthlyHoursChart.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Data**: 6 months of parking hour totals
**Chart Type**: Bar chart using Recharts

#### HourlyOccupancyChart.tsx
**Purpose**: Area chart showing occupancy patterns by hour of day
**Location**: `src/components/analytics/HourlyOccupancyChart.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Data**: Hourly occupancy percentages from 6AM-10PM
**Chart Type**: Area chart using Recharts

#### WeeklyTrendsChart.tsx
**Purpose**: Line chart showing usage trends by day of week
**Location**: `src/components/analytics/WeeklyTrendsChart.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Data**: Weekly usage percentages Monday-Sunday
**Chart Type**: Line chart using Recharts

#### SensorTechnicalData.tsx
**Purpose**: "Nerd Box" displaying technical sensor metrics
**Location**: `src/components/analytics/SensorTechnicalData.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Displays**:
- RSSI (Signal Strength): -67 dBm
- SNR (Signal Quality): 8.5 dB
- Total Packets Received: 15,247
**Features**: Color-coded status indicators

#### InsightsSection.tsx
**Purpose**: Fun insights and tips about parking patterns
**Location**: `src/components/analytics/InsightsSection.tsx`
**Used in**: `ParkingAnalytics.tsx`
**Content**:
- Best time to visit (8-10 AM)
- Peak hours (12-3 PM)
- MeteoScientific branding section

## 🔧 Data Management

### useParkingSensor Hook
**Purpose**: Manages parking sensor data and provides real-time updates
**Location**: `src/hooks/useParkingSensor.tsx`
**Used in**: `Index.tsx`
**Returns**:
- `parkingData`: Current sensor readings
- `refreshSensor()`: Manual refresh function
**Features**:
- Simulates sensor updates every 5 seconds
- Random occupancy status (40% occupied probability)
- 95% sensor uptime simulation

## 🎨 Design System

### Color Scheme (defined in index.css)
- **Primary Pink**: `--paleo-pink` (320 85% 60%)
- **Purple Accent**: `--paleo-purple` (280 70% 65%)
- **Success Green**: `--paleo-success` (145 70% 55%)
- **Warning Orange**: `--paleo-warning` (45 95% 65%)

### Custom CSS Classes
- `.paleo-gradient-fun`: Multi-stop pink/purple gradient
- `.parking-vacant`: Green gradient for available status
- `.parking-occupied`: Orange gradient for occupied status
- `.fun-shadow`: Pink-tinted drop shadow
- `.bounce-fun`: Custom bounce animation
- `.pulse-fun`: Custom pulse animation

## 📱 Responsive Design

The application uses a mobile-first responsive design:
- Grid layouts adjust from 1 column (mobile) to 2-4 columns (desktop)
- Charts maintain readability on all screen sizes
- Cards stack vertically on mobile devices

## 🔄 Data Flow

1. **useParkingSensor** generates simulated sensor data every 5 seconds
2. Data flows to **Index.tsx** as props
3. **ParkingStatusCard** displays live status
4. **ParkingAnalytics** shows historical analytics (static data)
5. User can manually refresh via button in **Index.tsx**

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router DOM** for routing

## 🚀 Development Notes

### Adding New Analytics Components
1. Create component in `src/components/analytics/`
2. Import and add to `ParkingAnalytics.tsx` grid
3. Use existing color scheme and shadow classes
4. Follow naming convention: `[Feature][Type].tsx`

### Modifying Sensor Data
- Edit `useParkingSensor.tsx` for different update intervals
- Modify probability values for different occupancy patterns
- Replace with actual sensor API calls when ready

### Styling Guidelines
- Use semantic color tokens from design system
- Apply `.fun-shadow` class for consistent shadows
- Use gradient classes for branded backgrounds
- Follow mobile-first responsive patterns

## 📋 Future Enhancement Ideas

- Real sensor integration (replace simulated data)
- Historical data storage and retrieval
- Push notifications for status changes
- Admin dashboard for sensor management
- Multiple parking spot support
- Weather integration for usage predictions
