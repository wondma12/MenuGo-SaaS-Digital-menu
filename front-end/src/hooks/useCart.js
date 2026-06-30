

import { useState, useEffect, useCallback } from "react";

import {
  getRestaurantCart,
  addItem,
  updateQuantity as updateCartQuantity,
  removeItem,
  clearRestaurantCart,
  getCartCount,
  getSubtotal,
} from "./cartStorage";

const useCart = (restaurantId) => {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(() => {
    if (!restaurantId) {
      setCart([]);
      return;
    }

    setCart(getRestaurantCart(restaurantId));
  }, [restaurantId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    const syncCart = () => {
      loadCart();
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener("menugo_cart_updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("menugo_cart_updated", syncCart);
    };
  }, [loadCart]);

  const addToCart = (item) => {
    addItem(restaurantId, item);
    loadCart();
  };

  const updateQuantity = (menuItemId, quantity) => {
    updateCartQuantity(
      restaurantId,
      menuItemId,
      quantity
    );

    loadCart();
  };

  const removeFromCart = (menuItemId) => {
    removeItem(
      restaurantId,
      menuItemId
    );

    loadCart();
  };

  const clearCart = () => {
    clearRestaurantCart(restaurantId);

    loadCart();
  };

  return {
    cart,

    cartCount: getCartCount(restaurantId),

    subtotal: getSubtotal(restaurantId),

    addToCart,

    updateQuantity,

    removeFromCart,

    clearCart,

    reloadCart: loadCart,
  };
};

export default useCart;