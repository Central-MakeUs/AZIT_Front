import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

interface PatchMyProfileRequest {
  nickname: string;
  imageUrl: string;
}

export const updateMyProfile = (body: PatchMyProfileRequest) => {
  return auth.patch<ApiResponseWithoutResult>(
    END_POINT.MEMBER.MY_PROFILE,
    body
  );
};
