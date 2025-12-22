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
  XCircle
} from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCard from '../components/dashboard/StatsCard';
import QuickAccessCard from '../components/dashboard/QuickAccessCard';
import ActivityList from '../components/dashboard/ActivityList';
import RecentReports from '../components/dashboard/RecentReports';
import DashboardCarousel from '../components/dashboard/DashboardCarousel';
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
  const uniquePeriods = Object.keys(processedData.reportsByPeriod).length;
  
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
      </div>

      {/* Laporan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-900 font-bold text-2xl">{totalLJKTypes}</div>
              <div className="text-purple-700 text-sm font-medium">Jenis LJK</div>
              <div className="text-purple-500 text-xs">Tipe Lembaga</div>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-indigo-900 font-bold text-2xl">{uniquePeriods}</div>
              <div className="text-indigo-700 text-sm font-medium">Periode Laporan</div>
              <div className="text-indigo-500 text-xs">Variasi periode</div>
            </div>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-white p-4 rounded-xl border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-pink-900 font-bold text-2xl">{processedData.lateReports}</div>
              <div className="text-pink-700 text-sm font-medium">Terlambat</div>
              <div className="text-pink-500 text-xs">Laporan overdue</div>
            </div>
            <div className="p-2 bg-pink-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl border border-orange-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-900 font-bold text-2xl">{realTimeStats.daysToDeadline}</div>
              <div className="text-orange-700 text-sm font-medium">Deadline Dekat</div>
              <div className="text-orange-500 text-xs">Perlu perhatian</div>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
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
                  <h3 className="text-lg font-bold text-red-900">Analisis Laporan IRS</h3>
                  <p className="text-sm text-red-600/80">Visualisasi data dari {processedData.totalReports} laporan</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
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
              Analisis {processedData.totalReports} laporan dari {totalLJKTypes} jenis LJK untuk insight komprehensif.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">{realTimeStats.successRate}%</div>
          <div className="text-red-700 text-sm font-medium">Tingkat Keberhasilan</div>
          <div className="text-red-500 text-xs">Laporan yang disetujui</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">{processedData.activeReports}</div>
          <div className="text-red-700 text-sm font-medium">Laporan Aktif</div>
          <div className="text-red-500 text-xs">Dalam sistem</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">{realTimeStats.needsAttention}</div>
          <div className="text-red-700 text-sm font-medium">Perlu Perhatian</div>
          <div className="text-red-500 text-xs">Laporan bermasalah</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-red-900 font-bold text-2xl">{realTimeStats.monthlyReports}</div>
          <div className="text-red-700 text-sm font-medium">Laporan Bulanan</div>
          <div className="text-red-500 text-xs">Periode reguler</div>
        </div>
      </div>

      {/* Sistem Info */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Informasi Sistem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;