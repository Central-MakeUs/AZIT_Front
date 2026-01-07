import type { HTMLAttributes, ReactNode } from 'react';
import { header, headerCenter, headerLeft, headerRight } from './header.css';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  onBackClick?: () => void;
}

export default function Header({ left, center, right, ...props }: HeaderProps) {
  return (
    <header className={header} {...props}>
      <div className={headerLeft}>{left}</div>
      <div className={headerCenter}>{center}</div>
      <div className={headerRight}>{right}</div>
    </header>
  );
}
