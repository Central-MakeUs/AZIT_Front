import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

export function StaticMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const staticMapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      new window.kakao.maps.StaticMap(containerRef.current, staticMapOption);
    });
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
