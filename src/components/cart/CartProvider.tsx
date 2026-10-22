'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { CartItem, Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/products';

const STORAGE_KEY = 'veepee_cart_v1';

export interface SingleProductEnquirySelection {
  product: Product;
  mode: 'purchase' | 'rental';
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, mode: 'purchase' | 'rental', quantity?: number, openDrawer?: boolean) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPricedAmount: number;
  hasUnpricedItems: boolean;
  // Drawer states
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // Toast state
  cartToast: { name: string; quantity: number } | null;
  clearCartToast: () => void;
  // Service modal states
  isServiceModalOpen: boolean;
  preselectedService: string;
  openServiceModal: (serviceName?: string) => void;
  closeServiceModal: () => void;
  // Product detail modal state
  activeProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  // Product enquiry modal states (matching service enquiry form flow)
  isProductEnquiryOpen: boolean;
  productEnquirySingleItem: SingleProductEnquirySelection | null;
  openProductEnquiry: (singleItem?: SingleProductEnquirySelection) => void;
  closeProductEnquiry: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartToast, setCartToast] = useState<{ name: string; quantity: number } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isProductEnquiryOpen, setIsProductEnquiryOpen] = useState(false);
  const [productEnquirySingleItem, setProductEnquirySingleItem] = useState<SingleProductEnquirySelection | null>(null);

  const clearCartToast = useCallback(() => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setCartToast(null);
  }, []);

  // Restore cart on client mount safely
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate stored items against known product catalog
          const validItems: CartItem[] = parsed.filter(item => {
            return (
              item &&
              typeof item.id === 'string' &&
              typeof item.quantity === 'number' &&
              item.quantity > 0 &&
              PRODUCTS_DATA.some(p => p.id === item.productId)
            );
          });
          setItems(validItems);
        }
      }
    } catch {
      // Ignore corrupted localStorage data
    }
  }, []);

  // Persist items whenever changed after mount
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // LocalStorage full or private browsing restriction
    }
  }, [items, isMounted]);

  // Lock body scroll when drawers/modals are active
  useEffect(() => {
    if (isCartOpen || isServiceModalOpen || isProductEnquiryOpen || activeProduct !== null) {
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');

      return () => {
        document.documentElement.classList.remove('scroll-locked');
        document.body.classList.remove('scroll-locked');
      };
    }
  }, [isCartOpen, isServiceModalOpen, isProductEnquiryOpen, activeProduct]);

  // Handle ESC key to close active drawers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isProductEnquiryOpen) setIsProductEnquiryOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
        else if (isServiceModalOpen) setIsServiceModalOpen(false);
        else if (activeProduct) setActiveProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, isServiceModalOpen, isProductEnquiryOpen, activeProduct]);

  const addItem = (
    product: Product,
    mode: 'purchase' | 'rental',
    quantity: number = 1,
    openDrawer: boolean = false
  ) => {
    const itemId = `${product.id}-${mode}`;
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        image: product.image,
        purchaseOrRental: mode,
        price: product.optionalPrice,
        quantity,
      };
      return [...prevItems, newItem];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      setCartToast({ name: product.name, quantity });
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => prev.map(item => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setCartToast(null);
  };

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPricedAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.price !== null && item.price !== undefined) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
  }, [items]);

  const hasUnpricedItems = useMemo(() => {
    return items.some(item => item.price === null || item.price === undefined);
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openServiceModal = (serviceName?: string) => {
    setPreselectedService(serviceName || 'Home Nursing Care');
    setIsServiceModalOpen(true);
  };
  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
  };

  const openProductModal = (product: Product) => {
    setActiveProduct(product);
  };
  const closeProductModal = () => {
    setActiveProduct(null);
  };

  const openProductEnquiry = (singleItem?: SingleProductEnquirySelection) => {
    if (singleItem) {
      setProductEnquirySingleItem(singleItem);
    } else {
      setProductEnquirySingleItem(null);
    }
    setIsCartOpen(false);
    setActiveProduct(null);
    setIsProductEnquiryOpen(true);
  };

  const closeProductEnquiry = () => {
    setIsProductEnquiryOpen(false);
    setProductEnquirySingleItem(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        totalPricedAmount,
        hasUnpricedItems,
        isCartOpen,
        openCart,
        closeCart,
        cartToast,
        clearCartToast,
        isServiceModalOpen,
        preselectedService,
        openServiceModal,
        closeServiceModal,
        activeProduct,
        openProductModal,
        closeProductModal,
        isProductEnquiryOpen,
        productEnquirySingleItem,
        openProductEnquiry,
        closeProductEnquiry,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
