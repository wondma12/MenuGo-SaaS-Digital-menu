import { API_BASE_URL } from "../env";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchStaff = async () => {
  try {
    await delay();
    const response = await fetch(`${API_BASE_URL}/staff`);
    const staff = await response.json();
    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
};

export const addStaff = async (newStaff) => {
  try {
    await delay();
    const response = await fetch(`${API_BASE_URL}/staff`);
    const existingStaff = await response.json();
    const staff = {
      id: Math.max(...existingStaff.map((s) => s.id), 0) + 1,
      ...newStaff,
      avatar: null,
    };
    const createResponse = await fetch(`${API_BASE_URL}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staff),
    });
    const createdStaff = await createResponse.json();
    return createdStaff;
  } catch (error) {
    console.error("Error adding staff:", error);
    throw error;
  }
};

export const updateStaff = async (id, updatedData) => {
  try {
    await delay();
    const response = await fetch(`${API_BASE_URL}/staff/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Staff not found");
    }
    const updatedStaff = await response.json();
    return updatedStaff;
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error;
  }
};

export const deleteStaff = async (id) => {
  try {
    await delay();
    const response = await fetch(`${API_BASE_URL}/staff/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Staff not found");
    }
    return id;
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};

// Compatibility wrapper expected by pages: provide a `staffService` named export
export const staffService = {
  getAll: async () => {
    return await fetchStaff();
  },
  getStats: async () => {
    try {
      const data = await fetchStaff();
      const totalStaff = data.length;
      const activeNow = data.filter((s) => {
        const st = (s.status || "").toString().toLowerCase();
        return st === "on shift" || st === "active" || st === "on_shift";
      }).length;
      const admins = data.filter((s) =>
        (s.role || "").toString().toLowerCase().includes("admin"),
      ).length;
      const waitstaff = data.filter((s) =>
        (s.role || "").toString().toLowerCase().includes("wait"),
      ).length;

      return { totalStaff, activeNow, admins, waitstaff };
    } catch (error) {
      console.error("Error fetching staff stats:", error);
      return { totalStaff: 0, activeNow: 0, admins: 0, waitstaff: 0 };
    }
  },
  add: async (payload) => await addStaff(payload),
  update: async (id, payload) => await updateStaff(id, payload),
  delete: async (id) => await deleteStaff(id),
};

export default staffService;
