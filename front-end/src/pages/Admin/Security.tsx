import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import Table from "../../components/ui/Table";
import { Button } from "../../components/ui/button";
import Card from "../../components/ui/card";
import SecurityAccessLogs from "../../components/Admin/Security/SecurityAccessLogs";
import PlatformConfig from "../../components/Admin/Security/PlatformConfig";
import AdminProfileCard from "../../components/Admin/Security/AdminProfileCard";
import ThreatAlert from "../../components/Admin/Security/ThreatAlert";
import SecurityPolicy from "../../components/Admin/Security/SecurityPolicy";
import NetworkWhitelist from "../../components/Admin/Security/NetworkWhitelist";
import LiveSessionIndicator from "../../components/Admin/Security/LiveSessionIndicator";

const Security = () => {
  const [dataRetention, setDataRetention] = useState(true);
  const [environment, setEnvironment] = useState("production");

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Security" />

      <main className="ml-64 pt-24 pb-12 px-8 max-w-[1200px]">
        {/* Bento Grid Section */}
        <div className="grid grid-cols-12 gap-6">
          {/* Security Logs Table (8 cols) */}
          <div className="col-span-12 lg:col-span-8">
            <SecurityAccessLogs />
          </div>

          {/* Platform Config (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <PlatformConfig
              environment={environment}
              setEnvironment={setEnvironment}
              dataRetention={dataRetention}
              setDataRetention={setDataRetention}
            />
            <AdminProfileCard />
          </div>

          {/* Advanced Threat Analysis (12 cols) */}
          <div className="col-span-12">
            <ThreatAlert />
          </div>

          {/* Security Policy (6 cols) */}
          <div className="col-span-12 lg:col-span-6">
            <SecurityPolicy />
          </div>

          {/* Network Whitelist (6 cols) */}
          <div className="col-span-12 lg:col-span-6">
            <NetworkWhitelist />
          </div>
        </div>
      </main>

      {/* Live Session Active Floating Indicator */}
      <LiveSessionIndicator />
    </div>
  );
};

export default Security;
