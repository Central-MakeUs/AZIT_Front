import { WebView } from 'react-native-webview';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const uri = process.env.EXPO_PUBLIC_WEB_URL;

  if (!uri) {
    throw new Error('EXPO_PUBLIC_WEB_URL is not set');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
      <WebView source={{ uri }} style={{ flex: 1 }} webviewDebuggingEnabled />
    </SafeAreaView>
  );
}
