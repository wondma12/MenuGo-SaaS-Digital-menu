// Backend/src/services/restaurant.service.js

import prisma from '../config/prisma.js';

export const createRestaurant = async (restaurantData, ownerId) => {
  const { name, email, phone, description, logo, banner, slogan, website_url } = restaurantData;

  // Create restaurant
  const restaurant = await prisma.restaurants.create({
    data: {
      name,
      email,
      phone,
      description,
      logo,
      banner,
      slogan,
      website_url,
      owner_id: ownerId,
      status: 'pending',
      subscription_plan: 'basic',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  });

  // Update user's restaurant_id
  await prisma.users.update({
    where: { id: ownerId },
    data: { restaurant_id: restaurant.id }
  });

  return restaurant;
};

export const getAllRestaurants = async (page = 1, limit = 10, status = null) => {
  const skip = (page - 1) * limit;
  
  const where = {};
  if (status) {
    where.status = status;
  }

  const [restaurants, total] = await Promise.all([
    prisma.restaurants.findMany({
      where,
      skip,
      take: limit,
      include: {
        users_restaurants_owner_idTousers: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            categories: true,
            orders: true
            // ✅ menu_items REMOVED - doesn't exist in _count
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    }),
    prisma.restaurants.count({ where })
  ]);

  return {
    restaurants,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getRestaurantById = async (restaurantId, userId, userRole) => {
  const where = { id: restaurantId };
  
  // If not admin, only return if user belongs to this restaurant
  if (userRole !== 'platform_admin') {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { restaurant_id: true }
    });
    
    if (user.restaurant_id !== restaurantId) {
      throw new Error('Access denied');
    }
  }

  const restaurant = await prisma.restaurants.findUnique({
    where,
    include: {
      users_restaurants_owner_idTousers: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      restaurant_location: true,
      restaurant_verification: true,
      categories: {
        orderBy: { display_order: 'asc' }
      },
      _count: {
        select: {
          orders: true,
          qr_codes: true
          // ✅ menu_items REMOVED - doesn't exist in _count
        }
      }
    }
  });

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
};

export const updateRestaurant = async (restaurantId, updateData, userId, userRole) => {
  // Check access
  if (userRole !== 'platform_admin') {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { restaurant_id: true }
    });
    
    if (user.restaurant_id !== restaurantId) {
      throw new Error('Access denied');
    }
  }

  const restaurant = await prisma.restaurants.update({
    where: { id: restaurantId },
    data: updateData
  });

  return restaurant;
};

export const updateRestaurantStatus = async (restaurantId, status, reviewedBy) => {
  const restaurant = await prisma.restaurants.update({
    where: { id: restaurantId },
    data: { status }
  });

  return restaurant;
};

export const getMyRestaurant = async (userId) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      restaurant_id: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const include = {
    categories: {
      orderBy: { display_order: 'asc' },
      include: {
        menu_items: {
          where: { status: 'available' }
        }
      }
    },
    restaurant_location: true,
    qr_codes: {
      where: { is_active: true }
    }
  };

  let restaurant = null;

  if (user.restaurant_id) {
    restaurant = await prisma.restaurants.findUnique({
      where: { id: user.restaurant_id },
      include
    });
  }

  if (!restaurant) {
    restaurant = await prisma.restaurants.findFirst({
      where: { owner_id: userId },
      include
    });
  }

  if (!restaurant) {
    throw new Error('No restaurant found for this user');
  }

  return restaurant;
};