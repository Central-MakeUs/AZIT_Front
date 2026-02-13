import {
  useKakaoPostcode,
  type KakaoPostcodeResult,
} from '@/features/address/model/useKakaoPostcode';
import * as styles from '@/features/address/styles/KakaoPostcode.css';

export interface KakaoPostcodeProps {
  onComplete: (data: KakaoPostcodeResult) => void;
}

export function KakaoPostcode({ onComplete }: KakaoPostcodeProps) {
  const { wrapRef } = useKakaoPostcode({ onComplete });

  return (
    <div className={styles.container}>
      <div ref={wrapRef} className={styles.wrap} />
    </div>
  );
}
