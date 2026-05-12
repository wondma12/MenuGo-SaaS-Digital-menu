import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import customerAuth from "../../services/customerauth";
import MenuItemCard from "../../components/customer/Menu/MenuItemCard";
import CustomerHeader, { BottomNav } from "../../components/layout/CustomerNav";
import Footer from "../../components/layout/Footer";

const SearchPage = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadRestaurantMenu = async () => {
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

        // Load restaurant menu
        const menuResult = await customerAuth.getRestaurantMenu(restaurantId);
        if (!menuResult.success) {
          setError(menuResult.error);
          setLoading(false);
          return;
        }

        setItems(menuResult.data.allItems);
        setLoading(false);
      } catch (error) {
        console.error("Load restaurant menu error:", error);
        setError("Failed to load restaurant menu");
        setLoading(false);
      }
    };

    loadRestaurantMenu();
  }, [restaurantId]);

  const addToCart = (item) => {
    // Add restaurantId to the item if not present
    const itemWithRestaurant = { ...item, restaurantId };

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prev, { ...itemWithRestaurant, quantity: 1 }];
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(updated));
        // dispatch a storage event so other components in this window (header/menu) update immediately
        try {
          const evt = new StorageEvent("storage", {
            key: "menugo_cart",
            newValue: JSON.stringify(updated),
          });
          window.dispatchEvent(evt);
        } catch (err) {
          // Fallback: use a custom event if StorageEvent isn't supported
          const custom = new CustomEvent("menugo_cart_updated", {
            detail: updated,
          });
          window.dispatchEvent(custom);
        }
      } catch (e) {}
      return updated;
    });
  };

  const filtered = query.trim()
    ? items.filter((it) =>
        (it.name + " " + (it.description || ""))
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : items;

  if (loading) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader
          cartCount={cartCount}
          className="animate-fade-in-down"
        />
        <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
          <div className="text-center text-zinc-500">
            Loading restaurant menu...
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
        <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
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

      <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full px-4 py-3 border border-outline-variant rounded-md focus:border-primary search-focus animate-fade-in-down stagger-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              className={`animate-fade-in-up stagger-${Math.min(index + 2, 6)}`}
            />
          ))}
        </div>
      </main>

      <BottomNav cartCount={cartCount} />
      <Footer />
    </div>
  );
};

export default SearchPage;
