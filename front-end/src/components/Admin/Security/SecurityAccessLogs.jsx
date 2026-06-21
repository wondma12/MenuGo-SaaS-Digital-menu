// src/components/Admin/Security/SecurityAccessLogs.jsx

import React, { useState, useEffect } from "react";
import { RefreshCw, Download, Search } from "lucide-react";
import { analyticsAPI } from "../../../services/api";

const SecurityAccessLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const itemsPerPage = 5;

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await analyticsAPI.getSecurityLogs?.({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });
      
      if (result && result.data) {
        setLogs(result.data);
        setTotalLogs(result.total || result.data.length);
      } else {
        setLogs([]);
        setTotalLogs(0);
      }
    } catch (error) {
      console.error("Error fetching security logs:", error);
      setError(error.message || "Failed to load security logs");
      setLogs([]);
      setTotalLogs(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLogs();
  };

  const handleExport = () => {
    console.log("Exporting logs...");
  };

  const tableHeaders = [
    { label: "User" },
    { label: "Timestamp" },
    { label: "Status" },
    { label: "IP Address" },
  ];

  const renderTableRow = (log, index) => (
    <tr key={log.id || index} className="hover:bg-zinc-50 transition-colors">
      <td className="px-6 py-4 font-medium text-sm">{log.user || "N/A"}</td>
      <td className="px-6 py-4 text-sm text-zinc-600">
        {log.timestamp || "N/A"}
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 text-[11px] font-bold rounded uppercase ${
            log.status === "Success" 
              ? "bg-green-50 text-green-700"
              : log.status === "Failed"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-50 text-yellow-600"
          }`}
        >
          {log.status || "Unknown"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-mono text-zinc-600">
        {log.ipAddress || log.ip || "N/A"}
      </td>
    </tr>
  );

  const totalPages = Math.ceil(totalLogs / itemsPerPage);

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="text-center text-red-500">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchLogs}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50/30">
        <div>
          <h3 className="text-lg font-semibold">Security Access Logs</h3>
          <p className="text-sm text-zinc-500">Real-time audit trail of system access</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              className="pl-9 pr-4 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm focus:ring-0 focus:border-black w-48"
              placeholder="Search logs..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            onClick={fetchLogs}
            className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p>No logs found</p>
          <p className="text-xs mt-1">Try adjusting your search or refresh</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {logs.map((log, index) => renderTableRow(log, index))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50/30">
              <p className="text-xs text-zinc-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalLogs)} of {totalLogs} entries
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-xs border border-zinc-200 rounded hover:bg-zinc-50 transition-colors disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-xs bg-black text-white rounded">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="px-3 py-1 text-xs border border-zinc-200 rounded hover:bg-zinc-50 transition-colors disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SecurityAccessLogs;