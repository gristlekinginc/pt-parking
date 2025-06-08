
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Clock, TrendingUp, Calendar, Users } from "lucide-react";

// Mock data for the charts - replace with actual data from your backend
const monthlyHoursData = [
  { month: 'Dec', hours: 145 },
  { month: 'Jan', hours: 168 },
  { month: 'Feb', hours: 134 },
  { month: 'Mar', hours: 189 },
  { month: 'Apr', hours: 167 },
  { month: 'May', hours: 203 },
];

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

const weeklyTrendsData = [
  { day: 'Mon', usage: 65 },
  { day: 'Tue', usage: 78 },
  { day: 'Wed', usage: 82 },
  { day: 'Thu', usage: 88 },
  { day: 'Fri', usage: 95 },
  { day: 'Sat', usage: 45 },
  { day: 'Sun', usage: 35 },
];

const rentalOpportunityData = [
  { name: 'Available for Rent', value: 40, color: 'hsl(var(--paleo-success))' },
  { name: 'Company Use', value: 45, color: 'hsl(var(--paleo-pink))' },
  { name: 'Peak Hours', value: 15, color: 'hsl(var(--paleo-warning))' },
];

const chartConfig = {
  hours: {
    label: "Hours Parked",
    color: "hsl(var(--paleo-pink))",
  },
  occupied: {
    label: "% Occupied",
    color: "hsl(var(--paleo-purple))",
  },
  usage: {
    label: "Usage %",
    color: "hsl(var(--paleo-pink))",
  },
};

const ParkingAnalytics = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-paleo-pink-dark mb-2">
          📊 Parking Analytics Dashboard
        </h2>
        <p className="text-paleo-purple font-medium">
          ✨ Fun insights about our sweet parking spot! ✨
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-paleo-pink/10 to-paleo-purple/10 border-paleo-pink/20">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-paleo-pink mx-auto mb-2" />
            <div className="text-2xl font-bold text-paleo-pink-dark">203h</div>
            <div className="text-sm text-paleo-purple">This Month</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-paleo-success/10 to-paleo-pink/10 border-paleo-success/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-paleo-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-paleo-pink-dark">🔥 88%</div>
            <div className="text-sm text-paleo-purple">Peak Usage</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-paleo-warning/10 to-paleo-pink/10 border-paleo-warning/20">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-paleo-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-paleo-pink-dark">40%</div>
            <div className="text-sm text-paleo-purple">Available</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-paleo-purple/10 to-paleo-pink/10 border-paleo-purple/20">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-paleo-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-paleo-pink-dark">🏕️ 12h</div>
            <div className="text-sm text-paleo-purple">Camper Hours</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Hours Chart */}
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

        {/* Hourly Occupancy */}
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

        {/* Weekly Trends */}
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

        {/* Rental Opportunities */}
        <Card className="fun-shadow">
          <CardHeader>
            <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
              🏕️ Camper Rental Opportunities
            </CardTitle>
            <CardDescription>
              Perfect times to rent out to visiting campers! ⛺
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={rentalOpportunityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {rentalOpportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {rentalOpportunityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-paleo-purple font-medium">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun Insights */}
      <Card className="fun-shadow bg-gradient-to-br from-paleo-pink/5 to-paleo-purple/5">
        <CardHeader>
          <CardTitle className="text-paleo-pink-dark text-center">
            🎯 Sweet Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl">🌅</div>
              <div className="font-semibold text-paleo-pink-dark">Best Camper Hours</div>
              <div className="text-sm text-paleo-purple">
                6AM-10AM & 6PM-10PM<br/>
                Perfect for early birds & sunset lovers! 🏕️
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">💰</div>
              <div className="font-semibold text-paleo-pink-dark">Revenue Potential</div>
              <div className="text-sm text-paleo-purple">
                ~$480/month<br/>
                Based on 40% availability at $40/night! 💕
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📊</div>
              <div className="font-semibold text-paleo-pink-dark">Peak Efficiency</div>
              <div className="text-sm text-paleo-purple">
                Thursdays & Fridays<br/>
                Our busiest chocolate-making days! 🍫
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParkingAnalytics;
