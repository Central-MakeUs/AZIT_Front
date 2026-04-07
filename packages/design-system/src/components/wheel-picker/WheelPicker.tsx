import clsx from 'clsx';
import type { WheelPickerProps } from './model/types';
import { useWheelPicker } from './model/useWheelPicker';
import { ITEM_HEIGHT } from './model/useScrollAnimation';
import {
  container,
  containerDisabled,
  list,
  item,
  itemSelected,
  gradientTop,
  gradientBottom,
  selectionIndicator,
} from './WheelPicker.css';

export function WheelPicker({
  items,
  value,
  defaultValue,
  onChange,
  visibleCount = 5,
  loop = false,
  disabled = false,
}: WheelPickerProps) {
  const padCount = Math.floor(visibleCount / 2);
  const { containerRef, listRef, renderedItems, handlers } = useWheelPicker({
    items,
    value,
    defaultValue,
    onChange,
    visibleCount,
    loop,
    disabled,
    selectedClassName: itemSelected,
  });

  return (
    <div
      ref={containerRef}
      className={clsx(container, disabled && containerDisabled)}
      style={{ height: `${ITEM_HEIGHT * visibleCount}px` }}
      role="listbox"
      aria-orientation="vertical"
      tabIndex={disabled ? -1 : 0}
      {...handlers}
    >
      <div ref={listRef} className={list}>
        {!loop &&
          Array.from({ length: padCount }).map((_, i) => (
            <div
              key={`spacer-top-${i}`}
              className={item}
              aria-hidden
              data-ghost="true"
            />
          ))}
        {renderedItems.map(({ item: pickerItem, realIndex, isGhost }, i) => (
          <div
            key={`${isGhost ? 'ghost' : 'real'}-${i}`}
            className={item}
            data-real-index={String(realIndex)}
            data-ghost={isGhost ? 'true' : 'false'}
            role="option"
            id={isGhost ? undefined : `wheel-picker-item-${realIndex}`}
            aria-selected={false}
            aria-hidden={isGhost ? true : undefined}
          >
            {pickerItem.label}
          </div>
        ))}
        {!loop &&
          Array.from({ length: padCount }).map((_, i) => (
            <div
              key={`spacer-bottom-${i}`}
              className={item}
              aria-hidden
              data-ghost="true"
            />
          ))}
      </div>
      <div className={gradientTop} aria-hidden />
      <div className={gradientBottom} aria-hidden />
      <div className={selectionIndicator} aria-hidden />
    </div>
  );
}

export type { WheelPickerItem, WheelPickerProps } from './model/types';
