import React, { useState } from "react";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter and one number";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(""), 3000);
      setIsLoading(false);
    }
  };

  const toggleShowPassword = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  return (
    <Card title="Change Password">
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 mb-2">
          <Shield size={16} className="text-blue-600 mt-0.5" />
          <p className="text-xs text-blue-700">
            Password must be at least 6 characters and include an uppercase letter and a number
          </p>
        </div>

        <div className="relative">
          <Input
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            error={errors.currentPassword}
            icon={<Lock size={16} />}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("current")}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            error={errors.newPassword}
            icon={<Lock size={16} />}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("new")}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            icon={<Lock size={16} />}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("confirm")}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm flex items-center gap-2">
            <span>✓</span> {success}
          </div>
        )}

        <Button 
          label={isLoading ? "Updating..." : "Update Password"} 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </Card>
  );
};

export default PasswordForm;