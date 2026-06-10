import * as qrCodeService from '../services/qrcode.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const generateQRCode = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    const { table_number, qr_type = 'menu' } = req.body;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }
    
    const qrCode = await qrCodeService.generateQRCode(restaurantId, table_number, qr_type);
    successResponse(res, 'QR code generated successfully', qrCode, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllQRCodes = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    const { page = 1, limit = 50 } = req.query;
    
    const result = await qrCodeService.getAllQRCodes(restaurantId, parseInt(page), parseInt(limit));
    successResponse(res, 'QR codes retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const updateQRCodeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const restaurantId = req.user.restaurant_id;
    
    const qrCode = await qrCodeService.updateQRCodeStatus(id, restaurantId, is_active);
    successResponse(res, 'QR code status updated successfully', qrCode);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const deleteQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    await qrCodeService.deleteQRCode(id, restaurantId);
    successResponse(res, 'QR code deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const generateTableQRCodes = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    const { table_numbers } = req.body;
    
    if (!table_numbers || !Array.isArray(table_numbers) || table_numbers.length === 0) {
      return errorResponse(res, 'Table numbers array is required', null, 400);
    }
    
    const qrCodes = await qrCodeService.generateTableQRCodes(restaurantId, table_numbers);
    successResponse(res, 'Table QR codes generated successfully', qrCodes, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};