import type { AuthProvider } from '../api/models';

export const END_POINT = {
  AUTH: {
    SOCIAL_LOGIN: (provider: AuthProvider) => `auth/social-login/${provider}`,
    REISSUE_TOKEN: 'auth/reissue',
    LOGOUT: 'auth/logout',
  },
  ONBOARDING: {
    CREATE_CREW: 'crews',
    CREW_INFO: (invitationCode: string) => `crews/invitation/${invitationCode}`,
    JOIN_CREW: 'crews/join',
    JOIN_STATUS: (crewId: number) => `crews/${crewId}/join-status`,
    TERM_AGREE: 'members/terms',
  },
  STORE: {
    PRODUCTS: 'products',
    PRODUCT_DETAIL: (productId: number) => `products/${productId}`,
  },
} as const;
