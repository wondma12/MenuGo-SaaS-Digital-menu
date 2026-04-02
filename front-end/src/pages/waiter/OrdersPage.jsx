import React, { useState, useEffect } from "react";
import OrdersList from "../../components/waiter/orderlist";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    const mockOrders = [
      {
        id: 1,
        tableNumber: 1,
        status: "Pending",
        items: [
          {
            name: "Classic Burger",
            quantity: 2,
            price: "12.99",
            description:
              "Juicy beef patty with lettuce, tomato, and special sauce",
            image:
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
          },
          {
            name: "Crispy Fries",
            quantity: 1,
            price: "4.99",
            description: "Golden crispy french fries with sea salt",
            image:
              "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpdGVzfGVufDB8fDB8fHww",
          },
        ],
      },
      {
        id: 2,
        tableNumber: 2,
        status: "Pending",
        items: [
          {
            name: "Margherita Pizza",
            quantity: 2,
            price: "14.99",
            description: "Fresh mozzarella, basil, and tomato sauce",
            image:
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=64&h=64&fit=crop&crop=center",
          },
          {
            name: "Garlic Bread",
            quantity: 1,
            price: "6.99",
            description: "Toasted bread with garlic butter and herbs",
            image:
              "https://plus.unsplash.com/premium_photo-1711752902734-a36167479983?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJlYWQlMjB0b2FzdGVkfGVufDB8fDB8fHww",
          },
        ],
      },
    ];
    setOrders(mockOrders);
  }, []);

  const handleApprove = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Verified" } : order,
      ),
    );
  };

  const handleReject = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Rejected" } : order,
      ),
    );
  };

  const handleUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handlers = {
    approve: handleApprove,
    reject: handleReject,
    update: handleUpdate,
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Waiter Orders</h1>
        <OrdersList orders={orders} handlers={handlers} />
      </div>
    </div>
  );
}
