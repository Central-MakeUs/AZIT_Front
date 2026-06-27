import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

interface InvitationCodeResult {
  invitationCode: string;
}

export const postReissueInvitationCode = (crewId: number) => {
  return auth.post<ApiResponse<InvitationCodeResult>>(
    END_POINT.CREW.REISSUE_INVITATION_CODE(crewId),
    undefined
  );
};
