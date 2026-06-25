// src/pages/customer/MenuPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeroBanner from "../../components/customer/Menu/HeroBanner";
import CategoryTabs from "../../components/customer/Menu/CategoryTabs";
import MenuItemCard from "../../components/customer/Menu/MenuItemCard";
import FeedbackSection from "../../components/customer/Feedback/FeedbackSection";
import CustomerHeader, { BottomNav } from "../../components/layout/CustomerNav";
import { menuAPI } from "../../services/api";
import Footer from "../../components/layout/Footer";

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      return raw ? JSON.parse(raw).reduce((s, i) => s + i.quantity, 0) : 0;
    } catch (e) {
      return 0;
    }
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...item, quantity: 1 }];
      try {
        sessionStorage.setItem("menugo_cart", JSON.stringify(updated));
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

        const menuResult = await menuAPI.getPublicMenu(restaurantId);
        console.log("[MenuPage] Public Menu Result:", menuResult);

        if (menuResult) {
          let restaurantData = null;
          let categoriesData = [];
          let itemsData = [];

          if (menuResult.restaurant) {
            restaurantData = menuResult.restaurant;
          } else if (menuResult.data && menuResult.data.restaurant) {
            restaurantData = menuResult.data.restaurant;
          }

          if (menuResult.categories && Array.isArray(menuResult.categories)) {
            categoriesData = menuResult.categories;
            menuResult.categories.forEach(cat => {
              if (cat.items && Array.isArray(cat.items)) {
                itemsData = [...itemsData, ...cat.items.map(item => ({
                  ...item,
                  categoryId: cat.id,
                  categoryName: cat.name
                }))];
              }
            });
          } else if (menuResult.menu_items && Array.isArray(menuResult.menu_items)) {
            itemsData = menuResult.menu_items;
            const uniqueCategories = [...new Set(itemsData.map(item => item.category_id))];
            categoriesData = uniqueCategories.map(id => ({ id, name: `Category ${id}` }));
          } else if (menuResult.data) {
            const data = menuResult.data;
            if (data.restaurant) {
              restaurantData = data.restaurant;
            }
            if (data.categories && Array.isArray(data.categories)) {
              categoriesData = data.categories;
              data.categories.forEach(cat => {
                if (cat.items && Array.isArray(cat.items)) {
                  itemsData = [...itemsData, ...cat.items.map(item => ({
                    ...item,
                    categoryId: cat.id,
                    categoryName: cat.name
                  }))];
                }
              });
            }
          }

          setRestaurant(restaurantData || null);

          const formattedCategories = [
            { id: "ALL", name: "ALL" },
            ...categoriesData.map(cat => ({
              id: cat.id?.toString() || cat._id?.toString() || cat,
              name: cat.name || cat
            }))
          ];
          setCategories(formattedCategories);

          const transformedItems = itemsData.map(item => ({
            id: item.id || item._id,
            name: item.name,
            description: item.description || "",
            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0,
            image: item.image || item.imageUrl || "",
            categoryId: item.category_id?.toString() || item.categoryId?.toString() || "",
            categoryName: item.category_name || item.categoryName || "",
            status: item.status || "available",
            isAvailable: item.status === "available",
            preparation_time: item.preparation_time || null,
            is_featured: item.is_featured || false,
          }));

          setMenuItems(transformedItems);
        }

        setLoading(false);
      } catch (error) {
        console.error("[MenuPage] Load restaurant data error:", error);
        setError(error.message || "Failed to load restaurant data");
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("menugo_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

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

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.categoryId === activeCategory || item.category_id === activeCategory;
  });

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
        <span className="material-symbols-outlined">shopping_bag</span>
        <span className="font-button text-button uppercase tracking-widest">
          Orders ({count}) · ${total.toFixed(2)}
        </span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerHeader cartCount={cartCount} restaurant={restaurant} />
        <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
          <div className="text-center text-zinc-500">
            Loading restaurant data...
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
        <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
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
      <main className="pt-28 pb-24 max-w-container-max mx-auto px-6 md:px-gutter">
        <HeroBanner restaurant={restaurant} />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-zinc-500 py-12">
              No items found in this category
            </div>
          )}
        </div>
        <FeedbackSection restaurantId={restaurantId} />
      </main>

      <FloatingCartButton />
      <BottomNav cartCount={cartCount} restaurant={restaurant} />
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default MenuPage;