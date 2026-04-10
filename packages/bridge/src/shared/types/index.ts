import { POST_MESSAGE_EVENT } from '../constants';

/**
 * Web -> Native 브릿지 타입 정의
 * Web 앱에서 Native 메서드를 호출할 때 사용하는 타입
 */
export type GeoPosition = {
  latitude: number;
  longitude: number;
};

export type SocialLoginType = 'kakao' | 'apple';

/**
 * Native에서 소셜 로그인을 실행하고 인증 정보를 반환
 * - Kakao: native SDK accessToken
 * - Apple: authorizationCode
 * 실제 백엔드 API 호출은 Web에서 처리 (쿠키 기반)
 */
export type SocialAuthResult =
  | { success: true; authorizationCode?: string; accessToken?: string }
  | { success: false; message: string };

export type AppBridge = {
  openExternalBrowser(url: string): Promise<void>;
  shareInviteCode(code: string, crewName: string): Promise<void>;
  shareSchedule(scheduleId: string): Promise<void>;
  openNaverMap(address: string, lat: number, lng: number): Promise<void>;
  getCurrentPosition(): Promise<GeoPosition>;
  getLocationPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'>;
  openLocationSettings(): Promise<void>;
  socialLogin(type: SocialLoginType): Promise<SocialAuthResult>;
  storeAccessToken(token: string): Promise<void>;
  getAccessToken(): Promise<{ accessToken: string | null }>;
  logout(): Promise<void>;
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
