import React from 'react';

const ProTipCard = () => {
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)] space-y-4">
      <h3 className="font-h3 text-h3">Pro Tip</h3>
      <p className="font-body-sm text-neutral-300">
        High-quality imagery increases customer engagement by up to 40%. Ensure your banner reflects the interior atmosphere
        of your dining room.
      </p>
      <div className="pt-2">
        <a href="#" className="inline-flex items-center bg-black text-white px-3 py-2 rounded-md font-button text-sm hover:bg-neutral-800 transition-colors">
          View Image Guide
          <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  );
};

export default ProTipCard;