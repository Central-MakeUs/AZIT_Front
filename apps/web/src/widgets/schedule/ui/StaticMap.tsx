import { useCallback } from 'react';

import { bridge } from '@/shared/lib/bridge';

const NCP_MAP_CLIENT_ID = import.meta.env.VITE_NCP_MAP_CLIENT_ID;

const isAzitWebview = navigator.userAgent.toLowerCase().includes('azitwebview');

const getStaticMapUrl = (lat: number, lng: number) => {
  const center = `${lng},${lat}`;
  const params = `w=335&h=160&center=${center}&level=14&X-NCP-APIGW-API-KEY-ID=${NCP_MAP_CLIENT_ID}`;
  const url = `https://maps.apigw.ntruss.com/map-static/v2/raster-cors?${params.toString()}`;

  return url;
};

const getNaverMapUrlByAddress = (address: string) => {
  if (isAzitWebview) {
    return `intent://place?query=${encodeURIComponent(address)}`;
  }
  return `https://map.naver.com/?query=${encodeURIComponent(address)}`;
};

export function StaticMap({
  address,
  latitude,
  longitude,
}: {
  address: string;
  latitude: number;
  longitude: number;
}) {
  const handleMapClick = useCallback(async () => {
    if (isAzitWebview) {
      await bridge.openNaverMap(address, latitude, longitude);
    } else {
      window.open(getNaverMapUrlByAddress(address), '_blank');
    }
  }, [address, latitude, longitude]);

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
