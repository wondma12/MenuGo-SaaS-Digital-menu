/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartItemRow from "../../components/customer/Cart/CartItemRow";
import OrderSummary from "../../components/customer/Cart/OrderSummary";
import OrderTypeSelector from "../../components/customer/Cart/OrderTypeSelector";
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
    navigate("/");
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

  // Inline Header
  const Header = () => (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-lg hover:bg-neutral-50">
          <span className="material-symbols-outlined text-neutral-900">
            menu
          </span>
        </button>
        <Link to="/customer">
          <h1 className="text-lg font-black tracking-tighter text-neutral-900 uppercase">
            LUMIÈRE DINING
          </h1>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/customer"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Menu</span>
        </Link>
        <Link
          to="/search"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Search</span>
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Orders</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-primary text-on-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft md:hidden">
      <Link
        to="/customer"
        className="flex flex-col items-center justify-center text-neutral-400"
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Menu
        </span>
      </Link>
      <Link
        to="/search"
        className="flex flex-col items-center justify-center text-neutral-400"
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Search
        </span>
      </Link>
      <Link
        to="/cart"
        className="flex flex-col items-center justify-center px-3 py-1 rounded-md bg-neutral-100 text-neutral-900 relative"
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Orders
        </span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-6 bg-primary text-on-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24 max-w-container-max mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-6xl text-neutral-300">
            shopping_bag
          </span>
          <h2 className="font-h2 text-h2 mt-4">Your cart is empty</h2>
          <p className="text-secondary mt-2">
            Start adding delicious items from the menu.
          </p>
          <Link
            to="/customer"
            className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg"
          >
            Browse Menu
          </Link>
        </main>
        <BottomNav />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-32 max-w-container-max mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <header>
              <h2 className="font-h1 text-h1 text-black">Your Order</h2>
              <p className="font-body-md text-on-secondary-container mt-xs">
                Review your selection before placing order.
              </p>
            </header>
            <section className="space-y-md">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </section>
            <OrderTypeSelector
              orderType={orderType}
              setOrderType={setOrderType}
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
            />
          </div>
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <OrderSummary
              subtotal={getSubtotal()}
              onPlaceOrder={handlePlaceOrder}
            />
          </aside>
        </div>
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
};

export default CartPage;
