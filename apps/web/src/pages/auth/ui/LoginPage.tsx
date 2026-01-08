import { useEffect } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@azit/design-system';
import { bridge } from '@/shared/lib/bridge';
import { POST_MESSAGE_EVENT } from '@azit/bridge';

export function LoginPage() {
  /**
   * Native -> Web 이벤트 수신 예제
   * bridge.addEventListener로 Native에서 보낸 이벤트를 구독
   */
  useEffect(() => {
    const unsubscribe1 = bridge.addEventListener(
      POST_MESSAGE_EVENT.EVENT_NAME1,
      (data) => {
        window.alert(data);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribe1();
    };
  }, []);

  return (
    <AppScreen>
      <h2>로그인 페이지</h2>
      <div>
        {/* Web -> Native 브릿지 통신 테스트 */}
        <Button
          onClick={async () => {
            try {
              const result = await bridge.getMessage();
              console.log('브릿지 통신 결과:', result);
            } catch (err) {
              console.error('브릿지 통신 에러:', err);
            }
          }}
        >
          브릿지 통신 테스트 (Web -&gt; Native)
        </Button>
      </div>
    </AppScreen>
  );
}
