
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const weeklyTrendsData = [
  { day: 'Mon', usage: 65 },
  { day: 'Tue', usage: 78 },
  { day: 'Wed', usage: 82 },
  { day: 'Thu', usage: 88 },
  { day: 'Fri', usage: 95 },
  { day: 'Sat', usage: 45 },
  { day: 'Sun', usage: 35 },
];

const chartConfig = {
  usage: {
    label: "Usage %",
    color: "hsl(var(--paleo-pink))",
  },
};

const WeeklyTrendsChart = () => {
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
      </CardContent>
    </Card>
  );
};

export default WeeklyTrendsChart;
