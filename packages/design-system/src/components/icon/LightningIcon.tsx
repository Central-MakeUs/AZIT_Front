import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function LightningIcon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <g clipPath="url(#clip0_lightning)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.5106 9.57466H14.1204L15.3498 2.88466C15.5508 1.78966 14.1642 1.14346 13.455 2.00206L4.65663 12.6587C4.07523 13.3631 4.57623 14.4263 5.48943 14.4263H9.87963L8.65023 21.1163C8.44923 22.2113 9.83583 22.8575 10.545 21.9989L19.3434 11.3423C19.9248 10.6379 19.4238 9.57466 18.5106 9.57466Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_lightning">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(LightningIcon);
export default ForwardRef;
