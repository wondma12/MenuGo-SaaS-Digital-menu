import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Input from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";
import authService from "../../services/authservice";

const StaffLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const result = await authService.login(formData.email, formData.password);

      if (result.success) {
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        if (
          result.data.user.role === "restaurant_admin" ||
          result.data.user.role === "waiter"
        ) {
          const redirectPath = authService.getRestaurantRedirectPath(
            result.data.user,
          );
          if (redirectPath) {
            navigate(redirectPath);
          } else {
            setLoginError("Invalid user role");
          }
        } else {
          setLoginError("Access denied. Staff accounts only.");
        }
      } else {
        setLoginError(result.error);
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white animate-slide-in-right">
      <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-scale-in">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              LUMIÈRE DINING
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">
              Staff Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Login Error Message */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div
                className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Mail className="text-gray-400 w-5 h-5 ml-3 shrink-0" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-0! rounded-none! ring-0! outline-none! flex-1"
                  error={errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div
                className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Lock className="text-gray-400 w-5 h-5 ml-3 shrink-0" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="border-0! rounded-none! ring-0! outline-none! flex-1"
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors mr-3 shrink-0"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-black text-white hover:bg-gray-800 hover-lift"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Back to Menu Link */}
          <div className="text-center pt-6 border-t border-gray-200">
            <Link
              to="/customer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffLoginPage;
