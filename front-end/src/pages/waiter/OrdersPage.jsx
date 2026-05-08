import React, { useState, useEffect } from "react";
import OrderCard from "../../components/waiter/ordercard";
import KitchenStatusCard from "../../components/waiter/KitchenStatusCard";
import NewOrderCard from "../../components/waiter/NewOrderCard";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import data from "../../demo/data.json";

// Transform data.json to match OrderCard structure
const transformOrders = () => {
  const { orders, orderItems, menuItems } = data;

  return orders.map((order) => {
    // Get order items for this order
    const itemsForOrder = orderItems.filter(
      (item) => item.orderId === order.id,
    );

    // Join with menu items to get full item details
    const transformedItems = itemsForOrder.map((orderItem) => {
      const menuItem = menuItems.find((m) => m.id === orderItem.menuItemId);
      return {
        name: menuItem?.name || "Unknown Item",
        quantity: orderItem.quantity,
        price: orderItem.price,
        image: menuItem?.image || "",
      };
    });

    // Calculate time ago from createdAt
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const diffMs = now - createdAt;
    const diffMins = Math.floor(diffMs / 60000);
    const timeAgo =
      diffMins < 60
        ? `${diffMins} mins ago`
        : `${Math.floor(diffMins / 60)} hours ago`;

    return {
      id: order.orderCode,
      tableNumber: order.tableNumber,
      status: order.status.toUpperCase(),
      timeAgo: timeAgo,
      itemCount: itemsForOrder.length,
      items: transformedItems,
    };
  });
};

// Mock kitchen status data
const mockKitchenStatus = [
  { station: "Cold Station", percentage: 45 },
  { station: "Grill Station", percentage: 88, isHigh: true },
  { station: "Pastry Station", percentage: 20 },
];

const ActiveOrders = () => {
  const [orders, setOrders] = useState(transformOrders());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "PREPARING" } : order,
      ),
    );
  };

  const handleReject = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "REJECTED" } : order,
      ),
    );
  };

  const handleNotifyWaiter = (orderId) => {
    console.log("Notify waiter for order:", orderId);
  };

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return order.status === "PENDING";
    if (activeFilter === "verified") return order.status === "VERIFIED";
    if (activeFilter === "preparing") return order.status === "PREPARING";
    return true;
  });

  const getFilterCount = (filter) => {
    if (filter === "all") return orders.length;
    if (filter === "pending")
      return orders.filter((o) => o.status === "PENDING").length;
    if (filter === "verified")
      return orders.filter((o) => o.status === "VERIFIED").length;
    if (filter === "preparing")
      return orders.filter((o) => o.status === "PREPARING").length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar Navigation */}
      <Sidebar role="waiter" />

      {/* Top App Bar */}
      <TopHeader role="waiter" title="active" />

      {/* Main Content */}
      <main className="ml-64 p-8 pt-20 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {/* Custom Header with Title and Search */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Orders
              </h2>
              <span className="bg-black text-white px-2 py-1 text-xs font-bold rounded-full">
                {orders.length}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-200">
                <span className="material-symbols-outlined text-[18px]">
                  search
                </span>
                <input
                  className="bg-transparent border-none text-sm focus:ring-0 p-0 w-32"
                  placeholder="Search tables..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-6 mb-8 border-b border-gray-200">
            <button
              className={`pb-3 font-bold border-b-2 transition-colors ${
                activeFilter === "all"
                  ? "text-black border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Live ({getFilterCount("all")})
            </button>
            <button
              className={`pb-3 transition-colors ${
                activeFilter === "pending"
                  ? "text-black font-bold border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveFilter("pending")}
            >
              Pending ({getFilterCount("pending")})
            </button>
            <button
              className={`pb-3 transition-colors ${
                activeFilter === "verified"
                  ? "text-black font-bold border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveFilter("verified")}
            >
              Verified ({getFilterCount("verified")})
            </button>
            <button
              className={`pb-3 transition-colors ${
                activeFilter === "preparing"
                  ? "text-black font-bold border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveFilter("preparing")}
            >
              Preparing ({getFilterCount("preparing")})
            </button>
          </div>

          {/* Bento Grid of Order Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Order Cards */}
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onApprove={handleApprove}
                onReject={handleReject}
                onNotifyWaiter={handleNotifyWaiter}
              />
            ))}

            {/* New Order Card */}
            <NewOrderCard />

            {/* Kitchen Status Card */}
            <div className="col-span-1 lg:col-span-2">
              <KitchenStatusCard stations={mockKitchenStatus} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActiveOrders;
