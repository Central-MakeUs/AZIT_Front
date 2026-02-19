interface NaverMapsReverseGeocodeAddress {
  roadAddress?: string;
  jibunAddress: string;
}

interface NaverMapsReverseGeocodeResponseV2 {
  address: NaverMapsReverseGeocodeAddress;
  results?: unknown[];
}

interface NaverMapsService {
  Status: { OK: string };
  OrderType: { ADDR: string; ROAD_ADDR: string };
  reverseGeocode: (
    options: {
      coords: { _lat: number; _lng: number };
      orders: string;
    },
    callback: (
      status: string,
      response: { v2: NaverMapsReverseGeocodeResponseV2 }
    ) => void
  ) => void;
}

interface NaverMapsLatLng {
  _lat: number;
  _lng: number;
}

interface NaverMaps {
  maps: {
    LatLng: new (lat: number, lng: number) => NaverMapsLatLng;
    Service: NaverMapsService;
  };
}

declare global {
  interface Window {
    naver?: NaverMaps;
  }
}

export {};
