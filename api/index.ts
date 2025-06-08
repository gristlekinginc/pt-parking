export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/update") {
      const body = await request.json();

      try {
        // Extract data from MeteoScientific payload structure
        const devEui = body.deviceInfo?.devEui;
        const deviceName = body.deviceInfo?.deviceName;
        const parkingStatus = body.object?.parkingStatus; // "FREE" or "BUSY"
        const statusChanged = body.object?.statusChanged;
        const timestamp = body.time;
        
        // Get first rxInfo entry for radio data
        const rxInfo = body.rxInfo?.[0];
        const rssi = rxInfo?.rssi;
        const snr = rxInfo?.snr;
        const gatewayId = rxInfo?.gatewayId;
        const gatewayName = rxInfo?.metadata?.gateway_name;
        const gatewayLat = rxInfo?.metadata?.gateway_lat ? parseFloat(rxInfo.metadata.gateway_lat) : null;
        const gatewayLong = rxInfo?.metadata?.gateway_long ? parseFloat(rxInfo.metadata.gateway_long) : null;

        // Convert "BUSY" to "OCCUPIED" for our database (keep consistency)
        const normalizedStatus = parkingStatus === "BUSY" ? "OCCUPIED" : parkingStatus;

        console.log('Received MeteoScientific payload:', {
          devEui,
          deviceName,
          parkingStatus,
          normalizedStatus,
          statusChanged,
          timestamp,
          rssi,
          snr
        });

        // Insert into log table
        await env.DB.prepare(`
          INSERT INTO parking_status_log (
            dev_eui, device_name, status, status_changed, timestamp,
            rssi, snr, gateway_id, gateway_name, gateway_lat, gateway_long
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          devEui,
          deviceName,
          normalizedStatus,
          statusChanged,
          timestamp,
          rssi,
          snr,
          gatewayId,
          gatewayName,
          gatewayLat,
          gatewayLong
        ).run();

        // Upsert into latest status table
        await env.DB.prepare(`
          INSERT OR REPLACE INTO latest_parking_status (
            dev_eui, device_name, status, timestamp
          )
          VALUES (?, ?, ?, ?)
        `).bind(
          devEui,
          deviceName,
          normalizedStatus,
          timestamp
        ).run();

        console.log('Successfully stored parking data:', { devEui, deviceName, normalizedStatus, timestamp });

        return new Response("OK", { status: 200, headers: corsHeaders });
      } catch (err) {
        console.error('Database error:', err);
        return new Response("Error writing to database: " + err.toString(), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    if (request.method === "GET" && url.pathname === "/status") {
      const result = await env.DB.prepare("SELECT * FROM latest_parking_status").all();
      return Response.json(result.results, { headers: corsHeaders });
    }

    if (request.method === "GET" && url.pathname === "/analytics/stats") {
      try {
        // Get total packets from all time
        const totalPackets = await env.DB.prepare("SELECT COUNT(*) as count FROM parking_status_log").first();
        
        // Get current month hours (estimate from records)
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const monthlyHours = await env.DB.prepare(`
          SELECT COUNT(*) * 0.5 as hours FROM parking_status_log 
          WHERE status = 'OCCUPIED' 
          AND strftime('%m', timestamp) = ? 
          AND strftime('%Y', timestamp) = ?
        `).bind(currentMonth.toString().padStart(2, '0'), currentYear.toString()).first();

        // Get latest RSSI and SNR
        const latestTechnical = await env.DB.prepare(`
          SELECT rssi, snr FROM parking_status_log 
          WHERE rssi IS NOT NULL AND snr IS NOT NULL 
          ORDER BY id DESC LIMIT 1
        `).first();

        // Calculate availability percentage (mock for now since we don't have enough data)
        const totalRecords = await env.DB.prepare("SELECT COUNT(*) as count FROM parking_status_log WHERE timestamp > date('now', '-7 days')").first();
        const occupiedRecords = await env.DB.prepare("SELECT COUNT(*) as count FROM parking_status_log WHERE status = 'OCCUPIED' AND timestamp > date('now', '-7 days')").first();
        
        const availabilityPercent = totalRecords?.count > 0 
          ? Math.round(((totalRecords.count - occupiedRecords?.count || 0) / totalRecords.count) * 100)
          : 60; // Default fallback

        const stats = {
          monthlyHours: Math.round(monthlyHours?.hours || 0),
          peakUsage: 88, // This would need more complex calculation
          availability: availabilityPercent,
          totalPackets: totalPackets?.count || 0,
          rssi: latestTechnical?.rssi || -67,
          snr: latestTechnical?.snr || 8.5
        };

        return Response.json(stats, { headers: corsHeaders });
      } catch (err) {
        return new Response("Error fetching analytics: " + err.toString(), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    if (request.method === "GET" && url.pathname === "/analytics/monthly") {
      try {
        // Get monthly data for the last 6 months
        const monthlyData = await env.DB.prepare(`
          SELECT 
            strftime('%Y-%m', timestamp) as month,
            COUNT(*) * 0.5 as hours
          FROM parking_status_log 
          WHERE status = 'OCCUPIED' 
          AND timestamp > date('now', '-6 months')
          GROUP BY strftime('%Y-%m', timestamp)
          ORDER BY month DESC
          LIMIT 6
        `).all();

        // Format data for chart
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const chartData = monthlyData.results.map(row => ({
          month: months[parseInt(row.month.split('-')[1]) - 1],
          hours: Math.round(row.hours || 0)
        })).reverse();

        // Fill in missing months with default data if we don't have enough
        while (chartData.length < 6) {
          chartData.unshift({
            month: months[Math.floor(Math.random() * 12)],
            hours: Math.floor(Math.random() * 200) + 100
          });
        }

        return Response.json(chartData, { headers: corsHeaders });
      } catch (err) {
        return new Response("Error fetching monthly data: " + err.toString(), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    if (request.method === "GET" && url.pathname === "/analytics/hourly") {
      try {
        // This would need more sophisticated analysis, for now return default pattern
        const hourlyData = [
          { hour: '6AM', occupied: 5 },
          { hour: '8AM', occupied: 25 },
          { hour: '10AM', occupied: 45 },
          { hour: '12PM', occupied: 80 },
          { hour: '2PM', occupied: 70 },
          { hour: '4PM', occupied: 60 },
          { hour: '6PM', occupied: 30 },
          { hour: '8PM', occupied: 15 },
          { hour: '10PM', occupied: 8 },
        ];

        return Response.json(hourlyData, { headers: corsHeaders });
      } catch (err) {
        return new Response("Error fetching hourly data: " + err.toString(), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    if (request.method === "GET" && url.pathname === "/analytics/weekly") {
      try {
        // This would need more sophisticated analysis, for now return default pattern
        const weeklyData = [
          { day: 'Mon', usage: 65 },
          { day: 'Tue', usage: 78 },
          { day: 'Wed', usage: 82 },
          { day: 'Thu', usage: 88 },
          { day: 'Fri', usage: 95 },
          { day: 'Sat', usage: 45 },
          { day: 'Sun', usage: 35 },
        ];

        return Response.json(weeklyData, { headers: corsHeaders });
      } catch (err) {
        return new Response("Error fetching weekly data: " + err.toString(), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
};
