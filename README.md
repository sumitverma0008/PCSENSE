# 🖥️ PCSensei - AI-Powered PC Building Assistant

**Intelligent PC & Laptop Consultant with Real-time Price Monitoring**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Price Monitoring](https://img.shields.io/badge/Price%20Updates-Daily-orange)]()

PCSensei is a modern web application that helps users build custom PCs and choose laptops based on their budget, usage requirements, and preferences. Features AI-powered recommendations, compatibility checking, performance predictions, and automatic price monitoring.

---

## ✨ Features

### 🎯 Core Functionality
- **Smart Build Generator**: Get personalized PC/Laptop recommendations based on budget and usage
- **Budget-Based Selection**: From ₹15,000 entry-level to ₹5L+ ultra-high-end builds
- **Usage Profiles**: Gaming, Content Creation, Coding, Office Work, Student use
- **Compatibility Checking**: Automatic CPU socket, motherboard, and power supply compatibility
- **Performance Predictions**: FPS estimates, rendering benchmarks, development metrics

### 🤖 AI Features
- **AI Chat Assistant**: Ask questions about components and compatibility
- **Intelligent Price Monitoring**: Automatic daily price updates with market trend analysis
- **Smart Recommendations**: Multi-factor decision engine for optimal component selection

### 🛡️ Security
- **Session Management**: 30-minute timeout with auto-logout
- **Input Validation**: Comprehensive sanitization and XSS protection
- **Rate Limiting**: Prevents abuse and spam
- **Authentication**: Secure admin panel with password hashing
- **Activity Logging**: Complete audit trail

### 📊 Admin Panel
- **Component Management**: CRUD operations for all product categories
- **Search & Filter**: Real-time search with sorting options
- **Bulk Operations**: Select and delete multiple items
- **Price Analytics**: Min/avg/max price statistics
- **Export/Import**: JSON database backup and restore
- **Activity Dashboard**: Recent changes and system logs

### 💰 Price Monitoring
- **Automated Updates**: Daily price checks (configurable interval)
- **Market Analysis**: Considers trends, seasonality, and demand
- **Price History**: Comprehensive logging of all changes
- **Dashboard**: Visual price update tracking
- **Notifications**: Change alerts and summaries

---

## 🚀 Quick Start

### Prerequisites
- **Web Server**: Python 3.x (for local testing) OR any HTTP server
- **Node.js** (Optional): For price monitoring feature (v14.0.0+)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pcsensei.git
cd pcsensei
```

2. **Start the web server**

**Using Python:**
```bash
python -m http.server 8000
```

**Or using Node.js:**
```bash
npm install -g http-server
http-server -p 8000
```

3. **Open in browser**
```
http://localhost:8000/main.html
```

### Admin Panel Access

1. Navigate to: `http://localhost:8000/admin.html`
2. **Default credentials:**
   - Username: `admin`
   - Password: `admin123`

⚠️ **Change default credentials in production!**

---

## 📂 Project Structure

```
PCSensei/
├── main.html                    # Main user-facing application
├── admin.html                   # Admin panel for component management
├── price-dashboard.html         # Price update visualization dashboard
├── price-monitor.js            # AI price monitoring system (Node.js)
├── package.json                # Node.js dependencies
├── start-monitor.bat           # Windows: Start continuous monitoring
├── check-prices-once.bat       # Windows: One-time price check
├── data/
│   └── components.json         # Component database (800+ items)
├── logs/                       # Auto-generated price update logs
│   ├── price-updates.log       # JSON format logs
│   └── price-summary.txt       # Human-readable summary
└── README.md                   # This file
```

---

## 🎮 Usage Guide

### For Users

1. **Visit the application**: Open `main.html`
2. **Start the wizard**: Click "Start Building"
3. **Choose form factor**: Desktop PC or Laptop
4. **Select usage**: Gaming, Content Creation, Coding, etc.
5. **Set budget**: Use slider (₹15,000 - ₹5,00,000)
6. **Set preferences**: CPU (Intel/AMD) and GPU (NVIDIA/AMD) preferences
7. **Get recommendation**: View complete build with performance metrics
8. **Ask AI**: Use chat assistant for questions

### For Admins

1. **Login**: Access `admin.html` with credentials
2. **View Dashboard**: See component statistics and recent activity
3. **Manage Components**: 
   - Add new items
   - Edit existing items
   - Delete or bulk delete
   - Search and filter
4. **Export/Import**: Backup and restore database
5. **Monitor Prices**: Check `price-dashboard.html` for updates

---

## 🤖 AI Price Monitoring

### Setup

**Install Node.js** (if not installed):
- Download from [nodejs.org](https://nodejs.org/)
- Verify: `node --version`

### Running Price Monitor

**One-time check (Manual update):**
```bash
node price-monitor.js --once
```

Or on Windows, double-click:
```
check-prices-once.bat
```

**Continuous monitoring (Production):**
```bash
node price-monitor.js
```

Or on Windows:
```
start-monitor.bat
```

### How It Works

1. **Market Analysis**: Analyzes category-specific trends
2. **Seasonal Factors**: Adjusts for holidays, sales periods
3. **Demand Patterns**: Considers high/medium/low demand
4. **Price Bounds**: Limits changes to -5% to +10%
5. **Database Update**: Automatically updates `components.json`
6. **Logging**: Creates detailed logs in `logs/` directory

### Configuration

Edit `price-monitor.js`:

```javascript
const CONFIG = {
    checkInterval: 24 * 60 * 60 * 1000,  // 24 hours (adjust as needed)
    priceVariation: {
        min: 0.95,   // -5% minimum change
        max: 1.10    // +10% maximum change
    }
};
```

### Production Integration

Replace simulated price fetching with real APIs:

```javascript
async fetchMarketPrice(item, category) {
    // Example: Real API integration
    const response = await fetch(`https://api.pricetracker.com/v1/price`, {
        method: 'POST',
        body: JSON.stringify({
            productName: item.name,
            category: category
        })
    });
    const data = await response.json();
    return data.price;
}
```

---

## 🔐 Security Features

### Admin Panel
- SHA-256 password hashing
- Session token generation (64-character hex)
- 30-minute session timeout
- Rate limiting (3 attempts, 1-minute lockout)
- XSS protection via HTML sanitization
- Input validation on all fields
- Activity logging for audit trail

### Main Application
- HTTP security headers
- Input sanitization
- Budget validation
- Rate limiting on build generation
- Database structure validation
- Content Security Policy

### Best Practices
1. Change default admin credentials
2. Use HTTPS in production
3. Implement backend authentication
4. Add CORS policies
5. Regular security audits
6. Keep dependencies updated

---

## 🎨 Customization

### Adding Components

**Via Admin Panel:**
1. Login to admin panel
2. Select category tab
3. Click "Add New" button
4. Fill in component details
5. Save

**Via JSON:**
Edit `data/components.json`:

```json
{
  "cpus": [
    {
      "id": "c101",
      "name": "New CPU Model",
      "brand": "Intel",
      "cores": 16,
      "socket": "LGA1700",
      "price": 45000
    }
  ]
}
```

### Modifying UI

**Colors**: Edit CSS variables in `main.html` and `admin.html`

```css
:root {
    --primary-color: #667eea;
    --accent-color: #764ba2;
}
```

**Budget Range**: Edit in `main.html`:

```javascript
<input type="range" 
    min="15000"    <!-- Minimum budget -->
    max="500000"   <!-- Maximum budget -->
    step="5000">   <!-- Slider increment -->
