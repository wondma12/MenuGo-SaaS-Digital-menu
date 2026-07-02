

import React from "react";
import { Fingerprint, FileText, ShieldCheck, Eye, Building2, User, Calendar } from "lucide-react";

const IdentitySection = ({ restaurant }) => {
  const handleDocumentView = (document) => {
    console.log(`Viewing document: ${document.name}`);
    if (document.file) {
      window.open(document.file, '_blank');
    }
  };

  
  const verification = restaurant?.verification || {};
  
  
  const verificationDocuments = [];
  
  if (verification.business_license_document) {
    verificationDocuments.push({
      name: "Business License",
      type: "PDF",
      size: "1.2 MB",
      icon: "FileText",
      file: verification.business_license_document,
    });
  }
  
  if (verification.legal_document) {
    verificationDocuments.push({
      name: "Legal Representative Document",
      type: "PDF",
      size: "0.8 MB",
      icon: "ShieldCheck",
      file: verification.legal_document,
    });
  }

  
  const ownerName = verification.owner_name || restaurant.owner?.name || restaurant.owner_name || "N/A";

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return "N/A";
    }
  };

  
  const getStatusStyles = (status) => {
    const statusMap = {
      active: "bg-green-100 text-green-600",
      pending: "bg-yellow-100 text-yellow-600",
      suspended: "bg-red-100 text-red-600",
    };
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Fingerprint className="w-6 h-6" />
          Identity
        </h3>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          REF: {restaurant.id?.slice(0, 8) || "N/A"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            RESTAURANT NAME
          </label>
          <p className="text-lg font-medium text-black flex items-center gap-2">
            <Building2 className="w-4 h-4 text-zinc-400" />
            {restaurant.name || "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            TAX IDENTIFICATION (TIN)
          </label>
          <p className="text-lg font-medium text-black">
            {verification.tin_number || verification.tinNumber || "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            BUSINESS LICENSE NUMBER
          </label>
          <p className="text-lg font-medium text-black">
            {verification.business_license_number || verification.businessLicenseNumber || "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            OWNER NAME
          </label>
          <p className="text-lg font-medium text-black flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            {ownerName}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            ESTABLISHMENT DATE
          </label>
          <p className="text-lg font-medium text-black flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            {formatDate(restaurant.created_at || restaurant.createdAt)}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            STATUS
          </label>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${getStatusStyles(restaurant.status)}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              restaurant.status === 'active' ? 'bg-green-500' :
              restaurant.status === 'pending' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            {restaurant.status || "Unknown"}
          </span>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-100 pt-8">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-4">
          VERIFICATION DOCUMENTS
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationDocuments.length > 0 ? (
            verificationDocuments.map((document, index) => {
              const IconComponent = document.icon === "FileText" ? FileText : ShieldCheck;

              return (
                <div
                  key={index}
                  onClick={() => handleDocumentView(document)}
                  className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg hover:border-black transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{document.name}</span>
                      <span className="text-[10px] text-zinc-400">
                        {document.type} • {document.size}
                      </span>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-zinc-400 group-hover:text-black" />
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center text-zinc-400 text-sm py-4">
              No verification documents available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;