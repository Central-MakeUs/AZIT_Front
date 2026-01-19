import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function ShoppingBagIcon(
  { size = 64, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <path
        d="M42.6654 21.3333C42.6654 24.1623 41.5416 26.8754 39.5412 28.8758C37.5408 30.8762 34.8277 32 31.9987 32C29.1698 32 26.4567 30.8762 24.4563 28.8758C22.4559 26.8754 21.3321 24.1623 21.3321 21.3333M9.68732 19.737L7.82066 42.137C7.41965 46.9491 7.21915 49.3551 8.03256 51.2112C8.74724 52.8419 9.98548 54.1876 11.5512 55.0352C13.3333 56 15.7477 56 20.5764 56H43.421C48.2498 56 50.6642 56 52.4462 55.0352C54.012 54.1876 55.2502 52.8419 55.9649 51.2112C56.7783 49.3551 56.5778 46.9491 56.1768 42.137L54.3102 19.737C53.9651 15.5967 53.7926 13.5265 52.8757 11.9596C52.0683 10.5798 50.8661 9.47361 49.424 8.78359C47.7864 8 45.7091 8 41.5544 8L22.4431 8C18.2884 8 16.2111 8 14.5734 8.78358C13.1314 9.4736 11.9291 10.5798 11.1217 11.9596C10.2049 13.5265 10.0324 15.5967 9.68732 19.737Z"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(ShoppingBagIcon);
export default ForwardRef;
