import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface WeeklyData {
  day: string;
  usage: number;
}

const chartConfig = {
  usage: {
    label: "Usage %",
    color: "hsl(var(--paleo-pink))",
  },
};

const WeeklyTrendsChart = () => {
  const [weeklyTrendsData, setWeeklyTrendsData] = useState<WeeklyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/weekly`);
        if (response.ok) {
          const data = await response.json();
          setWeeklyTrendsData(data);
        }
      } catch (error) {
        console.error('Error fetching weekly data:', error);
        // Fallback to default pattern if API fails
        setWeeklyTrendsData([
          { day: 'Mon', usage: 0 },
          { day: 'Tue', usage: 0 },
          { day: 'Wed', usage: 0 },
          { day: 'Thu', usage: 0 },
          { day: 'Fri', usage: 0 },
          { day: 'Sat', usage: 0 },
          { day: 'Sun', usage: 0 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyData();
    // Update every 5 minutes
    const interval = setInterval(fetchWeeklyData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fun-shadow">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
          📅 Weekly Usage Trends
        </CardTitle>
        <CardDescription>
          Which days are busiest for our Paleo Treats team? 💼
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-paleo-purple">
            Loading chart data...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-64">
            <LineChart data={weeklyTrendsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                dataKey="usage" 
                stroke="hsl(var(--paleo-pink))" 
                strokeWidth={4}
                dot={{ fill: "hsl(var(--paleo-purple))", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTrendsChart;
