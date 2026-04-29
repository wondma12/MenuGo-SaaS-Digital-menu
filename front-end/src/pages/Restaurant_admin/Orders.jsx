import React, { useState } from "react";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import Card from "../../components/ui/card";
import { RefreshCw, AlertCircle } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: "1001",
      tableNumber: 5,
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 15.99 },
        { name: "Coca Cola", quantity: 2, price: 3.5 },
      ],
      total: 38.98,
      status: "pending",
      createdAt: new Date().toISOString(),
      notes: "Extra cheese on pizza",
      isTakeaway: false,
    },
    {
      id: "1002",
      tableNumber: 12,
      items: [
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
      ],
      total: 13.98,
      status: "verified",
      createdAt: new Date().toISOString(),
      notes: "",
      isTakeaway: false,
    },
    {
      id: "1003",
      tableNumber: 8,
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 18.99 },
        { name: "Red Wine", quantity: 1, price: 12.99 },
      ],
      total: 31.98,
      status: "preparing",
      createdAt: new Date().toISOString(),
      notes: "No onions",
      isTakeaway: false,
    },
    {
      id: "1004",
      tableNumber: 3,
      items: [{ name: "Tiramisu", quantity: 2, price: 6.99 }],
      total: 13.98,
      status: "served",
      createdAt: new Date().toISOString(),
      notes: "",
      isTakeaway: false,
    },
    {
      id: "1005",
      tableNumber: 7,
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 15.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Coca Cola", quantity: 3, price: 3.5 },
      ],
      total: 35.48,
      status: "ready",
      createdAt: new Date().toISOString(),
      notes: "Make it spicy",
      isTakeaway: true,
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    date: "",
    sortBy: "newest",
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    if (filters.status !== "all" && order.status !== filters.status)
      return false;
    if (
      filters.search &&
      !order.id.includes(filters.search) &&
      !order.tableNumber.toString().includes(filters.search)
    )
      return false;
    if (filters.date) {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      if (orderDate !== filters.date) return false;
    }
    return true;
  });

  // Apply sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (filters.sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "highest":
        return b.total - a.total;
      case "lowest":
        return a.total - b.total;
      default:
        return 0;
    }
  });

  const getStatistics = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const verifiedOrders = orders.filter((o) => o.status === "verified").length;
    const preparingOrders = orders.filter(
      (o) => o.status === "preparing",
    ).length;
    const readyOrders = orders.filter((o) => o.status === "ready").length;
    const servedOrders = orders.filter((o) => o.status === "served").length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    return {
      totalOrders,
      pendingOrders,
      verifiedOrders,
      preparingOrders,
      readyOrders,
      servedOrders,
      totalRevenue,
      avgOrderValue: avgOrderValue.toFixed(2),
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-500">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pendingOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Verified</p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.verifiedOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500">Preparing</p>
          <p className="text-2xl font-bold text-purple-600">
            {stats.preparingOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-500">
          <p className="text-xs text-gray-500">Ready</p>
          <p className="text-2xl font-bold text-indigo-600">
            {stats.readyOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Served</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.servedOrders}
          </p>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-sm text-green-700">Total Revenue</p>
          <p className="text-3xl font-bold text-green-800">
            ${stats.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-700">Average Order Value</p>
          <p className="text-3xl font-bold text-blue-800">
            ${stats.avgOrderValue}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <OrdersTable
          orders={sortedOrders}
          onStatusChange={handleStatusChange}
          onFilterChange={handleFilterChange}
        />
      </Card>

      {/* Info Note */}
      <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">
            Order Status Guide
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Pending → Verified → Preparing → Ready → Served
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
