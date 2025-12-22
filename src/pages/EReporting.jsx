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
  TrendingUp,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckSquare,
  FileCheck,
  FileX
} from 'lucide-react';
import { 
  monitoringLaporanData, 
  jenisLJKOptions, 
  periodeLaporanOptions,
  statusPengirimanOptions,
  statusKetepatanOptions 
} from '../data/monitoringData';

const EReporting = () => {
  // State untuk filter 2 tingkat
  const [filters, setFilters] = useState({
    status: 'all',
    subFilters: {
      jenisLJK: 'all',
      periodeLaporan: 'all',
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(false);
  const [stats, setStats] = useState({
    totalLaporan: 0,
    berhasil: 0,
    tidakBerhasil: 0,
    tepatWaktu: 0,
    terlambat: 0
  });

  // Hitung stats saat data berubah
  useEffect(() => {
    const totalLaporan = monitoringLaporanData.length;
    const berhasil = monitoringLaporanData.filter(r => r.statusPengiriman === 'Berhasil').length;
    const tidakBerhasil = monitoringLaporanData.filter(r => r.statusPengiriman === 'Tidak Berhasil').length;
    const tepatWaktu = monitoringLaporanData.filter(r => r.statusKetepatan === 'Tepat Waktu').length;
    const terlambat = monitoringLaporanData.filter(r => r.statusKetepatan === 'Terlambat').length;

    setStats({ totalLaporan, berhasil, tidakBerhasil, tepatWaktu, terlambat });
  }, []);

  // Hitung filteredReports secara reactive menggunakan useMemo
  const filteredReports = useMemo(() => {
    let filtered = [...monitoringLaporanData];

    // Level 1: Filter berdasarkan status pengiriman
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.statusPengiriman === filters.status);
    }
    
    // Level 2: Filter sub-filters
    if (filters.subFilters.jenisLJK !== 'all') {
      filtered = filtered.filter(report => report.jenisLJK === filters.subFilters.jenisLJK);
    }

    if (filters.subFilters.periodeLaporan !== 'all') {
      filtered = filtered.filter(report => {
        const periode = report.periodeLaporan.toLowerCase();
        const filterPeriode = filters.subFilters.periodeLaporan.toLowerCase();
        return periode.includes(filterPeriode);
      });
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.namaLaporan.toLowerCase().includes(term) ||
        report.jenisLJK.toLowerCase().includes(term) ||
        report.periodeLaporan.toLowerCase().includes(term) ||
        report.batasWaktu.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm]);

  // Get unique jenisLJK berdasarkan status yang dipilih
  const uniqueJenisLJK = useMemo(() => {
    let filteredData = monitoringLaporanData;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.statusPengiriman === filters.status);
    }
    
    const jenisLJK = [...new Set(filteredData.map(report => report.jenisLJK))];
    return jenisLJK.map(j => ({
      value: j,
      label: j
    }));
  }, [filters.status]);

  // Get unique periode berdasarkan status yang dipilih
  const uniquePeriode = useMemo(() => {
    let filteredData = monitoringLaporanData;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.statusPengiriman === filters.status);
    }
    
    const periode = [...new Set(filteredData.map(report => report.periodeLaporan))];
    return periode.map(p => ({
      value: p,
      label: p
    }));
  }, [filters.status]);

  // Status summary untuk filter level 1
  const statusSummary = useMemo(() => {
    const summary = {};
    
    statusPengirimanOptions.forEach(status => {
      summary[status] = monitoringLaporanData.filter(r => r.statusPengiriman === status).length;
    });
    
    return summary;
  }, []);

  const resetFilters = () => {
    setFilters({
      status: 'all',
      subFilters: {
        jenisLJK: 'all',
        periodeLaporan: 'all',
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
        jenisLJK: 'all',
        periodeLaporan: 'all',
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

  const getStatusPengirimanBadge = (status) => {
    if (status === 'Berhasil') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    }
  };

  const getStatusKetepatanBadge = (status) => {
    if (status === 'Tepat Waktu') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    }
  };

  const getPeriodeBadge = (periode) => {
    const colors = {
      'Semesteran': 'bg-purple-100 text-purple-800 border-purple-200',
      'Bulanan': 'bg-blue-100 text-blue-800 border-blue-200',
      'Tahunan': 'bg-green-100 text-green-800 border-green-200',
      'Insidentil': 'bg-gray-100 text-gray-800 border-gray-200',
      'Triwulanan': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'setiap perubahan': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[periode] || 'bg-gray-100'}`}>
        <Calendar className="w-3 h-3 mr-1" />
        {periode}
      </span>
    );
  };

  const getJenisLKJBadge = (jenis) => {
    const colorMap = {
      'PEE': 'bg-red-100 text-red-800 border-red-200',
      'PPE AB, PPE Non AB': 'bg-blue-100 text-blue-800 border-blue-200',
      'PEE, PPE AB, PPE Non AB': 'bg-purple-100 text-purple-800 border-purple-200',
      'PEE, PPE AB': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'PPE AB': 'bg-pink-100 text-pink-800 border-pink-200',
      'PPE AB, PPE Non AB, BANK, PPU': 'bg-teal-100 text-teal-800 border-teal-200',
      'APEI': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Dana Pensiun': 'bg-orange-100 text-orange-800 border-orange-200',
      'Perusahaan Penjaminan': 'bg-amber-100 text-amber-800 border-amber-200',
      'Asuransi Jiwa': 'bg-rose-100 text-rose-800 border-rose-200',
      'Asuransi Umum': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      'Reasuransi': 'bg-violet-100 text-violet-800 border-violet-200',
      'Asuransi Jiwa Syariah/UUS': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Asuransi Umum Syariah/UUS': 'bg-lime-100 text-lime-800 border-lime-200',
      'Reasuransi Syariah/UUS': 'bg-sky-100 text-sky-800 border-sky-200',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorMap[jenis] || defaultStyle}`}>
        {jenis.length > 30 ? `${jenis.substring(0, 28)}...` : jenis}
      </span>
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredReports.map(report => ({
      'No': report.id,
      'Aplikasi': report.aplikasi,
      'Jenis LJK': report.jenisLJK,
      'Nama Laporan': report.namaLaporan,
      'Periode Laporan': report.periodeLaporan,
      'Batas Waktu': report.batasWaktu,
      'Status Pengiriman': report.statusPengiriman,
      'Status Ketepatan': report.statusKetepatan
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-laporan-${new Date().toISOString().split('T')[0]}.csv`;
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
            <FileCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Monitoring Laporan E-Reporting</h1>
            <p className="text-gray-600 mt-1">Pemantauan Pengiriman Laporan Elektronik OJK</p>
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
            onClick={() => window.location.reload()}
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
                <p className="text-2xl font-bold text-red-900">{stats.totalLaporan}</p>
                <p className="text-sm text-gray-600 font-medium">Total Laporan</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50/50 rounded-xl p-5 border border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-sm">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.berhasil}</p>
                <p className="text-sm text-gray-600 font-medium">Berhasil</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.tidakBerhasil}</p>
                <p className="text-sm text-gray-600 font-medium">Tidak Berhasil</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-teal-50/50 rounded-xl p-5 border border-teal-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-900">{stats.tepatWaktu}</p>
                <p className="text-sm text-gray-600 font-medium">Tepat Waktu</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-xl p-5 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg shadow-sm">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-900">{stats.terlambat}</p>
                <p className="text-sm text-gray-600 font-medium">Terlambat</p>
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
                  <h3 className="text-lg font-bold text-red-900">Filter 2-Tingkat Monitoring Laporan</h3>
                  <p className="text-sm text-gray-600">Pilih status pengiriman terlebih dahulu, lalu filter lainnya</p>
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
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 1: Pilih Status Pengiriman</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                      <div className="text-sm text-gray-600">{monitoringLaporanData.length} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'all' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('Berhasil')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'Berhasil' 
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
                      <div className="text-sm text-gray-600">{statusSummary.Berhasil || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'Berhasil' && <ChevronDown className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  onClick={() => handleStatusChange('Tidak Berhasil')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'Tidak Berhasil' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Tidak Berhasil</div>
                      <div className="text-sm text-gray-600">{statusSummary['Tidak Berhasil'] || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'Tidak Berhasil' && <ChevronDown className="w-5 h-5 text-red-500" />}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Jenis LJK
                        <span className="ml-1 text-xs text-gray-500">
                          ({uniqueJenisLJK.length} tersedia)
                        </span>
                      </label>
                      <select
                        value={filters.subFilters.jenisLJK}
                        onChange={(e) => handleSubFilterChange('jenisLJK', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                        disabled={uniqueJenisLJK.length === 0}
                      >
                        <option value="all">
                          {uniqueJenisLJK.length === 0 ? 'Tidak tersedia' : 'Semua Jenis LJK'}
                        </option>
                        {uniqueJenisLJK.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Periode Laporan
                        <span className="ml-1 text-xs text-gray-500">
                          ({uniquePeriode.length} tersedia)
                        </span>
                      </label>
                      <select
                        value={filters.subFilters.periodeLaporan}
                        onChange={(e) => handleSubFilterChange('periodeLaporan', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
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
                        <Search className="w-4 h-4 inline mr-2" />
                        Cari Laporan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Cari nama laporan, jenis LJK, atau batas waktu..."
                          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
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
                          Status: {filters.status}
                          <button 
                            onClick={() => handleStatusChange('all')}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.jenisLJK !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          LJK: {filters.subFilters.jenisLJK.length > 20 ? `${filters.subFilters.jenisLJK.substring(0, 18)}...` : filters.subFilters.jenisLJK}
                          <button 
                            onClick={() => handleSubFilterChange('jenisLJK', 'all')}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.periodeLaporan !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Periode: {filters.subFilters.periodeLaporan}
                          <button 
                            onClick={() => handleSubFilterChange('periodeLaporan', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
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
                  <BarChart3 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Daftar Monitoring Laporan</h3>
                  <p className="text-sm text-gray-600">Total {filteredReports.length} laporan ditemukan</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredReports.length} dari {monitoringLaporanData.length} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aplikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Periode Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Batas Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Pengiriman</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Ketepatan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-red-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-blue-50 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-blue-700">{report.aplikasi}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {getJenisLKJBadge(report.jenisLJK)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md">
                        {report.namaLaporan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPeriodeBadge(report.periodeLaporan)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        {report.batasWaktu}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusPengirimanBadge(report.statusPengiriman)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusKetepatanBadge(report.statusKetepatan)}
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
                        {report.statusPengiriman === 'Berhasil' && (
                          <button
                            onClick={() => alert(`Download laporan ${report.namaLaporan}`)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900">Detail Monitoring Laporan</h3>
                    <p className="text-gray-600">ID: {selectedReport.id}</p>
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">ID Laporan</h4>
                  <p className="text-lg font-bold text-red-700">#{selectedReport.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  <p className="text-lg font-bold text-blue-700">{selectedReport.aplikasi}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Laporan</h4>
                  <div className="mt-1">{getPeriodeBadge(selectedReport.periodeLaporan)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  <div className="mt-1">{getStatusPengirimanBadge(selectedReport.statusPengiriman)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Ketepatan Waktu</h4>
                  <div className="mt-1">{getStatusKetepatanBadge(selectedReport.statusKetepatan)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis LJK</h4>
                  <div className="mt-1">{getJenisLKJBadge(selectedReport.jenisLJK)}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                <p className="text-lg font-medium text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedReport.namaLaporan}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Batas Waktu Penyampaian</h4>
                <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <Clock className="w-4 h-4 inline mr-2 text-yellow-600" />
                  {selectedReport.batasWaktu}
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => alert(`Download laporan ${selectedReport.namaLaporan}`)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Download Laporan
                </button>
                <button
                  onClick={() => alert(`Melihat riwayat ${selectedReport.namaLaporan}`)}
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Lihat Riwayat
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