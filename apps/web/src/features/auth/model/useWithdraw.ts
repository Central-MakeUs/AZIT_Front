import { useFlow } from '@/app/routes/stackflow';
import { useAuthStore } from '@/shared/store/auth';
import { postWithdraw } from '@/features/auth/api/postWithdraw';

export const useWithdraw = () => {
  const { setAccessToken, setIsInitialized } = useAuthStore();
  const { replace } = useFlow();

  const handleWithdraw = async () => {
    const response = await postWithdraw();

    if (response.ok) {
      setAccessToken(undefined);
      setIsInitialized(false);
      replace('LoginPage', {}, { animate: false });
    }
  };

  return { handleWithdraw };
};
