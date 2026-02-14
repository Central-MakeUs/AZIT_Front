const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const formatOrderDate = (dateString: string | undefined) => {
  if (!dateString) return { orderDate: '', orderDayOfWeek: '' };
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const orderDate = `${year}.${month}.${day}`;
    const orderDayOfWeek = WEEKDAYS[date.getDay()];
    return { orderDate, orderDayOfWeek };
  } catch {
    return { orderDate: dateString, orderDayOfWeek: '' };
  }
};

export const formatOrderDateLabel = (
  dateString: string | undefined
): string => {
  const { orderDate, orderDayOfWeek } = formatOrderDate(dateString);
  if (!orderDate && !orderDayOfWeek) return '';
  return orderDayOfWeek ? `${orderDate}(${orderDayOfWeek})` : orderDate;
};

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
