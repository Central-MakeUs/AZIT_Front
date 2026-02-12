import type { PaymentMethod } from '@/features/order/api/types';

export const PAYMENT_METHOD_MAP: Record<string, PaymentMethod> = {
  BANK_TRANSFER: {
    code: 'BANK_TRANSFER',
    description: '무통장 입금',
    isEnabled: true,
  },
};

export const DEFAULT_PAYMENT_METHOD: PaymentMethod =
  PAYMENT_METHOD_MAP.BANK_TRANSFER;
