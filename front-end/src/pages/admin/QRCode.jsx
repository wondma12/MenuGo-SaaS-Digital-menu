import React, { useState } from "react";
import QRGenerator from "../../components/admin/qr/QRGenerator";
import { QrCode, Download, Printer, Share2, Eye, CheckCircle } from "lucide-react";

const QRCode = () => {
  const restaurantId = "rest_12345";
  const restaurantName = "MenuGo Restaurant";
  const [copySuccess, setCopySuccess] = useState(false);

  const stats = {
    scans: 1254,
    lastScan: "2 minutes ago",
    activeQR: 1,
    totalRestaurants: 1,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://menugo.com/restaurant/${restaurantId}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Code Manager</h1>
          <p className="text-gray-600 mt-1">Generate and customize your restaurant's QR code</p>
        </div>
        {copySuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Link copied to clipboard!</span>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scans}</p>
              <p className="text-xs text-green-600 mt-1">↑ +12% this week</p>
            </div>
            <QrCode size={28} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Last Scan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.lastScan}</p>
              <p className="text-xs text-gray-500 mt-1">Real-time</p>
            </div>
            <Eye size={28} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Active QR Codes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeQR}</p>
              <p className="text-xs text-gray-500 mt-1">For this restaurant</p>
            </div>
            <QrCode size={28} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Menu Link</p>
              <p className="text-lg font-semibold text-gray-900 truncate">menugo.com/...</p>
              <button 
                onClick={handleCopyLink}
                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
              >
                Copy link
              </button>
            </div>
            <Share2 size={28} className="text-orange-500" />
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold">💡</span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">Pro Tip</p>
            <p className="text-xs text-blue-600 mt-1">
              Place QR codes on tables, at the entrance, and on takeout bags for maximum visibility
            </p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 font-bold">📈</span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Analytics Insight</p>
            <p className="text-xs text-green-600 mt-1">
              Restaurants with QR codes see 40% more orders on average
            </p>
          </div>
        </div>
      </div>

      {/* Main QR Generator */}
      <QRGenerator restaurantId={restaurantId} restaurantName={restaurantName} />

      {/* Usage Instructions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">How to use your QR Code</h3>
          <p className="text-xs text-gray-500 mt-1">Follow these steps to get started</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Download QR Code</h4>
              <p className="text-sm text-gray-500">
                Download your QR code in high resolution for printing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Print & Display</h4>
              <p className="text-sm text-gray-500">
                Print the QR code and place it on tables or at your entrance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Start Scanning</h4>
              <p className="text-sm text-gray-500">
                Customers scan to view your digital menu instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-1">Is the QR code free?</h4>
            <p className="text-sm text-gray-500">
              Yes, QR code generation is included in all plans. You can generate and download unlimited QR codes.
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-1">Can I customize the QR code design?</h4>
            <p className="text-sm text-gray-500">
              Yes, you can customize colors, add your logo, and choose different sizes. Pro and Enterprise plans offer advanced customization.
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-1">What happens if I change my menu?</h4>
            <p className="text-sm text-gray-500">
              The QR code stays the same! It links to your digital menu which updates automatically when you make changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;