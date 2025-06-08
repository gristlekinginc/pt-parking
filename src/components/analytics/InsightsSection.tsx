import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface TimeSlot {
  day: string;
  timeSlot: string;
  occupancyRate: number;
  availabilityRate: number;
}

interface BestTimesData {
  bestTimes: TimeSlot[];
  peakTime: TimeSlot;
  dailyTurnover: number;
}

const InsightsSection = () => {
  const [timingData, setTimingData] = useState<BestTimesData>({
    bestTimes: [
      { day: 'Tuesday', timeSlot: '10AM-12PM', occupancyRate: 10, availabilityRate: 90 },
      { day: 'Saturday', timeSlot: '11AM-1PM', occupancyRate: 15, availabilityRate: 85 }
    ],
    peakTime: { day: 'Monday', timeSlot: '10AM-6PM', occupancyRate: 95, availabilityRate: 5 },
    dailyTurnover: 2.5
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestTimes = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/best-times`);
        if (response.ok) {
          const data = await response.json();
          setTimingData(data);
        }
      } catch (error) {
        console.error('Error fetching best times:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestTimes();
    // Update every 5 minutes
    const interval = setInterval(fetchBestTimes, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fun-shadow bg-gradient-to-br from-paleo-pink/5 to-paleo-purple/5">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark text-center">
          🎯 Sweet Insights & Parking Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl">🌅</div>
            <div className="font-semibold text-paleo-pink-dark">Best Times to Visit</div>
            {isLoading ? (
              <div className="text-sm text-paleo-purple">Loading optimal times...</div>
            ) : (
              <div className="space-y-1">
                {timingData.bestTimes.map((time, index) => (
                  <div key={index} className="text-sm text-paleo-purple">
                    <strong>{time.day}s {time.timeSlot}</strong><br/>
                    {time.availabilityRate}% likely available! 🚗✨
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-2xl">📊</div>
            <div className="font-semibold text-paleo-pink-dark">Owner Schedule</div>
            {isLoading ? (
              <div className="text-sm text-paleo-purple">Calculating busy times...</div>
            ) : (
              <div className="text-sm text-paleo-purple">
                Usually occupied: {timingData.peakTime.day}s {timingData.peakTime.timeSlot}<br/>
                When owners are working! 💼 ({timingData.peakTime.occupancyRate}% occupied)
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🔄</div>
            <div className="font-semibold text-paleo-pink-dark">Daily Activity</div>
            {isLoading ? (
              <div className="text-sm text-paleo-purple">Calculating turnover...</div>
            ) : (
              <div className="text-sm text-paleo-purple">
                <strong>{timingData.dailyTurnover}x per day</strong><br/>
                Average times the spot gets filled! 📈✨
              </div>
            )}
          </div>
        </div>
        
        {/* Shop The Store Button */}
        <div className="mt-8 mb-6 text-center">
          <a
            href="https://paleotreats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-paleo-pink text-white font-bold text-lg rounded-lg hover:bg-paleo-pink-dark transform hover:scale-105 transition-all duration-300 fun-shadow"
          >
            🛒 Shop The Store
          </a>
        </div>
        
        <div className="mt-6 p-4 bg-paleo-pink/10 rounded-lg border border-paleo-pink/20">
          <div className="text-center">
            <div className="text-lg font-semibold text-paleo-pink-dark mb-2">
              💡 Pro Tip for Data Lovers
            </div>
            <div className="text-sm text-paleo-purple font-medium">
              The best times to visit the shop and find Nik or Lee will usually be when the parking spot is taken. We park there when we work, so if it's taken, it's probably us. See you soon! 👋✨
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
