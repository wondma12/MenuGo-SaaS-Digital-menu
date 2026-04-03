import React, { useState } from "react";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { User, Mail, Phone, Building, MapPin, Edit2, Save, X, Camera } from "lucide-react";

const ProfileForm = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar] = useState(null);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    restaurantName: profile?.restaurantName || "",
    address: profile?.address || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.restaurantName.trim()) newErrors.restaurantName = "Restaurant name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      restaurantName: profile?.restaurantName || "",
      address: profile?.address || "",
    });
    setIsEditing(false);
    setErrors({});
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card title="Profile Information">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {getInitials(formData.name)}
                </span>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                <Camera size={14} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center">Profile Photo</p>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                  icon={<User size={16} />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                  icon={<Mail size={16} />}
                />
                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={<Phone size={16} />}
                />
                <Input
                  label="Restaurant Name"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                  error={errors.restaurantName}
                  icon={<Building size={16} />}
                />
              </div>
              <Input
                label="Restaurant Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                icon={<MapPin size={16} />}
              />
              <div className="flex gap-2 pt-2">
                <Button label="Save Changes" variant="primary" onClick={handleSubmit} icon={Save} />
                <Button label="Cancel" variant="secondary" onClick={handleCancel} icon={X} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{formData.name || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{formData.email || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">{formData.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Restaurant Name</p>
                    <p className="font-medium text-gray-900">{formData.restaurantName || "Not set"}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Restaurant Address</p>
                  <p className="font-medium text-gray-900">{formData.address || "Not set"}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  label="Edit Profile" 
                  variant="secondary" 
                  onClick={() => setIsEditing(true)} 
                  icon={Edit2}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileForm;