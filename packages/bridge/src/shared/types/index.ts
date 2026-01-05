import { POST_MESSAGE_EVENT } from '../../shared/constants';

/**
 * Web -> Native 브릿지 타입 정의
 * Web 앱에서 Native 메서드를 호출할 때 사용하는 타입
 */
export type AppBridge = {
  getMessage(): Promise<"I'm from native">;
  openInAppBrowser(url: string): Promise<void>;
};

/**
 * Native -> Web 브릿지 타입 정의 (PostMessage)
 * Native 앱에서 Web으로 이벤트를 전송할 때 사용하는 타입
 */
export type AppPostMessageSchema = {
  [POST_MESSAGE_EVENT.EVENT_NAME1]: {
    validate: (data: unknown) => string;
  };
  [POST_MESSAGE_EVENT.EVENT_NAME2]: {
    validate: (data: unknown) => { message: string };
  };
};
