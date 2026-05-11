import React from "react";
import { Badge, MoreVertical } from "lucide-react";

const StaffOverview = ({ staff }) => {
  const handleStaffAction = (action, staffMember) => {
    console.log(`Action: ${action} on staff member: ${staffMember.name}`);
    // Add logic for staff actions
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="p-8 pb-0">
        <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <Badge className="w-6 h-6" />
          Staff Overview
        </h3>

        <div className="flex gap-12 mb-8">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">{staff.total}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              TOTAL STAFF
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">
              {staff.admins?.toString().padStart(2, "0") || "00"}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              ADMINS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black">
              {staff.waiters?.toString().padStart(2, "0") || "00"}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
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
            {staff.members?.map((member, index) => (
              <tr key={index} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-[10px]">
                      {member.initials}
                    </div>
                    <span className="text-sm font-bold">{member.name}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-sm">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      member.role === "ADMIN"
                        ? "bg-black text-white"
                        : "bg-zinc-200 text-black"
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-8 py-4 text-sm text-zinc-500">
                  {member.email}
                </td>
                <td className="px-8 py-4 text-sm text-zinc-500">
                  {member.joinedDate}
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
            )) || (
              <tr>
                <td
                  colSpan="5"
                  className="px-8 py-12 text-center text-zinc-400"
                >
                  No staff members available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6 text-center border-t border-zinc-100">
        <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
          View All {staff.total} Staff Members
        </button>
      </div>
    </div>
  );
};

export default StaffOverview;
