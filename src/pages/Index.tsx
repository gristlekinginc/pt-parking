
import PaleoTreatsLogo from "@/components/PaleoTreatsLogo";
import ParkingStatusCard from "@/components/ParkingStatusCard";
import useParkingSensor from "@/hooks/useParkingSensor";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { parkingData, refreshSensor } = useParkingSensor();
  const { toast } = useToast();

  const handleRefresh = () => {
    refreshSensor();
    toast({
      title: "Sensor Refreshed",
      description: "Parking data has been updated",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-paleo-cream to-background">
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
              className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <RefreshCw size={16} />
              Refresh Sensor
            </Button>
          </div>

          {/* Info Footer */}
          <div className="mt-12 text-center text-muted-foreground max-w-2xl">
            <p className="text-sm">
              This parking monitor provides real-time status updates for the Paleo Treats parking spot.
              The sensor automatically checks availability every few seconds.
            </p>
            <p className="text-xs mt-2 opacity-75">
              For technical support, visit paleotreats.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
