import { WebView } from 'react-native-webview';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
      <WebView source={{ uri: '' }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
