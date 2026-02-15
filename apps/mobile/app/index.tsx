import { useRef, useEffect, useState, useCallback } from 'react';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';
import { Platform, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { WEBVIEW_URL } from '@/shared/constants/url';
import CustomAnimatedSplash from './splash-screen';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(`${WEBVIEW_URL}/store`);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 앱이 종료된 상태에서 링크로 열릴 때의 초기 URL 처리
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = Linking.parse(url);
        const webUrl = buildWebUrl(parsedUrl);
        setInitialUrl(webUrl);
      }
    };

    getInitialUrl();

    // 앱이 실행 중일 때 링크로 열릴 때의 URL 처리
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const parsedUrl = Linking.parse(url);
      const webUrl = buildWebUrl(parsedUrl);

      // WebView의 URL을 변경
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

  return (
    <SafeAreaProvider>
      {showSplash && <CustomAnimatedSplash onFinish={handleSplashFinish} />}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isHomePath ? 'transparent' : '#ffffff',
          paddingBottom: Platform.OS === 'ios' ? -24 : 0,
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
          userAgent={Platform.OS === 'ios' ? `ios azitwebview` : 'azitwebview'}
          onNavigationStateChange={(navState) => {
            setCurrentUrl(navState.url);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
