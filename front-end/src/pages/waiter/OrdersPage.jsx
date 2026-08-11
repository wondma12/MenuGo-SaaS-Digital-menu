import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OrderCard from "../../components/waiter/ordercard";
import KitchenStatusCard from "../../components/waiter/KitchenStatusCard";
import NewOrderCard from "../../components/waiter/NewOrderCard";
import data from "../../demo/data.json";


const transformOrders = () => {
  const { orders = [], order_items = [], menu_items = [] } = data;

  return orders.map((order) => {
    const itemsForOrder = order_items.filter(
      (item) => item.order_id === order.id,
    );

    const transformedItems = itemsForOrder.map((orderItem) => {
      const menuItem = menu_items.find((m) => m.id === orderItem.menu_item_id);
      return {
        name: menuItem?.name || orderItem.item_name || "Unknown Item",
        quantity: orderItem.quantity || 0,
        price: orderItem.item_price ?? orderItem.price ?? 0,
        image: menuItem?.image || "",
      };
    });

    const createdAt = new Date(order.created_at || order.createdAt || Date.now());
    const now = new Date();
    const diffMs = now - createdAt;
    const diffMins = Math.floor(diffMs / 60000);
    const timeAgo =
      diffMins < 60
        ? `${diffMins} mins ago`
        : `${Math.floor(diffMins / 60)} hours ago`;

    return {
      id: order.order_number || order.orderCode || order.id,
      tableNumber: order.table_number || order.tableNumber || "-",
      status: (order.status || "").toUpperCase(),
      timeAgo,
      itemCount: itemsForOrder.length,
      items: transformedItems,
    };
  });
};


const mockKitchenStatus = [
  { station: "Cold Station", percentage: 45 },
  { station: "Grill Station", percentage: 88, isHigh: true },
  { station: "Pastry Station", percentage: 20 },
];

const OrdersPage = () => {
  const { restaurantId } = useParams();
  const [orders, setOrders] = useState(transformOrders());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "PREPARING" } : order,
      ),
    );
  };

  const handleReject = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "REJECTED" } : order,
      ),
    );
  };

  const handleNotifyWaiter = (orderId) => {
    console.log("Notify waiter for order:", orderId);
  };

  const filteredOrders = orders.filter((order) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && order.status === "PENDING") ||
      (activeFilter === "verified" && order.status === "VERIFIED") ||
      (activeFilter === "preparing" && order.status === "PREPARING");

    if (!matchesFilter) return false;
    if (!normalizedSearch) return true;

    return [order.tableNumber, order.id, order.status]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
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
    <div className="min-h-full bg-gray-50 text-gray-900">
      <div className="p-8 pt-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Waiter Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Orders</h1>
            {restaurantId && (
              <p className="text-sm text-gray-500">Restaurant ID: {restaurantId}</p>
            )}
          </div>
          <div className="flex flex-col gap-4 justify-between items-start lg:items-center lg:flex-row mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Waiter Dashboard</p>
                <h1 className="text-3xl font-semibold text-slate-900">Orders</h1>
                {restaurantId && (
                  <p className="text-sm text-gray-500">Restaurant ID: {restaurantId}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm w-full sm:w-auto">
                <span className="material-symbols-outlined text-[18px] text-gray-500">
                  search
                </span>
                <input
                  className="bg-transparent border-none text-sm focus:ring-0 p-0 w-full sm:w-48"
                  placeholder="Search tables, IDs, status"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 text-gray-700 rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center justify-center min-w-[130px] shadow-sm">
                <span className="mr-2">Total</span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                  {orders.length}
                </span>
              </div>
            </div>
          </div>

          {}
          <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-4">
            {[
              { label: "All Live", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Verified", value: "verified" },
              { label: "Preparing", value: "preparing" },
            ].map((filter) => (
              <button
                key={filter.value}
                className={`rounded-full px-4 py-2 text-sm transition-all whitespace-nowrap ${
                  activeFilter === filter.value
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label} ({getFilterCount(filter.value)})
              </button>
            ))}
          </div>

          {}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.length ? (
                filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onNotifyWaiter={handleNotifyWaiter}
                  />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
                  No orders match your filter or search.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <NewOrderCard />
              <KitchenStatusCard stations={mockKitchenStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
