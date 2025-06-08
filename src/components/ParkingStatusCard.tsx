
import { CircleParking, CircleParkingOff, Clock, Wifi, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ParkingStatusCardProps {
  isOccupied: boolean;
  lastUpdated: Date;
  sensorStatus: 'online' | 'offline';
}

const ParkingStatusCard = ({ isOccupied, lastUpdated, sensorStatus }: ParkingStatusCardProps) => {
  const statusText = isOccupied ? "OCCUPIED" : "VACANT";
  const statusIcon = isOccupied ? CircleParkingOff : CircleParking;
  const StatusIcon = statusIcon;
  
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden fun-shadow border-0 transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        {/* Status Header */}
        <div className="paleo-gradient-fun p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            <Sparkles className="w-24 h-24 text-white animate-pulse" />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow"></div>
              <span className="text-white font-bold text-lg tracking-wide">✨ LIVE STATUS ✨</span>
            </div>
            <Badge 
              variant={sensorStatus === 'online' ? 'default' : 'destructive'}
              className="bg-white/20 text-white border-white/30 font-semibold"
            >
              <Wifi className="w-3 h-3 mr-1" />
              {sensorStatus.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Main Status Display */}
        <div className={`p-12 text-center transition-all duration-500 ${
          isOccupied 
            ? 'parking-occupied text-white' 
            : 'parking-vacant text-white'
        }`}>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <StatusIcon 
                size={120} 
                className={`transition-all duration-500 ${
                  isOccupied ? 'animate-pulse-slow' : 'bounce-fun'
                }`}
              />
              {!isOccupied && (
                <div className="absolute -top-2 -right-2">
                  <span className="text-4xl animate-bounce">🎉</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-6xl font-bold mb-2 tracking-wider drop-shadow-lg">
                {statusText}
              </h1>
              <p className="text-xl opacity-90 font-medium">
                🅿️ Parking Spot Status
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card p-6 border-t border-paleo-pink/20">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-paleo-pink" />
              <span className="text-sm font-medium">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <div className="text-sm font-bold text-paleo-pink flex items-center gap-1">
              <span>🍫</span>
              Paleo Treats Parking
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParkingStatusCard;
