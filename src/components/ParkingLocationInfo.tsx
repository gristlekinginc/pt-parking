import { MapPin, Navigation, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ParkingLocationInfo = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 overflow-hidden fun-shadow border-paleo-pink/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Text Information */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-paleo-pink" />
              <h3 className="text-lg font-bold text-paleo-pink-dark">Parking Location</h3>
            </div>
            <p className="text-muted-foreground mb-2">
              🅿️ **Back alley parking spot** - accessible from the alley behind our building
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-paleo-purple">
              <div className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                <span>Adams Ave → Alley</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>Behind Paleo Treats</span>
              </div>
            </div>
          </div>

          {/* Simple Map Visual */}
          <div className="flex-shrink-0">
            <div className="relative bg-gradient-to-br from-paleo-purple/10 to-paleo-pink/10 rounded-lg p-4 border-2 border-paleo-pink/20">
              <div className="w-48 h-32 relative">
                {/* Adams Ave */}
                <div className="absolute top-2 left-0 right-0 h-1 bg-gray-400 rounded"></div>
                <div className="absolute top-0 left-4 text-xs font-medium text-gray-600">Adams Ave</div>
                
                {/* Building */}
                <div className="absolute top-8 left-12 right-12 h-12 bg-paleo-purple/20 border-2 border-paleo-purple/40 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-paleo-purple">PALEO TREATS</span>
                </div>
                
                {/* Parking Area */}
                <div className="absolute bottom-8 left-8 right-8 h-8 bg-paleo-pink/20 border-2 border-paleo-pink/40 rounded flex items-center justify-center relative">
                  <span className="text-xs font-bold text-paleo-pink">🅿️ OUR SPOT</span>
                  {/* Parking lines */}
                  <div className="absolute inset-1 flex justify-around items-center">
                    <div className="w-px h-4 bg-paleo-pink/40"></div>
                    <div className="w-px h-4 bg-paleo-pink/40"></div>
                    <div className="w-px h-4 bg-paleo-pink/40"></div>
                  </div>
                </div>
                
                {/* Alley */}
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-gray-400 rounded"></div>
                <div className="absolute bottom-0 left-16 text-xs font-medium text-gray-600">Alley</div>
                
                {/* Arrow pointing to spot */}
                <div className="absolute bottom-16 right-4 text-paleo-pink animate-bounce">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-paleo-pink"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingLocationInfo; 