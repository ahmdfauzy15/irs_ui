import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Calendar,
  AlertCircle,
  Eye,
  ExternalLink,
  RefreshCw,
  Shield
} from 'lucide-react';
import { apoloReportsData } from '../data/reportsData';

const ApoloReports = () => {
  // Data reports statis
  const reports = apoloReportsData;
  
  // State untuk filter 2 tingkat
  const [filters, setFilters] = useState({
    status: 'all', // Level 1: Filter status
    subFilters: { // Level 2: Filter setelah status dipilih
      jenis: 'all',
      periode: 'all',
      tanggal: ''
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(false);

  // Hitung filteredReports secara reactive menggunakan useMemo
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // Level 1: Filter berdasarkan status
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }
    
    // Level 2: Filter sub-filters
    // Apply jenis filter
    if (filters.subFilters.jenis !== 'all') {
      filtered = filtered.filter(report => report.jenisValue === filters.subFilters.jenis);
    }

    // Apply periode filter
    if (filters.subFilters.periode !== 'all') {
      filtered = filtered.filter(report => report.periodeValue === filters.subFilters.periode);
    }

    // Apply tanggal filter
    if (filters.subFilters.tanggal) {
      const filterDate = new Date(filters.subFilters.tanggal);
      const filterMonth = filterDate.getMonth() + 1;
      const filterYear = filterDate.getFullYear();
      
      filtered = filtered.filter(report => {
        // Extract month and year from report date
        const reportDateStr = report.tanggal;
        const reportParts = reportDateStr.split(' ');
        if (reportParts.length >= 3) {
          const monthMap = {
            'Januari': 1, 'Februari': 2, 'Maret': 3, 'April': 4,
            'Mei': 5, 'Juni': 6, 'Juli': 7, 'Agustus': 8,
            'September': 9, 'Oktober': 10, 'November': 11, 'Desember': 12
          };
          const reportMonth = monthMap[reportParts[1]] || 0;
          const reportYear = parseInt(reportParts[2]);
          return reportYear === filterYear && reportMonth === filterMonth;
        }
        return false;
      });
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.jenis.toLowerCase().includes(term) ||
        report.periode.toLowerCase().includes(term) ||
        report.tanggal.toLowerCase().includes(term) ||
        report.deskripsi?.toLowerCase().includes(term) ||
        report.namaFile?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reports]);

  // Get unique jenis berdasarkan status yang dipilih
  const uniqueJenis = useMemo(() => {
    let filteredData = reports;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.status === filters.status);
    }
    
    const jenis = [...new Set(filteredData.map(report => report.jenisValue))];
    return jenis.map(j => ({
      value: j,
      label: j.charAt(0).toUpperCase() + j.slice(1)
    }));
  }, [filters.status]);

  // Get unique periode berdasarkan status yang dipilih
  const uniquePeriode = useMemo(() => {
    let filteredData = reports;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.status === filters.status);
    }
    
    const periode = [...new Set(filteredData.map(report => report.periodeValue))];
    return periode.map(p => ({
      value: p,
      label: p.charAt(0).toUpperCase() + p.slice(1)
    }));
  }, [filters.status]);

  // Hitung stats menggunakan useMemo untuk optimasi
  const stats = useMemo(() => ({
    total: reports.length,
    berhasil: reports.filter(r => r.status === 'berhasil').length,
    terlambat: reports.filter(r => r.status === 'terlambat').length,
    tidakBerhasil: reports.filter(r => r.status === 'tidak-berhasil').length,
    pending: reports.filter(r => r.status === 'pending').length,
  }), [reports]);

  // Status summary untuk filter level 1
  const statusSummary = useMemo(() => {
    const summary = {};
    const allStatus = ['berhasil', 'terlambat', 'tidak-berhasil', 'pending'];
    
    allStatus.forEach(status => {
      summary[status] = reports.filter(r => r.status === status).length;
    });
    
    return summary;
  }, [reports]);

  const resetFilters = () => {
    setFilters({
      status: 'all',
      subFilters: {
        jenis: 'all',
        periode: 'all',
        tanggal: ''
      }
    });
    setSearchTerm('');
    setSelectedReport(null);
    setShowSubFilters(false);
  };

  const handleStatusChange = (status) => {
    setFilters(prev => ({ 
      status,
      subFilters: {
        jenis: 'all',
        periode: 'all',
        tanggal: ''
      }
    }));
    
    // Tampilkan sub-filters otomatis jika status bukan 'all'
    if (status !== 'all') {
      setShowSubFilters(true);
    } else {
      setShowSubFilters(false);
    }
  };

  const handleSubFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      subFilters: {
        ...prev.subFilters,
        [key]: value
      }
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'berhasil': 'bg-green-100 text-green-800 border-green-200',
      'terlambat': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'tidak-berhasil': 'bg-red-100 text-red-800 border-red-200',
      'pending': 'bg-blue-100 text-blue-800 border-blue-200',
    };

    const labels = {
      'berhasil': 'Berhasil',
      'terlambat': 'Terlambat',
      'tidak-berhasil': 'Tidak Berhasil',
      'pending': 'Pending',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getJenisBadge = (jenis) => {
    const styles = {
      'rutin': 'bg-purple-100 text-purple-800 border-purple-200',
      'insidental': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'khusus': 'bg-pink-100 text-pink-800 border-pink-200',
    };

    const labels = {
      'rutin': 'Rutin',
      'insidental': 'Insidental',
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
      'Jenis': report.jenis,
      'Periode': report.periode,
      'Tanggal': report.tanggal,
      'Status': report.status === 'berhasil' ? 'Berhasil' : 
                report.status === 'terlambat' ? 'Terlambat' : 
                report.status === 'tidak-berhasil' ? 'Tidak Berhasil' : 'Pending',
      'Deskripsi': report.deskripsi || '',
      'Nama File': report.namaFile || '',
      'Ukuran': report.ukuran || ''
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apolo-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');
    return csv;
  };

  // Format tanggal untuk display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem APOLO</h1>
            <p className="text-gray-600 mt-1">Kelola semua laporan sistem APOLO di sini</p>
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
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{stats.total}</p>
                <p className="text-sm text-gray-600 font-medium">Total Laporan</p>
              </div>
            </div>
            
          </div>

          <div className="bg-gradient-to-br from-white to-green-50/50 rounded-xl p-5 border border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.berhasil}</p>
                <p className="text-sm text-gray-600 font-medium">Berhasil</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-xl p-5 border border-yellow-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-900">{stats.terlambat}</p>
                <p className="text-sm text-gray-600 font-medium">Terlambat</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{stats.tidakBerhasil}</p>
                <p className="text-sm text-gray-600 font-medium">Tidak Berhasil</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-xl p-5 border border-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-900">{stats.pending}</p>
                <p className="text-sm text-gray-600 font-medium">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section - 2 Tingkat */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Filter className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter 2-Tingkat Laporan APOLO</h3>
                  <p className="text-sm text-gray-600">Pilih status terlebih dahulu, lalu filter lainnya</p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Level 1: Status Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 1: Pilih Status Laporan</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <button
                  onClick={() => handleStatusChange('all')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'all' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Semua Status</div>
                      <div className="text-sm text-gray-600">{reports.length} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'all' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('berhasil')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'berhasil' 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Berhasil</div>
                      <div className="text-sm text-gray-600">{statusSummary.berhasil || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'berhasil' && <ChevronDown className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('terlambat')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'terlambat' 
                      ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Terlambat</div>
                      <div className="text-sm text-gray-600">{statusSummary.terlambat || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'terlambat' && <ChevronDown className="w-5 h-5 text-yellow-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('tidak-berhasil')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'tidak-berhasil' 
                      ? 'border-gray-500 bg-gray-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Tidak Berhasil</div>
                      <div className="text-sm text-gray-600">{statusSummary['tidak-berhasil'] || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'tidak-berhasil' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('pending')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'pending' 
                      ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Pending</div>
                      <div className="text-sm text-gray-600">{statusSummary.pending || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'pending' && <ChevronDown className="w-5 h-5 text-indigo-500" />}
                </button>
              </div>
            </div>

            {/* Level 2: Sub Filters */}
            {(filters.status !== 'all' || showSubFilters) && (
              <div className="mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Level 2: Filter Tambahan</h4>
                  <button
                    onClick={() => setShowSubFilters(!showSubFilters)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                  >
                    {showSubFilters ? (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        <span>Tampilkan</span>
                      </>
                    )}
                  </button>
                </div>
                
                {showSubFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jenis Laporan
                        <span className="ml-1 text-xs text-gray-500">
                          ({uniqueJenis.length} tersedia)
                        </span>
                      </label>
                      <select
                        value={filters.subFilters.jenis}
                        onChange={(e) => handleSubFilterChange('jenis', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        disabled={uniqueJenis.length === 0}
                      >
                        <option value="all">
                          {uniqueJenis.length === 0 ? 'Tidak tersedia' : 'Semua Jenis'}
                        </option>
                        {uniqueJenis.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Periode
                        <span className="ml-1 text-xs text-gray-500">
                          ({uniquePeriode.length} tersedia)
                        </span>
                      </label>
                      <select
                        value={filters.subFilters.periode}
                        onChange={(e) => handleSubFilterChange('periode', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        disabled={uniquePeriode.length === 0}
                      >
                        <option value="all">
                          {uniquePeriode.length === 0 ? 'Tidak tersedia' : 'Semua Periode'}
                        </option>
                        {uniquePeriode.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Filter Bulan/Tahun
                      </label>
                      <input
                        type="month"
                        value={filters.subFilters.tanggal}
                        onChange={(e) => handleSubFilterChange('tanggal', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Search className="w-4 h-4 inline mr-2" />
                        Cari Laporan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Cari laporan..."
                          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filter Info Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {filters.status !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          Status: {filters.status === 'berhasil' ? 'Berhasil' : 
                                  filters.status === 'terlambat' ? 'Terlambat' : 
                                  filters.status === 'tidak-berhasil' ? 'Tidak Berhasil' : 'Pending'}
                          <button 
                            onClick={() => handleStatusChange('all')}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.jenis !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Jenis: {filters.subFilters.jenis}
                          <button 
                            onClick={() => handleSubFilterChange('jenis', 'all')}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.periode !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Periode: {filters.subFilters.periode}
                          <button 
                            onClick={() => handleSubFilterChange('periode', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.tanggal && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          Periode: {formatDate(filters.subFilters.tanggal)}
                          <button 
                            onClick={() => handleSubFilterChange('tanggal', '')}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          Pencarian: "{searchTerm}"
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="ml-2 text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {filteredReports.length} laporan ditemukan
                </div>
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
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Daftar Laporan APOLO</h3>
                  <p className="text-sm text-gray-600">Total {filteredReports.length} laporan ditemukan</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredReports.length} dari {reports.length} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Periode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-purple-50 rounded-lg">
                          <FileText className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-purple-700">{report.jenis}</div>
                          {report.namaFile && (
                            <div className="text-xs text-gray-500">{report.namaFile}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJenisBadge(report.periodeValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.tanggal}</div>
                      {report.waktu && (
                        <div className="text-xs text-gray-500">{report.waktu}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-md truncate" title={report.deskripsi}>
                        {report.deskripsi}
                      </div>
                      {report.ukuran && (
                        <div className="text-xs text-gray-500 mt-1">Ukuran: {report.ukuran}</div>
                      )}
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
                        {report.status === 'berhasil' && (
                          <button
                            onClick={() => alert(`Download laporan ${report.jenis}`)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download laporan"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Buka laporan ${report.jenis}`)}
                          className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
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
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan APOLO</h3>
                    <p className="text-gray-600">{selectedReport.jenis}</p>
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis Laporan</h4>
                  <p className="text-lg font-bold text-purple-700">{selectedReport.jenis}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode</h4>
                  {getJenisBadge(selectedReport.periodeValue)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.tanggal}</p>
                  {selectedReport.waktu && (
                    <p className="text-sm text-gray-600 mt-1">{selectedReport.waktu}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama File</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.namaFile || 'Tidak tersedia'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Ukuran</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.ukuran || 'Tidak tersedia'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Deskripsi</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
              
              {selectedReport.catatan && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Catatan</h4>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">{selectedReport.catatan}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                {selectedReport.status === 'berhasil' && (
                  <button
                    onClick={() => alert(`Download laporan ${selectedReport.jenis}`)}
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Download Laporan
                  </button>
                )}
                <button
                  onClick={() => alert(`Membuka laporan ${selectedReport.jenis}`)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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

export default ApoloReports;