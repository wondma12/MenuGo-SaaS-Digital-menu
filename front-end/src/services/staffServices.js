// services/staffServices.js

import { staffAPI } from './api.js';

/*
|--------------------------------------------------------------------------
| Staff Service
|--------------------------------------------------------------------------
*/

export const fetchStaff = async (restaurantId = null) => {
  try {
    const params = {};
    if (restaurantId) {
      params.restaurant_id = restaurantId;
    }
    
    const result = await staffAPI.getAll(params);
    return {
      success: true,
      data: result || [],
    };
  } catch (error) {
    console.error('[StaffService] Error fetching staff:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch staff',
    };
  }
};

export const addStaff = async (newStaff) => {
  try {
    const result = await staffAPI.create({
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone || '',
      password: newStaff.password || '123456',
      role: newStaff.role || 'waiter',
      restaurant_id: newStaff.restaurant_id,
    });
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('[StaffService] Error adding staff:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to add staff',
    };
  }
};

export const updateStaff = async (id, updatedData) => {
  try {
    const result = await staffAPI.update(id, {
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone || '',
      role: updatedData.role || 'waiter',
      is_active: updatedData.is_active !== undefined ? updatedData.is_active : true,
    });
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('[StaffService] Error updating staff:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to update staff',
    };
  }
};

export const deleteStaff = async (id) => {
  try {
    await staffAPI.delete(id);
    return {
      success: true,
      data: { id },
    };
  } catch (error) {
    console.error('[StaffService] Error deleting staff:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to delete staff',
    };
  }
};

/*
|--------------------------------------------------------------------------
| Staff Service Object
|--------------------------------------------------------------------------
*/

export const staffService = {
  getAll: async (restaurantId = null) => {
    return await fetchStaff(restaurantId);
  },

  getStats: async (restaurantId = null) => {
    try {
      const result = await fetchStaff(restaurantId);
      
      if (!result.success) {
        return {
          success: false,
          data: {
            totalStaff: 0,
            activeNow: 0,
            admins: 0,
            waitstaff: 0,
          },
          error: result.error,
        };
      }
      
      const staff = result.data || [];
      const total = staff.length;
      const admins = staff.filter((s) => s.role === 'restaurant_admin' || s.role === 'admin').length;
      const waitstaff = staff.filter((s) => s.role === 'waiter').length;
      const activeNow = staff.filter((s) => s.is_active !== false).length;
      
      return {
        success: true,
        data: {
          totalStaff: total,
          activeNow,
          admins,
          waitstaff,
        },
      };
    } catch (error) {
      console.error('[StaffService] Error fetching stats:', error);
      return {
        success: false,
        data: {
          totalStaff: 0,
          activeNow: 0,
          admins: 0,
          waitstaff: 0,
        },
        error: error.message || 'Failed to fetch stats',
      };
    }
  },

  getByRestaurant: async (restaurantId) => {
    return await fetchStaff(restaurantId);
  },

  add: async (payload) => {
    return await addStaff(payload);
  },

  update: async (id, payload) => {
    return await updateStaff(id, payload);
  },

  delete: async (id) => {
    return await deleteStaff(id);
  },
};

export default staffService;