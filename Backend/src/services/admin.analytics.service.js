// Backend/src/services/admin.analytics.service.js

import prisma from '../config/prisma.js';

/**
 * Admin Analytics Service
 * Platform admin only - provides platform-wide analytics
 */

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Convert BigInt to Number for JSON serialization
 */
const convertBigInt = (value) => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
};

/**
 * Recursively convert all BigInts in an object/array to Numbers
 */
const convertBigInts = (obj) => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'bigint') {
    return Number(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertBigInts(item));
  }
  
  if (typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertBigInts(value);
    }
    return result;
  }
  
  return obj;
};

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
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  const topItems = await prisma.order_items.groupBy({
    by: ['menu_item_id', 'item_name'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10,
  });

  // ✅ Convert BigInts to Numbers
  const revenueValue = totalRevenue._sum.total_price || 0;
  const totalRevenueNumber = convertBigInt(revenueValue);

  // ✅ Convert dailyRevenue BigInts
  const convertedDailyRevenue = dailyRevenue.map(row => ({
    date: row.date,
    order_count: convertBigInt(row.order_count),
    revenue: convertBigInt(row.revenue),
  }));

  // ✅ Convert topItems BigInts
  const convertedTopItems = topItems.map(item => ({
    name: item.item_name || `Item ${item.menu_item_id}`,
    quantity: convertBigInt(item._sum.quantity || 0),
    menu_item_id: item.menu_item_id,
  }));

  const result = {
    summary: {
      totalRestaurants: convertBigInt(totalRestaurants),
      totalUsers: convertBigInt(totalUsers),
      totalOrders: convertBigInt(totalOrders),
      totalRevenue: totalRevenueNumber,
    },
    restaurantStatus: {
      active: convertBigInt(activeRestaurants),
      pending: convertBigInt(pendingRestaurants),
      suspended: convertBigInt(suspendedRestaurants),
    },
    userRoles: {
      platformAdmins: convertBigInt(platformAdmins),
      restaurantAdmins: convertBigInt(restaurantAdmins),
      waiters: convertBigInt(waiters),
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
    dailyRevenue: convertedDailyRevenue,
    topItems: convertedTopItems,
  };

  // ✅ Final safety check - convert any remaining BigInts
  return convertBigInts(result);
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
    WHERE created_at >= NOW() - (${days} * INTERVAL '1 day')
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  // ✅ Convert BigInts in revenueData
  const convertedData = revenueData.map(row => ({
    date: row.date,
    order_count: convertBigInt(row.order_count),
    revenue: convertBigInt(row.revenue),
  }));

  return convertedData;
};

// ============================================================
// PLATFORM ORDER DISTRIBUTION
// ============================================================

export const getPlatformOrderDistribution = async () => {
  const distribution = await prisma.orders.groupBy({
    by: ['status'],
    _count: true,
  });

  // ✅ Convert BigInts in distribution
  const convertedDistribution = distribution.map(item => ({
    status: item.status,
    _count: convertBigInt(item._count),
  }));

  return convertedDistribution;
};

// ============================================================
// ALL RESTAURANTS ANALYTICS
// ============================================================

export const getAllRestaurantsAnalytics = async () => {
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
          menu_items: convertBigInt(menuItemsCount),
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
      
      const revenueValue = revenue._sum.total_price || 0;
      
      return {
        ...restaurant,
        _count: {
          ...restaurant._count,
          orders: convertBigInt(restaurant._count.orders),
          categories: convertBigInt(restaurant._count.categories),
          qr_codes: convertBigInt(restaurant._count.qr_codes),
          feedbacks: convertBigInt(restaurant._count.feedbacks),
        },
        totalRevenue: convertBigInt(revenueValue),
      };
    })
  );

  // ✅ Final safety check
  return convertBigInts(restaurantsWithRevenue);
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
    WHERE o.created_at >= NOW() - INTERVAL '30 days'
    GROUP BY r.id
    ORDER BY total_revenue DESC
    LIMIT ${limit}
  `;

  // ✅ Convert BigInts in topRestaurants
  const convertedData = topRestaurants.map(row => ({
    id: row.id,
    name: row.name,
    email: row.email,
    status: row.status,
    order_count: convertBigInt(row.order_count),
    total_revenue: convertBigInt(row.total_revenue),
  }));

  return convertedData;
};