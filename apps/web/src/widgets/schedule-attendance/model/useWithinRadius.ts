import { useEffect, useState } from 'react';

import { getDistanceInMeters } from '@/shared/lib/geo';

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
    if (!hasScheduleLocation || !navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setUserPosition(null);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
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
