import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroBanner from "../../components/customer/Menu/HeroBanner";
import CategoryTabs from "../../components/customer/Menu/CategoryTabs";
import MenuItemCard from "../../components/customer/Menu/MenuItemCard";
import FeedbackSection from "../../components/customer/Feedback/FeedbackSection";
import menuService from "../../services/menuService";
import Footer from "../../components/layout/Footer";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prev, { ...item, quantity: 1 }];
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(updated));
        // update cartCount immediately so header/footer reflect change in this window
        setCartCount(updated.reduce((s, it) => s + it.quantity, 0));
      } catch (e) {
        // ignore storage errors
      }
      return updated;
    });
  };

  const getCartCount = () => cart.reduce((sum, i) => sum + i.quantity, 0);
  const getCartTotal = () =>
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // cart count from sessionStorage for header/footer visibility across pages
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
  // initialize cart from sessionStorage so UI reflects persisted cart
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // load menu items and categories from menuService
  React.useEffect(() => {
    let mounted = true;
    menuService.getMenuItems().then((res) => {
      if (!mounted) return;
      if (res.success && Array.isArray(res.data)) setMenuItems(res.data);
    });
    menuService.getCategories().then((res) => {
      if (!mounted) return;
      if (res.success && Array.isArray(res.data))
        setCategories(["ALL", ...res.data.map((c) => c.toUpperCase())]);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredItems =
    activeCategory === "ALL"
      ? menuItems
      : menuItems.filter(
          (item) => item.category?.toUpperCase() === activeCategory,
        );

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
          state={{ cart }}
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

  // Inline Bottom Navigation (mobile only)
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft md:hidden">
      <Link
        to="/customer"
        className="flex flex-col items-center justify-center px-3 py-1 rounded-md bg-neutral-100 text-neutral-900"
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
        className="flex flex-col items-center justify-center text-neutral-400 relative"
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Orders
        </span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-8 bg-primary text-on-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );

  // Inline Floating Cart Button
  const FloatingCartButton = () => {
    const count = getCartCount();
    const total = getCartTotal();
    if (count === 0) return null;
    return (
      <button
        onClick={() => {
          try {
            const stored = sessionStorage.getItem("menugo_cart");
            const payload = stored ? JSON.parse(stored) : cart;
            navigate("/cart", { state: { cart: payload } });
          } catch (e) {
            navigate("/cart", { state: { cart } });
          }
        }}
        className="fixed bottom-24 right-6 md:right-12 z-50 flex items-center gap-3 px-6 py-4 bg-black text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-button text-button uppercase tracking-widest">
          Orders ({count}) · ${total.toFixed(2)}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
        <HeroBanner />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
        <FeedbackSection />
      </main>

      <FloatingCartButton />
      <BottomNav />
      <Footer />
    </div>
  );
};

export default MenuPage;
