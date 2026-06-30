

import React from 'react';
import { Download, QrCode } from 'lucide-react';

const QRCard = ({ onDownload, restaurantId, qrCodes = [], restaurant }) => {
  
  let qrImageUrl = null;
  
  
  if (qrCodes && Array.isArray(qrCodes) && qrCodes.length > 0) {
    const activeQr = qrCodes.find(q => q.is_active !== false);
    if (activeQr && activeQr.qr_image_url) {
      qrImageUrl = activeQr.qr_image_url;
    }
  }
  
  
  if (!qrImageUrl && restaurant && restaurant.qr_code) {
    qrImageUrl = restaurant.qr_code;
  }
  
  const hasQrCode = !!qrImageUrl;
  

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code
          </h3>
          <span className="text-xs font-medium text-gray-500">
            {hasQrCode ? 'Active' : 'Not generated'}
          </span>
        </div>
        
        <div className="bg-neutral-50 rounded-lg p-4 mb-4 flex items-center justify-center min-h-[120px]">
          {hasQrCode ? (
            <div className="flex flex-col items-center gap-2">
              <img 
                src={qrImageUrl} 
                alt="Restaurant QR Code" 
                className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                onError={(e) => {
                  console.error('[QRCard] Failed to load QR image');
                  e.target.src = '';
                  e.target.alt = 'QR Code unavailable';
                }}
              />
              <p className="text-[10px] text-gray-400">
                Scan to view menu
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No QR code generated</p>
              <p className="text-xs">Generate one from Settings</p>
            </div>
          )}
        </div>

        <button
          onClick={onDownload}
          disabled={!hasQrCode}
          className={`w-full text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            hasQrCode 
              ? 'bg-black text-white hover:bg-neutral-800' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          {hasQrCode ? 'Download QR Code' : 'No QR to Download'}
        </button>
      </div>
    </div>
  );
};

export default QRCard;