export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    if (request.method === "POST" && new URL(request.url).pathname === "/update") {
      const body = await request.json();

      try {
        // Insert into log table
        await env.DB.prepare(`
          INSERT INTO parking_status_log (
            dev_eui, device_name, status, status_changed, timestamp,
            rssi, snr, gateway_id, gateway_name, gateway_lat, gateway_long
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          body.devEui,
          body.deviceName,
          body.object?.parkingStatus,
          body.object?.statusChanged,
          body.time,
          body.rxInfo?.[0]?.rssi,
          body.rxInfo?.[0]?.snr,
          body.rxInfo?.[0]?.gatewayId,
          body.rxInfo?.[0]?.metadata?.gateway_name,
          parseFloat(body.rxInfo?.[0]?.metadata?.gateway_lat),
          parseFloat(body.rxInfo?.[0]?.metadata?.gateway_long)
        ).run();

        // Upsert into latest status table
        await env.DB.prepare(`
          INSERT OR REPLACE INTO latest_parking_status (
            dev_eui, device_name, status, timestamp
          )
          VALUES (?, ?, ?, ?)
        `).bind(
          body.devEui,
          body.deviceName,
          body.object?.parkingStatus,
          body.time
        ).run();

        return new Response("OK", { status: 200 });
      } catch (err) {
        return new Response("Error writing to database: " + err.toString(), { status: 500 });
      }
    }

    if (request.method === "GET" && new URL(request.url).pathname === "/status") {
      const result = await env.DB.prepare("SELECT * FROM latest_parking_status").all();
      return Response.json(result.results);
    }

    return new Response("Not found", { status: 404 });
  }
};
