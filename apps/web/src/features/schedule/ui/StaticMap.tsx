import { useCallback, useState } from 'react';

import { bridge } from '@/shared/lib/bridge';
import { reverseGeocode } from '@/shared/lib/naverGeocoding';

const NCP_MAP_CLIENT_ID = import.meta.env.VITE_NCP_MAP_CLIENT_ID;

function getStaticMapUrl(lat: number, lng: number) {
  const center = `${lng},${lat}`;
  const params = `w=335&h=160&center=${center}&level=14&X-NCP-APIGW-API-KEY-ID=${NCP_MAP_CLIENT_ID}`;
  const url = `https://maps.apigw.ntruss.com/map-static/v2/raster-cors?${params.toString()}`;

  return url;
}

function getNaverMapUrlByAddress(address: string) {
  const isAzitWebview = navigator.userAgent
    .toLowerCase()
    .includes('azitwebview');
  if (isAzitWebview) {
    return `intent://place?query=${encodeURIComponent(address)}`;
  }
  return `https://map.naver.com/?query=${encodeURIComponent(address)}`;
}

export function StaticMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMapClick = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const address = await reverseGeocode(latitude, longitude);

      const isAzitWebview = navigator.userAgent
        .toLowerCase()
        .includes('azitwebview');
      if (isAzitWebview) {
        await bridge.openNaverMap(address, latitude, longitude);
      } else {
        window.open(getNaverMapUrlByAddress(address), '_blank');
      }
    } catch {
      console.error('주소 변환에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude, isLoading]);

  return (
    <div onClick={handleMapClick} role="button" tabIndex={0}>
      <img
        src={getStaticMapUrl(latitude, longitude)}
        alt="Static Map"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
