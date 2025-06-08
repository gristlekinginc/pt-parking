
import { Heart } from "lucide-react";

const PaleoTreatsLogo = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center w-20 h-20 rounded-full paleo-gradient-fun fun-shadow pulse-fun">
        <Heart className="w-10 h-10 text-white" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-paleo-pink-dark">
          🍫 Paleo Treats
        </h1>
        <p className="text-paleo-purple font-semibold text-lg">
          ✨ Parking Monitor ✨
        </p>
      </div>
    </div>
  );
};

export default PaleoTreatsLogo;
