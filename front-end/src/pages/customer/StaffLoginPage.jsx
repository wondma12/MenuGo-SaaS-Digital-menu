import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StaffLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login attempt (demo)');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full pt-12 pb-6 flex justify-center">
        <h1 className="text-lg font-black tracking-tighter uppercase text-black">LUMIÈRE DINING</h1>
      </header>
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-8 md:p-12 shadow-soft rounded-lg">
          <div className="mb-10 text-center">
            <h2 className="font-h2 text-h2 text-black mb-2">Staff Login</h2>
            <p className="font-body-sm text-secondary">Authorized personnel only</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-secondary block">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary focus:ring-0 transition-colors"
                placeholder="e.g. manager@lumieredining.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps text-secondary block">PASSWORD</label>
                <a href="#" className="font-label-caps text-[10px] text-secondary hover:text-black transition-colors">FORGOT?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary focus:ring-0 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-button text-button py-4 rounded hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-widest mt-4"
            >
              Login
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-outline-variant text-center">
            <Link to="/" className="font-label-caps text-label-caps text-secondary hover:text-black transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
              BACK TO MENU
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-12">
        <div className="max-w-container-max mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-bold text-neutral-900 uppercase tracking-tighter">LUMIÈRE DINING</span>
            <p className="font-['Inter'] text-xs font-light text-neutral-500 mt-1">© {new Date().getFullYear()} LUMIÈRE DINING. POWERED BY MENU-SAAS.</p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-['Inter'] text-xs font-light text-neutral-500 hover:text-black">Privacy Policy</Link>
            <Link to="/staff-login" className="font-['Inter'] text-xs font-light text-neutral-900 underline">Staff Login</Link>
            <Link to="/support" className="font-['Inter'] text-xs font-light text-neutral-500 hover:text-black">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StaffLoginPage;