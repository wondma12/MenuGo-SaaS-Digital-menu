import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, Users, DollarSign, 
  Clock, Target, ArrowUp, ArrowDown, Activity 
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "$48,295",
      change: "+12.5%",
      trend: "up",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Users,
      label: "Total Customers",
      value: "2,847",
      change: "+18.2%",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      label: "Avg. Order Value",
      value: "$42.50",
      change: "+8.1%",
      trend: "up",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Clock,
      label: "Avg. Prep Time",
      value: "12 min",
      change: "-15%",
      trend: "down",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  const chartData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 85 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 90 },
    { day: "Sat", value: 95 },
    { day: "Sun", value: 80 }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Analytics Dashboard
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Real-Time{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make data-driven decisions with our powerful analytics dashboard
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="h-4 w-48 bg-white/10 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10" />
                <div className="w-8 h-8 rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 lg:p-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                  <div className="flex gap-2">
                    {['Week', 'Month', 'Year'].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                          period === 'Week'
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end gap-3 h-48">
                  {chartData.map((item) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full bg-gradient-to-t from-primary to-primary-dark rounded-t-lg relative group"
                        style={{ maxHeight: '200px' }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                          {item.value}%
                        </div>
                      </motion.div>
                      <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Items */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h3>
                <div className="space-y-4">
                  {[
                    { name: "Margherita Pizza", orders: 245, percentage: 85 },
                    { name: "Caesar Salad", orders: 189, percentage: 65 },
                    { name: "Grilled Salmon", orders: 156, percentage: 55 },
                    { name: "Pasta Carbonara", orders: 134, percentage: 45 },
                    { name: "Tiramisu", orders: 98, percentage: 35 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.orders} orders</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
                <span className="relative flex h-2 w-2 ml-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "New order: Table 7 - 2x Margherita Pizza",
                  "Payment received: Table 3 - $84.50",
                  "Order completed: Table 12 - Pasta Carbonara",
                  "New customer feedback: 5 stars ⭐",
                  "Staff member 'John' clocked in"
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {activity}
                    <span className="text-xs text-gray-400 ml-auto">Just now</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;