```

---

## 📊 Database Structure

### Component Categories
- **Laptops** (104 items): Complete laptop systems
- **CPUs** (101 items): Processors (Intel/AMD)
- **GPUs** (101 items): Graphics cards (NVIDIA/AMD)
- **Motherboards** (101 items): Mainboards with socket types
- **RAM** (101 items): Memory modules
- **Storage** (101 items): SSDs and HDDs
- **PSU** (101 items): Power supplies
- **Cases** (101 items): PC cases

### Sample Component Structure

```json
{
  "id": "c50",
  "name": "Intel Core i7-12700K",
  "brand": "Intel",
  "cores": 12,
  "threads": 20,
  "socket": "LGA1700",
  "price": 32000,
  "tier": "mid"
}
```

---

## 🛠️ Development

### Local Development

1. **Clone and setup:**
```bash
git clone https://github.com/yourusername/pcsensei.git
cd pcsensei
```

2. **Start development server:**
```bash
python -m http.server 8000
```

3. **Make changes** to HTML/CSS/JS files

4. **Test** in browser: `http://localhost:8000`

### Adding New Features

**Example: New Component Type**

1. Add to `data/components.json`:
```json
{
  "monitors": [
    {
      "id": "mon1",
      "name": "Sample Monitor",
      "price": 15000
    }
  ]
}
```

