import type { HTMLAttributes, ReactNode } from 'react';
import { chipVariant, type ChipType } from './chip.css';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  type?: ChipType;
  children: ReactNode;
}

export function Chip({ type, children, ...props }: ChipProps) {
  return (
    <span className={chipVariant({ type })} {...props}>
      {children}
    </span>
  );
}
