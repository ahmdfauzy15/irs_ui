import React from 'react';
import { FileText, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ number, label, icon, color, trend }) => {
  const IconComponent = {
    FileText,
    CheckCircle,
    Clock
  }[icon] || FileText;

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color.replace('text', 'bg').replace('-500', '-50')} rounded-xl`}>
          <IconComponent className={`w-6 h-6 ${color}`} />
        </div>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium ml-1">+12%</span>
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{number}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;