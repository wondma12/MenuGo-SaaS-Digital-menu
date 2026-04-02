import React from "react";
import Sidebar from "./sidebar";

const AdminLayout = ({ role, children }) => {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
