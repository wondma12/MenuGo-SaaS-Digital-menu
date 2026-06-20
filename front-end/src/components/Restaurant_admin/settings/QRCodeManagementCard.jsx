// src/components/Restaurant_admin/settings/QRCodeManagementCard.jsx

import React, { useState } from 'react';
import { Download, Eye, EyeOff, Trash2, RefreshCw } from 'lucide-react';

const QRCodeManagementCard = ({
  qrCodes = [],
  restaurantName,
  onGenerate,
  onDownload,
  onToggleStatus,
  onDelete,
  isGenerating = false,
}) => {
  const [expanded, setExpanded] = useState(true);
  const activeQrCode = qrCodes.find(q => q.is_active !== false);
  const inactiveQrCodes = qrCodes.filter(q => q.is_active === false);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div 
        className="p-6 border-b border-neutral-100 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className="font-bold text-gray-900">QR Code Management</h3>
          <p className="text-sm text-gray-500">Manage your restaurant QR codes</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {qrCodes.length} codes
          </span>
          <span className="text-gray-400">{expanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {expanded && (
        <div className="p-6 space-y-4">
          {/* Generate QR Code Section */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Generate QR Code</p>
                <p className="text-xs text-gray-500">
                  {restaurantName ? `For ${restaurantName}` : 'For your restaurant'}
                </p>
              </div>
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Generate QR Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active QR Code Display */}
          {activeQrCode && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                    {activeQrCode.qr_image_url ? (
                      <img 
                        src={activeQrCode.qr_image_url} 
                        alt="Active QR Code" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-2xl">📱</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      Active QR Code
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {activeQrCode.qr_type || 'Menu'} QR Code
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeQrCode.scan_count || 0} scans
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(activeQrCode.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onDownload(activeQrCode.qr_image_url, `${restaurantName || 'restaurant'}-qr`)}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Download QR Code"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(activeQrCode.id, false)}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Deactivate QR Code"
                  >
                    <EyeOff className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inactive QR Codes */}
          {inactiveQrCodes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                Inactive QR Codes
              </p>
              {inactiveQrCodes.map((qr) => (
                <div key={qr.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {qr.qr_image_url ? (
                        <img 
                          src={qr.qr_image_url} 
                          alt="QR Code" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-lg">📱</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {qr.qr_type || 'Menu'} QR Code
                      </p>
                      <p className="text-xs text-gray-400">
                        {qr.scan_count || 0} scans • Inactive
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleStatus(qr.id, true)}
                      className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                      title="Activate QR Code"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDelete(qr.id)}
                      className="p-1.5 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors"
                      title="Delete QR Code"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No QR Codes Message */}
          {qrCodes.length === 0 && (
            <div className="text-center py-6">
              <span className="text-4xl block mb-3">📱</span>
              <p className="text-sm text-gray-500">No QR codes found</p>
              <p className="text-xs text-gray-400">Click "Generate QR Code" to create one</p>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-600">
              💡 QR codes allow customers to view your menu and place orders directly from their phones. 
              Generate a QR code to display at tables or on promotional materials.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeManagementCard;