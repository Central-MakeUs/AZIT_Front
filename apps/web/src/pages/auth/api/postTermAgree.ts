import { authApi } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { TermAgreeRequestType } from './types';
import { postReissueToken } from '@/features/auth/api/postReissueToken';
import { useAuthStore } from '@/shared/store/auth';

const extendedAuthApi = authApi.extend({
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 200) {
          const {
            result: { accessToken },
          } = await postReissueToken();

          if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);
          }
        }
      },
    ],
  },
});

export const postTermAgree = async () => {
  const response = await extendedAuthApi
    .post(END_POINT.AUTH.TERM_AGREE, {
      json: {
        serviceTermsAgreed: true,
        privacyPolicyAgreed: true,
        locationServiceAgreed: true,
        thirdPartyInfoAgreed: true,
        marketingTermsAgreed: true,
        notificationTermsAgreed: true,
      },
    })
    .json<TermAgreeRequestType>();

  return response;
};
