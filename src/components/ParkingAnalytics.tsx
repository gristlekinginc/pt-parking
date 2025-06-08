import SensorStatsCards from "./analytics/SensorStatsCards";
import MonthlyHoursChart from "./analytics/MonthlyHoursChart";
import HourlyOccupancyChart from "./analytics/HourlyOccupancyChart";
import WeeklyHeatmapChart from "./analytics/WeeklyTrendsChart";
import SensorTechnicalData from "./analytics/SensorTechnicalData";
import InsightsSection from "./analytics/InsightsSection";

const ParkingAnalytics = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4 sm:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-paleo-pink-dark mb-2">
          📊 Parking Analytics Dashboard
        </h2>
        <p className="text-sm sm:text-base text-paleo-purple font-medium">
          ✨ Fun insights about our sweet parking spot! ✨
        </p>
      </div>

      {/* Stats Cards */}
      <SensorStatsCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <MonthlyHoursChart />
        <HourlyOccupancyChart />
        <WeeklyHeatmapChart />
        <SensorTechnicalData />
      </div>

      {/* Fun Insights */}
      <InsightsSection />
    </div>
  );
};

export default ParkingAnalytics;
