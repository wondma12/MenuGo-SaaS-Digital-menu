/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartItemRow from "../../components/customer/Cart/CartItemRow";
import OrderSummary from "../../components/customer/Cart/OrderSummary";
import OrderTypeSelector from "../../components/customer/Cart/OrderTypeSelector";
import CustomerHeader, { BottomNav } from "../../components/layout/CustomerNav";
import Footer from "../../components/layout/Footer";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state?.cart || []);
  const [orderType, setOrderType] = useState("Dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      return raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0;
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "menugo_cart") {
        try {
          const raw = e.newValue;
          setCartCount(
            raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0,
          );
        } catch (err) {
          setCartCount(0);
        }
      }
    };
    const onCustom = (e) => {
      const updated = e.detail || (e.newValue ? JSON.parse(e.newValue) : null);
      if (Array.isArray(updated))
        setCartCount(updated.reduce((s, i) => s + i.quantity, 0));
      else {
        try {
          const raw = e.newValue;
          setCartCount(
            raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0,
          );
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("menugo_cart_updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("menugo_cart_updated", onCustom);
    };
  }, []);

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      const next = cartItems.filter((item) => item.id !== id);
      setCartItems(next);
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(next));
      } catch (e) {}
    } else {
      const next = cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      setCartItems(next);
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(next));
      } catch (e) {}
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Build itemized order summary
    const itemsSummary = cartItems
      .map(
        (it) =>
          `${it.name} x ${it.quantity} — $${(it.price * it.quantity).toFixed(2)}`,
      )
      .join("\n");
    const subtotal = getSubtotal();
    const summary = `Order placed! ${orderType}${orderType === "Dine-in" ? `, Table ${tableNumber}` : ""}\n\nItems:\n${itemsSummary}\n\nSubtotal: $${subtotal.toFixed(2)}`;
    // show confirmation (replace with modal if desired)
    alert(summary);
    const next = [];
    setCartItems(next);
    try {
      sessionStorage.removeItem("menugo_cart");
    } catch (e) {}
    navigate("/customer");
  };

  // Load cart from sessionStorage if available (direct /cart visits)
  React.useEffect(() => {
    if (!location.state?.cart) {
      try {
        const raw = sessionStorage.getItem("menugo_cart");
        if (raw) setCartItems(JSON.parse(raw));
      } catch (e) {
        // ignore
      }
    } else {
      try {
        sessionStorage.setItem(
          "menugo_cart",
          JSON.stringify(location.state.cart),
        );
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader
          cartCount={cartCount}
          className="animate-fade-in-down"
        />
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
            to="/customer"
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
      <CustomerHeader cartCount={cartCount} className="animate-fade-in-down" />
      <main className="pt-24 pb-32 max-w-container-max mx-auto px-6">
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
