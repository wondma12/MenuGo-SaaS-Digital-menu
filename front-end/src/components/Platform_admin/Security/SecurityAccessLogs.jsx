import React from "react";
import Table from "../../ui/Table";
import Button from "../../ui/button";

const SecurityAccessLogs = () => {
  const securityLogs = [
    {
      user: "admin_jason",
      timestamp: "2023-10-27 14:22:10",
      status: "Success",
      ipAddress: "192.168.1.104",
      statusColor: "green"
    },
    {
      user: "unknown_agent",
      timestamp: "2023-10-27 14:18:55",
      status: "Failed",
      ipAddress: "45.231.11.9",
      statusColor: "red"
    },
    {
      user: "restaurant_mgr_01",
      timestamp: "2023-10-27 13:45:12",
      status: "Success",
      ipAddress: "102.14.99.201",
      statusColor: "green"
    },
    {
      user: "api_service_prod",
      timestamp: "2023-10-27 13:30:00",
      status: "Success",
      ipAddress: "127.0.0.1",
      statusColor: "green"
    },
    {
      user: "admin_jason",
      timestamp: "2023-10-27 12:12:05",
      status: "Success",
      ipAddress: "192.168.1.104",
      statusColor: "green"
    }
  ];

  const tableHeaders = [
    { label: "User" },
    { label: "Timestamp" },
    { label: "Status" },
    { label: "IP Address" }
  ];

  const renderTableRow = (log, index) => (
    <tr key={index} className="hover:bg-zinc-50 transition-colors">
      <td className="px-6 py-4 font-medium text-body-sm">{log.user}</td>
      <td className="px-6 py-4 text-body-sm text-on-secondary-container">{log.timestamp}</td>
      <td className="px-6 py-4">
        <span 
          className={`px-2 py-1 text-[11px] font-bold rounded uppercase ${
            log.statusColor === 'green' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-error-container text-error'
          }`}
        >
          {log.status}
        </span>
      </td>
      <td className="px-6 py-4 text-body-sm font-mono text-on-secondary-container">{log.ipAddress}</td>
    </tr>
  );

  return (
    <section className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <h3 className="text-h3 font-h3">Security Access Logs</h3>
        <div className="flex gap-2">
          <Button 
            label="Export CSV"
            variant="secondary"
            className="px-3 py-1 text-body-sm border border-outline-variant"
          />
          <Button 
            label="Refresh"
            className="px-3 py-1 text-body-sm"
          />
        </div>
      </div>
      
      <Table
        headers={tableHeaders}
        data={securityLogs}
        renderRow={renderTableRow}
        className="overflow-x-auto"
        tableClassName="w-full text-left border-collapse"
        theadClassName="bg-surface-container-low"
        tbodyClassName="divide-y divide-outline-variant"
      />
    </section>
  );
};

export default SecurityAccessLogs;
