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

  // Logging function to help debug mobile issues
  const logToServer = async (level: string, message: string, errorDetails?: any) => {
    try {
      await fetch(`${API_BASE_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          message,
          userAgent: navigator.userAgent,
          url: window.location.href,
          errorDetails: errorDetails ? JSON.stringify(errorDetails) : ''
        })
      });
    } catch (err) {
      console.warn('Failed to log to server:', err);
    }
  };

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
      console.log('📱 Fetching from:', API_BASE_URL + '/status');
      const response = await fetch(`${API_BASE_URL}/status`);
      
      console.log('📱 Response status:', response.status);
      console.log('📱 Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse[] = await response.json();
      
      if (data && data.length > 0) {
        // API now filters and returns only the real device data with masked ID
        const latestReading = data[0]; // Get the first/latest reading (already filtered by API)
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
      const errorDetails = {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack',
        url: API_BASE_URL + '/status',
        userAgent: navigator.userAgent
      };
      
      console.error('📱 Detailed fetch error:', errorDetails);
      
      // Log to server for debugging mobile issues
      logToServer('ERROR', 'Failed to fetch sensor data', errorDetails);
      
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

    // Set up 1-minute polling - reasonable for parking status monitoring
    const pollInterval = 60000; // 1 minute for all devices
    
    const interval = setInterval(() => {
      fetchSensorData();
    }, pollInterval);
    
    console.log(`📱 Polling setup: ${pollInterval/1000}s interval`);

    // Add mobile-friendly event listeners for better reliability
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // App came back into focus - immediately fetch fresh data
        console.log('📱 App came into focus - fetching fresh data');
        fetchSensorData();
      }
    };

    const handleFocus = () => {
      // Window regained focus - fetch fresh data
      console.log('📱 Window focus - fetching fresh data');
      fetchSensorData();
    };

    const handleOnline = () => {
      // Network came back - fetch fresh data
      console.log('📱 Network back online - fetching fresh data');
      fetchSensorData();
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    };
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
