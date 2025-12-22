// src/components/dashboard/RecentReports.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  FileText, 
  Building, 
  TrendingUp, 
  Users,
  Eye,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Smartphone,
  Tablet,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Shield,
  BanknoteIcon
} from 'lucide-react';

const RecentReports = ({ reports, searchTerm, allReports }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeChart, setActiveChart] = useState('system');
  const [filteredData, setFilteredData] = useState([]);
  
  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Filter data berdasarkan search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(reports);
    } else {
      const filtered = reports.filter(report =>
        report.jenis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.sistem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.jenis_ljk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.periode?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [reports, searchTerm]);
  
  // Helper functions
  const getSystemColor = (system) => {
    const colors = {
      'APOLO': '#3B82F6',
      'Ereporting': '#06B6D4',
      'SiPina': '#8B5CF6',
      'E-REPORTING': '#06B6D4',
      'SIPINA': '#8B5CF6',
      'Unknown': '#6B7280'
    };
    return colors[system] || '#6B7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'berhasil': '#10B981',
      'terlambat': '#F59E0B',
      'tidak-berhasil': '#EF4444',
      'gagal': '#EF4444',
      'Aktif': '#10B981',
      'Tepat Waktu': '#10B981',
      'Terlambat': '#F59E0B',
      'Berhasil': '#10B981',
      'Tidak Berhasil': '#EF4444',
      'Unknown': '#9CA3AF'
    };
    return colors[status] || '#9CA3AF';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'berhasil': 'Berhasil',
      'terlambat': 'Terlambat',
      'tidak-berhasil': 'Tidak Berhasil',
      'gagal': 'Gagal',
      'Aktif': 'Aktif',
      'Tepat Waktu': 'Tepat Waktu',
      'Terlambat': 'Terlambat',
      'Berhasil': 'Berhasil',
      'Tidak Berhasil': 'Tidak Berhasil'
    };
    return labels[status] || status;
  };

  const getSystemIcon = (system) => {
    switch(system) {
      case 'APOLO': return <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case 'Ereporting':
      case 'E-REPORTING': return <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case 'SiPina':
      case 'SIPINA': return <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default: return <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  const getLJKIcon = (jenis) => {
    if (jenis.includes('BU')) return <BanknoteIcon className="w-3.5 h-3.5" />;
    if (jenis.includes('BPR')) return <Shield className="w-3.5 h-3.5" />;
    if (jenis.includes('Bank')) return <Building className="w-3.5 h-3.5" />;
    if (jenis.includes('Asuransi')) return <Shield className="w-3.5 h-3.5" />;
    return <FileText className="w-3.5 h-3.5" />;
  };

  // Data untuk charts
  const systemData = useMemo(() => {
    const systems = {};
    filteredData.forEach(report => {
      const system = report.sistem || 'Unknown';
      systems[system] = (systems[system] || 0) + 1;
    });
    return Object.entries(systems).map(([name, value]) => ({
      name,
      value,
      color: getSystemColor(name)
    }));
  }, [filteredData]);

  const statusData = useMemo(() => {
    const statuses = {};
    filteredData.forEach(report => {
      const status = report.ketepatan || report.status || 'Unknown';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({
      name: getStatusLabel(name),
      value,
      color: getStatusColor(name)
    }));
  }, [filteredData]);

  const recentBarData = useMemo(() => {
    return filteredData.slice(0, 5).map(report => ({
      name: report.jenis?.substring(0, isMobile ? 12 : 20) + (report.jenis?.length > (isMobile ? 12 : 20) ? '...' : ''),
      laporan: report.jenis,
      value: 1,
      system: report.sistem,
      status: report.ketepatan || report.status,
      jenis_ljk: report.jenis_ljk,
      periode: report.periode,
      color: getSystemColor(report.sistem)
    }));
  }, [filteredData, isMobile]);

  // Data untuk distribusi LJK
  const ljkData = useMemo(() => {
    const ljkTypes = {};
    filteredData.forEach(report => {
      const jenis = report.jenis_ljk || 'Unknown';
      if (jenis) {
        ljkTypes[jenis] = (ljkTypes[jenis] || 0) + 1;
      }
    });
    return Object.entries(ljkTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name: name.length > 10 ? name.substring(0, 10) + '...' : name,
        fullName: name,
        value,
        color: getSystemColor('APOLO') // Default color
      }));
  }, [filteredData]);

  const systemLinks = {
    'APOLO': '/apolo',
    'Ereporting': '/ereporting',
    'E-REPORTING': '/ereporting',
    'SiPina': '/sipina',
    'SIPINA': '/sipina'
  };

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-50 to-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-red-200 shadow-sm">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Tidak ada laporan ditemukan</h3>
        <p className="text-sm text-gray-600">Coba gunakan kata kunci lain</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Stats - Mobile Compact */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100 shadow-xs sm:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xs sm:text-sm text-blue-600 font-medium truncate">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{filteredData.length}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100 shadow-xs sm:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xs sm:text-sm text-green-600 font-medium truncate">Tepat Waktu</p>
              <p className="text-xl sm:text-2xl font-bold text-green-900">
                {filteredData.filter(r => r.ketepatan === 'Tepat Waktu').length}
              </p>
            </div>
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-100 shadow-xs sm:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xs sm:text-sm text-red-600 font-medium truncate">Perhatian</p>
              <p className="text-xl sm:text-2xl font-bold text-red-900">
                {filteredData.filter(r => r.ketepatan === 'Terlambat' || r.status === 'tidak-berhasil').length}
              </p>
            </div>
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Navigation for Mobile */}
      {isMobile && (
        <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-white p-2 rounded-lg border border-red-100">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveChart('system')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeChart === 'system' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-red-50'}`}
            >
              Sistem
            </button>
            <button
              onClick={() => setActiveChart('status')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeChart === 'status' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-red-50'}`}
            >
              Status
            </button>
            <button
              onClick={() => setActiveChart('bar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeChart === 'bar' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-red-50'}`}
            >
              Laporan
            </button>
            <button
              onClick={() => setActiveChart('ljk')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeChart === 'ljk' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-red-50'}`}
            >
              LJK
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-500 hover:text-red-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-500 hover:text-red-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'}`}>
        {/* Pie Chart - Distribution by System */}
        {(!isMobile || activeChart === 'system') && (
          <div className="bg-gradient-to-br from-white to-red-50/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-100 shadow-sm sm:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-red-900 truncate">Distribusi Sistem</h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Laporan berdasarkan sistem pelaporan</p>
              </div>
              <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
            </div>
            
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={systemData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={isMobile ? 
                      ({ name, percent }) => `${name.slice(0, 3)}: ${(percent * 100).toFixed(0)}%` :
                      ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {systemData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {!isMobile && <Tooltip formatter={(value) => [`${value} laporan`, 'Jumlah']} />}
                  {!isMobile && <Legend />}
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-red-100">
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Akses Cepat Sistem:</h4>
              <div className={`${isMobile ? 'flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1' : 'grid grid-cols-3 gap-2'}`}>
                {systemData.map((system, index) => (
                  <Link
                    key={index}
                    to={systemLinks[system.name] || '#'}
                    className={`${isMobile ? 'flex-shrink-0 w-32' : ''} flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white`}
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="p-1 sm:p-1.5 rounded-md" style={{ backgroundColor: `${system.color}20` }}>
                        {getSystemIcon(system.name)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-20">{system.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5 sm:mt-1">{system.value} laporan</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pie Chart - Distribution by Status */}
        {(!isMobile || activeChart === 'status') && (
          <div className="bg-gradient-to-br from-white to-red-50/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-100 shadow-sm sm:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-red-900 truncate">Distribusi Status</h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Ketepatan waktu pengiriman</p>
              </div>
              <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
            </div>
            
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={isMobile ? 
                      ({ name, percent }) => `${name.slice(0, 8)}: ${(percent * 100).toFixed(0)}%` :
                      ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {!isMobile && <Tooltip formatter={(value) => [`${value} laporan`, 'Jumlah']} />}
                  {!isMobile && <Legend />}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Bar Chart - Recent Reports */}
      {(!isMobile || activeChart === 'bar') && (
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-100 shadow-sm sm:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-red-900 truncate">Laporan Terbaru</h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Visualisasi laporan terkini</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
          </div>
          
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recentBarData}
                margin={{ top: 10, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  angle={isMobile ? -90 : -45}
                  textAnchor={isMobile ? "end" : "end"}
                  height={isMobile ? 80 : 60}
                  fontSize={isMobile ? 10 : 12}
                  interval={0}
                />
                <YAxis fontSize={isMobile ? 10 : 12} />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const data = props.payload;
                    return [
                      <div key="tooltip-content" className="text-xs sm:text-sm">
                        <div className="font-semibold text-gray-900 truncate max-w-xs">{data.laporan}</div>
                        <div className="text-gray-600">Sistem: {data.system}</div>
                        <div className="text-gray-600">LJK: {data.jenis_ljk}</div>
                        <div className="text-gray-600">Periode: {data.periode}</div>
                        <div className="text-gray-600">Status: {getStatusLabel(data.status)}</div>
                      </div>
                    ];
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 20 : 40}
                  background={{ fill: '#f3f4f6' }}
                >
                  {recentBarData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-red-100">
            <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
              <div className="text-xs sm:text-sm text-gray-600">
                Menampilkan {filteredData.length} laporan
              </div>
              <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex items-center space-x-3'}`}>
                <Link
                  to="/apolo"
                  className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium hover:underline px-2 py-1.5 sm:px-0 sm:py-0 bg-blue-50 sm:bg-transparent rounded sm:rounded-none"
                >
                  <span>APOLO</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
                <Link
                  to="/ereporting"
                  className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 text-cyan-600 hover:text-cyan-800 text-xs sm:text-sm font-medium hover:underline px-2 py-1.5 sm:px-0 sm:py-0 bg-cyan-50 sm:bg-transparent rounded sm:rounded-none"
                >
                  <span>E-Reporting</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart - LJK Distribution */}
      {(!isMobile || activeChart === 'ljk') && (
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-100 shadow-sm sm:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-red-900 truncate">Distribusi LJK</h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Laporan berdasarkan jenis lembaga</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
          </div>
          
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ljkData}
                margin={{ top: 10, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  angle={isMobile ? -90 : -45}
                  textAnchor={isMobile ? "end" : "end"}
                  height={isMobile ? 80 : 60}
                  fontSize={isMobile ? 10 : 12}
                  interval={0}
                />
                <YAxis fontSize={isMobile ? 10 : 12} />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const data = props.payload;
                    return [
                      <div key="tooltip-content" className="text-xs sm:text-sm">
                        <div className="font-semibold text-gray-900 truncate max-w-xs">{data.fullName}</div>
                        <div className="text-gray-600">Jumlah Laporan: {data.value}</div>
                      </div>
                    ];
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 20 : 40}
                  background={{ fill: '#f3f4f6' }}
                >
                  {ljkData.map((entry, index) => (
                    <Cell key={`ljk-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-red-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ljkData.slice(0, 4).map((ljk, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <div className="p-1 bg-blue-100 rounded">
                    {getLJKIcon(ljk.fullName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{ljk.name}</p>
                    <p className="text-xs text-gray-500">{ljk.value} laporan</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Overview Cards */}
      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Link
          to="/apolo"
          className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-blue-100 shadow-xs sm:shadow-sm hover:shadow-md sm:hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group block"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Building className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">APOLO</span>
          </div>
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 truncate">Laporan LJK</h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
            Aplikasi Pelaporan Online untuk Lembaga Jasa Keuangan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {systemData.find(s => s.name === 'APOLO')?.value || 0} laporan
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link
          to="/ereporting"
          className="bg-gradient-to-br from-cyan-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-cyan-100 shadow-xs sm:shadow-sm hover:shadow-md sm:hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group block"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600" />
            </div>
            <span className="text-xs font-medium text-cyan-600">E-REPORTING</span>
          </div>
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 truncate">Pelaporan Elektronik</h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
            Sistem pelaporan elektronik untuk industri keuangan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {systemData.find(s => s.name === 'Ereporting' || s.name === 'E-REPORTING')?.value || 0} laporan
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link
          to="/sipina"
          className="bg-gradient-to-br from-purple-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-purple-100 shadow-xs sm:shadow-sm hover:shadow-md sm:hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group block"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600">SiPina</span>
          </div>
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 truncate">Nasabah Asing</h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
            Laporan informasi nasabah asing untuk kepatuhan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {systemData.find(s => s.name === 'SiPina' || s.name === 'SIPINA')?.value || 0} laporan
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentReports;