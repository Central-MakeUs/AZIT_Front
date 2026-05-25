import { useFlow } from '@/app/routes/stackflow';

import { getMypageMenu } from '@/pages/mypage/config/menu';

export const useMypageMenu = () => {
  const { push } = useFlow();
  return getMypageMenu(push);
};
