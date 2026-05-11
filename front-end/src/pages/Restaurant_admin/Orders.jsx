// src/pages/Restaurant_admin/Orders.jsx
import React, { useState, useEffect } from "react";
import OrderTable from "../../components/Restaurant_admin/orders/OrdersTable";
import OrderFilter from "../../components/Restaurant_admin/orders/OrderFilter";
import CreateOrderModal from "../../components/Restaurant_admin/orders/CreateOrderModal";
import ViewOrderModal from "../../components/Restaurant_admin/orders/ViewOrderModal";
import { orderService } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    pending: 0,
    preparing: 0,
    avgTime: "18m",
    efficiency: "94%",
  });
  const [selectedOrderForView, setSelectedOrderForView] = useState(null);
  const itemsPerPage = 5;

  // Load orders
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await orderService.getAllOrders();
    setOrders(data);
    const statsData = await orderService.getStats();
    setStats(statsData);
  };

  // Filter and paginate
  useEffect(() => {
    let filtered = orders;
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.tableNumber.toString().includes(searchTerm),
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, statusFilter, searchTerm]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleStatusChange = async (newStatus) => {
    setStatusFilter(newStatus);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    await loadOrders();
  };

  const handleCreateOrder = async (newOrder) => {
    await orderService.createOrder(newOrder);
    await loadOrders();
  };

  const handleViewOrder = (order) => {
    setSelectedOrderForView(order);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 h-16 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></span>
              <input
                type="text"
                placeholder="Search orders by ID or table..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 focus:border-black transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              aria-label="Notifications"
              title="Notifications"
              className="p-2 rounded-sm hover:bg-neutral-100 transition-all duration-200 text-neutral-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.73 21a2 2 0 01-3.46 0"
                />
              </svg>
            </button>
            <button
              aria-label="Account"
              title="Account"
              className="p-2 rounded-sm hover:bg-neutral-100 transition-all duration-200 text-neutral-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 20a8 8 0 0116 0"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-[1200px] mx-auto">
          {/* Header section */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface mb-xs">
                Active Orders
              </h1>
              <p className="font-body-md text-secondary">
                Monitor and manage real-time dining room flow.
              </p>
            </div>
            <div className="flex space-x-4">
              <OrderFilter
                statusFilter={statusFilter}
                onStatusChange={handleStatusChange}
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>New Order</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                Pending
              </span>
              <p className="font-display text-h1 mt-2">{stats.pending}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                Preparing
              </span>
              <p className="font-display text-h1 mt-2">{stats.preparing}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                Avg. Time
              </span>
              <p className="font-display text-h1 mt-2">{stats.avgTime}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                Efficiency
              </span>
              <p className="font-display text-h1 mt-2">{stats.efficiency}</p>
            </div>
          </div>

          {/* Orders Table Container */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <OrderTable
              orders={paginatedOrders}
              onViewOrder={handleViewOrder}
            />

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <p className="font-body-sm text-neutral-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} active orders
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm"></span>
                </button>
                {[1, 2].map((page) => (
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
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Asymmetric Layout Section for Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-neutral-200 p-6 rounded-xl">
                <h3 className="font-h3 text-h3 mb-4">Kitchen Load Analysis</h3>
                <div className="h-64 bg-neutral-50 flex items-end justify-between px-6 py-4 space-x-4 rounded">
                  <div className="w-full bg-neutral-200 h-[30%]"></div>
                  <div className="w-full bg-neutral-300 h-[60%]"></div>
                  <div className="w-full bg-black h-[85%]"></div>
                  <div className="w-full bg-neutral-400 h-[50%]"></div>
                  <div className="w-full bg-neutral-200 h-[20%]"></div>
                  <div className="w-full bg-neutral-300 h-[40%]"></div>
                  <div className="w-full bg-neutral-800 h-[70%]"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-label-caps text-secondary uppercase tracking-tighter">
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
                <h3 className="font-h3 text-h3 mb-2">Premium Account</h3>
                <p className="text-neutral-400 font-body-sm mb-4">
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
                  <h3 className="font-h3 text-h3">Live Alerts</h3>
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-neutral-400 text-lg">
                      warning
                    </span>
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
                    <span className="material-symbols-outlined text-neutral-400 text-lg">
                      check_circle
                    </span>
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
        </main>
      </div>

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateOrder}
      />
      <ViewOrderModal
        order={selectedOrderForView}
        onClose={() => setSelectedOrderForView(null)}
      />
    </div>
  );
};

export default Orders;
