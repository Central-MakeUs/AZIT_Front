import { animate, type AnimationSequence } from 'motion';
import { useRef, useCallback } from 'react';

const DISMISS_DISTANCE_PX = 100;
const DISMISS_VELOCITY_PX_S = 500;

interface UseBottomSheetDragOptions {
  drawerRef: React.RefObject<HTMLDivElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  canDragRef: React.RefObject<boolean>;
  onDismiss: () => void;
  isDismissingByDragRef: { current: boolean };
  inProgressAnimationRef: { current: { stop: () => void } | null };
}

export function useBottomSheetDrag({
  drawerRef,
  overlayRef,
  canDragRef,
  onDismiss,
  isDismissingByDragRef,
  inProgressAnimationRef,
}: UseBottomSheetDragOptions) {
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentDyRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!canDragRef.current || !e.isPrimary) return;
      const drawer = drawerRef.current;
      if (!drawer) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      startYRef.current = e.clientY;
      startTimeRef.current = performance.now();
      currentDyRef.current = 0;

      drawer.style.willChange = 'transform';
      drawer.style.transition = 'none';
      if (overlayRef.current) overlayRef.current.style.willChange = 'opacity';
      document.body.style.userSelect = 'none';
    },
    [canDragRef, drawerRef, overlayRef]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !e.isPrimary) return;
      currentDyRef.current = Math.max(0, e.clientY - startYRef.current);

      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const drawer = drawerRef.current;
        const overlay = overlayRef.current;
        if (!drawer) return;

        const dy = currentDyRef.current;
        drawer.style.transform = `translateY(${dy}px)`;

        if (overlay) {
          const progress = Math.min(1, dy / (drawer.offsetHeight * 0.75));
          overlay.style.opacity = String(1 - progress * 0.6);
        }
      });
    },
    [drawerRef, overlayRef]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !e.isPrimary) return;
      isDraggingRef.current = false;
      document.body.style.userSelect = '';

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const drawer = drawerRef.current;
      const overlay = overlayRef.current;
      if (!drawer) return;

      const dy = currentDyRef.current;
      const elapsed = performance.now() - startTimeRef.current;
      const velocity = dy / (elapsed / 1000);
      const shouldDismiss =
        dy > DISMISS_DISTANCE_PX || velocity > DISMISS_VELOCITY_PX_S;

      if (shouldDismiss) {
        isDismissingByDragRef.current = true;
        const drawerHeight = drawer.offsetHeight;

        const sequence: AnimationSequence = [
          [
            drawer,
            { transform: `translateY(${drawerHeight}px)` },
            { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
          ],
        ];
        if (overlay) {
          sequence.push([overlay, { opacity: 0 }, { duration: 0.25, at: '<' }]);
        }
        const controls = animate(sequence);
        inProgressAnimationRef.current = controls;

        controls.then(() => {
          inProgressAnimationRef.current = null;
          document.body.style.overflow = '';
          onDismiss();
        });
      } else {
        const controls = animate(
          drawer,
          { transform: 'translateY(0px)' },
          { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
        );
        inProgressAnimationRef.current = controls;

        controls.then(() => {
          inProgressAnimationRef.current = null;
          drawer.style.transform = '';
          drawer.style.transition = '';
          drawer.style.willChange = '';
          if (overlay) {
            overlay.style.opacity = '';
            overlay.style.willChange = '';
          }
        });
      }
    },
    [
      drawerRef,
      overlayRef,
      onDismiss,
      isDismissingByDragRef,
      inProgressAnimationRef,
    ]
  );

  const handlePointerCancel = useCallback(
    (_e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      document.body.style.userSelect = '';

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const drawer = drawerRef.current;
      const overlay = overlayRef.current;
      if (!drawer) return;

      drawer.style.transform = '';
      drawer.style.transition = '';
      drawer.style.willChange = '';
      if (overlay) {
        overlay.style.opacity = '';
        overlay.style.willChange = '';
      }
    },
    [drawerRef, overlayRef]
  );

  return {
    isDraggingRef,
    dragHandleProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}
