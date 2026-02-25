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
        toastError(
          '위치 정보를 가져오는데 실패했어요.\n설정에서 위치 권한 허용 여부를 확인해주세요.'
        );
      }
      if (!navigator?.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => setUserPosition(null),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
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

  return isWithinRadius;
};
