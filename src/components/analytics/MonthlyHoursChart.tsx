import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
      <CardContent className="p-2 sm:p-6">
        {isLoading ? (
          <div className="h-48 sm:h-64 flex items-center justify-center text-paleo-purple">
            Loading chart data...
          </div>
        ) : (
          <div className="w-full h-48 sm:h-64">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyHoursData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    fontSize={12}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="hsl(var(--paleo-pink))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyHoursChart;
