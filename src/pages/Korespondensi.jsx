import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  Mail,
  Filter,
  Megaphone,
  Calendar,
  Download,
  Bookmark,
  ChevronRight,
  X,
  Eye,
  Share2,
  Printer,
  FileText,
  User,
  Clock as ClockIcon,
  Tag,
  Check,
  AlertTriangle,
  Zap,
  Shield,
  Smartphone,
  Database,
  Lock,
  Award,
  Users,
  Phone,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate, useLocation } from 'react-router-dom';

// Komponen untuk konten detail pengumuman
const AnnouncementDetailContent = ({ announcement }) => {
  switch (announcement.id) {
    case 1:
      return (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Kementerian Keuangan telah merilis panduan terbaru untuk penggunaan sistem e-Reporting tahun 2024. 
            Panduan ini dirancang untuk memudahkan proses pelaporan dan meningkatkan efisiensi kerja Anda.
          </p>
          
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Fitur Baru yang Diperkenalkan
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Real-time Data Validation:</strong>
                  <p className="text-blue-700">Sistem sekarang dapat memvalidasi data secara real-time sebelum submit, mengurangi kesalahan input.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Auto-Save Feature:</strong>
                  <p className="text-blue-700">Data tersimpan otomatis setiap 5 menit untuk mencegah kehilangan data akibat gangguan koneksi.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Enhanced Security:</strong>
                  <p className="text-blue-700">Enkripsi end-to-end untuk semua data sensitif dengan sertifikasi keamanan tingkat tinggi.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Mobile Responsive:</strong>
                  <p className="text-blue-700">Interface yang dioptimalkan untuk perangkat mobile dengan performa yang lebih cepat.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Perubahan Penting
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-green-800 mb-2">Format Laporan</h4>
                <p className="text-green-700 text-sm">Mengikuti PSAK terbaru dengan template yang lebih intuitif.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-green-800 mb-2">Integrasi Sistem</h4>
                <p className="text-green-700 text-sm">Koneksi langsung dengan sistem perbankan terintegrasi.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-green-800 mb-2">Template Otomatis</h4>
                <p className="text-green-700 text-sm">Generate template otomatis untuk laporan rutin bulanan/tahunan.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-green-800 mb-2">Dashboard Analytics</h4>
                <p className="text-green-700 text-sm">Dashboard analitik yang lebih interaktif dengan grafik real-time.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-yellow-900 mb-3 text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Hal-hal yang Perlu Diperhatikan
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800">
                  <strong>Deadline laporan triwulan pertama:</strong> 15 April 2024
                </span>
              </li>
              <li className="flex items-center">
                <Users className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800">
                  <strong>Training online:</strong> Akan diadakan setiap minggu via Zoom
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800">
                  <strong>Support team:</strong> Tersedia 24/7 melalui helpdesk
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-5 rounded-xl border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">Kontak Support</h3>
            <p className="text-red-800">
              Untuk pertanyaan lebih lanjut, silakan hubungi tim support kami:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="font-medium text-red-700">Email:</p>
                <p className="text-red-600">helpdesk@kemenkeu.go.id</p>
              </div>
              <div>
                <p className="font-medium text-red-700">Telepon:</p>
                <p className="text-red-600">(021) 12345678 (ext. 1234)</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Dengan hormat, kami mengundang seluruh pengguna sistem APOLO untuk mengikuti Workshop Nasional 
            yang bertujuan untuk meningkatkan pemahaman dan keterampilan dalam menggunakan sistem APOLO secara optimal.
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Detail Acara Workshop
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Tanggal Pelaksanaan</p>
                    <p className="text-gray-700">20 Januari 2025</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Waktu Pelaksanaan</p>
                    <p className="text-gray-700">08.00 - 17.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Kuota Peserta</p>
                    <p className="text-gray-700">Maksimal 200 orang</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Lokasi Acara</p>
                    <p className="text-gray-700">
                      Grand Ballroom Hotel Indonesia Kempinski<br/>
                      Jl. M.H. Thamrin No.1, Jakarta Pusat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">📋 Jadwal Materi Workshop</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-800">Sesi 1: Advanced Reporting</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">08.00-10.00</span>
                </div>
                <p className="text-blue-700 text-sm">Teknik pelaporan lanjutan dan best practices</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-800">Sesi 2: Data Analytics</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">10.30-12.30</span>
                </div>
                <p className="text-blue-700 text-sm">Integrasi analitik data dan visualisasi</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-800">Sesi 3: Troubleshooting</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">13.30-15.30</span>
                </div>
                <p className="text-blue-700 text-sm">Pemecahan masalah umum dan solusi</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-800">Sesi 4: Q&A Session</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">16.00-17.00</span>
                </div>
                <p className="text-blue-700 text-sm">Tanya jawab langsung dengan tim developer</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-900 mb-3 text-lg">💰 Biaya Pendaftaran</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-800">Early Bird (s/d 31 Des 2024)</span>
                  <span className="font-bold text-green-900">Rp 500.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-800">Regular (1-15 Jan 2025)</span>
                  <span className="font-bold text-green-900">Rp 750.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-800">On-spot Registration</span>
                  <span className="font-bold text-green-900">Rp 1.000.000</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-green-700">
                *Biaya termasuk: Lunch, coffee break, sertifikat, materi workshop, dan merchandise
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-900 mb-3 text-lg">🏆 Fasilitas Peserta</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Award className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-purple-800">Sertifikat resmi Kemenkeu</span>
                </li>
                <li className="flex items-center">
                  <FileText className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-purple-800">Modul workshop lengkap</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-purple-800">Networking session</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-purple-800">Akses premium ke materi online</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">📞 Informasi Pendaftaran</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-blue-800">Website Resmi:</p>
                <a href="#" className="text-blue-600 hover:underline">training.apolo.go.id/workshop2025</a>
              </div>
              <div>
                <p className="font-medium text-blue-800">Email Panitia:</p>
                <a href="mailto:workshop@apolo.go.id" className="text-blue-600 hover:underline">workshop@apolo.go.id</a>
              </div>
              <div>
                <p className="font-medium text-blue-800">Telepon:</p>
                <p className="text-blue-700">021-12345678 ext. 456</p>
              </div>
              <div>
                <p className="font-medium text-blue-800">WhatsApp:</p>
                <p className="text-blue-700">0812-3456-7890</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-blue-700">
              Pendaftaran dibuka mulai 1 Desember 2024. Kuota terbatas, pastikan mendaftar segera!
            </p>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Dengan bangga kami umumkan peluncuran SIPINA v3.0! Versi terbaru ini membawa revolusi 
            dalam pengalaman pengguna dengan berbagai fitur canggih dan peningkatan performa signifikan.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Fitur Utama SIPINA v3.0
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-800">AI Assistant</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Asisten AI cerdas untuk membantu analisis data, generate report otomatis, 
                  dan memberikan rekomendasi optimasi.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-blue-800">Advanced Analytics</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Dashboard analytics dengan visualisasi data real-time, predictive analysis, 
                  dan customizable reports.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <Lock className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-bold text-red-800">Enhanced Security</h4>
                </div>
                <p className="text-red-700 text-sm">
                  Multi-factor authentication, enkripsi tingkat militer, audit trail lengkap, 
                  dan proteksi data end-to-end.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-purple-800">Mobile App</h4>
                </div>
                <p className="text-purple-700 text-sm">
                  Aplikasi mobile native untuk iOS dan Android dengan semua fitur desktop, 
                  offline mode, dan push notification.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">🔄 Panduan Migrasi v3.0</h3>
            <div className="space-y-4">
              <div className="flex items-start bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">Backup Data</h4>
                  <p className="text-blue-700 text-sm">
                    Backup semua data sebelum update. Tool backup otomatis tersedia di dashboard admin.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">System Requirements</h4>
                  <p className="text-blue-700 text-sm">
                    Minimum: 4GB RAM, Windows 10/macOS 11+, 2GB storage. Recommended: 8GB RAM, SSD storage.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">Jadwal Downtime</h4>
                  <p className="text-blue-700 text-sm">
                    Sistem akan offline pada 15 Januari 2024 pukul 00.00-04.00 WIB untuk maintenance.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">Training Gratis</h4>
                  <p className="text-blue-700 text-sm">
                    Free training akan diadakan pada 18-20 Januari 2024 secara online dan offline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-3 text-lg">📞 Technical Support</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-yellow-800">Email Support:</p>
                  <p className="text-yellow-700">support@sipina.go.id</p>
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Hotline 24/7:</p>
                  <p className="text-yellow-700">021-87654321</p>
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Live Chat:</p>
                  <p className="text-yellow-700">Tersedia di website resmi</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-900 mb-3 text-lg">🎓 Training Inquiry</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-purple-800">Email Training:</p>
                  <p className="text-purple-700">training@sipina.go.id</p>
                </div>
                <div>
                  <p className="font-medium text-purple-800">Telepon:</p>
                  <p className="text-purple-700">021-87654322</p>
                </div>
                <div>
                  <p className="font-medium text-purple-800">Website:</p>
                  <a href="#" className="text-purple-600 hover:underline">training.sipina.go.id</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">⏰ Timeline Rilis</h3>
            <div className="flex items-center justify-between mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-green-600">15 Jan</span>
                </div>
                <p className="text-sm font-medium">Rilis v3.0</p>
              </div>
              <div className="flex-1 h-1 bg-green-200 mx-4"></div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-blue-600">18-20 Jan</span>
                </div>
                <p className="text-sm font-medium">Training</p>
              </div>
              <div className="flex-1 h-1 bg-green-200 mx-4"></div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-purple-600">31 Jan</span>
                </div>
                <p className="text-sm font-medium">Support Phase 1</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Pengumuman detail sedang dalam proses pembaruan. Silakan hubungi administrator untuk informasi lebih lanjut.
          </p>
          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-yellow-900 mb-2">Informasi Sementara</h3>
            <p className="text-yellow-800">
              Konten detail untuk pengumuman ini akan segera tersedia. Terima kasih atas pengertiannya.
            </p>
          </div>
        </div>
      );
  }
};

