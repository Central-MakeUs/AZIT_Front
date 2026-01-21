import { useEffect, useState, type ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './BottomSheet.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  onOutsideClick?: () => void;
  children: ReactNode;
}

type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

export function BottomSheet({
  isOpen,
  onClose,
  onOutsideClick,
  children,
}: BottomSheetProps) {
  const [animationState, setAnimationState] = useState<AnimationState>(
    isOpen ? 'entered' : 'exited'
  );
  const [shouldRender, setShouldRender] = useState(isOpen);

  const handleClose = useCallback(() => {
    onClose?.();
    onOutsideClick?.();
  }, [onClose, onOutsideClick]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationState('entering');
      const timer = setTimeout(() => setAnimationState('entered'), 300);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setAnimationState('exiting');
      const timer = setTimeout(() => {
        setAnimationState('exited');
        setShouldRender(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      handleClose();
    },
    [handleClose]
  );

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={styles.overlay({ state: animationState })}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.container({ state: animationState })}
        onClick={handleContainerClick}
      >
        <div className={styles.dragHandle} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
