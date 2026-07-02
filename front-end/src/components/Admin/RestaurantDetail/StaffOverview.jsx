

import React from "react";
import { Award, MoreVertical, User, Users, UserCog } from "lucide-react";

const StaffOverview = ({ staff = [] }) => {
  const handleStaffAction = (action, staffMember) => {
    console.log(`Action: ${action} on staff member:`, staffMember);
  };

  
  const staffArray = Array.isArray(staff) ? staff : [];
  
  
  const totalStaff = staffArray.length;
  const admins = staffArray.filter(s => s.role === 'restaurant_admin' || s.role === 'admin').length;
  const waiters = staffArray.filter(s => s.role === 'waiter').length;

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return "N/A";
    }
  };

  
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  
  const getRoleStyle = (role) => {
    const roleMap = {
      'restaurant_admin': 'bg-black text-white',
      'admin': 'bg-black text-white',
      'waiter': 'bg-zinc-200 text-black',
    };
    return roleMap[role?.toLowerCase()] || 'bg-zinc-200 text-black';
  };

  
  const getRoleDisplay = (role) => {
    const roleMap = {
      'restaurant_admin': 'ADMIN',
      'admin': 'ADMIN',
      'waiter': 'WAITER',
    };
    return roleMap[role?.toLowerCase()] || role?.toUpperCase() || 'STAFF';
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="p-8 pb-0">
        <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <Award className="w-6 h-6" />
          Staff Overview
        </h3>

        <div className="flex gap-12 mb-8">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">{totalStaff}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1">
              <Users className="w-3 h-3" />
              TOTAL STAFF
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">{String(admins).padStart(2, '0')}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1">
              <UserCog className="w-3 h-3" />
              ADMINS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">{String(waiters).padStart(2, '0')}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1">
              <User className="w-3 h-3" />
              WAITERS
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-y border-zinc-200">
            <tr>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                STAFF MEMBER
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                ROLE
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                EMAIL
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                JOINED
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {staffArray.length > 0 ? (
              staffArray.map((member, index) => (
                <tr key={member.id || index} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-[10px] text-zinc-600">
                        {getInitials(member.name)}
                      </div>
                      <span className="text-sm font-bold">{member.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getRoleStyle(member.role)}`}>
                      {getRoleDisplay(member.role)}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-zinc-500">
                    {member.email || "N/A"}
                  </td>
                  <td className="px-8 py-4 text-sm text-zinc-500">
                    {formatDate(member.created_at || member.createdAt || member.joinedDate)}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button
                      onClick={() => handleStaffAction("more", member)}
                      className="text-zinc-300 hover:text-black transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-12 text-center text-zinc-400">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-8 h-8 text-zinc-300" />
                    <p>No staff members assigned</p>
                    <p className="text-xs">This restaurant has no staff yet</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {staffArray.length > 0 && (
        <div className="p-6 text-center border-t border-zinc-100">
          <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
            View All {totalStaff} Staff Members
          </button>
        </div>
      )}
    </div>
  );
};

export default StaffOverview;