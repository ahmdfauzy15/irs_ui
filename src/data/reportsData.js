export const apoloReportsData = [
  { id: 1, jenis: "Laporan Keuangan Q1", jenisValue: "keuangan", periode: "Januari - Maret 2023", periodeValue: "q1", tanggal: "15 April 2023", deadline: "30 April 2023", status: "berhasil", sistem: "APOLO" },
  { id: 2, jenis: "Laporan Kinerja Tahunan", jenisValue: "kinerja", periode: "2022", periodeValue: "2022", tanggal: "5 Maret 2023", deadline: "31 Maret 2023", status: "terlambat", sistem: "APOLO" },
  { id: 3, jenis: "Laporan Audit Internal", jenisValue: "audit", periode: "Semester II 2022", periodeValue: "q3", tanggal: "20 Februari 2023", deadline: "15 Maret 2023", status: "tidak-berhasil", sistem: "APOLO" },
  { id: 4, jenis: "Laporan Keuangan Q4", jenisValue: "keuangan", periode: "Oktober - Desember 2022", periodeValue: "q4", tanggal: "10 Januari 2023", deadline: "31 Januari 2023", status: "berhasil", sistem: "APOLO" },
  { id: 5, jenis: "Laporan Kepatuhan Regulasi", jenisValue: "kepatuhan", periode: "2022", periodeValue: "2022", tanggal: "28 Desember 2022", deadline: "15 Januari 2023", status: "berhasil", sistem: "APOLO" },
  { id: 6, jenis: "Laporan Keuangan Q2", jenisValue: "keuangan", periode: "April - Juni 2023", periodeValue: "q2", tanggal: "15 Juli 2023", deadline: "31 Juli 2023", status: "terlambat", sistem: "APOLO" },
  { id: 7, jenis: "Laporan Operasional Bulanan", jenisValue: "kinerja", periode: "Juni 2023", periodeValue: "q2", tanggal: "5 Juli 2023", deadline: "10 Juli 2023", status: "berhasil", sistem: "APOLO" },
  { id: 8, jenis: "Laporan Audit Eksternal", jenisValue: "audit", periode: "2022", periodeValue: "2022", tanggal: "15 Februari 2023", deadline: "28 Februari 2023", status: "tidak-berhasil", sistem: "APOLO" },
  { id: 9, jenis: "Laporan Likuiditas Triwulan", jenisValue: "keuangan", periode: "Januari - Maret 2023", periodeValue: "q1", tanggal: "10 April 2023", deadline: "20 April 2023", status: "berhasil", sistem: "APOLO" },
  { id: 10, jenis: "Laporan Manajemen Risiko", jenisValue: "kepatuhan", periode: "2022", periodeValue: "2022", tanggal: "30 Januari 2023", deadline: "15 Februari 2023", status: "berhasil", sistem: "APOLO" },
  { id: 11, jenis: "Laporan GCG", jenisValue: "kepatuhan", periode: "2022", periodeValue: "2022", tanggal: "25 Februari 2023", deadline: "10 Maret 2023", status: "terlambat", sistem: "APOLO" },
  { id: 12, jenis: "Laporan Keberlanjutan", jenisValue: "kinerja", periode: "2022", periodeValue: "2022", tanggal: "15 Maret 2023", deadline: "30 Maret 2023", status: "berhasil", sistem: "APOLO" },
  { id: 13, jenis: "Laporan Keuangan Q3", jenisValue: "keuangan", periode: "Juli - September 2023", periodeValue: "q3", tanggal: "12 Oktober 2023", deadline: "31 Oktober 2023", status: "berhasil", sistem: "APOLO" },
  { id: 14, jenis: "Laporan Operasional Bulanan", jenisValue: "kinerja", periode: "Juli 2023", periodeValue: "q3", tanggal: "8 Agustus 2023", deadline: "15 Agustus 2023", status: "terlambat", sistem: "APOLO" },
  { id: 15, jenis: "Laporan Audit Internal", jenisValue: "audit", periode: "Q1 2023", periodeValue: "q1", tanggal: "18 Mei 2023", deadline: "31 Mei 2023", status: "berhasil", sistem: "APOLO" },
];

export const homeReportsData = [
  { id: 1, jenis: "Laporan Keuangan Q1 2023", sistem: "APOLO", periode: "Januari - Maret 2023", tanggal: "15 April 2023", status: "berhasil" },
  { id: 2, jenis: "E-Reporting Tahunan 2022", sistem: "E-REPORTING", periode: "2022", tanggal: "28 Februari 2023", status: "terlambat" },
  { id: 3, jenis: "Laporan Sanksi Administratif", sistem: "SIPINA", periode: "Semester I 2023", tanggal: "15 Juli 2023", status: "berhasil" },
  { id: 4, jenis: "Laporan Audit Internal", sistem: "APOLO", periode: "2022", tanggal: "20 Februari 2023", status: "tidak-berhasil" },
  { id: 5, jenis: "E-Reporting Triwulan III", sistem: "E-REPORTING", periode: "Juli - September 2023", tanggal: "10 Oktober 2023", status: "berhasil" }
];

export const welcomeStats = [
  { number: 24, label: "Laporan Aktif", icon: "FileText", color: "text-blue-500" },
  { number: 18, label: "Terselesaikan", icon: "CheckCircle", color: "text-green-500" },
  { number: 5, label: "Dalam Proses", icon: "Clock", color: "text-yellow-500" },
];

export const quickAccessCards = [
  {
    title: "APOLO",
    description: "Aplikasi Pelaporan Online yang dikembangkan oleh Otoritas Jasa Keuangan (OJK) untuk melayani Lembaga Jasa Keuangan (LJK) dalam menyampaikan kewajiban pelaporan secara daring.",
    reports: 12,
    color: "apolo",
    link: "https://pelaporan.id/Account/Login"
  },
  {
    title: "E-Reporting",
    description: "Sistem pelaporan elektronik yang digunakan oleh emiten atau perusahaan publik untuk menyampaikan laporan secara elektronik kepada Otoritas Jasa Keuangan.",
    reports: 8,
    color: "ereporting",
    link: "https://pelaporan.id/Account/Login"
  },
  {
    title: "SIPINA",
    description: "Laporan informasi nasabah asing disampaikan secara daring melalui sistem penyampaian informasi nasabah asing",
    reports: 4,
    color: "sipina",
    link: "https://pelaporan.id/Account/Login"
  }
];