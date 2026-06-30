

import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
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

      <main className=" min-h-screen bg-background">
        <div className="p-8 max-w-[1200px]">
          {}
          <div className="mb-8">
            <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
              Platform Security
            </p>
            <h2 className="text-black text-4xl font-bold uppercase leading-none">
              Security Center
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Monitor and manage platform security settings, access logs, and threat detection.
            </p>
          </div>

          {}
          <div className="grid grid-cols-12 gap-6">
            {}
            <div className="col-span-12 lg:col-span-8">
              <SecurityAccessLogs />
            </div>

            {}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <PlatformConfig
                environment={environment}
                setEnvironment={setEnvironment}
                dataRetention={dataRetention}
                setDataRetention={setDataRetention}
              />
              <AdminProfileCard />
            </div>

            {}
            <div className="col-span-12">
              <ThreatAlert />
            </div>

            {}
            <div className="col-span-12 lg:col-span-6">
              <SecurityPolicy />
            </div>

            {}
            <div className="col-span-12 lg:col-span-6">
              <NetworkWhitelist />
            </div>
          </div>

          {}
          <LiveSessionIndicator />
        </div>
      </main>
    </div>
  );
};

export default Security;