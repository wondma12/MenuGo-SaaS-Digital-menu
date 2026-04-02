import React from 'react';
import { Coffee, Package, Tag, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

const MenuStatsBar = ({ stats }) => {
  const statItems = [
    { 
      label: 'Total Items', 
      value: stats.totalItems, 
      icon: Coffee, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Categories', 
      value: stats.totalCategories, 
      icon: Tag, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Available', 
      value: stats.availableItems, 
      icon: Package, 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      subtitle: `${stats.unavailableItems || 0} unavailable`
    },
    { 
      label: 'Popular Items', 
      value: stats.popularCount, 
      icon: ShoppingBag, 
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  // Add warning if many items are unavailable
  const showWarning = stats.unavailableItems > stats.totalItems * 0.3;

  return (
    <div className="space-y-4">
      {showWarning && (
        <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3 text-yellow-800">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">
            {stats.unavailableItems} items are currently unavailable. Update availability to keep customers informed.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item, index) => (
          <div key={index} className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
                {item.subtitle && (
                  <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
                )}
              </div>
              <div className={`rounded-full ${item.bgColor} p-3`}>
                <item.icon className={`h-5 w-5 ${item.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuStatsBar;