
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const monthlyHoursData = [
  { month: 'Dec', hours: 145 },
  { month: 'Jan', hours: 168 },
  { month: 'Feb', hours: 134 },
  { month: 'Mar', hours: 189 },
  { month: 'Apr', hours: 167 },
  { month: 'May', hours: 203 },
];

const chartConfig = {
  hours: {
    label: "Hours Parked",
    color: "hsl(var(--paleo-pink))",
  },
};

const MonthlyHoursChart = () => {
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
        <ChartContainer config={chartConfig} className="h-64">
          <BarChart data={monthlyHoursData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="hsl(var(--paleo-pink))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyHoursChart;
