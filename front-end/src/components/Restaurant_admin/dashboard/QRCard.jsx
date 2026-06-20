// src/components/Restaurant_admin/dashboard/QRCard.jsx

import React from 'react';

const QRCard = ({ onDownload, restaurantId, qrCodes = [] }) => {
  const hasQrCode = qrCodes && qrCodes.length > 0;
  const activeQrCode = hasQrCode ? qrCodes.find(q => q.is_active !== false) : null;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">QR Codes</h3>
          <span className="text-xs font-medium text-gray-500">
            {hasQrCode ? `${qrCodes.length} codes` : 'No codes'}
          </span>
        </div>
        
        {/* QR Code Preview */}
        <div className="bg-neutral-50 rounded-lg p-4 mb-4 flex items-center justify-center min-h-[120px]">
          {activeQrCode ? (
            <div className="flex flex-col items-center gap-2">
              <img 
                src={activeQrCode.qr_image_url} 
                alt="QR Code" 
                className="w-24 h-24 object-contain"
                onError={(e) => {
                  e.target.src = '/placeholder-qr.png';
                }}
              />
              <p className="text-xs text-gray-500">
                {activeQrCode.qr_type || 'Menu'} QR Code
              </p>
              <p className="text-xs text-gray-400">
                {activeQrCode.scan_count || 0} scans
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <span className="text-4xl block mb-2">📱</span>
              <p className="text-sm">No QR code generated</p>
              <p className="text-xs">Generate one from settings</p>
            </div>
          )}
        </div>

        <button
          onClick={onDownload}
          disabled={!activeQrCode}
          className="w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {hasQrCode ? 'Download QR Code' : 'Generate QR Code'}
        </button>
      </div>
    </div>
  );
};

export default QRCard;