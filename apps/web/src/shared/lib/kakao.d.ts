interface KakaoPostcodeData {
  userSelectedType: string;
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  bname: string;
  buildingName: string;
  apartment: string;
}

interface KakaoPostcodeOptions {
  oncomplete: (data: KakaoPostcodeData) => void;
  onresize?: (size: { height: number }) => void;
  width?: string;
  height?: string;
}

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

interface KakaoShareLink {
  mobileWebUrl?: string;
  webUrl?: string;
}

interface KakaoShareFeedContent {
  title: string;
  description: string;
  imageUrl: string;
  link: KakaoShareLink;
}

interface KakaoShareButton {
  title: string;
  link: KakaoShareLink;
}

interface KakaoShare {
  sendDefault: (options: {
    objectType: string;
    content?: KakaoShareFeedContent;
    buttons?: KakaoShareButton[];
  }) => Promise<unknown>;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
  Share: KakaoShare;
}

declare global {
  interface Window {
    kakao?: {
      Postcode?: new (options: KakaoPostcodeOptions) => {
        embed: (element: HTMLElement) => void;
      };
    };
    Kakao?: KakaoSDK;
  }
}

export {};
