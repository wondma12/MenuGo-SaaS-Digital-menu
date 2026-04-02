// components/OrdersList.jsx

import OrderCard from "./OrderCard";

const OrdersList = ({ orders, handlers }) => {
  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onApprove={handlers.approve}
          onReject={handlers.reject}
          onUpdate={handlers.update}
        />
      ))}
    </div>
  );
};

export default OrdersList;
