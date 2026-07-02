import * as feedbackService from '../services/feedback.service.js';
import { successResponse, errorResponse } from '../utils/response.js';
import prisma from '../config/prisma.js';

export const createFeedback = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const feedback = await feedbackService.createFeedback(restaurantId, req.body);
    successResponse(res, 'Feedback created successfully', feedback, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const createPublicFeedback = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    // Verify restaurant exists
    const restaurant = await prisma.restaurants.findUnique({
      where: { id: restaurantId }
    });
    
    if (!restaurant) {
      return errorResponse(res, 'Restaurant not found', null, 404);
    }
    
    const feedback = await feedbackService.createFeedback(restaurantId, req.body);
    successResponse(res, 'Feedback submitted successfully', feedback, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { page = 1, limit = 20, minRating } = req.query;
    const result = await feedbackService.getAllFeedbacks(
      restaurantId,
      parseInt(page),
      parseInt(limit),
      minRating
    );
    
    successResponse(res, 'Feedbacks retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    await feedbackService.deleteFeedback(id, restaurantId, req.user.role);
    successResponse(res, 'Feedback deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};