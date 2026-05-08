const API_BASE_URL = "http://localhost:3001";

// Helper to generate new ID
const generateId = () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/orders`);
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Order not found");
      }
      const updatedOrder = await response.json();
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      await delay();
      // First get existing orders to determine next ID
      const ordersResponse = await fetch(`${API_BASE_URL}/orders`);
      const existingOrders = await ordersResponse.json();
      const nextId = Math.max(...existingOrders.map((o) => o.id || 0), 0) + 1;

      const newOrder = {
        id: nextId,
        orderCode: generateId(),
        ...orderData,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      const createdOrder = await response.json();
      return createdOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get statistics (pending, preparing counts etc.)
  getStats: async () => {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/orders`);
      const orders = await response.json();
      const pending = orders.filter((o) => o.status === "pending").length;
      const preparing = orders.filter((o) => o.status === "preparing").length;
      return { pending, preparing, avgTime: "18m", efficiency: "94%" };
    } catch (error) {
      console.error("Error fetching order stats:", error);
      return { pending: 0, preparing: 0, avgTime: "0m", efficiency: "0%" };
    }
  },
};
