

import React from "react";

const SettingsActionBar = ({ handleReset, handleSave, saving = false }) => {
  return (
    <div className="mt-auto pt-6 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          onClick={handleReset}
          disabled={saving}
          className="w-full sm:w-auto px-6 py-3 border border-black text-black font-semibold rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset to Default
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsActionBar;