import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route for order tracking
router.get('/track/:orderNumber', orderController.trackOrder);

router.use(authenticate);

router.post('/',
  validate([
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.menu_item_id').notEmpty().withMessage('Menu item ID is required'),
    body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('table_number').optional().isString(),
    body('order_type').optional().isIn(['dine_in', 'takeaway']),
    body('customer_note').optional().isString()
  ]),
  orderController.createOrder
);

router.get('/', orderController.getAllOrders);
router.get('/active', orderController.getActiveOrders);
router.get('/history', orderController.getOrderHistory);
router.get('/today', orderController.getTodayOrders);
router.get('/kitchen-display', authorize('restaurant_admin', 'platform_admin'), orderController.getKitchenDisplay);
router.get('/:id', orderController.getOrderById);

router.patch('/:id/status',
  validate([
    body('status').isIn(['pending', 'verified', 'preparing', 'served']).withMessage('Invalid status')
  ]),
  orderController.updateOrderStatus
);

router.put('/:id/assign-waiter',
  authorize('platform_admin', 'restaurant_admin'),
  validate([
    body('waiter_id').notEmpty().withMessage('Waiter ID is required')
  ]),
  orderController.assignWaiter
);

export default router;