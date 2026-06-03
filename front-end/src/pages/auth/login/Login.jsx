import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import AuthLayout from "../../../components/auth/AuthLayout";
import authService from "../../../services/authservice";

const Login = () => {
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
        localStorage.setItem("userId", result.data.user.id);

        if (result.data.user.role === "platform_admin") {
          navigate("/admin/dashboard");
        } else {
          const redirectPath = authService.getRestaurantRedirectPath(
            result.data.user,
          );
          if (redirectPath) {
            navigate(redirectPath);
          } else {
            setLoginError("Invalid user role");
          }
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
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      className="animate-scale-in"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Login Error Message */}
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {loginError}
          </div>
        )}
        {/* Email Field */}
        <div className="animate-slide-in-staggered stagger-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div
            className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Mail className="text-gray-400 w-5 h-5 ml-3 flex-shrink-0" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border-0! rounded-none! ring-0! outline-none! flex-1"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="animate-slide-in-staggered stagger-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div
            className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Lock className="text-gray-400 w-5 h-5 ml-3 flex-shrink-0" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border-0! rounded-none! ring-0! outline-none! flex-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors mr-3 flex-shrink-0"
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
        <div className="flex items-center justify-between animate-slide-in-staggered stagger-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-balck to-black hover:from-grey-100 hover:to-grey-100 hover-lift btn-micro animate-slide-in-staggered stagger-4"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="relative my-6 animate-slide-in-staggered stagger-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login
        <div className="grid grid-cols-2 gap-3">
          <SocialLoginButton icon={<GoogleIcon />}>Google</SocialLoginButton>
          <SocialLoginButton icon={<GitHubIcon />}>GitHub</SocialLoginButton>
        </div> */}

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm animate-slide-in-staggered stagger-6">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
