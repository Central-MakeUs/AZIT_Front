import { useEffect, useState } from 'react';

import { bridge } from '@/shared/lib/bridge';
import { getDistanceInMeters } from '@/shared/lib/geo';
import { toastError } from '@/shared/ui/toast';

export const useWithinRadius = (latitude: number, longitude: number) => {
  const ACTIVATION_RADIUS_METERS = 100;

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const scheduleLat = latitude;
  const scheduleLng = longitude;
  const hasScheduleLocation =
    typeof scheduleLat === 'number' && typeof scheduleLng === 'number';

  useEffect(() => {
    if (!hasScheduleLocation) return;

    const fetchPosition = async () => {
      try {
        if (typeof bridge.getCurrentPosition === 'function') {
          const coords = await bridge.getCurrentPosition();
          setUserPosition({ lat: coords.latitude, lng: coords.longitude });
          return;
        }
      } catch {
        toastError('위치 정보를 가져오지 못했어요. 권한을 확인해주세요.');
      }
    };

    fetchPosition();
  }, [hasScheduleLocation]);

  const isWithinRadius =
    hasScheduleLocation &&
    userPosition &&
    getDistanceInMeters(
      userPosition.lat,
      userPosition.lng,
      scheduleLat as number,
      scheduleLng as number
    ) <= ACTIVATION_RADIUS_METERS;

  return { isWithinRadius, userPosition };
};
