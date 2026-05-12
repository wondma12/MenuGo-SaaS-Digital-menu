import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import HeroBanner from "../../components/customer/Menu/HeroBanner";
import CategoryTabs from "../../components/customer/Menu/CategoryTabs";
import MenuItemCard from "../../components/customer/Menu/MenuItemCard";
import FeedbackSection from "../../components/customer/Feedback/FeedbackSection";
import CustomerHeader, { BottomNav } from "../../components/layout/CustomerNav";
import menuService from "../../services/menuService";
import customerAuth from "../../services/customerauth";
import Footer from "../../components/layout/Footer";

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const loadRestaurantData = async () => {
      if (!restaurantId) {
        setError("No restaurant specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if restaurant is accessible
        const canAccess = await customerAuth.canAccessRestaurant(restaurantId);
        if (!canAccess) {
          setError("Restaurant not available or inactive");
          setLoading(false);
          return;
        }

        // Load restaurant data
        const restaurantResult =
          await customerAuth.getRestaurantById(restaurantId);
        if (!restaurantResult.success) {
          setError(restaurantResult.error);
          setLoading(false);
          return;
        }

        // Load restaurant menu
        const menuResult = await customerAuth.getRestaurantMenu(restaurantId);
        if (!menuResult.success) {
          setError(menuResult.error);
          setLoading(false);
          return;
        }

        setRestaurant(restaurantResult.data);
        setCategories([
          { id: "ALL", name: "ALL" },
          ...menuResult.data.categories,
        ]);
        setMenuItems(menuResult.data.allItems);
        setLoading(false);
      } catch (error) {
        console.error("Load restaurant data error:", error);
        setError("Failed to load restaurant data");
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);

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
  }, [cart]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const filteredItems =
    activeCategory === "ALL"
      ? menuItems
      : menuItems.filter((item) => {
          const categoryName =
            typeof item.category === "string" ? item.category : item.categoryId;
          return categoryName?.toString().toUpperCase() === activeCategory;
        });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader
          cartCount={cartCount}
          className="animate-fade-in-down"
        />
        <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
          <div className="text-center text-zinc-500">
            Loading restaurant data...
          </div>
        </main>
        <BottomNav cartCount={cartCount} />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader
          cartCount={cartCount}
          className="animate-fade-in-down"
        />
        <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
          <div className="text-center text-red-500">{error}</div>
        </main>
        <BottomNav cartCount={cartCount} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerHeader cartCount={cartCount} className="animate-fade-in-down" />
      <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
        <HeroBanner
          restaurant={restaurant}
          className="animate-fade-in-up stagger-1"
        />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="animate-fade-in-down stagger-2"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              className={`animate-fade-in-up stagger-${Math.min(index + 3, 6)}`}
            />
          ))}
        </div>
        <FeedbackSection className="animate-fade-in-up stagger-6" />
      </main>

      <FloatingCartButton className="animate-bounce-in" />
      <BottomNav cartCount={cartCount} />
      <Footer />
    </div>
  );
};

export default MenuPage;