2. Update admin panel tabs in `admin.html`
3. Update recommendation engine in `main.html`

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Failed to load database"**
- **Solution**: Ensure `data/components.json` exists and is valid JSON
- Test: `python -m json.tool data/components.json`

**Issue: Admin panel won't login**
- **Solution**: Check browser console for errors
- Clear browser cache and cookies
- Verify credentials: `admin` / `admin123`

**Issue: Price monitor not working**
- **Solution**: Install Node.js 14+ from nodejs.org
- Run: `node --version` to verify
- Check logs in `logs/` directory

**Issue: Components not displaying**
- **Solution**: Check browser console (F12)
- Verify HTTP server is running
- Check `data/components.json` format

### Debug Mode

Enable console logging:
```javascript
// In browser console
localStorage.setItem('debug', 'true');
location.reload();
```

---

## 📝 API Documentation

### Main Application Functions

```javascript
// Generate PC build
async function generateBuild()

// Load database
async function loadDb()

// Navigate wizard
function navWizard(step)

// Set preferences
function setPref(type, value)
```

### Admin Panel Functions

```javascript
// CRUD operations
function saveItem(category)
function deleteItem(category, index)
function bulkDelete()

// Database management
function exportData()
function importData(event)

// Session management
function logout()
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Code Style
- Use consistent indentation (4 spaces)
- Comment complex logic
- Follow existing patterns
- Test thoroughly before submitting

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with vanilla JavaScript (no frameworks!)
- Icons from Font Awesome
- Styling with Tailwind CSS (CDN)
- Inspiration from PC part picker websites

---

## 📧 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/pcsensei/issues)
- **Email**: your.email@example.com
- **Documentation**: See `README-PRICE-MONITOR.md` for price monitoring details

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] User accounts and saved builds
- [ ] Price comparison across retailers
- [ ] Real-time availability checking
- [ ] Build sharing and community ratings
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Build templates/presets
- [ ] Newsletter for price alerts
- [ ] Integration with e-commerce APIs

---

## 📸 Screenshots

### Main Application
![Main Interface](https://via.placeholder.com/800x400?text=PCSensei+Main+Interface)

### Admin Panel
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard)

### Price Dashboard
![Price Updates](https://via.placeholder.com/800x400?text=Price+Monitoring)

---

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6
- **Backend**: Node.js (Price monitoring)
- **Database**: JSON file-based
- **Server**: Python HTTP Server / Node.js http-server

---

## 📊 Statistics

- **800+** components in database
- **5** usage profiles
- **8** component categories
- **Daily** price updates
- **100%** vanilla JavaScript
- **0** external dependencies (main app)

---

**Built with ❤️ for PC building enthusiasts**

*Last updated: November 2025*
