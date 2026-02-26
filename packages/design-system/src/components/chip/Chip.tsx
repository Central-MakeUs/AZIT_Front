import type { HTMLAttributes, ReactNode } from 'react';
import { chipVariant, type ChipType } from './Chip.css';
import clsx from 'clsx';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  type?: ChipType;
  children: ReactNode;
}

export function Chip({ type, className, children, ...props }: ChipProps) {
  return (
    <span className={clsx(chipVariant({ type }), className)} {...props}>
      {children}
    </span>
  );
}
