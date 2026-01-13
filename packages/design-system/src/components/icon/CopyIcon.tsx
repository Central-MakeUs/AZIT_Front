import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './icon.css';
import type { IconProps } from './types';

function CopyIcon(
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
      <path
        d="M8 8V6C8 4.895 8.895 4 10 4H18C19.105 4 20 4.895 20 6V14C20 15.105 19.105 16 18 16H16M8 8H6C4.895 8 4 8.895 4 10V18C4 19.105 4.895 20 6 20H14C15.105 20 16 19.105 16 18V16M8 8H10C11.105 8 12 8.895 12 10V14C12 15.105 11.105 16 10 16H8V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(CopyIcon);
export default ForwardRef;
