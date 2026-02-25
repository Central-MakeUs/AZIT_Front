import { useEffect, useRef } from 'react';

import { NAVER_MAP_MARKER_ICON_URL } from '@/shared/constants/url';

export type LatLng = { lat: number; lng: number };

export interface MarkerData {
  id: string;
  position: LatLng;
}

interface Props {
  center: LatLng;
  zoom?: number;
  onChangePosition?: (pos: LatLng) => void;
}

export function NaverMap({ center, zoom = 17, onChangePosition }: Props) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
    };

    const map = new naver.maps.Map(divRef.current, mapOptions);
    mapRef.current = map;

    const listener = naver.maps.Event.addListener(map, 'center_changed', () => {
      const c = map.getCenter();
      const nextCenter = { lat: c.y, lng: c.x };
      onChangePosition?.(nextCenter);
    });

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '1px solid #ddd',
      }}
    >
      <div ref={divRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          zIndex: 10,
        }}
      >
        <img src={NAVER_MAP_MARKER_ICON_URL} alt="marker" />
      </div>
    </div>
  );
}
