import { Text, TouchableOpacity } from 'react-native';
import { WebView, postMessage } from '@/shared/lib/bridge';
import { POST_MESSAGE_EVENT } from '@azit/bridge';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const uri = process.env.EXPO_PUBLIC_WEB_URL;

  if (!uri) {
    throw new Error('EXPO_PUBLIC_WEB_URL is not set');
  }

  /**
   * Native -> Web 이벤트 전송 예제
   * postMessage를 사용하여 Web으로 이벤트 전송
   */
  const handleSendEvent2 = () => {
    postMessage(POST_MESSAGE_EVENT.EVENT_NAME1, 'Hello from Native!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
      {/* Native -> Web 이벤트 전송 테스트 영역 */}
      <TouchableOpacity onPress={handleSendEvent2}>
        <Text>이벤트 1 전송 (객체)</Text>
      </TouchableOpacity>

      <WebView source={{ uri }} style={{ flex: 1 }} webviewDebuggingEnabled />
    </SafeAreaView>
  );
}
