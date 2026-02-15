import type { components } from '@/shared/api/apiTypes';

type MyInfoResponseSchema = components['schemas']['MyInfoResponse'];

export type MyInfoResult = Required<
  Omit<MyInfoResponseSchema, 'invitationCode'>
> & {
  invitationCode: string | null;
};
