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
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { Linking as RNLinking, Platform, Share } from 'react-native';
import { z } from 'zod';
import {
  AZIT_APP_NAME,
  NAVER_MAP_ANDROID_APP_STORE_URL,
  NAVER_MAP_APP_STORE_URL,
  WEBVIEW_URL,
} from '@/shared/constants/url';

/**
 * Web -> Native 브릿지 설정
 * Web 앱에서 호출할 수 있는 Native 메서드들을 정의
 */
export const appBridge = bridge<AppBridge>({
  async openExternalBrowser(url: string) {
    await Linking.openURL(url);
  },
  async shareInviteCode(code: string, crewName: string) {
    await Share.share({
      message: `AZIT의 ${crewName}에서 당신을 초대했어요! 초대 코드를 입력해 크루 가입을 신청하세요\n${code}\n${WEBVIEW_URL}/onboarding?inviteCode=${code}`,
    });
  },
  async shareSchedule(scheduleId: string) {
    await Share.share({
      message: `[AZIT 일정] 이번 주 정기런/번개런 일정 확정!
상세 일정을 확인하고, 지금 바로 AZIT 앱에서 신청해 주세요.\n${WEBVIEW_URL}/schedule/${scheduleId}`,
    });
  },
  async openNaverMap(address: string, lat: number, lng: number) {
    const naverMapAppURL = `nmap://place?lat=${lat}&lng=${lng}&name=${encodeURIComponent(address)}&appname=${AZIT_APP_NAME}`;

    try {
      const supported = await Linking.canOpenURL(naverMapAppURL);
      if (supported) {
        await Linking.openURL(naverMapAppURL);
      } else {
        await Linking.openURL(
          Platform.OS === 'ios'
            ? NAVER_MAP_APP_STORE_URL
            : NAVER_MAP_ANDROID_APP_STORE_URL
        );
      }
    } catch (error) {
      console.error('Naver Map app not found or not installed', error);
    }
  },
  async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  },
  async getLocationPermissionStatus(): Promise<
    'granted' | 'denied' | 'undetermined'
  > {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status;
  },
  async openLocationSettings(): Promise<void> {
    await RNLinking.openSettings();
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
