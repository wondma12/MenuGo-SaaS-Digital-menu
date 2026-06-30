

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import StaffStats from "../../components/Restaurant_admin/staff/StaffStats";
import StaffTable from "../../components/Restaurant_admin/staff/StaffTable";
import AddStaffModal from "../../components/Restaurant_admin/staff/AddStaffModal";
import staffService from "../../services/staffServices";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalStaff: 0,
    activeNow: 0,
    admins: 0,
    waitstaff: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 5;

  
  
  



const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    
    const staffResult = await staffService.getAll();
    console.log('[StaffManagement] Staff result:', staffResult);
    
    
    let staffData = [];
    if (staffResult && staffResult.success) {
      staffData = Array.isArray(staffResult.data) ? staffResult.data : [];
    } else if (Array.isArray(staffResult)) {
      staffData = staffResult;
    } else if (staffResult && typeof staffResult === 'object') {
      
      if (staffResult.data && Array.isArray(staffResult.data)) {
        staffData = staffResult.data;
      } else {
        
        const possibleArray = Object.values(staffResult).find(val => Array.isArray(val));
        staffData = possibleArray || [];
      }
    }
    
    console.log('[StaffManagement] Extracted staff data:', staffData);
    setStaff(staffData);
    
    
    const total = staffData.length;
    const admins = staffData.filter(s => s.role === 'restaurant_admin' || s.role === 'admin').length;
    const waitstaff = staffData.filter(s => s.role === 'waiter').length;
    const activeNow = staffData.filter(s => s.is_active !== false).length;
    
    setStats({
      totalStaff: total,
      activeNow,
      admins,
      waitstaff,
    });
  } catch (err) {
    console.error('[StaffManagement] Error loading staff:', err);
    setError(err.message || 'Failed to load staff data');
    setStaff([]);  
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  
  
  

  const paginatedStaff = staff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  
  
  

  const handleAddStaff = async (newStaff) => {
    setIsSubmitting(true);
    try {
      const result = await staffService.add(newStaff);
      if (result.success) {
        await loadData();
        setIsModalOpen(false);
      } else {
        alert(result.error || 'Failed to add staff member');
      }
    } catch (error) {
      console.error('[StaffManagement] Error adding staff:', error);
      alert('Failed to add staff member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditStaff = async (updatedStaff) => {
    setIsSubmitting(true);
    try {
      const result = await staffService.update(editingStaff.id, updatedStaff);
      if (result.success) {
        setEditingStaff(null);
        await loadData();
        setIsModalOpen(false);
      } else {
        alert(result.error || 'Failed to update staff member');
      }
    } catch (error) {
      console.error('[StaffManagement] Error updating staff:', error);
      alert('Failed to update staff member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to remove this staff member?")) {
      return;
    }

    try {
      const result = await staffService.delete(id);
      if (result.success) {
        await loadData();
      } else {
        alert(result.error || 'Failed to delete staff member');
      }
    } catch (error) {
      console.error('[StaffManagement] Error deleting staff:', error);
      alert('Failed to delete staff member. Please try again.');
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

  
  
  

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            {}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>

            {}
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  
  
  

  if (error) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Staff</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadData}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  
  
  

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-surface">
        <div className="p-8 max-w-[1200px] mx-auto">
          {}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Personnel Management
              </p>
              <h2 className="text-black text-3xl md:text-5xl font-bold uppercase leading-none">
                Team Directory
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl text-sm">
                Manage your restaurant personnel, adjust permissions, and
                monitor active shifts from a centralized dashboard.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
            >
              <span className="text-sm mr-1">+</span>
              <span>Add Staff</span>
            </button>
          </div>

          {}
          <StaffStats stats={stats} />

          {}
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

          {}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
            <div className="border-l-2 border-gray-300 pl-4">
              <p className="text-[10px] font-bold uppercase mb-2 tracking-wider text-gray-500">
                Access Logs
              </p>
              <p className="text-xs text-gray-500">
                Last system update: {new Date().toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Security status: All nodes operational
              </p>
            </div>
            <div className="text-right flex flex-col justify-end">
              <p className="text-[10px] font-bold uppercase mb-2 tracking-wider text-gray-500">
                Internal Policy
              </p>
              <p className="text-xs italic text-gray-500">
                "Efficiency through clarity, service through precision."
              </p>
            </div>
          </div>
        </div>
      </main>

      {}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStaff(null);
        }}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
        editingStaff={editingStaff}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default StaffManagement;