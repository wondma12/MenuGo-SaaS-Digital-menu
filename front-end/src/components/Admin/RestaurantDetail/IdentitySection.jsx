import React from "react";
import { Fingerprint, FileText, ShieldCheck, Eye } from "lucide-react";

const IdentitySection = ({ restaurant }) => {
  const handleDocumentView = (document) => {
    console.log(`Viewing document: ${document.name}`);
    // Add logic to view document
  };

  // Map verification data to documents format
  const verificationDocuments = restaurant?.verification
    ? [
        {
          name: "Business License",
          type: "PDF",
          size: "1.2 MB",
          icon: "FileText",
          file: restaurant.verification.businessLicenseDocument,
        },
        {
          name: "Legal Representative Document",
          type: "PDF",
          size: "0.8 MB",
          icon: "ShieldCheck",
          file: restaurant.verification.documentOfLegalRepresentative,
        },
      ]
    : [];

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Fingerprint className="w-6 h-6" />
          Identity
        </h3>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          REF: {restaurant.id}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            RESTAURANT NAME
          </label>
          <p className="text-lg font-medium text-black">{restaurant.name}</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            TAX IDENTIFICATION (TIN)
          </label>
          <p className="text-lg font-medium text-black">
            {restaurant.verification?.tinNumber || "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            BUSINESS LICENSE NUMBER
          </label>
          <p className="text-lg font-medium text-black">
            {restaurant.verification?.businessLicenseNumber || "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            OWNER NAME
          </label>
          <p className="text-lg font-medium text-black">
            {restaurant.verification?.ownerName ||
              restaurant.owner?.name ||
              "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            ESTABLISHMENT DATE
          </label>
          <p className="text-lg font-medium text-black">
            {restaurant.createdAt
              ? new Date(restaurant.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            STATUS
          </label>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              restaurant.status === "active"
                ? "bg-green-100 text-green-600"
                : restaurant.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : restaurant.status === "suspended"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
            }`}
          >
            {restaurant.status || "Unknown"}
          </span>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-100 pt-8">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-4">
          VERIFICATION DOCUMENTS
        </label>
        <div className="grid grid-cols-2 gap-4">
          {verificationDocuments.map((document, index) => {
            const IconComponent =
              document.icon === "FileText" ? FileText : ShieldCheck;

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
                <Eye className="w-4 h-4 text-zinc-400" />
              </div>
            );
          }) || (
            <div className="col-span-2 text-center text-zinc-400 text-sm">
              No verification documents available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
