import { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import { iconVariant } from './Icon.css';
import type { IconProps } from './types';

function PotatoIcon(
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
      <g clipPath="url(#clip0_potato)">
        <path
          d="M5.03417 27.1934L4.59417 26.7454C0.461366 22.5326 0.625367 15.7382 4.95737 11.7302L12.8206 4.45498C16.9766 0.610175 23.4366 0.766175 27.4022 4.80778C31.3678 8.84938 31.4006 15.311 27.4766 19.3934L20.0526 27.1166C15.963 31.371 9.16697 31.4062 5.03417 27.1934Z"
          fill="#DE9740"
        />
        <path
          d="M13.4777 20.961C13.8716 20.5671 13.0989 19.1556 11.7518 17.8085C10.4046 16.4613 8.99315 15.6886 8.59919 16.0826C8.20523 16.4765 8.97795 17.888 10.3251 19.2351C11.6723 20.5823 13.0837 21.355 13.4777 20.961Z"
          fill="#A36C29"
        />
        <path
          d="M21.7849 12.247C22.1001 11.9318 21.4819 10.8025 20.4041 9.72461C19.3262 8.64677 18.1969 8.02854 17.8817 8.34377C17.5665 8.65901 18.1847 9.78832 19.2625 10.8662C20.3404 11.944 21.4697 12.5622 21.7849 12.247Z"
          fill="#A36C29"
        />
        <path
          d="M18.9626 20.7166C19.3172 20.362 18.6217 19.0916 17.4092 17.8791C16.1967 16.6666 14.9263 15.9711 14.5717 16.3257C14.2171 16.6803 14.9126 17.9507 16.1251 19.1632C17.3376 20.3757 18.608 21.0712 18.9626 20.7166Z"
          fill="#A36C29"
        />
      </g>
      <defs>
        <clipPath id="clip0_potato">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = forwardRef(PotatoIcon);
export default ForwardRef;
