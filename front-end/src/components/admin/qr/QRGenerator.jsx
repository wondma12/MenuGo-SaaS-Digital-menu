import React, { useState, useRef } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Download, Printer, Share2, Copy, Check, RefreshCw, Palette, Maximize, Minimize } from "lucide-react";

const QRGenerator = ({ restaurantId, restaurantName }) => {
  const [qrSize, setQrSize] = useState(250);
  const [qrColor, setQrColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#FFFFFF");
  const [withLogo, setWithLogo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const qrRef = useRef(null);

  const menuUrl = `https://menugo.com/restaurant/${restaurantId}`;
  
  // Mock QR code URL - in real app, this would be generated from backend
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(menuUrl)}&color=${qrColor.replace("#", "")}&bgcolor=${qrBgColor.replace("#", "")}`;

  const handleDownload = () => {
    setIsLoading(true);
    const link = document.createElement('a');
    link.download = `menugo-qr-${restaurantName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = qrCodeUrl;
    link.click();
    setTimeout(() => setIsLoading(false), 500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ${restaurantName}</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-family: Arial, sans-serif;
            }
            .container {
              text-align: center;
            }
            img {
              max-width: 300px;
              margin-bottom: 20px;
            }
            h2 {
              margin-bottom: 10px;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${qrCodeUrl}" />
            <h2>${restaurantName}</h2>
            <p>Scan to view our digital menu</p>
            <p style="font-size: 12px;">${menuUrl}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${restaurantName} - Digital Menu`,
          text: 'Scan this QR code to view our digital menu!',
          url: menuUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleReset = () => {
    setQrColor("#000000");
    setQrBgColor("#FFFFFF");
    setQrSize(250);
    setWithLogo(false);
  };

  return (
    <Card title="QR Code Generator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - QR Code Display */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6 flex justify-center items-center min-h-[350px]">
            <div className="relative">
              <img
                ref={qrRef}
                src={qrCodeUrl}
                alt="Restaurant QR Code"
                width={qrSize}
                height={qrSize}
                className="mx-auto shadow-lg rounded-lg"
                style={{ backgroundColor: qrBgColor }}
              />
              {withLogo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-black">MG</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QR Code Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600">Size</p>
              <p className="text-sm font-semibold text-blue-900">{qrSize}x{qrSize}px</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-xs text-purple-600">Format</p>
              <p className="text-sm font-semibold text-purple-900">PNG</p>
            </div>
          </div>
        </div>

        {/* Right Column - Customization Options */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Size
            </label>
            <div className="flex items-center gap-4">
              <Minimize size={16} className="text-gray-400" />
              <input
                type="range"
                min="150"
                max="400"
                step="10"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <Maximize size={16} className="text-gray-400" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Small</span>
              <span className="text-xs text-gray-500">Medium</span>
              <span className="text-xs text-gray-500">Large</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Add Restaurant Logo</p>
              <p className="text-xs text-gray-500">Display logo in center of QR code</p>
            </div>
            <button
              onClick={() => setWithLogo(!withLogo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                withLogo ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  withLogo ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Link
            </label>
            <div className="flex gap-2">
              <Input
                value={menuUrl}
                readOnly
                className="flex-1 bg-white text-sm"
              />
              <Button
                label={copied ? "Copied!" : "Copy"}
                variant="secondary"
                onClick={handleCopyLink}
                icon={copied ? <Check size={16} /> : <Copy size={16} />}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              label={isLoading ? "Downloading..." : "Download QR Code"}
              variant="primary"
              onClick={handleDownload}
              icon={<Download size={16} />}
              className="flex-1"
            />
            <Button
              label="Print"
              variant="secondary"
              onClick={handlePrint}
              icon={<Printer size={16} />}
            />
            <Button
              label="Share"
              variant="secondary"
              onClick={handleShare}
              icon={<Share2 size={16} />}
            />
          </div>

          <Button
            label="Reset to Default"
            variant="secondary"
            onClick={handleReset}
            icon={<RefreshCw size={16} />}
            className="w-full"
          />
        </div>
      </div>

      {/* Color Presets */}
      <div className="mt-6 pt-6 border-t">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quick Color Presets
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Classic Black", color: "#000000", bg: "#FFFFFF" },
            { name: "Modern Blue", color: "#2563EB", bg: "#FFFFFF" },
            { name: "Elegant Gold", color: "#D97706", bg: "#FFFFFF" },
            { name: "Vibrant Red", color: "#DC2626", bg: "#FFFFFF" },
            { name: "Dark Mode", color: "#FFFFFF", bg: "#000000" },
            { name: "Forest Green", color: "#059669", bg: "#FFFFFF" },
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQrColor(preset.color);
                setQrBgColor(preset.bg);
              }}
              className="flex flex-col items-center gap-1 group"
            >
              <div 
                className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: preset.bg }}
              >
                <div 
                  className="w-full h-full rounded-lg opacity-80"
                  style={{ backgroundColor: preset.color }}
                />
              </div>
              <span className="text-xs text-gray-500">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QRGenerator;