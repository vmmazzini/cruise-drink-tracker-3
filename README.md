# Cruise Drink Tracker (React Native + Expo)

MVP mobile app for iOS/Android to help Carnival passengers track the **Cheers** 15-drink daily package.

## What this project currently is

This folder contains an Expo + React Native starter MVP. It is intentionally small so you can run it, learn the flow, and then expand it feature-by-feature instead of starting with a complex production app.

## Implemented core MVP
- One-tap drink logging with timestamp and price
- Daily 15-drink dashboard with alerts at 10, 13, 15 and override beyond 15
- Daily/trip value tracking vs Cheers daily cost benchmark
- Hydration reminder toggle + smart reminder every 2 alcoholic drinks
- Drink recommendation engine (flavor + alcohol + mood matching)
- Local offline storage with SQLite
- Mock datasets for bars, drinks, prices
- Daily history with delete

## Tech stack
- React Native + Expo + TypeScript
- `expo-sqlite` for local data persistence
- `expo-notifications` for hydration nudges

## Step-by-step: what to do next

### 1. Install prerequisites

Install these on your development machine:

1. **Node.js LTS** from <https://nodejs.org/>
2. **Expo Go** on your iPhone or Android phone, or install a simulator/emulator:
   - iOS: Xcode + iOS Simulator on macOS
   - Android: Android Studio + Android Emulator
3. Optional but recommended: **VS Code** with TypeScript/React Native extensions

### 2. Open the app folder

From the repository root, move into the mobile app project:

```bash
cd cruise-drink-tracker
```

### 3. Install dependencies

```bash
npm install
```

If your environment blocks npm registry access, run the command on your local computer or configure npm to use an allowed registry. A successful install creates `node_modules/` locally.

### 4. Start Expo

```bash
npm run start
```

Expo will print a QR code and a small command menu.

### 5. Run on a device or simulator

Choose one option:

- **Physical phone:** Open Expo Go and scan the QR code.
- **iOS simulator:** Press `i` in the Expo terminal.
- **Android emulator:** Press `a` in the Expo terminal.

### 6. Smoke-test the MVP

Use this quick checklist once the app opens:

1. Confirm the dashboard shows `0/15 drinks today`.
2. Tap **Quick Add Drink**.
3. Confirm the count changes to `1/15` and the daily value increases.
4. Add drinks until 10, 13, and 15 to confirm milestone alerts.
5. Toggle **Hydration reminders** on and add two alcoholic drinks to confirm a water reminder is scheduled.
6. Delete a drink from **Today's History** and confirm the count/value recalculates.
7. Review the recommendations list and confirm it uses the mock menu data.

### 7. Where to make common changes

- Change bars, drinks, and prices in `src/data/mockData.ts`.
- Change the dashboard and main app UI in `App.tsx`.
- Change SQLite schema or CRUD helpers in `src/services/db.ts`.
- Add or update shared TypeScript shapes in `src/types/index.ts`.

### 8. Recommended next build steps

Build these in order so the app becomes more complete without losing stability:

1. Replace the text input quick-add with a real drink picker and bar picker.
2. Add edit support for existing drink entries.
3. Add trip start/end date settings and daily history grouped by date.
4. Add the spin-the-wheel drink selector.
5. Add favorites and filter the wheel/recommendations by favorites or alcohol type.
6. Add CSV export.
7. Add charts for drinks per day and value over time.
8. Add multi-user mode for tracking a partner or friend.

## Setup summary

```bash
cd cruise-drink-tracker
npm install
npm run start
```

Then run iOS simulator (`i`) or Android emulator (`a`) from Expo CLI, or scan the QR code with Expo Go.

## File map
- `App.tsx` UI and core interaction flow
- `src/data/mockData.ts` preloaded bars/menu/prices
- `src/services/db.ts` SQLite schema and CRUD
- `src/types/index.ts` shared domain types

## Notes
- Trip start/end dates, favorites filter, spin wheel UI, editable entries, CSV export, multi-user, and charts are good next steps and can be added on this architecture.
