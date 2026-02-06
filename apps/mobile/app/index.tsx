import { useRef, useEffect, useState, useCallback } from 'react';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

// 스플래시 화면이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [initialUrl, setInitialUrl] = useState<string>(
    `${process.env.EXPO_PUBLIC_WEB_URL}`
  );

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
    const baseUrl = process.env.EXPO_PUBLIC_WEB_URL; // TODO: hostname으로 변경?

    let url = `${baseUrl}`;
    if (parsedUrl.path) {
      url += `/${parsedUrl.path || ''}`;
    }
    if (parsedUrl.queryParams) {
      url += `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`;
    }

    return url;
  };

  // WebView 로드 완료 시 스플래시 화면 숨기기
  const handleWebViewLoad = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!initialUrl) {
    throw new Error('EXPO_PUBLIC_WEB_URL is not set');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={{ flex: 1 }}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          onLoad={handleWebViewLoad}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          originWhitelist={['*']}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
