export interface OrderPageParams {
  skuId?: string;
  quantity?: string;
  cartItemIds?: string;
}

export function parseOrderParams(params: OrderPageParams | undefined) {
  if (!params) return { skuId: 0, quantity: 0, cartItemIds: [] as number[] };
  const skuId = Number(params.skuId) || 0;
  const quantity = Number(params.quantity) || 0;
  let cartItemIds: number[] = [];
  try {
    const parsed = params.cartItemIds ? JSON.parse(params.cartItemIds) : [];
    cartItemIds = Array.isArray(parsed)
      ? parsed.filter((n: unknown) => typeof n === 'number')
      : [];
  } catch {
    // 오류 처리
  }
  return { skuId, quantity, cartItemIds };
}
