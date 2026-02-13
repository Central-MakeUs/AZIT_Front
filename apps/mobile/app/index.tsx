import { useRef, useEffect, useState, useCallback } from 'react';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { WEBVIEW_URL } from '@/shared/constants/url';
import CustomAnimatedSplash from './splash-screen';

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [initialUrl, setInitialUrl] = useState<string>(`${WEBVIEW_URL}/store`);
  const [splashDone, setSplashDone] = useState(false);

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
    setSplashDone(true);
  }, []);

  const handleWebViewLoad = useCallback(() => {
    console.log('WebView loaded');
  }, []);

  const handleWebViewError = useCallback((event: any) => {
    console.log('WebView error:', event.nativeEvent);
  }, []);

  // 스플래시는 CustomAnimatedSplash만 사용
  if (!splashDone) {
    return <CustomAnimatedSplash onFinish={handleSplashFinish} />;
  }

  if (!initialUrl) {
    throw new Error('webview url is not set');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={{ flex: 1 }}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          originWhitelist={['*']}
          userAgent={Platform.OS === 'ios' ? `ios azitwebview` : 'azitwebview'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
