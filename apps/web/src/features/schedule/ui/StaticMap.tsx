const BASE_MAP_URL = 'https://maps.apigw.ntruss.com/map-static/v2/raster-cors';
const NCP_MAP_CLIENT_ID = import.meta.env.VITE_NCP_MAP_CLIENT_ID;

function getStaticMapUrl(lat: number, lng: number) {
  const center = `${lng},${lat}`;
  const params = `w=335&h=160&center=${center}&level=14&X-NCP-APIGW-API-KEY-ID=${NCP_MAP_CLIENT_ID}`;
  const url = `${BASE_MAP_URL}?${params.toString()}`;

  return url;
}

export function StaticMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <img
      src={getStaticMapUrl(latitude, longitude)}
      alt="Static Map"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
