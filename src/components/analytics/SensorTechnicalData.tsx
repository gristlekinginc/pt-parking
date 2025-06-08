
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Signal, Database } from "lucide-react";

const sensorData = {
  rssi: -67,
  snr: 8.5,
  totalPackets: 15247
};

const SensorTechnicalData = () => {
  return (
    <Card className="fun-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-paleo-pink-dark flex items-center gap-2">
          🤓 Nerd Box - Sensor Stats
        </CardTitle>
        <CardDescription>
          For our tech-loving chocolate makers! 📡
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3 h-56">
          {/* RSSI Box */}
          <div className="bg-gradient-to-r from-paleo-purple/10 to-paleo-pink/10 p-3 rounded-lg border border-paleo-purple/20">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-paleo-purple" />
              <div>
                <div className="text-xs font-medium text-paleo-purple">RSSI (Signal Strength)</div>
                <div className="text-xl font-bold text-paleo-pink-dark">
                  {sensorData.rssi} dBm
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  {sensorData.rssi > -70 ? "🟢 Excellent" : sensorData.rssi > -80 ? "🟡 Good" : "🔴 Weak"}
                </div>
              </div>
            </div>
          </div>

          {/* SNR Box */}
          <div className="bg-gradient-to-r from-paleo-pink/10 to-paleo-success/10 p-3 rounded-lg border border-paleo-pink/20">
            <div className="flex items-center gap-3">
              <Signal className="w-5 h-5 text-paleo-pink" />
              <div>
                <div className="text-xs font-medium text-paleo-purple">SNR (Signal Quality)</div>
                <div className="text-xl font-bold text-paleo-pink-dark">
                  {sensorData.snr} dB
                </div>
                <div className="text-xs text-paleo-purple opacity-75">
                  {sensorData.snr > 7 ? "🟢 Crystal Clear" : sensorData.snr > 3 ? "🟡 Clear" : "🔴 Noisy"}
                </div>
              </div>
            </div>
          </div>

          {/* Total Packets Box */}
          <div className="bg-gradient-to-r from-paleo-success/10 to-paleo-warning/10 p-3 rounded-lg border border-paleo-success/20">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-paleo-success" />
              <div>
                <div className="text-xs font-medium text-paleo-purple">Total Packets Received</div>
                <div className="text-xl font-bold text-paleo-pink-dark">
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
  );
};

export default SensorTechnicalData;
