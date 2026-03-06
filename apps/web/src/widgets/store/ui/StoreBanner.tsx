import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';

import * as styles from '@/widgets/store/styles/StoreBanner.css';

interface StoreBannerRootProps {
  children: ReactNode;
  handleClick?: () => void;
}

function StoreBannerRoot({ children, handleClick }: StoreBannerRootProps) {
  return (
    <div className={styles.banner} onClick={handleClick}>
      {children}
    </div>
  );
}

function StoreBannerTitle({ children }: PropsWithChildren) {
  return <div className={styles.bannerTitle}>{children}</div>;
}

function StoreBannerDescription({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(styles.bannerDescription, className)}>{children}</div>
  );
}

export const StoreBanner = Object.assign(StoreBannerRoot, {
  Title: StoreBannerTitle,
  Description: StoreBannerDescription,
});
