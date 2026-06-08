import express from 'express';
import * as restaurantController from '../controllers/restaurant.controller.js';
import { authenticate, authorize, checkRestaurantAccess } from '../middlewares/auth.middleware.js';
import { validate, createRestaurantValidation } from '../middlewares/validation.middleware.js';

const router = express.Router();

// All restaurant routes require authentication
router.use(authenticate);

// Platform admin only routes
router.get('/all', authorize('platform_admin'), restaurantController.getAllRestaurants);
router.put('/:id/status', authorize('platform_admin'), restaurantController.updateRestaurantStatus);

// Restaurant owner/waiter routes
router.post('/', validate(createRestaurantValidation), restaurantController.createRestaurant);
router.get('/my-restaurant', restaurantController.getMyRestaurant);
router.get('/:id', checkRestaurantAccess, restaurantController.getRestaurantById);
router.put('/:id', checkRestaurantAccess, restaurantController.updateRestaurant);

export default router;