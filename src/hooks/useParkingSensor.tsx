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

  // Smart offline detection - only show offline if sensor hasn't reported for 25+ hours
  const shouldShowOffline = (lastUpdateTime: Date): boolean => {
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdateTime.getTime();
    const hoursWithoutUpdate = timeDiff / (1000 * 60 * 60);
    
    // Only show offline after 25 hours of no communication
    // This accounts for the fact that LoRaWAN sensors only send updates
    // when parking status changes (FREE ↔ OCCUPIED), not constant heartbeats
    return hoursWithoutUpdate >= 25;
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
        
        // Debug logging to troubleshoot offline detection
        const now = new Date();
        const timeDiff = now.getTime() - lastUpdateTime.getTime();
        const hoursWithoutUpdate = timeDiff / (1000 * 60 * 60);
        
        console.log('🐛 Debug offline detection:', {
          rawTimestamp: latestReading.timestamp,
          parsedLastUpdate: lastUpdateTime.toISOString(),
          currentTime: now.toISOString(),
          timeDiffMs: timeDiff,
          hoursWithoutUpdate: hoursWithoutUpdate.toFixed(2),
          shouldBeOffline: isOffline,
          threshold: '25 hours'
        });
        
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
          sensorStatus: isOffline ? 'offline' : 'online',
          hoursWithoutUpdate: hoursWithoutUpdate.toFixed(2)
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
