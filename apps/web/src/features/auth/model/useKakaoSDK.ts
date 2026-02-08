import { KAKAO_JS_SDK_KEY } from '@/shared/constants/url';
import { useEffect, useState } from 'react';

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
