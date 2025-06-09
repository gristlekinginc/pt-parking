import { useState, useEffect } from 'react';

interface ParkingData {
  isOccupied: boolean;
  lastUpdated: Date;
  sensorStatus: 'online' | 'offline';
  deviceName?: string;
  rssi?: number;
  snr?: number;
}

interface ApiResponse {
  dev_eui: string;
  device_name: string;
  status: 'FREE' | 'OCCUPIED';
  timestamp: string;
}

// Your Cloudflare Workers API URL - works for both development and production
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'https://pt-parking-api.paleotreats.com'
  : 'https://pt-parking-api.paleotreats.com';

const useParkingSensor = () => {
  const [parkingData, setParkingData] = useState<ParkingData>({
    isOccupied: false,
    lastUpdated: new Date(),
    sensorStatus: 'offline'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Smart offline detection based on business hours and day of week
  const shouldShowOffline = (lastUpdateTime: Date): boolean => {
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdateTime.getTime();
    const hoursWithoutUpdate = timeDiff / (1000 * 60 * 60);
    
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Rule 1: Between 7pm and 10:30am on Tuesday, Wednesday, Friday, Saturday, or Sunday
    // Days: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    const overnightDays = [0, 2, 3, 5, 6]; // Sunday, Tuesday, Wednesday, Friday, Saturday
    const isOvernightPeriod = overnightDays.includes(currentDay) && 
                             (currentHour >= 19 || currentHour < 10.5); // 7pm-10:30am
    
    // Rule 2: Between 1pm and 6:30pm on Monday, Tuesday, Wednesday, or Thursday  
    const weekdayAfternoonDays = [1, 2, 3, 4]; // Monday, Tuesday, Wednesday, Thursday
    const isWeekdayAfternoon = weekdayAfternoonDays.includes(currentDay) && 
                              currentHour >= 13 && currentHour < 18.5; // 1pm-6:30pm
    
    // Apply the rules
    if (isOvernightPeriod || isWeekdayAfternoon) {
      // During these specific periods, any gap in uplinks means offline
      return hoursWithoutUpdate > 0.1; // Show offline if no update in last 6 minutes
    }
    
    // Rule 3: Outside those periods, show offline only after 6 hours
    return hoursWithoutUpdate >= 6;
  };

  const fetchSensorData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse[] = await response.json();
      
      if (data && data.length > 0) {
        const latestReading = data[0]; // Get the first/latest reading
        const lastUpdateTime = new Date(latestReading.timestamp);
        
        // Use smart offline detection
        const isOffline = shouldShowOffline(lastUpdateTime);
        
        setParkingData({
          isOccupied: latestReading.status === 'OCCUPIED',
          lastUpdated: lastUpdateTime,
          sensorStatus: isOffline ? 'offline' : 'online',
          deviceName: latestReading.device_name
        });
        
        setError(null);
        console.log('Live sensor update:', { 
          status: latestReading.status, 
          device: latestReading.device_name,
          timestamp: latestReading.timestamp,
          sensorStatus: isOffline ? 'offline' : 'online'
        });
      } else {
        // No data available
        setParkingData(prev => ({
          ...prev,
          sensorStatus: 'offline'
        }));
        setError('No sensor data available');
      }
    } catch (err) {
      console.error('Error fetching sensor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sensor data');
      setParkingData(prev => ({
        ...prev,
        sensorStatus: 'offline'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately when component mounts
    fetchSensorData();

    // Set up interval to fetch live data every 30 seconds
    const interval = setInterval(() => {
      fetchSensorData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Function to manually refresh sensor data
  const refreshSensor = () => {
    setIsLoading(true);
    fetchSensorData();
  };

  return { 
    parkingData, 
    refreshSensor, 
    isLoading, 
    error 
  };
};

export default useParkingSensor;
