import { bridge } from '@/shared/lib/bridge';
import { getDistanceInMeters } from '@/shared/lib/geo';
import { toastError } from '@/shared/ui/toast';

export type UserPosition = {
  lat: number;
  lng: number;
};

export const ACTIVATION_RADIUS_METERS = 1000;
export const POLL_INTERVAL_MS = 60_000;

export type FetchUserPositionOptions = {
  showErrorToast?: boolean;
};

export const fetchUserPosition = async (
  options?: FetchUserPositionOptions
): Promise<UserPosition | null> => {
  const showErrorToast = options?.showErrorToast ?? false;

  try {
    const getPosition = bridge.getCurrentPosition;
    if (typeof getPosition !== 'function') {
      return null;
    }

    const coords = await getPosition();

    return { lat: coords.latitude, lng: coords.longitude };
  } catch {
    if (showErrorToast) {
      toastError('위치 정보를 가져오지 못했어요. 권한을 확인해주세요.');
    }
    return null;
  }
};

export const isWithinActivationRadius = (
  userPosition: UserPosition | null,
  latitude: number | undefined,
  longitude: number | undefined,
  activationRadiusMeters = ACTIVATION_RADIUS_METERS
): boolean => {
  const hasScheduleLocation =
    typeof latitude === 'number' && typeof longitude === 'number';

  if (!hasScheduleLocation || !userPosition) {
    return false;
  }

  const distance = getDistanceInMeters(
    userPosition.lat,
    userPosition.lng,
    latitude,
    longitude
  );

  return distance <= activationRadiusMeters;
};
