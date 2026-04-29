// components/StatusBadge.jsx

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Verified: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  Served: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
