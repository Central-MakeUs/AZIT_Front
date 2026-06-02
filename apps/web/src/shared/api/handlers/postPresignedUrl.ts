import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

type PresignedUrlType = 'MEMBER_PROFILE' | 'CREW_IMAGE';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'] as const;

interface PresignedUrlResponse {
  code: string;
  message: string;
  result: {
    presignedUrl: string;
    imageUrl: string;
  };
}

export const postPresignedUrl = (
  type: PresignedUrlType,
  fileName: string,
  crewId?: number
) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext || !(ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) {
    throw new Error(
      `지원하지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')})`
    );
  }

  return auth.post<PresignedUrlResponse>(END_POINT.IMAGES.PRESIGNED_URL, {
    type,
    fileName,
    ...(crewId !== undefined && { crewId }),
  });
};
