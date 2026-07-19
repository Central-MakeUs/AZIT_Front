import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function PlaneIcon(
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
      <g clipPath="url(#clip0_plane)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.37422 4.64594L19.7598 6.92194L13.819 12.8627L3.30782 7.34434C2.90862 7.13474 2.82702 6.59794 3.14622 6.27954L4.03582 5.39074C4.64862 4.77794 5.51982 4.50034 6.37422 4.64594Z"
          fill="#93C9FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.0767 12.2381L27.3543 25.6237C27.4999 26.4789 27.2215 27.3509 26.6087 27.9637L25.7199 28.8517C25.4007 29.1701 24.8647 29.0885 24.6551 28.6893L19.1375 18.1781L25.0767 12.2381Z"
          fill="#93C9FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.9902 8.32697L15.0454 22.2718V25.879C15.0454 26.5886 14.7638 27.2686 14.2622 27.7702L12.2286 29.8038C11.839 30.1934 11.1718 29.971 11.0942 29.4254L10.0998 22.4678C10.0574 22.1734 9.82697 21.9422 9.53257 21.9006L2.57497 20.9062C2.02937 20.8286 1.80697 20.1614 2.19657 19.7718L4.23017 17.739C4.73177 17.2374 5.41177 16.9558 6.12057 16.9558H9.72777L23.6726 3.01097C25.1542 1.62857 27.4646 1.66857 28.8974 3.10217C30.331 4.53417 30.3718 6.84457 28.9902 8.32697Z"
          fill="#C8E1FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_plane">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(PlaneIcon);
export default ForwardRef;
