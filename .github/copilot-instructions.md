# PCSensei AI Assistant Instructions

## Project Overview

PCSensei is an **AI-powered PC & Laptop recommendation engine** with real-time price monitoring. It's a full-stack web application (HTML/JavaScript frontend + Node.js backend) that helps users build custom PCs and choose laptops based on budget, usage patterns, and preferences.

**Key Value**: Intelligent component recommendations + automated daily price updates

---

## Architecture & Data Flow

### Frontend Stack
- **main.html** (1988 lines): User-facing app with interactive wizard UI
- **admin.html** (2226 lines): Admin panel for component/price management
- **price-dashboard.html**: Visualization of price update history
- **CSS**: Tailwind + custom glass-morphism effects, inline styles in HTML files

### Backend Stack
- **price-monitor.js** (301 lines): AI price monitoring engine (runs daily via cron)
- **api-server.js** (108 lines): Node.js HTTP server (port 3001) for admin-triggered operations
- **data/components.json** (15,096 lines): Master database with 800+ components across 8 categories

### Data Categories (in components.json)
```
laptops, cpus, gpus, mobos (motherboards), ram, storage, psu, case
```
Each item has: id, name, price, specs, shopLinks (6 Indian retailers: Amazon, Flipkart, Reliance Digital, Croma, Vijay Sales, MD Computers)

---

## Critical AI Recommendation Logic

### Laptop Selection Algorithm (main.html lines 980-1040)
Uses **multi-factor scoring system** (0-100+ points):
- **Usage-based scoring**: Gaming (GPU tier +30), Productivity (RAM/Battery +20-30), Coding (RAM/Storage +25), Content (OLED screen +20)
- **Budget efficiency bonus**: 85-100% budget utilized = +25 points; 70-85% = +15 points
- **Filtered by budget tolerance**: First tries exact budget, allows 5% overage, falls back to 20% overage
- **Sorting**: By AI score (if diff > 10), then by price descending
- Top 3 picks returned; best pick gets auto-generated reasoning

**Pattern to preserve**: Always score THEN sort by score with price as tiebreaker. Don't hardcode "best" - let scoring determine it.

### Desktop PC Selection Algorithm (main.html lines 1050-1350)
**Tiered approach based on budget**:

1. **₹≤20k** (Ultra-budget): AMD Athlon APU + integrated GPU
2. **₹20-45k** (Budget-conscious): Ryzen 5000 series APU + no discrete GPU
3. **₹>45k** (Standard): Workload-optimized CPU/GPU selection

**Workload allocation** (smart budget distribution):
- Gaming: GPU gets 45% of budget, CPU gets 20%
- Productivity/Coding: GPU gets 25%, CPU gets 30%
- High-end (₹>200k): GPU can reach 50%, CPU gets 20%

**Component selection sequence**: CPU → GPU → Motherboard (socket-matched) → RAM → Storage → PSU → Case

**Critical: Budget enforcement loop** (lines 1335-1370): If total > budget:
1. Try downgrading GPU first (usually most expensive)
2. Then try downgrading CPU (preserve socket compatibility)
3. Last resort: Strip down RAM/Storage/Case to basics
4. Never get stuck in infinite loop - break on impossible budget

**PSU wattage calculation** (lines 1305-1325):
- Extract CPU/GPU TDP from spec strings
- Add 100W system overhead
- Multiply by 1.2 for 20% headroom
- PSU tier selection: 
  - ₹>300k → Platinum/Titanium
  - ₹150-300k → Gold certification
  - ₹<150k → Bronze/Standard

---

## Price Monitoring System

### Market Analysis Engine (price-monitor.js)
**Simulated AI pricing** (not real API calls yet):
- **Market trends**: Category-specific (GPUs +5%, SSDs -5%)
- **Seasonal factors**: Nov-Dec +3%, Jan-Feb -3%, rest neutral
- **Demand patterns**: High-demand (GPU/CPU) +0-3%, medium-demand ±1%, low-demand -2-0%
- **Bounds enforcement**: All changes clamped to -5% to +10% (CONFIG.priceVariation)

**Configuration** (top of price-monitor.js):
```javascript
checkInterval: 24 * 60 * 60 * 1000,  // 24 hours - adjust for testing
priceVariation: { min: 0.95, max: 1.10 }
```

**Output**: 
- `logs/price-updates.log` (JSON format)
- `logs/price-summary.txt` (human-readable)

### Integration Points
- **Admin trigger**: Admin panel button → api-server.js POST `/api/run-price-check` → spawns `price-monitor.js --once`
- **Continuous monitoring**: `node price-monitor.js` (runs indefinitely, checks every 24h)
- **Windows integration**: `check-prices-once.bat` and `start-monitor.bat` batch files

---

## Security Model

