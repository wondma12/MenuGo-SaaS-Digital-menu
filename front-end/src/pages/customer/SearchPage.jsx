// src/pages/customer/SearchPage.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { menuAPI } from "../../services/api";
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
  const [restaurant, setRestaurant] = useState(null);

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
            raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0
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
            raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0
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

        // ✅ Use menuAPI.getPublicMenu (same as MenuPage)
        const menuResult = await menuAPI.getPublicMenu(restaurantId);
        console.log("[SearchPage] Public Menu Result:", menuResult);

        if (!menuResult) {
          setError("Failed to load restaurant menu");
          setLoading(false);
          return;
        }

        // ✅ Extract data using same structure as MenuPage
        const data = menuResult.data || menuResult;
        
        let restaurantData = null;
        let itemsData = [];

        // ✅ Extract restaurant
        if (data.restaurant) {
          restaurantData = data.restaurant;
          setRestaurant(restaurantData);
        }

        // ✅ Extract items from categories
        if (data.categories && Array.isArray(data.categories)) {
          data.categories.forEach(cat => {
            if (cat.menu_items && Array.isArray(cat.menu_items)) {
              cat.menu_items.forEach(item => {
                itemsData.push({
                  ...item,
                  categoryId: cat.id,
                  categoryName: cat.name
                });
              });
            }
          });
        }

        // ✅ Transform menu items
        const transformedItems = itemsData.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0,
          image: item.image || "",
          categoryId: item.category_id || item.categoryId || "",
          categoryName: item.category_name || item.categoryName || "",
          status: item.status || "available",
          isAvailable: item.status === "available",
          preparation_time: item.preparation_time || null,
          is_featured: item.is_featured || false,
        }));

        console.log("[SearchPage] Transformed items:", transformedItems);
        setItems(transformedItems);
        setLoading(false);
      } catch (error) {
        console.error("[SearchPage] Load restaurant menu error:", error);
        setError(error.message || "Failed to load restaurant menu");
        setLoading(false);
      }
    };

    loadRestaurantMenu();
  }, [restaurantId]);

  const addToCart = (item) => {
    const itemWithRestaurant = { ...item, restaurantId };

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...itemWithRestaurant, quantity: 1 }];
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(updated));
        try {
          const evt = new StorageEvent("storage", {
            key: "menugo_cart",
            newValue: JSON.stringify(updated),
          });
          window.dispatchEvent(evt);
        } catch (err) {
          const custom = new CustomEvent("menugo_cart_updated", {
            detail: updated,
          });
          window.dispatchEvent(custom);
        }
      } catch (e) {}
      return updated;
    });
  };

  // ✅ Filter items based on search query
  const filtered = query.trim()
    ? items.filter((it) =>
        (it.name + " " + (it.description || ""))
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : items;

  if (loading) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader cartCount={cartCount} restaurant={restaurant} />
        <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
          <div className="text-center text-zinc-500">
            Loading restaurant menu...
          </div>
        </main>
        <BottomNav cartCount={cartCount} restaurant={restaurant} />
        <Footer restaurant={restaurant} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader cartCount={cartCount} restaurant={restaurant} />
        <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
          <div className="text-center text-red-500">{error}</div>
        </main>
        <BottomNav cartCount={cartCount} restaurant={restaurant} />
        <Footer restaurant={restaurant} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerHeader cartCount={cartCount} restaurant={restaurant} />

      <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full px-4 py-3 border border-outline-variant rounded-md focus:border-primary search-focus animate-fade-in-down stagger-1"
          />
          {items.length > 0 && (
            <p className="text-sm text-zinc-500 mt-2">
              {filtered.length} of {items.length} items
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-zinc-500 py-12">
              {query.trim() ? (
                <>
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-sm mt-1">
                    Try adjusting your search terms
                  </p>
                </>
              ) : (
                <p>Start typing to search menu items</p>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNav cartCount={cartCount} restaurant={restaurant} />
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default SearchPage;