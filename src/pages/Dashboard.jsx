import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  BarChart3,
  TrendingUp,
  History,
  ArrowRight,
  Search
} from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCard from '../components/dashboard/StatsCard';
import QuickAccessCard from '../components/dashboard/QuickAccessCard';
import ActivityList from '../components/dashboard/ActivityList';
import RecentReports from '../components/dashboard/RecentReports';
import { homeReportsData, welcomeStats, quickAccessCards } from '../data/reportsData';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const activityData = [
    {
      id: 1,
      type: 'success',
      title: 'Laporan Keuangan Q1 2023 telah disetujui',
      time: '2 jam yang lalu',
      system: 'APOLO'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Laporan E-Statement memerlukan revisi',
      time: '5 jam yang lalu',
      system: 'E-REPORTING'
    },
    {
      id: 3,
      type: 'danger',
      title: 'Laporan SIPINA ditolak oleh sistem',
      time: 'Kemarin, 14:30',
      system: 'SIPINA'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {welcomeStats.map((stat, index) => (
          <StatsCard
            key={index}
            number={stat.number}
            label={stat.label}
            icon={stat.icon}
            color={stat.color}
            trend="up"
          />
        ))}
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quickAccessCards.map((card, index) => (
          <QuickAccessCard
            key={index}
            title={card.title}
            description={card.description}
            reports={card.reports}
            color={card.color}
            link={card.link}
          />
        ))}
      </div>

      {/* Recent Activity and Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <History className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <ActivityList activities={activityData} />
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Laporan Terbaru</h3>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-6">
            <RecentReports 
              reports={homeReportsData} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;