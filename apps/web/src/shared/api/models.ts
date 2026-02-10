import type { components, operations } from './apiTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
export type SocialLoginResult = Required<
  components['schemas']['SocialLoginResponse']
>;
export type ReissueTokenResult = Required<
  components['schemas']['SocialLoginResponse']
>;
export type TermAgreeRequest = components['schemas']['AgreeToTermsRequest'];
export type CreateCrewRequest = components['schemas']['CreateCrewRequest'];
export type CreateCrewResult = Required<
  components['schemas']['CreateCrewResponse']
>;
export type JoinCrewRequest = components['schemas']['JoinCrewRequest'];
export type CrewInfoResult = Required<
  components['schemas']['CrewInvitationResponse']
>;
export type CrewJoinStatusResult = Required<
  components['schemas']['CrewJoinStatusResponse']
>;
export type StoreProductsResult = Required<
  components['schemas']['SliceResponseProductListResponse']
>;
export type StoreProductItem = StoreProductsResult['content'][number];
export type DeliveryAddressResult = Required<
  components['schemas']['DeliveryAddressResponse']
>;
export type StoreProductDetailResult = Required<
  components['schemas']['ProductDetailResponse']
>;
export type CartProductsResult = Required<
  components['schemas']['CartListResponse']
>;

export type CartProductAddRequest = components['schemas']['AddToCartRequest'];
export type CartProductDeleteRequest =
  components['schemas']['CartItemDeleteRequest'];
