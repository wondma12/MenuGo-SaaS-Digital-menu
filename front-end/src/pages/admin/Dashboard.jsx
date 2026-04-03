import React, { useState } from "react";
import StatCard from "../../components/admin/dashboard/StatCard";
import PopularItems from "../../components/admin/dashboard/PopularItems";
import AnalyticsChart from "../../components/admin/dashboard/AnalyticsChart";
import OrdersSummary from "../../components/admin/dashboard/OrdersSummary";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { 
  ShoppingBag, 
  Utensils, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Zap,
  Award,
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = {
    totalMenuItems: 24,
    ordersToday: 18,
    ordersThisWeek: 156,
    totalRevenue: 4250,
    avgOrderValue: 27.24,
    totalCustomers: 89,
    menuViews: 1234,
    conversionRate: "12.5%"
  };

  const popularItems = [
    { name: "Margherita Pizza", orders: 45, price: "$15.99", revenue: "719.55" },
    { name: "Caesar Salad", orders: 38, price: "$8.99", revenue: "341.62" },
    { name: "Pasta Carbonara", orders: 32, price: "$18.99", revenue: "607.68" },
    { name: "Garlic Bread", orders: 28, price: "$4.99", revenue: "139.72" },
    { name: "Tiramisu", orders: 25, price: "$6.99", revenue: "174.75" },
  ];

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    orders: [12, 19, 15, 17, 24, 35, 28],
    revenue: [240, 380, 300, 340, 480, 700, 560]
  };

  const recentOrders = [
    { id: "1001", table: 5, items: 3, total: 45.5, status: "pending", time: "2 mins ago", customer: "John D." },
    { id: "1002", table: 12, items: 2, total: 34.0, status: "verified", time: "5 mins ago", customer: "Sarah M." },
    { id: "1003", table: 8, items: 4, total: 67.25, status: "preparing", time: "10 mins ago", customer: "Mike R." },
    { id: "1004", table: 3, items: 1, total: 15.5, status: "served", time: "15 mins ago", customer: "Emma W." },
    { id: "1005", table: 7, items: 2, total: 28.75, status: "ready", time: "20 mins ago", customer: "David L." },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your restaurant.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={18} />
          </button>
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            {["day", "week", "month"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Menu Items"
          value={stats.totalMenuItems}
          icon={Utensils}
          color="orange"
          trend="up"
          trendValue="+3 this month"
          subtitle="24 active items"
        />
        <StatCard
          title="Orders Today"
          value={stats.ordersToday}
          icon={Calendar}
          color="blue"
          trend="up"
          trendValue="+12% vs yesterday"
          subtitle="Peak at 7 PM"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={DollarSign}
          color="green"
          trend="up"
          trendValue="+8% this week"
          subtitle="This month: $12,450"
        />
        <StatCard
          title="Menu Views"
          value={stats.menuViews}
          icon={Eye}
          color="purple"
          trend="up"
          trendValue="+23% this week"
          subtitle="Avg. 176 per day"
        />
      </div>

      {/* Stats Grid - Row 2 - Gradient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Orders This Week</p>
              <p className="text-3xl font-bold mt-1">{stats.ordersThisWeek}</p>
              <p className="text-blue-100 text-xs mt-2">↑ 12% from last week</p>
            </div>
            <ShoppingBag size={28} className="text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Avg. Order Value</p>
              <p className="text-3xl font-bold mt-1">${stats.avgOrderValue}</p>
              <p className="text-green-100 text-xs mt-2">↑ $2.50 from last month</p>
            </div>
            <TrendingUp size={28} className="text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Total Customers</p>
              <p className="text-3xl font-bold mt-1">{stats.totalCustomers}</p>
              <p className="text-purple-100 text-xs mt-2">+23 new this week</p>
            </div>
            <Users size={28} className="text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-pink-100 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold mt-1">{stats.conversionRate}</p>
              <p className="text-pink-100 text-xs mt-2">↑ 2.5% from last week</p>
            </div>
            <Zap size={28} className="text-pink-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart data={weeklyData} type="orders" />
        <AnalyticsChart data={weeklyData} type="revenue" />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders 
            orders={recentOrders} 
            onViewAll={() => console.log("View all")}
            onViewOrder={(order) => console.log("View order", order)}
          />
        </div>
        <div>
          <PopularItems items={popularItems} />
        </div>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button label="Add Menu Item" variant="primary" className="w-full" icon={Utensils} />
          <Button label="View Orders" variant="secondary" className="w-full" icon={ShoppingBag} />
          <Button label="Generate QR Code" variant="secondary" className="w-full" icon={Eye} />
          <Button label="View Reports" variant="secondary" className="w-full" icon={TrendingUp} />
        </div>
      </Card>

      {/* Achievement Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 border border-yellow-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Award size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Congratulations! 🎉</p>
              <p className="text-sm text-gray-600">You've reached 1000 total orders this month!</p>
            </div>
          </div>
          <Button label="Share Achievement" variant="secondary" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;