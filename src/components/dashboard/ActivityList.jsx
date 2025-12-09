import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const ActivityList = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSystemBadge = (system) => {
    const styles = {
      APOLO: 'bg-blue-100 text-blue-800 border-blue-200',
      'E-REPORTING': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      SIPINA: 'bg-pink-100 text-pink-800 border-pink-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[system]}`}>
        {system}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
          <div>
            {getSystemBadge(activity.system)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;