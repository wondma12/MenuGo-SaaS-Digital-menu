import prisma from '../config/prisma.js';


export const createOrder = async (orderData, userId, restaurantId) => {
  const { 
    table_number, 
    order_type = 'dine_in', 
    customer_note,
    items 
  } = orderData;

  // Validate items
  if (!items || items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  // Verify all menu items exist and belong to the restaurant
  let total_price = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = await prisma.menu_items.findFirst({
      where: {
        id: item.menu_item_id,
        categories: {
          restaurant_id: restaurantId
        },
        status: 'available'
      }
    });

    if (!menuItem) {
      throw new Error(`Menu item ${item.menu_item_id} not found or unavailable`);
    }

    const quantity = item.quantity || 1;
    const itemPrice = parseFloat(menuItem.price);
    const subtotal = itemPrice * quantity;
    total_price += subtotal;

    orderItems.push({
      menu_item_id: item.menu_item_id,
      item_name: menuItem.name,
      item_price: itemPrice,
      quantity: quantity
    });
  }

  // Generate unique order number
  const order_number = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Create order
  const order = await prisma.orders.create({
    data: {
      order_number,
      restaurant_id: restaurantId,
      served_by: userId,
      table_number,
      order_type,
      customer_note,
      total_price,
      status: 'pending',
      order_items: {
        create: orderItems
      }
    },
    include: {
      order_items: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      restaurants: {
        select: {
          id: true,
          name: true,
          logo: true
        }
      }
    }
  });

  return order;
};

export const getAllOrders = async (restaurantId, filters = {}, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  
  const where = {
    restaurant_id: restaurantId
  };

  // Apply filters
  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.order_type) {
    where.order_type = filters.order_type;
  }

  if (filters.table_number) {
    where.table_number = filters.table_number;
  }

  if (filters.order_number) {
    where.order_number = { contains: filters.order_number };
  }

  if (filters.start_date && filters.end_date) {
    where.created_at = {
      gte: new Date(filters.start_date),
      lte: new Date(filters.end_date)
    };
  }

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where,
      include: {
        order_items: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    }),
    prisma.orders.count({ where })
  ]);

  // Calculate statistics
  const stats = await prisma.orders.aggregate({
    where: { restaurant_id: restaurantId },
    _sum: { total_price: true },
    _count: true,
    _avg: { total_price: true }
  });

  const statusCounts = await prisma.orders.groupBy({
    by: ['status'],
    where: { restaurant_id: restaurantId },
    _count: true
  });

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    statistics: {
      total_orders: stats._count,
      total_revenue: stats._sum.total_price || 0,
      average_order_value: stats._avg.total_price || 0,
      status_breakdown: statusCounts
    }
  };
};

export const getOrderById = async (orderId, restaurantId, userRole, userId) => {
  const where = { id: orderId };
  
  // If not platform admin, restrict to restaurant
  if (userRole !== 'platform_admin') {
    where.restaurant_id = restaurantId;
  }

  const order = await prisma.orders.findFirst({
    where,
    include: {
      order_items: {
        include: {
          menu_items: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      restaurants: {
        select: {
          id: true,
          name: true,
          logo: true,
          banner: true,
          phone: true,
          email: true
        }
      }
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

export const updateOrderStatus = async (orderId, restaurantId, status, userId, userRole) => {
  // Validate status
  const validStatuses = ['pending', 'verified', 'preparing', 'served'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const where = { id: orderId };
  
  // If not platform admin, restrict to restaurant
  if (userRole !== 'platform_admin') {
    where.restaurant_id = restaurantId;
  }

  const order = await prisma.orders.findFirst(where);

  if (!order) {
    throw new Error('Order not found');
  }

  // Status transition validation
  const statusFlow = {
    pending: ['verified', 'preparing'],
    verified: ['preparing'],
    preparing: ['served'],
    served: []
  };

  if (!statusFlow[order.status].includes(status)) {
    throw new Error(`Cannot change order status from ${order.status} to ${status}`);
  }

  const updatedOrder = await prisma.orders.update({
    where: { id: orderId },
    data: { 
      status,
      updated_at: new Date()
    },
    include: {
      order_items: true,
      users: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return updatedOrder;
};

export const getActiveOrders = async (restaurantId) => {
  const activeOrders = await prisma.orders.findMany({
    where: {
      restaurant_id: restaurantId,
      status: {
        in: ['pending', 'verified', 'preparing']
      }
    },
    include: {
      order_items: true,
      users: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: [
      { status: 'asc' },
      { created_at: 'asc' }
    ]
  });

  return activeOrders;
};

export const getOrderHistory = async (restaurantId, startDate, endDate, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  
  const where = {
    restaurant_id: restaurantId,
    status: 'served'
  };

  if (startDate && endDate) {
    where.created_at = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where,
      include: {
        order_items: true,
        users: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    }),
    prisma.orders.count({ where })
  ]);

  // Calculate daily revenue
  const dailyRevenue = await prisma.$queryRaw`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as order_count,
      SUM(total_price) as revenue
    FROM orders
    WHERE restaurant_id = ${restaurantId}
      AND status = 'served'
      ${startDate ? `AND created_at >= ${new Date(startDate)}` : ''}
      ${endDate ? `AND created_at <= ${new Date(endDate)}` : ''}
    GROUP BY DATE(created_at)
    ORDER BY date DESC
    LIMIT 30
  `;

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    daily_revenue: dailyRevenue
  };
};

export const getTodayOrders = async (restaurantId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const orders = await prisma.orders.findMany({
    where: {
      restaurant_id: restaurantId,
      created_at: {
        gte: today,
        lt: tomorrow
      }
    },
    include: {
      order_items: true,
      users: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  const stats = {
    total_orders: orders.length,
    total_revenue: orders.reduce((sum, order) => sum + (order.total_price || 0), 0),
    pending: orders.filter(o => o.status === 'pending').length,
    verified: orders.filter(o => o.status === 'verified').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    served: orders.filter(o => o.status === 'served').length
  };

  return { orders, stats };
};

export const assignWaiter = async (orderId, restaurantId, waiterId, userRole) => {
  if (userRole !== 'platform_admin') {
    throw new Error('Only platform admin can reassign waiters');
  }

  // Verify waiter exists and belongs to restaurant
  const waiter = await prisma.users.findFirst({
    where: {
      id: waiterId,
      restaurant_id: restaurantId,
      role: 'waiter'
    }
  });

  if (!waiter) {
    throw new Error('Waiter not found or not assigned to this restaurant');
  }

  const order = await prisma.orders.update({
    where: { 
      id: orderId,
      restaurant_id: restaurantId
    },
    data: { served_by: waiterId },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return order;
};

export const getKitchenDisplay = async (restaurantId) => {
  const kitchenOrders = await prisma.orders.findMany({
    where: {
      restaurant_id: restaurantId,
      status: {
        in: ['verified', 'preparing']
      }
    },
    include: {
      order_items: {
        include: {
          menu_items: {
            select: {
              id: true,
              name: true,
              preparation_time: true,
              image: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: [
      { status: 'asc' },
      { created_at: 'asc' }
    ]
  });

  // Group orders by status
  const verifiedOrders = kitchenOrders.filter(o => o.status === 'verified');
  const preparingOrders = kitchenOrders.filter(o => o.status === 'preparing');

  return {
    verified: verifiedOrders,
    preparing: preparingOrders,
    total_active: kitchenOrders.length
  };
};