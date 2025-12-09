import React from 'react';
import { 
  Info, 
  Users, 
  Shield, 
  RefreshCw, 
  BarChart, 
  Target, 
  Eye,
  Award,
  Globe
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Head of Development', description: 'Bertanggung jawab atas pengembangan sistem dan implementasi teknologi terkini.' },
    { name: 'Jane Smith', role: 'Product Manager', description: 'Mengawasi pengembangan produk dan memastikan kepuasan pengguna.' },
    { name: 'Robert Johnson', role: 'Security Specialist', description: 'Memastikan keamanan sistem dan perlindungan data pengguna.' },
  ];

  const features = [
    { icon: Shield, title: 'Keamanan Terjamin', description: 'Dilengkapi dengan enkripsi end-to-end dan sistem autentikasi multi-faktor untuk melindungi data sensitif.' },
    { icon: RefreshCw, title: 'Integrasi Lengkap', description: 'Terintegrasi dengan berbagai sistem seperti APOLO, E-Reporting, dan SIPINA dalam satu platform.' },
    { icon: BarChart, title: 'Analitik Lanjutan', description: 'Dashboard analitik dengan visualisasi data yang interaktif untuk pengambilan keputusan yang lebih baik.' },
    { icon: Globe, title: 'Akses Global', description: 'Dapat diakses dari mana saja, kapan saja dengan dukungan multi-bahasa dan timezone.' },
  ];

  const achievements = [
    { number: '500+', label: 'Pengguna Aktif' },
    { number: '10K+', label: 'Laporan Diproses' },
    { number: '99.8%', label: 'Kepuasan Pengguna' },
    { number: '24/7', label: 'Dukungan Teknis' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Info className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Mengubah Cara Anda Melaporkan</h1>
              </div>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl">
                IRS adalah sistem pelaporan terpusat yang dirancang untuk menyederhanakan dan mengotomatisasi 
                proses pelaporan keuangan dan operasional. Platform yang intuitif, aman, dan efisien untuk 
                semua kebutuhan pelaporan Anda.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">{achievement.number}</div>
                    <div className="text-sm opacity-90">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Globe className="w-32 h-32 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Misi Kami</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Menyediakan platform pelaporan yang terintegrasi, aman, dan efisien untuk meningkatkan 
            transparansi dan akuntabilitas dalam pelaporan keuangan dan operasional. Kami berkomitmen 
            untuk memberikan solusi teknologi terbaik yang memudahkan proses bisnis Anda.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Eye className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Visi Kami</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Menjadi sistem pelaporan terdepan di Indonesia yang mendukung transformasi digital 
            sektor keuangan dan bisnis. Kami bercita-cita menjadi mitra terpercaya bagi institusi 
            keuangan dalam mewujudkan pelaporan yang lebih baik dan lebih efisien.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fitur Unggulan</h2>
            <p className="text-gray-600">Kelebihan yang membuat sistem kami berbeda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tim Kami</h2>
            <p className="text-gray-600">Orang-orang di balik kesuksesan sistem IRS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Siap untuk Transformasi Digital?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Email</div>
            <p className="text-blue-600">support@irs-ojk.go.id</p>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Telepon</div>
            <p className="text-blue-600">021-1234-5678</p>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Jam Operasional</div>
            <p className="text-blue-600">Senin - Jumat, 08:00 - 17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;