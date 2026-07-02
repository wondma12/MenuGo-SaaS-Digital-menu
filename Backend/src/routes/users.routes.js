// Backend/src/routes/users.routes.js

import express from 'express';
import * as usersController from '../controllers/users.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// ============================================================
// USER ROUTES
// ============================================================

// Get all users (with filters and pagination)
router.get('/', usersController.getAllUsers);

// Get user statistics (Platform Admin only)
router.get('/stats', authorize('platform_admin'), usersController.getUserStats);

// Get users by restaurant
router.get('/restaurant/:restaurantId', usersController.getUsersByRestaurant);

// ✅ Create new user - REMOVED authorize('platform_admin')
router.post(
  '/',
  // authorize('platform_admin'),  // ← REMOVE THIS LINE
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['platform_admin', 'restaurant_admin', 'waiter']),
  ]),
  usersController.createUser  // ← Controller handles role validation
);

// Get user by ID
router.get('/:id', usersController.getUserById);

// ✅ Update user - Keep authorize but allow restaurant_admin
router.put(
  '/:id',
  authorize('platform_admin', 'restaurant_admin'),  // ← Allow both roles
  validate([
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('role').optional().isIn(['platform_admin', 'restaurant_admin', 'waiter']),
    body('is_active').optional().isBoolean(),
  ]),
  usersController.updateUser
);

// ✅ Delete user - Keep authorize but allow restaurant_admin
router.delete('/:id', authorize('platform_admin', 'restaurant_admin'), usersController.deleteUser);

// Permanently delete user (Platform Admin only)
router.delete('/:id/permanent', authorize('platform_admin'), usersController.permanentlyDeleteUser);

// Update user password (Platform Admin only)
router.patch(
  '/:id/password',
  authorize('platform_admin'),
  validate([
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ]),
  usersController.updateUserPassword
);

export default router;