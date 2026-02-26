import { toastError } from '@/shared/ui/toast';

export const showCartError = (reason?: string) => {
  const message = reason
    ? '장바구니 추가에 실패했어요.\n' + reason
    : '장바구니 추가에 실패했어요.';
  toastError(message);
};
