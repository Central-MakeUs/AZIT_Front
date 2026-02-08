import { useEffect } from 'react';

export function KakaoDeeplinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isKakao = ua.includes('kakao');
    const isAzitWebview = ua.includes('azitwebview');

    if (!isKakao || isAzitWebview) return;

    const targetPath = window.location.pathname + window.location.search;
    const deeplink = `azit://host${targetPath}`;
    const storeUrl =
      'https://apps.apple.com/kr/app/%EB%84%A4%EC%9D%B4%EB%B2%84-naver/id393499958';

    const now = Date.now();
    window.location.href = deeplink;

    setTimeout(() => {
      if (Date.now() - now < 1500) {
        window.location.href = storeUrl;
      }
    }, 1200);
  }, []);

  return <>{children}</>;
}
