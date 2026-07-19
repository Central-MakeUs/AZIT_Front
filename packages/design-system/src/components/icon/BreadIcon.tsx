import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function BreadIcon(
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
      <g clipPath="url(#clip0_bread)">
        <path
          d="M28.572 12.4624H10.1544C9.59282 13.7416 9.30322 15.1232 9.30322 16.52V26.0896C9.30322 27.236 10.2328 28.1656 11.3792 28.1656H27.5312C28.6776 28.1656 29.424 27.236 29.424 26.0896V16.52C29.424 15.1232 29.1336 13.7416 28.572 12.4624Z"
          fill="#F77F00"
        />
        <path
          d="M29.9583 10.1393C29.9583 6.65767 25.5423 3.83447 20.0943 3.83447H11.0223C11.0223 3.83447 11.9647 9.33207 14.1735 13.0673H28.8295C29.5495 12.1921 29.9583 11.1961 29.9583 10.1393Z"
          fill="#F77F00"
        />
        <path
          d="M21.6872 10.1393C21.6872 6.65767 17.2712 3.83447 11.8232 3.83447C6.37517 3.83447 1.95837 6.65767 1.95837 10.1393C1.95837 11.2025 2.37197 12.2041 3.09917 13.0825C2.70077 14.1833 2.49277 15.3457 2.49277 16.5193V26.0889C2.49277 27.2353 3.42237 28.1649 4.56877 28.1649H19.0752C20.2216 28.1649 21.1512 27.2353 21.1512 26.0889V16.5193C21.1512 15.3457 20.944 14.1833 20.5448 13.0825C21.272 12.2033 21.6856 11.2025 21.6856 10.1393H21.6872Z"
          fill="#FFD06C"
        />
      </g>
      <defs>
        <clipPath id="clip0_bread">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(BreadIcon);
export default ForwardRef;
