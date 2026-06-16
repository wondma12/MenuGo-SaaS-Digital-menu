// services/staffServices.js
import { authAPI, staffAPI, restaurantAPI } from './api.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/*
|--------------------------------------------------------------------------
| Fetch All Staff
|--------------------------------------------------------------------------
*/

export const fetchStaff = async (restaurantId = null) => {
  try {
    // Get all users with waiter or restaurant_admin roles
    const params = { role: 'waiter,restaurant_admin' };
    if (restaurantId) {
      params.restaurant_id = restaurantId;
    }
    
    const result = await staffAPI.getAll(params);
    const users = result.users || result || [];
    
    let staff = users.filter(
      (user) => user.role === 'waiter' || user.role === 'restaurant_admin'
    );

    if (restaurantId) {
      staff = staff.filter((user) => user.restaurant_id === restaurantId);
    }

    return staff;
  } catch (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
};

/*
|--------------------------------------------------------------------------
| Add Staff
|--------------------------------------------------------------------------
*/

export const addStaff = async (newStaff) => {
  try {
    const result = await staffAPI.create({
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      password: newStaff.password || '123456',
      role: newStaff.role || 'waiter',
      restaurant_id: newStaff.restaurant_id,
    });

    return result;
  } catch (error) {
    console.error('Error adding staff:', error);
    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Staff
|--------------------------------------------------------------------------
*/

export const updateStaff = async (id, updatedData) => {
  try {
    const result = await staffAPI.update(id, updatedData);
    return result;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Staff
|--------------------------------------------------------------------------
*/

export const deleteStaff = async (id) => {
  try {
    await staffAPI.delete(id);
    return id;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Staff Service
|--------------------------------------------------------------------------
*/

export const staffService = {
  getAll: async (restaurantId = null) => {
    return await fetchStaff(restaurantId);
  },

  getStats: async (restaurantId = null) => {
    try {
      const staff = await fetchStaff(restaurantId);

      return {
        totalStaff: staff.length,
        restaurantAdmins: staff.filter((s) => s.role === 'restaurant_admin').length,
        waiters: staff.filter((s) => s.role === 'waiter').length,
      };
    } catch (error) {
      console.error('Error fetching staff stats:', error);
      return {
        totalStaff: 0,
        restaurantAdmins: 0,
        waiters: 0,
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