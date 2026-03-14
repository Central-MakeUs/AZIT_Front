import { useRef, useEffect, useState, useCallback } from 'react';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';
import { BackHandler, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { WEBVIEW_URL } from '@/shared/constants/url';
import CustomAnimatedSplash from './splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(`${WEBVIEW_URL}`);
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

  const handleShouldStartLoad = useCallback(
    (request: { url?: string | null }) => {
      const url = request.url ?? '';

      if (!url) return true;

      const isHttp = url.startsWith('http://') || url.startsWith('https://');

      // Intent 스킴 처리 (가장 먼저 확인)
      if (url.startsWith('intent:')) {
        // 인텐트 문자열 안에 포함된 browser_fallback_url 수동 파싱
        const fallbackKey = 'S.browser_fallback_url=';
        const keyIndex = url.indexOf(fallbackKey);

        if (keyIndex !== -1) {
          const valueStart = keyIndex + fallbackKey.length;
          const valueEnd = url.indexOf(';', valueStart);
          const encodedValue =
            valueEnd === -1
              ? url.slice(valueStart)
              : url.slice(valueStart, valueEnd);

          try {
            const fallbackUrl = decodeURIComponent(encodedValue);

            // 웹뷰 내에서 window.location으로 이동
            if (webViewRef.current) {
              webViewRef.current.injectJavaScript(`
                window.location.href = ${JSON.stringify(fallbackUrl)};
                true;
              `);
            }
          } catch (error) {
            console.warn(
              'Failed to decode intent fallback url from WebView',
              error,
              encodedValue
            );
          }
        } else {
          console.warn('No browser_fallback_url found in intent url', url);
        }

        // WebView에서는 계속 진행하지 않음
        return false;
      }

      // 카카오톡 관련 앱 스킴 처리
      if (
        url.startsWith('kakaotalk://') ||
        url.startsWith('kakaokompass://') ||
        url.startsWith('kakao:') ||
        url.startsWith('talk:')
      ) {
        Linking.openURL(url).catch((error) => {
          console.warn('Failed to open Kakao app url from WebView', error, url);
        });
        return false;
      }

      // 카카오 OAuth URL은 WebView 에서 그대로 진행
      if (url.includes('kauth.kakao.com')) {
        return true;
      }

      // HTTP/HTTPS는 WebView 에서 처리
      if (isHttp) {
        return true;
      }

      // 그 외 커스텀 스킴은 네이티브로 위임
      if (!isHttp) {
        Linking.openURL(url).catch((error) => {
          console.warn('Failed to open external url from WebView', error, url);
        });
        return false;
      }

      return true;
    },
    []
  );

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
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onNavigationStateChange={(navState) => {
            setCurrentUrl(navState.url);
            setCanGoBack(navState.canGoBack);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
