// src/pages/Restaurant_admin/staffManagement.jsx
import React, { useState, useEffect } from 'react';
import StaffStats from '../../components/admin/staff/StaffStats';
import StaffTable from '../../components/admin/staff/StaffTable';
import AddStaffModal from '../../components/admin/staff/AddStaffModal';
import { staffService } from '../../services/staffServices';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({ totalStaff: 0, activeNow: 0, admins: 0, waitstaff: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadData();
  }, []);

  const loadData = async () => {
    const staffData = await staffService.getAll();
    setStaff(staffData);
    const statsData = await staffService.getStats();
    setStats(statsData);
  };

  const paginatedStaff = staff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
    if (window.confirm('Are you sure you want to remove this staff member?')) {
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
    <div className="min-h-screen p-8 pt-0 bg-surface">
      

      {/* TopAppBar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-10 h-16 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4">
          <span className="font-sans text-base font-semibold tracking-tight text-black">Staff Management</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button
              aria-label="Notifications"
              title="Notifications"
              className="p-2 rounded-sm hover:bg-neutral-100 transition-all duration-200 text-neutral-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
          </div>
          <button
            aria-label="Account"
            title="Account"
            className="p-1 rounded-full hover:bg-neutral-100 transition-all duration-200 text-neutral-400 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20a8 8 0 0116 0" />
            </svg>
          </button>
        </div>
      </header>
      <br />
      {/* Main Content */}
      <main className="p-lg bg-surface min-h-screen">
        <div className="max-w-container-max mx-auto">
          {/* Header Section */}
          <div className="flex items-end justify-between mb-lg">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface mb-xs">Team Directory</h1>
              <p className="font-body-md text-secondary max-w-xl">
                Manage your restaurant personnel, adjust permissions, and monitor active shifts from a centralized dashboard.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">+</span>
                <span>Add Staff</span>
            </button>
          </div>  
        
          {/* Stats Grid */}
          <StaffStats stats={stats} />

          {/* Staff Table */}
          <StaffTable
            staff={paginatedStaff}
            onEdit={openEditModal}
            onDelete={handleDeleteStaff}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Footer Meta Info */}
          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-xl opacity-60 mt-10">
            <div className="border-l border-neutral-300 pl-lg">
              <p className="font-label-caps text-[10px] uppercase mb-2">Access Logs</p>
              <p className="text-[12px]">Last system update: Today at 04:12 AM</p>
              <p className="text-[12px]">Security status: All nodes operational</p>
            </div>
            <div className="text-right flex flex-col justify-end">
              <p className="font-label-caps text-[10px] uppercase mb-2">Internal Policy</p>
              <p className="text-[12px] italic">"Efficiency through clarity, service through precision."</p>
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