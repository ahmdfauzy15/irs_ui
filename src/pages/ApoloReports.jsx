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
  Info,
  History
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
  const [showAcknowledgeModal, setShowAcknowledgeModal] = useState(false);
  const [selectedAcknowledgeReport, setSelectedAcknowledgeReport] = useState(null);
  const [acknowledgeConfirmation, setAcknowledgeConfirmation] = useState('');
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

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Load dispute data from localStorage
  useEffect(() => {
    const savedDisputes = localStorage.getItem('apolo_disputes_v6');
    if (savedDisputes) {
      setDisputeData(JSON.parse(savedDisputes));
    }
  }, []);

  // Save dispute data to localStorage
  const saveDisputeToLocalStorage = (disputes) => {
    localStorage.setItem('apolo_disputes_v6', JSON.stringify(disputes));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

const initialReports = useMemo(() => {
  const currentYear = currentDateTime.getFullYear();
  const currentMonth = currentDateTime.getMonth() + 1;
  const currentDate = currentDateTime;
  const today = new Date(2026, 3, 8); // 8 April 2026
  
  const getDateFromToday = (daysOffset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + daysOffset);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };
  
  const getDateFromMonthOffset = (monthsOffset, targetDay) => {
    let date = new Date(today);
    date.setMonth(date.getMonth() + monthsOffset);
    date.setDate(targetDay);
    if (date.getDate() !== targetDay) {
      date.setDate(0);
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };
  
  const formatDateToString = (year, month, day) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  // Nama bulan untuk periode laporan
  const getMonthName = (monthNumber) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return months[monthNumber - 1];
  };
  
  const currentMonthName = getMonthName(currentMonth);
  
  // Data untuk APOLO - SEMUA PERIODE APRIL 2026
  const apoloData = [
    {
      id: "APO001",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "LCR Individual",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-3).year, getDateFromToday(-3).month, getDateFromToday(-3).day),
      tglBatas: formatDateToString(getDateFromToday(-5).year, getDateFromToday(-5).month, getDateFromToday(-5).day),
      tglRilisValidasi: null, 
      jmlHariTerlambat: "Menunggu Validasi",
      statusKeterlambatan: "Menunggu Validasi",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
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
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-4).year, getDateFromToday(-4).month, getDateFromToday(-4).day),
      tglBatas: formatDateToString(getDateFromToday(-6).year, getDateFromToday(-6).month, getDateFromToday(-6).day),
      tglRilisValidasi: null, 
      jmlHariTerlambat: "Menunggu Validasi",
      statusKeterlambatan: "Menunggu Validasi",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form LCR Konsolidasi - Laporan Utama", fileUrl: "/reports/APO002_form1.pdf" },
        { id: 2, namaForm: "Form LCR Konsolidasi - Detail Liabilitas", fileUrl: "/reports/APO002_form2.pdf" }
      ]
    },
    
    // === SUDAH DIVALIDASI - MASIH DALAM MASA SANGAH (1-5 HARI) ===
    {
      id: "APO003",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan NSFR Individual",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-5).year, getDateFromToday(-5).month, getDateFromToday(-5).day),
      tglBatas: formatDateToString(getDateFromToday(-7).year, getDateFromToday(-7).month, getDateFromToday(-7).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      jmlHariTerlambat: 2,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form NSFR Individual - Utama", fileUrl: "/reports/APO003_form1.pdf" },
        { id: 2, namaForm: "Form NSFR Individual - Detail", fileUrl: "/reports/APO003_form2.pdf" }
      ]
    },
    {
      id: "APO004",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Syariah",
      bidangLJK: "Bank Umum Syariah",
      namaLaporan: "Laporan GWM Konsolidasi",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-6).year, getDateFromToday(-6).month, getDateFromToday(-6).day),
      tglBatas: formatDateToString(getDateFromToday(-8).year, getDateFromToday(-8).month, getDateFromToday(-8).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      jmlHariTerlambat: 3,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form GWM Konsolidasi", fileUrl: "/reports/APO004_form1.pdf" }
      ]
    },
    {
      id: "APO005",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Rasio Keuangan",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-7).year, getDateFromToday(-7).month, getDateFromToday(-7).day),
      tglBatas: formatDateToString(getDateFromToday(-9).year, getDateFromToday(-9).month, getDateFromToday(-9).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-3).year, getDateFromToday(-3).month, getDateFromToday(-3).day),
      jmlHariTerlambat: 4,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Rasio Keuangan", fileUrl: "/reports/APO005_form1.pdf" }
      ]
    },
    {
      id: "APO006",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Syariah",
      bidangLJK: "Bank Umum Syariah",
      namaLaporan: "Laporan GWM Individual",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-8).year, getDateFromToday(-8).month, getDateFromToday(-8).day),
      tglBatas: formatDateToString(getDateFromToday(-10).year, getDateFromToday(-10).month, getDateFromToday(-10).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-4).year, getDateFromToday(-4).month, getDateFromToday(-4).day),
      jmlHariTerlambat: 5,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form GWM Individual - Utama", fileUrl: "/reports/APO006_form1.pdf" }
      ]
    },
    {
      id: "APO007",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan AL/NCD",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-11).year, getDateFromToday(-11).month, getDateFromToday(-11).day),
      tglBatas: formatDateToString(getDateFromToday(-11).year, getDateFromToday(-11).month, getDateFromToday(-11).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-5).year, getDateFromToday(-5).month, getDateFromToday(-5).day),
      jmlHariTerlambat: 0,
      statusKeterlambatan: "tepat_waktu",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form AL/NCD - Utama", fileUrl: "/reports/APO007_form1.pdf" },
        { id: 2, namaForm: "Form AL/NCD - Detail", fileUrl: "/reports/APO007_form2.pdf" }
      ]
    },
    
    // === SUDAH MELEWATI 5 HARI (Negative Confirmation) ===
    {
      id: "APO008",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Dana Pihak Ketiga",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-12).year, getDateFromToday(-12).month, getDateFromToday(-12).day),
      tglBatas: formatDateToString(getDateFromToday(-14).year, getDateFromToday(-14).month, getDateFromToday(-14).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-11).year, getDateFromToday(-11).month, getDateFromToday(-11).day),
      jmlHariTerlambat: 7,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form DPK - Utama", fileUrl: "/reports/APO008_form1.pdf" }
      ]
    },
    
    // === TEPAT WAKTU ===
    {
      id: "APO009",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Syariah",
      bidangLJK: "Bank Umum Syariah",
      namaLaporan: "Laporan Transaksi Valas",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      tglBatas: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      jmlHariTerlambat: 0,
      statusKeterlambatan: "tepat_waktu",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Transaksi Valas", fileUrl: "/reports/APO009_form1.pdf" }
      ]
    },
    {
      id: "APO010",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Kredit Konsumsi",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      tglBatas: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(0).year, getDateFromToday(0).month, getDateFromToday(0).day),
      jmlHariTerlambat: 0,
      statusKeterlambatan: "tepat_waktu",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Kredit Konsumsi", fileUrl: "/reports/APO010_form1.pdf" }
      ]
    },
    
    // === BELUM LAPOR ===
    {
      id: "APO011",
      aplikasi: "APOLO",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Bulanan BU",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: null,
      tglBatas: formatDateToString(getDateFromToday(-3).year, getDateFromToday(-3).month, getDateFromToday(-3).day),
      tglRilisValidasi: null,
      jmlHariTerlambat: 0,
      statusKeterlambatan: "belum_lapor",
      statusPengiriman: "Belum Lapor",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Laporan Bulanan", fileUrl: null }
      ]
    }
  ];

  // Data eReporting - SEMUA PERIODE APRIL 2026
  const eReportingData = [
    // === MENUNGGU VALIDASI ===
    {
      id: "ERP001",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Bulanan Bank Umum",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-3).year, getDateFromToday(-3).month, getDateFromToday(-3).day),
      tglBatas: formatDateToString(getDateFromToday(-5).year, getDateFromToday(-5).month, getDateFromToday(-5).day),
      tglRilisValidasi: null,
      jmlHariTerlambat: "Menunggu Validasi",
      statusKeterlambatan: "Menunggu Validasi",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Bulanan - Neraca", fileUrl: "/reports/ERP001_form1.pdf" },
        { id: 2, namaForm: "Form Bulanan - Laba Rugi", fileUrl: "/reports/ERP001_form2.pdf" }
      ]
    },
    
    // === SUDAH DIVALIDASI - MASIH DALAM MASA SANGAH ===
    {
      id: "ERP002",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Syariah",
      bidangLJK: "Bank Umum Syariah",
      namaLaporan: "Laporan Pembiayaan Syariah",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-4).year, getDateFromToday(-4).month, getDateFromToday(-4).day),
      tglBatas: formatDateToString(getDateFromToday(-6).year, getDateFromToday(-6).month, getDateFromToday(-6).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      jmlHariTerlambat: 2,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Pembiayaan Syariah", fileUrl: "/reports/ERP002_form1.pdf" }
      ]
    },
    {
      id: "ERP003",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Kredit Bulanan",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-5).year, getDateFromToday(-5).month, getDateFromToday(-5).day),
      tglBatas: formatDateToString(getDateFromToday(-7).year, getDateFromToday(-7).month, getDateFromToday(-7).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      jmlHariTerlambat: 3,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Kredit Bulanan", fileUrl: "/reports/ERP003_form1.pdf" }
      ]
    },
    // ERP004 - SUDAH MENYANGAH DAN SEDANG DIREVIEW
    {
      id: "ERP004",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Kredit UMKM",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-6).year, getDateFromToday(-6).month, getDateFromToday(-6).day),
      tglBatas: formatDateToString(getDateFromToday(-8).year, getDateFromToday(-8).month, getDateFromToday(-8).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-3).year, getDateFromToday(-3).month, getDateFromToday(-3).day),
      jmlHariTerlambat: 4,
      statusKeterlambatan: "terlambat",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Kredit UMKM", fileUrl: "/reports/ERP004_form1.pdf" }
      ]
    },
    
    // === SUDAH MELEWATI 5 HARI ===
    {
      id: "ERP005",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan GWM Bulanan",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-10).year, getDateFromToday(-10).month, getDateFromToday(-10).day),
      tglBatas: formatDateToString(getDateFromToday(-12).year, getDateFromToday(-12).month, getDateFromToday(-12).day),
      tglRilisValidasi: "Menuggu validasi", 
      jmlHariTerlambat: "Menunggu Validasi",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form GWM - Utama", fileUrl: "/reports/ERP005_form1.pdf" },
        { id: 2, namaForm: "Form GWM - Detail", fileUrl: "/reports/ERP005_form2.pdf" }
      ]
    },
    
    // === TEPAT WAKTU ===
    {
      id: "ERP006",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Syariah",
      bidangLJK: "Bank Umum Syariah",
      namaLaporan: "Laporan Likuiditas Syariah",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(+1).year, getDateFromToday(+1).month, getDateFromToday().day),
      tglBatas: formatDateToString(getDateFromToday(0).year, getDateFromToday(0).month, getDateFromToday(0).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(0).year, getDateFromToday(0).month, getDateFromToday(0).day),
      jmlHariTerlambat: 0,
      statusKeterlambatan: "tepat_waktu",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Likuiditas Syariah", fileUrl: "/reports/ERP006_form1.pdf" }
      ]
    },
    {
      id: "ERP007",
      aplikasi: "eReporting",
      jenisLJK: "Bank Umum Konvensional",
      bidangLJK: "Bank Umum Konvensional",
      namaLaporan: "Laporan Kualitas Kredit",
      periodeLaporan: `April ${currentYear}`,
      tglUpload: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      tglBatas: formatDateToString(getDateFromToday(-2).year, getDateFromToday(-2).month, getDateFromToday(-2).day),
      tglRilisValidasi: formatDateToString(getDateFromToday(-1).year, getDateFromToday(-1).month, getDateFromToday(-1).day),
      jmlHariTerlambat: 0,
      statusKeterlambatan: "tepat_waktu",
      statusPengiriman: "Berhasil",
      disputeStatus: null,
      acknowledged: false,
      detailForms: [
        { id: 1, namaForm: "Form Kualitas Kredit", fileUrl: "/reports/ERP007_form1.pdf" }
      ]
    }
  ];

  return [...apoloData, ...eReportingData];
}, [currentDateTime]);

  // Inisialisasi data dispute untuk ERP004 (sudah menyanggah dan sedang review)
  useEffect(() => {
    const savedDisputes = localStorage.getItem('apolo_disputes_v6');
    let disputes = savedDisputes ? JSON.parse(savedDisputes) : {};
    
    // Jika belum ada dispute untuk ERP004, tambahkan dengan status review
    if (!disputes['ERP004']) {
      const currentYear = currentDateTime.getFullYear();
      disputes['ERP004'] = {
        id: "ERP004",
        jenisLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Kredit UMKM",
        periodeLaporan: `April ${currentYear}`,
        alasanKeterlambatan: "Terdapat kendala teknis pada sistem eReporting sehingga menyebabkan keterlambatan upload data. Kami sudah mengirimkan surat penjelasan resmi yang ditandatangani Direksi. Mohon untuk dapat dipertimbangkan.",
        filePendukung: "surat_sanggahan_ERP004_direksi.pdf",
        status: 'review',
        createdAt: new Date().toISOString(),
        sistemLateDays: 4,
        acknowledgedLateDays: 4,
        tglRilisValidasi: "2026-04-05",
        reviewNote: "Sanggahan sedang dalam proses review oleh pengawas. Mohon menunggu keputusan selanjutnya."
      };
      
      setDisputeData(disputes);
      saveDisputeToLocalStorage(disputes);
    }
  }, []);

  // Fungsi untuk menghitung hari sejak rilis validasi
  const getDaysSinceRelease = (releaseDate) => {
    if (!releaseDate) return null;
    const release = new Date(releaseDate);
    const now = new Date();
    const diffTime = now - release;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Fungsi untuk menghitung sisa waktu batas sanggah (maksimal 5 hari sejak rilis)
  const getRemainingDays = (releaseDate) => {
    if (!releaseDate) return null;
    const daysSince = getDaysSinceRelease(releaseDate);
    if (daysSince === null) return null;
    const remaining = Math.max(0, 5 - daysSince);
    return remaining;
  };

  // Fungsi untuk mengecek status laporan
  const getReportStatus = (report) => {
    // Cek dispute data terlebih dahulu
    const dispute = disputeData[report.id];
    
    if (dispute) {
      if (dispute.status === 'pending') return 'pending_dispute';
      if (dispute.status === 'accepted') return 'accepted';
      if (dispute.status === 'rejected') {
        if (dispute.acknowledged) return 'acknowledged';
        return 'rejected';
      }
      if (dispute.status === 'review') return 'under_review';
      if (dispute.acknowledged) return 'acknowledged';
    }
    
    if (report.acknowledged) return 'acknowledged';
    
    // Status berdasarkan keterlambatan
    if (report.statusKeterlambatan === 'tepat_waktu') return 'on_time';
    if (report.statusKeterlambatan === 'belum_lapor') return 'not_submitted';
    if (report.statusKeterlambatan === 'Menunggu Validasi') return 'waiting_validation';
    
    // Untuk status terlambat
    if (report.statusKeterlambatan === 'terlambat') {
      if (!report.tglRilisValidasi) return 'waiting_validation';
      
      const daysSince = getDaysSinceRelease(report.tglRilisValidasi);
      
      if (daysSince <= 5) {
        return 'can_respond';
      } else {
        return 'negative_confirmation';
      }
    }
    
    return 'unknown';
  };

  // Proses data reports dengan filter tanggal
  const reportsWithPeriod = useMemo(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    const processed = initialReports.map(report => {
      const deadlineDate = new Date(report.tglBatas);
      
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      const dispute = disputeData[report.id];
      let disputeStatus = report.disputeStatus;
      let finalLateDays = report.jmlHariTerlambat;
      let finalStatus = report.statusKeterlambatan;
      let acknowledged = report.acknowledged;
      let reportStatus = getReportStatus(report);
      
      if (dispute) {
        disputeStatus = dispute.status;
        acknowledged = dispute.acknowledged || false;
        if (dispute.status === 'accepted') {
          finalLateDays = 0;
          finalStatus = 'tepat_waktu';
        } else if (dispute.status === 'rejected') {
          finalLateDays = report.jmlHariTerlambat;
          finalStatus = 'terlambat';
        } else if (dispute.status === 'pending') {
          finalStatus = 'terlambat';
          reportStatus = 'pending_dispute';
        } else if (dispute.status === 'review') {
          finalStatus = 'terlambat';
          reportStatus = 'under_review';
        }
      }
      
      let finalLabel = '';
      let lateDaysInfo = '';
      let remainingDays = null;
      
      if (finalStatus === 'tepat_waktu') {
        finalLabel = 'Tepat Waktu';
        lateDaysInfo = '0 Hari';
      } else if (finalStatus === 'belum_lapor') {
        finalLabel = 'Belum Lapor';
        lateDaysInfo = 'Belum Lapor';
      } else if (reportStatus === 'waiting_validation') {
        finalLabel = `${report.jmlHariTerlambat} Hari (Menunggu Validasi)`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Menunggu validasi pengawas`;
      } else if (reportStatus === 'pending_dispute') {
        finalLabel = `${report.jmlHariTerlambat} Hari (Dalam Validasi)`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Sanggahan dalam proses validasi`;
      } else if (reportStatus === 'under_review') {
        finalLabel = `${report.jmlHariTerlambat} Hari (Sedang Direview)`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Sanggahan sedang direview oleh pengawas`;
      } else if (reportStatus === 'accepted') {
        finalLabel = 'Tepat Waktu';
        lateDaysInfo = '0 Hari (Sanggahan Diterima)';
      } else if (reportStatus === 'acknowledged') {
        finalLabel = `${report.jmlHariTerlambat} Hari Terlambat (Dikonfirmasi)`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Telah dikonfirmasi LJK`;
      } else if (reportStatus === 'negative_confirmation') {
        finalLabel = `${report.jmlHariTerlambat} Hari Terlambat (Negative Confirmation)`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Melewati batas sanggah (5 hari)`;
      } else if (reportStatus === 'can_respond') {
        finalLabel = `${report.jmlHariTerlambat} Hari Terlambat`;
        remainingDays = getRemainingDays(report.tglRilisValidasi);
        lateDaysInfo = `${report.jmlHariTerlambat} Hari - Sisa waktu sanggah: ${remainingDays} hari`;
      } else {
        finalLabel = `${report.jmlHariTerlambat} Hari Terlambat`;
        lateDaysInfo = `${report.jmlHariTerlambat} Hari`;
      }
      
      let statusBadge = '';
      if (finalStatus === 'tepat_waktu') {
        statusBadge = 'Tepat Waktu';
      } else if (finalStatus === 'belum_lapor') {
        statusBadge = 'Belum Lapor';
      } else if (reportStatus === 'waiting_validation') {
        statusBadge = 'Menunggu Validasi';
      } else {
        statusBadge = 'Terlambat';
      }
      
      const formatDateOnlySimple = (date) => {
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
        displayDeadline: formatDateOnlySimple(deadlineDate),
        displaySubmit: report.tglUpload ? formatDateOnlySimple(new Date(report.tglUpload)) : 'Belum submit',
        displayReleaseDate: report.tglRilisValidasi ? formatDateOnlySimple(new Date(report.tglRilisValidasi)) : '-',
        finalLateDays,
        finalStatus,
        finalLabel,
        lateDaysInfo,
        disputeStatus,
        statusBadge,
        acknowledged,
        reportStatus,
        remainingDays: reportStatus === 'can_respond' ? remainingDays : null,
        daysSinceRelease: getDaysSinceRelease(report.tglRilisValidasi),
        canRespond: reportStatus === 'can_respond',
        isNegativeConfirmation: reportStatus === 'negative_confirmation',
        isWaitingValidation: reportStatus === 'waiting_validation',
        isPendingDispute: reportStatus === 'pending_dispute',
        isUnderReview: reportStatus === 'under_review'
      };
    }).filter(report => report !== null);
    
    return processed;
  }, [dateRange, initialReports, disputeData]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredReports = useMemo(() => {
    let filtered = [...reportsWithPeriod];

    if (filters.aplikasi !== 'all') {
      filtered = filtered.filter(report => report.aplikasi === filters.aplikasi);
    }
    
    if (filters.statusKeterlambatan !== 'all') {
      filtered = filtered.filter(report => report.finalStatus === filters.statusKeterlambatan);
    }

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

  const handleOpenAcknowledgeModal = (report) => {
    setSelectedAcknowledgeReport(report);
    setAcknowledgeConfirmation('');
    setShowAcknowledgeModal(true);
  };

  const handleConfirmAcknowledge = () => {
    if (acknowledgeConfirmation !== 'SAYA MENGAKUI KETERLAMBATAN') {
      alert('Harap ketik "SAYA MENGAKUI KETERLAMBATAN" untuk konfirmasi');
      return;
    }
    
    const report = selectedAcknowledgeReport;
    const newDispute = {
      id: report.id,
      jenisLJK: report.jenisLJK,
      namaLaporan: report.namaLaporan,
      periodeLaporan: report.periodeLaporan,
      alasanKeterlambatan: 'Mengakui keterlambatan sesuai ketentuan',
      filePendukung: 'disetujui_ljk',
      status: 'rejected',
      acknowledged: true,
      acknowledgedAt: new Date().toISOString(),
      sistemLateDays: report.jmlHariTerlambat,
      acknowledgedLateDays: report.jmlHariTerlambat,
      tglRilisValidasi: report.tglRilisValidasi
    };
    
    const updatedDisputes = { ...disputeData, [report.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowAcknowledgeModal(false);
    setSelectedAcknowledgeReport(null);
    setAcknowledgeConfirmation('');
    
    alert(`Anda telah mengakui keterlambatan ${report.jmlHariTerlambat} hari. Status tetap Terlambat.`);
  };

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
    
    const randomValue = Math.random();
    let status;
    let statusMessage;
    
    if (randomValue < 0.33) {
      status = 'accepted';
      statusMessage = 'Sanggahan diterima! Status laporan menjadi Tepat Waktu.';
    } else if (randomValue < 0.66) {
      status = 'rejected';
      statusMessage = 'Sanggahan ditolak. Status laporan tetap Terlambat.';
    } else {
      status = 'review';
      statusMessage = 'Sanggahan sedang direview. Status akan diupdate setelah ada keputusan dari pengawas.';
    }
    
    const newDispute = {
      id: selectedReportForDispute.id,
      jenisLJK: disputeForm.jenisLJK,
      namaLaporan: disputeForm.namaLaporan,
      periodeLaporan: disputeForm.periodeLaporan,
      alasanKeterlambatan: disputeForm.alasanKeterlambatan,
      filePendukung: disputeForm.filePendukung.name,
      status: status,
      createdAt: new Date().toISOString(),
      sistemLateDays: selectedReportForDispute.jmlHariTerlambat,
      acknowledgedLateDays: status === 'accepted' ? 0 : selectedReportForDispute.jmlHariTerlambat,
      tglRilisValidasi: selectedReportForDispute.tglRilisValidasi,
      reviewNote: status === 'review' ? 'Sanggahan dalam proses review oleh pengawas' : null
    };
    
    const updatedDisputes = { ...disputeData, [selectedReportForDispute.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowDisputeModal(false);
    setSelectedReportForDispute(null);
    
    alert(statusMessage);
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
    } else if (statusBadge === 'Menunggu Validasi') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">⏳ Menunggu Validasi</span>;
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
          {report.disputeStatus === 'accepted' && (
            <div className="text-xs text-green-500">
              Sanggahan diterima
            </div>
          )}
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
    } else if (report.isWaitingValidation) {
      return (
        <div className="text-sm">
          <div className="text-gray-600 font-medium">
            {report.jmlHariTerlambat} Hari
          </div>
          <div className="text-xs text-gray-500">
            Menunggu Validasi Pengawas
          </div>
        </div>
      );
    } else if (report.isPendingDispute) {
      return (
        <div className="text-sm">
          <div className="text-orange-600 font-medium">
            {report.jmlHariTerlambat} Hari
          </div>
          <div className="text-xs text-orange-500">
            Sanggahan Dalam Validasi
          </div>
          <div className="text-xs text-gray-500">
            Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    } else if (report.isUnderReview) {
      return (
        <div className="text-sm">
          <div className="text-blue-600 font-medium">
            {report.jmlHariTerlambat} Hari
          </div>
          <div className="text-xs text-blue-500">
            Sanggahan Sedang Direview
          </div>
          <div className="text-xs text-gray-500">
            Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    } else if (report.disputeStatus === 'accepted') {
      return (
        <div className="text-sm">
          <div className="text-green-600 font-medium">
            Tepat Waktu
          </div>
          <div className="text-xs text-green-500">
            Sanggahan Diterima
          </div>
        </div>
      );
    } else if (report.acknowledged) {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.jmlHariTerlambat} Hari Terlambat
          </div>
          <div className="text-xs text-gray-500">
            Dikonfirmasi • Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    } else if (report.isNegativeConfirmation) {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.jmlHariTerlambat} Hari Terlambat
          </div>
          <div className="text-xs text-red-500">
            Negative Confirmation • Melewati batas sanggah (5 hari)
          </div>
          <div className="text-xs text-gray-500">
            Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    } else if (report.canRespond) {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.jmlHariTerlambat} Hari Terlambat
          </div>
          <div className="text-xs text-orange-500">
            Sisa waktu sanggah: {report.remainingDays} hari
          </div>
          <div className="text-xs text-gray-500">
            Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.jmlHariTerlambat} Hari Terlambat
          </div>
          <div className="text-xs text-gray-500">
            Rilis: {report.displayReleaseDate}
          </div>
        </div>
      );
    }
  };

  const getConfirmationButton = (report) => {
    if (report.isWaitingValidation) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <Clock className="w-3 h-3 mr-1" />
          Menunggu Validasi
        </span>
      );
    }
    
    if (report.isPendingDispute) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Sanggahan Divalidasi
        </span>
      );
    }
    
    if (report.isUnderReview) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <Hourglass className="w-3 h-3 mr-1" />
          Sedang Direview
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
    
    if (report.disputeStatus === 'rejected' && !report.acknowledged) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Sanggahan Ditolak
        </span>
      );
    }
    
    if (report.acknowledged) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Telah Dikonfirmasi
        </span>
      );
    }
    
    if (report.isNegativeConfirmation) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Negative Confirmation
        </span>
      );
    }
    
    if (report.canRespond) {
      return (
        <button
          onClick={() => handleOpenConfirmModal(report)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-200 transition-colors"
          title="Konfirmasi Keterlambatan"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          Konfirmasi Keterlambatan
        </button>
      );
    }
    
    if (report.finalStatus === 'tepat_waktu') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200">
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
      'Tgl Rilis Validasi': report.displayReleaseDate,
      'Status': report.statusBadge,
      'Jml Hari Terlambat': report.finalLabel,
      'Konfirmasi': report.disputeStatus === 'accepted' ? 'Sanggahan Diterima' : 
                     report.disputeStatus === 'rejected' && !report.acknowledged ? 'Sanggahan Ditolak' :
                     report.isUnderReview ? 'Sanggahan Sedang Direview' :
                     report.isPendingDispute === 'Sanggahan Divalidasi' ? 'Sanggahan Diterima' : 
                     report.acknowledged ? 'Telah Dikonfirmasi' :
                     report.isNegativeConfirmation ? 'Negative Confirmation' :
                     report.canRespond ? 'Dapat Konfirmasi' : 
                     report.isWaitingValidation ? 'Menunggu Validasi' :
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

  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem Monitoring Absensi {currentDateTime.getFullYear()}</h1>
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
                      {formatDateOnly(dateRange.startDate)} - {formatDateOnly(dateRange.endDate)}
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
                        Periode: {formatDateOnly(dateRange.startDate)} - {formatDateOnly(dateRange.endDate)}
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
                      Daftar Laporan APOLO, eReporting
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 truncate">
                        Periode: <span className="font-medium">{formatDateOnly(dateRange.startDate)}</span> - <span className="font-medium">{formatDateOnly(dateRange.endDate)}</span>
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
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Jenis LJK</p>
                                <p className="text-sm font-medium text-gray-900">{report.jenisLJK}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Bidang LJK</p>
                                <p className="text-sm font-medium text-gray-900">{report.bidangLJK}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Tgl Rilis Validasi</p>
                                <p className="text-sm font-medium text-gray-900">{report.displayReleaseDate}</p>
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

      {/* Confirm Modal */}
      {showConfirmModal && selectedConfirmReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-900">Konfirmasi Keterlambatan</h3>
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
                    <p className="mt-1">Tanggal Rilis Validasi: {selectedConfirmReport.displayReleaseDate}</p>
                    <p className="mt-1">Sisa waktu sanggah: {selectedConfirmReport.remainingDays} hari</p>
                    <p className="mt-1 font-medium">Pilih salah satu opsi di bawah ini:</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    handleOpenAcknowledgeModal(selectedConfirmReport);
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

      {/* Acknowledge Modal */}
      {showAcknowledgeModal && selectedAcknowledgeReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Konfirmasi Pengakuan Keterlambatan</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Laporan: {selectedAcknowledgeReport.namaLaporan}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium">Pernyataan Persetujuan:</p>
                    <p className="mt-1">Dengan ini saya menyatakan SETUJU bahwa:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                      <li>Laporan terlambat {selectedAcknowledgeReport.jmlHariTerlambat} hari</li>
                      <li>Jumlah hari keterlambatan tersebut sudah sesuai dengan ketentuan yang berlaku</li>
                      <li>Status tetap "Terlambat" dan tidak dapat disanggah lagi</li>
                      <li>Keputusan ini bersifat final dan mengikat</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ketik <span className="font-bold text-red-600">"SAYA MENGAKUI KETERLAMBATAN"</span> untuk konfirmasi:
                </label>
                <input
                  type="text"
                  value={acknowledgeConfirmation}
                  onChange={(e) => setAcknowledgeConfirmation(e.target.value)}
                  placeholder="SAYA MENGAKUI KETERLAMBATAN"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAcknowledgeModal(false);
                  setSelectedAcknowledgeReport(null);
                  setAcknowledgeConfirmation('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmAcknowledge}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Setuju & Konfirmasi</span>
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Rilis Validasi</h4>
                  <p className="text-gray-900">{selectedReport.displayReleaseDate}</p>
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

              {/* History Sanggahan */}
              {(() => {
                const dispute = disputeData[selectedReport.id];
                if (dispute) {
                  const isUnderReview = dispute.status === 'review';
                  const isPending = dispute.status === 'pending';
                  const isAccepted = dispute.status === 'accepted';
                  const isRejected = dispute.status === 'rejected';
                  
                  let statusColor = '';
                  let statusIcon = null;
                  let statusText = '';
                  
                  if (isUnderReview) {
                    statusColor = 'border-blue-200 bg-blue-50';
                    statusIcon = <Hourglass className="w-5 h-5 text-blue-600" />;
                    statusText = 'Sedang Direview';
                  } else if (isPending) {
                    statusColor = 'border-orange-200 bg-orange-50';
                    statusIcon = <Clock className="w-5 h-5 text-orange-600" />;
                    statusText = 'Dalam Validasi';
                  } else if (isAccepted) {
                    statusColor = 'border-green-200 bg-green-50';
                    statusIcon = <CheckCircle className="w-5 h-5 text-green-600" />;
                    statusText = 'Diterima';
                  } else {
                    statusColor = 'border-red-200 bg-red-50';
                    statusIcon = <XCircle className="w-5 h-5 text-red-600" />;
                    statusText = 'Ditolak';
                  }
                  
                  return (
                    <div className={`border rounded-xl p-5 ${statusColor}`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <History className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-gray-900">History Sanggahan</h4>
                          <p className="text-xs text-gray-500">Riwayat pengajuan sanggahan keterlambatan</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-3">
                            {statusIcon}
                            <div>
                              <p className="text-sm font-medium text-gray-900">Status Sanggahan</p>
                              <p className={`text-sm font-semibold ${
                                isUnderReview ? 'text-blue-600' : 
                                isPending ? 'text-orange-600' : 
                                isAccepted ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {statusText}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Tanggal Pengajuan</p>
                            <p className="text-sm font-medium text-gray-900">{formatDateDisplay(dispute.createdAt)}</p>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-white rounded-lg border border-gray-100">
                          <p className="text-sm font-medium text-gray-700 mb-1">Alasan Keterlambatan</p>
                          <p className="text-sm text-gray-600">{dispute.alasanKeterlambatan}</p>
                        </div>
                        
                        <div className="p-3 bg-white rounded-lg border border-gray-100">
                          <p className="text-sm font-medium text-gray-700 mb-1">File Pendukung</p>
                          <p className="text-sm text-blue-600">{dispute.filePendukung}</p>
                        </div>
                        
                        {isAccepted && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm font-medium text-green-800">✓ Sanggahan Diterima</p>
                            <p className="text-xs text-green-700 mt-1">Status laporan berubah menjadi Tepat Waktu</p>
                          </div>
                        )}
                        
                        {isRejected && (
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-sm font-medium text-red-800">✗ Sanggahan Ditolak</p>
                            <p className="text-xs text-red-700 mt-1">Status laporan tetap Terlambat</p>
                          </div>
                        )}
                        
                        {isUnderReview && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-800">⏳ Sanggahan Sedang Direview</p>
                            <p className="text-xs text-blue-700 mt-1">Status akan diupdate setelah ada keputusan dari pengawas</p>
                          </div>
                        )}
                        
                        {isPending && (
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-sm font-medium text-orange-800">⏳ Sanggahan Dalam Validasi</p>
                            <p className="text-xs text-orange-700 mt-1">Sedang dalam proses validasi oleh pengawas</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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