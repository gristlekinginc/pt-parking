
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const hourlyOccupancyData = [
  { hour: '6AM', occupied: 5 },
  { hour: '8AM', occupied: 25 },
  { hour: '10AM', occupied: 45 },
  { hour: '12PM', occupied: 80 },
  { hour: '2PM', occupied: 70 },
  { hour: '4PM', occupied: 60 },
  { hour: '6PM', occupied: 30 },
  { hour: '8PM', occupied: 15 },
  { hour: '10PM', occupied: 8 },
];

const chartConfig = {
  occupied: {
    label: "% Occupied",
    color: "hsl(var(--paleo-purple))",
  },
};

const HourlyOccupancyChart = () => {
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
      </CardContent>
    </Card>
  );
};

export default HourlyOccupancyChart;
