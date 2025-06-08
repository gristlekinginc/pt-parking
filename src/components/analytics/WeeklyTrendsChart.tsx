import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface HeatmapCell {
  day: string;
  dayIndex: number;
  hour: number;
  hourLabel: string;
  occupancyRate: number;
  availabilityRate: number;
}

const WeeklyHeatmapChart = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/weekly`);
        if (response.ok) {
          const data = await response.json();
          setHeatmapData(data);
        }
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
        // Fallback to default pattern if API fails
        setHeatmapData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeatmapData();
    // Update every 5 minutes
    const interval = setInterval(fetchHeatmapData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Get the color based on occupancy rate
  const getHeatColor = (occupancyRate: number): string => {
    if (occupancyRate >= 90) return 'bg-red-500'; // Very high (owner working)
    if (occupancyRate >= 70) return 'bg-red-400'; // High
    if (occupancyRate >= 50) return 'bg-orange-400'; // Medium-high
    if (occupancyRate >= 30) return 'bg-yellow-400'; // Medium
    if (occupancyRate >= 15) return 'bg-green-300'; // Low
    return 'bg-green-200'; // Very low (likely available)
  };

  // Get unique days and hours for the grid
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({length: 13}, (_, i) => i + 8); // 8am to 8pm

  // Create a lookup map for quick access
  const dataMap = new Map<string, HeatmapCell>();
  heatmapData.forEach(cell => {
    const key = `${cell.dayIndex}-${cell.hour}`;
    dataMap.set(key, cell);
  });

  return (
    <Card className="fun-shadow">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
          🔥 Weekly Occupancy Heatmap
        </CardTitle>
        <CardDescription>
          When is our spot typically occupied? Darker = more likely taken! 🚗
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        {isLoading ? (
          <div className="h-48 sm:h-64 flex items-center justify-center text-paleo-purple">
            Loading heatmap data...
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full">
              {/* Header row with days */}
              <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-1 mb-2">
                <div></div> {/* Empty corner */}
                {days.map(day => (
                  <div key={day} className="text-xs text-center text-paleo-purple font-medium p-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Data rows - each row is an hour */}
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-[50px_repeat(7,1fr)] gap-1 mb-1">
                  {/* Hour label */}
                  <div className="text-xs text-paleo-purple font-medium p-1 flex items-center justify-end">
                    {hour === 12 ? '12PM' : hour > 12 ? `${hour-12}PM` : `${hour}AM`}
                  </div>
                  
                  {/* Day cells for this hour */}
                  {days.map((day, dayIndex) => {
                    const cell = dataMap.get(`${dayIndex}-${hour}`);
                    const occupancyRate = cell?.occupancyRate || 5;
                    
                    return (
                      <div
                        key={`${dayIndex}-${hour}`}
                        className={`h-6 sm:h-8 rounded border border-white/20 ${getHeatColor(occupancyRate)} 
                                  hover:scale-105 transition-transform cursor-help relative group`}
                        title={`${day} ${hour === 12 ? '12PM' : hour > 12 ? `${hour-12}PM` : `${hour}AM`}: ${occupancyRate}% occupied`}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 
                                      opacity-0 group-hover:opacity-100 transition-opacity z-10
                                      bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {occupancyRate}% occupied
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4 text-xs flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-200 rounded border"></div>
                  <span className="text-paleo-purple">Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded border"></div>
                  <span className="text-paleo-purple">Sometimes</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded border"></div>
                  <span className="text-paleo-purple">Usually Taken</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyHeatmapChart;
