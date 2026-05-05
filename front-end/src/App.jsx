// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import AdminLayout from "./components/layout/AdminLayout";
// Auth Pages
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
// Admin Pages
import OrdersPage from "./pages/waiter/OrdersPage";
import DashboardPage from "./pages/Restaurant_admin/Dashboard";
import MenuManagementPage from "./pages/Restaurant_admin/MenuManagement";
import Restaurant_adminOrders from "./pages/Restaurant_admin/Orders";
import StaffManagement from "./pages/Restaurant_admin/StaffManagement";
import Appearance from "./pages/Restaurant_admin/Appearance";
import RestuarantSettings from "./pages/Restaurant_admin/Settings";
import QRCode from "./pages/Restaurant_admin/QRCode";
// Platform Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import Restaurants from "./pages/Admin/Restaurants";
import Users from "./pages/Admin/Users";
import Security from "./pages/Admin/Security";
import Settings from "./pages/Admin/settings_clean";

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Restaurant_admin ROUTES */}
        <Route
          path="/Restaurant_admin/dashboard"
          element={
            <AdminLayout role="Restaurant_admin">
              <DashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/orders"
          element={
            <AdminLayout role="Restaurant_admin">
              <Restaurant_adminOrders />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/menu"
          element={
            <AdminLayout role="Restaurant_admin">
              <MenuManagementPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/staff"
          element={
            <AdminLayout role="Restaurant_admin">
              <StaffManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/appearance"
          element={
            <AdminLayout role="Restaurant_admin">
              <Appearance />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/qr"
          element={
            <AdminLayout role="Restaurant_admin">
              <QRCode />
            </AdminLayout>
          }
        />
        <Route
          path="/Restaurant_admin/RestuarantSettings"
          element={
            <AdminLayout role="Restaurant_admin">
              <RestuarantSettings />
            </AdminLayout>
          }
        />

        {/* PLATFORM ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/security" element={<Security />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* WAITER ROUTES */}
        <Route
          path="/waiter/orders"
          element={
            <AdminLayout role="waiter">
              <OrdersPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
