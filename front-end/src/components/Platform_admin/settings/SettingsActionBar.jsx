import React from "react";

const SettingsActionBar = ({ handleReset, handleSave }) => {
  return (
    <div className="mt-auto pt-6 border-t border-surface-variant">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-black text-black font-semibold rounded-lg hover:bg-surface-container-low transition-colors active:scale-95"
        >
          Reset to Default
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsActionBar;
