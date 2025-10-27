# Notification Exercises Implementation

## Overview

This project implements all 8 notification exercises using React Native with Expo and expo-router.

## Implemented Features

### Bài 1 & Bài 2: Immediate Notification

- ✅ Button "Gửi ngay" that sends an immediate notification
- ✅ Uses `scheduleNotificationAsync` with `trigger: null`
- ✅ Custom title and body content

### Bài 3: Scheduled Notification

- ✅ Button "Nhắc tôi sau 10 giây"
- ✅ Schedules notification after 10 seconds using `trigger: { seconds: 10 }`
- ✅ Shows Alert "Đã lên lịch nhắc nhở"
- ✅ Includes data payload (student: 'SV001', course: 'React Native')

### Bài 4: Expo Push Notifications

- ✅ Implemented `registerForPushNotificationsAsync`
- ✅ Gets ExpoPushToken from Expo
- ✅ Displays token on screen
- ✅ Shows token in console for easy copying

### Bài 5: Notification Response Listener

- ✅ Added `data` attribute to notification content
- ✅ Implemented `addNotificationResponseReceivedListener` in `_layout.tsx`
- ✅ Logs notification data when user taps notification
- ✅ Console outputs student and course data

### Bài 6: Android Notification Channels

- ✅ Checks `Platform.OS === 'android'`
- ✅ Creates two channels:
  - `reminders` (Nhắc nhở) - High importance
  - `news` (Tin tức) - Default importance
- ✅ All notifications use `channelId: 'reminders'`

### Bài 7: Navigation with Notifications

- ✅ Uses expo-router for navigation
- ✅ Created HomeScreen (index.tsx) and DetailsScreen (details.tsx)
- ✅ Notification includes data: `{ screen: 'Details', itemId: 123 }`
- ✅ Listener handles navigation logic
- ✅ DetailsScreen displays: "Bạn đang xem chi tiết Item {id}"

### Bài 8: AsyncStorage Token Management

- ✅ Installed and configured `@react-native-async-storage/async-storage`
- ✅ Reads existing token from AsyncStorage before requesting new token
- ✅ Compares old token with new token
- ✅ Updates token in AsyncStorage if different (simulates backend API call)
- ✅ No update if token unchanged

## File Structure

```
app/
  ├── _layout.tsx       # Root layout with notification listener
  ├── index.tsx         # Home screen with all buttons (Bai 1-8)
  └── details.tsx       # Details screen for navigation (Bai 7)
```

## How to Run

1. Install dependencies (already done):

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on Android device:

   ```bash
   npm run android
   ```

4. **Important**: These exercises require a **physical device** to work properly, especially for:
   - Push notifications (Bài 4, 6, 8)
   - Deep linking/navigation from notifications (Bài 7)

## Testing Tips

1. **Testing in Console**: Check Metro bundler console or device logs for:

   - Expo Push Token (Bai 4)
   - Notification data when tapped (Bai 5)
   - Navigation events (Bai 7)

2. **Testing on Physical Device**:

   - Run `npx expo start` and scan QR code with Expo Go app
   - Or run `npm run android` on a connected Android device

3. **Testing Push Tokens** (Bai 4):

   - Copy the token from screen
   - Go to https://expo.dev/notifications
   - Paste token and send a test notification

4. **Testing Navigation** (Bai 7):
   - Tap "Gửi thông báo có điều hướng"
   - Allow notification to appear
   - Tap on the notification
   - Should see data logged in console

## Dependencies

Already installed in package.json:

- `expo-notifications`
- `@react-native-async-storage/async-storage`
- `expo-router`
- `expo-device`
- `react-native`

## Notes

- For Expo Push Token (Bai 4, 8), the app will automatically get the token from Expo
- AsyncStorage integration (Bai 8) simulates backend token management
- Android channels (Bai 6) only apply to Android devices
- All notifications are configured to work with app in foreground
- ChannelId is handled properly for both Android (with channelId in trigger) and iOS (null trigger)

## Configuration

The `app.json` includes:

- expo-notifications plugin configured
- Android permissions for notifications
- Proper channel configuration

## Next Steps

1. Get your Expo project ID from expo.dev
2. Update the `projectId` in `app/index.tsx` line ~100
3. Test on physical device
4. Implement actual backend API calls for token storage (Bai 8)
