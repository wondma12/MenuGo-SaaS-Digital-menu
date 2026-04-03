import React from "react";
import Button from "./Button";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmLabel = "Confirm", cancelLabel = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
        
        {/* Footer */}
        {onConfirm && (
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button label={cancelLabel} variant="secondary" onClick={onClose} />
            <Button label={confirmLabel} variant="primary" onClick={onConfirm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;