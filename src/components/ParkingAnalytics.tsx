
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { Clock, TrendingUp, Calendar, Wifi, Signal, Database } from "lucide-react";

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

// Mock sensor data - replace with actual sensor readings
const sensorData = {
  rssi: -67,
  snr: 8.5,
  totalPackets: 15247
};

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
            <Database className="w-8 h-8 text-paleo-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-paleo-pink-dark">🤓 15.2k</div>
            <div className="text-sm text-paleo-purple">Total Packets</div>
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

        {/* Nerd Boxes - Sensor Data */}
        <Card className="fun-shadow">
          <CardHeader>
            <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
              🤓 Nerd Box - Sensor Stats
            </CardTitle>
            <CardDescription>
              For our tech-loving chocolate makers! 📡
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 h-64">
              {/* RSSI Box */}
              <div className="bg-gradient-to-r from-paleo-purple/10 to-paleo-pink/10 p-4 rounded-lg border border-paleo-purple/20">
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-paleo-purple" />
                  <div>
                    <div className="text-sm font-medium text-paleo-purple">RSSI (Signal Strength)</div>
                    <div className="text-2xl font-bold text-paleo-pink-dark">
                      {sensorData.rssi} dBm
                    </div>
                    <div className="text-xs text-paleo-purple opacity-75">
                      {sensorData.rssi > -70 ? "🟢 Excellent" : sensorData.rssi > -80 ? "🟡 Good" : "🔴 Weak"}
                    </div>
                  </div>
                </div>
              </div>

              {/* SNR Box */}
              <div className="bg-gradient-to-r from-paleo-pink/10 to-paleo-success/10 p-4 rounded-lg border border-paleo-pink/20">
                <div className="flex items-center gap-3">
                  <Signal className="w-6 h-6 text-paleo-pink" />
                  <div>
                    <div className="text-sm font-medium text-paleo-purple">SNR (Signal Quality)</div>
                    <div className="text-2xl font-bold text-paleo-pink-dark">
                      {sensorData.snr} dB
                    </div>
                    <div className="text-xs text-paleo-purple opacity-75">
                      {sensorData.snr > 7 ? "🟢 Crystal Clear" : sensorData.snr > 3 ? "🟡 Clear" : "🔴 Noisy"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Packets Box */}
              <div className="bg-gradient-to-r from-paleo-success/10 to-paleo-warning/10 p-4 rounded-lg border border-paleo-success/20">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-paleo-success" />
                  <div>
                    <div className="text-sm font-medium text-paleo-purple">Total Packets Received</div>
                    <div className="text-2xl font-bold text-paleo-pink-dark">
                      {sensorData.totalPackets.toLocaleString()}
                    </div>
                    <div className="text-xs text-paleo-purple opacity-75">
                      📈 Since deployment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun Insights */}
      <Card className="fun-shadow bg-gradient-to-br from-paleo-pink/5 to-paleo-purple/5">
        <CardHeader>
          <CardTitle className="text-paleo-pink-dark text-center">
            🎯 Sweet Insights & Tech Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl">📡</div>
              <div className="font-semibold text-paleo-pink-dark">Signal Quality</div>
              <div className="text-sm text-paleo-purple">
                RSSI at {sensorData.rssi} dBm<br/>
                Perfect for chocolate-making updates! 🍫
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🤓</div>
              <div className="font-semibold text-paleo-pink-dark">Nerd Stats</div>
              <div className="text-sm text-paleo-purple">
                SNR: {sensorData.snr} dB<br/>
                Clean signal for sweet data! 💕
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📊</div>
              <div className="font-semibold text-paleo-pink-dark">Data Flow</div>
              <div className="text-sm text-paleo-purple">
                {sensorData.totalPackets.toLocaleString()} packets<br/>
                Our sensor is chatty! 🗣️
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParkingAnalytics;
