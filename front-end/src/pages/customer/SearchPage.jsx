import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuService from '../../services/menuService';
import MenuItemCard from '../../components/customer/Menu/MenuItemCard';

const SearchPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let mounted = true;
    menuService.getMenuItems().then((res) => {
      if (!mounted) return;
      if (res.success && Array.isArray(res.data)) setItems(res.data);
    });
    return () => { mounted = false; };
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...item, quantity: 1 }];
      try {
        sessionStorage.setItem('menugo_cart', JSON.stringify(updated));
        // dispatch a storage event so other components in this window (header/menu) update immediately
        try {
          const evt = new StorageEvent('storage', { key: 'menugo_cart', newValue: JSON.stringify(updated) });
          window.dispatchEvent(evt);
        } catch (err) {
          // Fallback: use a custom event if StorageEvent isn't supported
          const custom = new CustomEvent('menugo_cart_updated', { detail: updated });
          window.dispatchEvent(custom);
        }
      } catch (e) {}
      return updated;
    });
  };

  const filtered = query.trim()
    ? items.filter((it) => (it.name + ' ' + (it.description || '')).toLowerCase().includes(query.toLowerCase()))
    : items;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-50">
            <span className="material-symbols-outlined text-neutral-900">menu</span>
          </button>
          <Link to="/customer">
            <h1 className="text-lg font-black tracking-tighter text-neutral-900 uppercase">LUMIÈRE DINING</h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/customer" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
            <span className="material-symbols-outlined"></span>
            <span className="font-label-caps text-label-caps">Menu</span>
          </Link>
          <Link to="/search" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
            <span className="material-symbols-outlined"></span>
            <span className="font-label-caps text-label-caps">Search</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
            <span className="material-symbols-outlined"></span>
            <span className="font-label-caps text-label-caps">Orders</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-24 max-w-container-max mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full px-4 py-3 border border-outline-variant rounded-md focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft md:hidden">
        <Link to="/customer" className="flex flex-col items-center justify-center px-3 py-1 rounded-md bg-neutral-100 text-neutral-900">
          <span className="material-symbols-outlined"></span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Menu</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center justify-center text-neutral-400">
          <span className="material-symbols-outlined"></span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Search</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center justify-center text-neutral-400">
          <span className="material-symbols-outlined"></span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Orders</span>
        </Link>
      </nav>
    </div>
  );
};

export default SearchPage;
