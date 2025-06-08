
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sensorData = {
  rssi: -67,
  snr: 8.5,
  totalPackets: 15247
};

const InsightsSection = () => {
  return (
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
  );
};

export default InsightsSection;
