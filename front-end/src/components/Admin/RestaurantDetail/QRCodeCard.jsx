import React from "react";

const QRCodeCard = ({ restaurantName }) => {
  const handleDownloadSVG = () => {
    console.log(`Downloading QR code SVG for ${restaurantName}`);
    // Add logic to download QR code SVG
  };

  return (
    <div className="bg-black text-white rounded-xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-2 relative z-10">Live Menu QR</h3>
      <p className="text-zinc-400 text-sm mb-8 relative z-10">
        Scan to view the current active menu on the customer platform.
      </p>
      
      <div className="bg-white p-4 rounded-xl inline-block mb-8 relative z-10 border-[3px] border-zinc-100">
        {/* QR Mockup */}
        <div className="w-32 h-32 bg-white flex flex-col gap-1">
          <div className="flex gap-1 h-1/4">
            <div className="w-1/4 bg-black"></div>
            <div className="flex-1 bg-zinc-100"></div>
            <div className="w-1/4 bg-black"></div>
          </div>
          <div className="flex-1 bg-zinc-100 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-black"></div>
          </div>
          <div className="flex gap-1 h-1/4">
            <div className="w-1/4 bg-black"></div>
            <div className="flex-1 bg-zinc-100"></div>
            <div className="w-1/4 bg-black"></div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleDownloadSVG}
        className="w-full py-3 bg-white text-black font-medium text-sm rounded hover:bg-zinc-200 transition-colors relative z-10"
      >
        Download SVG
      </button>
    </div>
  );
};

export default QRCodeCard;
