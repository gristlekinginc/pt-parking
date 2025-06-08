import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Calendar, Database } from "lucide-react";
import { useState, useEffect } from "react";

interface StatsData {
  monthlyHours: number;
  peakUsage: number;
  availabilityNextHour: number;
  totalPackets: number;
}

const SensorStatsCards = () => {
  const [stats, setStats] = useState<StatsData>({
    monthlyHours: 0,
    peakUsage: 0,
    availabilityNextHour: 0,
    totalPackets: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            monthlyHours: data.monthlyHours,
            peakUsage: data.peakUsage,
            availabilityNextHour: data.availabilityNextHour || data.availability,
            totalPackets: data.totalPackets
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    // Update every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Card className="bg-gradient-to-br from-paleo-pink/10 to-paleo-purple/10 border-paleo-pink/20">
        <CardContent className="p-3 sm:p-4 text-center">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-paleo-pink mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-paleo-pink-dark">
            {isLoading ? "..." : `${stats.monthlyHours}h`}
          </div>
          <div className="text-xs sm:text-sm text-paleo-purple">This Month</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-success/10 to-paleo-pink/10 border-paleo-success/20">
        <CardContent className="p-3 sm:p-4 text-center">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-paleo-success mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-paleo-pink-dark">
            {isLoading ? "..." : `🔥 ${stats.peakUsage}%`}
          </div>
          <div className="text-xs sm:text-sm text-paleo-purple">Peak Usage</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-warning/10 to-paleo-pink/10 border-paleo-warning/20">
        <CardContent className="p-3 sm:p-4 text-center">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-paleo-warning mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-paleo-pink-dark">
            {isLoading ? "..." : `📈 ${stats.availabilityNextHour}%`}
          </div>
          <div className="text-xs sm:text-sm text-paleo-purple leading-tight">Likely Available Next Hour</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-purple/10 to-paleo-pink/10 border-paleo-purple/20">
        <CardContent className="p-3 sm:p-4 text-center">
          <Database className="w-6 h-6 sm:w-8 sm:h-8 text-paleo-purple mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-paleo-pink-dark">
            {isLoading ? "..." : `🤓 ${stats.totalPackets.toLocaleString()}`}
          </div>
          <div className="text-xs sm:text-sm text-paleo-purple">Total Uplinks</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorStatsCards;
