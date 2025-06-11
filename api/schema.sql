CREATE TABLE IF NOT EXISTS parking_status_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dev_eui TEXT,
  device_name TEXT,
  status TEXT CHECK(status IN ('FREE', 'OCCUPIED')),
  status_changed BOOLEAN,
  timestamp TEXT,
  rssi INTEGER,
  snr REAL,
  gateway_id TEXT,
  gateway_name TEXT,
  gateway_lat REAL,
  gateway_long REAL
);

CREATE TABLE IF NOT EXISTS latest_parking_status (
  dev_eui TEXT PRIMARY KEY,
  device_name TEXT,
  status TEXT CHECK(status IN ('FREE', 'OCCUPIED')),
  timestamp TEXT
);

CREATE TABLE IF NOT EXISTS client_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  log_level TEXT CHECK(log_level IN ('ERROR', 'WARN', 'INFO', 'DEBUG')),
  message TEXT,
  user_agent TEXT,
  url TEXT,
  error_details TEXT,
  ip_address TEXT
);
