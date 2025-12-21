# PCSensei Android - Setup Guide

## Open in Android Studio

1. **Open Android Studio**
2. **File → Open**
3. Navigate to: `d:\Project Work\PCSensei\android\android`
4. Select the `android` folder and click **OK**

## First Time Setup

Once Android Studio opens the project:

1. **Sync Gradle** (Android Studio will prompt automatically)
2. **Install dependencies:**
   ```bash
   cd d:\Project Work\PCSensei\android
   npm install
   ```

3. **Link React Native modules:**
   ```bash
   npx react-native link
   ```

## Running the App

### Option 1: From Android Studio
1. Click the green **Run** button (▶️)
2. Select your emulator or connected device
3. Wait for build to complete

### Option 2: From Command Line
```bash
cd d:\Project Work\PCSensei\android
npm run android
```

## Troubleshooting

**Gradle sync failed:**
- File → Invalidate Caches → Invalidate and Restart
- Delete `android/android/.gradle` and `android/android/build` folders
- Sync again

**Metro bundler not starting:**
```bash
npm start -- --reset-cache
```

**Build errors:**
```bash
cd android/android
gradlew clean
cd ../..
npm run android
```

## Project Structure

```
android/
├── android/              ← Open this in Android Studio
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/pcsensei/
│   │   │   ├── res/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle.properties
├── src/                  ← React Native code
├── package.json
└── index.js
```
