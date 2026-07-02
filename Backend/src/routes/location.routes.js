import express from 'express';
import * as locationController from '../controllers/location.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', locationController.addRestaurantLocation);
router.put('/', locationController.updateRestaurantLocation);
router.get('/', locationController.getRestaurantLocation);
router.get('/nearby', locationController.getNearbyRestaurants);

export default router;