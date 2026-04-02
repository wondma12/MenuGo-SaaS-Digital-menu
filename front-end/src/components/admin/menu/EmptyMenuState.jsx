import React from 'react';
import { Plus, Coffee, Upload, Package } from 'lucide-react';
import Button from '../../ui/button';

const EmptyMenuState = ({ onAddItem }) => {
  const suggestions = [
    { icon: Coffee, text: "Add your signature dishes" },
    { icon: Upload, text: "Upload appetizing photos" },
    { icon: Package, text: "Set competitive prices" }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Animated Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-gray-200 opacity-75"></div>
        <div className="relative rounded-full bg-gray-100 p-5">
          <Coffee className="h-12 w-12 text-gray-400" />
        </div>
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No menu items yet</h3>
      <p className="mb-6 text-center text-gray-500 max-w-md">
        Your menu is empty. Start adding delicious items to showcase your restaurant's offerings to customers.
      </p>
      
      {/* Suggestions */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {suggestions.map((suggestion, idx) => (
          <div key={idx} className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-600">
            <suggestion.icon className="h-3.5 w-3.5" />
            <span>{suggestion.text}</span>
          </div>
        ))}
      </div>
      
      {/* Action Button */}
      <Button
        label="Add Your First Menu Item"
        onClick={onAddItem}
        variant="primary"
        icon={<Plus className="h-4 w-4" />}
        className="px-6 py-3 text-base"
      />
      
      {/* Help Text */}
      <p className="mt-6 text-xs text-gray-400">
        Tip: Start with popular items to attract more customers
      </p>
    </div>
  );
};

export default EmptyMenuState;