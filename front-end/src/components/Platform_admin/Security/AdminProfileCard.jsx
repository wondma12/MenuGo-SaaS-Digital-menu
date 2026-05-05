import React from "react";
import Button from "../../ui/button";

const AdminProfileCard = () => {
  const handleEditProfile = () => {
    console.log("Editing profile...");
    // Add profile edit functionality
  };

  return (
    <div className="bg-white border border-outline-variant p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <h3 className="text-label-caps text-on-secondary-container mb-4">Identity Verification</h3>
      
      <div className="flex items-start gap-4 mb-6">
        <img 
          alt="Profile"
          className="w-12 h-12 rounded bg-surface-container-high object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg_V9ZTVqLz9ELTQUuCXREnOzlTZ2g9IUjQjNCvFGDpxbjTLAl1dW3KHWvx-HtCgMSbWr9JLMeFFvMr_N3LrbsasQQBgBSE3LjygR06XZ_qmccQ5oJC1peyhCFYj5DQ5sK8UWMdg8K_iY8jyfZTdvdh7zLV1mRRO0cF2mHhpsnOz34c36QbiEpsU7sM7sZTAR9RcQSPc6-ZhL1pPKqaXP-vlBraioQl2az_xtJcldXoI35ESjhgXhmMMgb3RFu_uZKod4d5OGkiG8"
        />
        <div>
          <p className="font-bold text-on-surface">Alex Rivera</p>
          <p className="text-body-sm text-on-secondary-container">Lead Platform Architect</p>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-0.5 bg-zinc-100 text-[10px] font-bold rounded">2FA ACTIVE</span>
            <span className="px-2 py-0.5 bg-zinc-100 text-[10px] font-bold rounded">SSL-PINNED</span>
          </div>
        </div>
      </div>
      
      <Button 
        label="Edit Profile"
        onClick={handleEditProfile}
        variant="secondary"
        className="w-full border border-black text-black py-2 hover:bg-zinc-50"
      />
    </div>
  );
};

export default AdminProfileCard;
