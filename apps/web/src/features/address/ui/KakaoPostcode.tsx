import { useKakaoPostcode } from '../model/useKakaoPostcode';
import type { KakaoPostcodeResult } from '../model/useKakaoPostcode';
import * as styles from '../styles/KakaoPostcode.css';

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
