# Deployment Guide — Hajj Guide AI

This guide covers deploying the web app to Vercel and creating an Android APK via Capacitor.

## 1) Deploy to Vercel (Recommended)

1. Install Vercel CLI (optional):
```powershell
npm install -g vercel
```

2. Build the web app:
```powershell
npm run build
```

3. Deploy with Vercel:
```powershell
vercel # follow prompts (project, scope, link)
# or deploy a production deploy
vercel --prod
```

Your site will be available at the generated URL.

## 2) Create Android APK using Capacitor

1. Install Capacitor and add Android platform (only needed once):
```powershell
npm install @capacitor/core @capacitor/cli
npm run build:web
npx cap init hajj-guide-ai com.hajjguideai.app --web-dir=dist
npx cap add android
npx cap sync
```

2. Open Android Studio:
```powershell
npx cap open android
```

3. In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)

4. Locate the generated APK at: `android/app/build/outputs/apk/release/app-release.apk` and share it.

## Notes
- iOS builds require macOS and Xcode (not covered here). You can use TestFlight for iOS distribution.
- If you want me to run the Capacitor commands here I can prepare automation, but native builds require Android Studio / Xcode installed locally.

## Quick Commands
```powershell
# Build
npm run build

# Capacitor one-time setup
npm install @capacitor/core @capacitor/cli
npm run build:web
npx cap init hajj-guide-ai com.hajjguideai.app --web-dir=dist
npx cap add android
npx cap sync
npx cap open android
```
