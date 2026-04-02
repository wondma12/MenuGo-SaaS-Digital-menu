// components/OrderCard.jsx

import StatusBadge from "./StatusBadge";

const OrderCard = ({ order, onApprove, onReject, onUpdate }) => {
  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Table #{order.tableNumber}</h3>
        <StatusBadge status={order.status} />
      </div>

      {/* Items */}
      <div className="space-y-1">
        {order.items.map((item, index) => (
          <p key={index} className="text-sm">
            • {item.name} × {item.quantity}
          </p>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {order.status === "Pending" && (
          <>
            <button className="btn" onClick={() => onApprove(order.id)}>
              Approve
            </button>

            <button
              className="btn bg-red-500"
              onClick={() => onReject(order.id)}
            >
              Reject
            </button>
          </>
        )}

        {order.status === "Verified" && (
          <button
            className="btn"
            onClick={() => onUpdate(order.id, "Preparing")}
          >
            Start Preparing
          </button>
        )}

        {order.status === "Preparing" && (
          <button className="btn" onClick={() => onUpdate(order.id, "Served")}>
            Mark as Served
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
