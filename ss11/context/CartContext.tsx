import type { Product } from "@/constants/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, amount: number) => void;
  removeFromCart: (productId: string) => void;
  totalQuantity: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "APP_CART_V1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setCartItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  // Persist whenever cart changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems)).catch(
      () => {}
    );
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCartItems((prev) => {
      return prev
        .map((p) =>
          p.id === productId
            ? { ...p, quantity: Math.max(0, p.quantity + amount) }
            : p
        )
        .filter((p) => p.quantity > 0);
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalQuantity,
    }),
    [cartItems, totalQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
