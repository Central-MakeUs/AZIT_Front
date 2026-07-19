import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function MandarinIcon(
  { size = 32, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <g clipPath="url(#clip0_mandarin)">
        <path
          d="M29.1112 17.914C29.1112 24.5604 23.2408 29.9476 16 29.9476C8.75919 29.9476 2.88879 24.5604 2.88879 17.914C2.88879 11.2676 8.75919 7.28516 16 7.28516C23.2408 7.28516 29.1112 11.2676 29.1112 17.914Z"
          fill="#FF9000"
        />
        <path
          d="M21.576 7.25223C20.0488 8.34663 17.8536 8.05143 16.8448 7.83383C16.5312 7.76583 16.308 7.45464 16.3448 7.13624C16.4624 6.11064 16.888 3.93704 18.4144 2.84264C19.9416 1.74824 22.1368 2.04344 23.1456 2.26104C23.4592 2.32904 23.6824 2.64024 23.6456 2.95864C23.528 3.98424 23.1024 6.15783 21.576 7.25223Z"
          fill="#006956"
        />
      </g>
      <defs>
        <clipPath id="clip0_mandarin">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(MandarinIcon);
export default ForwardRef;
