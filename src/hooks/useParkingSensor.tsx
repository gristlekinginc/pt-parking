
import { useState, useEffect } from 'react';

interface ParkingData {
  isOccupied: boolean;
  lastUpdated: Date;
  sensorStatus: 'online' | 'offline';
}

// Simulated sensor data - replace with actual sensor integration
const useParkingSensor = () => {
  const [parkingData, setParkingData] = useState<ParkingData>({
    isOccupied: false,
    lastUpdated: new Date(),
    sensorStatus: 'online'
  });

  useEffect(() => {
    // Simulate live sensor updates every 5 seconds
    const interval = setInterval(() => {
      // Simulate sensor readings with some randomness
      const isOccupied = Math.random() > 0.6; // 40% chance of being occupied
      const sensorStatus = Math.random() > 0.05 ? 'online' : 'offline'; // 95% uptime
      
      setParkingData({
        isOccupied,
        lastUpdated: new Date(),
        sensorStatus
      });
      
      console.log('Parking sensor update:', { isOccupied, sensorStatus });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to manually refresh sensor data
  const refreshSensor = () => {
    setParkingData(prev => ({
      ...prev,
      lastUpdated: new Date(),
      sensorStatus: 'online'
    }));
  };

  return { parkingData, refreshSensor };
};

export default useParkingSensor;
