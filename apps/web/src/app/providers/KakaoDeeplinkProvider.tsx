import { useEffect } from 'react';

const androidStoreUrl =
  'https://play.google.com/store/apps/details?id=com.azitcrew.app';
const iosStoreUrl =
  'https://apps.apple.com/kr/app/%EC%95%84%EC%A7%80%ED%8A%B8-azit/id6758881115';

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

    const isAndroid = ua.includes('android');
    const isIos = /iphone|ipad|ipod/.test(ua);

    const storeUrl = isAndroid ? androidStoreUrl : isIos ? iosStoreUrl : null;

    const targetPath = window.location.pathname + window.location.search;
    const deeplink = `azit://host${targetPath}`;

    const now = Date.now();
    window.location.href = deeplink;

    if (storeUrl) {
      setTimeout(() => {
        if (Date.now() - now < 1500) {
          window.location.href = storeUrl;
        }
      }, 1200);
    }
  }, []);

  return <>{children}</>;
}
