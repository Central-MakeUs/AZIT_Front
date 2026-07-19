import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function NewUsersIcon(
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
      <g clipPath="url(#clip0_newusers)">
        <path
          d="M18.3781 27.1768C23.1959 27.1768 27.1015 23.2712 27.1015 18.4534C27.1015 13.6356 23.1959 9.72998 18.3781 9.72998C13.5603 9.72998 9.65466 13.6356 9.65466 18.4534C9.65466 23.2712 13.5603 27.1768 18.3781 27.1768Z"
          fill="#D1F801"
        />
        <path
          d="M18.3817 29.8442C6.65806 29.8442 2.09686 37.8382 2.09686 41.5566C2.09686 45.275 11.8045 46.2648 18.3817 46.2648C24.9589 46.2648 34.6665 45.275 34.6665 41.5566C34.6665 37.8382 30.1067 29.8442 18.3817 29.8442Z"
          fill="#D1F801"
        />
        <path
          d="M37.6077 27.1768C42.4255 27.1768 46.3311 23.2712 46.3311 18.4534C46.3311 13.6356 42.4255 9.72998 37.6077 9.72998C32.7899 9.72998 28.8843 13.6356 28.8843 18.4534C28.8843 23.2712 32.7899 27.1768 37.6077 27.1768Z"
          fill="#3082FF"
        />
        <path
          d="M37.6113 29.8442C25.8877 29.8442 21.3265 37.8382 21.3265 41.5566C21.3265 45.275 31.0341 46.2648 37.6113 46.2648C44.1885 46.2648 53.8961 45.275 53.8961 41.5566C53.8961 37.8382 49.3363 29.8442 37.6113 29.8442Z"
          fill="#3082FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_newusers">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(NewUsersIcon);
export default ForwardRef;
