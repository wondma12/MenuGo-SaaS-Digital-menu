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
  const itemWithRestaurant = { 
    ...item, 
    restaurantId: restaurantId,
    restaurant_id: restaurantId
  };

  console.log("[MenuPage] Adding to cart:", itemWithRestaurant);

  setCart((prev) => {
    const existing = prev.find((i) => i.id === item.id);
    const updated = existing
      ? prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...prev, { ...itemWithRestaurant, quantity: 1 }];
    
    try {
      sessionStorage.setItem("menugo_cart", JSON.stringify(updated));
      setCartCount(updated.reduce((s, it) => s + it.quantity, 0));
      
      const custom = new CustomEvent("menugo_cart_updated", {
        detail: updated,
      });
      window.dispatchEvent(custom);
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
          // ✅ Extract data from the correct structure
          const data = menuResult.data || menuResult;
          
          let restaurantData = null;
          let categoriesData = [];
          let itemsData = [];

          // ✅ Extract restaurant
          if (data.restaurant) {
            restaurantData = data.restaurant;
          }

          // ✅ Extract categories and items
          if (data.categories && Array.isArray(data.categories)) {
            categoriesData = data.categories;
            
            // ✅ Extract items from each category
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

          // ✅ Set restaurant data
          setRestaurant(restaurantData || null);

          // ✅ Format categories for CategoryTabs
          const formattedCategories = [
            { id: "ALL", name: "ALL" },
            ...categoriesData.map(cat => ({
              id: cat.id,
              name: cat.name
            }))
          ];
          setCategories(formattedCategories);

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

          console.log("[MenuPage] Transformed items:", transformedItems);
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

  // ✅ Filter items based on active category
  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.categoryId === activeCategory;
  });

  console.log("[MenuPage] Active category:", activeCategory);
  console.log("[MenuPage] Filtered items:", filteredItems);
  console.log("[MenuPage] Total menu items:", menuItems.length);

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
            filteredItems.map((item) => (
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