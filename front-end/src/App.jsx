import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import MenuManagement from './pages/admin/MenuManagement';

// Sample menu items for display
 export default function App() {
  return (
    <MenuProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/admin/menu" element={<MenuManagement />} />
        </Routes>
      </div>
    </MenuProvider>
  );
}
