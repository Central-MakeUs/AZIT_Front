import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'AZIT',
  slug: 'azit',
  version: '1.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'azit',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.azitcrew.app',
    associatedDomains: ['applinks:azitcrew.com'],
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
        NSAllowsArbitraryLoadsInWebContent: true,
      },
      LSApplicationQueriesSchemes: ['nmap'],
      ITSAppUsesNonExemptEncryption: false,
      NSPhotoLibraryUsageDescription:
        '프로필 이미지 변경을 위해 갤러리 접근이 필요합니다.',
      NSCameraUsageDescription:
        '프로필 이미지 촬영을 위해 카메라 접근이 필요합니다.',
    },
    appleTeamId: '4U9PQRRKLB',
  },
  android: {
    versionCode: 13,
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          { scheme: 'https', host: 'azitcrew.com' },
          { scheme: 'https', host: 'dev.azitcrew.com' },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    manifest: {
      queries: [
        { package: 'com.kakao.talk' },
        {
          intent: {
            action: 'android.intent.action.VIEW',
            data: { scheme: 'kakaotalk' },
          },
        },
        { package: 'com.nhn.android.nmap' },
        {
          intent: {
            action: 'android.intent.action.VIEW',
            data: { scheme: 'nmap' },
          },
        },
      ],
    },
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/icon.png',
      backgroundImage: './assets/images/icon.png',
      monochromeImage: './assets/images/icon.png',
    },
    edgeToEdgeEnabled: true,
    networkSecurityConfig: './network_security_config.xml',
    package: 'com.azitcrew.app',
    predictiveBackGestureEnabled: false,
    usesCleartextTraffic: true,
  } as ExpoConfig['android'],
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    ['expo-build-properties', { android: { usesCleartextTraffic: true } }],
    ['expo-apple-authentication'],
    [
      '@react-native-kakao/core',
      { nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: 'c325e318-4c76-4fe3-957d-cc670a2a69f9',
    },
  },
};

export default config;
