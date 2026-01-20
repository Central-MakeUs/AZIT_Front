import type { AuthProvider } from '../api/models';

export const END_POINT = {
  AUTH: {
    SOCIAL_LOGIN: (provider: AuthProvider) => `/auth/social-login/${provider}`,
    REISSUE_TOKEN: '/auth/reissue',
  },
} as const;
