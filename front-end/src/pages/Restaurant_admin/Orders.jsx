// src/pages/Restaurant_admin/Orders.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import OrderTable from "../../components/Restaurant_admin/orders/OrdersTable";
import OrderFilter from "../../components/Restaurant_admin/orders/OrderFilter";
import CreateOrderModal from "../../components/Restaurant_admin/orders/CreateOrderModal";
import ViewOrderModal from "../../components/Restaurant_admin/orders/ViewOrderModal";
import orderService from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    preparing: 0,
    served: 0,
    total: 0,
    avgTime: "0m",
    efficiency: "0%",
  });
  const [selectedOrderForView, setSelectedOrderForView] = useState(null);
  const itemsPerPage = 5;

  // ============================================================
  // LOAD ORDERS
  // ============================================================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await orderService.getAllOrders();
      
      if (result.success) {
        // Transform API data to match component format
        const transformedOrders = result.data.map((order) => ({
          id: order.id,
          orderNumber: order.order_number || `#ORD-${order.id.slice(0, 8)}`,
          tableNumber: order.table_number || 'N/A',
          status: order.status || 'pending',
          totalPrice: order.total_price || 0,
          orderType: order.order_type || 'dine_in',
          customerNote: order.customer_note || '',
          items: order.order_items || [],
          createdAt: order.created_at,
          servedBy: order.users?.name || 'N/A',
        }));
        
        setOrders(transformedOrders);
        
        // Calculate stats from real data
        const pending = transformedOrders.filter(o => o.status === 'pending').length;
        const preparing = transformedOrders.filter(o => o.status === 'preparing').length;
        const verified = transformedOrders.filter(o => o.status === 'verified').length;
        const served = transformedOrders.filter(o => o.status === 'served').length;
        
        setStats({
          pending,
          preparing,
          verified,
          served,
          total: transformedOrders.length,
          avgTime: calculateAverageTime(transformedOrders),
          efficiency: calculateEfficiency(transformedOrders),
        });
      } else {
        setError(result.error || 'Failed to load orders');
      }
    } catch (err) {
      console.error('[Orders] Error loading orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // HELPERS
  // ============================================================

  const calculateAverageTime = (orders) => {
    // This would need actual timestamps from your backend
    // For now, return a mock value
    return '18m';
  };

  const calculateEfficiency = (orders) => {
    const total = orders.length;
    if (total === 0) return '0%';
    const served = orders.filter(o => o.status === 'served').length;
    return `${Math.round((served / total) * 100)}%`;
  };

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    loadOrders();
  }, []);

  // Filter and paginate
  useEffect(() => {
    let filtered = orders;
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.tableNumber.toString().includes(searchTerm)
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, statusFilter, searchTerm]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleStatusChange = async (newStatus) => {
    setStatusFilter(newStatus);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await orderService.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        await loadOrders(); // Refresh the list
      } else {
        alert(result.error || 'Failed to update order status');
      }
    } catch (error) {
      console.error('[Orders] Error updating status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  const handleCreateOrder = async (newOrder) => {
    try {
      const result = await orderService.createOrder(newOrder);
      if (result.success) {
        await loadOrders();
        setIsModalOpen(false);
      } else {
        alert(result.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('[Orders] Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrderForView(order);
  };

  // ============================================================
  // PAGINATION
  // ============================================================

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // ============================================================
  // RENDER - LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            {/* Skeleton Header */}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Skeleton Search */}
            <div className="h-12 w-64 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* Skeleton Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>

            {/* Skeleton Table */}
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Orders</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadOrders}
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
  // RENDER - SUCCESS
  // ============================================================

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-surface">
        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Real-time Dining Flow
              </p>
              <h2 className="text-black text-3xl md:text-5xl font-bold uppercase leading-none">
                Active Orders
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {orders.length} total orders • {stats.pending} pending • {stats.preparing} preparing
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <OrderFilter
                statusFilter={statusFilter}
                onStatusChange={handleStatusChange}
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="text-sm mr-1">+</span>
                <span>New Order</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search orders by ID or table..."
                className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 focus:border-black transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Pending
              </span>
              <p className="text-3xl font-bold text-black mt-2">{stats.pending}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Preparing
              </span>
              <p className="text-3xl font-bold text-black mt-2">{stats.preparing}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Served
              </span>
              <p className="text-3xl font-bold text-black mt-2">{stats.served}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Efficiency
              </span>
              <p className="text-3xl font-bold text-black mt-2">{stats.efficiency}</p>
            </div>
          </div>

          {/* Orders Table Container */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <OrderTable
              orders={paginatedOrders}
              onViewOrder={handleViewOrder}
              onUpdateStatus={handleUpdateOrderStatus}
            />

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="px-6 py-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between bg-neutral-50/50 gap-2">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                  {filteredOrders.length} orders
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
                  >
                    ←
                  </button>
                  {[1, 2, 3].map((page) => {
                    if (page <= totalPages) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 flex items-center justify-center border rounded font-bold text-xs transition-colors ${
                            currentPage === page
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white hover:bg-neutral-100 text-black"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Asymmetric Layout Section for Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-neutral-200 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Kitchen Load Analysis</h3>
                <div className="h-64 bg-neutral-50 flex items-end justify-between px-6 py-4 space-x-4 rounded">
                  <div className="w-full bg-neutral-200 h-[30%] rounded"></div>
                  <div className="w-full bg-neutral-300 h-[60%] rounded"></div>
                  <div className="w-full bg-black h-[85%] rounded"></div>
                  <div className="w-full bg-neutral-400 h-[50%] rounded"></div>
                  <div className="w-full bg-neutral-200 h-[20%] rounded"></div>
                  <div className="w-full bg-neutral-300 h-[40%] rounded"></div>
                  <div className="w-full bg-neutral-800 h-[70%] rounded"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <span>10:00</span>
                  <span>11:00</span>
                  <span>12:00</span>
                  <span>13:00</span>
                  <span>14:00</span>
                  <span>15:00</span>
                  <span>16:00</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-black text-white p-6 rounded-xl relative overflow-hidden">
                <h3 className="font-bold text-lg mb-2">Premium Account</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Your restaurant is currently handling peak volume with{" "}
                  {stats.efficiency} efficiency.
                </p>
                <button className="bg-white text-black font-medium text-sm px-4 py-2 rounded-lg w-full">
                  Upgrade Plan
                </button>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              </div>
              <div className="bg-white border border-neutral-200 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Live Alerts</h3>
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-neutral-400 text-lg">⚠️</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Delay Alert
                      </p>
                      <p className="text-xs text-neutral-500">
                        Table 04 dish exceeds 20m.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-neutral-400 text-lg">✓</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Supply Check
                      </p>
                      <p className="text-xs text-neutral-500">
                        Inventory sync completed.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateOrder}
      />
      <ViewOrderModal
        order={selectedOrderForView}
        onClose={() => setSelectedOrderForView(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
};

export default Orders;