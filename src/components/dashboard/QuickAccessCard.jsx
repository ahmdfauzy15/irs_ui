import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

const QuickAccessCard = ({ title, description, reports, color, link }) => {
  const colorClasses = {
    apolo: 'bg-gradient-to-br from-pink-500 to-rose-600',
    ereporting: 'bg-gradient-to-br from-pink-500 to-rose-600',
    sipina: 'bg-gradient-to-br from-pink-500 to-rose-600',
  };

  const textClasses = {
    apolo: 'text-pink-600',
    ereporting: 'text-pink-600',
    sipina: 'text-pink-600',
  };

  const bgClasses = {
    apolo: 'bg-pink-50 border-pink-100 hover:bg-pink-100',
    ereporting: 'bg-pink-50 border-pink-100 hover:bg-pink-100',
    sipina: 'bg-pink-50 border-pink-100 hover:bg-pink-100',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md card-hover`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">
              {title.charAt(0)}
            </span>
          </div>
          <span className={`text-xs font-semibold ${textClasses[color]} px-3 py-1 rounded-full border ${bgClasses[color].replace('hover:bg', 'bg').replace('50', '100')}`}>
            {title}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <FileText className="w-4 h-4" />
            <span className="text-sm">{reports} Laporan</span>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textClasses[color]} hover:${textClasses[color].replace('600', '700')} font-medium text-sm flex items-center space-x-1 transition-colors`}
          >
            <span>Akses</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCard;