import React, { useMemo } from 'react';
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
  Clock
} from 'lucide-react';

const RecentReports = ({ reports, searchTerm }) => {
  // Helper functions yang harus didefinisikan DULU
  const getSystemColor = (system) => {
    const colors = {
      'APOLO': '#3B82F6', // blue
      'E-REPORTING': '#06B6D4', // cyan
      'SIPINA': '#8B5CF6', // purple
      'Unknown': '#6B7280' // gray
    };
    return colors[system] || '#6B7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'berhasil': '#10B981', // green
      'terlambat': '#F59E0B', // yellow
      'tidak-berhasil': '#EF4444', // red
      'Aktif': '#10B981',
      'Used': '#3B82F6',
      'Unused': '#6B7280',
      'Unknown': '#9CA3AF'
    };
    return colors[status] || '#9CA3AF';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'berhasil': 'Berhasil',
      'terlambat': 'Terlambat',
      'tidak-berhasil': 'Tidak Berhasil',
      'Aktif': 'Aktif',
      'Used': 'Digunakan',
      'Unused': 'Tidak Digunakan'
    };
    return labels[status] || status;
  };

  const getSystemIcon = (system) => {
    switch(system) {
      case 'APOLO':
        return <Building className="w-4 h-4" />;
      case 'E-REPORTING':
        return <TrendingUp className="w-4 h-4" />;
      case 'SIPINA':
        return <Users className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Filter reports
  const filteredReports = useMemo(() => {
    if (!reports) return [];
    return reports.filter(report =>
      report.jenis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.sistem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.periode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reports, searchTerm]);

  // Hitung data untuk pie chart (berdasarkan sistem)
  const systemData = useMemo(() => {
    if (!filteredReports.length) return [];
    
    const systems = {};
    filteredReports.forEach(report => {
      const system = report.sistem || 'Unknown';
      systems[system] = (systems[system] || 0) + 1;
    });
    
    return Object.entries(systems).map(([name, value]) => ({
      name,
      value,
      color: getSystemColor(name)
    }));
  }, [filteredReports]);

  // Hitung data untuk status pie chart
  const statusData = useMemo(() => {
    if (!filteredReports.length) return [];
    
    const statuses = {};
    filteredReports.forEach(report => {
      const status = report.status || 'Unknown';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    
    return Object.entries(statuses).map(([name, value]) => ({
      name: getStatusLabel(name),
      value,
      color: getStatusColor(name)
    }));
  }, [filteredReports]);

  // Data untuk bar chart (5 laporan terbaru)
  const recentBarData = useMemo(() => {
    if (!filteredReports.length) return [];
    
    return filteredReports
      .slice(0, 5)
      .map(report => ({
        name: report.jenis?.substring(0, 20) + (report.jenis?.length > 20 ? '...' : ''),
        laporan: report.jenis,
        value: 1,
        system: report.sistem,
        status: report.status,
        tanggal: report.tanggal,
        color: getSystemColor(report.sistem)
      }));
  }, [filteredReports]);

  // Link untuk masing-masing sistem
  const systemLinks = {
    'APOLO': '/apolo',
    'E-REPORTING': '/ereporting',
    'SIPINA': '/sipina'
  };

  if (filteredReports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 shadow-sm">
          <FileText className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
        <p className="text-gray-600 mb-6">Coba gunakan kata kunci lain</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Laporan</p>
              <p className="text-2xl font-bold text-blue-900">{filteredReports.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Berhasil/Aktif</p>
              <p className="text-2xl font-bold text-green-900">
                {filteredReports.filter(r => r.status === 'berhasil' || r.status === 'Aktif').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 border border-red-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Perlu Perhatian</p>
              <p className="text-2xl font-bold text-red-900">
                {filteredReports.filter(r => r.status === 'terlambat' || r.status === 'tidak-berhasil').length}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Distribution by System */}
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-red-900">Distribusi Sistem</h3>
              <p className="text-sm text-gray-600">Laporan berdasarkan sistem</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Building className="w-5 h-5 text-red-600" />
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {systemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} laporan`, 'Jumlah']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Quick Links to Systems */}
          <div className="mt-6 pt-6 border-t border-red-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Akses Cepat Sistem:</h4>
            <div className="grid grid-cols-3 gap-2">
              {systemData.map((system, index) => (
                <Link
                  key={index}
                  to={systemLinks[system.name] || '#'}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white"
                >
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-md" style={{ backgroundColor: `${system.color}20` }}>
                      {getSystemIcon(system.name)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{system.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{system.value} laporan</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart - Distribution by Status */}
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-red-900">Distribusi Status</h3>
              <p className="text-sm text-gray-600">Laporan berdasarkan status</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} laporan`, 'Jumlah']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart - Recent Reports */}
      <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-red-900">5 Laporan Terbaru</h3>
            <p className="text-sm text-gray-600">Visualisasi laporan terbaru</p>
          </div>
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={recentBarData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name, props) => {
                  const data = props.payload;
                  return [
                    <div key="tooltip-content">
                      <div className="font-semibold text-gray-900">{data.laporan}</div>
                      <div className="text-sm text-gray-600">
                        Sistem: {data.system}
                      </div>
                      <div className="text-sm text-gray-600">
                        Status: {getStatusLabel(data.status)}
                      </div>
                      {data.tanggal && (
                        <div className="text-sm text-gray-600">
                          Tanggal: {data.tanggal}
                        </div>
                      )}
                    </div>
                  ];
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                background={{ fill: '#f3f4f6' }}
              >
                {recentBarData.map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-red-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total {filteredReports.length} laporan ditemukan
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/apolo"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                <span>Lihat APOLO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ereporting"
                className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-800 text-sm font-medium hover:underline"
              >
                <span>Lihat E-Reporting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sipina"
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 text-sm font-medium hover:underline"
              >
                <span>Lihat SIPINA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/apolo"
          className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">APOLO</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Laporan LJK</h4>
          <p className="text-sm text-gray-600 mb-4">
            Sistem pelaporan online untuk Lembaga Jasa Keuangan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {filteredReports.filter(r => r.sistem === 'APOLO').length} laporan
            </span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link
          to="/ereporting"
          className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-5 border border-cyan-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
              <TrendingUp className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-xs font-medium text-cyan-600">E-REPORTING</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Pelaporan Elektronik</h4>
          <p className="text-sm text-gray-600 mb-4">
            Sistem pelaporan elektronik untuk seluruh industri keuangan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {filteredReports.filter(r => r.sistem === 'E-REPORTING').length} laporan
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link
          to="/sipina"
          className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-5 border border-purple-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600">SIPINA</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Nasabah Asing</h4>
          <p className="text-sm text-gray-600 mb-4">
            Laporan informasi nasabah asing untuk kepatuhan PPSK
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {filteredReports.filter(r => r.sistem === 'SIPINA').length} laporan
            </span>
            <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentReports;