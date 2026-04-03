import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import { User, Mail, Phone, Briefcase, Clock } from "lucide-react";

const AddStaffModal = ({ isOpen, onClose, onSubmit, editingStaff }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "waiter",
    shift: "Morning",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStaff) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: editingStaff.name,
        email: editingStaff.email,
        phone: editingStaff.phone,
        role: editingStaff.role,
        shift: editingStaff.shift,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "waiter",
        shift: "Morning",
      });
    }
  }, [editingStaff, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const roleOptions = [
    { value: "waiter", label: "Waiter" },
    { value: "kitchen", label: "Kitchen Staff" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
  ];

  const shiftOptions = ["Morning", "Evening", "Night"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
      onConfirm={handleSubmit}
      confirmLabel={editingStaff ? "Save Changes" : "Add Staff"}
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          icon={<User size={16} />}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          icon={<Mail size={16} />}
        />
        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          icon={<Phone size={16} />}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shift
          </label>
          <div className="relative">
            <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={formData.shift}
              onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {shiftOptions.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddStaffModal;