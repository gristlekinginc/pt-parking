# Paleo Treats Parking Monitor - Architecture Documentation

## 🏗️ Application Overview

This is a production IoT parking monitoring system using **real LoRaWAN sensors** to track parking availability for small businesses. The system combines hardware sensors, serverless backend infrastructure, and a modern web dashboard to provide real-time parking status and analytics.

## 📁 Project Structure

```
.
├── src/                          # React Frontend
│   ├── components/
│   │   ├── analytics/            # Analytics dashboard components
│   │   │   ├── SensorStatsCards.tsx        # Quick stats overview
│   │   │   ├── MonthlyHoursChart.tsx       # Bar chart - monthly hours
│   │   │   ├── HourlyOccupancyChart.tsx    # Area chart - hourly patterns  
│   │   │   ├── WeeklyTrendsChart.tsx       # Heatmap - weekly patterns
│   │   │   ├── SensorTechnicalData.tsx     # "Nerd Box" - 6 technical metrics
│   │   │   └── InsightsSection.tsx         # Personal message section
│   │   ├── ui/                   # Reusable UI components (shadcn/ui)
│   │   ├── PaleoTreatsLogo.tsx   # Branded header with heart animation
│   │   ├── ParkingStatusCard.tsx # Main status display (FREE/OCCUPIED)
│   │   └── ParkingAnalytics.tsx  # Analytics container/grid layout
│   ├── hooks/
│   │   └── useParkingSensor.tsx  # Real sensor data management
│   ├── pages/
│   │   └── Index.tsx             # Main page component
│   └── App.tsx                   # Root application
├── api/                          # Cloudflare Workers Backend
│   ├── index.ts                  # Main worker with 5 API endpoints
│   ├── schema.sql                # Database schema (2 tables)
│   ├── wrangler.toml             # Worker configuration (DO NOT COMMIT)
│   └── wrangler.toml.example     # Template for public use
├── examples/                     # Real sensor payload samples
├── public/                       # Static assets including MetSci logo
└── dist/                         # Built frontend (auto-generated)
```

## 🎯 Core Components Architecture

### 1. Hardware Layer
- **Sensor**: MeteoScientific Fleximodo In Ground parking sensor
- **Network**: Helium IoT Network (LoRaWAN)
- **Gateway**: Helium hotspot in your area
- **Signal**: 904.3 MHz, DR3, SF7/125kHz

### 2. Data Flow Pipeline

```
LoRaWAN Sensor → Helium Network → ChirpStack → Webhook → Cloudflare Worker → D1 Database → React Dashboard
```

#### Webhook Payload Structure
```json
{
  "deviceInfo": {
    "devEui": "1a2b3c4d5e6f7890",
    "deviceName": "SENSOR01 - underground"
  },
  "object": {
    "parkingStatus": "FREE", // or "BUSY"
    "statusChanged": true
  },
  "rxInfo": [{
    "rssi": -89,
    "snr": 10.5,
    "gatewayId": "a1b2c3d4e5f67890",
    "metadata": {
      "gateway_name": "snapping-purple-alligator",
      "network": "helium_iot"
    }
  }],
  "time": "2025-01-17T19:18:11.582+00:00"
}
```

### 3. Backend Infrastructure (Cloudflare Workers)

#### Database Schema
```sql
-- Main log table (all sensor readings)
parking_status_log (
  id INTEGER PRIMARY KEY,
  dev_eui TEXT,
  device_name TEXT, 
  status TEXT CHECK(status IN ('FREE', 'OCCUPIED')),
  status_changed BOOLEAN,
  timestamp TEXT,
  rssi INTEGER,
  snr REAL,
  gateway_id TEXT,
  gateway_name TEXT,
  gateway_lat REAL,
  gateway_long REAL
);

-- Latest status table (current state)
latest_parking_status (
  dev_eui TEXT PRIMARY KEY,
  device_name TEXT,
  status TEXT CHECK(status IN ('FREE', 'OCCUPIED')),
  timestamp TEXT
);
```

#### API Endpoints
```typescript
POST /update              // Webhook for sensor data (authenticated)
GET  /status              // Current parking status
GET  /analytics/stats     // Dashboard statistics
GET  /analytics/monthly   // Monthly usage data for bar chart
GET  /analytics/weekly    // Weekly heatmap data (7 days × 13 hours)
GET  /analytics/best-times // Best/worst times analysis
```

#### Security Features
- **Webhook Authentication**: Bearer token verification
- **Input Validation**: Schema validation on all inputs
- **Rate Limiting**: 120 requests/minute max
- **CORS Protection**: Configurable origin restrictions
- **SQL Injection Prevention**: Prepared statements
- **Device ID Masking**: No hardware IDs exposed publicly

### 4. Frontend Architecture (React + TypeScript)

#### Component Hierarchy
```
Index.tsx (Main Page)
├── PaleoTreatsLogo.tsx (Branded header)
├── ParkingStatusCard.tsx (Live status: FREE/OCCUPIED)
├── Refresh Button (Manual sensor refresh)
└── ParkingAnalytics.tsx (Analytics grid container)
    ├── SensorStatsCards.tsx (4 quick stats)
    ├── MonthlyHoursChart.tsx (6-month bar chart)
    ├── HourlyOccupancyChart.tsx (24-hour area chart)
    ├── WeeklyTrendsChart.tsx (7×13 heatmap grid)
    ├── SensorTechnicalData.tsx (6 technical metrics)
    └── InsightsSection.tsx (Personal message)
```

#### Data Management Hook
```typescript
useParkingSensor() {
  // Real-time sensor data fetching
  // Smart offline detection based on business hours
  // 30-second update intervals
  // Error handling and loading states
}
```

#### Intelligent Features
- **Smart Offline Detection**: Business-aware offline thresholds
- **Predictive Analytics**: Next-hour availability prediction
- **Intelligent Defaults**: Uses owner schedule until 2+ weeks of data
- **Responsive Design**: Mobile-first with breakpoint optimizations

## 📊 Component Breakdown

### Live Status Components

#### ParkingStatusCard.tsx
**Purpose**: Main real-time status display
**Features**: 
- Large VACANT/OCCUPIED status with color coding
- Sensor online/offline badge
- Device type display ("Fleximodo In Ground")
- Last updated timestamp
- Animated status changes

#### PaleoTreatsLogo.tsx  
**Purpose**: Branded header with business identity
**Features**:
- Animated heart logo with pulse effect
- Pink/purple gradient background
- Company branding integration

### Analytics Dashboard Components

#### SensorStatsCards.tsx
**Purpose**: Quick overview statistics in card format
**Displays**:
- Monthly parking hours (from real data)
- Peak usage percentage
- Next hour availability prediction
- Total uplinks received (real packet count)

#### MonthlyHoursChart.tsx
**Purpose**: Historical usage trends by month
**Data Source**: 6 months of OCCUPIED status aggregation
**Chart Type**: Recharts bar chart with responsive design

#### HourlyOccupancyChart.tsx  
**Purpose**: Daily usage patterns by hour
**Data Source**: Historical hourly occupancy percentages
**Chart Type**: Recharts area chart, 6AM-10PM range

#### WeeklyTrendsChart.tsx (WeeklyHeatmapChart)
**Purpose**: Weekly usage heatmap showing day×hour patterns
**Data Source**: 
- **Default Mode**: Owner working schedule (first 2 weeks)
- **Data Mode**: Real historical data (after 20+ data points)
**Format**: 7 days × 13 hours (8AM-8PM) grid
**Intelligence**: Automatically switches from defaults to real data

#### SensorTechnicalData.tsx
**Purpose**: Technical "Nerd Box" for sensor diagnostics
**6 Metrics Displayed**:
1. **RSSI**: Signal strength (-67 to -116 dBm range)
2. **SNR**: Signal quality (8.5 to 10.8 dB range)  
3. **Gateway**: "snapping-purple-alligator" + HELIUM IOT
4. **Frequency**: 904.3 MHz + DR3 data rate
5. **Frame Count**: Current session count (350+)
6. **Total Packets**: All-time uplinks received

#### InsightsSection.tsx
**Purpose**: Personal messaging and MeteoScientific branding
**Content**:
- Personal message about contacting business when spot occupied
- MeteoScientific logo and attribution
- Fleximodo sensor credit

