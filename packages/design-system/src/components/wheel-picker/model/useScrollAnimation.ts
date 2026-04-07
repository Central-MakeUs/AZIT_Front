import { useRef, useCallback, useEffect } from 'react';

export const ITEM_HEIGHT = 44;

interface UseScrollAnimationOptions {
  itemCount: number;
  loop: boolean;
  padCount: number;
  onSnap: (index: number) => void;
  selectedClassName: string;
}

export function useScrollAnimation({
  itemCount,
  loop,
  padCount,
  onSnap,
  selectedClassName,
}: UseScrollAnimationOptions) {
  const listRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const activeIndexRef = useRef<number>(-1);

  const applyTransform = useCallback((offset: number) => {
    if (!listRef.current) return;
    listRef.current.style.transform = `translateY(-${offset}px)`;
  }, []);

  const calcActiveIndex = useCallback(
    (offset: number): number => {
      const idx = Math.round(offset / ITEM_HEIGHT);
      if (loop) return ((idx % itemCount) + itemCount) % itemCount;
      return Math.max(0, Math.min(itemCount - 1, idx));
    },
    [loop, itemCount]
  );

  // DOM에서 selected 클래스 직접 토글 -> onPointerMove에서 리액트 리렌더링 비용 제거
  const updateSelectedClass = useCallback(
    (newIndex: number) => {
      if (!listRef.current || newIndex === activeIndexRef.current) return;
      activeIndexRef.current = newIndex;

      const children = listRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const itemIndex = parseInt(el.dataset.realIndex ?? '-1', 10);
        const isGhost = el.dataset.ghost === 'true';
        if (itemIndex === newIndex && !isGhost) {
          el.classList.add(selectedClassName);
        } else {
          el.classList.remove(selectedClassName);
        }
      }
    },
    [selectedClassName]
  );

  const clampOffset = useCallback(
    (offset: number): number => {
      if (loop) return offset;
      const min = 0;
      const max = (itemCount - 1) * ITEM_HEIGHT;
      return Math.max(min, Math.min(max, offset));
    },
    [loop, itemCount]
  );

  const snapToNearest = useCallback(
    (offset: number): number => {
      const idx = Math.round(offset / ITEM_HEIGHT);
      if (loop) return ((idx % itemCount) + itemCount) % itemCount;
      return Math.max(0, Math.min(itemCount - 1, idx));
    },
    [loop, itemCount]
  );

  const cancelAnimation = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // 느린 드래그 (목표가 정해짐)
  const scrollTo = useCallback(
    (targetOffset: number, animate = true) => {
      cancelAnimation();

      if (!animate) {
        offsetRef.current = targetOffset;
        applyTransform(targetOffset);
        updateSelectedClass(calcActiveIndex(targetOffset));
        return;
      }

      // 매 프레임마다 이동 처리 (ease out 효과)
      const tick = () => {
        const delta = targetOffset - offsetRef.current;
        if (Math.abs(delta) < 0.5) {
          offsetRef.current = targetOffset;
          applyTransform(targetOffset);
          updateSelectedClass(calcActiveIndex(targetOffset));
          rafIdRef.current = null;
          return;
        }
        offsetRef.current += delta * 0.18;
        applyTransform(offsetRef.current);
        updateSelectedClass(calcActiveIndex(offsetRef.current));
        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
    },
    [cancelAnimation, applyTransform, updateSelectedClass, calcActiveIndex]
  );

  // 빠른 드래그 (속도 중심)
  const startFlick = useCallback(
    (initialVelocity: number) => {
      cancelAnimation();

      let velocity = initialVelocity;
      const totalHeight = itemCount * ITEM_HEIGHT;

      const tick = () => {
        // 감속 속도 줄임 비율
        velocity *= 0.92;
        let newOffset = offsetRef.current + velocity;

        if (loop) {
          if (newOffset < 0) {
            newOffset += totalHeight;
          } else if (newOffset >= totalHeight) {
            newOffset -= totalHeight;
          }
        } else {
          newOffset = clampOffset(newOffset);
        }

        offsetRef.current = newOffset;
        applyTransform(newOffset);
        updateSelectedClass(calcActiveIndex(newOffset));

        if (Math.abs(velocity) < 0.5) {
          rafIdRef.current = null;
          const snappedIndex = snapToNearest(newOffset);
          const snappedOffset = snappedIndex * ITEM_HEIGHT;
          onSnap(snappedIndex);
          scrollTo(snappedOffset, true);
          return;
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
    },
    [
      cancelAnimation,
      loop,
      itemCount,
      padCount,
      clampOffset,
      applyTransform,
      updateSelectedClass,
      calcActiveIndex,
      snapToNearest,
      scrollTo,
      onSnap,
    ]
  );

  // 언마운트 시 진행 중인 RAF 취소
  useEffect(() => () => cancelAnimation(), [cancelAnimation]);

  return {
    listRef,
    offsetRef,
    activeIndexRef,
    cancelAnimation,
    scrollTo,
    startFlick,
    snapToNearest,
    clampOffset,
    calcActiveIndex,
    updateSelectedClass,
  };
}
