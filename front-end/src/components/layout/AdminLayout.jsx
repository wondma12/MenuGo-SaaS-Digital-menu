// components/layout/AdminLayout.jsx
import React from "react";
import Sidebar from "./sidebar";
import TopHeader from "./TopHeader";

const AdminLayout = ({ role, children }) => {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <Sidebar role={role} />
      <TopHeader role={role} title="Dashboard" />
      <main className="ml-64 pt-16 min-h-screen bg-surface">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;