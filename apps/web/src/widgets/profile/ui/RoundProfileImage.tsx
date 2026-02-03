import * as styles from '../styles/RoundProfileImage.css';

export interface RoundProfileImageProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function RoundProfileImage({
  src,
  alt = 'profile',
  size = 96,
}: RoundProfileImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={styles.profileImage}
    />
  );
}
