import * as authService from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const register = async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    successResponse(res, 'User registered successfully', { user, token }, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    successResponse(res, 'Login successful', { user, token });
  } catch (error) {
    errorResponse(res, error.message, null, 401);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    successResponse(res, 'User retrieved successfully', user);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};