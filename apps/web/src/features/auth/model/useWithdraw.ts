import { useFlow } from '@/app/routes/stackflow';

import { postWithdraw } from '@/features/auth/api/postWithdraw';

import { useAuthStore } from '@/shared/store/auth';

export const useWithdraw = () => {
  const { setAccessToken, setIsInitialized } = useAuthStore();
  const { replace } = useFlow();

  const handleWithdraw = async () => {
    await postWithdraw();
    setAccessToken(undefined);
    setIsInitialized(false);
    replace('LoginPage', {}, { animate: false });
  };

  return { handleWithdraw };
};