## 🔧 Data Management

### Real Sensor Integration
- **Provider**: MeteoScientific via ChirpStack console
- **Network**: Helium IoT Network (decentralized LoRaWAN)
- **Updates**: Real sensor data every ~2-5 minutes
- **Webhook**: Authenticated via Bearer token
- **Payload**: 10-byte LoRaWAN frames decoded to JSON

### Intelligent Business Logic
- **Offline Detection**: Business-hour aware thresholds
- **Default Patterns**: Owner working schedule as fallback
- **Data Transition**: Auto-switch to real data after 2+ weeks
- **Predictive Analytics**: Next-hour availability based on patterns

## 🎨 Design System

### Color Scheme
```css
--paleo-pink: hsl(320 85% 60%)
--paleo-purple: hsl(280 70% 65%)  
--paleo-success: hsl(145 70% 55%)
--paleo-warning: hsl(45 95% 65%)
```

### Component Styling
- **Cards**: Gradient backgrounds with branded shadows
- **Status**: Color-coded (green=vacant, orange=occupied)
- **Animations**: Pulse, bounce, and scale transitions
- **Icons**: Lucide React icon library
- **Typography**: Inter font family

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile**: Single column layout, compact cards
- **Tablet**: 2-column grid layout
- **Desktop**: 3-4 column grid with larger visualizations

### Mobile Optimizations
- Smaller heatmap cells (h-6 vs h-8)
- Compressed technical data layout
- Touch-friendly buttons and interactions
- Reduced padding and margins

## 🔄 Real-Time Data Flow

### Update Cycle
1. **Sensor** detects status change → sends LoRaWAN uplink
2. **Helium Network** routes to gateway → forwards to ChirpStack
3. **ChirpStack** decodes → sends authenticated webhook
4. **Cloudflare Worker** validates → stores in D1 database
5. **React Frontend** polls every 30 seconds → updates UI

### Smart Offline Detection Logic
```typescript
// Business-aware offline detection
if (businessHours && recentActivity) {
  showOffline = hoursWithoutUpdate > 0.1  // 6 minutes
} else {
  showOffline = hoursWithoutUpdate >= 6   // 6 hours  
}
```

## 🛠️ Technologies Used

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent UI components
- **Recharts** for responsive data visualization
- **Lucide React** for consistent iconography

### Backend Stack  
- **Cloudflare Workers** (serverless runtime)
- **Cloudflare D1** (SQLite-based database)
- **Wrangler** for deployment and management

### Hardware Stack
- **MeteoScientific Fleximodo** in-ground parking sensor
- **Helium IoT Network** (LoRaWAN)
- **ChirpStack** application server

## 🚀 Deployment Architecture

### Infrastructure
- **Frontend**: Cloudflare Pages (CDN + edge delivery)
- **API**: Cloudflare Workers (global edge compute)
- **Database**: Cloudflare D1 (distributed SQLite)
- **Secrets**: Cloudflare Workers secrets (encrypted)

### Cost Structure
- **Hardware**: ~$200-300 (one-time sensor cost)
- **Monthly**: $0 (free tier covers small business usage)
- **Scalability**: Pay-as-you-grow pricing model

## 📋 Future Enhancement Ideas

### Technical Improvements
- **Temperature Monitoring**: Add ground temperature from sensor
- **Battery Alerts**: Low battery notifications
- **Multi-Sensor**: Support for multiple parking spots
- **Historical Export**: CSV/JSON data export

### Business Features  
- **Reservation System**: Allow customers to reserve spots
- **Push Notifications**: Real-time availability alerts
- **Weather Integration**: Correlate usage with weather patterns
- **Admin Dashboard**: Sensor management and configuration

### Analytics Enhancements
- **Machine Learning**: Predict busy periods more accurately
- **A/B Testing**: Test different notification strategies
- **Usage Reports**: Monthly business intelligence reports
- **Customer Insights**: Understand visitor patterns

---

*This architecture supports a real-world IoT deployment serving actual customers while maintaining enterprise-grade security and reliability on a small business budget.*
