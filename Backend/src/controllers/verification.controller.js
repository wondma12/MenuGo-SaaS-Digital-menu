import * as verificationService from '../services/verification.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const submitVerification = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }
    
    const verification = await verificationService.submitVerification(restaurantId, req.body);
    successResponse(res, 'Verification submitted successfully', verification, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getVerificationStatus = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }
    
    const status = await verificationService.getVerificationStatus(restaurantId);
    successResponse(res, 'Verification status retrieved successfully', status);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getAllVerifications = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const result = await verificationService.getAllVerifications(
      status,
      parseInt(page),
      parseInt(limit)
    );
    
    successResponse(res, 'Verifications retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const reviewVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const verification = await verificationService.reviewVerification(
      id,
      status,
      req.user.id,
      notes
    );
    
    successResponse(res, `Verification ${status} successfully`, verification);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};