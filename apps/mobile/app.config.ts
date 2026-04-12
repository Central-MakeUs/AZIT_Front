import type { ExpoConfig } from 'expo/config';
import appJson from './app.json';

const config: ExpoConfig = {
  ...appJson.expo,
  plugins: [
    ...(appJson.expo.plugins ?? []),
    [
      '@react-native-kakao/core',
      { nativeAppKey: process.env.KAKAO_NATIVE_APP_KEY ?? '' },
    ],
  ],
};

export default config;
