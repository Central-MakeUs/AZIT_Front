import { useCallback } from 'react';

import { KAKAO_JS_SDK_KEY } from '@/shared/constants/url';

export interface KakaoShareOptions {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

function ensureKakaoInitialized(): boolean {
  if (typeof window === 'undefined' || !window.Kakao) return false;
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_SDK_KEY as string);
  }
  return window.Kakao.isInitialized();
}

export function useKakaoShare() {
  const share = useCallback(
    async ({ title, description, imageUrl, url }: KakaoShareOptions) => {
      if (!ensureKakaoInitialized() || !window.Kakao?.Share) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
        return;
      }
      try {
        await window.Kakao.Share.sendDefault({
          container: '#kakaotalk-sharing-btn',
          objectType: 'feed',
          content: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
            {
              title: '앱으로 보기',
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
      } catch (error) {
        console.error('카카오 공유 실패:', error);
      }
    },
    []
  );

  return { share };
}
