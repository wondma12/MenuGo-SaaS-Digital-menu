// src/pages/customer/CartPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CartItemRow from "../../components/customer/Cart/CartItemRow";
import OrderSummary from "../../components/customer/Cart/OrderSummary";
import OrderTypeSelector from "../../components/customer/Cart/OrderTypeSelector";
import CustomerHeader, { BottomNav } from "../../components/layout/CustomerNav";
import Footer from "../../components/layout/Footer";
import { orderAPI } from "../../services/api";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("dine_in");
  const [tableNumber, setTableNumber] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  
  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      return raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0;
    } catch (e) {
      return 0;
    }
  });

  // ✅ Load cart items from sessionStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const raw = sessionStorage.getItem("menugo_cart");
        if (raw) {
          const allItems = JSON.parse(raw);
          // Filter items for this restaurant
          const filtered = restaurantId 
            ? allItems.filter(item => item.restaurantId === restaurantId || item.restaurant_id === restaurantId)
            : allItems;
          setCartItems(filtered);
          console.log("[CartPage] Loaded cart items:", filtered);
        }
      } catch (e) {
        console.error("[CartPage] Error loading cart:", e);
      }
    };

    loadCart();
  }, [restaurantId]);

  // ✅ Cart count management
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "menugo_cart") {
        try {
          const raw = e.newValue;
          if (raw && restaurantId) {
            const allCartItems = JSON.parse(raw);
            const filteredCart = allCartItems.filter(
              (item) => item.restaurantId === restaurantId || item.restaurant_id === restaurantId
            );
            setCartItems(filteredCart);
            setCartCount(filteredCart.reduce((s, i) => s + i.quantity, 0));
          } else {
            setCartCount(
              raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0
            );
          }
        } catch (err) {
          setCartCount(0);
        }
      }
    };
    
    const onCustom = (e) => {
      const updated = e.detail || (e.newValue ? JSON.parse(e.newValue) : null);
      if (Array.isArray(updated)) {
        if (restaurantId) {
          const filteredCart = updated.filter(
            (item) => item.restaurantId === restaurantId || item.restaurant_id === restaurantId
          );
          setCartItems(filteredCart);
          setCartCount(filteredCart.reduce((s, i) => s + i.quantity, 0));
        } else {
          setCartCount(updated.reduce((s, i) => s + i.quantity, 0));
        }
      }
    };
    
    window.addEventListener("storage", onStorage);
    window.addEventListener("menugo_cart_updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("menugo_cart_updated", onCustom);
    };
  }, [restaurantId]);

  // ✅ Load cart from location state if available
  useEffect(() => {
    if (location.state?.cart) {
      setCartItems(location.state.cart);
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(location.state.cart));
      } catch (e) {
        console.error("Error saving cart to sessionStorage:", e);
      }
    }
  }, [location.state?.cart]);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      const next = cartItems.filter((item) => item.id !== id);
      setCartItems(next);
      updateSessionStorage(next);
    } else {
      const next = cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      setCartItems(next);
      updateSessionStorage(next);
    }
  };

  const updateSessionStorage = (items) => {
    try {
      // Merge with other restaurant items
      const raw = sessionStorage.getItem("menugo_cart");
      let allItems = raw ? JSON.parse(raw) : [];
      
      // Remove items from this restaurant
      allItems = allItems.filter(item => 
        item.restaurantId !== restaurantId && item.restaurant_id !== restaurantId
      );
      
      // Add updated items
      allItems = [...allItems, ...items];
      
      sessionStorage.setItem("menugo_cart", JSON.stringify(allItems));
      
      // Dispatch event
      const custom = new CustomEvent("menugo_cart_updated", {
        detail: allItems,
      });
      window.dispatchEvent(custom);
    } catch (e) {
      console.error("Error updating session storage:", e);
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handlePlaceOrder = async () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  // ✅ Validate table number for dine-in
  if (orderType === "dine_in" && !tableNumber.trim()) {
    alert("Please enter a table number");
    return;
  }

  setIsPlacingOrder(true);
  setOrderError(null);

  try {
    // ✅ Build order data with correct values
    const orderData = {
      restaurant_id: restaurantId,
      table_number: orderType === "dine_in" ? tableNumber.trim() : null,
      order_type: orderType, // ✅ Already "dine_in" or "takeaway"
      customer_notes: "",
      items: cartItems.map(item => ({
        menu_item_id: item.id,
        quantity: item.quantity
      }))
    };

    console.log("[CartPage] Placing order:", orderData);

    const result = await orderAPI.create(orderData);
    console.log("[CartPage] Order result:", result);

    if (result && result.id) {
      // Clear cart
      setCartItems([]);
      updateSessionStorage([]);
      
      alert(`✅ Order placed successfully!\nOrder #: ${result.order_number || result.id}\nTotal: $${getSubtotal().toFixed(2)}`);
      
      navigate(restaurantId ? `/customer/${restaurantId}` : "/customer");
    } else {
      const errorMsg = result?.message || "Failed to place order";
      setOrderError(errorMsg);
      
      if (result?.error && Array.isArray(result.error)) {
        const errorMessages = result.error.map(e => `${e.field}: ${e.message}`).join("\n");
        alert(`❌ Validation failed:\n${errorMessages}`);
      } else {
        alert(`❌ Failed to place order: ${errorMsg}`);
      }
    }
  } catch (error) {
    console.error("[CartPage] Error placing order:", error);
    const errorMsg = error.response?.data?.message || error.message || "Failed to place order";
    setOrderError(errorMsg);
    
    if (error.response?.data?.error && Array.isArray(error.response.data.error)) {
      const errorMessages = error.response.data.error.map(e => `${e.field}: ${e.message}`).join("\n");
      alert(`❌ Validation failed:\n${errorMessages}`);
    } else {
      alert(`❌ Failed to place order: ${errorMsg}`);
    }
  } finally {
    setIsPlacingOrder(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader cartCount={cartCount} />
        <main className="pt-32 pb-24 max-w-container-max mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-6xl text-neutral-300 animate-bounce-in">
            shopping_bag
          </span>
          <h2 className="font-h2 text-h2 mt-4 animate-fade-in-up stagger-1">
            Your cart is empty
          </h2>
          <p className="text-secondary mt-2 animate-fade-in-up stagger-2">
            Start adding delicious items from the menu.
          </p>
          <Link
            to={restaurantId ? `/customer/${restaurantId}` : "/customer"}
            className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg hover-lift btn-micro animate-fade-in-up stagger-3"
          >
            Browse Menu
          </Link>
        </main>
        <BottomNav cartCount={cartCount} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerHeader cartCount={cartCount} />
      <main className="pt-24 pb-32 max-w-container-max mx-auto px-6">
        {orderError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {orderError}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <header className="animate-fade-in-down stagger-1">
              <h2 className="font-h1 text-h1 text-black">Your Order</h2>
              <p className="font-body-md text-on-secondary-container mt-xs">
                Review your selection before placing order.
              </p>
            </header>
            <section className="space-y-md">
              {cartItems.map((item, index) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  className={`cart-item-enter stagger-${Math.min(index + 2, 6)}`}
                />
              ))}
            </section>
            <OrderTypeSelector
              orderType={orderType}
              setOrderType={setOrderType}
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
              className="animate-fade-in-up stagger-4"
            />
          </div>
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <OrderSummary
              subtotal={getSubtotal()}
              onPlaceOrder={handlePlaceOrder}
              isPlacingOrder={isPlacingOrder}
              className="animate-scale-in stagger-5"
            />
          </aside>
        </div>
      </main>
      <BottomNav cartCount={cartCount} />
      <Footer />
    </div>
  );
};

export default CartPage;