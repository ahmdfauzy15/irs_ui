import React, { useState, useMemo } from 'react';
import { 
  Gavel, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  AlertTriangle
} from 'lucide-react';

// Data reports diletakkan di luar component untuk konsistensi
const REPORTS_DATA = [
  { id: 1, jenis: "Laporan Sanksi Administratif", jenisValue: "sanksi", periode: "Semester I 2023", tanggal: "15 Juli 2023", deadline: "31 Juli 2023", status: "berhasil", priority: "high" },
  { id: 2, jenis: "Laporan Nasabah Asing", jenisValue: "nasabah", periode: "Q2 2023", tanggal: "10 Juli 2023", deadline: "15 Juli 2023", status: "terlambat", priority: "high" },
  { id: 3, jenis: "Laporan Khusus DJK", jenisValue: "khusus", periode: "Maret 2023", tanggal: "5 April 2023", deadline: "10 April 2023", status: "berhasil", priority: "medium" },
  { id: 4, jenis: "Laporan Triwulanan", jenisValue: "triwulan", periode: "Januari - Maret 2023", tanggal: "10 April 2023", deadline: "20 April 2023", status: "tidak-berhasil", priority: "high" },
];

const SIPINA = () => {
  const [filters, setFilters] = useState({
    jenis: 'all',
    status: 'all',
    priority: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Gunakan useMemo untuk menghitung filteredReports secara reactive
  const filteredReports = useMemo(() => {
    return REPORTS_DATA.filter(report => {
      // Filter berdasarkan jenis
      if (filters.jenis !== 'all' && report.jenisValue !== filters.jenis) {
        return false;
      }
      
      // Filter berdasarkan status
      if (filters.status !== 'all' && report.status !== filters.status) {
        return false;
      }
      
      // Filter berdasarkan priority
      if (filters.priority !== 'all' && report.priority !== filters.priority) {
        return false;
      }
      
      // Filter berdasarkan search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!report.jenis.toLowerCase().includes(term) &&
            !report.periode.toLowerCase().includes(term)) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters, searchTerm]);

  // Hitung stats dari data asli (REPORTS_DATA)
  const stats = useMemo(() => ({
    total: REPORTS_DATA.length,
    berhasil: REPORTS_DATA.filter(r => r.status === 'berhasil').length,
    terlambat: REPORTS_DATA.filter(r => r.status === 'terlambat').length,
    tidakBerhasil: REPORTS_DATA.filter(r => r.status === 'tidak-berhasil').length,
    highPriority: REPORTS_DATA.filter(r => r.priority === 'high').length,
  }), []);

  const resetFilters = () => {
    setFilters({ jenis: 'all', status: 'all', priority: 'all' });
    setSearchTerm('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      berhasil: 'bg-green-100 text-green-800 border-green-200',
      terlambat: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'tidak-berhasil': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      berhasil: 'Berhasil',
      terlambat: 'Terlambat',
      'tidak-berhasil': 'Tidak Berhasil',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200',
    };

    const labels = {
      high: 'Tinggi',
      medium: 'Sedang',
      low: 'Rendah',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan SIPINA</h1>
            <p className="text-gray-600">Kelola semua laporan sistem SIPINA di sini</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">3 Hari Deadline</span>
          </div>
          <button 
            onClick={() => alert('Data laporan SIPINA berhasil diekspor ke format CSV')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              <p className="text-sm text-gray-500">Prioritas Tinggi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Filter Laporan</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Laporan
              </label>
              <select
                value={filters.jenis}
                onChange={(e) => setFilters(prev => ({ ...prev, jenis: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Jenis</option>
                <option value="sanksi">Sanksi Administratif</option>
                <option value="nasabah">Nasabah Asing</option>
                <option value="triwulan">Triwulanan</option>
                <option value="khusus">Khusus DJK</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="berhasil">Berhasil</option>
                <option value="terlambat">Terlambat</option>
                <option value="tidak-berhasil">Tidak Berhasil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioritas
              </label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Prioritas</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Laporan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Laporan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Submit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioritas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.jenis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.periode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.tanggal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(report.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data laporan</h3>
            <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Menampilkan {filteredReports.length} dari {REPORTS_DATA.length} laporan
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

export default SIPINA;