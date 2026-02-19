function getNaverMaps(): Window['naver'] {
  return typeof window !== 'undefined' ? window.naver : undefined;
}

export function reverseGeocode(lat: number, lng: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const naver = getNaverMaps();

    if (!naver?.maps?.Service) {
      reject(new Error('네이버 지도 API를 사용할 수 없습니다.'));
      return;
    }

    const coords = new naver.maps.LatLng(lat, lng);
    naver.maps.Service.reverseGeocode(
      {
        coords,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (
        status: string,
        response: {
          v2: { address: { roadAddress?: string; jibunAddress?: string } };
        }
      ) => {
        if (status !== naver.maps.Service.Status.OK) {
          reject(new Error('주소 변환에 실패했습니다.'));
          return;
        }
        const address = response.v2?.address;
        if (!address) {
          reject(new Error('주소 정보를 찾을 수 없습니다.'));
          return;
        }
        const resolved = address.roadAddress || address.jibunAddress || '';
        resolve(resolved);
      }
    );
  });
}
