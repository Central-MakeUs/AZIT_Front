const KAKAO_NATIVE_APP_KEY = process.env.KAKAO_NATIVE_APP_KEY ?? '';

/** @type {import('expo/config').ExpoConfig} */
const config = {
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
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [`kakao${KAKAO_NATIVE_APP_KEY}`],
          CFBundleURLName: 'Kakao',
        },
      ],
      LSApplicationQueriesSchemes: [
        'kakaokompassauth',
        'kakaolink',
        'kakaoplus',
        'nmap',
      ],
      ITSAppUsesNonExemptEncryption: false,
      NSPhotoLibraryUsageDescription:
        '프로필 이미지 변경을 위해 갤러리 접근이 필요합니다.',
      NSCameraUsageDescription:
        '프로필 이미지 촬영을 위해 카메라 접근이 필요합니다.',
    },
    appleTeamId: '4U9PQRRKLB',
  },
  android: {
    versionCode: 21,
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
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
          extraMavenRepos: [
            'https://devrepo.kakao.com/nexus/content/groups/public/',
          ],
        },
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: '프로필 이미지 변경을 위해 갤러리 접근이 필요합니다.',
        cameraPermission: '프로필 이미지 촬영을 위해 카메라 접근이 필요합니다.',
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: KAKAO_NATIVE_APP_KEY,
        android: {
          authCodeHandlerActivity: true,
        },
        ios: {
          handleKakaoOpenUrl: true,
        },
      },
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

module.exports = config;
