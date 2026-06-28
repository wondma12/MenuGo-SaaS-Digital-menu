import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';
import prisma from '../config/prisma.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return errorResponse(res, 'Access denied. No token provided', null, 401);
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return errorResponse(res, 'Invalid or expired token', null, 401);
    }

    // Get fresh user data from database
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        restaurant_id: true,
        is_active: true,
        is_email_verified: true
      }
    });

    if (!user || !user.is_active) {
      return errorResponse(res, 'User not found or inactive', null, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Authentication failed', error, 401);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Access denied. Insufficient permissions', null, 403);
    }
    next();
  };
};

export const checkRestaurantAccess = async (req, res, next) => {
  try {
    const restaurantId = req.params.id;   // <-- FIX

    const user = req.user;

    if (user.role === 'platform_admin') {
      return next();
    }

    if (user.restaurant_id !== restaurantId) {
      return errorResponse(
        res,
        'Access denied. You can only access your own restaurant',
        null,
        403
      );
    }

    next();
  } catch (error) {
    return errorResponse(
      res,
      'Restaurant access check failed',
      error,
      403
    );
  }
};