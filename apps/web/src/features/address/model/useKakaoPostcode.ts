import { useEffect, useRef, useState } from 'react';

import { loadKakaoPostcodeScript } from '@/shared/lib/kakaoPostcode';

export interface KakaoPostcodeResult {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  extraAddress: string;
}

export interface UseKakaoPostcodeOptions {
  onComplete: (data: KakaoPostcodeResult) => void;
}

export function useKakaoPostcode({ onComplete }: UseKakaoPostcodeOptions) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadKakaoPostcodeScript()
      .then(() => setScriptLoaded(true))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !wrapRef.current) return;

    const elementWrap = wrapRef.current;
    const currentScroll = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    );

    const kakao = window.kakao;
    if (!kakao?.Postcode) return;

    new kakao.Postcode({
      oncomplete(data) {
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        onComplete({
          zonecode: data.zonecode,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          extraAddress: extraAddr,
        });

        elementWrap.style.display = 'none';
        document.body.scrollTop = currentScroll;
      },
      onresize(size: { height: number }) {
        elementWrap.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%',
    }).embed(elementWrap);

    elementWrap.style.display = 'block';
  }, [scriptLoaded, onComplete]);

  return { wrapRef };
}
