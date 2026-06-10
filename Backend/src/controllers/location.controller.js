import * as locationService from '../services/location.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const addRestaurantLocation = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const location = await locationService.addRestaurantLocation(restaurantId, req.body);
    successResponse(res, 'Restaurant location added successfully', location, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const updateRestaurantLocation = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const location = await locationService.updateRestaurantLocation(restaurantId, req.body);
    successResponse(res, 'Restaurant location updated successfully', location);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getRestaurantLocation = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const location = await locationService.getRestaurantLocation(restaurantId);
    successResponse(res, 'Restaurant location retrieved successfully', location);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};

export const getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    if (!latitude || !longitude) {
      return errorResponse(res, 'Latitude and longitude are required', null, 400);
    }

    const restaurants = await locationService.getNearbyRestaurants(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(radius)
    );
    
    successResponse(res, 'Nearby restaurants retrieved successfully', restaurants);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

// Get location by restaurant ID (public)
export const getRestaurantLocationById = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const location = await locationService.getRestaurantLocation(restaurantId);
    
    if (!location) {
      return errorResponse(res, 'Location not found for this restaurant', null, 404);
    }
    
    successResponse(res, 'Restaurant location retrieved successfully', location);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};