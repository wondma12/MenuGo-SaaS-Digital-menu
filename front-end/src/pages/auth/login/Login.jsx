

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

  
  
  

  const validateForm = () => {
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
    
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setLoginError("");

    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.login(formData.email, formData.password);

      
      if (result.success) {
        
        const { token, user } = result.data;

        
        localStorage.setItem("authToken", token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);

        
        redirectUser(user);
      } else {
        
        setLoginError(result.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("[Login] Unexpected error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  
  
  

  const redirectUser = (user) => {
    const redirectPath = authService.getRestaurantRedirectPath(user);
    
    if (redirectPath && redirectPath !== "") {
      navigate(redirectPath);
    } else {
      setLoginError("Unable to determine redirect path. Please contact support.");
    }
  };

  
  
  

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      className="animate-scale-in"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {}
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
            {loginError}
          </div>
        )}

        {}
        <div className="animate-slide-in-staggered stagger-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div
            className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Mail className="text-gray-400 w-5 h-5 ml-3 flex-shrink-0" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border-0! rounded-none! ring-0! outline-none! flex-1"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {}
        <div className="animate-slide-in-staggered stagger-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div
            className={`flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-black transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Lock className="text-gray-400 w-5 h-5 ml-3 flex-shrink-0" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border-0! rounded-none! ring-0! outline-none! flex-1"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 hover:text-gray-600 transition-colors mr-3 flex-shrink-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-xs mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {}
        <div className="flex items-center justify-between animate-slide-in-staggered stagger-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-2 transition-all"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Remember me
            </span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {}
        <Button
          type="submit"
          className="w-full rounded-xl bg-black text-white hover:bg-gray-800 hover-lift btn-micro animate-slide-in-staggered stagger-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        {}
        <div className="relative my-6 animate-slide-in-staggered stagger-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {}
        <p className="text-center text-gray-600 text-sm animate-slide-in-staggered stagger-6">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;