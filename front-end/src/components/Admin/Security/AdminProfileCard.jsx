

import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Mail, Shield, Calendar, Edit2, Phone, User } from "lucide-react";
import { authAPI } from "../../../services/api";

const AdminProfileCard = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authAPI.getCurrentUser();
      
      if (result.success && result.user) {
        setAdmin(result.user);
      } else {
        setError(result.error || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      setError(error.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    console.log("Editing profile...");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name) => {
    if (!name) return "AD";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleDisplay = (role) => {
    const roleMap = {
      'platform_admin': 'Platform Administrator',
      'restaurant_admin': 'Restaurant Administrator',
      'waiter': 'Waiter',
    };
    return roleMap[role] || role || 'Administrator';
  };

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="text-center text-red-500">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchAdminProfile}
            className="mt-2 px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Identity Verification
        </h3>
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          Verified
        </span>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <img
            alt={admin.name || "Admin"}
            className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
            src={admin.profile_image || `https://ui-avatars.com/api/?name=${getInitials(admin.name)}&background=000000&color=fff&size=56`}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${getInitials(admin.name)}&background=000000&color=fff&size=56`;
            }}
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-black text-lg">{admin.name || "Admin User"}</p>
          <p className="text-sm text-zinc-500">{getRoleDisplay(admin.role)}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-full">
              2FA ACTIVE
            </span>
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] font-bold rounded-full">
              SSL-PINNED
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-zinc-600">
          <Mail className="w-4 h-4 text-zinc-400" />
          <span>{admin.email}</span>
        </div>
        {admin.phone && (
          <div className="flex items-center gap-2 text-zinc-600">
            <Phone className="w-4 h-4 text-zinc-400" />
            <span>{admin.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-zinc-600">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span>Joined {formatDate(admin.created_at || admin.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600">
          <Shield className="w-4 h-4 text-zinc-400" />
          <span className="capitalize">{getRoleDisplay(admin.role)}</span>
        </div>
      </div>

      <button
        onClick={handleEditProfile}
        className="w-full mt-4 py-2.5 border border-black text-black rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <Edit2 className="w-4 h-4" />
        Edit Profile
      </button>
    </div>
  );
};

export default AdminProfileCard;