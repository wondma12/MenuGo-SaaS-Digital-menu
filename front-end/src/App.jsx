import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Orders from "./pages/admin/Orders";
import MenuManagement from "./pages/admin/MenuManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import Appearance from "./pages/admin/Appearance";
import QRCode from "./pages/admin/QRCode";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <Routes>
     
         
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="qrcode" element={<QRCode />} />
          <Route path="settings" element={<Settings />} />
       
    </Routes>
  );
}

export default App;