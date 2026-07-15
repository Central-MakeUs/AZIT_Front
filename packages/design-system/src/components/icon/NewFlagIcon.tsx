import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function NewFlagIcon(
  { size = 56, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <g clipPath="url(#clip0_newflag)">
        <path
          d="M9.64062 41.2248C9.64062 41.2248 14.8682 43.9646 20.8378 44.0066C27.0664 44.05 34.296 41.0862 40.4504 41.1282C44.5258 41.1562 47.7864 42.209 49.3446 42.8208C49.8136 43.0056 50.3414 42.6976 50.3414 42.2496V13.229C50.3414 12.7964 50.0572 12.4086 49.6008 12.2392C47.9782 11.6372 43.8762 10.3254 39.1526 10.4038C33.0206 10.506 26.6576 13.502 20.6222 13.502C14.7884 13.502 9.64202 10.751 9.64202 10.751V41.2262L9.64062 41.2248Z"
          fill="#D1F801"
        />
        <path
          d="M8.47031 51.5749C7.69611 51.5749 7.07031 50.9491 7.07031 50.1749V8.62852C7.07031 7.85432 7.69611 7.22852 8.47031 7.22852C9.24451 7.22852 9.87031 7.85432 9.87031 8.62852V50.1749C9.87031 50.9491 9.24451 51.5749 8.47031 51.5749Z"
          fill="#333D4B"
        />
        <path
          d="M8.46669 11.4296C10.0131 11.4296 11.2667 10.176 11.2667 8.62959C11.2667 7.08319 10.0131 5.82959 8.46669 5.82959C6.92029 5.82959 5.66669 7.08319 5.66669 8.62959C5.66669 10.176 6.92029 11.4296 8.46669 11.4296Z"
          fill="#333D4B"
        />
      </g>
      <defs>
        <clipPath id="clip0_newflag">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(NewFlagIcon);
export default ForwardRef;
