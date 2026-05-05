import React from "react";

const LiveSessionIndicator = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white p-4 rounded-lg shadow-xl flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-label-caps tracking-widest">LIVE SESSION ACTIVE</span>
      </div>
    </div>
  );
};

export default LiveSessionIndicator;
