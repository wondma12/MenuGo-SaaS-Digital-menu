
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundSkeleton } from '@/components/layout/DashboardSkeleton';

export default function NotFound() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <NotFoundSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        {}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-full p-4">
            <svg
              className="w-20 h-20 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454"
              />
              {}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.5 14.5c.5-.5 1.5-1 3.5-1s3 .5 3.5 1"
              />
              {}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 10.5h.01M15 10.5h.01"
              />
              {}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 7v.01M12 4v.01"
              />
              {}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9c0 3-3 6-7 9-4-3-7-6-7-9 0-4 3-7 7-7s7 3 7 7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 11v.01M12 8v.01"
              />
            </svg>
          </div>
        </div>

        {}
        <div className="space-y-2 text-center">
          <h1 className="text-7xl font-bold text-gray-900 animate-bounce">
            404
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Chef Got Lost!
          </h2>
          <p className="text-gray-500 text-sm">
            The page you're looking for isn't on the menu today. It might have been moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Take Me Home
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/auth/login')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth/signup')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Help Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/support')}
            className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
          >
            Need directions? Contact Support
          </button>
        </div>

        {/* Footer */}
        <div className="pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026 MenuGo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}