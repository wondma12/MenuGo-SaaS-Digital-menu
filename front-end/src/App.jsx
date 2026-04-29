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
import DashboardPage from "./pages/admin/Dashboard";
import MenuManagementPage from "./pages/admin/MenuManagement";
import AdminOrders from "./pages/admin/Orders";
import StaffManagement from "./pages/admin/StaffManagement";
import Appearance from "./pages/admin/Appearance";
import Settings from "./pages/admin/Settings";
import QRCode from "./pages/admin/QRCode";

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout role="admin">
              <DashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout role="admin">
              <AdminOrders />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <AdminLayout role="admin">
              <MenuManagementPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <AdminLayout role="admin">
              <StaffManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/appearance"
          element={
            <AdminLayout role="admin">
              <Appearance />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/qr"
          element={
            <AdminLayout role="admin">
              <QRCode />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout role="admin">
              <Settings />
            </AdminLayout>
          }
        />
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
