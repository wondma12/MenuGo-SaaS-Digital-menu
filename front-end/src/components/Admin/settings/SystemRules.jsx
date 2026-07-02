

import React from 'react';
import ToggleSwitch from '../../ui/ToggleSwitch';

const SystemRules = ({ formData, handleInputChange, handleToggleChange }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">SYSTEM RULES</h2>
        <p className="text-sm text-zinc-500">Control restaurant onboarding workflows and verification requirements for new merchants.</p>
      </div>
      <div className="md:col-span-2 bg-white border border-zinc-200 p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">DEFAULT RESTAURANT STATUS</label>
            <select
              name="defaultRestaurantStatus"
              value={formData.defaultRestaurantStatus || 'pending'}
              onChange={handleInputChange}
              className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base appearance-none bg-white"
            >
              <option value="pending">Pending (Requires Admin Approval)</option>
              <option value="active">Auto-approve (Active Immediately)</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-zinc-200">
            <div className="flex flex-col">
              <span className="text-base font-bold text-black">ALLOW SELF REGISTRATION</span>
              <span className="text-sm text-zinc-500">Enable public sign-up for new restaurants.</span>
            </div>
            <ToggleSwitch
              checked={formData.allowSelfRegistration !== undefined ? formData.allowSelfRegistration : true}
              onChange={handleToggleChange('allowSelfRegistration')}
              id="toggle-self-reg"
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col">
              <span className="text-base font-bold text-black">REQUIRE VERIFICATION DOCUMENTS</span>
              <span className="text-sm text-zinc-500">Ask for business licenses during onboarding.</span>
            </div>
            <ToggleSwitch
              checked={formData.requireVerification || false}
              onChange={handleToggleChange('requireVerification')}
              id="toggle-verify"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemRules;