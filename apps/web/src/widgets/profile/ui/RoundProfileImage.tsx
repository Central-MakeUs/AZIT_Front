import clsx from 'clsx';
import { useEffect, useState } from 'react';

import * as styles from '@/widgets/profile/styles/RoundProfileImage.css';

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
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    setHasLoadError(false);
  }, [src]);

  if (!src || hasLoadError) {
    return (
      <div
        className={clsx(styles.placeholderContainer, className)}
        style={{ '--profile-image-size': `${size}px` } as React.CSSProperties}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={clsx(styles.profileImage, className)}
      onError={() => setHasLoadError(true)}
    />
  );
}
