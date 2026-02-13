export const formatPrice = (price: number) =>
  `${price.toLocaleString('ko-KR')}원`;

export const formatJoinDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatExpectedShippingDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  return `${month}월 ${day}일 (${weekday}) 이내 판매자 발송 예정`;
};
