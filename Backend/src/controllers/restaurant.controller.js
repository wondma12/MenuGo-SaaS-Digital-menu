import * as restaurantService from '../services/restaurant.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body, req.user.id);
    successResponse(res, 'Restaurant created successfully', restaurant, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const result = await restaurantService.getAllRestaurants(
      parseInt(page),
      parseInt(limit),
      status
    );
    successResponse(res, 'Restaurants retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.getRestaurantById(
      id,
      req.user.id,
      req.user.role
    );
    successResponse(res, 'Restaurant retrieved successfully', restaurant);
  } catch (error) {
    errorResponse(res, error.message, null, error.message === 'Access denied' ? 403 : 404);
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.updateRestaurant(
      id,
      req.body,
      req.user.id,
      req.user.role
    );
    successResponse(res, 'Restaurant updated successfully', restaurant);
  } catch (error) {
    errorResponse(res, error.message, null, error.message === 'Access denied' ? 403 : 400);
  }
};

export const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.getMyRestaurant(req.user.id);
    successResponse(res, 'Restaurant retrieved successfully', restaurant);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};

export const updateRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Only platform admin can update status
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Only platform admin can update restaurant status', null, 403);
    }
    
    const restaurant = await restaurantService.updateRestaurantStatus(id, status, req.user.id);
    successResponse(res, 'Restaurant status updated successfully', restaurant);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};