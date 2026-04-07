import { useState, useEffect, useRef, useCallback } from 'react';
import type { WheelPickerItem } from './types';
import { useScrollAnimation, ITEM_HEIGHT } from './useScrollAnimation';

interface UseWheelPickerProps {
  items: WheelPickerItem[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  visibleCount: number;
  loop: boolean;
  disabled: boolean;
  selectedClassName: string;
}

export function useWheelPicker({
  items,
  value,
  defaultValue,
  onChange,
  visibleCount,
  loop,
  disabled,
  selectedClassName,
}: UseWheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const padCount = Math.floor(visibleCount / 2);

  // Controlled/Uncontrolled 상태 관리
  const isControlled = value !== undefined;
  const [internalIndex, setInternalIndex] = useState<number>(() => {
    const initial = defaultValue ?? items[0]?.value;
    const idx = items.findIndex((item) => item.value === initial);
    return Math.max(0, idx);
  });

  const selectedIndex = isControlled
    ? Math.max(
        0,
        items.findIndex((item) => item.value === value)
      )
    : internalIndex;

  const handleSnap = useCallback(
    (index: number) => {
      if (!isControlled) {
        setInternalIndex(index);
      }
      onChange?.(items[index]?.value ?? items[0].value);
    },
    [isControlled, items, onChange]
  );

  const {
    listRef,
    offsetRef,
    cancelAnimation,
    scrollTo,
    startFlick,
    snapToNearest,
    clampOffset,
    calcActiveIndex,
    updateSelectedClass,
  } = useScrollAnimation({
    itemCount: items.length,
    loop,
    padCount,
    onSnap: handleSnap,
    selectedClassName,
  });

  const getTargetOffset = useCallback(
    (index: number) => index * ITEM_HEIGHT,
    []
  );

  // 마운트 시 초기 위치로 즉시 이동 (애니메이션 없음)
  useEffect(() => {
    scrollTo(getTargetOffset(selectedIndex), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // controlled: 외부 value 변경 시 애니메이션으로 이동
  useEffect(() => {
    if (!isControlled) return;
    const idx = items.findIndex((item) => item.value === value);
    if (idx !== -1) {
      scrollTo(getTargetOffset(idx), true);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // 포인터 이벤트 처리
  const pointerStateRef = useRef<{
    startY: number;
    lastY: number;
    startOffset: number;
    lastTimestamp: number;
    velocitySamples: number[];
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      cancelAnimation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      pointerStateRef.current = {
        startY: e.clientY,
        lastY: e.clientY,
        startOffset: offsetRef.current,
        lastTimestamp: e.timeStamp,
        velocitySamples: [],
      };
    },
    [disabled, cancelAnimation, offsetRef]
  );

  const finishDrag = useCallback(() => {
    const state = pointerStateRef.current;
    if (!state) return;
    pointerStateRef.current = null;

    const samples = state.velocitySamples;
    const avgVelocity =
      samples.length > 0
        ? samples.reduce((sum, v) => sum + v, 0) / samples.length
        : 0;

    const flickVelocity = -avgVelocity * 15;

    if (Math.abs(flickVelocity) < 2) {
      const snappedIndex = snapToNearest(offsetRef.current);
      handleSnap(snappedIndex);
      scrollTo(getTargetOffset(snappedIndex), true);
    } else {
      startFlick(flickVelocity);
    }
  }, [
    snapToNearest,
    handleSnap,
    scrollTo,
    startFlick,
    getTargetOffset,
    offsetRef,
  ]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const state = pointerStateRef.current;
      if (!state) return;

      const dy = e.clientY - state.lastY;
      const dt = e.timeStamp - state.lastTimestamp;
      const instantVelocity = dy / Math.max(dt, 1);

      state.velocitySamples.push(instantVelocity);
      if (state.velocitySamples.length > 5) state.velocitySamples.shift();
      state.lastY = e.clientY;
      state.lastTimestamp = e.timeStamp;

      const rawOffset = state.startOffset - (e.clientY - state.startY);
      const newOffset = loop ? rawOffset : clampOffset(rawOffset);
      offsetRef.current = newOffset;

      if (listRef.current) {
        listRef.current.style.transform = `translateY(-${newOffset}px)`;
      }
      updateSelectedClass(calcActiveIndex(newOffset));
    },
    [
      loop,
      clampOffset,
      offsetRef,
      listRef,
      updateSelectedClass,
      calcActiveIndex,
    ]
  );

  // pointerup, 영역 밖 드래그 종료 모두 lostpointercapture로 처리
  const onPointerCancel = useCallback(() => {
    pointerStateRef.current = null;
  }, []);
  const onLostPointerCapture = useCallback(() => finishDrag(), [finishDrag]);

  // 키보드 탐색
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newIndex: number | null = null;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newIndex = loop
            ? (selectedIndex - 1 + items.length) % items.length
            : Math.max(0, selectedIndex - 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = loop
            ? (selectedIndex + 1) % items.length
            : Math.min(items.length - 1, selectedIndex + 1);
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = items.length - 1;
          break;
      }

      if (newIndex !== null) {
        handleSnap(newIndex);
        scrollTo(getTargetOffset(newIndex), true);
      }
    },
    [
      disabled,
      loop,
      selectedIndex,
      items.length,
      handleSnap,
      scrollTo,
      getTargetOffset,
    ]
  );

  // 렌더링할 아이템 목록 (loop 모드일 때 ghost 포함)
  const renderedItems = loop
    ? [
        ...items.slice(-padCount).map((item, i) => ({
          item,
          realIndex: items.length - padCount + i,
          isGhost: true,
        })),
        ...items.map((item, i) => ({ item, realIndex: i, isGhost: false })),
        ...items.slice(0, padCount).map((item, i) => ({
          item,
          realIndex: i,
          isGhost: true,
        })),
      ]
    : items.map((item, i) => ({ item, realIndex: i, isGhost: false }));

  return {
    containerRef,
    listRef,
    selectedIndex,
    renderedItems,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerCancel,
      onLostPointerCapture,
      onKeyDown,
    },
  };
}
