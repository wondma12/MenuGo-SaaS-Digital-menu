import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route (no authentication needed for customers)
router.get('/public/:restaurantId', menuController.getPublicMenu);

router.use(authenticate);

router.post('/categories',
  validate([
    body('name').notEmpty().withMessage('Category name is required'),
    body('display_order').optional().isInt().withMessage('Display order must be an integer')
  ]),
  menuController.createCategory
);

router.get('/categories', menuController.getAllCategories);
router.get('/categories/:id', menuController.getCategoryById);
router.put('/categories/:id', menuController.updateCategory);
router.delete('/categories/:id', menuController.deleteCategory);

router.post('/items',
  validate([
    body('category_id').notEmpty().withMessage('Category ID is required'),
    body('name').notEmpty().withMessage('Item name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString(),
    body('preparation_time').optional().isInt().withMessage('Preparation time must be an integer'),
    body('is_featured').optional().isBoolean(),
    body('status').optional().isIn(['available', 'unavailable'])
  ]),
  menuController.createMenuItem
);

router.get('/items', menuController.getAllMenuItems);
router.get('/items/featured', menuController.getFeaturedItems);
router.get('/items/menu-by-category', menuController.getMenuByCategory);
router.get('/items/:id', menuController.getMenuItemById);
router.put('/items/:id', menuController.updateMenuItem);
router.delete('/items/:id', menuController.deleteMenuItem);
router.patch('/items/:id/status', menuController.updateMenuItemStatus);

export default router;