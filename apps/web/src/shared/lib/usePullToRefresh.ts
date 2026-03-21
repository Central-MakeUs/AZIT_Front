import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UsePullToRefreshOptions<T extends HTMLElement = HTMLElement> {
  scrollRef?: RefObject<T | null>;
  onRefresh: () => Promise<void> | void;
  enabled?: boolean;
  threshold?: number;
  maxPullDistance?: number;
  resistance?: number;
  preventDefault?: boolean;
  onError?: (error: unknown) => void;
}

export interface UsePullToRefreshResult<T extends HTMLElement = HTMLElement> {
  scrollRef: RefObject<T | null>;
  isRefreshing: boolean;
  pullDistance: number;
  pullProgress: number;
  cancel: () => void;
}

export function usePullToRefresh<T extends HTMLElement = HTMLElement>(
  options: UsePullToRefreshOptions<T>
): UsePullToRefreshResult<T> {
  const {
    scrollRef: externalScrollRef,
    onRefresh,
    enabled = true,
    threshold = 70,
    maxPullDistance = 140,
    resistance = 0.5,
    preventDefault = true,
    onError,
  } = options;

  const internalScrollRef = useRef<T | null>(null);
  const targetRef = (externalScrollRef ??
    internalScrollRef) as RefObject<T | null>;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [pullProgress, setPullProgress] = useState(0);

  const enabledRef = useRef(enabled);
  const onRefreshRef = useRef(onRefresh);
  const onErrorRef = useRef(onError);
  const optionsRef = useRef({
    threshold,
    maxPullDistance,
    resistance,
    preventDefault,
  });

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    optionsRef.current = {
      threshold,
      maxPullDistance,
      resistance,
      preventDefault,
    };
  }, [threshold, maxPullDistance, resistance, preventDefault]);

  const isRefreshingRef = useRef(false);
  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  const startPointRef = useRef<{ startY: number; startX: number } | null>(null);
  const trackingRef = useRef(false);
  const canTriggerRef = useRef(false);

  const rafIdRef = useRef<number | null>(null);
  const pendingPullRef = useRef({ distance: 0, progress: 0 });

  const commitPull = useCallback(() => {
    rafIdRef.current = null;
    setPullDistance(pendingPullRef.current.distance);
    setPullProgress(pendingPullRef.current.progress);
  }, []);

  const cancel = useCallback(() => {
    trackingRef.current = false;
    canTriggerRef.current = false;
    startPointRef.current = null;
    pendingPullRef.current = { distance: 0, progress: 0 };

    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    setPullDistance(0);
    setPullProgress(0);
  }, []);

  const triggerRefresh = useCallback(() => {
    if (isRefreshingRef.current) return;

    cancel();

    trackingRef.current = false;
    canTriggerRef.current = false;
    startPointRef.current = null;

    setIsRefreshing(true);
    isRefreshingRef.current = true;

    Promise.resolve(onRefreshRef.current())
      .catch((error) => {
        onErrorRef.current?.(error);
      })
      .finally(() => {
        setIsRefreshing(false);
        isRefreshingRef.current = false;
      });
  }, [cancel]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (!enabledRef.current) return;
      if (isRefreshingRef.current) return;
      if (e.touches.length !== 1) return;

      const scrollEl = targetRef.current;
      if (!scrollEl) return;

      if (scrollEl.scrollTop > 0) return;

      const touch = e.touches[0];
      startPointRef.current = {
        startY: touch.clientY,
        startX: touch.clientX,
      };
      trackingRef.current = true;
      canTriggerRef.current = false;
      pendingPullRef.current = { distance: 0, progress: 0 };
      setPullDistance(0);
      setPullProgress(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!trackingRef.current) return;
      if (e.touches.length !== 1) return;

      const scrollEl = targetRef.current;
      if (!scrollEl) return;

      if (scrollEl.scrollTop > 0) {
        cancel();
        return;
      }

      const startPoint = startPointRef.current;
      if (!startPoint) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - startPoint.startY;
      const deltaX = touch.clientX - startPoint.startX;

      if (deltaY <= 0) {
        pendingPullRef.current = { distance: 0, progress: 0 };
        if (rafIdRef.current == null) {
          rafIdRef.current = requestAnimationFrame(commitPull);
        }
        canTriggerRef.current = false;
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2) return;

      const { threshold, maxPullDistance, resistance, preventDefault } =
        optionsRef.current;

      const rawDistance = deltaY * resistance;
      const distance = Math.min(maxPullDistance, rawDistance);
      const progress = Math.min(1, distance / threshold);

      pendingPullRef.current = { distance, progress };
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(commitPull);
      }

      canTriggerRef.current = distance >= threshold;

      if (preventDefault && e.cancelable && distance > 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (!trackingRef.current) return;
      trackingRef.current = false;

      if (!enabledRef.current) {
        cancel();
        return;
      }

      if (canTriggerRef.current && !isRefreshingRef.current) {
        triggerRefresh();
        return;
      }
      cancel();
    };

    const handleTouchCancel = () => {
      if (!trackingRef.current) return;
      trackingRef.current = false;
      cancel();
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove as EventListener);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchCancel);

      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [targetRef, cancel, commitPull, triggerRefresh]);

  return {
    scrollRef: targetRef,
    isRefreshing,
    pullDistance,
    pullProgress,
    cancel,
  };
}
