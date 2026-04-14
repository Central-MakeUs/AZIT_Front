import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login } from '@react-native-kakao/user';

const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '';

/**
 * Kakao native SDK로 로그인 실행
 * accessToken을 반환하며, 백엔드 API 호출은 Web에서 처리
 */
export const performKakaoLogin = async (): Promise<{
  accessToken: string;
}> => {
  initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  const result = await login();

  if (!result.accessToken) {
    throw new Error('카카오 액세스 토큰을 받지 못했습니다.');
  }

  return { accessToken: result.accessToken };
};
