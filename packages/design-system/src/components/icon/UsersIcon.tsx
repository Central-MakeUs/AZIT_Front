import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './icon.css';
import type { IconProps } from './types';

function UsersIcon(
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
        d="M17 21V19C17 17.939 16.579 16.843 15.736 16.157C14.894 15.472 13.761 15 12.5 15C11.239 15 10.106 15.472 9.264 16.157C8.421 16.843 8 17.939 8 19V21M17 21H20M17 21H5M8 21H5M20 21V19C20 17.939 19.579 16.843 18.736 16.157M12.5 15C11.239 15 10.106 15.472 9.264 16.157C8.421 16.843 8 17.939 8 19V21M12.5 15C13.761 15 14.894 15.472 15.736 16.157M12.5 8C13.881 8 15 6.881 15 5.5C15 4.119 13.881 3 12.5 3C11.119 3 10 4.119 10 5.5C10 6.881 11.119 8 12.5 8ZM5 10C6.105 10 7 9.105 7 8C7 6.895 6.105 6 5 6C3.895 6 3 6.895 3 8C3 9.105 3.895 10 5 10ZM20 10C21.105 10 22 9.105 22 8C22 6.895 21.105 6 20 6C18.895 6 18 6.895 18 8C18 9.105 18.895 10 20 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = forwardRef(UsersIcon);
export default ForwardRef;
