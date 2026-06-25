// src/pages/Restaurant_admin/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatsCard from "../../components/Restaurant_admin/dashboard/StatsCard";
import RecentOrdersTable from "../../components/Restaurant_admin/dashboard/RecentOrdersTable";
import QRCard from "../../components/Restaurant_admin/dashboard/QRCard";
import StaffOnDuty from "../../components/Restaurant_admin/dashboard/StaffOnDuty";
import InventoryAlert from "../../components/Restaurant_admin/dashboard/InventoryAlert";
import { orderService } from "../../services/index.js";
import { menuService } from "../../services/index.js";
import { staffService } from "../../services/index.js";
import { restaurantService } from "../../services/index.js";
import { analyticsService } from "../../services/index.js";
import { qrCodeAPI } from "../../services/api.js";

const Dashboard = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // ============================================================
  // STATE
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    totalOrders: 0,
    totalStaff: 0,
    todayOrders: 0,
    revenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);

  // ============================================================
  // FETCH DATA
  // ============================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentRestaurantId = getRestaurantId();

        // Fetch all data in parallel
        const [
          menuItemsResult,
          ordersResult,
          staffResult,
          restaurantResult,
          analyticsResult,
          qrResult,
        ] = await Promise.all([
          menuService.getMenuItems(),
          orderService.getAllOrders(),
          staffService.getAll(currentRestaurantId),
          restaurantService.getMyRestaurant(),
          analyticsService.getDashboardStats(),
          qrCodeAPI.getAll(),
        ]);

        console.log('[Dashboard] Staff result:', staffResult);

        // ✅ Process menu items
        const menuItems = menuItemsResult.success ? menuItemsResult.data : [];
        const totalMenuItems = menuItems.length || 0;

        // ✅ Process orders
        const ordersData = ordersResult.success ? ordersResult.data : [];
        const totalOrders = ordersData.length || 0;
        const todayOrders = ordersData.filter((order) => {
          const today = new Date().toDateString();
          const orderDate = new Date(order.created_at).toDateString();
          return orderDate === today;
        }).length || 0;

        // ✅ Process staff - FIXED
        let staffData = [];
        if (staffResult && staffResult.success) {
          staffData = Array.isArray(staffResult.data) ? staffResult.data : [];
        } else if (Array.isArray(staffResult)) {
          staffData = staffResult;
        } else if (staffResult && Array.isArray(staffResult.data)) {
          staffData = staffResult.data;
        } else {
          staffData = [];
        }
        console.log('[Dashboard] Staff data:', staffData);
        const totalStaff = staffData.length || 0;

        // ✅ Process restaurant
        const restaurantData = restaurantResult.success ? restaurantResult.data : null;

        // ✅ Process analytics
        const analyticsData = analyticsResult.success ? analyticsResult.data : null;

        // ✅ Process QR codes
        let qrData = [];
        if (qrResult && qrResult.success) {
          qrData = Array.isArray(qrResult.data) ? qrResult.data : [];
        } else if (Array.isArray(qrResult)) {
          qrData = qrResult;
        } else {
          qrData = [];
        }

        // ✅ Update stats
        setStats({
          totalMenuItems,
          totalOrders,
          totalStaff,
          todayOrders,
          revenue: analyticsData?.overview?.today_revenue || 0,
        });

        // ✅ Set orders (limit to recent 5)
        setOrders(ordersData.slice(0, 5));

        // ✅ Set staff (limit to recent/on-duty staff)
        setStaff(staffData.slice(0, 3));

        // ✅ Set restaurant
        setRestaurant(restaurantData);

        // ✅ Set QR codes
        setQrCodes(qrData);

        // ✅ Set inventory alerts (mock for now - will be replaced when inventory API is ready)
        setInventoryAlerts([
          { id: 1, item: "Chicken Breast", quantity: 5, threshold: 10 },
          { id: 2, item: "Tomatoes", quantity: 3, threshold: 8 },
          { id: 3, item: "Onions", quantity: 2, threshold: 6 },
        ]);

      } catch (err) {
        console.error("[Dashboard] Error fetching data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [restaurantId]);

  // ============================================================
  // HELPERS
  // ============================================================

  const getRestaurantId = () => {
    if (restaurantId) return restaurantId;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.restaurant_id) return user.restaurant_id;
    return null;
  };

  // ============================================================
  // QR CODE HANDLERS
  // ============================================================

  const handleDownloadQR = async () => {
    try {
      const currentRestaurantId = getRestaurantId();
      
      if (!currentRestaurantId) {
        alert('No restaurant found. Please ensure you are logged in.');
        return;
      }

      const restaurantResult = await restaurantService.getMyRestaurant();
      
      if (!restaurantResult.success || !restaurantResult.data) {
        alert('Failed to get restaurant QR code');
        return;
      }

      const restaurant = restaurantResult.data;
      const qrImageUrl = restaurant.qr_code;

      if (!qrImageUrl) {
        alert('No QR code found for this restaurant. Please generate one first.');
        return;
      }

      await downloadQRCode(qrImageUrl, `${restaurant.name}-qr-code`);
      
    } catch (error) {
      console.error('[Dashboard] Error downloading QR code:', error);
      alert('Failed to download QR code. Please try again.');
    }
  };

  const downloadQRCode = async (imageUrl, fileName) => {
    try {
      if (imageUrl.startsWith('data:image')) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
    } catch (error) {
      console.error('[Dashboard] Error downloading QR code:', error);
      throw new Error('Failed to download QR code');
    }
  };

  // ============================================================
  // OTHER HANDLERS
  // ============================================================

  const handleViewAllOrders = () => {
    const id = getRestaurantId();
    if (id) {
      navigate(`/Restaurant_admin/orders/${id}`);
    } else {
      navigate('/Restaurant_admin/orders');
    }
  };

  const handleCreateOrder = () => {
    const id = getRestaurantId();
    if (id) {
      navigate(`/waiter/order-for-customer/${id}`);
    } else {
      navigate('/waiter/order-for-customer');
    }
  };

  const handleManageShift = () => {
    console.log("Open shift management - Coming soon");
  };

  const handleDismissInventory = (id) => {
    setInventoryAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleRestock = (item) => {
    console.log("Navigate to restock page for:", item);
  };

  // ============================================================
  // RENDER - LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 space-y-6 max-w-[1200px]">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-96 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded mt-2 animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-48 animate-pulse bg-gray-100"></div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-48 animate-pulse bg-gray-100"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - ERROR STATE
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Dashboard</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - SUCCESS STATE
  // ============================================================

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-surface">
        <div className="p-8 space-y-6 max-w-[1200px]">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Real-time overview
              </p>
              <h2 className="text-black text-3xl md:text-5xl font-bold uppercase leading-none">
                {restaurant?.name || 'Restaurant'} Performance
              </h2>
              {restaurant && (
                <p className="text-gray-500 text-sm mt-1">
                  {restaurant.status === 'active' ? '🟢' : '🔴'} {restaurant.status}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateOrder}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="text-[18px] mr-1">+</span>
                <span>Create Order</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Menu Items"
              value={stats.totalMenuItems}
              icon="restaurant"
              badge="+12%"
              badgeColor="green"
            />
            <StatsCard
              title="Total Orders"
              value={stats.totalOrders}
              icon="shopping_bag"
              badge={`${stats.todayOrders} Today`}
              badgeColor="black"
            />
            <StatsCard
              title="Total Staff"
              value={stats.totalStaff}
              icon="person"
              badge="Active Now"
              badgeColor="neutral"
            />
          </div>

          {/* Main Section: Recent Orders & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrdersTable
                orders={orders}
                onViewAll={handleViewAllOrders}
              />
            </div>
            <div className="space-y-6">
              <QRCard 
                onDownload={handleDownloadQR} 
                restaurantId={getRestaurantId()}
                qrCodes={qrCodes}
              />
              <StaffOnDuty 
                staff={staff} 
                onManageShift={handleManageShift} 
              />
            </div>
          </div>

          {/* Inventory Alerts Section */}
          {inventoryAlerts.length > 0 && (
            <InventoryAlert
              itemCount={inventoryAlerts.length}
              alerts={inventoryAlerts}
              onDismiss={handleDismissInventory}
              onRestock={handleRestock}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;