### Admin Authentication
- **Storage**: sessionStorage (session-only, not persistent)
- **Timeout**: 30-minute auto-logout check (lines 1503-1504 in admin.html)
- **Token**: Simple session token + loginTime timestamp
- **Default credentials**: admin/admin123 (CHANGE IN PRODUCTION)

### XSS & Injection Prevention
- Security headers in vercel.json: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- Input sanitization in forms (e.g., add-buy-links.js sanitizes component names)
- localStorage only used for JSON backup/restore (not user data)

### Data Persistence
- **Frontend**: Reads from `data/components.json` via fetch (CORS enabled in api-server.js)
- **Admin edits**: localStorage temporary storage + manual JSON download/upload (no database persistence yet)
- **Price updates**: Automatically writes back to `data/components.json`

---

## Developer Workflows

### Setup & Running

**User App**:
```bash
python -m http.server 8000
# Or: npm run serve
# Then: http://localhost:8000/main.html
```

**Admin Panel**:
```
http://localhost:8000/admin.html
# Default: admin/admin123
```

**Price Monitoring**:
```bash
# One-time check
node price-monitor.js --once

# Continuous (24h interval)
node price-monitor.js

# Via admin panel (requires api-server running)
node api-server.js  # Starts on port 3001
# Then click "Update Prices" in admin.html
```

### Adding Components
Use admin panel or directly edit `data/components.json`:
- Required fields: id, name, price, type (for laptops), spec, brand
- Optional fields: shopLinks (object with keys: amazon, flipkart, reliance, croma, vijay, mdcomputers)
- shopLinks generated via `add-buy-links.js` if missing

### Deployment
- **Vercel**: vercel.json configured (see VERCEL-DEPLOY.md)
- **Command**: `vercel --prod` from project root
- **Static hosting**: No server required (vercel.json handles rewrite to index.html)

---

## Project-Specific Patterns

### When Modifying Recommendation Logic
1. Keep scoring in **main.html lines 980-1350** (all recommendation code centralized)
2. Update AI-IMPROVEMENTS.md if adding new factors (see that file for design decisions)
3. Test with multiple budget tiers (₹15k, ₹50k, ₹150k, ₹400k) - edge cases matter
4. Always validate socket compatibility for CPUs (mobo.socket === cpu.socket)
5. Preserve the "downgrade gracefully" pattern - never break budget constraint

### When Adding New Components
1. Add to appropriate category array in data/components.json
2. Include shopLinks (copy structure from existing items)
3. Set price to realistic Indian market value
4. For laptops: include type (basic/office/gaming/creative), screen, refresh, battery, weight
5. For desktop components: include specs relevant to scoring (cores, vram, tdp, socket)

### When Extending Price Monitoring
1. Edit CONFIG at top of price-monitor.js
2. Modify market factors (currently object in calculateMarketFactors method)
3. To integrate real APIs: Replace fetchMarketPrice method (lines 23-52)
4. Log format: JSON arrays of {item, oldPrice, newPrice, reason, timestamp}

---

## Important Constraints & Edge Cases

- **No actual API integrations yet**: Price monitoring is simulated (ready for real APIs)
- **sessionStorage-only auth**: Admin data not persisted across sessions
- **JSON database limits**: 15k+ lines can slow parsing; consider pagination for 1000+ items
- **Indian market focus**: Prices in INR, retailers are Indian, spec formats assume Indian product listings
- **Vercel deployment**: No Node.js backend; api-server.js only works in development
- **Browser compatibility**: No IE support (uses ES6+, Fetch API, ES modules)

---

## Key Files to Know

| File | Lines | Purpose | When to Edit |
|------|-------|---------|--------------|
| [main.html](main.html) | 1988 | User UI + recommendation algorithms | New features, UI changes, scoring logic |
| [admin.html](admin.html) | 2226 | Admin panel, CRUD operations | Admin features, component management UI |
| [price-monitor.js](price-monitor.js) | 301 | Price checking engine | Pricing logic, API integration |
| [api-server.js](api-server.js) | 108 | HTTP server for admin triggers | API endpoints, cross-origin concerns |
| [data/components.json](data/components.json) | 15096 | Component database | Adding products, price fixes |
| [AI-IMPROVEMENTS.md](AI-IMPROVEMENTS.md) | 322 | Design rationale for recommendations | Understanding recommendation philosophy |
| [README-PRICE-MONITOR.md](README-PRICE-MONITOR.md) | - | Price monitor documentation | Troubleshooting price updates |

---

## Questions to Ask Before Making Changes

1. **Recommendation changes**: Does this affect all 8 categories or specific ones? Update AI-IMPROVEMENTS.md?
2. **UI changes**: Check both main.html AND admin.html (separate designs, different frameworks)
3. **Price changes**: Will this affect the -5% to +10% bounds? Test edge cases?
4. **Database schema**: Does this change require migrating 800+ existing items?
5. **Performance**: Is this O(n) or worse? (Large dataset: 800+ components)
6. **Deployment**: Does this feature work on Vercel static hosting or need Node.js?
