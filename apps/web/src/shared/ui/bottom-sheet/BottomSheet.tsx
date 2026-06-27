import clsx from 'clsx';
import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';

import * as styles from '@/shared/ui/bottom-sheet/BottomSheet.css';
import { useBottomSheetDrag } from '@/shared/ui/bottom-sheet/useBottomSheetDrag';

interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onOutsideClick?: () => void;
  children: ReactNode;
  contentClassName?: string;
}

type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

export function BottomSheet({
  isOpen,
  onClose,
  onOutsideClick,
  children,
  contentClassName,
}: BottomSheetProps) {
  const [animationState, setAnimationState] = useState<AnimationState>(
    isOpen ? 'entered' : 'exited'
  );
  const [shouldRender, setShouldRender] = useState(isOpen);

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isDismissingByDragRef = useRef(false);
  const inProgressAnimationRef = useRef<{ stop: () => void } | null>(null);
  const canDragRef = useRef(animationState === 'entered');

  useEffect(() => {
    canDragRef.current = animationState === 'entered';
  }, [animationState]);

  const handleClose = useCallback(() => {
    onClose?.();
    onOutsideClick?.();
  }, [onClose, onOutsideClick]);

  useEffect(() => {
    if (isOpen) {
      inProgressAnimationRef.current?.stop();
      isDismissingByDragRef.current = false;

      setShouldRender(true);
      setAnimationState('entering');
      const timer = setTimeout(() => setAnimationState('entered'), 300);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      if (isDismissingByDragRef.current) {
        setAnimationState('exited');
        setShouldRender(false);
        document.body.style.overflow = '';
        return;
      }
      setAnimationState('exiting');
      const timer = setTimeout(() => {
        setAnimationState('exited');
        setShouldRender(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const { isDraggingRef, dragHandleProps } = useBottomSheetDrag({
    drawerRef,
    overlayRef,
    canDragRef,
    onDismiss: handleClose,
    isDismissingByDragRef,
    inProgressAnimationRef,
  });

  const handleOverlayClick = useCallback(
    (_e: React.MouseEvent) => {
      if (isDraggingRef.current) return;
      handleClose();
    },
    [handleClose, isDraggingRef]
  );

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!shouldRender) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay({ state: animationState })}
      onClick={handleOverlayClick}
    >
      <div
        ref={drawerRef}
        className={styles.container({ state: animationState })}
        onClick={handleContainerClick}
      >
        <div {...dragHandleProps} className={styles.dragHandleArea}>
          <div className={styles.dragHandle} />
        </div>
        <div className={clsx(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
