
import Skeleton from "@/components/ui/skeleton"


export function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {}
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>

          {}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <Skeleton className="h-4 w-full" />
          </div>

          {}
          <div className="space-y-4">
            {}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>

            {}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <Skeleton className="h-4 w-32 bg-white px-2" />
            </div>
          </div>

          {}
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>

          {}
          <div className="text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>

      {}
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


export function CustomerDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {}
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

      {}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 bg-white/30" />
            <Skeleton className="h-6 w-96 bg-white/30" />
            <Skeleton className="h-5 w-80 bg-white/30" />
          </div>
        </div>
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>

        {}
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

        {}
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

        {}
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


export function StaffDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {}
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

      {}
      <div className="px-6 py-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {}
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

      {}
      <div className="px-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
          
          {}
          <div className="border-b px-6">
            <div className="flex space-x-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-20" />
              ))}
            </div>
          </div>

          {}
          <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>

          {}
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


export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="flex">
        {}
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

        {}
        <div className="flex-1">
          {}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {}
          <div className="p-6 space-y-6">
            {}
            <Skeleton className="h-8 w-48" />

            {}
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

            {}
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


export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 bg-white/30" />
            <Skeleton className="h-6 w-96 bg-white/30" />
            <Skeleton className="h-5 w-80 bg-white/30" />
          </div>
        </div>
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 border-b">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        {}
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


export function NotFoundSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {}
        <div className="space-y-4">
          <Skeleton className="h-32 w-48 mx-auto" />
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        {}
        <div className="py-8">
          <Skeleton className="h-40 w-40 rounded-full mx-auto" />
        </div>

        {}
        <div className="space-y-4">
          <Skeleton className="h-12 w-48 rounded-lg mx-auto" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>

        {}
        <div className="pt-8">
          <Skeleton className="h-4 w-56 mx-auto" />
        </div>
      </div>
    </div>
  )
}