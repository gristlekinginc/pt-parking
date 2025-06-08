
import { Leaf } from "lucide-react";

const PaleoTreatsLogo = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-full paleo-gradient shadow-lg">
        <Leaf className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-paleo-brown">Paleo Treats</h1>
        <p className="text-muted-foreground">Parking Monitor</p>
      </div>
    </div>
  );
};

export default PaleoTreatsLogo;
