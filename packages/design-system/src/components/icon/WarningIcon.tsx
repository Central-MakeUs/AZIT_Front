import { forwardRef } from 'react';
import type { Ref } from 'react';

interface WarningIconProps {
  size?: number;
  className?: string;
}

function WarningIcon(
  { size = 24, className, ...props }: WarningIconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_warningicon)">
        <path
          d="M26.7644 10.6114L4.50044 49.1746C2.17244 53.2066 5.08284 58.2466 9.73884 58.2466H54.2684C58.9244 58.2466 61.8332 53.2066 59.5068 49.1746L37.2412 10.6114C34.9132 6.5794 29.0924 6.5794 26.7644 10.6114Z"
          fill="#D1F801"
        />
        <path
          d="M31.9976 44.0781C30.3272 44.0781 28.9736 45.4317 28.9736 47.1021C28.9736 48.7725 30.3272 50.1261 31.9976 50.1261C33.668 50.1261 35.0216 48.7725 35.0216 47.1021C35.0216 45.4317 33.668 44.0781 31.9976 44.0781Z"
          fill="#0054D4"
        />
        <path
          d="M31.996 40.1262C30.5816 40.1262 29.436 38.9806 29.436 37.5662V24.9662C29.436 23.5518 30.5816 22.4062 31.996 22.4062C33.4104 22.4062 34.556 23.5518 34.556 24.9662V37.5662C34.556 38.9806 33.4104 40.1262 31.996 40.1262Z"
          fill="#0054D4"
        />
      </g>
      <defs>
        <clipPath id="clip0_warningicon">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(WarningIcon);
export default ForwardRef;
