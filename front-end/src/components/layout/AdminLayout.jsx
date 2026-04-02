import React from "react";
import Sidebar from "./sidebar";

const AdminLayout = ({ role, children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={role} />
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
