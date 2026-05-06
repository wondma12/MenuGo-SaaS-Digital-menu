// src/services/orderService.js

// Mock initial orders (matches HTML table data + extras)
let orders = [
  {
    id: "#ORD-2984",
    tableNumber: 4,
    status: "pending",
    time: "12:45 PM",
    items: [{ name: "Wagyu Ribeye", quantity: 1, price: 84 }],
    total: 84,
    createdAt: "2025-04-30T12:45:00",
  },
  {
    id: "#ORD-2983",
    tableNumber: 12,
    status: "verified",
    time: "12:38 PM",
    items: [{ name: "Heirloom Burrata", quantity: 2, price: 22 }],
    total: 44,
    createdAt: "2025-04-30T12:38:00",
  },
  {
    id: "#ORD-2981",
    tableNumber: 1,
    status: "preparing",
    time: "12:30 PM",
    items: [{ name: "Black Truffle Pasta", quantity: 1, price: 48 }],
    total: 48,
    createdAt: "2025-04-30T12:30:00",
  },
  {
    id: "#ORD-2978",
    tableNumber: 9,
    status: "served",
    time: "12:15 PM",
    items: [{ name: "Spicy Tuna Roll", quantity: 1, price: 24 }],
    total: 24,
    createdAt: "2025-04-30T12:15:00",
  },
  {
    id: "#ORD-2977",
    tableNumber: 3,
    status: "served",
    time: "12:08 PM",
    items: [{ name: "Caesar Salad", quantity: 1, price: 12 }],
    total: 12,
    createdAt: "2025-04-30T12:08:00",
  },
];

// Helper to generate new ID
const generateId = () => `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;

export const orderService = {
  // Get all orders
  getAllOrders: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...orders]), 300);
    });
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus) => {
    return new Promise((resolve, reject) => {
      const index = orders.findIndex((o) => o.id === orderId);
      if (index === -1) reject(new Error("Order not found"));
      orders[index] = { ...orders[index], status: newStatus };
      resolve(orders[index]);
    });
  },

  // Create new order
  createOrder: async (orderData) => {
    return new Promise((resolve) => {
      const newOrder = {
        id: generateId(),
        ...orderData,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: new Date().toISOString(),
      };
      orders = [newOrder, ...orders];
      resolve(newOrder);
    });
  },

  // Get statistics (pending, preparing counts etc.)
  getStats: async () => {
    return new Promise((resolve) => {
      const pending = orders.filter((o) => o.status === "pending").length;
      const preparing = orders.filter((o) => o.status === "preparing").length;
      resolve({ pending, preparing, avgTime: "18m", efficiency: "94%" });
    });
  },
};