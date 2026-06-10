import * as settingsService from '../services/settings.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await settingsService.getSettings();
    successResponse(res, 'Settings retrieved successfully', settings);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const updateSettings = async (req, res) => {
  try {
    // Only platform admin can update settings
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const settings = await settingsService.updateSettings(req.body);
    successResponse(res, 'Settings updated successfully', settings);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getPublicSettings = async (req, res) => {
  try {
    const settings = await settingsService.getSettings();
    // Return only public settings
    const publicSettings = {
      platform_name: settings.platform_name,
      allow_self_registration: settings.allow_self_registration,
      minimum_password_length: settings.minimum_password_length
    };
    successResponse(res, 'Public settings retrieved successfully', publicSettings);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};