const Korespondensi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Determine active tab from URL
  const activeTab = location.pathname.includes('pengumuman') ? 'pengumuman' : 'notifikasi';
  
  // Sample data untuk notifikasi (view-only)
  const notifications = [
    {
      id: 1,
      title: "Laporan APOLO Berhasil Dikirim",
      message: "Laporan Keuangan Q1 2023 telah berhasil dikirim dan diverifikasi oleh sistem APOLO.",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      category: "apolo"
    },
    {
      id: 2,
      title: "Deadline Laporan e-Reporting Mendekati",
      message: "Deadline laporan e-Reporting triwulanan tinggal 3 hari lagi. Silakan segera selesaikan.",
      type: "warning",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      category: "ereporting"
    },
    {
      id: 3,
      title: "Laporan SIPINA Ditolak",
      message: "Laporan SIPINA Anda ditolak karena data tidak lengkap. Silakan perbaiki dan kirim ulang.",
      type: "danger",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: false,
      category: "sipina"
    },
    {
      id: 4,
      title: "Update Sistem APOLO v2.5",
      message: "Versi terbaru sistem APOLO v2.5 telah dirilis dengan berbagai perbaikan performa.",
      type: "info",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      category: "apolo"
    },
    {
      id: 5,
      title: "Verifikasi e-Reporting Selesai",
      message: "Proses verifikasi laporan e-Reporting Anda telah selesai dengan status sukses.",
      type: "success",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      category: "ereporting"
    }
  ];

  // Sample data untuk pengumuman
  const announcements = [
    {
      id: 1,
      title: "Panduan Baru e-Reporting 2024",
      shortMessage: "Panduan lengkap untuk penggunaan sistem e-Reporting tahun 2024 telah tersedia untuk diunduh.",
      category: "ereporting",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-10'),
      author: "Tim Pengembangan e-Reporting",
      tags: ["Panduan", "Update Sistem", "2024"],
      attachments: [
        { name: "Panduan Lengkap e-Reporting 2024.pdf", size: "2.4 MB" },
        { name: "Template Laporan.xlsx", size: "1.2 MB" },
        { name: "FAQ e-Reporting 2024.pdf", size: "1.8 MB" }
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      important: true,
      views: 1250,
      downloadCount: 842
    },
    {
      id: 2,
      title: "Workshop APOLO Nasional 2025",
      shortMessage: "Workshop nasional penggunaan sistem APOLO akan diselenggarakan di Jakarta pada 20 Januari 2025.",
      category: "apolo",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-05'),
      author: "Tim APOLO Nasional",
      tags: ["Workshop", "Training", "Networking"],
      attachments: [
        { name: "Jadwal Workshop APOLO.pdf", size: "850 KB" },
        { name: "Formulir Pendaftaran.docx", size: "120 KB" }
      ],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop",
      important: true,
      views: 890,
      downloadCount: 567
    },
    {
      id: 3,
      title: "Update Fitur SIPINA v3.0",
      shortMessage: "SIPINA telah menambah fitur baru untuk pelaporan yang lebih efisien dan akurat.",
      category: "sipina",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-03'),
      author: "Tim Pengembangan SIPINA",
      tags: ["Update", "Fitur Baru", "v3.0"],
      attachments: [
        { name: "Release Notes SIPINA v3.0.pdf", size: "3.2 MB" },
        { name: "User Manual v3.0.pdf", size: "5.1 MB" },
        { name: "Migration Guide.pdf", size: "1.5 MB" },
        { name: "System Requirements.pdf", size: "980 KB" }
      ],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      important: false,
      views: 1560,
      downloadCount: 1203
    },
    {
      id: 4,
      title: "Maintenance Sistem IRS",
      shortMessage: "Akan ada maintenance sistem IRS pada Minggu, 12 Januari 2025 pukul 00:00 - 04:00 WIB.",
      category: "system",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-02'),
      author: "Tim IT IRS",
      tags: ["Maintenance", "Downtime", "Update"],
      attachments: [
        { name: "Maintenance Schedule.pdf", size: "1.1 MB" }
      ],
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab284?w=800&h=400&fit=crop",
      important: false,
      views: 720,
      downloadCount: 310
    },
    {
      id: 5,
      title: "Pelatihan Online APOLO Gratis",
      shortMessage: "Pelatihan online gratis untuk pengguna APOLO pemula setiap hari Kamis pukul 14.00 WIB.",
      category: "apolo",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-01'),
      author: "APOLO Training Team",
      tags: ["Training", "Online", "Gratis"],
      attachments: [
        { name: "Training Schedule 2024.pdf", size: "2.1 MB" },
        { name: "Training Materials.zip", size: "15.4 MB" },
        { name: "Registration Form.docx", size: "95 KB" }
      ],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
      important: true,
      views: 2100,
      downloadCount: 1540
    }
  ];

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    if (categoryFilter !== 'all' && announcement.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantAnnouncements = announcements.filter(a => a.important).length;

  const getTypeIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      warning: <Clock className="w-5 h-5 text-yellow-500" />,
      danger: <AlertCircle className="w-5 h-5 text-red-600" />,
      info: <Info className="w-5 h-5 text-blue-500" />,
    };
    return icons[type] || <Bell className="w-5 h-5 text-gray-500" />;
  };

  const getCategoryBadge = (category) => {
    const styles = {
      apolo: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200',
      ereporting: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200',
      sipina: 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200',
      system: 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200',
    };
    
    const labels = {
      apolo: 'APOLO',
      ereporting: 'E-REPORTING',
      sipina: 'SIPINA',
      system: 'SISTEM IRS',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-800 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      danger: 'bg-red-100 text-red-800 border border-red-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200',
    };
    
    const labels = {
      success: 'Sukses',
      warning: 'Peringatan',
      danger: 'Penting',
      info: 'Informasi',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m lalu`;
    if (diffHours < 24) return `${diffHours}j lalu`;
    if (diffDays < 7) return `${diffDays}h lalu`;
    return format(timestamp, 'dd MMM yyyy', { locale: id });
  };

  const formatFullDate = (date) => {
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  };

  // Handler untuk mengganti tab
  const handleTabChange = (tab) => {
    if (tab === 'notifikasi') {
      navigate('/korespondensi/notifikasi');
    } else {
      navigate('/korespondensi/pengumuman');
    }
  };

  // Handler untuk melihat detail pengumuman
  const handleViewDetail = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  // Handler untuk download
  const handleDownload = (e, announcement) => {
    e.stopPropagation();
    // Logic untuk download
    console.log('Download announcement:', announcement.title);
    alert(`Mengunduh: ${announcement.title}`);
  };

  // Handler untuk bookmark
  const handleBookmark = (e, announcement) => {
    e.stopPropagation();
    // Logic untuk bookmark
    console.log('Bookmark announcement:', announcement.title);
    alert(`Pengumuman "${announcement.title}" telah disimpan!`);
  };

  // Handler untuk share
  const handleShare = (e, announcement) => {
    e.stopPropagation();
    // Logic untuk share
    console.log('Share announcement:', announcement.title);
    alert(`Berbagi pengumuman: ${announcement.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-900">Korespondensi</h1>
                <p className="text-red-600 text-sm">Notifikasi dan pengumuman sistem</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Notifikasi</p>
                </div>
                <Bell className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-sm text-gray-600 mt-1">Belum Dibaca</p>
                </div>
                <div className="relative">
                  <Mail className="w-8 h-8 text-red-500" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Pengumuman</p>
                </div>
                <Megaphone className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{importantAnnouncements}</p>
                  <p className="text-sm text-gray-600 mt-1">Pengumuman Penting</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden mb-8">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-red-100">
            <button
              onClick={() => handleTabChange('notifikasi')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'notifikasi'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifikasi</span>
              {unreadCount > 0 && activeTab !== 'notifikasi' && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleTabChange('pengumuman')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'pengumuman'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <Megaphone className="w-5 h-5" />
              <span>Pengumuman</span>
              {importantAnnouncements > 0 && activeTab !== 'pengumuman' && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {importantAnnouncements}
                </span>
              )}
            </button>
          </div>

          {/* Filter Section */}
          <div className="p-6 border-b border-red-100 bg-red-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-700">Filter Kategori:</span>
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900 text-sm"
              >
                <option value="all">Semua Kategori</option>
                <option value="apolo">APOLO</option>
                <option value="ereporting">E-REPORTING</option>
                <option value="sipina">SIPINA</option>
                <option value="system">Sistem IRS</option>
              </select>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {activeTab === 'notifikasi' ? (
              /* Notifikasi List - View Only */
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`bg-gradient-to-br from-white to-red-50 rounded-xl border ${
                        notification.read ? 'border-red-100' : 'border-red-200'
                      } p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${
                          notification.read ? 'bg-red-50' : 'bg-red-100'
                        }`}>
                          {getTypeIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900">
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 text-sm">
                              <Calendar className="w-3 h-3" />
                              <span>{formatTimeAgo(notification.timestamp)}</span>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-red-100">
                            {getTypeBadge(notification.type)}
                            {getCategoryBadge(notification.category)}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak ada notifikasi</h3>
                    <p className="text-gray-600 text-sm">
                      Tidak ada notifikasi yang sesuai dengan filter yang dipilih.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Pengumuman List dengan Detail Modal */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`bg-white rounded-xl border ${
                        announcement.important ? 'border-red-200 shadow-md' : 'border-red-100'
                      } overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
                      onClick={() => handleViewDetail(announcement)}
                    >
                      {/* Gambar dengan Overlay */}
                      <div className="h-48 bg-red-100 relative overflow-hidden">
                        <img 
                          src={announcement.image} 
                          alt={announcement.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23fee2e2'/%3E%3Ctext x='400' y='200' text-anchor='middle' font-family='Arial' font-size='24' fill='%23dc2626'%3E${announcement.category.toUpperCase()}%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {announcement.important && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                            ⚠️ PENTING
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Category & Date */}
                        <div className="flex items-center justify-between mb-3">
                          {getCategoryBadge(announcement.category)}
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimeAgo(announcement.timestamp)}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                          {announcement.title}
                        </h3>

                        {/* Short Message */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {announcement.shortMessage}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {announcement.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-3 text-gray-500 text-xs">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{announcement.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span>{announcement.downloadCount.toLocaleString()}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button 
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110"
                              title="Simpan"
                              onClick={(e) => handleBookmark(e, announcement)}
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Megaphone className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak ada pengumuman</h3>
                    <p className="text-gray-600 text-sm">
                      Tidak ada pengumuman yang sesuai dengan filter yang dipilih.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-lg font-bold mb-1">Informasi Korespondensi</h4>
              <p className="text-red-100 text-sm">
                {activeTab === 'notifikasi' 
                  ? 'Notifikasi bersifat real-time dan otomatis dari sistem'
                  : 'Klik pada pengumuman untuk melihat detail lengkap'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-red-100">
              <p>Data diperbarui secara otomatis</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Klik pada pengumuman untuk melihat detail lengkap. Untuk informasi lebih lanjut hubungi administrator.
          </p>
        </div>
      </div>

      {/* Modal Detail Pengumuman */}
      {isModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Megaphone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-600 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {selectedAnnouncement.author}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatFullDate(selectedAnnouncement.publishDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6">
                {/* Hero Image */}
                <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                  <img 
                    src={selectedAnnouncement.image} 
                    alt={selectedAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {getCategoryBadge(selectedAnnouncement.category)}
                    {selectedAnnouncement.important && (
                      <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full">
                        ⚠️ PENTING
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedAnnouncement.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <Eye className="w-3 h-3 mr-1" />
                      Views
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.downloadCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <Download className="w-3 h-3 mr-1" />
                      Downloads
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.attachments.length}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <FileText className="w-3 h-3 mr-1" />
                      Lampiran
                    </div>
                  </div>
                </div>

                {/* Full Content - MENGGUNAKAN KOMPONEN REACT */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                    Deskripsi Lengkap
                  </h3>
                  <AnnouncementDetailContent announcement={selectedAnnouncement} />
                </div>

                {/* Attachments */}
                {selectedAnnouncement.attachments.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Lampiran ({selectedAnnouncement.attachments.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedAnnouncement.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-red-500 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => handleDownload(e, selectedAnnouncement)}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                          >
                            Unduh
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    ID: {selectedAnnouncement.id} • {formatTimeAgo(selectedAnnouncement.timestamp)}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={(e) => handleBookmark(e, selectedAnnouncement)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Simpan
                    </button>
                    <button 
                      onClick={(e) => handleShare(e, selectedAnnouncement)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Bagikan
                    </button>
                    <button 
                      onClick={(e) => handleDownload(e, selectedAnnouncement)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Unduh Semua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Korespondensi;