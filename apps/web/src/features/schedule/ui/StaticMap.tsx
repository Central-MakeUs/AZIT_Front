import { useEffect, useRef } from 'react';

export function StaticMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const kakao = window.kakao;
    const maps = kakao?.maps;
    if (!maps) return;

    maps.load(() => {
      const staticMapOption = {
        center: new maps.LatLng(latitude, longitude),
        level: 3,
      };

      new maps.StaticMap(containerRef.current, staticMapOption);
    });
  }, [latitude, longitude]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
