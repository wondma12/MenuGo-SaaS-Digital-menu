import * as orderService from '../services/order.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createOrder = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const order = await orderService.createOrder(
      req.body,
      req.user.id,
      restaurantId
    );
    
    successResponse(res, 'Order created successfully', order, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { 
      page = 1, 
      limit = 20, 
      status, 
      order_type, 
      table_number,
      order_number,
      start_date,
      end_date
    } = req.query;
    
    const filters = { status, order_type, table_number, order_number, start_date, end_date };
    
    const result = await orderService.getAllOrders(
      restaurantId,
      filters,
      parseInt(page),
      parseInt(limit)
    );
    
    successResponse(res, 'Orders retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    const order = await orderService.getOrderById(
      id,
      restaurantId,
      req.user.role,
      req.user.id
    );
    
    successResponse(res, 'Order retrieved successfully', order);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const restaurantId = req.user.restaurant_id;
    
    const order = await orderService.updateOrderStatus(
      id,
      restaurantId,
      status,
      req.user.id,
      req.user.role
    );
    
    successResponse(res, 'Order status updated successfully', order);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getActiveOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const activeOrders = await orderService.getActiveOrders(restaurantId);
    successResponse(res, 'Active orders retrieved successfully', activeOrders);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { start_date, end_date, page = 1, limit = 50 } = req.query;
    
    const history = await orderService.getOrderHistory(
      restaurantId,
      start_date,
      end_date,
      parseInt(page),
      parseInt(limit)
    );
    
    successResponse(res, 'Order history retrieved successfully', history);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getTodayOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const todayOrders = await orderService.getTodayOrders(restaurantId);
    successResponse(res, 'Today\'s orders retrieved successfully', todayOrders);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const assignWaiter = async (req, res) => {
  try {
    const { id } = req.params;
    const { waiter_id } = req.body;
    const restaurantId = req.user.restaurant_id;
    
    const order = await orderService.assignWaiter(
      id,
      restaurantId,
      waiter_id,
      req.user.role
    );
    
    successResponse(res, 'Waiter assigned successfully', order);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getKitchenDisplay = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const kitchenDisplay = await orderService.getKitchenDisplay(restaurantId);
    successResponse(res, 'Kitchen display retrieved successfully', kitchenDisplay);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

// Public endpoint for customers to track their order
export const trackOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    
    const order = await prisma.orders.findFirst({
      where: { order_number: orderNumber },
      include: {
        order_items: true,
        restaurants: {
          select: {
            id: true,
            name: true,
            logo: true
          }
        }
      }
    });

    if (!order) {
      return errorResponse(res, 'Order not found', null, 404);
    }

    successResponse(res, 'Order status retrieved successfully', {
      order_number: order.order_number,
      status: order.status,
      total_price: order.total_price,
      created_at: order.created_at,
      estimated_time: order.status === 'preparing' ? '15-20 minutes' : null,
      restaurant: order.restaurants
    });
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};