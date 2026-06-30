import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building,
  MapPin,
  FileText,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Globe,
  Home,
  Image,
  X,
  Eye,
  File,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";
import registrationService from "../../services/registration";

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    businessEmail: "",
    businessPhone: "",
    country: "",
    city: "",
    subCity: "",
    streetAddress: "",
    googleMapsLink: "",
    ownerName: "",
    businessLicenseNumber: "",
    tinNumber: "",
    slogan: "",
    logo: null,
    banner: null,
    businessLicenseDocument: null,
  });

  // Preview URLs for uploaded files
  const [previewUrls, setPreviewUrls] = useState({
    logo: null,
    banner: null,
    businessLicenseDocument: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const steps = [
    { id: 1, name: "Account", icon: User, description: "Create your account" },
    { id: 2, name: "Restaurant", icon: Building, description: "Restaurant details" },
    { id: 3, name: "Location", icon: MapPin, description: "Location information" },
    { id: 4, name: "Verification", icon: FileText, description: "Business verification" },
    { id: 5, name: "Review", icon: Check, description: "Review & submit" },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (field, file) => {
    if (file) {
      // Store the file
      setFormData((prev) => ({ ...prev, [field]: file }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));

      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrls((prev) => ({ ...prev, [field]: url }));
      }
    }
  };

  const removeFile = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    // Revoke preview URL if exists
    if (previewUrls[field]) {
      URL.revokeObjectURL(previewUrls[field]);
      setPreviewUrls((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        break;

      case 2:
        if (!formData.restaurantName.trim()) newErrors.restaurantName = "Restaurant name is required";
        if (!formData.businessEmail.trim()) newErrors.businessEmail = "Business email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) newErrors.businessEmail = "Invalid email format";
        if (!formData.businessPhone.trim()) newErrors.businessPhone = "Business phone is required";
        break;

      case 3:
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.subCity.trim()) newErrors.subCity = "Sub-city/District is required";
        if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
        if (!formData.googleMapsLink.trim()) newErrors.googleMapsLink = "Google Maps link is required";
        break;

      case 4:
        if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
        if (!formData.businessLicenseNumber.trim()) newErrors.businessLicenseNumber = "Business license number is required";
        if (!formData.tinNumber.trim()) newErrors.tinNumber = "TIN number is required";
        if (!formData.businessLicenseDocument) newErrors.businessLicenseDocument = "Business license document is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setIsLoading(true);
      setSubmitError("");

      try {
        const registrationData = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          restaurantName: formData.restaurantName,
          businessEmail: formData.businessEmail,
          businessPhone: formData.businessPhone,
          country: formData.country,
          city: formData.city,
          subCity: formData.subCity,
          streetAddress: formData.streetAddress,
          googleMapsLink: formData.googleMapsLink,
          ownerName: formData.ownerName || formData.fullName,
          businessLicenseNumber: formData.businessLicenseNumber,
          tinNumber: formData.tinNumber,
          slogan: formData.slogan || "",
          logo: formData.logo || null,
          banner: formData.banner || null,
          businessLicenseDocument: formData.businessLicenseDocument || null,
        };

        const result = await registrationService.submitRegistration(registrationData);

        if (result.success) {
          navigate("/auth/login", {
            state: {
              message: result.data.message || "Registration successful! Please login.",
              type: "success",
            },
          });
        } else {
          setSubmitError(result.error || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setSubmitError(error.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // File Upload Component
  const FileUpload = ({ field, label, accept, maxSize, icon: Icon, description }) => {
    const hasFile = formData[field];
    const previewUrl = previewUrls[field];
    const isImage = hasFile && hasFile.type.startsWith('image/');

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        
        {hasFile ? (
          <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {isImage && previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt={label} 
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    {isImage ? <Image className="w-8 h-8 text-gray-400" /> : <File className="w-8 h-8 text-gray-400" />}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{hasFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(hasFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isImage && previewUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(previewUrl, '_blank')}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(field)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              accept={accept}
              onChange={(e) => handleFileChange(field, e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id={`${field}-upload`}
            />
            <label
              htmlFor={`${field}-upload`}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center block cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <Icon className="mx-auto text-gray-400 w-8 h-8 mb-2" />
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {accept.split(',').join(', ')} up to {maxSize}
              </p>
            </label>
          </div>
        )}
        {errors[field] && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter restaurant name"
                    value={formData.restaurantName}
                    onChange={(e) => handleChange("restaurantName", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.restaurantName && <p className="text-red-500 text-xs mt-1">{errors.restaurantName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="email"
                    placeholder="Enter business email"
                    value={formData.businessEmail}
                    onChange={(e) => handleChange("businessEmail", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.businessEmail && <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="tel"
                    placeholder="Enter business phone"
                    value={formData.businessPhone}
                    onChange={(e) => handleChange("businessPhone", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.businessPhone && <p className="text-red-500 text-xs mt-1">{errors.businessPhone}</p>}
              </div>

              <FileUpload
                field="logo"
                label="Brand Logo (Optional)"
                accept="image/png,image/jpeg,image/jpg"
                maxSize="2MB"
                icon={Upload}
                description="Upload your restaurant logo"
              />

              <FileUpload
                field="banner"
                label="Banner Image (Optional)"
                accept="image/png,image/jpeg,image/jpg"
                maxSize="2MB"
                icon={Upload}
                description="Upload a banner image"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none bg-white"
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="KE">Kenya</option>
                    <option value="NG">Nigeria</option>
                    <option value="ZA">South Africa</option>
                  </select>
                </div>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="e.g. New York"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-City / District</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="e.g. Manhattan"
                    value={formData.subCity}
                    onChange={(e) => handleChange("subCity", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.subCity && <p className="text-red-500 text-xs mt-1">{errors.subCity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="url"
                    placeholder="https://goo.gl/maps/..."
                    value={formData.googleMapsLink}
                    onChange={(e) => handleChange("googleMapsLink", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.googleMapsLink && <p className="text-red-500 text-xs mt-1">{errors.googleMapsLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Suite number, building name, and street details"
                    value={formData.streetAddress}
                    onChange={(e) => handleChange("streetAddress", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Verification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter owner name"
                    value={formData.ownerName}
                    onChange={(e) => handleChange("ownerName", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business License Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter business license number"
                    value={formData.businessLicenseNumber}
                    onChange={(e) => handleChange("businessLicenseNumber", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.businessLicenseNumber && <p className="text-red-500 text-xs mt-1">{errors.businessLicenseNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TIN Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter TIN number"
                    value={formData.tinNumber}
                    onChange={(e) => handleChange("tinNumber", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                {errors.tinNumber && <p className="text-red-500 text-xs mt-1">{errors.tinNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slogan (Optional)</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="Enter restaurant slogan"
                    value={formData.slogan}
                    onChange={(e) => handleChange("slogan", e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <FileUpload
                field="businessLicenseDocument"
                label="Business License Document"
                accept=".pdf,.doc,.docx"
                maxSize="1MB"
                icon={FileText}
                description="Upload your business license document"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>
            <p className="text-gray-600 text-sm mb-6">
              Please review all information before submitting. You can go back to edit any section.
            </p>

            {/* Account Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">Account Information</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Full Name</p>
                  <p className="text-sm font-medium text-gray-900">{formData.fullName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900">{formData.email || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{formData.phoneNumber || '-'}</p>
                </div>
              </div>
            </div>

            {/* Restaurant Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <Building className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">Restaurant Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Restaurant Name</p>
                  <p className="text-sm font-medium text-gray-900">{formData.restaurantName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Business Email</p>
                  <p className="text-sm font-medium text-gray-900">{formData.businessEmail || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Business Phone</p>
                  <p className="text-sm font-medium text-gray-900">{formData.businessPhone || '-'}</p>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">Uploaded Files</p>
                <div className="grid grid-cols-2 gap-3">
                  {formData.logo && (
                    <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200">
                      {previewUrls.logo ? (
                        <img src={previewUrls.logo} alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Logo</p>
                        <p className="text-xs text-gray-500">{formData.logo.name}</p>
                      </div>
                    </div>
                  )}
                  {formData.banner && (
                    <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200">
                      {previewUrls.banner ? (
                        <img src={previewUrls.banner} alt="Banner" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Banner</p>
                        <p className="text-xs text-gray-500">{formData.banner.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">Location</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Country</p>
                  <p className="text-sm font-medium text-gray-900">{formData.country || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">City</p>
                  <p className="text-sm font-medium text-gray-900">{formData.city || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sub-City / District</p>
                  <p className="text-sm font-medium text-gray-900">{formData.subCity || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Street Address</p>
                  <p className="text-sm font-medium text-gray-900">{formData.streetAddress || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Google Maps Link</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{formData.googleMapsLink || '-'}</p>
                </div>
              </div>
            </div>

            {/* Verification Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">Business Verification</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Owner Name</p>
                  <p className="text-sm font-medium text-gray-900">{formData.ownerName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Business License Number</p>
                  <p className="text-sm font-medium text-gray-900">{formData.businessLicenseNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">TIN Number</p>
                  <p className="text-sm font-medium text-gray-900">{formData.tinNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Slogan</p>
                  <p className="text-sm font-medium text-gray-900">{formData.slogan || 'Not provided'}</p>
                </div>
              </div>

              {/* License Document */}
              {formData.businessLicenseDocument && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">Uploaded Document</p>
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formData.businessLicenseDocument.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(formData.businessLicenseDocument.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Important Notice</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    By clicking "Submit for Verification", you agree to our Terms of Service and Privacy Policy. 
                    Your restaurant dashboard will be prepared immediately after verification is complete.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Submission Error</p>
                    <p className="text-sm text-red-700 mt-1">{submitError}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-black text-white shadow-lg shadow-gray-400"
                          : isCompleted
                          ? "bg-green-600 text-white shadow-lg shadow-green-200"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium whitespace-nowrap ${
                        isActive
                          ? "text-black"
                          : isCompleted
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                        currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep === 5 ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-green-200"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Verification
                    <Check className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-gray-200"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;