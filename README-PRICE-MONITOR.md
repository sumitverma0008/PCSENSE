# 🤖 AI Price Monitoring System

Automated daily price checking and updating system for PCSensei component database.

## Features

✅ **AI-Powered Price Prediction**
- Market trend analysis
- Seasonal pricing factors
- Supply/demand calculations
- Competitor price monitoring simulation

✅ **Automatic Updates**
- Daily scheduled checks (24-hour intervals)
- Automatic database updates
- Price change logging
- Human-readable summaries

✅ **Smart Price Adjustments**
- Prevents extreme price changes (-5% to +10%)
- Category-specific trends
- Seasonal factors (holiday pricing, sales)
- Demand-based adjustments

✅ **Comprehensive Logging**
- JSON logs for analysis
- Human-readable summaries
- Change tracking with percentages
- Statistics (increases/decreases)

## Installation

### Prerequisites
- Node.js 14+ installed
- Existing PCSensei project structure

### Setup

1. **Install Dependencies** (if needed):
```bash
npm install
```

2. **Verify File Structure**:
```
PCSensei/
├── data/
│   └── components.json
├── logs/                    # Auto-created
├── price-monitor.js
├── package.json
├── start-monitor.bat
└── check-prices-once.bat
```

## Usage

### Option 1: Continuous Monitoring (Recommended for Production)

**Windows:**
```bash
start-monitor.bat
```

**Command Line:**
```bash
node price-monitor.js
```

This will:
- Run an immediate price check
- Schedule checks every 24 hours
- Keep running in background
- Update prices automatically

### Option 2: One-Time Check (Testing/Manual Updates)

**Windows:**
```bash
check-prices-once.bat
```

**Command Line:**
```bash
node price-monitor.js --once
```

This will:
- Run a single price check
- Update the database
- Generate logs
- Exit immediately

### Option 3: NPM Scripts

```bash
# Start continuous monitoring
npm start

# Run one-time check
npm run check-once

# Start web server separately
npm run serve
```

## How It Works

### 1. Price Fetching (AI Simulation)
```javascript
// Simulates real API calls to:
// - Amazon Product API
// - Flipkart API
// - Price comparison services
// - Google Shopping API

const newPrice = await fetchMarketPrice(item, category);
```

### 2. AI Price Calculation
The system considers:
- **Market Trends**: Category-specific pricing trends
- **Seasonal Factors**: Holiday pricing, post-sale discounts
- **Demand Patterns**: High/medium/low demand categories
- **Price Bounds**: -5% to +10% variation limits

### 3. Database Update
```javascript
// Automatically updates data/components.json
db[category][index].price = newPrice;
await saveDatabase(db);
```

### 4. Logging
Creates two files in `logs/` directory:
- `price-updates.log`: JSON format with detailed changes
- `price-summary.txt`: Human-readable summary

## Configuration

Edit `price-monitor.js` to customize:

```javascript
const CONFIG = {
    checkInterval: 24 * 60 * 60 * 1000, // 24 hours
    priceVariation: {
        min: 0.95,  // -5% minimum
        max: 1.10   // +10% maximum
    }
};
```

### Adjust Check Frequency
```javascript
// Every 12 hours
checkInterval: 12 * 60 * 60 * 1000

// Every 6 hours
checkInterval: 6 * 60 * 60 * 1000

// Every hour (testing)
checkInterval: 60 * 60 * 1000
```

### Price Variation Limits
```javascript
// More conservative (-3% to +5%)
priceVariation: {
    min: 0.97,
    max: 1.05
}

// More aggressive (-10% to +20%)
priceVariation: {
    min: 0.90,
    max: 1.20
}
```

## Production Integration

### Real API Integration

Replace the simulated `fetchMarketPrice` with actual API calls:

```javascript
async fetchMarketPrice(item, category) {
    // Example: Amazon Product API
    const response = await fetch(`https://api.amazon.com/products/${item.id}`);
    const data = await response.json();
    return data.price;
    
    // Example: PriceAPI.com
    const price = await priceAPI.getPrice({
        name: item.name,
        category: category
    });
    return price;
}
```

### Webhook Notifications

Add price change alerts:

```javascript
async notifyPriceChange(updates) {
    // Slack notification
    await fetch('https://hooks.slack.com/your-webhook', {
        method: 'POST',
        body: JSON.stringify({
            text: `${updates.length} prices updated`
        })
    });
    
    // Email notification
    await sendEmail({
        to: 'admin@pcsensei.com',
        subject: 'Daily Price Update',
        body: this.generateSummary(updates)
    });
}
```

### Run as Windows Service

Use `node-windows` package:

```bash
npm install -g node-windows
```

```javascript
var Service = require('node-windows').Service;

var svc = new Service({
    name: 'PCSensei Price Monitor',
    description: 'Automatic price monitoring service',
    script: 'D:\\Project Work\\PCSensei\\price-monitor.js'
});

svc.on('install', () => svc.start());
svc.install();
```

### Run as Linux Service (systemd)

Create `/etc/systemd/system/pcsensei-monitor.service`:

```ini
[Unit]
Description=PCSensei Price Monitor
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/pcsensei
ExecStart=/usr/bin/node price-monitor.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable pcsensei-monitor
sudo systemctl start pcsensei-monitor
```

## Log Files

### price-updates.log (JSON)
```json
{
  "timestamp": "2025-11-28T10:30:00.000Z",
  "totalUpdates": 245,
  "updates": [
    {
      "category": "cpus",
      "id": "c50",
      "name": "Intel Core i7-12700K",
      "oldPrice": 32000,
      "newPrice": 32640,
      "change": 640,
      "changePercent": 2.0
    }
  ]
}
```

### price-summary.txt
```
PCSensei Price Update Summary
Generated: 28/11/2025, 4:00:00 pm
============================================================

CPUS
------------------------------------------------------------
  Intel Core i7-12700K
    Old: ₹32,000 → New: ₹32,640 (↑ 2.00%)

Summary Statistics:
  Total Updates: 245
  Price Increases: 123
  Price Decreases: 122
  No Change: 0
```

## Troubleshooting

### Issue: "Cannot find module"
```bash
npm install
```

### Issue: "ENOENT: no such file"
Ensure `data/components.json` exists

### Issue: Prices not updating
- Check file permissions
- Verify Node.js version (14+)
- Check logs in `logs/` directory

### Issue: Service stops unexpectedly
Use process manager:
```bash
npm install -g pm2
pm2 start price-monitor.js --name pcsensei-monitor
pm2 save
```

## Advanced Features

### Schedule Multiple Checks Per Day

```javascript
// Morning check (9 AM)
schedule('0 9 * * *', () => monitor.runManualCheck());

// Evening check (9 PM)
schedule('0 21 * * *', () => monitor.runManualCheck());
```

### Price History Tracking

```javascript
// Store historical data
this.priceHistory.set(item.id, {
    prices: [...previousPrices, newPrice],
    timestamps: [...timestamps, Date.now()]
});

// Analyze trends
const trend = this.analyzePriceTrend(item.id);
```

## Support

For issues or questions:
- Check logs in `logs/` directory
- Review configuration in `price-monitor.js`
- Test with `--once` flag first

## License

MIT License - PCSensei Project
