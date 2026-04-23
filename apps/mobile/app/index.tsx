import { useRef, useEffect, useState, useCallback } from 'react';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { WebView } from '@/bridge';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';
import { BackHandler, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { WEBVIEW_URL } from '@/constants/url';
import CustomAnimatedSplash from './splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(WEBVIEW_URL);
  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  // 뒤로가기 처리
  useEffect(() => {
    const backAction = () => {
      try {
        if (router.canGoBack()) {
          router.back();
          return true;
        }
      } catch {}
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  useEffect(() => {
    initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '');

    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = Linking.parse(url);
        const webUrl = buildWebUrl(parsedUrl);
        setInitialUrl(webUrl);
      }
    };

    getInitialUrl();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const parsedUrl = Linking.parse(url);
      const webUrl = buildWebUrl(parsedUrl);

      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.location.href = '${webUrl}';
          true;
        `);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const buildWebUrl = (parsedUrl: Linking.ParsedURL): string => {
    const baseUrl = WEBVIEW_URL; // TODO: hostname으로 변경?

    let url = `${baseUrl}`;
    if (parsedUrl.path) {
      url += `/${parsedUrl.path || ''}`;
    }
    if (parsedUrl.queryParams) {
      url += `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`;
    }

    return url;
  };

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!initialUrl) {
    throw new Error('webview url is not set');
  }

  const isHomePath = currentUrl.includes('/auth');

  const safeAreaEdges = isHomePath ? (['top'] as const) : undefined;

  return (
    <SafeAreaProvider>
      {showSplash && <CustomAnimatedSplash onFinish={handleSplashFinish} />}
      <SafeAreaView
        edges={safeAreaEdges}
        style={{
          flex: 1,
          backgroundColor: isHomePath ? 'transparent' : '#ffffff',
        }}
      >
        {isHomePath && (
          <LinearGradient
            colors={['#003483', '#000b1d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={{ flex: 1 }}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          originWhitelist={['*']}
          applicationNameForUserAgent={'azitwebview'}
          onNavigationStateChange={(navState) => {
            setCurrentUrl(navState.url);
            setCanGoBack(navState.canGoBack);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
