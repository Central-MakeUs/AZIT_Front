import { useCallback } from 'react';
import { KAKAO_JS_SDK_KEY } from '@/shared/constants/url';

export interface KakaoShareOptions {
  title: string;
  imageUrl: string;
  url: string;
  productName: string;
  regularPrice: number;
  discountRate: number;
  discountPrice: number;
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
    async ({
      title,
      imageUrl,
      url,
      productName,
      regularPrice,
      discountRate,
      discountPrice,
    }: KakaoShareOptions) => {
      if (!ensureKakaoInitialized() || !window.Kakao?.Share) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
        return;
      }
      try {
        await window.Kakao.Share.createDefaultButton({
          container: '#kakaotalk-sharing-btn',
          objectType: 'commerce',
          content: {
            title,
            imageUrl,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          commerce: {
            productName: productName,
            regularPrice: regularPrice,
            discountRate: discountRate,
            discountPrice: discountPrice,
          },
          buttons: [
            {
              title: '구매하기',
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
