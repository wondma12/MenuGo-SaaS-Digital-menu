

import React, { useState } from "react";
import { Download, Eye, EyeOff, Trash2, RefreshCw, QrCode } from "lucide-react";

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

  
  const qrCodesArray = Array.isArray(qrCodes) ? qrCodes : [];
  const activeQrCode = qrCodesArray.find((q) => q.is_active !== false);
  const inactiveQrCodes = qrCodesArray.filter((q) => q.is_active === false);

  
  const hasQrCode = qrCodesArray.length > 0;
  const hasActiveQrCode = !!activeQrCode;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      {}
      <div
        className="p-6 border-b border-neutral-100 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-zinc-600" />
          <h3 className="font-bold text-gray-900">QR Code Management</h3>
          {hasActiveQrCode && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {qrCodesArray.length} {qrCodesArray.length === 1 ? "code" : "codes"}
          </span>
          <span className="text-gray-400">{expanded ? "▼" : "▶"}</span>
        </div>
      </div>

      {expanded && (
        <div className="p-6 space-y-4">
          {}
          {!hasQrCode && (
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Generate QR Code
                  </p>
                  <p className="text-xs text-gray-500">
                    {restaurantName
                      ? `For ${restaurantName}`
                      : "For your restaurant"}
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
          )}

          {}
          {hasActiveQrCode ? (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                    {activeQrCode.qr_image_url ? (
                      <img
                        src={activeQrCode.qr_image_url}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                        onLoad={() => {
                          console.log("✅ QR IMAGE LOADED");
                          console.log(
                            "Length:",
                            activeQrCode.qr_image_url?.length,
                          );
                        }}
                        onError={(e) => {
                          console.error("❌ QR IMAGE FAILED");
                          console.log("QR Object:", activeQrCode);
                          console.log("QR URL:", activeQrCode.qr_image_url);
                          console.log(
                            "Length:",
                            activeQrCode.qr_image_url?.length,
                          );

                          e.target.src =
                            "https://via.placeholder.com/80x80?text=QR";
                        }}
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
                      {activeQrCode.qr_type || "Menu"} QR Code
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeQrCode.scan_count || 0} scans
                    </p>
                    <p className="text-xs text-gray-400">
                      Created:{" "}
                      {activeQrCode.created_at
                        ? new Date(activeQrCode.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {}
                  <button
                    onClick={() =>
                      onDownload(
                        activeQrCode.qr_image_url,
                        `${restaurantName || "restaurant"}-qr`,
                      )
                    }
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Download QR Code"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  {}
                  <button
                    onClick={() => onDelete(activeQrCode.id)}
                    className="p-2 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete QR Code"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            
            !hasQrCode && (
              <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <QrCode className="w-12 h-12 text-yellow-400" />
                  <p className="text-sm font-medium text-gray-700">
                    No QR Code Generated
                  </p>
                  <p className="text-xs text-gray-500">
                    Generate a QR code to allow customers to view your menu
                  </p>
                  <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="mt-2 px-4 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? "Generating..." : "Generate QR Code"}
                  </button>
                </div>
              </div>
            )
          )}

          {}
          {inactiveQrCodes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                Inactive QR Codes ({inactiveQrCodes.length})
              </p>
              {inactiveQrCodes.map((qr) => (
                <div
                  key={qr.id}
                  className="border border-gray-200 rounded-lg p-3 flex items-center justify-between bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {qr.qr_image_url ? (
                        <img
                          src={qr.qr_image_url}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                          onLoad={() => {
                            console.log("Inactive QR Loaded");
                          }}
                          onError={() => {
                            console.error("Inactive QR Failed");
                            console.log(qr);
                          }}
                        />
                      ) : (
                        <span className="text-lg">📱</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {qr.qr_type || "Menu"} QR Code
                      </p>
                      <p className="text-xs text-gray-400">
                        {qr.scan_count || 0} scans • Inactive
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {}
                    <button
                      onClick={() => onToggleStatus(qr.id, true)}
                      className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                      title="Activate QR Code"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    {}
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

          {}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-600">
              💡 QR codes allow customers to view your menu and place orders
              directly from their phones. Generate a QR code to display at
              tables or on promotional materials.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeManagementCard;
