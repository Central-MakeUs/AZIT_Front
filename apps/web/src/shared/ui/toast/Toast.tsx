import { toast as sonnerToast, Toaster } from 'sonner';

export { Toaster };

export const toast = {
  ...sonnerToast,
  apiError: (message = '요청에 실패했습니다') =>
    sonnerToast.error(message, { duration: 3000 }),
  success: (message: string) =>
    sonnerToast.success(message, { duration: 2000 }),
};
