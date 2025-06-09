import { CircleParking, CircleParkingOff, Clock, Wifi, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ParkingStatusCardProps {
  isOccupied: boolean;
  lastUpdated: Date;
  sensorStatus: 'online' | 'offline';
  deviceName?: string;
  isLoading?: boolean;
}

const ParkingStatusCard = ({ 
  isOccupied, 
  lastUpdated, 
  sensorStatus, 
  deviceName,
  isLoading = false 
}: ParkingStatusCardProps) => {
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
              {isLoading ? (
                <Loader2 className="w-3 h-3 text-white animate-spin" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow"></div>
              )}
              <span className="text-white font-bold text-lg tracking-wide">
                {isLoading ? "🔄 UPDATING..." : "✨ LIVE STATUS ✨"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={sensorStatus === 'online' ? 'default' : 'destructive'}
                className="bg-white/20 text-white border-white/30 font-semibold"
              >
                <Wifi className="w-3 h-3 mr-1" />
                {sensorStatus.toUpperCase()}
              </Badge>
              {deviceName && (
                <Badge className="bg-white/10 text-white border-white/20 text-xs">
                  📡 Fleximodo v2 In Ground
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Main Status Display */}
        <div className={`p-12 text-center transition-all duration-500 ${
          isOccupied 
            ? 'parking-occupied text-white' 
            : 'parking-vacant text-white'
        } ${isLoading ? 'opacity-75' : ''}`}>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <StatusIcon 
                size={120} 
                className={`transition-all duration-500 ${
                  isLoading ? 'animate-pulse' :
                  isOccupied ? 'animate-pulse-slow' : 'bounce-fun'
                }`}
              />
              {!isOccupied && !isLoading && (
                <div className="absolute -top-2 -right-2">
                  <span className="text-4xl animate-bounce">🎉</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-6xl font-bold mb-2 tracking-wider drop-shadow-lg">
                {isLoading ? "UPDATING" : statusText}
              </h1>
              <p className="text-xl opacity-90 font-medium">
                🅿️ {isLoading ? "Fetching Status..." : "Alley Parking Spot Status"}
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
