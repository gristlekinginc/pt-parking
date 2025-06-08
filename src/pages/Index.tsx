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
            {parkingData.deviceName && (
              <p className="text-xs mt-2 opacity-75">
                Device: {parkingData.deviceName}
              </p>
            )}
            
            {/* MeteoScientific Logo Section */}
            <div className="mt-6 mb-4 flex items-center justify-center">
              <span className="text-xs text-muted-foreground mr-3">Powered by</span>
              <a 
                href="https://meteoscientific.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 hover:opacity-80 inline-block"
                title="Visit MeteoScientific"
              >
                <img 
                  src="/metsci_logo.svg" 
                  alt="MeteoScientific Logo" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              This dashboard is powered by MeteoScientific using a Fleximodo parking sensor. MetSci brings high tech to dessert shops and other small businesses everywhere! 🔬✨
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
