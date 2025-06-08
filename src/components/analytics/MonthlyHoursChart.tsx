import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface MonthlyData {
  month: string;
  hours: number;
}

const chartConfig = {
  hours: {
    label: "Hours Parked",
    color: "hsl(var(--paleo-pink))",
  },
};

const MonthlyHoursChart = () => {
  const [monthlyHoursData, setMonthlyHoursData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/monthly`);
        if (response.ok) {
          const data = await response.json();
          setMonthlyHoursData(data);
        }
      } catch (error) {
        console.error('Error fetching monthly data:', error);
        // Fallback to default data if API fails
        setMonthlyHoursData([
          { month: 'Dec', hours: 0 },
          { month: 'Jan', hours: 0 },
          { month: 'Feb', hours: 0 },
          { month: 'Mar', hours: 0 },
          { month: 'Apr', hours: 0 },
          { month: 'May', hours: 0 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyData();
    // Update every 5 minutes
    const interval = setInterval(fetchMonthlyData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fun-shadow">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
          📈 Monthly Parking Hours
        </CardTitle>
        <CardDescription>
          Total hours our sweet spot has been occupied! 🍫
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-paleo-purple">
            Loading chart data...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-64">
            <BarChart data={monthlyHoursData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="hours" fill="hsl(var(--paleo-pink))" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyHoursChart;
