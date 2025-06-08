import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Signal, Database, Radio, Zap, Hash } from "lucide-react";
import { useState, useEffect } from "react";

interface TechnicalData {
  rssi: number;
  snr: number;
  totalPackets: number;
  gatewayName: string;
  network: string;
  frequency: number;
  dataRate: number;
  frameCount: number;
}

const SensorTechnicalData = () => {
  const [sensorData, setSensorData] = useState<TechnicalData>({
    rssi: -67,
    snr: 8.5,
    totalPackets: 0,
    gatewayName: "thankful-caramel-quail",
    network: "helium_iot", 
    frequency: 904.3,
    dataRate: 3,
    frameCount: 445
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicalData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'https://pt-parking-api.nik-cda.workers.dev'
          : 'https://pt-parking-api.nik-cda.workers.dev';
          
        const response = await fetch(`${API_BASE_URL}/analytics/stats`);
        if (response.ok) {
          const data = await response.json();
          setSensorData({
            rssi: data.rssi || -89,
            snr: data.snr || 10.5,
            totalPackets: data.totalPackets || 1,
            gatewayName: data.gatewayName || "thankful-caramel-quail",
            network: data.network || "helium_iot",
            frequency: data.frequency || 904.3,
            dataRate: data.dataRate || 3,
            frameCount: data.frameCount || 445
          });
        }
      } catch (error) {
        console.error('Error fetching technical data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTechnicalData();
    // Update every 30 seconds
    const interval = setInterval(fetchTechnicalData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="fun-shadow">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2 text-lg sm:text-xl">
          🤓 Nerd Box - Sensor Stats
        </CardTitle>
        <CardDescription className="text-sm">
          For our tech-loving chocolate makers! 📡
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
        <div className="grid grid-cols-1 gap-2 sm:gap-3">
          {/* RSSI Box */}
          <div className="bg-gradient-to-r from-paleo-purple/10 to-paleo-pink/10 p-2 sm:p-3 rounded-lg border border-paleo-purple/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Wifi className="w-4 h-4 text-paleo-purple flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">RSSI (Signal Strength)</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark">
                  {isLoading ? "..." : `${sensorData.rssi} dBm`}
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  {sensorData.rssi > -70 ? "🟢 Excellent" : sensorData.rssi > -80 ? "🟡 Good" : "🔴 Weak"}
                </div>
              </div>
            </div>
          </div>

          {/* SNR Box */}
          <div className="bg-gradient-to-r from-paleo-pink/10 to-paleo-success/10 p-2 sm:p-3 rounded-lg border border-paleo-pink/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Signal className="w-4 h-4 text-paleo-pink flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">SNR (Signal Quality)</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark">
                  {isLoading ? "..." : `${sensorData.snr} dB`}
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  {sensorData.snr > 7 ? "🟢 Crystal Clear" : sensorData.snr > 3 ? "🟡 Clear" : "🔴 Noisy"}
                </div>
              </div>
            </div>
          </div>

          {/* Gateway/Hotspot Box */}
          <div className="bg-gradient-to-r from-paleo-success/10 to-paleo-purple/10 p-2 sm:p-3 rounded-lg border border-paleo-success/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Radio className="w-4 h-4 text-paleo-success flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">Gateway/Hotspot</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark truncate">
                  {isLoading ? "..." : sensorData.gatewayName}
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  📡 {sensorData.network.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Frequency & Data Rate Box */}
          <div className="bg-gradient-to-r from-paleo-warning/10 to-paleo-pink/10 p-2 sm:p-3 rounded-lg border border-paleo-warning/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Zap className="w-4 h-4 text-paleo-warning flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">Frequency & Data Rate</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark">
                  {isLoading ? "..." : `${sensorData.frequency} MHz`}
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  📊 DR{sensorData.dataRate} • SF7/125kHz
                </div>
              </div>
            </div>
          </div>

          {/* Frame Count Box */}
          <div className="bg-gradient-to-r from-paleo-purple/10 to-paleo-success/10 p-2 sm:p-3 rounded-lg border border-paleo-purple/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Hash className="w-4 h-4 text-paleo-purple flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">Frame Count</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark">
                  {isLoading ? "..." : sensorData.frameCount.toLocaleString()}
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  🔢 Current session
                </div>
              </div>
            </div>
          </div>

          {/* Total Packets Box */}
          <div className="bg-gradient-to-r from-paleo-success/10 to-paleo-warning/10 p-2 sm:p-3 rounded-lg border border-paleo-success/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Database className="w-4 h-4 text-paleo-success flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-paleo-purple">Total Uplinks Received</div>
                <div className="text-sm sm:text-lg font-bold text-paleo-pink-dark">
                  {isLoading ? "..." : sensorData.totalPackets.toLocaleString()}
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
  );
};

export default SensorTechnicalData;
