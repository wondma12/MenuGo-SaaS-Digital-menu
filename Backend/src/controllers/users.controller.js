// Backend/src/controllers/users.controller.js

import * as usersService from '../services/users.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

// ============================================================
// GET ALL USERS
// ============================================================

export const getAllUsers = async (req, res) => {
  try {
    const params = req.query;
    const result = await usersService.getAllUsers(params);
    successResponse(res, 'Users retrieved successfully', result);
  } catch (error) {
    console.error('[UsersController] Error fetching users:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// GET USER BY ID
// ============================================================

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    successResponse(res, 'User retrieved successfully', user);
  } catch (error) {
    console.error('[UsersController] Error fetching user:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, null, 404);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// GET USERS BY RESTAURANT
// ============================================================

export const getUsersByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const params = req.query;
    const result = await usersService.getUsersByRestaurant(restaurantId, params);
    successResponse(res, 'Users retrieved successfully', result);
  } catch (error) {
    console.error('[UsersController] Error fetching users by restaurant:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// CREATE USER
// ============================================================

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await usersService.createUser(userData);
    successResponse(res, 'User created successfully', user, 201);
  } catch (error) {
    console.error('[UsersController] Error creating user:', error);
    if (error.message === 'User with this email already exists') {
      return errorResponse(res, error.message, null, 400);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// UPDATE USER
// ============================================================

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = await usersService.updateUser(id, userData);
    successResponse(res, 'User updated successfully', user);
  } catch (error) {
    console.error('[UsersController] Error updating user:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, null, 404);
    }
    if (error.message === 'Email already taken') {
      return errorResponse(res, error.message, null, 400);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// DELETE USER (Soft Delete)
// ============================================================

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.deleteUser(id);
    successResponse(res, 'User deactivated successfully', user);
  } catch (error) {
    console.error('[UsersController] Error deleting user:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, null, 404);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// PERMANENTLY DELETE USER
// ============================================================

export const permanentlyDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersService.permanentlyDeleteUser(id);
    successResponse(res, 'User permanently deleted', result);
  } catch (error) {
    console.error('[UsersController] Error permanently deleting user:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, null, 404);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// UPDATE USER PASSWORD
// ============================================================

export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    
    if (!password) {
      return errorResponse(res, 'New password is required', null, 400);
    }

    const user = await usersService.updateUserPassword(id, password);
    successResponse(res, 'Password updated successfully', user);
  } catch (error) {
    console.error('[UsersController] Error updating password:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, null, 404);
    }
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// GET USER STATS
// ============================================================

export const getUserStats = async (req, res) => {
  try {
    const stats = await usersService.getUserStats();
    successResponse(res, 'User statistics retrieved successfully', stats);
  } catch (error) {
    console.error('[UsersController] Error fetching user stats:', error);
    errorResponse(res, error.message, null, 500);
  }
};