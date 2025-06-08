
import PaleoTreatsLogo from "@/components/PaleoTreatsLogo";
import ParkingStatusCard from "@/components/ParkingStatusCard";
import useParkingSensor from "@/hooks/useParkingSensor";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { parkingData, refreshSensor } = useParkingSensor();
  const { toast } = useToast();

  const handleRefresh = () => {
    refreshSensor();
    toast({
      title: "✨ Sensor Refreshed!",
      description: "Parking data has been updated with love 💕",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-paleo-pink/5 to-paleo-purple/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Header */}
          <PaleoTreatsLogo />
          
          {/* Main Status Card */}
          <div className="w-full max-w-4xl">
            <ParkingStatusCard 
              isOccupied={parkingData.isOccupied}
              lastUpdated={parkingData.lastUpdated}
              sensorStatus={parkingData.sensorStatus}
            />
          </div>

          {/* Controls */}
          <div className="mt-8 flex gap-4">
            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2 border-paleo-pink text-paleo-pink hover:bg-paleo-pink hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <RefreshCw size={16} />
              🔄 Refresh Sensor
            </Button>
          </div>

          {/* Info Footer */}
          <div className="mt-12 text-center text-muted-foreground max-w-2xl">
            <p className="text-sm font-medium">
              🚗 This parking monitor provides real-time status updates for the Paleo Treats parking spot.
              The sensor automatically checks availability every few seconds with lots of love! 💕
            </p>
            <p className="text-xs mt-4 opacity-75 flex items-center justify-center gap-2">
              <Heart className="w-3 h-3 text-paleo-pink animate-pulse" />
              Made with love for Paleo Treats • paleotreats.com
              <Heart className="w-3 h-3 text-paleo-pink animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
