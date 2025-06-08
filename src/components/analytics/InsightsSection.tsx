
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InsightsSection = () => {
  return (
    <Card className="fun-shadow bg-gradient-to-br from-paleo-pink/5 to-paleo-purple/5">
      <CardHeader>
        <CardTitle className="text-paleo-pink-dark text-center">
          🎯 Sweet Insights & Parking Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl">🌅</div>
            <div className="font-semibold text-paleo-pink-dark">Best Time to Visit</div>
            <div className="text-sm text-paleo-purple">
              Early mornings (8-10 AM)<br/>
              Almost always available! 🚗✨
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">📊</div>
            <div className="font-semibold text-paleo-pink-dark">Peak Hours</div>
            <div className="text-sm text-paleo-purple">
              Busiest: 12-3 PM<br/>
              When chocolate cravings hit! 😋
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-paleo-pink/10 rounded-lg border border-paleo-pink/20">
          <div className="text-center">
            <div className="text-lg font-semibold text-paleo-pink-dark mb-2">
              💡 Pro Tip for Data Lovers
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-paleo-purple to-paleo-pink border-2 border-paleo-pink/20 flex items-center justify-center">
                <span className="text-xs font-bold text-white">MS</span>
              </div>
              <div className="text-sm text-paleo-purple font-medium">
                This dashboard is powered by MeteoScientific, bringing science to dessert shops and other small businesses everywhere! 🔬✨
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
