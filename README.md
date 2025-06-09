# 🚗 IoT Parking Monitor with Cloudflare Workers

A real-time parking spot monitoring system using **MeteoScientific Fleximodo sensors**, **Cloudflare Workers**, and **D1 Database**. Built for small businesses who want to monitor their parking without expensive solutions.

## ✨ **Live Demo**
- **Dashboard**: [parking.paleotreats.com](https://parking.paleotreats.com)
- **Real sensor data** from a Paleo Treats parking spot in San Diego

## 🏗️ **Architecture**
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Cloudflare Workers (serverless)
- **Database**: Cloudflare D1 (SQLite-based)
- **Sensor**: MeteoScientific Fleximodo In Ground (LoRaWAN)
- **Network**: Helium IoT Network

## 💰 **Total Cost**
- **Hardware**: ~$200-300 (sensor)
- **Monthly**: $0 (free tier covers small usage)
- **Setup time**: 2-3 hours

## 🚀 **Quick Start**

### **Prerequisites**
- LoRaWAN parking sensor with webhook capability
- Node.js 18+
- Cloudflare account (free tier works)

### **1. Clone & Install**
```bash
git clone https://github.com/your-username/iot-parking-monitor.git
cd iot-parking-monitor
npm install
```

### **2. Set Up Cloudflare**
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
cd api
wrangler d1 create your-parking-db

# Copy the database ID from output and update wrangler.toml
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your database_id

# Create database tables
wrangler d1 execute your-parking-db --file=schema.sql
```

### **3. Configure Secrets**
```bash
# Create webhook secret for sensor authentication
wrangler secret put WEBHOOK_SECRET
# Enter a strong random string when prompted

# Set CORS origin for your domain
wrangler secret put CORS_ORIGIN
# Enter your domain: https://your-domain.com
```

### **4. Deploy**
```bash
# Deploy API
wrangler deploy

# Build and deploy frontend
cd ..
npm run build
wrangler pages deploy dist --project-name your-parking
```

### **5. Configure Your Sensor**
Set up webhook in your sensor's management console:
- **URL**: `https://your-api.your-subdomain.workers.dev/update`
- **Authorization**: `Bearer YOUR_WEBHOOK_SECRET`
- **Content-Type**: `application/json`

## 📊 **Features**
- ✅ **Real-time status** (FREE/OCCUPIED)
- ✅ **Analytics dashboard** with charts
- ✅ **Weekly heatmap** showing patterns
- ✅ **Mobile responsive** design
- ✅ **Sensor diagnostics** (RSSI, SNR, packets)
- ✅ **Intelligent defaults** (works before collecting data)
- ✅ **Secure webhook** authentication
- ✅ **Rate limiting** and CORS protection

## 🛡️ **Security Features**
- Input validation on all endpoints
- Webhook signature verification
- Rate limiting (120 requests/minute)
- CORS restrictions
- No device IDs exposed publicly
- All secrets stored in Cloudflare

## 🔧 **Customization**

### **Sensor Integration**
The system expects JSON webhooks with this structure:
```json
{
  "deviceInfo": {
    "devEui": "device-id",
    "deviceName": "sensor-name"
  },
  "object": {
    "parkingStatus": "FREE" // or "BUSY"
  },
  "time": "2025-01-17T10:00:00Z",
  "rxInfo": [...]
}
```

### **Branding**
Update these files for your brand:
- `src/components/PaleoTreatsLogo.tsx`
- `src/pages/Index.tsx`
- Color scheme in `src/index.css`

## 📱 **API Endpoints**
- `GET /status` - Current parking status
- `GET /analytics/stats` - Dashboard statistics
- `GET /analytics/weekly` - Weekly heatmap data
- `POST /update` - Webhook for sensor data (authenticated)

## 🌐 **Supported Sensors**
- ✅ **MeteoScientific Fleximodo** (tested)
- ✅ **Any LoRaWAN sensor** with webhook capability
- ✅ **ChirpStack integrations**
- ⚠️ **Modify webhook payload** structure as needed

## 📖 **Blog Posts & Tutorials**
- [Setting up IoT Parking on a Budget](https://blog.example.com)
- [Cloudflare Workers for IoT Applications](https://blog.example.com)
- [LoRaWAN vs Traditional Parking Solutions](https://blog.example.com)

## 🤝 **Contributing**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

## 📜 **License**
MIT License - feel free to use this for your business!

## 💬 **Support**
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For setup help and questions
- **Twitter**: [@your-handle](https://twitter.com/meteoscientific)

---

*Built with ❤️ for small businesses who want enterprise-grade IoT without the enterprise budget.*
