import type { PaymentMethod } from '@/features/order/api/types';
import type { OrderStatus } from '@/features/order-detail/api/types';

export const PAYMENT_METHOD_MAP: Record<string, PaymentMethod> = {
  BANK_TRANSFER: {
    code: 'BANK_TRANSFER',
    description: '무통장 입금',
    isEnabled: true,
  },
};

export const DEFAULT_PAYMENT_METHOD: PaymentMethod =
  PAYMENT_METHOD_MAP.BANK_TRANSFER;

export const ORDER_STATUS_MAP: Record<OrderStatus, string> = {
  PENDING: '입금 확인 중',
  PAID: '결제 완료',
  PREPARING: '상품 준비 중',
  SHIPPING: '배송 중',
  DELIVERED: '배송 완료',
  PURCHASE_CONFIRMED: '구매 확정',
  CANCELLED: '주문 취소',
  EXPIRED: '주문 만료',
  PENDING_REFUNDED: '환불 대기',
  REFUNDED: '환불 완료',
};
