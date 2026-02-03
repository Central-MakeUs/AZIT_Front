export const REGION_OPTIONS = [
  { id: 'SEOUL', label: '서울' },
  { id: 'GYEONGGI_INCHEON', label: '경기/인천' },
  { id: 'CHUNGCHEONG_DAEJEON', label: '충청/대전' },
  { id: 'JEOLLA_GWANGJU', label: '전라/광주' },
  { id: 'GYEONGBUK_DAEGU', label: '경북/대구' },
  { id: 'GYEONGNAM_BUSAN', label: '경남/부산' },
  { id: 'GANGWON', label: '강원' },
  { id: 'JEJU', label: '제주' },
] as const;

export type RegionIdType = (typeof REGION_OPTIONS)[number]['id'];
