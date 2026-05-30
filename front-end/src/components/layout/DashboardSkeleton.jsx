// Skeletons.jsx
import Skeleton from "@/components/ui/skeleton"

// ==================== LOGIN PAGE SKELETON ====================
export function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>

          {/* Error Alert Skeleton */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Sign In Button */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <Skeleton className="h-4 w-32 bg-white px-2" />
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 to-blue-600 p-12 flex-col justify-between">
        <div className="space-y-4">
          <Skeleton className="h-10 w-32 bg-white/20" />
          <Skeleton className="h-6 w-64 bg-white/20" />
          <Skeleton className="h-4 w-96 bg-white/20" />
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-20 bg-white/20" />
              <Skeleton className="h-4 w-28 bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== CUSTOMER DASHBOARD SKELETON ====================
export function CustomerDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 bg-white/30" />
            <Skeleton className="h-6 w-96 bg-white/30" />
            <Skeleton className="h-5 w-80 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Restaurant Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== STAFF/RESTAURANT DASHBOARD SKELETON ====================
export function StaffDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <div className="flex space-x-6">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="px-6 py-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
              <div className="flex justify-between items-start">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Orders Section */}
      <div className="px-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b px-6">
            <div className="flex space-x-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-20" />
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== ADMIN DASHBOARD SKELETON ====================
export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32 mx-auto" />
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Page Title */}
            <Skeleton className="h-8 w-48" />

            {/* Global Snapshot */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-20" />
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="grid grid-cols-5 gap-4 p-3 bg-gray-50 border-b">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                  ))}
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-3 border-b">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== CUSTOMER MENU SKELETON (Restaurant View) ====================
export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 bg-white/30" />
            <Skeleton className="h-6 w-96 bg-white/30" />
            <Skeleton className="h-5 w-80 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 border-b">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <Skeleton className="w-32 h-32" />
              <div className="flex-1 p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// src/components/Skeletons.jsx (add this to your existing file)
export function NotFoundSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animated 404 Number */}
        <div className="space-y-4">
          <Skeleton className="h-32 w-48 mx-auto" />
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        {/* Illustration/Icon Space */}
        <div className="py-8">
          <Skeleton className="h-40 w-40 rounded-full mx-auto" />
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-48 rounded-lg mx-auto" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>

        {/* Help Text */}
        <div className="pt-8">
          <Skeleton className="h-4 w-56 mx-auto" />
        </div>
      </div>
    </div>
  )
}