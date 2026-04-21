import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

type PresignedUrlType = 'MEMBER_PROFILE' | 'CREW_IMAGE';

interface PresignedUrlResponse {
  code: string;
  message: string;
  result: {
    presignedUrl: string;
    imageUrl: string;
  };
}

export const postPresignedUrl = (type: PresignedUrlType, fileName: string) => {
  return auth.post<PresignedUrlResponse>(END_POINT.IMAGES.PRESIGNED_URL, {
    type,
    fileName,
  });
};
