import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function AppleIcon(
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
      <g clipPath="url(#clip0_apple)">
        <path
          d="M19.32 7.17831C18.2056 8.47911 16.1968 8.69351 15.256 8.71991C14.9632 8.72791 14.6984 8.50071 14.6616 8.21031C14.5432 7.27671 14.448 5.25911 15.5632 3.95831C16.6776 2.65751 18.6864 2.44311 19.6272 2.41671C19.92 2.40871 20.1848 2.63591 20.2216 2.92631C20.34 3.85991 20.4352 5.87751 19.32 7.17831Z"
          fill="#006956"
        />
        <path
          d="M23.4984 6.77647C21.5424 6.37727 19.5368 6.80207 17.7304 7.84927C16.6672 8.46527 15.3328 8.46527 14.2696 7.84927C12.4632 6.80287 10.4576 6.37727 8.50165 6.77647C3.55765 7.78607 0.807248 13.6757 2.35685 19.9325C3.90725 26.1893 9.17125 30.4429 14.1144 29.4341C14.5112 29.3533 14.8928 29.2397 15.2592 29.0973C15.7336 28.9133 16.2656 28.9133 16.7392 29.0973C17.1056 29.2397 17.488 29.3525 17.884 29.4341C22.828 30.4429 28.092 26.1893 29.6416 19.9325C31.192 13.6757 28.4408 7.78527 23.4968 6.77647H23.4984Z"
          fill="#EF4452"
        />
      </g>
      <defs>
        <clipPath id="clip0_apple">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(AppleIcon);
export default ForwardRef;
