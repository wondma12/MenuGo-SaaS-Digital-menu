// src/pages/Restaurant_admin/StaffManagement.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import StaffStats from "../../components/Restaurant_admin/staff/StaffStats";
import StaffTable from "../../components/Restaurant_admin/staff/StaffTable";
import AddStaffModal from "../../components/Restaurant_admin/staff/AddStaffModal";
import { staffService } from "../../services/staffServices";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({
    totalStaff: 0,
    activeNow: 0,
    admins: 0,
    waitstaff: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const staffData = await staffService.getAll();
    setStaff(staffData);
    const statsData = await staffService.getStats();
    setStats(statsData);
  };

  const paginatedStaff = staff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  const handleAddStaff = async (newStaff) => {
    await staffService.add(newStaff);
    await loadData();
  };

  const handleEditStaff = async (updatedStaff) => {
    await staffService.update(editingStaff.id, updatedStaff);
    setEditingStaff(null);
    await loadData();
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      await staffService.delete(id);
      await loadData();
    }
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
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">

      {/* Main Content with proper spacing */}
      <main className="  min-h-screen bg-surface">
        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Personnel Management
              </p>
              <h2 className="text-black text-5xl font-bold uppercase leading-none">
                Team Directory
              </h2>
              <p className="text-secondary mt-2 max-w-xl">
                Manage your restaurant personnel, adjust permissions, and
                monitor active shifts from a centralized dashboard.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Staff</span>
            </button>
          </div>

          {/* Stats Grid */}
          <StaffStats stats={stats} />

          {/* Staff Table */}
          <div className="mt-6">
            <StaffTable
              staff={paginatedStaff}
              onEdit={openEditModal}
              onDelete={handleDeleteStaff}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Footer Meta Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-label-caps text-[10px] uppercase mb-2 tracking-wider">
                Access Logs
              </p>
              <p className="text-xs text-secondary">
                Last system update: Today at 04:12 AM
              </p>
              <p className="text-xs text-secondary">
                Security status: All nodes operational
              </p>
            </div>
            <div className="text-right flex flex-col justify-end">
              <p className="font-label-caps text-[10px] uppercase mb-2 tracking-wider">
                Internal Policy
              </p>
              <p className="text-xs italic text-secondary">
                "Efficiency through clarity, service through precision."
              </p>
            </div>
          </div>
        </div>
      </main>

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