import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  BarChart3
} from 'lucide-react';
import FilterSection from '../components/reports/FilterSection';
import ReportTable from '../components/reports/ReportTable';
import { apoloReportsData } from '../data/reportsData';

const ApoloReports = () => {
  // Data reports statis
  const reports = apoloReportsData;
  
  // State untuk filter dan search
  const [filters, setFilters] = useState({
    jenis: 'all',
    status: 'all',
    periode: 'all',
    tanggal: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Hitung filteredReports secara reactive menggunakan useMemo
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // Apply jenis filter
    if (filters.jenis !== 'all') {
      filtered = filtered.filter(report => report.jenisValue === filters.jenis);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    // Apply periode filter
    if (filters.periode !== 'all') {
      filtered = filtered.filter(report => report.periodeValue === filters.periode);
    }

    // Apply tanggal filter (simplified)
    if (filters.tanggal) {
      const filterDate = new Date(filters.tanggal);
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
        report.tanggal.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reports]);

  // Hitung stats menggunakan useMemo untuk optimasi
  const stats = useMemo(() => ({
    total: reports.length,
    berhasil: reports.filter(r => r.status === 'berhasil').length,
    terlambat: reports.filter(r => r.status === 'terlambat').length,
    tidakBerhasil: reports.filter(r => r.status === 'tidak-berhasil').length,
  }), [reports]);

  const resetFilters = () => {
    setFilters({
      jenis: 'all',
      status: 'all',
      periode: 'all',
      tanggal: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan APOLO</h1>
            <p className="text-gray-600">Kelola semua laporan sistem APOLO di sini</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => alert('Data laporan APOLO berhasil diekspor ke format CSV')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Laporan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.berhasil}</p>
              <p className="text-sm text-gray-500">Berhasil</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.terlambat}</p>
              <p className="text-sm text-gray-500">Terlambat</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.tidakBerhasil}</p>
              <p className="text-sm text-gray-500">Tidak Berhasil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <FilterSection 
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onReset={resetFilters}
      />

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ReportTable reports={filteredReports} />
        
        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Menampilkan {filteredReports.length} dari {reports.length} laporan
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                ←
              </button>
              <button className="w-8 h-8 bg-blue-600 text-white rounded-lg text-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-200 text-sm">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-200 text-sm">
                3
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApoloReports;