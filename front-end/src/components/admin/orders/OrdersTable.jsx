import React, { useState } from "react";
import OrderRow from "./OrderRow";
import OrderFilter from "./OrderFilter";
import Button from "../../ui/button";
import Modal from "../../ui/Modal";
import { Download, Printer } from "lucide-react";

const OrdersTable = ({ orders, onStatusChange, onFilterChange }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleExport = () => {
    const csvContent = [
      ["Order ID", "Table", "Items", "Total", "Status"],
      ...orders.map((order) => [
        order.id,
        order.tableNumber,
        order.items.map((i) => `${i.quantity}x ${i.name}`).join(", "),
        order.total,
        order.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <OrderFilter onFilterChange={onFilterChange} />
        <div className="flex gap-2">
          <Button
            label="Export"
            variant="secondary"
            onClick={handleExport}
            icon={Download}
            size="sm"
          />
          <Button
            label="Print"
            variant="secondary"
            onClick={handlePrint}
            icon={Printer}
            size="sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onStatusChange={onStatusChange}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={`Order Details #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Table Number</p>
                <p className="font-medium">Table {selectedOrder.tableNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Order Time</p>
                <p className="font-medium">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <OrderStatusBadge status={selectedOrder.status} />
              </div>
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="font-bold text-lg">
                  ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Order Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-medium">{item.quantity}x</span>{" "}
                      {item.name}
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-gray-500 mb-2">Order Notes</p>
              <p className="text-sm text-gray-600">
                {selectedOrder.notes || "No special instructions"}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrdersTable;
