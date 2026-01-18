import type { HTMLAttributes, ReactNode } from 'react';
import { header, headerCenter, headerLeft, headerRight } from './header.css';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  width?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export function Header({ width, left, center, right, ...props }: HeaderProps) {
  return (
    <header className={header} style={width ? { width } : undefined} {...props}>
      <div className={headerLeft}>{left}</div>
      <div className={headerCenter}>{center}</div>
      <div className={headerRight}>{right}</div>
    </header>
  );
}
