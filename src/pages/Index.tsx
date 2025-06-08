import PaleoTreatsLogo from "@/components/PaleoTreatsLogo";
import ParkingStatusCard from "@/components/ParkingStatusCard";
import ParkingAnalytics from "@/components/ParkingAnalytics";
import useParkingSensor from "@/hooks/useParkingSensor";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const { parkingData, refreshSensor, isLoading, error } = useParkingSensor();
  const { toast } = useToast();

  const handleRefresh = () => {
    refreshSensor();
    toast({
      title: "🔄 Refreshing Sensor Data",
      description: "Fetching latest parking status from MeteoScientific device 📡",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-paleo-pink/5 to-paleo-purple/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Header */}
          <PaleoTreatsLogo />
          
          {/* Error Alert */}
          {error && (
            <div className="w-full max-w-4xl mb-6">
              <Alert variant="destructive" className="fun-shadow">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Connection Error: {error}. Using last known data if available.
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {/* Main Status Card */}
          <div className="w-full max-w-4xl mb-12">
            <ParkingStatusCard 
              isOccupied={parkingData.isOccupied}
              lastUpdated={parkingData.lastUpdated}
              sensorStatus={parkingData.sensorStatus}
              deviceName={parkingData.deviceName}
              isLoading={isLoading}
            />
          </div>

          {/* Controls */}
          <div className="mb-12 flex gap-4">
            <Button 
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2 border-paleo-pink text-paleo-pink hover:bg-paleo-pink hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "🔄 Refreshing..." : "🔄 Refresh Sensor"}
            </Button>
          </div>

          {/* Analytics Dashboard */}
          <ParkingAnalytics />

          {/* Info Footer */}
          <div className="mt-12 text-center text-muted-foreground max-w-2xl">
            <p className="text-sm font-medium">
              📡 This parking monitor displays real-time data from our MeteoScientific IoT sensor.
              Live updates every 30 seconds with lots of love! 💕
            </p>
            {parkingData.deviceName && (
              <p className="text-xs mt-2 opacity-75">
                Device: {parkingData.deviceName}
              </p>
            )}
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
