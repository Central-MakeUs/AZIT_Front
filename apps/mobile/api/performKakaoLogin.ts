import { login } from '@react-native-kakao/user';

/**
 * Kakao native SDK로 로그인 실행
 * accessToken을 반환하며, 백엔드 API 호출은 Web에서 처리
 */
export const performKakaoLogin = async (): Promise<{
  accessToken: string;
}> => {
  const result = await login();

  if (!result.accessToken) {
    throw new Error('카카오 액세스 토큰을 받지 못했습니다.');
  }

  return { accessToken: result.accessToken };
};
