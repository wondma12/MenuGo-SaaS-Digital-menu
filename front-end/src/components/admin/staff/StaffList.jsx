import React, { useState } from "react";
import Card from "../../ui/card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import StaffRow from "./StaffRow";
import { Search, UserPlus } from "lucide-react";
import Button from "../../ui/button";

const StaffList = ({ staff, onEdit, onDelete, onToggleStatus, onAddStaff }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || member.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "waiter", label: "Waiters" },
    { value: "kitchen", label: "Kitchen Staff" },
    { value: "manager", label: "Managers" },
    { value: "admin", label: "Admins" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <Card title="Staff Directory">
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search
            </label>
            <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0"
                size={18}
              />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-auto lg:flex lg:items-end lg:gap-4">
            <div className="lg:w-40">
              <Select
                label="Role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                options={roleOptions}
              />
            </div>
            <div className="lg:w-40">
              <Select
                label="Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={statusOptions}
              />
            </div>
            <div className="lg:pb-2.5">
              <Button onClick={onAddStaff} className="flex items-center">
                <UserPlus size={18} className="mr-2 shrink-0" /> Add Staff
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredStaff.length}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{staff.length}</span>{" "}
          staff members
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Staff Member
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Shift
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Join Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No staff members found
                </td>
              </tr>
            ) : (
              filteredStaff.map((member) => (
                <StaffRow
                  key={member.id}
                  staff={member}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StaffList;
