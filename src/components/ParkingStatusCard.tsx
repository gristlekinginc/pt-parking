
import { CircleParking, CircleParkingOff, Clock, Wifi } from "lucide-react";
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
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-2xl border-0">
      <div className="relative">
        {/* Status Header */}
        <div className="bg-gradient-to-r from-paleo-orange to-accent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow"></div>
              <span className="text-white font-medium text-lg">LIVE STATUS</span>
            </div>
            <Badge 
              variant={sensorStatus === 'online' ? 'default' : 'destructive'}
              className="bg-white/20 text-white border-white/30"
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
            <StatusIcon 
              size={120} 
              className={`transition-all duration-500 ${
                isOccupied ? 'animate-pulse-slow' : 'animate-bounce-gentle'
              }`}
            />
            <div>
              <h1 className="text-6xl font-bold mb-2 tracking-wider">
                {statusText}
              </h1>
              <p className="text-xl opacity-90">
                Parking Spot Status
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card p-6 border-t">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <div className="text-sm font-medium text-paleo-brown">
              Paleo Treats Parking
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParkingStatusCard;
