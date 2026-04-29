import React, { useState } from "react";
import StaffStats from "../../components/admin/staff/StaffStats";
import StaffList from "../../components/admin/staff/StaffList";
import AddStaffModal from "../../components/admin/staff/AddStaffModal";
import Card from "../../components/ui/card";
import { Users, Clock } from "lucide-react";

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@menugo.com",
      phone: "+1 234 567 8901",
      role: "manager",
      status: "active",
      joinDate: "2024-01-15",
      shift: "Morning",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@menugo.com",
      phone: "+1 234 567 8902",
      role: "waiter",
      status: "active",
      joinDate: "2024-02-01",
      shift: "Evening",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@menugo.com",
      phone: "+1 234 567 8903",
      role: "waiter",
      status: "active",
      joinDate: "2024-02-10",
      shift: "Morning",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@menugo.com",
      phone: "+1 234 567 8904",
      role: "kitchen",
      status: "active",
      joinDate: "2024-01-20",
      shift: "Evening",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@menugo.com",
      phone: "+1 234 567 8905",
      role: "waiter",
      status: "inactive",
      joinDate: "2024-01-05",
      shift: "Morning",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Calculate statistics
  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter((s) => s.status === "active").length,
    inactiveStaff: staff.filter((s) => s.status === "inactive").length,
    waiters: staff.filter((s) => s.role === "waiter").length,
    kitchen: staff.filter((s) => s.role === "kitchen").length,
    managers: staff.filter((s) => s.role === "manager").length,
    onShift: staff.filter((s) => s.status === "active").length,
  };

  const handleAddStaff = (newStaff) => {
    const staffToAdd = {
      ...newStaff,
      id: Date.now(),
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setStaff([...staff, staffToAdd]);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(
      staff.map((member) =>
        member.id === editingStaff.id ? { ...member, ...updatedStaff } : member,
      ),
    );
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaff(staff.filter((member) => member.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setStaff(
      staff.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "active" ? "inactive" : "active",
            }
          : member,
      ),
    );
  };

  const openAddModal = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const openEditModal = (staffMember) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-600 mt-1">
          Manage waiters, kitchen staff, and their roles
        </p>
      </div>

      {/* Statistics Cards */}
      <StaffStats stats={stats} />

      {/* Shift Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Morning Shift">
          <div className="space-y-3">
            {staff
              .filter((s) => s.shift === "Morning" && s.status === "active")
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600">{member.shift}</span>
                </div>
              ))}
            {staff.filter((s) => s.shift === "Morning" && s.status === "active")
              .length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No staff assigned to morning shift
              </p>
            )}
          </div>
        </Card>

        <Card title="Evening Shift">
          <div className="space-y-3">
            {staff
              .filter((s) => s.shift === "Evening" && s.status === "active")
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-purple-600">
                    {member.shift}
                  </span>
                </div>
              ))}
            {staff.filter((s) => s.shift === "Evening" && s.status === "active")
              .length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No staff assigned to evening shift
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Staff List */}
      <StaffList
        staff={staff}
        onEdit={openEditModal}
        onDelete={handleDeleteStaff}
        onToggleStatus={handleToggleStatus}
        onAddStaff={openAddModal}
      />

      {/* Add/Edit Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStaff(null);
        }}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
        editingStaff={editingStaff}
      />
    </div>
  );
};

export default StaffManagement;
