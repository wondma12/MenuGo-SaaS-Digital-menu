import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/button";
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
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
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

  const shiftOptions = [
    { value: "Morning", label: "Morning" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingStaff ? "Save Changes" : "Add Staff"}
          </Button>
        </div>
      }
    >
      <div className="grid gap-4">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          className="rounded-xl"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          className="rounded-xl"
        />
        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          className="rounded-xl"
        />
        <Select
          label="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          options={roleOptions}
          className="rounded-xl"
        />
        <Select
          label="Shift"
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
          options={shiftOptions}
          className="rounded-xl"
        />
      </div>
    </Modal>
  );
};

export default AddStaffModal;
