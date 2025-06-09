import { MapPin, Navigation, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ParkingLocationInfo = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 overflow-hidden fun-shadow border-paleo-pink/20">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-paleo-pink" />
            <h3 className="text-lg font-bold text-paleo-pink-dark">Parking Location</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-lg">
            🅿️ **Back alley parking spot** - accessible from the alley behind our building
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-paleo-purple flex-wrap">
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
      </CardContent>
    </Card>
  );
};

export default ParkingLocationInfo; 