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
import Settings from "./pages/Restaurant_admin/Settings";
import QRCode from "./pages/Restaurant_admin/QRCode";
// Customer Pages
import MenuPage from "./pages/customer/MenuPage";
import SearchPage from "./pages/customer/SearchPage";
import CartPage from "./pages/customer/CartPage";
import StaffLoginPage from "./pages/customer/StaffLoginPage";

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
          path="/Restaurant_admin/settings"
          element={
            <AdminLayout role="Restaurant_admin">
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
        {/* CUSTOMER ROUTES */}
        <Route path="/customer" element={<MenuPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/customer/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/staff-login" element={<StaffLoginPage />} />
        {/* Duplicate customer-prefixed routes for links from customer pages */}
        <Route path="/customer/cart" element={<CartPage />} />
        <Route path="/customer/staff-login" element={<StaffLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
