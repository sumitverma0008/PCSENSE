# PCSensei Backend

Node.js backend for price monitoring and API services.

## Files
- **api-server.js** - HTTP server (port 3001) for admin operations
- **price-monitor.js** - Automated price checking engine
- **add-buy-links.js** - Script to generate shopping links
- **update-multi-store-links.js** - Multi-store link updater
- **package.json** - Node.js dependencies

## Setup
```bash
cd backend
npm install
```

## Running
```bash
# Start API server
node api-server.js

# Run price monitor (one-time)
node price-monitor.js --once

# Continuous monitoring (24h interval)
node price-monitor.js
```

## Data Access
Backend accesses shared data at `../shared/data/components.json`
Logs are written to `../shared/logs/`
