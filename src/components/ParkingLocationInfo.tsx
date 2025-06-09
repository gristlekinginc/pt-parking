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

          {/* Simple Map Visual - Matches Hand-Drawn Layout */}
          <div className="flex-shrink-0">
            <div className="relative bg-gradient-to-br from-paleo-purple/10 to-paleo-pink/10 rounded-lg p-6 border-2 border-paleo-pink/20">
              <div className="w-56 h-40 relative">
                {/* Adams Ave - Top Street */}
                <div className="absolute top-2 left-0 right-0 h-2 bg-gray-400 rounded"></div>
                <div className="absolute top-0 left-2 text-xs font-bold text-gray-700">Adams Ave</div>
                
                {/* Paleo Treats Building - Front facing Adams Ave */}
                <div className="absolute top-8 left-6 right-6 h-10 bg-paleo-purple/30 border-2 border-paleo-purple/50 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-paleo-purple">PALEO TREATS</span>
                </div>
                
                {/* Parking Area Behind Building */}
                <div className="absolute top-20 left-4 right-4 h-12 bg-paleo-pink/20 border-2 border-paleo-pink/40 rounded-lg relative">
                  <div className="text-center pt-1">
                    <span className="text-xs font-bold text-paleo-pink block">PARKING AREA</span>
                  </div>
                  
                  {/* Your Specific Spot */}
                  <div className="absolute bottom-1 right-2 bg-paleo-pink/40 border border-paleo-pink/60 rounded px-2 py-1">
                    <span className="text-xs font-bold text-paleo-pink">🅿️ OUR SPOT</span>
                  </div>
                  
                  {/* Parking lines */}
                  <div className="absolute inset-2 flex justify-around items-center opacity-30">
                    <div className="w-px h-6 bg-paleo-pink"></div>
                    <div className="w-px h-6 bg-paleo-pink"></div>
                    <div className="w-px h-6 bg-paleo-pink"></div>
                    <div className="w-px h-6 bg-paleo-pink"></div>
                  </div>
                </div>
                
                {/* Alley - Bottom Street */}
                <div className="absolute bottom-2 left-0 right-0 h-2 bg-gray-400 rounded"></div>
                <div className="absolute bottom-0 left-2 text-xs font-bold text-gray-700">Alley</div>
                
                {/* Arrow pointing to your spot */}
                <div className="absolute top-28 right-8 text-paleo-pink animate-bounce">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-paleo-pink"></div>
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