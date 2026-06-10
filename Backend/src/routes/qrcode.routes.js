import express from 'express';
import * as qrCodeController from '../controllers/qrcode.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/generate', qrCodeController.generateQRCode);
router.post('/generate-tables', qrCodeController.generateTableQRCodes);
router.get('/', qrCodeController.getAllQRCodes);
router.patch('/:id/status', qrCodeController.updateQRCodeStatus);
router.delete('/:id', qrCodeController.deleteQRCode);

export default router;
