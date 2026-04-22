//APOLO LJK - Fixed Version
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
  // Fungsi untuk mendapatkan waktu saat ini di WIB
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  // State untuk waktu real-time
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [disputeData, setDisputeData] = useState({});
  const [disputeFormData, setDisputeFormData] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedConfirmReport, setSelectedConfirmReport] = useState(null);
  const [showDisputeFormModal, setShowDisputeFormModal] = useState(false);
  const [selectedReportForDisputeForm, setSelectedReportForDisputeForm] = useState(null);
  const [disputeFormInput, setDisputeFormInput] = useState({
    alasanKeterlambatan: '',
    filePendukung: null
  });
  
  // State untuk periode tanggal - filter berdasarkan 30 hari kebelakang dari current date
  const [dateRange, setDateRange] = useState(() => {
    const currentDate = getCurrentWIBTime();
    const endDate = new Date(currentDate);
    endDate.setHours(0, 0, 0, 0);
    
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);
    
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  });
  
  // State untuk filter
  const [filters, setFilters] = useState({
    aplikasi: 'all',
    status: 'all'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  // Load dispute data from localStorage
  useEffect(() => {
    const savedDisputes = localStorage.getItem('apolo_disputes_v7');
    if (savedDisputes) {
      setDisputeData(JSON.parse(savedDisputes));
    }
    const savedDisputeForms = localStorage.getItem('apolo_dispute_forms_v7');
    if (savedDisputeForms) {
      setDisputeFormData(JSON.parse(savedDisputeForms));
    }
  }, []);

  // Save dispute data to localStorage
  const saveDisputeToLocalStorage = (disputes) => {
    localStorage.setItem('apolo_disputes_v7', JSON.stringify(disputes));
  };

  const saveDisputeFormToLocalStorage = (forms) => {
    localStorage.setItem('apolo_dispute_forms_v7', JSON.stringify(forms));
  };

  // Update waktu real-time WIB setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
      
      // Update date range untuk selalu 30 hari kebelakang
      const currentDate = getCurrentWIBTime();
      const newEndDate = new Date(currentDate);
      newEndDate.setHours(0, 0, 0, 0);
      
      const newStartDate = new Date(currentDate);
      newStartDate.setDate(newStartDate.getDate() - 30);
      newStartDate.setHours(0, 0, 0, 0);
      
      setDateRange({
        startDate: newStartDate.toISOString().split('T')[0],
        endDate: newEndDate.toISOString().split('T')[0]
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper function untuk menghitung selisih hari
  const daysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function untuk menghitung hari kerja (Senin-Jumat)
  const getWorkingDaysBetween = (startDate, endDate) => {
    let count = 0;
    const current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  // Helper function untuk mendapatkan tanggal expiry (5 hari kerja)
  const getExpiryDate = (startDate) => {
    const expiry = new Date(startDate);
    let daysAdded = 0;
    while (daysAdded < 5) {
      expiry.setDate(expiry.getDate() + 1);
      if (expiry.getDay() !== 0 && expiry.getDay() !== 6) {
        daysAdded++;
      }
    }
    return expiry;
  };

  // Helper function untuk mendapatkan sisa hari kerja
  const getRemainingWorkingDays = (expiryDate) => {
    const now = new Date();
    if (now > expiryDate) return 0;
    
    let remaining = 0;
    const current = new Date(now);
    current.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    
    while (current <= expiry) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        remaining++;
      }
      current.setDate(current.getDate() + 1);
    }
    return remaining;
  };

  // Data reports statis
  const initialReports = useMemo(() => {
    const reports = [
      // LAPOR (A <= B)
      {
        id: "APO001",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "LCR Individual",
        tglUpload: "2026-04-10",
        tglBatas: "2026-04-15",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form LCR Individual - Laporan Utama", fileUrl: "/reports/APO001_form1.pdf" }
        ]
      },
      // TERLAMBAT (A > B)
      {
        id: "APO002",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "LCR Konsolidasi",
        tglUpload: "2026-04-20",
        tglBatas: "2026-04-15",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form LCR Konsolidasi - Laporan Utama", fileUrl: "/reports/APO002_form1.pdf" }
        ]
      },
      // TERLAMBAT 3 hari
      {
        id: "APO006",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Syariah",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan GWM Individual",
        tglUpload: "2026-04-18",
        tglBatas: "2026-04-15",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form GWM Individual - Utama", fileUrl: "/reports/APO006_form1.pdf" }
        ]
      },
      // BELUM LAPOR (A = null, B < C)
      {
        id: "APO010",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Bulanan BU",
        tglUpload: null,
        tglBatas: "2026-04-10",
        statusPengiriman: "Belum Lapor",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Bulanan", fileUrl: null }
        ]
      },
      // TIDAK LAPOR (C > D) - sudah lewat 30 hari dari deadline
      {
        id: "APO015",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Triwulanan",
        tglUpload: null,
        tglBatas: "2026-03-15",
        statusPengiriman: "Tidak Lapor",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Triwulanan", fileUrl: null }
        ]
      },
      // LAPOR tepat waktu
      {
        id: "APO012",
        aplikasi: "APOLO",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Kualitas Aset",
        tglUpload: "2026-04-08",
        tglBatas: "2026-04-10",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form Kualitas Aset", fileUrl: "/reports/APO012_form1.pdf" }
        ]
      },
      // BELUM LAPOR lainnya
      {
        id: "APO016",
        aplikasi: "APOLO",
        jenisLJK: "Bank Perkreditan Rakyat",
        bidangLJK: "BPR",
        namaLaporan: "Laporan Bulanan BPR",
        tglUpload: null,
        tglBatas: "2026-04-05",
        statusPengiriman: "Belum Lapor",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Bulanan BPR", fileUrl: null }
        ]
      }
    ];

    // Data eReporting (TIDAK BISA MENYANGGAH)
    const eReportingData = [
      {
        id: "ERP003",
        aplikasi: "eReporting",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan GWM Bulanan",
        tglUpload: "2026-04-12",
        tglBatas: "2026-04-15",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form GWM - Utama", fileUrl: "/reports/ERP003_form1.pdf" }
        ]
      },
      {
        id: "ERP005",
        aplikasi: "eReporting",
        jenisLJK: "Bank Umum Konvensional",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Kredit Bulanan",
        tglUpload: "2026-04-19",
        tglBatas: "2026-04-15",
        statusPengiriman: "Berhasil",
        disputeStatus: null,
        disputeExpiryDate: null,
        detailForms: [
          { id: 1, namaForm: "Form Kredit Bulanan", fileUrl: "/reports/ERP005_form1.pdf" }
        ]
      }
    ];

    return [...reports, ...eReportingData];
  }, []);

  // Fungsi untuk menghitung status berdasarkan aturan
  const calculateStatus = (report, currentDate, disputeInfo = null) => {
    const uploadDate = report.tglUpload ? new Date(report.tglUpload) : null;
    const deadlineDate = new Date(report.tglBatas);
    const systemDate = new Date(currentDate);
    
    // Reset time to midnight for comparison
    deadlineDate.setHours(0, 0, 0, 0);
    systemDate.setHours(0, 0, 0, 0);
    if (uploadDate) uploadDate.setHours(0, 0, 0, 0);
    
    // Hitung tanggal dinyatakan tidak lapor (30 hari setelah deadline)
    const declaredDate = new Date(deadlineDate);
    declaredDate.setDate(declaredDate.getDate() + 30);
    declaredDate.setHours(0, 0, 0, 0);
    
    // Cek dispute status
    if (disputeInfo) {
      if (disputeInfo.status === 'accepted') {
        return {
          finalStatus: disputeInfo.acceptedStatus === 'tepat_waktu' ? 'tepat_waktu' : 'terlambat',
          lateDays: disputeInfo.acceptedLateDays || 0,
          statusBadge: disputeInfo.acceptedStatus === 'tepat_waktu' ? 'Lapor' : 'Terlambat',
          finalLabel: disputeInfo.acceptedStatus === 'tepat_waktu' ? 'Lapor' : `${disputeInfo.acceptedLateDays} Hari Terlambat`,
          disputeStatus: 'accepted',
          originalLateDays: disputeInfo.originalLateDays
        };
      } else if (disputeInfo.status === 'rejected') {
        // Sanggahan ditolak - hitung ulang status
        if (uploadDate && uploadDate > deadlineDate) {
          const lateDays = daysBetween(deadlineDate, uploadDate);
          let status = 'terlambat';
          let badge = 'Terlambat';
          let label = `${lateDays} Hari Terlambat`;
          
          // Cek apakah sudah menjadi Tidak Lapor (lebih dari 30 hari)
          if (!uploadDate && systemDate > declaredDate) {
            status = 'tidak_lapor';
            badge = 'Tidak Lapor';
            label = 'Tidak Lapor';
          } else if (!uploadDate && deadlineDate < systemDate) {
            status = 'belum_lapor';
            badge = 'Belum Lapor';
            label = 'Belum Lapor';
          } else if (uploadDate && uploadDate <= deadlineDate) {
            status = 'tepat_waktu';
            badge = 'Lapor';
            label = 'Lapor';
          }
          
          return {
            finalStatus: status,
            lateDays: lateDays,
            statusBadge: badge,
            finalLabel: label,
            disputeStatus: 'rejected',
            originalLateDays: disputeInfo.originalLateDays
          };
        }
      } else if (disputeInfo.status === 'pending_review') {
        return {
          finalStatus: 'pending_review',
          lateDays: disputeInfo.originalLateDays,
          statusBadge: 'Menunggu Review',
          finalLabel: `${disputeInfo.originalLateDays} Hari (Dalam Review)`,
          disputeStatus: 'pending_review',
          originalLateDays: disputeInfo.originalLateDays
        };
      } else if (disputeInfo.status === 'pending_form') {
        const now = new Date();
        const startDate = new Date(disputeInfo.disputeStartDate);
        const expiryDate = new Date(disputeInfo.disputeExpiryDate);
        
        if (now > expiryDate) {
          // Lewat masa sanggahan, jadi Negative Confirmation -> status tetap terlambat
          return {
            finalStatus: 'terlambat',
            lateDays: disputeInfo.originalLateDays,
            statusBadge: 'Terlambat',
            finalLabel: `${disputeInfo.originalLateDays} Hari Terlambat`,
            disputeStatus: 'expired',
            originalLateDays: disputeInfo.originalLateDays,
            isNegativeConfirmation: true
          };
        }
        
        const remainingDays = getRemainingWorkingDays(expiryDate);
        
        return {
          finalStatus: 'pending_form',
          lateDays: disputeInfo.originalLateDays,
          statusBadge: 'Menunggu Form Sanggahan',
          finalLabel: `${disputeInfo.originalLateDays} Hari (Sisa ${remainingDays} Hari)`,
          disputeStatus: 'pending_form',
          disputeExpiryDate: expiryDate,
          remainingWorkingDays: remainingDays,
          originalLateDays: disputeInfo.originalLateDays
        };
      }
    }
    
    // Aturan status berdasarkan data asli
    // 1. Lapor: A <= B
    if (uploadDate && uploadDate <= deadlineDate) {
      return {
        finalStatus: 'tepat_waktu',
        lateDays: 0,
        statusBadge: 'Lapor',
        finalLabel: 'Lapor',
        disputeStatus: null,
        originalLateDays: 0
      };
    }
    
    // 2. Terlambat: A > B
    if (uploadDate && uploadDate > deadlineDate) {
      const lateDays = daysBetween(deadlineDate, uploadDate);
      return {
        finalStatus: 'terlambat',
        lateDays: lateDays,
        statusBadge: 'Terlambat',
        finalLabel: `${lateDays} Hari Terlambat`,
        disputeStatus: null,
        originalLateDays: lateDays
      };
    }
    
    // 3. Tidak Lapor: C > D (lebih dari 30 hari setelah deadline)
    if (!uploadDate && systemDate > declaredDate) {
      return {
        finalStatus: 'tidak_lapor',
        lateDays: null,
        statusBadge: 'Tidak Lapor',
        finalLabel: 'Tidak Lapor',
        disputeStatus: null,
        originalLateDays: null
      };
    }
    
    // 4. Belum Lapor: A = null; B < C (masih dalam 30 hari)
    if (!uploadDate && deadlineDate < systemDate) {
      return {
        finalStatus: 'belum_lapor',
        lateDays: null,
        statusBadge: 'Belum Lapor',
        finalLabel: 'Belum Lapor',
        disputeStatus: null,
        originalLateDays: null
      };
    }
    
    // Default: Belum Lapor
    if (!uploadDate) {
      return {
        finalStatus: 'belum_lapor',
        lateDays: null,
        statusBadge: 'Belum Lapor',
        finalLabel: 'Belum Lapor',
        disputeStatus: null,
        originalLateDays: null
      };
    }
    
    return {
      finalStatus: 'tepat_waktu',
      lateDays: 0,
      statusBadge: 'Lapor',
      finalLabel: 'Lapor',
      disputeStatus: null,
      originalLateDays: 0
    };
  };

  // Cek apakah bisa melakukan sanggahan (hanya untuk APOLO dan status Terlambat)
  const canDispute = (report, calculatedStatus) => {
    // HANYA APOLO yang bisa menyanggah
    if (report.aplikasi !== "APOLO") return false;
    if (report.statusPengiriman !== "Berhasil") return false;
    if (calculatedStatus.finalStatus !== "terlambat") return false;
    if (calculatedStatus.lateDays <= 0) return false;
    if (calculatedStatus.disputeStatus === 'accepted') return false;
    if (calculatedStatus.disputeStatus === 'rejected') return false;
    if (calculatedStatus.disputeStatus === 'pending_review') return false;
    if (calculatedStatus.disputeStatus === 'expired') return false;
    
    const disputeInfo = disputeData[report.id];
    if (disputeInfo && disputeInfo.status === 'pending_form') return false;
    if (disputeInfo && disputeInfo.status === 'pending_review') return false;
    
    return true;
  };

  // Cek apakah form sanggahan tersedia
  const hasDisputeFormAvailable = (report) => {
    const disputeInfo = disputeData[report.id];
    // HANYA APOLO yang punya form sanggahan
    if (report.aplikasi !== "APOLO") return false;
    return disputeInfo && disputeInfo.status === 'pending_form' && !disputeInfo.formSubmitted;
  };

  // Proses data reports dengan filter tanggal
  const reportsWithPeriod = useMemo(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    const systemDate = new Date(currentDateTime);
    systemDate.setHours(0, 0, 0, 0);

    const processed = initialReports.map(report => {
      const deadlineDate = new Date(report.tglBatas);
      deadlineDate.setHours(0, 0, 0, 0);
      
      // Cek apakah deadline dalam range tanggal yang dipilih
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      // Dapatkan data sanggahan
      const dispute = disputeData[report.id];
      const calculated = calculateStatus(report, systemDate, dispute);
      
      // Format tanggal untuk display
      const formatDateOnly = (date) => {
        if (!date) return 'Belum ada';
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Tanggal tidak valid';
        return d.toLocaleDateString('id-ID', {
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
        finalStatus: calculated.finalStatus,
        lateDays: calculated.lateDays,
        finalLabel: calculated.finalLabel,
        disputeStatus: calculated.disputeStatus,
        statusBadge: calculated.statusBadge,
        originalLateDays: calculated.originalLateDays,
        canDispute: canDispute(report, calculated),
        hasDisputeForm: hasDisputeFormAvailable(report),
        disputeExpiryDate: calculated.disputeExpiryDate,
        remainingWorkingDays: calculated.remainingWorkingDays,
        isNegativeConfirmation: calculated.isNegativeConfirmation
      };
    }).filter(report => report !== null);
    
    return processed;
  }, [dateRange, initialReports, disputeData, currentDateTime]);

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
    
    // Filter status (hanya 4 status: Lapor, Terlambat, Belum Lapor, Tidak Lapor)
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.finalStatus === filters.status);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.namaLaporan.toLowerCase().includes(term) ||
        report.jenisLJK.toLowerCase().includes(term) ||
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
      { value: 'tepat_waktu', label: 'Lapor' },
      { value: 'terlambat', label: 'Terlambat' },
      { value: 'belum_lapor', label: 'Belum Lapor' },
      { value: 'tidak_lapor', label: 'Tidak Lapor' }
    ];
  };

  // Hitung stats
  const stats = useMemo(() => {
    const total = reportsWithPeriod.length;
    const tepatWaktu = reportsWithPeriod.filter(r => r.finalStatus === 'tepat_waktu').length;
    const terlambat = reportsWithPeriod.filter(r => r.finalStatus === 'terlambat').length;
    const belumLapor = reportsWithPeriod.filter(r => r.finalStatus === 'belum_lapor').length;
    const tidakLapor = reportsWithPeriod.filter(r => r.finalStatus === 'tidak_lapor').length;
    
    return {
      total,
      tepatWaktu,
      terlambat,
      belumLapor,
      tidakLapor
    };
  }, [reportsWithPeriod]);

  const resetFilters = () => {
    const currentDate = getCurrentWIBTime();
    const endDate = new Date(currentDate);
    endDate.setHours(0, 0, 0, 0);
    
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);
    
    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
    
    setFilters({
      aplikasi: 'all',
      status: 'all'
    });
    setSearchTerm('');
    setSelectedReport(null);
  };

  // Handle open confirm modal (untuk Konfirmasi Keterlambatan)
  const handleOpenConfirmModal = (report) => {
    setSelectedConfirmReport(report);
    setShowConfirmModal(true);
  };

  // Handle mengakui keterlambatan
  const handleConfirmLate = (report) => {
    const newDispute = {
      id: report.id,
      status: 'rejected',
      acknowledged: true,
      originalLateDays: report.originalLateDays,
      acknowledgedLateDays: report.originalLateDays,
      createdAt: new Date().toISOString(),
      acknowledgedAt: new Date().toISOString()
    };
    
    const updatedDisputes = { ...disputeData, [report.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowConfirmModal(false);
    setSelectedConfirmReport(null);
    
    alert(`Anda mengakui keterlambatan ${report.originalLateDays} hari. Status tetap Terlambat.`);
  };

  // Handle mulai proses sanggahan
  const handleStartDispute = (report) => {
    // Mulai proses sanggahan dengan waktu 5 hari kerja
    const startDate = new Date();
    const expiryDate = getExpiryDate(startDate);
    
    const newDispute = {
      id: report.id,
      status: 'pending_form',
      originalLateDays: report.originalLateDays,
      disputeStartDate: startDate.toISOString(),
      disputeExpiryDate: expiryDate.toISOString(),
      formSubmitted: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedDisputes = { ...disputeData, [report.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowConfirmModal(false);
    setSelectedConfirmReport(null);
    
    alert(`Sanggahan dimulai. Anda memiliki waktu 5 hari kerja (7 hari kalender) untuk mengisi form sanggahan. Batas waktu: ${expiryDate.toLocaleDateString('id-ID')}`);
  };

  // Handle open dispute form modal
  const handleOpenDisputeForm = (report) => {
    setSelectedReportForDisputeForm(report);
    setDisputeFormInput({
      alasanKeterlambatan: '',
      filePendukung: null
    });
    setShowDisputeFormModal(true);
  };

  // Handle submit dispute form
  const handleDisputeFormSubmit = () => {
    if (!disputeFormInput.alasanKeterlambatan) {
      alert('Harap isi alasan keterlambatan');
      return;
    }
    
    if (!disputeFormInput.filePendukung) {
      alert('Harap upload surat pendukung yang ditandatangani direksi');
      return;
    }
    
    // Random decision untuk sanggahan (50% diterima, 50% ditolak)
    const randomDecision = Math.random();
    const isAccepted = randomDecision < 0.5;
    
    // Random untuk pengurangan hari jika diterima (0 - originalLateDays)
    let acceptedLateDays = null;
    let acceptedStatus = 'terlambat';
    
    if (isAccepted) {
      // 50% chance jadi 0 hari (tepat waktu), 50% chance berkurang
      const reduceType = Math.random() < 0.5 ? 'zero' : 'reduce';
      if (reduceType === 'zero') {
        acceptedLateDays = 0;
        acceptedStatus = 'tepat_waktu';
      } else {
        // Kurangi jumlah hari (random antara 1 sampai originalLateDays-1)
        const originalDays = selectedReportForDisputeForm.originalLateDays;
        if (originalDays > 1) {
          acceptedLateDays = Math.floor(Math.random() * (originalDays - 1)) + 1;
          acceptedStatus = 'terlambat';
        } else {
          acceptedLateDays = 0;
          acceptedStatus = 'tepat_waktu';
        }
      }
    }
    
    const newDispute = {
      id: selectedReportForDisputeForm.id,
      status: isAccepted ? 'accepted' : 'rejected',
      alasanKeterlambatan: disputeFormInput.alasanKeterlambatan,
      filePendukung: disputeFormInput.filePendukung.name,
      originalLateDays: selectedReportForDisputeForm.originalLateDays,
      acceptedLateDays: acceptedLateDays,
      acceptedStatus: acceptedStatus,
      formSubmitted: true,
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // Save form data
    const updatedForms = { ...disputeFormData, [selectedReportForDisputeForm.id]: disputeFormInput };
    setDisputeFormData(updatedForms);
    saveDisputeFormToLocalStorage(updatedForms);
    
    const updatedDisputes = { ...disputeData, [selectedReportForDisputeForm.id]: newDispute };
    setDisputeData(updatedDisputes);
    saveDisputeToLocalStorage(updatedDisputes);
    
    setShowDisputeFormModal(false);
    setSelectedReportForDisputeForm(null);
    
    let message = '';
    if (isAccepted) {
      if (acceptedStatus === 'tepat_waktu') {
        message = 'Penyampaiaan sanggahan diterima, silahkan menunggu konfirmasi selanjutnya dari pengawas';
      } else {
        message = `Penyampaiaan sanggahan diterima, silahkan menunggu konfirmasi selanjutnya dari pengawas`;
      }
    } else {
      message = 'Penyampaiaan sanggahan diterima, silahkan menunggu konfirmasi selanjutnya dari pengawas';
    }
    alert(message);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDisputeFormInput({ ...disputeFormInput, filePendukung: file });
    }
  };

  const toggleRowExpand = (reportId) => {
    setExpandedRows(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  const getStatusBadge = (statusBadge) => {
    if (statusBadge === 'Lapor') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Lapor</span>;
    } else if (statusBadge === 'Belum Lapor') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Belum Lapor</span>;
    } else if (statusBadge === 'Tidak Lapor') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">Tidak Lapor</span>;
    } else if (statusBadge === 'Menunggu Form Sanggahan') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Menunggu Form Sanggahan</span>;
    } else if (statusBadge === 'Menunggu Review') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Menunggu Review</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Terlambat</span>;
    }
  };

  const getLateDaysDisplay = (report) => {
    if (!report) return null;
    
    if (report.finalStatus === 'tepat_waktu') {
      return (
        <div className="text-sm">
          <div className="text-green-600 font-medium">
            Lapor
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
    } else if (report.finalStatus === 'tidak_lapor') {
      return (
        <div className="text-sm">
          <div className="text-gray-600 font-medium">
            Tidak Lapor
          </div>
        </div>
      );
    } else if (report.finalStatus === 'pending_form') {
      return (
        <div className="text-sm">
          <div className="text-blue-600 font-medium">
            {report.lateDays} Hari
          </div>
          <div className="text-xs text-blue-500">
            Sisa {report.remainingWorkingDays} Hari
          </div>
          <div className="text-xs text-gray-400 mt-1">
            *Perhitungan by system
          </div>
        </div>
      );
    } else if (report.finalStatus === 'pending_review') {
      return (
        <div className="text-sm">
          <div className="text-purple-600 font-medium">
            {report.lateDays} Hari
          </div>
          <div className="text-xs text-purple-500">
            Dalam Review
          </div>
          <div className="text-xs text-gray-400 mt-1">
            *Perhitungan by system
          </div>
        </div>
      );
    } else if (report.finalStatus === 'terlambat') {
      return (
        <div className="text-sm">
          <div className="text-red-600 font-medium">
            {report.lateDays} Hari Terlambat
          </div>
          <div className="text-xs text-gray-400 mt-1">
            *Perhitungan by system
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-sm">
        <div className="text-gray-600 font-medium">
          {report.finalLabel}
        </div>
      </div>
    );
  };

  const getConfirmationButton = (report) => {
    // Negative Confirmation (expired)
    if (report.disputeStatus === 'expired') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-500 text-white border border-gray-600">
          <XCircle className="w-3 h-3 mr-1" />
          Negative Confirmation
        </span>
      );
    }
    
    // Menunggu review
    if (report.finalStatus === 'pending_review') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
          <Clock className="w-3 h-3 mr-1" />
          Menunggu Review
        </span>
      );
    }
    
    // Sanggahan diterima
    if (report.disputeStatus === 'accepted') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Sanggahan Diterima
        </span>
      );
    }
    
    // Sanggahan ditolak
    if (report.disputeStatus === 'rejected') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          Mengakui Sanggahan
        </span>
      );
    }
    
    // Menunggu form sanggahan - Tampilkan tombol "Isi Form Sanggahan"
    if (report.hasDisputeForm) {
      return (
        <button
          onClick={() => handleOpenDisputeForm(report)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-3 h-3 mr-1" />
          Isi Form Sanggahan
        </button>
      );
    }
    
    // Jika bisa melakukan sanggahan (status Terlambat dan APOLO) - tampilkan tombol Konfirmasi Keterlambatan
    if (report.canDispute) {
      return (
        <button
          onClick={() => handleOpenConfirmModal(report)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-600 text-white border border-orange-600 hover:bg-orange-700 transition-colors"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          Konfirmasi Keterlambatan
        </button>
      );
    }
    
    // Jika Lapor
    if (report.finalStatus === 'tepat_waktu') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Lapor
        </span>
      );
    }
    
    // Terlambat tapi tidak bisa sanggah (karena eReporting atau sudah pernah sanggah)
    if (report.finalStatus === 'terlambat') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Terlambat
        </span>
      );
    }
    
    // Tidak Lapor
    if (report.finalStatus === 'tidak_lapor') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <AlertOctagon className="w-3 h-3 mr-1" />
          Tidak Lapor
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
      'Jml Form': report.detailForms.length,
      'Tgl Upload/Penyampaian': report.displaySubmit,
      'Tgl Batas Akhir': report.displayDeadline,
      'Status': report.statusBadge,
      'Jml Hari Terlambat': report.finalLabel
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-irs-${new Date().toISOString().split('T')[0]}.csv`;
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
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Monitoring Absensi IRS</h1>
            <p className="text-gray-600 mt-1">Monitoring Laporan - Total {stats.total} Laporan</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <p className="text-sm text-green-600 font-medium">Lapor</p>
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
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Tidak Lapor</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tidakLapor}</p>
              </div>
              <AlertOctagon className="w-8 h-8 text-gray-500 opacity-50" />
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
                  <p className="text-sm text-gray-600">Pilih rentang tanggal batas akhir (Maksimal 30 hari kebelakang)</p>
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
                    Tanggal Mulai (Batas Akhir)
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Akhir (Batas Akhir)
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
                  Filter Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
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
                      {filters.status !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Status: {getStatusOptions().find(opt => opt.value === filters.status)?.label}
                          <button 
                            onClick={() => handleFilterChange('status', 'all')}
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
                      Daftar Laporan APOLO, eReporting, SIPINA
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 truncate">
                        Periode: <span className="font-medium">{formatDateDisplay(dateRange.startDate)}</span> - <span className="font-medium">{formatDateDisplay(dateRange.endDate)}</span>
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Tanggal:</span> {getCurrentDateDisplay()}
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
                      report.finalStatus === 'belum_lapor' ? 'bg-yellow-50/30' :
                      report.finalStatus === 'tidak_lapor' ? 'bg-gray-50/30' :
                      report.finalStatus === 'pending_form' ? 'bg-blue-50/30' :
                      report.finalStatus === 'pending_review' ? 'bg-purple-50/30' : ''
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
                        <td colSpan="9" className="px-6 py-4">
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
                            {report.disputeExpiryDate && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-xs text-yellow-800">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  Batas pengisian form sanggahan: {report.disputeExpiryDate.toLocaleDateString('id-ID')} (5 hari kerja)
                                </p>
                                {report.remainingWorkingDays && (
                                  <p className="text-xs text-yellow-700 mt-1">
                                    Sisa waktu: {report.remainingWorkingDays} hari
                                  </p>
                                )}
                              </div>
                            )}
                            {report.finalStatus === 'terlambat' && report.originalLateDays && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-800">
                                  <Info className="w-3 h-3 inline mr-1" />
                                  *Perhitungan keterlambatan by system berdasarkan tanggal upload dan tanggal batas akhir
                                </p>
                              </div>
                            )}
                            {report.isNegativeConfirmation && (
                              <div className="mt-3 p-3 bg-gray-100 rounded-lg border border-gray-300">
                                <p className="text-xs text-gray-700">
                                  <AlertOctagon className="w-3 h-3 inline mr-1" />
                                  Negative Confirmation: Anda tidak mengisi form sanggahan dalam 5 hari kerja.
                                </p>
                              </div>
                            )}
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

      {/* Confirm Modal - Konfirmasi Keterlambatan */}
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
                    <p className="mt-1">Keterlambatan: {selectedConfirmReport.originalLateDays} hari</p>
                    <p className="mt-2 text-xs text-yellow-700">
                      *Perhitungan keterlambatan by system berdasarkan tanggal upload dan tanggal batas akhir
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">Pilih salah satu opsi di bawah ini:</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleConfirmLate(selectedConfirmReport)}
                    className="w-full p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mengakui Keterlambatan ({selectedConfirmReport.originalLateDays} Hari)</span>
                  </button>
                  
                  <button
                    onClick={() => handleStartDispute(selectedConfirmReport)}
                    className="w-full p-3 bg-green-100 text-green-700 rounded-lg border border-green-200 hover:bg-green-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Melakukan Sanggahan Keterlambatan</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs text-orange-700">
                  <strong>Disclaimer Sanggahan:</strong> Dengan Anda menyanggah, maka waktu untuk menyanggah adalah 5 hari kerja. 
                  Jika sudah lewat 5 hari kerja dan tidak mengisi form serta upload surat pendukung yang ditandatangani Direksi, 
                  maka status akan menjadi Negative Confirmation (tetap Terlambat).
                </p>
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

      {/* Dispute Form Modal */}
      {showDisputeFormModal && selectedReportForDisputeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-900">Form Sanggahan Keterlambatan</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Laporan: {selectedReportForDisputeForm.namaLaporan}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDisputeFormModal(false)}
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
                    <p className="mt-1 font-medium">Jumlah hari terlambat saat ini: {selectedReportForDisputeForm.originalLateDays} hari</p>
                    <p className="mt-1 text-xs">*Perhitungan keterlambatan by system</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Keterlambatan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    value={disputeFormInput.alasanKeterlambatan}
                    onChange={(e) => setDisputeFormInput({ ...disputeFormInput, alasanKeterlambatan: e.target.value })}
                    placeholder="Jelaskan alasan keterlambatan dengan detail..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Surat Pendukung <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="dispute-file-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="dispute-file-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {disputeFormInput.filePendukung ? disputeFormInput.filePendukung.name : 'Klik untuk upload file'}
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
                  onClick={() => setShowDisputeFormModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDisputeFormSubmit}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Sanggahan</span>
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
              
              {selectedReport.finalStatus === 'terlambat' && selectedReport.originalLateDays && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <Info className="w-3 h-3 inline mr-1" />
                    *Perhitungan keterlambatan by system berdasarkan tanggal upload dan tanggal batas akhir
                  </p>
                </div>
              )}
              
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
                    <span>Konfirmasi Keterlambatan</span>
                  </button>
                )}
                {selectedReport.hasDisputeForm && (
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      handleOpenDisputeForm(selectedReport);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Isi Form Sanggahan</span>
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