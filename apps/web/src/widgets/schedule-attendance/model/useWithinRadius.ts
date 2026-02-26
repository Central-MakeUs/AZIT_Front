import { useEffect, useRef, useState } from 'react';

import { bridge } from '@/shared/lib/bridge';
import { getDistanceInMeters } from '@/shared/lib/geo';
import { toastError } from '@/shared/ui/toast';

const POLL_INTERVAL_MS = 60_000;

export const useWithinRadius = (
  latitude: number | undefined,
  longitude: number | undefined,
  shouldPollByMinute = false
) => {
  const ACTIVATION_RADIUS_METERS = 100;

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const hasScheduleLocation =
    typeof latitude === 'number' && typeof longitude === 'number';

  const shouldPoll = hasScheduleLocation && shouldPollByMinute;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!hasScheduleLocation) return;

    const fetchPosition = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        if (typeof bridge.getCurrentPosition === 'function') {
          const coords = await bridge.getCurrentPosition();
          setUserPosition({ lat: coords.latitude, lng: coords.longitude });
        }
      } catch {
        toastError('위치 정보를 가져오지 못했어요. 권한을 확인해주세요.');
      } finally {
        isFetchingRef.current = false;
      }
    };

    if (shouldPoll) {
      fetchPosition();
      intervalRef.current = setInterval(fetchPosition, POLL_INTERVAL_MS);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }

    fetchPosition();
  }, [hasScheduleLocation, shouldPoll, latitude, longitude]);

  const isWithinRadius =
    hasScheduleLocation &&
    userPosition &&
    getDistanceInMeters(
      userPosition.lat,
      userPosition.lng,
      latitude,
      longitude
    ) <= ACTIVATION_RADIUS_METERS;

  return { isWithinRadius, userPosition };
};
