// src/components/admin/dashboard/QRCard.jsx
import React from 'react';

const QRCard = ({ onDownload }) => {
  return (
    <div className="bg-black text-white p-4 rounded-xl flex flex-col justify-between h-48 border border-black group">
      <div>
        <h4 className="font-h3 text-h3">QR Access</h4>
        <p className="text-xs text-neutral-400 mt-2">Manage customer digital menu links.</p>
      </div>
      <div className="flex justify-between items-end">
        <div className="w-12 h-12 bg-white p-1 rounded-sm overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Ft9Y1Ok0CuM_M9x1iJ6fU8KF7gUkU_Mt6UcULOflcMHIEQ_PgzmVUDOomkcPAL8CVD8TU9n5gxFb_KCbCz2mEkv45zthPJTQBi8M161bC7cy4XR2688eCa8i_WdS4AdKExMnkoQtzaIoQFVnsfprGaB8jhnjRCqnP0S7Zm9gT3UjqE8dxc7FtPYJ1-42zEMuHIMkDYEWp64Yxbyt2SihbvPHzSi8vTFsQ5SbUhqzRfAHGfF4yLNo2XGIox0581ga79Sm5dAWPaY"
            alt="QR Code"
            className="w-full h-full object-contain filter grayscale"
          />
        </div>
        <button
          onClick={onDownload}
          className="text-white hover:underline font-button text-sm"
        >
          Download All
        </button>
      </div>
    </div>
  );
};

export default QRCard;