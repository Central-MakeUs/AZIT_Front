import clsx from 'clsx';
import * as styles from '../styles/RoundProfileImage.css';

export interface RoundProfileImageProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function RoundProfileImage({
  src,
  alt = 'profile',
  size = 96,
  className,
}: RoundProfileImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={clsx(styles.profileImage, className)}
    />
  );
}
