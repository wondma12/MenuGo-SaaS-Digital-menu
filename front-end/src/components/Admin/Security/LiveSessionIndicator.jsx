

import React, { useState, useEffect } from "react";
import { Circle, Shield, User, Clock, LogOut } from "lucide-react";
import { authAPI } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const LiveSessionIndicator = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    active: false,
    user: null,
    since: null,
  });
  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const token = authAPI.getToken();
      const user = authAPI.getUser();
      
      if (token && user) {
        setSession({
          active: true,
          user: user.name || user.email,
          since: new Date().toLocaleTimeString(),
        });
      } else {
        setSession({
          active: false,
          user: null,
          since: null,
        });
      }
    };

    checkSession();

    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const sessionInterval = setInterval(checkSession, 30000);

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkSession();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(timeInterval);
      clearInterval(sessionInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to end your session?")) {
      authAPI.logout();
      navigate("/auth/login");
    }
  };

  
  if (!session.active) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className="bg-black text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10 cursor-pointer hover:bg-neutral-900 transition-colors"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 text-green-400 fill-green-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest">LIVE</span>
        </div>
        
        <div className="h-6 w-px bg-white/20"></div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium truncate max-w-[120px]">
            {session.user || "Admin"}
          </span>
        </div>
        
        <div className="h-6 w-px bg-white/20"></div>
        
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-mono">{time}</span>
        </div>
      </div>

      {showDetails && (
        <div className="absolute bottom-full right-0 mb-3 w-72 bg-black/95 backdrop-blur-sm text-white rounded-xl shadow-2xl border border-white/10 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Session Details
              </span>
              <span className="flex items-center gap-1.5">
                <Circle className="w-2 h-2 text-green-400 fill-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400 font-medium">Active</span>
              </span>
            </div>
            
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300">{session.user}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300">Session active</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex gap-2">
              <button
                onClick={() => {
                  setShowDetails(false);
                  navigate("/admin/settings");
                }}
                className="flex-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessionIndicator;