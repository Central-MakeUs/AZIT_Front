import { useRef } from 'react';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { WebView as WebViewType } from 'react-native-webview';

export default function App() {
  const uri = `${process.env.EXPO_PUBLIC_WEB_URL}/onboarding`;
  const webViewRef = useRef<WebViewType>(null);

  if (!uri) {
    throw new Error('EXPO_PUBLIC_WEB_URL is not set');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
      <WebView
        ref={webViewRef}
        source={{ uri }}
        style={{ flex: 1 }}
        webviewDebuggingEnabled
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}
