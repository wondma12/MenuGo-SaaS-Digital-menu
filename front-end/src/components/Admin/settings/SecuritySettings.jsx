

import React from 'react';
import ToggleSwitch from '../../ui/ToggleSwitch';

const SecuritySettings = ({ formData, handleInputChange, handleToggleChange }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">SECURITY SETTINGS</h2>
        <p className="text-sm text-zinc-500">Configure global authentication policies and session management for platform safety.</p>
      </div>
      <div className="md:col-span-2 bg-white border border-zinc-200 p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">MIN PASSWORD LENGTH</label>
            <input
              name="minPasswordLength"
              value={formData.minPasswordLength || 12}
              onChange={handleInputChange}
              className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base"
              min="8"
              max="32"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">SESSION TIMEOUT (MIN)</label>
            <input
              name="sessionTimeout"
              value={formData.sessionTimeout || 60}
              onChange={handleInputChange}
              className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base"
              min="5"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between py-4 border-b border-zinc-200">
            <div className="flex flex-col">
              <span className="text-base font-bold text-black">ENABLE EMAIL VERIFICATION</span>
              <span className="text-sm text-zinc-500">Force new users to verify email before access.</span>
            </div>
            <ToggleSwitch
              checked={formData.enableEmailVerification !== undefined ? formData.enableEmailVerification : true}
              onChange={handleToggleChange('enableEmailVerification')}
              id="toggle-email-v"
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col">
              <span className="text-base font-bold text-black">ENABLE ACCOUNT SUSPENSION</span>
              <span className="text-sm text-zinc-500">Allows admins to temporarily lock access.</span>
            </div>
            <ToggleSwitch
              checked={formData.enableAccountSuspension !== undefined ? formData.enableAccountSuspension : true}
              onChange={handleToggleChange('enableAccountSuspension')}
              id="toggle-suspend"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySettings;