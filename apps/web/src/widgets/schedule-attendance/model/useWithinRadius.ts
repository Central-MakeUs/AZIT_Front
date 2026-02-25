import { useEffect, useState } from 'react';

import { bridge } from '@/shared/lib/bridge';
import { getDistanceInMeters } from '@/shared/lib/geo';
import { toastError } from '@/shared/ui/toast';

export const useWithinRadius = (
  latitude: number | undefined,
  longitude: number | undefined
) => {
  const ACTIVATION_RADIUS_METERS = 100;

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const hasScheduleLocation =
    typeof latitude === 'number' && typeof longitude === 'number';

  useEffect(() => {
    if (!hasScheduleLocation) return;

    const fetchPosition = async () => {
      try {
        if (typeof bridge.getCurrentPosition === 'function') {
          const coords = await bridge.getCurrentPosition();
          setUserPosition({ lat: coords.latitude, lng: coords.longitude });
        }
      } catch {
        toastError('위치 정보를 가져오지 못했어요. 권한을 확인해주세요.');
      }
    };

    fetchPosition();
  }, [hasScheduleLocation, latitude, longitude]);

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
