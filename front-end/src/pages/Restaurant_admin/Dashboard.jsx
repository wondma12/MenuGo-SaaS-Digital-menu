import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to the MenuGo admin dashboard. Manage your restaurant's menu,
          orders, and settings here.
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to MenuGo Admin
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This is your admin dashboard where you can manage your restaurant's
            digital menu, track orders, manage staff, and configure your
            restaurant settings.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Menu Management</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add, edit, and remove menu items
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Orders</h3>
              <p className="text-sm text-gray-600 mt-1">
                Track and manage customer orders
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Staff</h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage your restaurant staff
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Settings</h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure restaurant settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <p className="text-gray-600">
          Use the navigation menu to access different sections of your admin
          dashboard.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
