import { POST_MESSAGE_EVENT } from '../constants';

/**
 * Web -> Native 브릿지 타입 정의
 * Web 앱에서 Native 메서드를 호출할 때 사용하는 타입
 */
export type GeoPosition = {
  latitude: number;
  longitude: number;
};

export type AppBridge = {
  openExternalBrowser(url: string): Promise<void>;
  shareInviteCode(code: string, crewName: string): Promise<void>;
  shareSchedule(scheduleId: string): Promise<void>;
  openNaverMap(address: string, lat: number, lng: number): Promise<void>;
  getCurrentPosition(): Promise<GeoPosition>;
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
