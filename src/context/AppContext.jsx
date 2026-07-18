import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { products } from "../data/mockData";

const AppContext = createContext(null);

let toastId = 0;

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]); // { productId, qty }
  const [wishlist, setWishlist] = useState(["p2", "p7"]);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);

  const pushToast = useCallback((message, variant = "success") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToCart = useCallback((productId, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId, qty }];
    });
    pushToast("Added to cart");
  }, [pushToast]);

  const updateQty = useCallback((productId, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) => (i.productId === productId ? { ...i, qty } : i));
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const isIn = prev.includes(productId);
      pushToast(isIn ? "Removed from wishlist" : "Saved to wishlist", isIn ? "info" : "success");
      return isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  }, [pushToast]);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) }))
        .filter((i) => i.product),
    [cart]
  );

  const cartTotal = useMemo(
    () => cartDetailed.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cartDetailed]
  );

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const value = {
    cart, cartDetailed, cartTotal, cartCount, addToCart, updateQty, removeFromCart,
    wishlist, toggleWishlist,
    darkMode, setDarkMode,
    toasts, pushToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
