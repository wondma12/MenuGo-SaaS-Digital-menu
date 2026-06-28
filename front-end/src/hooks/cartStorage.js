// src/hooks/cartStorage.js

const STORAGE_KEY = "menugo_cart";

/**
 * Get the entire cart from sessionStorage
 */
export const getCart = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("[cartStorage] Failed to read cart:", error);
    return [];
  }
};

/**
 * Save cart to sessionStorage
 */
export const saveCart = (cart) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    window.dispatchEvent(
      new CustomEvent("menugo_cart_updated", {
        detail: cart,
      })
    );
  } catch (error) {
    console.error("[cartStorage] Failed to save cart:", error);
  }
};

/**
 * Get only one restaurant's cart
 */
export const getRestaurantCart = (restaurantId) => {
  return getCart().filter(
    (item) => String(item.restaurant_id) === String(restaurantId)
  );
};

/**
 * Add item to cart
 */
export const addItem = (restaurantId, item) => {
  const cart = getCart();

  const index = cart.findIndex(
    (cartItem) =>
      String(cartItem.restaurant_id) === String(restaurantId) &&
      cartItem.menu_item_id === item.id
  );

  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      restaurant_id: restaurantId,
      menu_item_id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      quantity: 1,
    });
  }

  saveCart(cart);

  return cart;
};

/**
 * Update quantity
 */
export const updateQuantity = (
  restaurantId,
  menuItemId,
  quantity
) => {
  let cart = getCart();

  if (quantity <= 0) {
    cart = cart.filter(
      (item) =>
        !(
          String(item.restaurant_id) === String(restaurantId) &&
          item.menu_item_id === menuItemId
        )
    );
  } else {
    cart = cart.map((item) => {
      if (
        String(item.restaurant_id) === String(restaurantId) &&
        item.menu_item_id === menuItemId
      ) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    });
  }

  saveCart(cart);

  return cart;
};

/**
 * Remove one item
 */
export const removeItem = (
  restaurantId,
  menuItemId
) => {
  const cart = getCart().filter(
    (item) =>
      !(
        String(item.restaurant_id) === String(restaurantId) &&
        item.menu_item_id === menuItemId
      )
  );

  saveCart(cart);

  return cart;
};

/**
 * Clear one restaurant's cart
 */
export const clearRestaurantCart = (restaurantId) => {
  const cart = getCart().filter(
    (item) => String(item.restaurant_id) !== String(restaurantId)
  );

  saveCart(cart);

  return cart;
};

/**
 * Total quantity
 */
export const getCartCount = (restaurantId = null) => {
  const cart = restaurantId
    ? getRestaurantCart(restaurantId)
    : getCart();

  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Total price
 */
export const getSubtotal = (restaurantId) => {
  return getRestaurantCart(restaurantId).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};