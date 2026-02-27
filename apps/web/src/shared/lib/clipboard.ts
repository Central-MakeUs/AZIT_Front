import { hasFinalConsonant } from './hangul';
import { toastSuccess } from '../ui/toast';

export const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  if (hasFinalConsonant(label)) {
    toastSuccess(`${label}이 복사되었습니다.`);
  } else {
    toastSuccess(`${label}가 복사되었습니다.`);
  }
};
