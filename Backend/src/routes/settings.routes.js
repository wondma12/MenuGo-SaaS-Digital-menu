import express from 'express';
import * as settingsController from '../controllers/settings.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', settingsController.getSettings);
router.put('/', authenticate, authorize('platform_admin'), settingsController.updateSettings);

export default router;