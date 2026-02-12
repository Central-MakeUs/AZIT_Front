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
