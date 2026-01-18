import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { clsx } from 'clsx';
import { CheckIcon } from '../icon';
import { checkboxRoot, checkboxIndicator } from './Checkbox.css';

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  className?: string;
}

function Checkbox(
  { className, ...props }: CheckboxProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(checkboxRoot, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={checkboxIndicator}>
        <CheckIcon size={16} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

const ForwardRef = forwardRef(Checkbox);
export { ForwardRef as Checkbox };
