import prisma from '../config/prisma.js';

export const getDashboardStats = async (restaurantId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Get today's stats
  const todayStats = await prisma.orders.aggregate({
    where: {
      restaurant_id: restaurantId,
      created_at: { gte: today }
    },
    _count: true,
    _sum: { total_price: true }
  });
  
  // Get weekly stats
  const weeklyStats = await prisma.orders.aggregate({
    where: {
      restaurant_id: restaurantId,
      created_at: { gte: startOfWeek }
    },
    _count: true,
    _sum: { total_price: true }
  });
  
  // Get monthly stats
  const monthlyStats = await prisma.orders.aggregate({
    where: {
      restaurant_id: restaurantId,
      created_at: { gte: startOfMonth }
    },
    _count: true,
    _sum: { total_price: true }
  });
  
  // Get menu items count
  const menuStats = await prisma.menu_items.aggregate({
    where: {
      categories: { restaurant_id: restaurantId }
    },
    _count: true
  });
  
  const availableItems = await prisma.menu_items.count({
    where: {
      categories: { restaurant_id: restaurantId },
      status: 'available'
    }
  });
  
  // Get QR code scans
  const qrScans = await prisma.qr_codes.aggregate({
    where: { restaurant_id: restaurantId },
    _sum: { scan_count: true }
  });
  
  // Get recent orders
  const recentOrders = await prisma.orders.findMany({
    where: { restaurant_id: restaurantId },
    include: {
      order_items: true,
      users: {
        select: { name: true }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 10
  });
  
  // Get top selling items
  const topItems = await prisma.order_items.groupBy({
    by: ['menu_item_id', 'item_name'],
    where: {
      orders: { restaurant_id: restaurantId }
    },
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5
  });
  
  return {
    overview: {
      today_orders: todayStats._count,
      today_revenue: todayStats._sum.total_price || 0,
      weekly_orders: weeklyStats._count,
      weekly_revenue: weeklyStats._sum.total_price || 0,
      monthly_orders: monthlyStats._count,
      monthly_revenue: monthlyStats._sum.total_price || 0,
      total_menu_items: menuStats._count,
      available_items: availableItems,
      total_qr_scans: qrScans._sum.scan_count || 0
    },
    recent_orders: recentOrders,
    top_selling_items: topItems
  };
};

export const getRevenueChart = async (restaurantId, days = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const revenue = await prisma.$queryRaw`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as order_count,
      SUM(total_price) as revenue,
      COUNT(DISTINCT table_number) as unique_tables
    FROM orders
    WHERE restaurant_id = ${restaurantId}
      AND created_at >= ${startDate}
      AND status = 'served'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;
  
  return revenue;
};

export const getOrderStatusDistribution = async (restaurantId) => {
  const distribution = await prisma.orders.groupBy({
    by: ['status'],
    where: { restaurant_id: restaurantId },
    _count: true
  });
  
  return distribution;
};