import type { HTMLAttributes, ReactNode } from 'react';
import { header, headerCenter, headerLeft, headerRight } from './Header.css';
import clsx from 'clsx';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  width?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  sticky?: boolean;
}

export function Header({
  width,
  left,
  center,
  right,
  sticky,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      className={clsx(header({ sticky }), className)}
      style={width ? { width } : undefined}
      {...props}
    >
      <div className={headerLeft}>{left}</div>
      <div className={headerCenter}>{center}</div>
      <div className={headerRight}>{right}</div>
    </header>
  );
}
