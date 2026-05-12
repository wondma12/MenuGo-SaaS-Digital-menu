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
// resturamat Admin Pages
import DashboardPage from "./pages/Restaurant_admin/Dashboard";
import MenuManagementPage from "./pages/Restaurant_admin/MenuManagement";
import Restaurant_adminOrders from "./pages/Restaurant_admin/Orders";
import StaffManagement from "./pages/Restaurant_admin/StaffManagement";
import RestuarantSettings from "./pages/Restaurant_admin/Settings";
// Waiter Routes
import OrdersPage from "./pages/waiter/OrdersPage";
import ActiveOrders from "./pages/waiter/ActiveOrders";
import OrderForCustomer from "./pages/waiter/OrderForCustomer";
// Platform Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import Restaurants from "./pages/Admin/Restaurants";
import RestaurantDetail from "./pages/Admin/RestaurantDetail";
import Users from "./pages/Admin/Users";
import Security from "./pages/Admin/Security";
import Settings from "./pages/Admin/settings_clean";
//customer
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
          path="/Restaurant_admin/dashboard/:restaurantId"
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
          path="/Restaurant_admin/orders/:restaurantId"
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
          path="/Restaurant_admin/menu/:restaurantId"
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
          path="/Restaurant_admin/staff/:restaurantId"
          element={
            <AdminLayout role="Restaurant_admin">
              <StaffManagement />
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
        <Route
          path="/Restaurant_admin/RestuarantSettings/:restaurantId"
          element={
            <AdminLayout role="Restaurant_admin">
              <RestuarantSettings />
            </AdminLayout>
          }
        />

        {/* PLATFORM ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/restaurants/:id" element={<RestaurantDetail />} />
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
        <Route
          path="/waiter/orders/:restaurantId"
          element={
            <AdminLayout role="waiter">
              <OrdersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/waiter/active"
          element={
            <AdminLayout role="waiter">
              <ActiveOrders />
            </AdminLayout>
          }
        />
        <Route
          path="/waiter/active/:restaurantId"
          element={
            <AdminLayout role="waiter">
              <ActiveOrders />
            </AdminLayout>
          }
        />
        <Route
          path="/waiter/order-for-customer"
          element={
            <AdminLayout role="waiter">
              <OrderForCustomer />
            </AdminLayout>
          }
        />
        <Route
          path="/waiter/order-for-customer/:restaurantId"
          element={
            <AdminLayout role="waiter">
              <OrderForCustomer />
            </AdminLayout>
          }
        />
        {/* CUSTOMER ROUTES */}
        <Route path="/customer/:restaurantId" element={<MenuPage />} />
        <Route path="/customer/:restaurantId/search" element={<SearchPage />} />
        <Route path="/customer/:restaurantId/cart" element={<CartPage />} />
        <Route path="/restaurant/:restaurantId" element={<MenuPage />} />
        <Route path="/restaurant/:restaurantId/cart" element={<CartPage />} />
        <Route
          path="/restaurant/:restaurantId/staff-login"
          element={<StaffLoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
