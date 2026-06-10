import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    return errorResponse(res, 'Validation failed', extractedErrors, 400);
  };
};

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['platform_admin', 'restaurant_admin', 'waiter']).withMessage('Invalid role'),
  body('restaurant_id').optional().isString().withMessage('Invalid restaurant ID')
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

export const createRestaurantValidation = [
  body('name').notEmpty().withMessage('Restaurant name is required'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isString().withMessage('Phone must be a string'),
  body('description').optional().isString()
];

// Add these to your existing validation middleware file

export const createCategoryValidation = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('display_order').optional().isInt().withMessage('Display order must be an integer')
];

export const createMenuItemValidation = [
  body('category_id').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('Item name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString(),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('preparation_time').optional().isInt({ min: 0 }).withMessage('Preparation time must be a positive integer'),
  body('is_featured').optional().isBoolean(),
  body('status').optional().isIn(['available', 'unavailable'])
];

export const updateMenuItemStatusValidation = [
  body('status').isIn(['available', 'unavailable']).withMessage('Status must be available or unavailable')
];

export const createOrderValidation = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.menu_item_id').notEmpty().withMessage('Menu item ID is required'),
  body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('table_number').optional().isString(),
  body('order_type').optional().isIn(['dine_in', 'takeaway']),
  body('customer_note').optional().isString()
];

export const updateOrderStatusValidation = [
  body('status').isIn(['pending', 'verified', 'preparing', 'served']).withMessage('Invalid status')
];

export const assignWaiterValidation = [
  body('waiter_id').notEmpty().withMessage('Waiter ID is required')
];