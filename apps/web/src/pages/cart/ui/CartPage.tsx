import { useState, useMemo, useCallback } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, Divider, Header } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  CartSelectionBar,
  CartBrandSection,
  CartSummary,
  CartEmpty,
} from '@/features/cart/ui';
import { mockCartDataWithSoldout, type CartBrand } from '@/shared/mock/cart';
import * as styles from '../styles/CartPage.css';
import { formatPrice } from '@/shared/lib/formatters';

const MEMBERSHIP_DISCOUNT_RATE = 0.1;

export function CartPage() {
  const [cartData, setCartData] = useState<CartBrand[]>(
    mockCartDataWithSoldout
  );
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
    new Set()
  );

  const allItems = useMemo(() => {
    return cartData.flatMap((brand) => brand.items);
  }, [cartData]);

  const selectableItems = useMemo(() => {
    return allItems.filter((item) => !item.isSoldOut);
  }, [allItems]);

  const selectedItems = useMemo(() => {
    return selectableItems.filter((item) => selectedItemIds.has(item.id));
  }, [selectableItems, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    return (
      selectableItems.length > 0 &&
      selectedItems.length === selectableItems.length
    );
  }, [selectableItems, selectedItems]);

  const totalProductPrice = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
      0
    );
  }, [selectedItems]);

  const membershipDiscount = useMemo(() => {
    return Math.floor(totalProductPrice * MEMBERSHIP_DISCOUNT_RATE);
  }, [totalProductPrice]);

  const shippingFee = 0;

  const totalPayment = useMemo(() => {
    return totalProductPrice - membershipDiscount + shippingFee;
  }, [totalProductPrice, membershipDiscount, shippingFee]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelectedIds = new Set(selectableItems.map((item) => item.id));
        setSelectedItemIds(newSelectedIds);
      } else {
        setSelectedItemIds(new Set());
      }
    },
    [selectableItems]
  );

  const handleItemSelectChange = useCallback(
    (itemId: string, checked: boolean) => {
      setSelectedItemIds((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(itemId);
        } else {
          newSet.delete(itemId);
        }
        return newSet;
      });
    },
    []
  );

  const handleBrandSelectChange = useCallback(
    (brandId: string, checked: boolean) => {
      const brand = cartData.find((b) => b.id === brandId);
      if (!brand) return;

      const selectableItemsInBrand = brand.items.filter(
        (item) => !item.isSoldOut
      );

      setSelectedItemIds((prev) => {
        const newSet = new Set(prev);
        selectableItemsInBrand.forEach((item) => {
          if (checked) {
            newSet.add(item.id);
          } else {
            newSet.delete(item.id);
          }
        });
        return newSet;
      });
    },
    [cartData]
  );

  const handleQuantityChange = useCallback(
    (itemId: string, quantity: number) => {
      setCartData((prev) =>
        prev.map((brand) => ({
          ...brand,
          items: brand.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      );
    },
    []
  );

  const handleDeleteItem = useCallback((itemId: string) => {
    // TODO: DELETE api call
  }, []);

  const handleDeleteSelected = useCallback(() => {
    // TODO: DELETE api call
  }, [selectedItemIds]);

  const hasSelectedItems = selectedItems.length > 0;
  const isEmpty = cartData.length === 0;

  return (
    <AppScreen>
      <AppLayout>
        <Header sticky left={<BackButton />} center="장바구니" />
        <div className={styles.pageContainer}>
          {isEmpty ? (
            <CartEmpty />
          ) : (
            <>
              <div className={styles.contentWrapper}>
                <CartSelectionBar
                  selectedCount={selectedItems.length}
                  totalCount={allItems.length}
                  isAllSelected={isAllSelected}
                  onSelectAll={handleSelectAll}
                  onDeleteSelected={handleDeleteSelected}
                />
                <Divider />
                <div className={styles.brandListWrapper}>
                  {cartData.map((brand, index) => (
                    <div key={brand.id}>
                      <CartBrandSection
                        brand={brand}
                        selectedItemIds={selectedItemIds}
                        onItemSelectChange={handleItemSelectChange}
                        onBrandSelectChange={handleBrandSelectChange}
                        onQuantityChange={handleQuantityChange}
                        onDeleteItem={handleDeleteItem}
                      />
                      {index < cartData.length - 1 && <Divider />}
                    </div>
                  ))}
                </div>
                <Divider />
                <div className={styles.summaryWrapper}>
                  <CartSummary
                    totalProductPrice={totalProductPrice}
                    membershipDiscount={membershipDiscount}
                    shippingFee={shippingFee}
                    totalPayment={totalPayment}
                  />
                </div>
              </div>
              <div className={styles.footerWrapper}>
                <Button
                  className={styles.ctaButton}
                  state={hasSelectedItems ? 'active' : 'disabled'}
                  disabled={!hasSelectedItems}
                >
                  {hasSelectedItems
                    ? `${formatPrice(totalPayment)} 구매하기`
                    : '상품을 선택해주세요'}
                </Button>
              </div>
            </>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
