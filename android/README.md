# PCSensei Android App

React Native mobile application for PCSensei - AI-Powered PC Building Assistant.

## Features

✅ **Implemented:**
- 📱 Native Android app with React Navigation
- 🎯 Step-by-step recommendation wizard
- 💰 Budget slider (₹15,000 - ₹5,00,000)
- 🎮 Usage profile selection (Gaming, Content, Coding, Office, Student)
- 🔧 Desktop PC build generator
- 💻 Laptop recommendation engine
- 📊 Component details with retailer links
- 💾 Offline data caching (24-hour cache)
- 🇮🇳 Indian Rupee formatting
- 🌐 API integration with backend

## Tech Stack

- **React Native** 0.73.0
- **React Navigation** - Stack & Bottom Tabs
- **React Native Paper** - Material Design components
- **Axios** - HTTP requests
- **AsyncStorage** - Local data caching
- **Vector Icons** - Material Community Icons

## Project Structure

```
android/
├── src/
│   ├── App.js                          # Main app with navigation
│   ├── services/
│   │   └── ApiService.js               # API calls & recommendation logic
│   └── screens/
│       ├── HomeScreen.js               # Landing page
│       ├── BuildTypeScreen.js          # Desktop/Laptop selection
│       ├── UsageProfileScreen.js       # Usage selection
│       ├── BudgetScreen.js             # Budget slider
│       ├── PreferencesScreen.js        # CPU/GPU preferences
│       ├── ResultsScreen.js            # Recommendations display
│       ├── ComponentDetailsScreen.js   # Component details
│       ├── PriceDashboardScreen.js     # Price tracking (coming soon)
│       └── AboutScreen.js              # About page
├── package.json
├── index.js
├── app.json
└── babel.config.js
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Java Development Kit (JDK) 11+
- Android Studio with Android SDK
- React Native development environment

### Installation

1. **Install dependencies:**
```bash
cd android
npm install
```

2. **Install pods (if on macOS for iOS):**
```bash
cd ios && pod install && cd ..
```

3. **Run on Android:**
```bash
npm run android
```

4. **Run on Android emulator:**
- Open Android Studio
- Start an AVD (Android Virtual Device)
- Run: `npm run android`

5. **Run on physical device:**
- Enable USB debugging on your Android device
- Connect via USB
- Run: `npm run android`

## API Configuration

The app fetches data from:
```javascript
API_BASE_URL = 'https://pcsense.vercel.app'
```

Data is cached locally for 24 hours using AsyncStorage.

## Key Features Explained

### Recommendation Engine
- **Laptop Scoring:** Multi-factor algorithm based on budget efficiency, usage requirements, and specs
- **Desktop Build:** Smart budget allocation (GPU 45%, CPU 20% for gaming; CPU 30%, GPU 25% for productivity)
- **Compatibility:** Automatic CPU socket matching with motherboards
- **PSU Calculation:** TDP-based wattage with 20% headroom

### Offline Support
- Components cached for 24 hours
- Automatic fallback to cache on network error
- Manual cache refresh available

### Navigation Flow
```
Home → BuildType → UsageProfile → Budget → Preferences → Results → ComponentDetails
```

## Customization

### Change API URL
Edit `src/services/ApiService.js`:
```javascript
const API_BASE_URL = 'https://your-domain.com';
```

### Modify Theme Colors
Edit `src/App.js`:
```javascript
const theme = {
  colors: {
    primary: '#667eea',  // Change to your color
    accent: '#764ba2',
  },
};
```

### Adjust Cache Duration
Edit `src/services/ApiService.js`:
```javascript
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
```

## Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Android App Bundle (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

Bundle location: `android/app/build/outputs/bundle/release/app-release.aab`

## Troubleshooting

**Metro bundler issues:**
```bash
npm start -- --reset-cache
```

**Build errors:**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**Network errors:**
- Check internet connection
- Verify API URL is accessible
- Check if cache exists (offline mode works even without network)

## Coming Soon

- 📊 Price tracking dashboard with historical data
- 🔔 Push notifications for price drops
- ❤️ Favorite/save builds
- 📤 Share builds via social media
- 🔄 Build comparison tool
- 🌙 Dark mode

## Contributing

See main project README for contribution guidelines.

## License

MIT License - See main project LICENSE file.
