import { KAKAO_JS_SDK_KEY } from '@/shared/constants/url';
import { useEffect, useState } from 'react';

interface KakaoAuth {
  authorize: (settings: { redirectUri: string; state?: string }) => void;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  logout: (callback?: () => void) => void;
}

interface KakaoAPIRequestSettings {
  url: string;
  data?: Record<string, unknown>;
  success?: (response: unknown) => void;
  fail?: (error: unknown) => void;
}

interface KakaoAPI {
  request: <T = unknown>(settings: KakaoAPIRequestSettings) => Promise<T>;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

interface KakaoSDKReturn {
  isLoaded: boolean;
  isLoading: boolean;
}

export const useKakaoSDK = (): KakaoSDKReturn => {
  const appKey = KAKAO_JS_SDK_KEY;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao !== undefined) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(appKey as string);
      }
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    try {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(appKey as string);
        }
        setIsLoaded(true);
      } else {
        console.error(
          'Kakao SDK를 로드했지만 window.Kakao를 찾을 수 없습니다.'
        );
      }
    } catch (error) {
      console.error('알 수 없는 에러가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, [appKey]);

  return { isLoaded, isLoading };
};
