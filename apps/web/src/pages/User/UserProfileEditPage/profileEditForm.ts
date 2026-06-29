import { z } from 'zod';

export const MAX_NICKNAME_LENGTH = 10;

export const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요')
  .max(
    MAX_NICKNAME_LENGTH,
    `닉네임은 ${MAX_NICKNAME_LENGTH}자 이내로 입력해주세요`
  )
  .regex(/^[\p{L}\p{N}]*$/u, '특수문자는 사용할 수 없어요.');
