import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  // ==========================================
  // GET ALL ORDERS
  // ==========================================
  async getAllOrders() {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // ==========================================
  // GET ORDERS BY RESTAURANT
  // ==========================================
  async getOrdersByRestaurant(restaurantId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/orders?restaurant_id=${restaurantId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching restaurant orders:", error);
      return [];
    }
  },

  // ==========================================
  // CREATE ORDER
  // ==========================================
  async createOrder(orderData) {
    try {
      await delay();

      const ordersResponse = await fetch(`${API_BASE_URL}/orders`);
      const orders = await ordersResponse.json();

      const newOrderId =
        Math.max(...orders.map((o) => Number(o.id)), 0) + 1;

      const newOrder = {
        id: newOrderId,
        restaurant_id: orderData.restaurant_id,
        table_number: orderData.table_number,
        order_type: orderData.order_type,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const createdOrder = await response.json();

      // Create order items
      if (
        orderData.items &&
        Array.isArray(orderData.items) &&
        orderData.items.length
      ) {
        const orderItemsResponse = await fetch(
          `${API_BASE_URL}/orderItems`
        );

        const existingItems = await orderItemsResponse.json();

        let nextItemId =
          Math.max(...existingItems.map((i) => Number(i.id)), 0) + 1;

        for (const item of orderData.items) {
          await fetch(`${API_BASE_URL}/orderItems`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: nextItemId++,
              order_id: createdOrder.id,
              menu_item_id: item.menu_item_id,
              quantity: item.quantity,
            }),
          });
        }
      }

      return createdOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================
  async updateOrderStatus(orderId, status) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Order not found");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // ==========================================
  // GET ORDER ITEMS
  // ==========================================
  async getOrderItems() {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/orderItems`);

      if (!response.ok) {
        throw new Error("Failed to fetch order items");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching order items:", error);
      return [];
    }
  },

  // ==========================================
  // GET MENU ITEMS
  // ==========================================
  async getMenuItems() {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/menuItems`);

      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  },

  // ==========================================
  // GET COMPLETE ORDER DETAILS
  // ==========================================
  async getAllOrdersWithDetails() {
    try {
      const [orders, orderItems, menuItems] = await Promise.all([
        this.getAllOrders(),
        this.getOrderItems(),
        this.getMenuItems(),
      ]);

      return {
        orders,
        orderItems,
        menuItems,
      };
    } catch (error) {
      console.error("Error fetching complete order data:", error);

      return {
        orders: [],
        orderItems: [],
        menuItems: [],
      };
    }
  },

  // ==========================================
  // DASHBOARD STATS
  // ==========================================
  async getStats(restaurantId = null) {
    try {
      await delay();

      let orders = [];

      if (restaurantId) {
        orders = await this.getOrdersByRestaurant(restaurantId);
      } else {
        orders = await this.getAllOrders();
      }

      return {
        totalOrders: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        verified: orders.filter((o) => o.status === "verified").length,
        preparing: orders.filter((o) => o.status === "preparing").length,
        served: orders.filter((o) => o.status === "served").length,
      };
    } catch (error) {
      console.error("Error fetching order stats:", error);

      return {
        totalOrders: 0,
        pending: 0,
        verified: 0,
        preparing: 0,
        served: 0,
      };
    }
  },
};