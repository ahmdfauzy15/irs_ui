// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  BarChart3,
  TrendingUp,
  History,
  ArrowRight,
  Search,
  AlertCircle,
  Building,
  Calendar,
  XCircle,
  Key,
  User
} from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCard from '../components/dashboard/StatsCard';
import QuickAccessCard from '../components/dashboard/QuickAccessCard';
import ActivityList from '../components/dashboard/ActivityList';
import RecentReports from '../components/dashboard/RecentReports';
import DashboardCarousel from '../components/dashboard/DashboardCarousel';
import { Link } from 'react-router-dom'; // TAMBAHKAN INI
import { 
  homeReportsData, 
  welcomeStats, 
  quickAccessCards, 
  recentActivityData,
  getRealTimeStats,
  processReportData 
} from '../data/reportDataDash';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ambil data real-time
  const realTimeStats = getRealTimeStats();
  const processedData = processReportData();
  
  // Hitung statistik tambahan
  const totalLJKTypes = Object.keys(processedData.reportsByLJKType).length;
  // const uniquePeriods = Object.keys(processedData.reportsByPeriod).length;
  
  // Data aktivitas berdasarkan JSON
  const activityData = recentActivityData;
  
  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-red-50/30 to-white min-h-screen p-4 lg:p-6">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Dashboard Carousel */}
      <DashboardCarousel />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        
        {/* Tambahkan card untuk Access Management */}
        <Link to="/Profile">
          <div className="bg-gradient-to-br from-red-50/30 to-white border border-red-100 hover:border-red-300 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow group-hover:scale-110 transition-transform duration-300">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    Baru
                  </span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-red-900 mb-2">Management Account</h4>
              <p className="text-red-600 text-sm mb-4">
                Kelola hak akses dan profil pengguna aplikasi pelaporan OJK
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Akses Aktif</span>
                  <span className="font-bold text-red-700">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status Akun</span>
                  <span className="font-medium text-green-600">Aktif</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-red-600 group-hover:text-red-700 transition-colors">
                  Akses Profil & Role
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
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
                  <h3 className="text-lg font-bold text-red-900">Analisis Laporan IRS Terbaru</h3>
                  <p className="text-sm text-red-600/80">Visualisasi data dari laporan hari ini</p>
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
              reports={homeReportsData()} 
              searchTerm={searchTerm}
              allReports={processedData.allReports}
            />
          </div>
        </div>
      </div>

      {/* Additional Dashboard Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-white">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Kepatuhan Pelaporan</h4>
            </div>
            <p className="text-red-100 text-sm">
              {realTimeStats.successRate}% laporan berhasil dikirim tepat waktu sesuai regulasi OJK.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Monitoring Real-time</h4>
            </div>
            <p className="text-red-100 text-sm">
              Pantau status {processedData.activeReports} laporan aktif dalam sistem IRS OJK 24/7.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Analisis Data</h4>
            </div>
            <p className="text-red-100 text-sm">
              Analisis {processedData.totalReports} laporan dari 3 jenis aplikasi pelaporan untuk insight komprehensif.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <User className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg">Manajemen Akun</h4>
            </div>
            <p className="text-red-100 text-sm">
              <Link to="/AccessManagement" className="underline hover:text-white transition-colors">
                Akses profil dan kelola role pengguna
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Sistem Info */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Informasi Sistem</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">APOLO</span>
            </div>
            <p className="text-xs text-gray-600">
              {processedData.reportsBySystem.APOLO?.length || 0} laporan dari berbagai jenis LJK
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">E-Reporting</span>
            </div>
            <p className="text-xs text-gray-600">
              {processedData.reportsBySystem.Ereporting?.length || 0} laporan elektronik
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">SiPina</span>
            </div>
            <p className="text-xs text-gray-600">
              {processedData.reportsBySystem.SiPina?.length || 0} laporan nasabah asing
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Role & Access</span>
            </div>
            <p className="text-xs text-gray-600">
              <Link to="/AccessManagement" className="text-red-600 hover:text-red-700 hover:underline">
                Akses manajemen akun pengguna
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;