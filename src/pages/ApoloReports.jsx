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
  Shield,
  Building,
  FileCheck
} from 'lucide-react';

const ApoloReports = () => {
  // Data reports dari Excel
  const reports = [
    // Data dari baris 1-39 (BU - Berhasil)
    ...Array.from({ length: 39 }, (_, i) => ({
      id: i + 1,
      aplikasi: 'APOLO',
      jenisLJK: 'BU',
      namaLaporan: [
        'LCR Individual',
        'LCR Konsolidasi',
        'NSFR Individual',
        'NSFR Konsolidasi',
        'Rencana Tindak Pemenuhan NSFR Individual',
        'Rencana Tindak Pemenuhan NSFR Konsolidasi',
        'KPMM/ATMR Individual',
        'KPMM/ATMR Konsolidasi',
        'SBDK',
        'BMPK/BMPD - Individu (BUK/UUS/BUS)',
        'Publikasi Bulanan BUK/BUS',
        'Publikasi Triwulanan BUK/BUS',
        'Laporan Kualitas Aset dan Pembentukan PPA (Konsol)',
        'Tax Amnesty',
        'Manajemen Risiko BUS (Konsolidasi) (tidak dilaporkan lagi)',
        'Condensed Report-(BUK/BUS)',
        'Condensed Report-(BUK/UUS/BUS)',
        'Jaringan Kantor (BUK/BUS)',
        'Restrukturisasi Kredit/Pembiayaan (BUK/UUS/BUS)',
        'Rasio Pengungkit (BUK)',
        'BPMK Konsolidasi (BUK)',
        'RBB BUK/BUS/UUS',
        'Kegitan Bank Kustodian (BUS/BUK',
        'Kegiatan Agen Penjualan Efek Reksadana (BUS)',
        'Bancasurance (BUK/BUS)',
        'Realisasi RBB (BUS/UUS)',
        'Pengawasan RBB (BUS)',
        'Laporan Outstanding Transaksi Structured Produk (BUK)',
        'Laporan Rutin Aktivitas Keagenan Produk Keuangan Luar Negeri (BUK)',
        'Laporan Sensitivity to Market Risk – Suku Bunga',
        'Laporan Kewajiban Pemenuhan Modal Minimum (KPMM) ATMR Risiko Operasional',
        'Laku Pandai (BUS/BUK)',
        'Laporan Penerapan Strategi Anti Fraud',
        'Laporan Fraud Berdampak Signifikan',
        'Laporan Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme (APU PPT) Bank Umum',
        'Laporan Publikasi Suku Bunga Dasar Kredit BUK',
        'Laporan pemantauan debitur hapus buku terbesar BUK',
        'Laporan tindak lanjut 15 (lima belas) debitur non performing loans terbesar BUK',
        'Laporan SDM Perbankan Indonesia'
      ][i],
      periodeLaporan: [
        'Bulanan', 'Bulanan', 'Triwulanan', 'Triwulanan', 'Insidentil Bulanan', 'Insidentil Bulanan',
        'Bulanan', 'Bulanan', 'Bulanan', 'Bulanan', 'Bulanan kecuali periode triwulanan tdk wajib',
        'Triwulanan', 'Triwulanan', 'Mingguan', 'Triwulanan', 'Harian', 'Bulanan', 'Bulanan', 'Bulanan',
        'Triwulanan', 'Triwulanan', 'Tahunan', 'Bulanan', 'triwulanan', 'Triwulanan', 'Triwulanan',
        'Semesteran', 'Bulanan', 'Bulanan', 'Triwulanan', 'Tahunan', 'Triwulanan', 'Semesteran',
        'Insidentil', 'Semesteran', 'Bulanan', 'Bulanan', 'Bulanan', '- Bulanan<br>- Semesteran'
      ][i],
      batasWaktu: [
        '15 bulan berikutnya', 'akhir bulan berikutnya', '15 bulan berikutnya', 'akhir bulan berikutnya',
        'akhir bulan berikutnya', 'akhir bulan berikutnya', '7 bulan berikutnya', '21 bulan berikutnya',
        '7 bulan berikutnya', '15 bulan berikutnya', 'akhir bulan berikutnya',
        '15 bulan kedua, kecuali Des disampaikan di akhir Maret', '15 bulan kedua', 'Selasa',
        '15 bulan kedua', '2 hari berikutnya', '7 bulan berikutnya', '7 bulan berikutnya',
        '7 bulan berikutnya', '7 dan 21 bulan berikutnya', 'Akhir bulan berikutnya', 'tanggal 30 November',
        '7 bulan berikutnya', 'tanggal 15 bulan berikutnya', 'tanggal 15 bulan berikutnya',
        'Akhir bulan berikutnya', 'Akhir 2 bulan berikutnya', '7 bulan berikutnya',
        'tanggal 15 bulan berikutnya', 'tanggal 15 bulan berikutnya',
        'Tanggal 31 Januari pada Tahun Pelaporan', 'Tanggal 15 bulan berikutnya', '',
        '', 'Akhir bulan Februari dan Agustus', 'Tanggal 7 bulan berikutnya',
        'Tanggal 7 bulan berikutnya', 'Tanggal 7 bulan berikutnya',
        '- Tanggal 15 bulan berikutnya<br>- Tanggal 31 bulan berikutnya'
      ][i],
      statusPengiriman: 'Berhasil',
      statusKetepatanWaktu: 'Tepat Waktu',
      status: 'berhasil'
    })),
    
    // Data dari baris 40-44 (BPR / BPRS - Berhasil)
    ...Array.from({ length: 5 }, (_, i) => ({
      id: 40 + i,
      aplikasi: 'APOLO',
      jenisLJK: 'BPR / BPRS',
      namaLaporan: [
        'Laporan Bulanan BPR/BPRS<br>- Rutin<br>- Koreksi atas inisiatif LJK tanpa denda<br>- Koreksi atas permintaan pengawas',
        'RBB BPR/BPRS<br>- Rutin<br>- Koreksi atas inisiatif LJK tanpa denda<br>- Koreksi atas permintaan pengawas',
        'Pelaksanaan dan pengawasan RBB BPR/BPRS',
        'Profil Risiko BPR/BPRS',
        'Profil Risiko BPR/BPRS'
      ][i],
      periodeLaporan: ['Bulanan', 'Tahunan', 'Semesteran', 'Semesteran', 'Tahunan'][i],
      batasWaktu: [
        '<br>- Tanggal 10 bulan berikutnya<br>- Tanggal 11 - 15 bulan berikutnya<br>- 10 hari setelah tanggal surat pengawas',
        '<br>- Tanggal 15 Desember<br>- Tanggal 30 Juni<br>- 30 hari setelah tanggal surat pengawas',
        'Tanggal 31 bulan berikutnya',
        'Tanggal 31 bulan berikutnya',
        'Tanggal 31 bulan berikutnya'
      ][i],
      statusPengiriman: 'Berhasil',
      statusKetepatanWaktu: 'Tepat Waktu',
      status: 'berhasil'
    })),
    
    // Data dari baris 45-55 (Bank Kustodian - Tidak Berhasil)
    ...Array.from({ length: 11 }, (_, i) => ({
      id: 45 + i,
      aplikasi: 'APOLO',
      jenisLJK: 'Bank Kustodian',
      namaLaporan: [
        'Laporan Aktivitas Bank Kustodian: Penyelesaian Transaksi Bank Kustodian',
        'Laporan Aktivitas Bank Kustodian: Nilai Asset Under Custody',
        'Laporan Hasil Pemeriksaan Operasional Akuntan Publik',
        'Laporan pemenuhan Prinsip Syariah di Pasar Modal',
        'Laporan rencana kegiatan pengkinian data APU PPT',
        'Laporan realisasi pengkinian data APU PPT',
        'Kueisioner Penilaian Risiko TPPU dan TPPT Bank Kustodian',
        'action plan penerapan program APU dan PPT',
        'Laporan penyesuaian kebijakan dan prosedur penerapan program APU dan PPT',
        'Laporan perubahan atas action plan',
        'Laporan perubahan pejabat penanggung Jawab'
      ][i],
      periodeLaporan: [
        'Bulanan', 'Bulanan', 'Tahunan', 'Tahunan', 'Tahunan', 'Tahunan', 'Tahunan', 'Insidentil',
        'Insidentil', 'Insidentil', 'Insidentil'
      ][i],
      batasWaktu: [
        '12 H pada bulan berikutnya',
        '12 H pada bulan berikutnya',
        '90 H setelah laporan tahunan berakhir',
        'mengikuti batas LK/LKT',
        'Akhir bulan Desember',
        'Akhir bulan Desember',
        '7/28/2023',
        '5/31/2023',
        '7 HK setelah perubahan',
        '7 HK setelah perubahan',
        'untuk kebutuhan internal dan catatan tambahan pegawas'
      ][i],
      statusPengiriman: 'Tidak Berhasil',
      statusKetepatanWaktu: 'Terlambat',
      status: 'tidak-berhasil'
    })),
    
    // Data sisanya (Tidak Berhasil) - disederhanakan untuk contoh
    ...Array.from({ length: 106 }, (_, i) => ({
      id: 56 + i,
      aplikasi: 'APOLO',
      jenisLJK: [
        'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Biro Administrasi Efek',
        'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Biro Administrasi Efek',
        'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Biro Administrasi Efek', 'Perusahaan Pemeringkat Efek',
        'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek',
        'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek',
        'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek',
        'Perusahaan Pemeringkat Efek', 'Perusahaan Pemeringkat Efek', 'Wali Amanat', 'Wali Amanat',
        'Wali Amanat', 'Wali Amanat', 'Wali Amanat', 'Wali Amanat', 'Konsultan Hukum', 'Notaris', 'Penilai',
        'Akuntan Publik/Kantor Akuntan Publik', 'Bank Kustodian', 'Ahli Syariah Pasar Modal (ASPM)',
        'Asuransi Jiwa', 'Asuransi Jiwa', 'Asuransi Jiwa', 'Asuransi Umum', 'Asuransi Umum', 'Asuransi Umum',
        'Reasuransi', 'Asuransi Jiwa Syariah/UUS', 'Asuransi Jiwa Syariah/UUS', 'Asuransi Jiwa Syariah/UUS',
        'Asuransi Jiwa Syariah/UUS', 'Asuransi Jiwa Syariah/UUS', 'Asuransi Jiwa Syariah/UUS',
        'Asuransi Jiwa Syariah/UUS', 'Asuransi Umum Syariah/UUS', 'Asuransi Umum Syariah/UUS',
        'Asuransi Umum Syariah/UUS', 'Asuransi Umum Syariah/UUS', 'Asuransi Umum Syariah/UUS',
        'Asuransi Umum Syariah/UUS', 'Reasuransi Syariah/UUS', 'Reasuransi Syariah/UUS',
        'Reasuransi Syariah/UUS', 'Reasuransi Syariah/UUS', 'PPI, UUS PPI', 'PP,PPS,UUS', 'PP,PPS,UUS',
        'PMV,PMVS, UUS', 'PMV,PMVS, UUS', 'PP,PPS,UUS', 'PP,PPS,UUS', 'PP,PPS,UUS', 'PMV,PMVS,UUS',
        'PMV,PMVS, UUS', 'PMV,PMVS, UUS', 'PP,PPS,UUS', 'PP,PPS,UUS', 'PP, PMV (termasuk syariah dan UUS)',
        'PP, PMV (termasuk syariah dan UUS)', 'PP, PMV (termasuk syariah dan UUS)',
        'Lembaga Pembiayaan, P2P, LKK', 'Lembaga Pembiayaan, P2P,LKK', 'BP Tapera', 'PT PNM, UUS',
        'LKM, LKMS', 'P2PL, P2PL Syariah', 'PT Pegadaian', 'PT Pegadaian, Pergadaian Swasta, <br>Pergadaian Swasta Syariah',
        'PT Pegadaian, Pergadaian Swasta, <br>Pergadaian Swasta Syariah',
        'PT Pegadaian, Pergadaian Swasta, <br>Pergadaian Swasta Syariah', 'BU', 'BU, BPR/BPRS',
        'BU, BPR/BPRS', 'Pergadaian Swasta, <br>Pergadaian Swasta Syariah', 'PMV, PMVS',
        'Pergadaian Swasta, <br>Pergadaian Swasta Syariah', 'PMV,PMVS, UUS'
      ][i],
      namaLaporan: `Laporan ${56 + i} - ${[
        'Biro Administrasi Efek', 'Perusahaan Pemeringkat Efek', 'Wali Amanat', 'Konsultan Hukum',
        'Notaris', 'Penilai', 'Akuntan Publik', 'Asuransi', 'PP/PPS/UUS', 'PMV/PMVS', 'Lembaga Pembiayaan'
      ][Math.floor(i / 10)]}`,
      periodeLaporan: ['Bulanan', 'Triwulanan', 'Tahunan', 'Semesteran', 'Insidentil'][i % 5],
      batasWaktu: 'Tanggal deadline sesuai ketentuan',
      statusPengiriman: i >= 95 ? 'Berhasil' : 'Tidak Berhasil', // Baris 139, 141, 143, 145, 147, 149 berhasil
      statusKetepatanWaktu: i >= 95 ? 'Tepat Waktu' : 'Terlambat',
      status: i >= 95 ? 'berhasil' : 'tidak-berhasil'
    }))
  ];
  
  // State untuk filter 2 tingkat
  const [filters, setFilters] = useState({
    status: 'all',
    subFilters: {
      jenisLJK: 'all',
      periode: 'all',
      searchTerm: ''
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(false);

  // Hitung filteredReports secara reactive
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // Level 1: Filter berdasarkan status
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }
    
    // Level 2: Filter sub-filters
    if (filters.subFilters.jenisLJK !== 'all') {
      filtered = filtered.filter(report => report.jenisLJK === filters.subFilters.jenisLJK);
    }

    if (filters.subFilters.periode !== 'all') {
      filtered = filtered.filter(report => {
        const periode = report.periodeLaporan.toLowerCase();
        const filterPeriode = filters.subFilters.periode.toLowerCase();
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
    let filteredData = reports;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.status === filters.status);
    }
    
    const jenisLJK = [...new Set(filteredData.map(report => report.jenisLJK))];
    return jenisLJK.map(j => ({
      value: j,
      label: j
    }));
  }, [filters.status]);

  // Get unique periode berdasarkan status yang dipilih
  const uniquePeriode = useMemo(() => {
    let filteredData = reports;
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(report => report.status === filters.status);
    }
    
    const periode = [...new Set(filteredData.map(report => report.periodeLaporan.split('<br>')[0].trim()))];
    return periode.map(p => ({
      value: p,
      label: p
    }));
  }, [filters.status]);

  // Hitung stats
  const stats = useMemo(() => ({
    total: reports.length,
    berhasil: reports.filter(r => r.statusPengiriman === 'Berhasil').length,
    terlambat: reports.filter(r => r.statusKetepatanWaktu === 'Terlambat').length,
    tidakBerhasil: reports.filter(r => r.statusPengiriman === 'Tidak Berhasil').length,
  }), [reports]);

  // Status summary untuk filter level 1
  const statusSummary = useMemo(() => {
    const summary = {};
    const allStatus = ['berhasil', 'tidak-berhasil'];
    
    allStatus.forEach(status => {
      summary[status] = reports.filter(r => r.status === status).length;
    });
    
    return summary;
  }, [reports]);

  const resetFilters = () => {
    setFilters({
      status: 'all',
      subFilters: {
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: ''
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
        periode: 'all',
        searchTerm: ''
      }
    }));
    
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
      'tidak-berhasil': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'berhasil': 'Berhasil',
      'tidak-berhasil': 'Tidak Berhasil',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getKetepatanBadge = (status) => {
    if (status === 'Tepat Waktu') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Tepat Waktu</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Terlambat</span>;
    }
  };

  const getJenisLKJBadge = (jenis) => {
    const colorMap = {
      'BU': 'bg-red-100 text-red-800 border-red-200',
      'BPR / BPRS': 'bg-blue-100 text-blue-800 border-blue-200',
      'Bank Kustodian': 'bg-purple-100 text-purple-800 border-purple-200',
      'Biro Administrasi Efek': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Perusahaan Pemeringkat Efek': 'bg-pink-100 text-pink-800 border-pink-200',
      'Wali Amanat': 'bg-teal-100 text-teal-800 border-teal-200',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[jenis] || defaultStyle}`}>
        {jenis}
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
      'Nama Laporan': report.namaLaporan.replace(/<br>/g, '\n'),
      'Periode Laporan': report.periodeLaporan.replace(/<br>/g, '\n'),
      'Batas Waktu': report.batasWaktu.replace(/<br>/g, '\n'),
      'Status Pengiriman': report.statusPengiriman,
      'Status Ketepatan Waktu': report.statusKetepatanWaktu
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
      ...data.map(row => headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    return csv;
  };

  // Clean HTML breaks for display
  const cleanHTML = (text) => {
    if (!text) return '';
    return text.replace(/<br>/g, '\n');
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
            <p className="text-gray-600 mt-1">Monitoring Laporan APOLO - Total {reports.length} Laporan</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <h3 className="text-lg font-bold text-red-900">Filter Laporan APOLO</h3>
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
                  onClick={() => handleStatusChange('tidak-berhasil')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.status === 'tidak-berhasil' 
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
                      <div className="text-sm text-gray-600">{statusSummary['tidak-berhasil'] || 0} laporan</div>
                    </div>
                  </div>
                  {filters.status === 'tidak-berhasil' && <ChevronDown className="w-5 h-5 text-red-500" />}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
                        <Search className="w-4 h-4 inline mr-2" />
                        Cari Laporan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Cari nama laporan..."
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
                          Status: {filters.status === 'berhasil' ? 'Berhasil' : 'Tidak Berhasil'}
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
                          LJK: {filters.subFilters.jenisLJK}
                          <button 
                            onClick={() => handleSubFilterChange('jenisLJK', 'all')}
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
                  <tr key={report.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-red-50 rounded-lg">
                          <FileCheck className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-sm font-bold text-red-700">{report.aplikasi}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJenisLKJBadge(report.jenisLJK)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md">
                        {cleanHTML(report.namaLaporan).split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        {cleanHTML(report.periodeLaporan).split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        {cleanHTML(report.batasWaktu).split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getKetepatanBadge(report.statusKetepatanWaktu)}
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
                            onClick={() => alert(`Download laporan ${report.namaLaporan}`)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download laporan"
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
                <span className="text-sm text-gray-600">
                  Halaman 1 dari {Math.ceil(filteredReports.length / 10)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan APOLO</h3>
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  <p className="text-lg font-bold text-red-700">{selectedReport.aplikasi}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis LJK</h4>
                  {getJenisLKJBadge(selectedReport.jenisLJK)}
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {cleanHTML(selectedReport.namaLaporan).split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Laporan</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {cleanHTML(selectedReport.periodeLaporan).split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Batas Waktu Penyampaian</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {cleanHTML(selectedReport.batasWaktu).split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Ketepatan Waktu</h4>
                  {getKetepatanBadge(selectedReport.statusKetepatanWaktu)}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                {selectedReport.status === 'berhasil' && (
                  <button
                    onClick={() => alert(`Download laporan ${selectedReport.namaLaporan}`)}
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Download Laporan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApoloReports;