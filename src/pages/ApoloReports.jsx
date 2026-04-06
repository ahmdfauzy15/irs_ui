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
  Building,
  FileCheck,
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  ClockAlert,
  Calendar as CalendarIcon,
  Clock4,
  CheckSquare,
  Hourglass,
  AlertOctagon,
  Upload,
  Edit,
  MessageSquare,
  Check,
  X,
  FileUp,
  Trash2,
  ChevronUp,
  Send,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';

const ApoloReports = () => {
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [disputeData, setDisputeData] = useState({});
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedReportForDispute, setSelectedReportForDispute] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedConfirmReport, setSelectedConfirmReport] = useState(null);
  const [disputeForm, setDisputeForm] = useState({
    jenisLJK: '',
    namaLaporan: '',
    periodeLaporan: '',
    alasanKeterlambatan: '',
    filePendukung: null
  });
  
  const [dateRange, setDateRange] = useState(() => {
    return {
      startDate: '2025-04-01',
      endDate: '2026-04-01'
    };
  });
  
  const [filters, setFilters] = useState({
    aplikasi: 'all',
    statusKeterlambatan: 'all'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  // Load dispute data from localStorage
  useEffect(() => {
    const savedDisputes = localStorage.getItem('apolo_disputes_v3');
    if (savedDisputes) {
      setDisputeData(JSON.parse(savedDisputes));
    }
  }, []);

  // Save dispute data to localStorage
  const saveDisputeToLocalStorage = (disputes) => {
    localStorage.setItem('apolo_disputes_v3', JSON.stringify(disputes));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper function untuk mendapatkan tanggal yang aman
  const getSafeDate = (year, month, day) => {
    let safeMonth = month;
    let safeYear = year;
    
    if (safeMonth <= 0) {
      safeMonth += 12;
      safeYear -= 1;
    } else if (safeMonth > 12) {
      safeMonth -= 12;
      safeYear += 1;
    }
    
    const lastDayOfMonth = new Date(safeYear, safeMonth, 0).getDate();
    const safeDay = Math.min(day, lastDayOfMonth);
    
    return { year: safeYear, month: safeMonth, day: safeDay };
  };

  // Data reports statis (tidak berubah-ubah)
  const initialReports = useMemo(() => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth31 = getSafeDate(currentYear, currentMonth - 1, 31);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);
    const currentMonth15 = getSafeDate(currentYear, currentMonth, 15);
    const nextMonth20 = getSafeDate(currentYear, currentMonth + 1, 20);
    
    // Fungsi untuk format tanggal ke string ISO
    const formatDateToString = (year, month, day) => {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    
    // Data untuk APOLO dengan status statis
    const apoloData = [
      {
        id: "APO001",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "LCR Individual",
        periodeLaporan: "Maret 2026",
        tglUpload: formatDateToString(prevMonth15.year, prevMonth15.month, prevMonth15.day + 2),
        tglBatas: formatDateToString(prevMonth15.year, prevMonth15.month, prevMonth15.day),
        jmlHariTerlambat: "Menunggu Validasi",
        statusKeterlambatan: "Menunggu Validasi",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form LCR Individual - Laporan Utama", fileUrl: "/reports/APO001_form1.pdf" },
          { id: 2, namaForm: "Form LCR Individual - Detail Aset", fileUrl: "/reports/APO001_form2.pdf" }
        ]
      },
      {
        id: "APO002",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "LCR Konsolidasi",
        periodeLaporan: "Maret 2026",
        tglUpload: formatDateToString(prevMonth31.year, prevMonth31.month, prevMonth31.day - 2),
        tglBatas: formatDateToString(prevMonth31.year, prevMonth31.month, prevMonth31.day),
        jmlHariTerlambat: 3,
        statusKeterlambatan: "terlambat",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form LCR Konsolidasi - Laporan Utama", fileUrl: "/reports/APO002_form1.pdf" },
          { id: 2, namaForm: "Form LCR Konsolidasi - Detail Liabilitas", fileUrl: "/reports/APO002_form2.pdf" }
        ]
      },
      {
        id: "APO006",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Syariah",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan GWM Individual",
        periodeLaporan: "Maret 2026",
        tglUpload: formatDateToString(prevMonth10.year, prevMonth10.month, prevMonth10.day + 3),
        tglBatas: formatDateToString(prevMonth10.year, prevMonth10.month, prevMonth10.day),
        jmlHariTerlambat: 2,
        statusKeterlambatan: "terlambat",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form GWM Individual - Utama", fileUrl: "/reports/APO006_form1.pdf" }
        ]
      },
      {
        id: "APO008",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Syariah",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Semesteran BPR/BPRS",
        periodeLaporan: "Maret 2026",
        tglUpload: formatDateToString(prevMonth30.year, prevMonth30.month, prevMonth30.day + 7),
        tglBatas: formatDateToString(prevMonth30.year, prevMonth30.month, prevMonth30.day),
        jmlHariTerlambat: 7,
        statusKeterlambatan: "terlambat",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Semesteran", fileUrl: "/reports/APO008_form1.pdf" }
        ]
      },
      {
        id: "APO010",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Bulanan BU",
        periodeLaporan: "Bulanan",
        tglUpload: formatDateToString(prevMonth15.year, prevMonth15.month, prevMonth15.day + 5),
        tglBatas: formatDateToString(nextMonth20.year, nextMonth20.month, nextMonth20.day),
        jmlHariTerlambat: 0,
        statusKeterlambatan: "belum_lapor",
        statusPengiriman: "Belum Lapor",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Bulanan", fileUrl: null }
        ]
      }
    ];

    // Data eReporting
    const eReportingData = [
      {
        id: "ERP003",
        aplikasi: "eReporting",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan GWM Bulanan",
        periodeLaporan: "-",
        tglUpload: formatDateToString(prevMonth10.year, prevMonth10.month, prevMonth10.day + 2),
        tglBatas: formatDateToString(prevMonth10.year, prevMonth10.month, prevMonth10.day),
        jmlHariTerlambat: 0,
        statusKeterlambatan: "tepat_waktu",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form GWM - Utama", fileUrl: "/reports/ERP003_form1.pdf" },
          { id: 2, namaForm: "Form GWM - Detail", fileUrl: "/reports/ERP003_form2.pdf" }
        ]
      },
      {
        id: "ERP005",
        aplikasi: "eReporting",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Kredit Bulanan",
        periodeLaporan: "Bulanan",
        tglUpload: formatDateToString(currentMonth15.year, currentMonth15.month, currentMonth15.day - 2),
        tglBatas: formatDateToString(currentMonth15.year, currentMonth15.month, currentMonth15.day),
        jmlHariTerlambat: 4,
        statusKeterlambatan: "terlambat",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        detailForms: [
          { id: 1, namaForm: "Form Kredit Bulanan", fileUrl: "/reports/ERP005_form1.pdf" }
        ]
      }
    ];

    return [...apoloData, ...eReportingData];
  }, [currentDateTime]);

  // Fungsi untuk mengecek apakah bisa melakukan sanggahan (hanya untuk terlambat <= 5 hari)
  const canDispute = (report) => {
    if (report.statusPengiriman !== "Berhasil") return false;
    if (report.statusKeterlambatan !== "terlambat") return false;
    if (report.jmlHariTerlambat <= 0) return false;
    if (report.jmlHariTerlambat > 5) return false;
    if (report.disputeStatus === 'pending' || report.disputeStatus === 'accepted' || report.disputeStatus === 'rejected') return false;
    return true;
  };

  // Proses data reports dengan filter tanggal
  const reportsWithPeriod = useMemo(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    const processed = initialReports.map(report => {
      const deadlineDate = new Date(report.tglBatas);
      
      // Cek apakah deadline dalam range tanggal yang dipilih
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      // Dapatkan data sanggahan
      const dispute = disputeData[report.id];
      let disputeStatus = report.disputeStatus;
      let finalLateDays = report.jmlHariTerlambat;
      let finalStatus = report.statusKeterlambatan;
      
      if (dispute) {
        disputeStatus = dispute.status;
        if (dispute.status === 'accepted') {
          finalLateDays = 0;
          finalStatus = 'tepat_waktu';
          disputeStatus = 'accepted';
        } else if (dispute.status === 'rejected') {
          finalLateDays = report.jmlHariTerlambat;
          finalStatus = 'terlambat';
          disputeStatus = 'rejected';
        } else if (dispute.status === 'pending') {
          finalStatus = 'terlambat';
          disputeStatus = 'pending';
        }
      }
      
      // Tentukan label untuk kolom Jml Hari Terlambat (hanya 3 status)
      let finalLabel = '';
      if (finalStatus === 'tepat_waktu') {
        finalLabel = 'Tepat Waktu';
      } else if (finalStatus === 'belum_lapor') {
        finalLabel = 'Belum Lapor';
      } else if (disputeStatus === 'pending') {
        finalLabel = `${report.jmlHariTerlambat} Hari (Dalam Validasi)`;
      } else if (disputeStatus === 'accepted') {
        finalLabel = 'Tepat Waktu';
      } else {
        finalLabel = `${report.jmlHariTerlambat} Hari Terlambat`;
      }
      
      // Tentukan status untuk badge (hanya 3)
      let statusBadge = '';
      if (finalStatus === 'tepat_waktu') {
        statusBadge = 'Tepat Waktu';
      } else if (finalStatus === 'belum_lapor') {
        statusBadge = 'Belum Lapor';
      } else {
        statusBadge = 'Terlambat';
      }
      
      // Format tanggal untuk display
      const formatDateOnly = (date) => {
        if (!date) return 'Belum ada';
        if (isNaN(date.getTime())) return 'Tanggal tidak valid';
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      };
      
      return {
        ...report,
        deadlineDate: report.tglBatas,
        submissionDate: report.tglUpload,
        displayDeadline: formatDateOnly(deadlineDate),
        displaySubmit: report.tglUpload ? formatDateOnly(new Date(report.tglUpload)) : 'Belum submit',
        finalLateDays,
        finalStatus,
        finalLabel,
        disputeStatus,
        statusBadge,
        canDispute: canDispute(report)
      };
    }).filter(report => report !== null);
    
    return processed;
  }, [dateRange, initialReports, disputeData]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Hitung filteredReports berdasarkan filter
  const filteredReports = useMemo(() => {
    let filtered = [...reportsWithPeriod];

    // Filter aplikasi
    if (filters.aplikasi !== 'all') {
      filtered = filtered.filter(report => report.aplikasi === filters.aplikasi);
    }
    
    // Filter status keterlambatan (hanya 3 status)
    if (filters.statusKeterlambatan !== 'all') {
      filtered = filtered.filter(report => report.finalStatus === filters.statusKeterlambatan);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.namaLaporan.toLowerCase().includes(term) ||
        report.jenisLJK.toLowerCase().includes(term) ||
        report.periodeLaporan.toLowerCase().includes(term) ||
        report.aplikasi.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reportsWithPeriod]);

  // Get unique options for filters
  const getAplikasiOptions = () => {
    const aplikasiList = [...new Set(reportsWithPeriod.map(r => r.aplikasi))];
    return [
      { value: 'all', label: 'Semua Aplikasi' },
      ...aplikasiList.map(app => ({ value: app, label: app }))
    ];
  };

  const getStatusOptions = () => {
    return [
      { value: 'all', label: 'Semua Status' },
      { value: 'tepat_waktu', label: 'Tepat Waktu' },
      { value: 'terlambat', label: 'Terlambat' },
      { value: 'belum_lapor', label: 'Belum Lapor' }
    ];
  };

  // Hitung stats
  const stats = useMemo(() => {
    const total = reportsWithPeriod.length;
    const tepatWaktu = reportsWithPeriod.filter(r => r.finalStatus === 'tepat_waktu').length;
    const terlambat = reportsWithPeriod.filter(r => r.finalStatus === 'terlambat').length;
    const belumLapor = reportsWithPeriod.filter(r => r.finalStatus === 'belum_lapor').length;
    
    return {
      total,
      tepatWaktu,
      terlambat,
      belumLapor
    };
  }, [reportsWithPeriod]);

  const resetFilters = () => {
    setDateRange({
      startDate: '2025-04-01',
      endDate: '2026-04-01'
    });
    
    setFilters({
      aplikasi: 'all',
      statusKeterlambatan: 'all'
    });
    setSearchTerm('');
    setSelectedReport(null);
  };

  // Handle konfirmasi (Mengakui Keterlambatan)
  const handleConfirmLate = (report) => {
    // Jika mengakui, tetap terlambat dengan jumlah hari yang sama
    const newDispute = {
      id: report.id,
      jenisLJK: report.jenisLJK,
      namaLaporan: report.namaLaporan,
      periodeLaporan: report.periodeLaporan,
      alasanKeterlambatan: 'Mengakui keterlambatan',
      filePendukung: 'disetujui_ljk',
      status: 'rejected', // Rejected berarti tetap terlambat
      acknowledged: true,
      createdAt: new Date().toISOString(),
      sistemLateDays: report.jmlHariTerlambat,
      acknowledgedLateDays: report.jmlHariTerlambat
    };
    
    const updatedDisputes = { ...disputeData, [report.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    alert(`Anda mengakui keterlambatan ${report.jmlHariTerlambat} hari. Status tetap Terlambat.`);
  };

  // Handle sanggahan (Menolak Keterlambatan)
  const handleDispute = (report) => {
    setSelectedReportForDispute(report);
    setDisputeForm({
      jenisLJK: report.jenisLJK,
      namaLaporan: report.namaLaporan,
      periodeLaporan: report.periodeLaporan,
      alasanKeterlambatan: '',
      filePendukung: null
    });
    setShowDisputeModal(true);
  };

  // Handle open confirm modal
  const handleOpenConfirmModal = (report) => {
    setSelectedConfirmReport(report);
    setShowConfirmModal(true);
  };

  const handleDisputeSubmit = () => {
    if (!disputeForm.alasanKeterlambatan) {
      alert('Harap isi alasan keterlambatan');
      return;
    }
    
    if (!disputeForm.filePendukung) {
      alert('Harap upload surat pendukung yang ditandatangani direksi');
      return;
    }
    
    // Random decision for dispute (50% diterima, 50% ditolak)
    const randomDecision = Math.random();
    const isAccepted = randomDecision < 0.5;
    
    const newDispute = {
      id: selectedReportForDispute.id,
      jenisLJK: disputeForm.jenisLJK,
      namaLaporan: disputeForm.namaLaporan,
      periodeLaporan: disputeForm.periodeLaporan,
      alasanKeterlambatan: disputeForm.alasanKeterlambatan,
      filePendukung: disputeForm.filePendukung.name,
      status: isAccepted ? 'accepted' : 'rejected',
      createdAt: new Date().toISOString(),
      sistemLateDays: selectedReportForDispute.jmlHariTerlambat,
      acknowledgedLateDays: isAccepted ? 0 : selectedReportForDispute.jmlHariTerlambat
    };
    
    const updatedDisputes = { ...disputeData, [selectedReportForDispute.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowDisputeModal(false);
    setSelectedReportForDispute(null);
    
    const message = isAccepted 
      ? 'Sanggahan diterima! Status laporan menjadi Tepat Waktu.' 
      : 'Sanggahan ditolak. Status laporan tetap Terlambat.';
    alert(message);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDisputeForm({ ...disputeForm, filePendukung: file });
    }
  };

  const toggleRowExpand = (reportId) => {
    setExpandedRows(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  const getStatusBadge = (statusBadge) => {
    if (statusBadge === 'Tepat Waktu') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">✓ Tepat Waktu</span>;
    } else if (statusBadge === 'Belum Lapor') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">⏳ Belum Lapor</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">⚠ Terlambat</span>;
    }
  };

  const getLateDaysDisplay = (report) => {
    if (!report) return null;
    
    if (report.finalStatus === 'tepat_waktu') {
      return (
        <div className="text-sm">
          <div className="text-green-600 font-medium">
            0 Hari Terlambat
          </div>
        </div>
      );
    } else if (report.finalStatus === 'belum_lapor') {
      return (
        <div className="text-sm">
          <div className="text-yellow-600 font-medium">
            Belum Lapor
          </div>
        </div>
      );
    } else if (report.disputeStatus === 'pending') {
      return (
        <div className="text-sm">
          <div className="text-orange-600 font-medium">
            {report.jmlHariTerlambat} Hari
          </div>
          <div className="text-xs text-orange-500">
            Dalam Validasi
          </div>
        </div>
      );
    } else if (report.disputeStatus === 'accepted') {
      return (
        <div className="text-sm">
          <div className="text-green-600 font-medium">
            Tepat Waktu
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.jmlHariTerlambat} Hari Terlambat
          </div>
        </div>
      );
    }
  };

  const getConfirmationButton = (report) => {
    // Jika sudah ada dispute status
    if (report.disputeStatus === 'pending') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Menunggu Validasi
        </span>
      );
    }
    
    if (report.disputeStatus === 'accepted') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Sanggahan Diterima
        </span>
      );
    }
    
    if (report.disputeStatus === 'rejected') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Sanggahan Ditolak
        </span>
      );
    }
    
    // Jika bisa melakukan sanggahan (terlambat <= 5 hari)
    if (report.canDispute) {
      return (
        <button
          onClick={() => handleOpenConfirmModal(report)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-200 transition-colors"
          title="Konfirmasi Sanggahan"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          Konfirmasi Sanggahan
        </button>
      );
    }
    
    // Jika terlambat > 5 hari (tidak bisa sanggah)
    if (report.finalStatus === 'terlambat' && report.jmlHariTerlambat > 5) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Negative Confirmation
        </span>
      );
    }
    
    // Jika tepat waktu
    if (report.finalStatus === 'tepat_waktu') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Tepat Waktu
        </span>
      );
    }
    
    return null;
  };

  const getAplikasiBadge = (aplikasi) => {
    const colorMap = {
      'APOLO': 'bg-blue-100 text-blue-800 border-blue-200',
      'eReporting': 'bg-green-100 text-green-800 border-green-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[aplikasi]}`}>
        {aplikasi}
      </span>
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredReports.map(report => ({
      'ID': report.id,
      'Aplikasi': report.aplikasi,
      'Jenis LJK': report.jenisLJK,
      'Bidang LJK': report.bidangLJK,
      'Nama Laporan': report.namaLaporan,
      'Periode Data': report.periodeLaporan,
      'Jml Form': report.detailForms.length,
      'Tgl Upload/Penyampaian': report.displaySubmit,
      'Tgl Batas Akhir': report.displayDeadline,
      'Status': report.statusBadge,
      'Jml Hari Terlambat': report.finalLabel,
      'Konfirmasi': report.disputeStatus === 'accepted' ? 'Sanggahan Diterima' : 
                     report.disputeStatus === 'rejected' ? 'Sanggahan Ditolak' :
                     report.disputeStatus === 'pending' ? 'Menunggu Verifikasi' :
                     report.canDispute ? 'Dapat Sanggah' : 
                     (report.finalStatus === 'terlambat' && report.jmlHariTerlambat > 5) ? 'Tidak Bisa Sanggah' :
                     report.finalStatus === 'tepat_waktu' ? 'Tepat Waktu' : 'Belum Lapor'
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

  // Format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Tanggal tidak valid';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format current date display
  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format current time display
  const getCurrentTimeDisplay = () => {
    return currentDateTime.toLocaleTimeString('id-ID', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem Monitoring Absensi{currentDateTime.getFullYear()}</h1>
            <p className="text-gray-600 mt-1">Monitoring Laporan APOLO - Total {stats.total} Laporan</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                Waktu Real-time: {getCurrentTimeDisplay()}
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
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

      {/* Stats Cards */}
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Laporan</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Tepat Waktu</p>
                <p className="text-2xl font-bold text-green-900">{stats.tepatWaktu}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Terlambat</p>
                <p className="text-2xl font-bold text-red-900">{stats.terlambat}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Belum Lapor</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.belumLapor}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
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
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Periode Laporan</h3>
                  <p className="text-sm text-gray-600">Pilih rentang tanggal deadline (Maksimal 1 Tahun: 2025 - 2026)</p>
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
            {/* Filter Tanggal */}
            <div className="mb-6">
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
                    min="2025-04-01"
                    max="2026-04-01"
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
                    min="2025-04-01"
                    max="2026-04-01"
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
                      {reportsWithPeriod.length} laporan ditemukan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Aplikasi dan Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Filter Aplikasi
                </label>
                <select
                  value={filters.aplikasi}
                  onChange={(e) => handleFilterChange('aplikasi', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  {getAplikasiOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Filter Status Keterlambatan
                </label>
                <select
                  value={filters.statusKeterlambatan}
                  onChange={(e) => handleFilterChange('statusKeterlambatan', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  {getStatusOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
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
                  placeholder="Cari nama laporan, jenis LJK, atau aplikasi..."
                  className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Info Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                      </span>
                      {filters.aplikasi !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Aplikasi: {filters.aplikasi}
                          <button 
                            onClick={() => handleFilterChange('aplikasi', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.statusKeterlambatan !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Status: {getStatusOptions().find(opt => opt.value === filters.statusKeterlambatan)?.label}
                          <button 
                            onClick={() => handleFilterChange('statusKeterlambatan', 'all')}
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
          <div className="p-4 md:p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm flex-shrink-0">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-red-900 truncate">
                      Daftar Laporan APOLO ,eReporting, SIPINA
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 truncate">
                        Periode: <span className="font-medium">{formatDateDisplay(dateRange.startDate)}</span> - <span className="font-medium">{formatDateDisplay(dateRange.endDate)}</span>
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Tanggal:</span> {getCurrentDateDisplay()}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Data:</span> 2025 - 2026
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {filteredReports.length} dari {reportsWithPeriod.length} laporan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200 min-w-0">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Menampilkan: <span className="font-bold">{filteredReports.length}</span> dari <span className="font-bold">{reportsWithPeriod.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-12">Show/Hide</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aplikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Periode Data</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jml Form</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Upload/Penyampaian</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Batas Akhir</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jml Hari Terlambat</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Konfirmasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <React.Fragment key={report.id}>
                    <tr className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                      report.finalStatus === 'terlambat' ? 'bg-red-50/30' : 
                      report.finalStatus === 'belum_lapor' ? 'bg-yellow-50/30' : ''
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRowExpand(report.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {expandedRows[report.id] ? 
                            <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          }
                        </button>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getAplikasiBadge(report.aplikasi)}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {report.periodeLaporan}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                        {report.detailForms.length}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {report.displaySubmit}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {report.displayDeadline}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(report.statusBadge)}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getLateDaysDisplay(report)}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getConfirmationButton(report)}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(report)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                       </td>
                    </tr>
                    {expandedRows[report.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="10" className="px-6 py-4">
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Form Laporan</h4>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama Form</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {report.detailForms.map((form, idx) => (
                                    <tr key={form.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 text-sm text-gray-600">{idx + 1}</td>
                                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{form.namaForm}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Jenis LJK</p>
                                <p className="text-sm font-medium text-gray-900">{report.jenisLJK}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Bidang LJK</p>
                                <p className="text-sm font-medium text-gray-900">{report.bidangLJK}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
          <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs md:text-sm text-gray-600">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Data diperbarui real-time
                    </span>
                    <span className="hidden md:inline">•</span>
                    <span className="font-medium">
                      Periode: 2025 - 2026
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="text-xs md:text-sm text-gray-600">
                  <span className="font-medium">
                    Halaman 1 dari {Math.ceil(filteredReports.length / 10) || 1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal - Mengakui atau Menyanggah */}
      {showConfirmModal && selectedConfirmReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-900">Konfirmasi Sanggahan</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Laporan: {selectedConfirmReport.namaLaporan}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Informasi:</p>
                    <p className="mt-1">Keterlambatan: {selectedConfirmReport.jmlHariTerlambat} hari</p>
                    <p className="mt-1">Pilih salah satu opsi di bawah ini:</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    handleConfirmLate(selectedConfirmReport);
                  }}
                  className="w-full p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mengakui Keterlambatan ({selectedConfirmReport.jmlHariTerlambat} Hari)</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    handleDispute(selectedConfirmReport);
                  }}
                  className="w-full p-3 bg-green-100 text-green-700 rounded-lg border border-green-200 hover:bg-green-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Menyanggah Keterlambatan (Ajukan Sanggahan)</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedConfirmReport(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && selectedReportForDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-900">Ajukan Sanggahan Keterlambatan</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Laporan: {selectedReportForDispute.namaLaporan}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Informasi Penting:</p>
                    <p className="mt-1">Dokumen pendukung yang diupload harus ditandatangani oleh Direksi.</p>
                    <p className="mt-1">Sanggahan akan direview oleh pengawas dan keputusan bersifat final.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis LJK
                  </label>
                  <input
                    type="text"
                    value={disputeForm.jenisLJK}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periode Laporan
                  </label>
                  <input
                    type="text"
                    value={disputeForm.periodeLaporan}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Laporan
                  </label>
                  <input
                    type="text"
                    value={disputeForm.namaLaporan}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Keterlambatan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    value={disputeForm.alasanKeterlambatan}
                    onChange={(e) => setDisputeForm({ ...disputeForm, alasanKeterlambatan: e.target.value })}
                    placeholder="Jelaskan alasan keterlambatan dengan detail..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Surat Pendukung <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {disputeForm.filePendukung ? disputeForm.filePendukung.name : 'Klik untuk upload file'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Format PDF, DOC, DOCX (Maks. 5MB)
                      </p>
                    </label>
                  </div>
                  <p className="text-xs text-orange-600 mt-2">
                    * Surat pendukung harus ditandatangani oleh Direksi
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDisputeSubmit}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Ajukan Sanggahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAplikasiBadge(selectedReport.aplikasi)}
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  {getAplikasiBadge(selectedReport.aplikasi)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis LJK</h4>
                  <p className="text-gray-900">{selectedReport.jenisLJK}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Bidang LJK</h4>
                  <p className="text-gray-900">{selectedReport.bidangLJK}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Data</h4>
                  <p className="text-gray-900">{selectedReport.periodeLaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Deadline</h4>
                  <p className="text-gray-900">{selectedReport.displayDeadline}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Upload</h4>
                  <p className="text-gray-900">{selectedReport.displaySubmit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  {getStatusBadge(selectedReport.statusBadge)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jumlah Hari Keterlambatan</h4>
                  {getLateDaysDisplay(selectedReport)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jumlah Form</h4>
                  <p className="text-gray-900">{selectedReport.detailForms.length}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Detail Form Laporan</h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Form</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {selectedReport.detailForms.map((form, idx) => (
                        <tr key={form.id}>
                          <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{form.namaForm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                {selectedReport.canDispute && (
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      handleOpenConfirmModal(selectedReport);
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Konfirmasi Sanggahan</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
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