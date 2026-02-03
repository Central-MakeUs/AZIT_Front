import type { AuthProvider } from '../api/models';

export const END_POINT = {
  AUTH: {
    SOCIAL_LOGIN: (provider: AuthProvider) => `auth/social-login/${provider}`,
    REISSUE_TOKEN: 'auth/reissue',
  },
  ONBOARDING: {
    CREATE_CREW: 'crews',
    CREW_INFO: (invitationCode: string) => `crews/invitation/${invitationCode}`,
    JOIN_CREW: 'crews/join',
    TERM_AGREE: 'members/terms',
  },
} as const;
