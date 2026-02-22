import type { AuthProvider } from '@/shared/api/models/auth';

export const END_POINT = {
  AUTH: {
    SOCIAL_LOGIN: (provider: AuthProvider) => `auth/social-login/${provider}`,
    REISSUE_TOKEN: 'auth/reissue',
    LOGOUT: 'auth/logout',
    WITHDRAW: 'members/me/withdraw',
  },
  MEMBER: {
    MY_INFO: 'members/me',
  },
  ONBOARDING: {
    CREATE_CREW: 'crews',
    CREW_INFO: (invitationCode: string) => `crews/invitation/${invitationCode}`,
    JOIN_CREW: 'crews/join',
    JOIN_STATUS: (crewId: number) => `crews/${crewId}/join-status`,
    TERM_AGREE: 'members/terms',
    CONFIRM_JOIN_STATUS: 'members/me/confirm-status',
  },
  CREW: {
    MEMBERS: (crewId: number) => `crews/${crewId}/members`,
    MEMBER: (crewId: number, targetMemberId: number) =>
      `crews/${crewId}/members/${targetMemberId}`,
    JOIN_REQUESTS: (crewId: number) => `crews/${crewId}/join-requests`,
    APPROVE_JOIN_REQUEST: (crewId: number, targetMemberId: number) =>
      `crews/${crewId}/join-requests/${targetMemberId}/approve`,
    REJECT_JOIN_REQUEST: (crewId: number, targetMemberId: number) =>
      `crews/${crewId}/join-requests/${targetMemberId}/reject`,
  },
  STORE: {
    PRODUCTS: 'products',
    PRODUCT_DETAIL: (productId: number) => `products/${productId}`,
  },
  CART: {
    PRODUCTS: 'carts',
    PRODUCTS_ITEM: 'carts/items',
    PRODUCTS_ITEM_QUANTITY: (cartItemId: number) => `carts/items/${cartItemId}`,
    COUNT: 'carts/count',
  },
  ADDRESS: {
    LIST: 'addresses',
    DETAIL: (addressId: number) => `addresses/${addressId}`,
  },
  ORDER: {
    CHECKOUT_DIRECT: 'orders/checkout/direct',
    CHECKOUT_CART: 'orders/checkout/cart',
    CREATE: 'orders',
    DETAIL: (orderNumber: string) => `orders/${orderNumber}`,
    CANCEL: (orderNumber: string) => `orders/${orderNumber}/cancel`,
    HISTORY: 'orders',
  },
  SCHEDULE: {
    LIST: (crewId: number) => `crews/${crewId}/schedules`,
    CALENDAR: (crewId: number) => `crews/${crewId}/schedules/calendar`,
    JOINED_LIST: 'members/me/schedules',
  },
} as const;
