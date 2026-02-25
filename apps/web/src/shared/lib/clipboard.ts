import { toastSuccess } from '../ui/toast';

export const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toastSuccess(`${label}이 복사되었습니다.`);
};
