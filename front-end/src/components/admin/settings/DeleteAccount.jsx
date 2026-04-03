import React, { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";

const DeleteAccount = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(1);

  const handleDelete = () => {
    if (confirmText === "DELETE") {
      setIsDeleting(true);
      // Simulate API call
      setTimeout(() => {
        setIsDeleting(false);
        setShowConfirmModal(false);
        setConfirmText("");
        setStep(1);
        alert("Account deleted successfully");
        // Redirect to login page
        window.location.href = "/login";
      }, 2000);
    }
  };

  const resetModal = () => {
    setShowConfirmModal(false);
    setConfirmText("");
    setStep(1);
  };

  return (
    <>
      <Card title="Delete Account" className="border-red-200">
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Danger Zone</h4>
                <p className="text-sm text-red-700">
                  Once you delete your account, there is no going back. This action is permanent
                  and will remove all your data including menu items, orders, settings, and staff.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              label="Delete Account"
              variant="danger"
              onClick={() => setShowConfirmModal(true)}
              icon={Trash2}
            />
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showConfirmModal}
        onClose={resetModal}
        title="Delete Account"
      >
        {step === 1 ? (
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Warning:</strong> This action cannot be undone!
              </p>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>All menu items will be permanently deleted</li>
                <li>All order history will be lost</li>
                <li>Staff accounts will be deactivated</li>
                <li>QR codes will stop working</li>
                <li>Your subscription will be cancelled</li>
              </ul>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button label="Cancel" variant="secondary" onClick={resetModal} className="flex-1" />
              <Button label="Continue" variant="danger" onClick={() => setStep(2)} className="flex-1" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              To confirm deletion, please type <strong className="text-red-600">DELETE</strong> below.
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              className="text-center font-mono"
            />
            <div className="flex gap-3 pt-2">
              <Button
                label={isDeleting ? "Deleting..." : "Permanently Delete"}
                variant="danger"
                onClick={handleDelete}
                disabled={confirmText !== "DELETE" || isDeleting}
                className="flex-1"
              />
              <Button
                label="Cancel"
                variant="secondary"
                onClick={resetModal}
                className="flex-1"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DeleteAccount;