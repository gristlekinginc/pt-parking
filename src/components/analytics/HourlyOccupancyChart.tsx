import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface HourlyData {
  hour: string;
  occupied: number;
}

const chartConfig = {
  occupied: {
    label: "% Occupied",
    color: "hsl(var(--paleo-purple))",
  },
};

const HourlyOccupancyChart = () => {
  const [hourlyOccupancyData, setHourlyOccupancyData] = useState<HourlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/hourly`);
        if (response.ok) {
          const data = await response.json();
          setHourlyOccupancyData(data);
        }
      } catch (error) {
        console.error('Error fetching hourly data:', error);
        // Fallback to default pattern if API fails
        setHourlyOccupancyData([
          { hour: '6AM', occupied: 0 },
          { hour: '8AM', occupied: 0 },
          { hour: '10AM', occupied: 0 },
          { hour: '12PM', occupied: 0 },
          { hour: '2PM', occupied: 0 },
          { hour: '4PM', occupied: 0 },
          { hour: '6PM', occupied: 0 },
          { hour: '8PM', occupied: 0 },
          { hour: '10PM', occupied: 0 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHourlyData();
    // Update every 5 minutes
    const interval = setInterval(fetchHourlyData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fun-shadow">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
          ⏰ Peak Hours Analysis
        </CardTitle>
        <CardDescription>
          When is our parking spot most popular? 🚗
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-paleo-purple">
            Loading chart data...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-64">
            <AreaChart data={hourlyOccupancyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                dataKey="occupied" 
                fill="hsl(var(--paleo-purple))" 
                stroke="hsl(var(--paleo-pink))" 
                strokeWidth={3}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default HourlyOccupancyChart;
