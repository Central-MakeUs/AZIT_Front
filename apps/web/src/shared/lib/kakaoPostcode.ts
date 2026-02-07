const KAKAO_POSTCODE_SRC =
  '//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const SCRIPT_ID = 'kakao-postcode-script';

let loadPromise: Promise<void> | null = null;

export function loadKakaoPostcodeScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window is not defined'));
  }

  if (window.kakao?.Postcode) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = KAKAO_POSTCODE_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('Failed to load Kakao Postcode script'));
    document.head.appendChild(script);
  });

  return loadPromise;
}
