// Backend/src/services/admin.analytics.service.js

import prisma from '../config/prisma.js';

/**
 * Admin Analytics Service
 * Platform admin only - provides platform-wide analytics
 */

// ============================================================
// PLATFORM DASHBOARD STATS
// ============================================================

export const getPlatformDashboardStats = async () => {
  const [
    totalRestaurants,
    totalUsers,
    totalOrders,
    totalRevenue,
    pendingRestaurants,
    activeRestaurants,
    suspendedRestaurants,
    platformAdmins,
    restaurantAdmins,
    waiters,
  ] = await Promise.all([
    prisma.restaurants.count(),
    prisma.users.count(),
    prisma.orders.count(),
    prisma.orders.aggregate({
      _sum: { total_price: true },
    }),
    prisma.restaurants.count({ where: { status: 'pending' } }),
    prisma.restaurants.count({ where: { status: 'active' } }),
    prisma.restaurants.count({ where: { status: 'suspended' } }),
    prisma.users.count({ where: { role: 'platform_admin' } }),
    prisma.users.count({ where: { role: 'restaurant_admin' } }),
    prisma.users.count({ where: { role: 'waiter' } }),
  ]);

  const pendingRegistrations = await prisma.restaurants.findMany({
    where: { status: 'pending' },
    include: {
      users_restaurants_owner_idTousers: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      restaurant_location: {
        select: {
          city: true,
          country: true,
        },
      },
      restaurant_verification: {
        select: {
          verification_status: true,
        },
      },
    },
    orderBy: { created_at: 'desc' },
    take: 10,
  });

  const dailyRevenue = await prisma.$queryRaw`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as order_count,
      SUM(total_price) as revenue
    FROM orders
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  const topItems = await prisma.order_items.groupBy({
    by: ['menu_item_id', 'item_name'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10,
  });

  return {
    summary: {
      totalRestaurants,
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.total_price || 0,
    },
    restaurantStatus: {
      active: activeRestaurants,
      pending: pendingRestaurants,
      suspended: suspendedRestaurants,
    },
    userRoles: {
      platformAdmins,
      restaurantAdmins,
      waiters,
    },
    pendingRegistrations: pendingRegistrations.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      owner: restaurant.users_restaurants_owner_idTousers,
      location: restaurant.restaurant_location?.[0] || null,
      status: restaurant.status,
      verificationStatus: restaurant.restaurant_verification?.[0]?.verification_status || 'pending',
      created_at: restaurant.created_at,
    })),
    dailyRevenue,
    topItems: topItems.map(item => ({
      name: item.item_name || `Item ${item.menu_item_id}`,
      quantity: item._sum.quantity || 0,
    })),
  };
};

// ============================================================
// PLATFORM REVENUE CHART
// ============================================================

export const getPlatformRevenueChart = async (days = 30) => {
  const revenueData = await prisma.$queryRaw`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as order_count,
      SUM(total_price) as revenue
    FROM orders
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  return revenueData;
};

// ============================================================
// PLATFORM ORDER DISTRIBUTION
// ============================================================

export const getPlatformOrderDistribution = async () => {
  const distribution = await prisma.orders.groupBy({
    by: ['status'],
    _count: true,
  });

  return distribution;
};

// ============================================================
// ALL RESTAURANTS ANALYTICS - FIXED
// ============================================================

export const getAllRestaurantsAnalytics = async () => {
  // ✅ Get restaurants with available _count fields
  const restaurants = await prisma.restaurants.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      created_at: true,
      owner_id: true,
      _count: {
        select: {
          categories: true,
          orders: true,
          qr_codes: true,
          feedbacks: true,
          // ✅ menu_items is NOT available here - we'll count it separately
        },
      },
      users_restaurants_owner_idTousers: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      restaurant_location: {
        select: {
          city: true,
          country: true,
        },
      },
      restaurant_verification: {
        select: {
          id: true,
          verification_status: true,
        },
      },
    },
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  // ✅ Count menu_items separately for each restaurant
  const restaurantsWithMenuCount = await Promise.all(
    restaurants.map(async (restaurant) => {
      const menuItemsCount = await prisma.menu_items.count({
        where: {
          categories: {
            restaurant_id: restaurant.id,
          },
        },
      });

      return {
        ...restaurant,
        _count: {
          ...restaurant._count,
          menu_items: menuItemsCount,
        },
      };
    })
  );

  // ✅ Add revenue per restaurant
  const restaurantsWithRevenue = await Promise.all(
    restaurantsWithMenuCount.map(async (restaurant) => {
      const revenue = await prisma.orders.aggregate({
        where: { restaurant_id: restaurant.id },
        _sum: { total_price: true },
      });
      
      return {
        ...restaurant,
        totalRevenue: revenue._sum.total_price || 0,
      };
    })
  );

  return restaurantsWithRevenue;
};

// ============================================================
// TOP RESTAURANTS BY REVENUE
// ============================================================

export const getTopRestaurants = async (limit = 10) => {
  const topRestaurants = await prisma.$queryRaw`
    SELECT 
      r.id,
      r.name,
      r.email,
      r.status,
      COUNT(o.id) as order_count,
      SUM(o.total_price) as total_revenue
    FROM restaurants r
    LEFT JOIN orders o ON o.restaurant_id = r.id
    WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY r.id
    ORDER BY total_revenue DESC
    LIMIT ${limit}
  `;

  return topRestaurants;
};