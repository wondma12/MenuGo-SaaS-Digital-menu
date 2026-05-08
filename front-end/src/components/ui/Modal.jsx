import React from "react";
import { Button } from "./button";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="flex-shrink-0 border-t border-slate-200 p-5 bg-slate-50">
            {footer}
          </div>
        ) : onConfirm ? (
          <div className="flex justify-end gap-2 p-4 border-t flex-shrink-0">
            <Button label={cancelLabel} variant="secondary" onClick={onClose} />
            <Button
              label={confirmLabel}
              variant="primary"
              onClick={onConfirm}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
