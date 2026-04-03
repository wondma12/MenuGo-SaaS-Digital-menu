import React from "react";
import Card from "../../ui/Card";
import { TrendingUp, Award, Star } from "lucide-react";

const PopularItems = ({ items }) => {
  const totalOrders = items.reduce((sum, item) => sum + item.orders, 0);

  return (
    <Card title="Popular Items">
      <div className="space-y-4">
        {/* Header Stats */}
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Top Selling</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-green-600" />
            <span className="text-xs text-green-600">+23% vs last week</span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((item, index) => {
            const percentage = ((item.orders / totalOrders) * 100).toFixed(1);
            const isTop3 = index < 3;
            
            return (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {isTop3 && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.price}</p>
                    <p className="text-xs text-green-600">${item.revenue} rev</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total revenue from top 5</span>
            <span className="font-semibold text-gray-900">
              ${items.reduce((sum, item) => sum + parseFloat(item.revenue), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PopularItems;