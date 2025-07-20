
import { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, getCartSummary } from '../api/cartApi';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

interface CartSummary {
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cartCount: number;
  items: CartItem[];
  summary: CartSummary | null;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  items: [],
  summary: null,
  refreshCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const [summaryRes, itemsRes] = await Promise.all([
        getCartSummary(),
        getCartItems(),
      ]);
      const summaryData = summaryRes.data.data;
      const itemsData = itemsRes.data.data;
      setSummary(summaryData);
      setItems(itemsData);
      const total = itemsData.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error('Failed to refresh cart:', err);
      setSummary(null);
      setItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, items, summary, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
