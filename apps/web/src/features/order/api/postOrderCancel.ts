import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const postOrderCancel = (orderNumber: string) => {
  return auth.patch(END_POINT.ORDER.CANCEL(orderNumber), undefined);
};
