

import React, { useState } from "react";
import { Download, QrCode, RefreshCw } from "lucide-react";
import { qrCodeAPI } from "../../../services/api";

const QRCodeCard = ({ restaurantName, restaurantId, qrCode }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrImage, setQrImage] = useState(qrCode?.qr_image_url || null);

  const handleDownload = async () => {
    if (!qrImage) {
      alert("No QR code available to download");
      return;
    }

    try {
      
      if (qrImage.startsWith('data:image')) {
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = `${restaurantName || 'restaurant'}-qr-code.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      
      const response = await fetch(qrImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${restaurantName || 'restaurant'}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('[QRCodeCard] Error downloading QR:', error);
      alert('Failed to download QR code');
    }
  };

  const handleGenerate = async () => {
    if (!restaurantId) {
      alert('No restaurant ID available');
      return;
    }

    try {
      setIsGenerating(true);
      const result = await qrCodeAPI.generate({
        restaurant_id: restaurantId,
        qr_type: 'menu',
      });
      
      if (result.success) {
        setQrImage(result.data?.qr_image_url);
        alert('QR Code generated successfully!');
      } else {
        alert(result.error || 'Failed to generate QR code');
      }
    } catch (error) {
      console.error('[QRCodeCard] Error generating QR:', error);
      alert('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-black text-white rounded-xl p-8 shadow-2xl relative overflow-hidden">
      {}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-2 relative z-10 flex items-center gap-2">
        <QrCode className="w-5 h-5" />
        Live Menu QR
      </h3>
      <p className="text-zinc-400 text-sm mb-8 relative z-10">
        Scan to view the current active menu on the customer platform.
      </p>
      
      <div className="bg-white p-4 rounded-xl inline-block mb-6 relative z-10 border-[3px] border-zinc-100">
        {qrImage ? (
          <img 
            src={qrImage} 
            alt="QR Code" 
            className="w-32 h-32 object-contain"
            onError={(e) => {
              e.target.src = '';
              e.target.alt = 'QR Code unavailable';
            }}
          />
        ) : (
          <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded">
            <span className="text-gray-400 text-xs text-center">
              No QR Code
              <br />
              Generate one below
            </span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3 relative z-10">
        {!qrImage && restaurantId && (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 py-3 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate QR Code'
            )}
          </button>
        )}
        <button 
          onClick={handleDownload}
          disabled={!qrImage}
          className={`flex-1 py-3 font-medium text-sm rounded transition-colors flex items-center justify-center gap-2 ${
            qrImage 
              ? 'bg-white text-black hover:bg-zinc-200' 
              : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          {qrImage ? 'Download QR' : 'No QR to Download'}
        </button>
      </div>
    </div>
  );
};

export default QRCodeCard;