import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileSignature, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Building,
  Users,
  BarChart3,
  AlertCircle,
  Eye,
  ExternalLink,
  RefreshCw,
  Calendar,
  Shield,
  TrendingUp
} from 'lucide-react';
import { ereportingModulesData, activeIndustries, monitoringStatus, reportPeriods } from '../data/ereportingData';

const EReporting = () => {
  // State untuk filter dan search
  const [filters, setFilters] = useState({
    kodeIndustri: 'all',
    status: 'all',
    jenis: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [stats, setStats] = useState({
    totalModul: 0,
    aktif: 0,
    used: 0,
    unused: 0,
    totalIndustri: 0
  });

  // Hitung stats saat data berubah
  useEffect(() => {
    const totalModul = ereportingModulesData.length;
    const aktif = ereportingModulesData.filter(r => r.status === 'Aktif').length;
    const used = ereportingModulesData.filter(r => r.status === 'Used').length;
    const unused = ereportingModulesData.filter(r => r.status === 'Unused').length;
    const totalIndustri = activeIndustries.length;

    setStats({ totalModul, aktif, used, unused, totalIndustri });
  }, []);

  // Hitung filteredReports secara reactive menggunakan useMemo
  const filteredReports = useMemo(() => {
    return ereportingModulesData.filter(report => {
      // Filter berdasarkan kode industri
      if (filters.kodeIndustri !== 'all' && report.kodeIndustri !== filters.kodeIndustri) {
        return false;
      }
      
      // Filter berdasarkan status
      if (filters.status !== 'all' && report.status !== filters.status) {
        return false;
      }
      
      // Filter berdasarkan jenis
      if (filters.jenis !== 'all' && report.jenis !== filters.jenis) {
        return false;
      }
      
      // Filter berdasarkan search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!report.namaLaporan.toLowerCase().includes(term) &&
            !report.namaIndustri.toLowerCase().includes(term) &&
            !report.kodeLaporan.toLowerCase().includes(term) &&
            !report.kodeIndustri.toLowerCase().includes(term)) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters, searchTerm]);

  // Get unique kode industri untuk filter
  const uniqueKodeIndustri = useMemo(() => {
    const kodes = [...new Set(ereportingModulesData.map(report => report.kodeIndustri))];
    return kodes.map(kode => ({
      value: kode,
      label: kode
    }));
  }, []);

  const resetFilters = () => {
    setFilters({ 
      kodeIndustri: 'all', 
      status: 'all',
      jenis: 'all' 
    });
    setSearchTerm('');
    setSelectedReport(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Aktif': 'bg-green-100 text-green-800 border-green-200',
      'Used': 'bg-blue-100 text-blue-800 border-blue-200',
      'Unused': 'bg-gray-100 text-gray-800 border-gray-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Expired': 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  const getJenisBadge = (jenis) => {
    const styles = {
      'mingguan': 'bg-purple-100 text-purple-800 border-purple-200',
      'bulanan': 'bg-blue-100 text-blue-800 border-blue-200',
      'triwulanan': 'bg-green-100 text-green-800 border-green-200',
      'semesteran': 'bg-orange-100 text-orange-800 border-orange-200',
      'tahunan': 'bg-red-100 text-red-800 border-red-200',
      'khusus': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };

    const labels = {
      'mingguan': 'Mingguan',
      'bulanan': 'Bulanan',
      'triwulanan': 'Triwulanan',
      'semesteran': 'Semesteran',
      'tahunan': 'Tahunan',
      'khusus': 'Khusus',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[jenis] || 'bg-gray-100'}`}>
        {labels[jenis] || jenis}
      </span>
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredReports.map(report => ({
      'Kode Industri': report.kodeIndustri,
      'Nama Industri': report.namaIndustri,
      'Kode Laporan': report.kodeLaporan,
      'Nama Laporan': report.namaLaporan,
      'Status': report.status,
      'Jenis': report.jenis,
      'Periode': report.periodePelaporan,
      'Direktorat': report.direktorat
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `e-reporting-modules-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');
    return csv;
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-red-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <FileSignature className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem E-Reporting OJK</h1>
            <p className="text-gray-600 mt-1">Modul Laporan Elektronik untuk Seluruh Industri Keuangan</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button 
            onClick={() => alert('Refresh data berhasil')}
            className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-200 shadow hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{stats.totalModul}</p>
                <p className="text-sm text-gray-600 font-medium">Total Modul</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50/50 rounded-xl p-5 border border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.aktif}</p>
                <p className="text-sm text-gray-600 font-medium">Aktif</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.used}</p>
                <p className="text-sm text-gray-600 font-medium">Digunakan</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.unused}</p>
                <p className="text-sm text-gray-600 font-medium">Tidak Digunakan</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-xl p-5 border border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg shadow-sm">
                <Building className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{stats.totalIndustri}</p>
                <p className="text-sm text-gray-600 font-medium">Industri</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Filter className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Modul Laporan</h3>
                  <p className="text-sm text-gray-600">Temukan modul laporan berdasarkan kriteria</p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Kode Industri
                </label>
                <select
                  value={filters.kodeIndustri}
                  onChange={(e) => setFilters(prev => ({ ...prev, kodeIndustri: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="all">Semua Industri</option>
                  {uniqueKodeIndustri.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="all">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Used">Digunakan</option>
                  <option value="Unused">Tidak Digunakan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Jenis Periode
                </label>
                <select
                  value={filters.jenis}
                  onChange={(e) => setFilters(prev => ({ ...prev, jenis: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="all">Semua Jenis</option>
                  {reportPeriods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  Cari Modul
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari nama/kode laporan..."
                    className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Status Monitoring */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Monitoring Status:</h4>
              <div className="flex flex-wrap gap-2">
                {monitoringStatus.map((status) => (
                  <div key={status.status} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
                    <span className="text-sm font-medium">{status.status}</span>
                    <span className="text-xs text-gray-500">- {status.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Daftar Modul Laporan E-Reporting</h3>
                  <p className="text-sm text-gray-600">Total {filteredReports.length} modul ditemukan</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredReports.length} dari {ereportingModulesData.length} modul
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kode Industri</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Industri</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kode Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-red-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-blue-50 rounded-lg">
                          <Building className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-blue-700">{report.kodeIndustri}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={report.namaIndustri}>
                        {report.namaIndustri}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-green-50 rounded-lg">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-bold text-green-700">{report.kodeLaporan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md truncate" title={report.namaLaporan}>
                        {report.namaLaporan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJenisBadge(report.jenis)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(report)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Buka laporan ${report.kodeLaporan}`)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Buka laporan"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada modul ditemukan</h3>
              <p className="text-gray-600">Tidak ada modul yang sesuai dengan kriteria pencarian atau filter</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Data diperbarui: {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  ← Sebelumnya
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Selanjutnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900">Detail Modul Laporan</h3>
                    <p className="text-gray-600">{selectedReport.kodeLaporan}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Kode Industri</h4>
                  <p className="text-lg font-bold text-blue-700">{selectedReport.kodeIndustri}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Industri</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.namaIndustri}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Kode Laporan</h4>
                  <p className="text-lg font-bold text-green-700">{selectedReport.kodeLaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.namaLaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis Periode</h4>
                  {getJenisBadge(selectedReport.jenis)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Pelaporan</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.periodePelaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Direktorat</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.direktorat}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Deskripsi</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.deskripsi}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Alamat Pengiriman</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.alamat}</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => alert(`Membuka laporan ${selectedReport.kodeLaporan}`)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Buka Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EReporting;