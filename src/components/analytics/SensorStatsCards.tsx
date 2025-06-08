
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Calendar, Database } from "lucide-react";

const SensorStatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-paleo-pink/10 to-paleo-purple/10 border-paleo-pink/20">
        <CardContent className="p-4 text-center">
          <Clock className="w-8 h-8 text-paleo-pink mx-auto mb-2" />
          <div className="text-2xl font-bold text-paleo-pink-dark">203h</div>
          <div className="text-sm text-paleo-purple">This Month</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-success/10 to-paleo-pink/10 border-paleo-success/20">
        <CardContent className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-paleo-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-paleo-pink-dark">🔥 88%</div>
          <div className="text-sm text-paleo-purple">Peak Usage</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-warning/10 to-paleo-pink/10 border-paleo-warning/20">
        <CardContent className="p-4 text-center">
          <Calendar className="w-8 h-8 text-paleo-warning mx-auto mb-2" />
          <div className="text-2xl font-bold text-paleo-pink-dark">40%</div>
          <div className="text-sm text-paleo-purple">Available</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-paleo-purple/10 to-paleo-pink/10 border-paleo-purple/20">
        <CardContent className="p-4 text-center">
          <Database className="w-8 h-8 text-paleo-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-paleo-pink-dark">🤓 15.2k</div>
          <div className="text-sm text-paleo-purple">Total Packets</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorStatsCards;
