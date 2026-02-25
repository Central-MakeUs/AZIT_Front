import { useCallback, useEffect, useRef, useState } from 'react';

import { NAVER_MAP_MARKER_ICON_URL } from '@/shared/constants/url';
import { bridge } from '@/shared/lib/bridge';

const NCP_MAP_CLIENT_ID = import.meta.env.VITE_NCP_MAP_CLIENT_ID;

const isAzitWebview = navigator.userAgent.toLowerCase().includes('azitwebview');

const getStaticMapUrl = (
  lat: number,
  lng: number,
  width: number,
  height: number
) => {
  const center = `${lng},${lat}`;
  const markers = {
    type: 'e',
    pos: `${lng} ${lat}`,
    icon: NAVER_MAP_MARKER_ICON_URL,
    anchor: 'center',
  };
  const markersParams = Object.entries(markers)
    .map(([key, value]) => `${key}:${value}`)
    .join('|');

  const params = `w=${width}&h=${height}&center=${center}&level=17&markers=${markersParams}&X-NCP-APIGW-API-KEY-ID=${NCP_MAP_CLIENT_ID}`;

  return `https://maps.apigw.ntruss.com/map-static/v2/raster-cors?${params}`;
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
  const ref = useRef<HTMLDivElement>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(160 * dpr);

    setMapUrl(getStaticMapUrl(latitude, longitude, pixelWidth, pixelHeight));
  }, [latitude, longitude]);

  const handleMapClick = useCallback(async () => {
    if (isAzitWebview) {
      await bridge.openNaverMap(address, latitude, longitude);
    } else {
      window.open(getNaverMapUrlByAddress(address), '_blank');
    }
  }, [address, latitude, longitude]);

  return (
    <div ref={ref} onClick={handleMapClick} role="button" tabIndex={0}>
      {mapUrl && (
        <img
          src={mapUrl}
          alt="Static Map"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}
