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
import DashboardCarousel from '../components/dashboard/DashboardCarousel';
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
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-red-50/30 to-white min-h-screen p-4 lg:p-6">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Dashboard Carousel */}
      <DashboardCarousel />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            icon={card.icon}      
          />
        ))}
      </div>

      {/* Recent Activity and Reports */}
      <div className="space-y-6">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden hover:shadow-red transition-shadow duration-300">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-red-100 to-white rounded-lg border border-red-200">
                  <History className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Aktivitas Terbaru</h3>
                  <p className="text-sm text-red-600/80">Update sistem terakhir</p>
                </div>
              </div>
              <button className="group flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="p-6 bg-white">
            <ActivityList activities={activityData} />
          </div>
        </div>

        {/* Recent Reports - Chart Version */}
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden hover:shadow-red transition-shadow duration-300">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-red-100 to-white rounded-lg border border-red-200">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Analisis Laporan</h3>
                  <p className="text-sm text-red-600/80">Visualisasi data laporan IRS</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-red-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan..."
                  className="pl-10 pr-4 py-2.5 border border-red-200 bg-white/80 focus:bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900 placeholder-red-400 transition-all duration-200 w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <RecentReports 
              reports={homeReportsData} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>

      {/* Additional Dashboard Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Pelaporan Tepat Waktu</h4>
            </div>
            <p className="text-red-100 text-sm">
              Pastikan semua laporan disampaikan sesuai jadwal untuk menghindari sanksi.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">24/7 Monitoring</h4>
            </div>
            <p className="text-red-100 text-sm">
              Sistem IRS OJK aktif 24 jam untuk memantau status laporan Anda.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Analisis Real-time</h4>
            </div>
            <p className="text-red-100 text-sm">
              Dapatkan insight dari data pelaporan untuk pengambilan keputusan yang lebih baik.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">98%</div>
          <div className="text-red-700 text-sm font-medium">Tingkat Keberhasilan</div>
          <div className="text-red-500 text-xs">Laporan yang disetujui</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">24</div>
          <div className="text-red-700 text-sm font-medium">Laporan Aktif</div>
          <div className="text-red-500 text-xs">Dalam proses review</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">3</div>
          <div className="text-red-700 text-sm font-medium">Perlu Perhatian</div>
          <div className="text-red-500 text-xs">Laporan menunggu revisi</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">7</div>
          <div className="text-red-700 text-sm font-medium">Hari Lagi</div>
          <div className="text-red-500 text-xs">Batas waktu pelaporan</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;