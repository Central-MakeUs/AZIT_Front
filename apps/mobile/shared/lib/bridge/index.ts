import {
  bridge,
  createWebView,
  postMessageSchema,
} from '@webview-bridge/react-native';
import {
  type AppBridge,
  type AppPostMessageSchema,
  POST_MESSAGE_EVENT,
} from '@azit/bridge';
import { Share } from 'react-native';
import { z } from 'zod';

/**
 * Web -> Native 브릿지 설정
 * Web 앱에서 호출할 수 있는 Native 메서드들을 정의
 */
export const appBridge = bridge<AppBridge>({
  async getMessage() {
    return "I'm from native";
  },
  async openInAppBrowser(url: string) {
    return;
  },
  async shareInviteCode(code: string) {
    await Share.share({
      message: `00에서 당신을 초대했어요! 초대 코드를 입력해 크루 가입을 신청하세요\n${code}`,
      url: `${process.env.EXPO_PUBLIC_WEB_URL}/onboarding?inviteCode=${code}`,
    });
  },
});

/**
 * Native -> Web 브릿지 설정 (PostMessage)
 * Native에서 Web으로 이벤트를 전송할 때 사용하는 스키마 정의
 */
export const appPostMessageSchema = postMessageSchema<AppPostMessageSchema>({
  [POST_MESSAGE_EVENT.EVENT_NAME1]: {
    validate: (data) => z.string().parse(data),
  },
  [POST_MESSAGE_EVENT.EVENT_NAME2]: {
    validate: (value) => {
      return z.object({ message: z.string() }).parse(value);
    },
  },
});

/**
 * WebView 및 postMessage export
 * - WebView: Web 콘텐츠를 표시하는 컴포넌트
 * - postMessage: Native -> Web 이벤트 전송 함수
 */
export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  postMessageSchema: appPostMessageSchema,
  debug: true,
  fallback: (method) => {
    console.warn(`Method '${method}' not found in native`);
  },
});
