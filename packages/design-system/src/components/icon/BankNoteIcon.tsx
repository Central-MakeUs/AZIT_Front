import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './icon.css';
import type { IconProps } from './types';

function BankNoteIcon(
  { size = 24, color, className, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ref={ref}
      className={clsx(iconVariant({ color }), className)}
      {...props}
    >
      <path
        d="M13 5H10.5C9.67157 5 9 5.67157 9 6.5C9 7.32843 9.67157 8 10.5 8H11.5C12.3284 8 13 8.67157 13 9.5C13 10.3284 12.3284 11 11.5 11H9M11 4V5M11 11V12M17 8H17.01M5 8H5.01M1 4.2L1 11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.07989 15 4.2 15L17.8 15C18.9201 15 19.4802 15 19.908 14.782C20.2843 14.5903 20.5903 14.2843 20.782 13.908C21 13.4802 21 12.9201 21 11.8V4.2C21 3.0799 21 2.51984 20.782 2.09202C20.5903 1.7157 20.2843 1.40974 19.908 1.21799C19.4802 1 18.9201 1 17.8 1L4.2 1C3.0799 1 2.51984 1 2.09202 1.21799C1.7157 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2ZM17.5 8C17.5 8.27614 17.2761 8.5 17 8.5C16.7239 8.5 16.5 8.27614 16.5 8C16.5 7.72386 16.7239 7.5 17 7.5C17.2761 7.5 17.5 7.72386 17.5 8ZM5.5 8C5.5 8.27614 5.27614 8.5 5 8.5C4.72386 8.5 4.5 8.27614 4.5 8C4.5 7.72386 4.72386 7.5 5 7.5C5.27614 7.5 5.5 7.72386 5.5 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(BankNoteIcon);
export default ForwardRef;
