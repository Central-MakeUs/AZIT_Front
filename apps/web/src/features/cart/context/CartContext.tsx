import { createContext, useContext } from 'react';
import { useCart } from '../model/useCart';

export type CartContextValue = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  value,
  children,
}: {
  value: CartContextValue;
  children: React.ReactNode;
}) {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}
