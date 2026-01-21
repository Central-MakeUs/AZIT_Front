import type { ComponentType } from 'react';
import { useFlow } from '@/app/routes/stackflow';
import { useAuthStore } from '@/shared/store/auth';

/**
 * 회원 인증이 필요한 페이지를 보호하는 HOC입니다.
 * localStorage의 accessToken을 확인하고, 없으면 LoginPage로 리다이렉트합니다
 */
export function withAuth<T extends object>(Component: ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { replace } = useFlow();

    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      replace('LoginPage', {}, { animate: false });
      return <></>;
    }

    // 인증 토큰이 있으면 원본 컴포넌트 렌더링
    return <Component {...props} />;
  };
}
