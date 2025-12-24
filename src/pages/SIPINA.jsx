import React, { useState, useMemo, useEffect } from 'react';
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
  RefreshCw,
  Shield,
  Building,
  FileCheck,
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  ClockAlert,
  Calendar as CalendarIcon,
  Gavel
} from 'lucide-react';

// Helper function untuk nama bulan - didefinisikan di luar komponen
const getMonthName = (month) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return months[month - 1] || '';
};

const SIPINA = () => {
  // Fungsi untuk mendapatkan waktu saat ini di WIB (UTC+7)
  const getCurrentWIBTime = () => {
    const now = new Date();
    const wibOffset = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
    const wibTime = new Date(now.getTime() + wibOffset);
    return wibTime;
  };

  // State untuk waktu real-time
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [reportsWithPeriod, setReportsWithPeriod] = useState([]);
  
  // State untuk periode tanggal - default bulan berjalan
  const [dateRange, setDateRange] = useState(() => {
    const currentDate = getCurrentWIBTime();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 1-indexed
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    return {
      startDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`,
      endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${lastDay}`
    };
  });
  
  // State untuk filter
  const [filters, setFilters] = useState({
    periodeStatus: 'aktif',
    subFilters: {
      statusDetail: 'all',
      jenisLJK: 'all',
      periode: 'all',
      searchTerm: ''
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(true);

  // Update waktu real-time WIB setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Data reports SiPINA dengan tanggal real-time
  const initialReports = useMemo(() => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1; // 1-indexed
    
    return [
      { 
        id: 1, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Jiwa", 
        namaLaporan: "Laporan Tahunan - Penyampaian Informasi Nasabah Asing", 
        periodeLaporan: "Tahunan", 
        batasWaktu: "1 Juli s.d 1 Agustus Tahun berikutnya", 
        deadlineDate: `${currentYear}-08-01T23:59:59`,
        submissionDate: `${currentYear}-07-15T14:30:00`,
        waktuSubmit: `${currentYear}-07-15T14:30:00`,
        waktuDeadline: `${currentYear}-08-01T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu",
        tanggal: "15 Juli 2024",
        priority: "high",
        deskripsi: "Laporan penyampaian informasi nasabah asing tahunan untuk Asuransi Jiwa",
        namaFile: "laporan_tahunan_nasabah_asing_2023.pdf",
        ukuran: "3.2 MB"
      },
      { 
        id: 2, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Jiwa", 
        namaLaporan: "Laporan Tahunan 2 - Penyampaian Informasi Nasabah Asing", 
        periodeLaporan: "Tahunan", 
        batasWaktu: "1 Juli s.d 1 Agustus Tahun berikutnya", 
        deadlineDate: `${currentYear}-08-01T23:59:59`,
        submissionDate: `${currentYear}-08-10T10:15:00`,
        waktuSubmit: `${currentYear}-08-10T10:15:00`,
        waktuDeadline: `${currentYear}-08-01T23:59:59`,
        statusPengiriman: "Tidak Berhasil",
        statusKetepatan: "Terlambat",
        tanggal: "10 Agustus 2024",
        priority: "high",
        deskripsi: "Laporan penyampaian informasi nasabah asing tahunan (pengiriman kedua)",
        namaFile: "laporan_tahunan2_nasabah_asing_2023.pdf",
        ukuran: "3.5 MB"
      },
      { 
        id: 3, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Jiwa", 
        namaLaporan: "Laporan Triwulan I - Asuransi Jiwa", 
        periodeLaporan: "Triwulanan", 
        batasWaktu: "30 April tahun berjalan", 
        deadlineDate: `${currentYear}-04-30T23:59:59`,
        submissionDate: `${currentYear}-04-28T09:45:00`,
        waktuSubmit: `${currentYear}-04-28T09:45:00`,
        waktuDeadline: `${currentYear}-04-30T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu",
        tanggal: "28 April 2024",
        priority: "medium",
        deskripsi: "Laporan triwulan pertama untuk Asuransi Jiwa",
        namaFile: "laporan_triwulan1_asuransi_jiwa_2024.pdf",
        ukuran: "2.8 MB"
      },
      { 
        id: 4, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Umum", 
        namaLaporan: "Laporan Semester I - Asuransi Umum", 
        periodeLaporan: "Semesteran", 
        batasWaktu: "31 Juli tahun berjalan", 
        deadlineDate: `${currentYear}-07-31T23:59:59`,
        submissionDate: `${currentYear}-07-30T16:20:00`,
        waktuSubmit: `${currentYear}-07-30T16:20:00`,
        waktuDeadline: `${currentYear}-07-31T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu",
        tanggal: "30 Juli 2024",
        priority: "medium",
        deskripsi: "Laporan semester pertama untuk Asuransi Umum",
        namaFile: "laporan_semester1_asuransi_umum_2024.pdf",
        ukuran: "3.1 MB"
      },
      { 
        id: 5, 
        aplikasi: "SiPina", 
        jenisLJK: "Reasuransi", 
        namaLaporan: "Laporan Bulanan - Reasuransi", 
        periodeLaporan: "Bulanan", 
        batasWaktu: "15 hari bulan berikutnya", 
        deadlineDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Akan Ditentukan",
        tanggal: `Belum submit`,
        priority: "high",
        deskripsi: "Laporan bulanan untuk Reasuransi",
        namaFile: "",
        ukuran: ""
      },
      { 
        id: 6, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Jiwa Syariah", 
        namaLaporan: "Laporan Tahunan - Asuransi Jiwa Syariah", 
        periodeLaporan: "Tahunan", 
        batasWaktu: "31 Maret tahun berikutnya", 
        deadlineDate: `${currentYear + 1}-03-31T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${currentYear + 1}-03-31T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Akan Ditentukan",
        tanggal: `Belum submit`,
        priority: "high",
        deskripsi: "Laporan tahunan untuk Asuransi Jiwa Syariah",
        namaFile: "",
        ukuran: ""
      },
      { 
        id: 7, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Umum", 
        namaLaporan: "Laporan Insidentil - Kejadian Luar Biasa", 
        periodeLaporan: "Insidentil", 
        batasWaktu: "24 jam setelah kejadian", 
        deadlineDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T23:59:59`,
        submissionDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T18:30:00`,
        waktuSubmit: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T18:30:00`,
        waktuDeadline: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu",
        tanggal: "5 " + getMonthName(currentMonth) + " 2024",
        priority: "high",
        deskripsi: "Laporan insidentil untuk kejadian luar biasa",
        namaFile: "laporan_insidentil_kejadian_2024.pdf",
        ukuran: "1.5 MB"
      },
      { 
        id: 8, 
        aplikasi: "SiPina", 
        jenisLJK: "Asuransi Jiwa", 
        namaLaporan: "Laporan Triwulan II - Asuransi Jiwa", 
        periodeLaporan: "Triwulanan", 
        batasWaktu: "31 Juli tahun berjalan", 
        deadlineDate: `${currentYear}-07-31T23:59:59`,
        submissionDate: `${currentYear}-08-02T11:20:00`,
        waktuSubmit: `${currentYear}-08-02T11:20:00`,
        waktuDeadline: `${currentYear}-07-31T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Terlambat",
        tanggal: "2 Agustus 2024",
        priority: "medium",
        deskripsi: "Laporan triwulan kedua untuk Asuransi Jiwa",
        namaFile: "laporan_triwulan2_asuransi_jiwa_2024.pdf",
        ukuran: "2.9 MB"
      }
    ];
  }, [currentDateTime]);

  // Proses data reports dengan tanggal dan hitung status
  useEffect(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    const now = currentDateTime;
    
    const updatedReports = initialReports.map(report => {
      const deadlineDate = new Date(report.deadlineDate);
      const submissionDate = report.submissionDate ? new Date(report.submissionDate) : null;
      
      // Cek apakah deadline dalam range tanggal yang dipilih
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      // Hitung apakah deadline sudah lewat
      const isDeadlinePassed = deadlineDate < now;
      
      // Tentukan periodeStatus berdasarkan aturan
      let periodeStatus = '';
      
      if (submissionDate) {
        // Sudah ada submission
        if (report.statusPengiriman === 'Tidak Berhasil') {
          // Status tidak berhasil
          periodeStatus = 'aktif';
        } else {
          const isSubmittedOnTime = submissionDate <= deadlineDate;
          if (isSubmittedOnTime) {
            // Berhasil dan tepat waktu -> masuk periode aktif
            periodeStatus = 'aktif';
          } else {
            // Berhasil tapi terlambat -> masuk terlambat
            periodeStatus = 'terlambat';
          }
        }
      } else {
        // Belum submit
        if (isDeadlinePassed) {
          periodeStatus = 'terlambat';
        } else {
          periodeStatus = 'aktif';
        }
      }
      
      // Tentukan status pengiriman dan ketepatan waktu
      let status = 'belum-lapor';
      let statusPengiriman = 'Belum Lapor';
      let statusKetepatanWaktu = 'Akan Ditentukan';
      
      if (submissionDate) {
        const isSubmittedOnTime = submissionDate <= deadlineDate;
        
        // Untuk data tidak berhasil
        if (report.statusPengiriman === 'Tidak Berhasil') {
          status = 'tidak-berhasil';
          statusPengiriman = 'Tidak Berhasil';
          statusKetepatanWaktu = 'Gagal Kirim';
        } else {
          status = 'berhasil';
          statusPengiriman = 'Berhasil';
          statusKetepatanWaktu = isSubmittedOnTime ? 'Tepat Waktu' : 'Terlambat';
        }
      } else {
        // Belum submit
        if (isDeadlinePassed) {
          statusKetepatanWaktu = 'Terlambat';
        } else {
          statusKetepatanWaktu = 'Akan Ditentukan';
        }
      }
      
      // Hitung waktu remaining atau terlambat
      const timeDiffMs = deadlineDate - now;
      let hoursRemaining = 0;
      let hoursLate = 0;
      
      if (timeDiffMs > 0) {
        // Masih ada waktu
        hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
      } else {
        // Sudah terlambat
        hoursLate = Math.floor(Math.abs(timeDiffMs) / (1000 * 60 * 60));
      }
      
      // Format tanggal untuk display dengan WIB
      const formatDateTime = (date) => {
        if (!date) return 'Belum ada';
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Jakarta'
        });
      };
      
      // Update tanggal display berdasarkan submission
      const displayTanggal = submissionDate ? formatDateTime(submissionDate) : 'Belum submit';
      
      return {
        ...report,
        deadlineDate: deadlineDate.toISOString(),
        submissionDate: submissionDate ? submissionDate.toISOString() : null,
        status,
        statusPengiriman,
        statusKetepatanWaktu,
        periodeStatus,
        isDeadlinePassed,
        hoursRemaining,
        hoursLate,
        displayDeadline: formatDateTime(deadlineDate),
        displaySubmit: submissionDate ? formatDateTime(submissionDate) : 'Belum submit',
        displayTanggal: displayTanggal,
        deadlineObj: deadlineDate,
        submitObj: submissionDate,
        waktuSubmit: submissionDate ? submissionDate.toISOString() : null,
        waktuDeadline: deadlineDate.toISOString()
      };
    }).filter(report => report !== null);
    
    setReportsWithPeriod(updatedReports);
  }, [dateRange, initialReports, currentDateTime]);

  // Hitung filteredReports berdasarkan filter
  const filteredReports = useMemo(() => {
    let filtered = [...reportsWithPeriod];

    // Filter berdasarkan periode status
    if (filters.periodeStatus !== 'all') {
      filtered = filtered.filter(report => report.periodeStatus === filters.periodeStatus);
    }
    
    // Filter sub-filters
    if (filters.subFilters.statusDetail !== 'all') {
      filtered = filtered.filter(report => {
        switch(filters.subFilters.statusDetail) {
          case 'berhasil-sesuai-waktu':
            return report.status === 'berhasil' && report.statusKetepatanWaktu === 'Tepat Waktu';
          case 'belum-lapor':
            return report.status === 'belum-lapor' && report.periodeStatus === 'aktif';
          case 'tidak-berhasil':
            return report.status === 'tidak-berhasil' && report.periodeStatus === 'aktif';
          case 'sudah-lapor':
            return report.status === 'berhasil' && report.periodeStatus === 'terlambat';
          case 'belum-lapor-terlambat':
            return report.status === 'belum-lapor' && report.periodeStatus === 'terlambat';
          default:
            return true;
        }
      });
    }

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
        report.batasWaktu.toLowerCase().includes(term) ||
        report.deskripsi?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reportsWithPeriod]);

  // Get unique jenisLJK
  const uniqueJenisLJK = useMemo(() => {
    const jenisLJK = [...new Set(reportsWithPeriod.map(report => report.jenisLJK))];
    return jenisLJK.map(j => ({
      value: j,
      label: j
    }));
  }, [reportsWithPeriod]);

  // Get unique periode
  const uniquePeriode = useMemo(() => {
    const periode = [...new Set(reportsWithPeriod.map(report => report.periodeLaporan))];
    return periode.map(p => ({
      value: p,
      label: p
    }));
  }, [reportsWithPeriod]);

  // Hitung stats
  const stats = useMemo(() => {
    const activeReports = reportsWithPeriod.filter(r => r.periodeStatus === 'aktif');
    const lateReports = reportsWithPeriod.filter(r => r.periodeStatus === 'terlambat');
    
    return {
      total: reportsWithPeriod.length,
      aktif: activeReports.length,
      terlambat: lateReports.length,
      berhasilTepatWaktu: activeReports.filter(r => r.status === 'berhasil' && r.statusKetepatanWaktu === 'Tepat Waktu').length,
      berhasilTerlambat: lateReports.filter(r => r.status === 'berhasil' && r.statusKetepatanWaktu === 'Terlambat').length,
      belumLaporAktif: activeReports.filter(r => r.status === 'belum-lapor').length,
      belumLaporTerlambat: lateReports.filter(r => r.status === 'belum-lapor').length,
      tidakBerhasil: activeReports.filter(r => r.status === 'tidak-berhasil').length,
    };
  }, [reportsWithPeriod]);

  // Status summary
  const periodeStatusSummary = useMemo(() => {
    const summary = {};
    const allStatus = ['aktif', 'terlambat'];
    
    allStatus.forEach(status => {
      summary[status] = reportsWithPeriod.filter(r => r.periodeStatus === status).length;
    });
    
    return summary;
  }, [reportsWithPeriod]);

  // Get date suggestions untuk tahun berjalan
  const getDateSuggestions = () => {
    const currentYear = currentDateTime.getFullYear();
    return [
      { label: 'Januari ' + currentYear, start: `${currentYear}-01-01`, end: `${currentYear}-01-31` },
      { label: 'Februari ' + currentYear, start: `${currentYear}-02-01`, end: `${currentYear}-02-28` },
      { label: 'Maret ' + currentYear, start: `${currentYear}-03-01`, end: `${currentYear}-03-31` },
      { label: 'April ' + currentYear, start: `${currentYear}-04-01`, end: `${currentYear}-04-30` },
      { label: 'Mei ' + currentYear, start: `${currentYear}-05-01`, end: `${currentYear}-05-31` },
      { label: 'Juni ' + currentYear, start: `${currentYear}-06-01`, end: `${currentYear}-06-30` },
      { label: 'Juli ' + currentYear, start: `${currentYear}-07-01`, end: `${currentYear}-07-31` },
      { label: 'Agustus ' + currentYear, start: `${currentYear}-08-01`, end: `${currentYear}-08-31` },
      { label: 'September ' + currentYear, start: `${currentYear}-09-01`, end: `${currentYear}-09-30` },
      { label: 'Oktober ' + currentYear, start: `${currentYear}-10-01`, end: `${currentYear}-10-31` },
      { label: 'November ' + currentYear, start: `${currentYear}-11-01`, end: `${currentYear}-11-30` },
      { label: 'Desember ' + currentYear, start: `${currentYear}-12-01`, end: `${currentYear}-12-31` },
    ];
  };

  // Sub-filter options
  const getSubFilterOptions = () => {
    if (filters.periodeStatus === 'aktif') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'berhasil-sesuai-waktu', label: 'Berhasil Sesuai Waktu' },
        { value: 'belum-lapor', label: 'Belum Lapor' },
        { value: 'tidak-berhasil', label: 'Tidak Berhasil' }
      ];
    } else if (filters.periodeStatus === 'terlambat') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'sudah-lapor', label: 'Sudah Lapor' },
        { value: 'belum-lapor-terlambat', label: 'Belum Lapor' }
      ];
    }
    return [];
  };

  const resetFilters = () => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1; // 1-indexed
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    setDateRange({
      startDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`,
      endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${lastDay}`
    });
    
    setFilters({
      periodeStatus: 'aktif',
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: ''
      }
    });
    setSearchTerm('');
    setSelectedReport(null);
    setShowSubFilters(true);
  };

  const handlePeriodeStatusChange = (periodeStatus) => {
    setFilters(prev => ({ 
      periodeStatus,
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: ''
      }
    }));
    
    setShowSubFilters(true);
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

  const handleDateSuggestion = (suggestion) => {
    setDateRange({
      startDate: suggestion.start,
      endDate: suggestion.end
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      'berhasil': 'bg-green-100 text-green-800 border-green-200',
      'belum-lapor': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'tidak-berhasil': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'berhasil': 'Berhasil',
      'belum-lapor': 'Belum Lapor',
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
    } else if (status === 'Terlambat') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Terlambat</span>;
    } else if (status === 'Gagal Kirim') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">Gagal Kirim</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
    }
  };

  const getPeriodeStatusBadge = (status) => {
    const styles = {
      'aktif': 'bg-green-100 text-green-800 border-green-200',
      'terlambat': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'aktif': 'Periode Aktif',
      'terlambat': 'Terlambat',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getJenisLKJBadge = (jenis) => {
    const colorMap = {
      'Asuransi Jiwa': 'bg-red-100 text-red-800 border-red-200',
      'Asuransi Umum': 'bg-blue-100 text-blue-800 border-blue-200',
      'Reasuransi': 'bg-purple-100 text-purple-800 border-purple-200',
      'Asuransi Jiwa Syariah': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Asuransi Umum Syariah': 'bg-pink-100 text-pink-800 border-pink-200',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[jenis] || defaultStyle}`}>
        {jenis}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const colorMap = {
      'high': 'bg-red-100 text-red-800 border-red-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'low': 'bg-green-100 text-green-800 border-green-200',
    };

    const labels = {
      'high': 'Tinggi',
      'medium': 'Sedang',
      'low': 'Rendah',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colorMap[priority] || 'bg-gray-100'}`}>
        {labels[priority] || priority}
      </span>
    );
  };

  const getTimeDisplay = (report) => {
    if (report.periodeStatus === 'aktif') {
      if (report.status === 'berhasil') {
        return (
          <div className="space-y-1">
            <div className="text-xs text-green-600 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Submit: {report.displaySubmit}</span>
            </div>
            <div className="text-xs text-blue-600 flex items-center">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-green-500 font-medium">
              {report.statusKetepatanWaktu === 'Tepat Waktu' ? '✅ Sesuai deadline' : '⚠ Terlambat'}
            </div>
          </div>
        );
      } else if (report.status === 'tidak-berhasil') {
        return (
          <div className="space-y-1">
            <div className="text-xs text-red-600 flex items-center">
              <XCircle className="w-3 h-3 mr-1" />
              <span>Tidak Berhasil: {report.displaySubmit}</span>
            </div>
            <div className="text-xs text-blue-600 flex items-center">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-red-500 font-medium">
              ❌ Gagal kirim
            </div>
          </div>
        );
      } else {
        // Belum lapor
        const daysRemaining = Math.floor(report.hoursRemaining / 24);
        const hoursRemaining = report.hoursRemaining % 24;
        
        return (
          <div className="space-y-1">
            <div className="text-xs text-blue-600 flex items-center">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-yellow-600 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>
                {report.hoursRemaining > 0 ? (
                  <>
                    Sisa waktu: {daysRemaining > 0 ? `${daysRemaining} hari` : ''} 
                    {hoursRemaining > 0 ? ` ${hoursRemaining} jam` : ' Segera!'}
                  </>
                ) : 'Sisa waktu: Segera!'}
              </span>
            </div>
            <div className="text-xs text-yellow-500 font-medium">
              ⏳ Belum submit
            </div>
          </div>
        );
      }
    } else {
      // Terlambat
      const daysLate = Math.floor(Math.abs(report.hoursLate) / 24);
      const hoursLate = Math.abs(report.hoursLate) % 24;
      
      return (
        <div className="space-y-1">
          {report.status === 'berhasil' ? (
            <div className="text-xs text-green-600 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Submit: {report.displaySubmit}</span>
            </div>
          ) : (
            <div className="text-xs text-yellow-600 flex items-center">
              <ClockAlert className="w-3 h-3 mr-1" />
              <span>Belum submit</span>
            </div>
          )}
          <div className="text-xs text-red-600 flex items-center">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>Deadline: {report.displayDeadline}</span>
          </div>
          <div className="text-xs text-red-500 font-medium">
            ⚠ Terlambat: {daysLate > 0 ? `${daysLate} hari` : ''} 
            {hoursLate > 0 ? ` ${hoursLate} jam` : ' 0 jam'}
          </div>
        </div>
      );
    }
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
      'Waktu Submit': report.displaySubmit,
      'Waktu Deadline': report.displayDeadline,
      'Status Periode': report.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat',
      'Status Pengiriman': report.statusPengiriman,
      'Status Ketepatan Waktu': report.statusKetepatanWaktu,
      'Prioritas': report.priority === 'high' ? 'Tinggi' : report.priority === 'medium' ? 'Sedang' : 'Rendah',
      'Deskripsi': report.deskripsi || '',
      'Nama File': report.namaFile || '',
      'Ukuran': report.ukuran || ''
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sipina-reports-${new Date().toISOString().split('T')[0]}.csv`;
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

  // Format date for display
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    });
  };

  // Format current date display
  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Jakarta'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <Gavel className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem SIPINA {currentDateTime.getFullYear()}</h1>
            <p className="text-gray-600 mt-1">Monitoring Laporan Sistem Pengawasan dan Informasi Asuransi - Total {stats.total} Laporan</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                Waktu Real-time WIB: {currentDateTime.toLocaleTimeString('id-ID', { 
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZone: 'Asia/Jakarta'
                })}
              </p>
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="w-3 h-3 inline mr-1" />
                {getCurrentDateDisplay()}
              </p>
            </div>
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

      {/* Filter Section */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Periode Laporan {currentDateTime.getFullYear()}</h3>
                  <p className="text-sm text-gray-600">Pilih rentang tanggal deadline terlebih dahulu</p>
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
            {/* Level 0: Periode Tanggal Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 0: Pilih Rentang Tanggal Deadline (Tahun {currentDateTime.getFullYear()})</h4>
              
              {/* Quick Date Suggestions */}
              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-2">Pilihan Cepat Periode {currentDateTime.getFullYear()} (Bulanan):</div>
                <div className="flex flex-wrap gap-2">
                  {getDateSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSuggestion(suggestion)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        dateRange.startDate === suggestion.start && dateRange.endDate === suggestion.end
                          ? 'bg-blue-100 text-blue-700 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear()}-01-01`}
                    max={`${currentDateTime.getFullYear()}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Akhir
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear()}-01-01`}
                    max={`${currentDateTime.getFullYear()}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Periode Terpilih
                  </label>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm font-medium text-blue-900">
                      {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      {stats.total} laporan ditemukan • 
                      Aktif: {stats.aktif} • Terlambat: {stats.terlambat}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Tanggal saat ini: {getCurrentDateDisplay()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 1: Periode Status Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 1: Pilih Status Periode</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handlePeriodeStatusChange('aktif')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'aktif' 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CalendarCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Periode Aktif</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.aktif || 0} laporan</div>
                      <div className="text-xs text-green-600">
                        Status: Berhasil, Belum Lapor, Tidak Berhasil
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'aktif' && <ChevronDown className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  onClick={() => handlePeriodeStatusChange('terlambat')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'terlambat' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ClockAlert className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Terlambat</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.terlambat || 0} laporan</div>
                      <div className="text-xs text-red-600">
                        Status: Sudah Lapor, Belum Lapor
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'terlambat' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

                <div className="p-4 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Tanggal Saat Ini</div>
                      <div className="text-sm text-blue-700 font-medium">
                        {getCurrentDateDisplay()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Tahun {currentDateTime.getFullYear()} • Waktu Real-time WIB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2: Sub Filters */}
            {(filters.periodeStatus !== 'all' || showSubFilters) && (
              <div className="mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Level 2: Filter Detail Status</h4>
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
                  <div className="space-y-6">
                    {/* Status Detail Filter */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <Filter className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-900">Detail Status dalam {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}</h5>
                          <p className="text-sm text-blue-700">
                            Pilih status detail untuk memfilter lebih spesifik
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {getSubFilterOptions().map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSubFilterChange('statusDetail', option.value)}
                            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                              filters.subFilters.statusDetail === option.value
                                ? 'border-blue-500 bg-blue-50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{option.label}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.value === 'all' 
                                ? 'Tampilkan semua' 
                                : option.value === 'berhasil-sesuai-waktu'
                                ? 'Laporan berhasil sesuai deadline'
                                : option.value === 'belum-lapor'
                                ? 'Belum melakukan pelaporan'
                                : option.value === 'tidak-berhasil'
                                ? 'Tidak berhasil dalam pelaporan'
                                : option.value === 'sudah-lapor'
                                ? 'Sudah lapor tapi terlambat'
                                : 'Belum lapor dan terlambat'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>
                )}
              </div>
            )}

            {/* Filter Info Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif Tahun {currentDateTime.getFullYear()}:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}
                      </span>
                      {filters.subFilters.statusDetail !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Detail: {getSubFilterOptions().find(opt => opt.value === filters.subFilters.statusDetail)?.label}
                          <button 
                            onClick={() => handleSubFilterChange('statusDetail', 'all')}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.jenisLJK !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          LJK: {filters.subFilters.jenisLJK}
                          <button 
                            onClick={() => handleSubFilterChange('jenisLJK', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.periode !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Periode: {filters.subFilters.periode}
                          <button 
                            onClick={() => handleSubFilterChange('periode', 'all')}
                            className="ml-2 text-yellow-600 hover:text-yellow-800"
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
                  <h3 className="text-lg font-bold text-red-900">Daftar Laporan SIPINA {currentDateTime.getFullYear()}</h3>
                  <p className="text-sm text-gray-600">
                    Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)} • 
                    Tanggal: {getCurrentDateDisplay()}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredReports.length} dari {stats.total} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Periode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aplikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Periode Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Batas Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Pengiriman</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Ketepatan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Detail Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                    report.periodeStatus === 'terlambat' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPeriodeStatusBadge(report.periodeStatus)}
                    </td>
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
                        {report.namaLaporan}
                        {report.namaFile && (
                          <div className="text-xs text-gray-500 mt-1">{report.namaFile}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {report.periodeLaporan}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {report.batasWaktu}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getKetepatanBadge(report.statusKetepatanWaktu)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-1 min-w-[200px]">
                        {getTimeDisplay(report)}
                      </div>
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
                        {(report.status === 'belum-lapor' || report.status === 'tidak-berhasil') && (
                          <button
                            onClick={() => alert(`Kirim reminder untuk laporan ${report.namaLaporan}`)}
                            className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Kirim reminder"
                          >
                            <Clock className="w-4 h-4" />
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
                Data diperbarui berdasarkan waktu real-time WIB • 
                Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
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
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan SIPINA {currentDateTime.getFullYear()}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                      <span className="text-gray-600">• ID: {selectedReport.id}</span>
                    </div>
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
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Periode</h4>
                  <div className="flex items-center space-x-2">
                    {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                    <span className="text-sm text-gray-600">
                      Deadline: {selectedReport.displayDeadline}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Saat Ini</h4>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-medium text-blue-900">
                      {getCurrentDateDisplay()}
                    </p>
                    <p className="text-sm text-blue-700">
                      {currentDateTime.toLocaleTimeString('id-ID', { 
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: 'Asia/Jakarta'
                      })}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Laporan</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedReport.periodeLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Prioritas</h4>
                  {getPriorityBadge(selectedReport.priority)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Batas Waktu Penyampaian</h4>
                  <div className={`p-3 rounded-lg ${selectedReport.periodeStatus === 'terlambat' ? 'bg-red-50' : 'bg-green-50'}`}>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedReport.batasWaktu}
                    </p>
                    <div className="mt-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Deadline: {selectedReport.displayDeadline}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Waktu Submit</h4>
                  <div className={`p-3 rounded-lg ${
                    selectedReport.status === 'berhasil' ? 'bg-green-50' : 
                    selectedReport.status === 'belum-lapor' ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedReport.displaySubmit}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      {selectedReport.status === 'berhasil' ? '✅ Berhasil submit' : 
                       selectedReport.status === 'belum-lapor' ? '⏳ Belum submit' : '❌ Tidak berhasil submit'}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Ketepatan Waktu</h4>
                  {getKetepatanBadge(selectedReport.statusKetepatanWaktu)}
                  <div className="mt-2 text-sm text-gray-600">
                    {selectedReport.periodeStatus === 'aktif' ? (
                      selectedReport.status === 'berhasil' ? (
                        <div className="text-green-600">
                          ✅ Submit: {selectedReport.displaySubmit}
                        </div>
                      ) : (
                        <div className="text-blue-600">
                          ⏳ Sisa waktu: {selectedReport.hoursRemaining > 0 ? 
                            `${Math.floor(selectedReport.hoursRemaining / 24)} hari ${selectedReport.hoursRemaining % 24} jam` : 
                            'Segera!'}
                        </div>
                      )
                    ) : (
                      <div className="text-red-600">
                        ⚠ Terlambat: {Math.floor(selectedReport.hoursLate / 24)} hari {selectedReport.hoursLate % 24} jam
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  {getStatusBadge(selectedReport.status)}
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedReport.status === 'berhasil' 
                      ? 'Laporan berhasil dikirim' 
                      : selectedReport.status === 'belum-lapor'
                      ? 'Belum melakukan pengiriman'
                      : 'Tidak berhasil dalam pengiriman'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama File</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedReport.namaFile || 'Tidak tersedia'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Ukuran File</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedReport.ukuran || 'Tidak tersedia'}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Deskripsi</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.deskripsi || 'Tidak ada deskripsi'}</p>
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
                {(selectedReport.status === 'belum-lapor' || selectedReport.status === 'tidak-berhasil') && (
                  <button
                    onClick={() => alert(`Kirim reminder untuk laporan ${selectedReport.namaLaporan}`)}
                    className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Kirim Reminder
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

export default SIPINA;