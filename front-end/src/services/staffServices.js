import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/*
|--------------------------------------------------------------------------
| Fetch All Staff
|--------------------------------------------------------------------------
*/

export const fetchStaff = async (restaurantId = null) => {
  try {
    await delay();

    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    let staff = users.filter(
      (user) =>
        user.role === "waiter" ||
        user.role === "restaurant_admin"
    );

    if (restaurantId) {
      staff = staff.filter(
        (user) => user.restaurant_id === restaurantId
      );
    }

    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
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
    await delay();

    const response = await fetch(`${API_BASE_URL}/users`);
    const users = await response.json();

    const nextId =
      Math.max(...users.map((u) => Number(u.id)), 0) + 1;

    const staff = {
      id: nextId,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      password: newStaff.password || "123456",
      role: newStaff.role || "waiter",
      restaurant_id: newStaff.restaurant_id,
      created_at: new Date().toISOString(),
    };

    const createResponse = await fetch(
      `${API_BASE_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
      }
    );

    if (!createResponse.ok) {
      throw new Error("Failed to create staff");
    }

    return await createResponse.json();
  } catch (error) {
    console.error("Error adding staff:", error);
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
    await delay();

    const response = await fetch(
      `${API_BASE_URL}/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Staff not found");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating staff:", error);
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
    await delay();

    const response = await fetch(
      `${API_BASE_URL}/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Staff not found");
    }

    return id;
  } catch (error) {
    console.error("Error deleting staff:", error);
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

        restaurantAdmins: staff.filter(
          (s) => s.role === "restaurant_admin"
        ).length,

        waiters: staff.filter(
          (s) => s.role === "waiter"
        ).length,
      };
    } catch (error) {
      console.error("Error fetching staff stats:", error);

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