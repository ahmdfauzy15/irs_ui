import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Globe,
  Key,
  LogOut,
  CheckCircle,
  FileText,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    position: 'Pelapor',
    department: 'Keuangan & Pelaporan',
    organization: 'PT. Contoh Lembaga Jasa Keuangan',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    joinDate: '15 Januari 2023',
    avatar: 'JD',
    notifications: {
      email: true,
      push: true,
      monthlyReport: true,
      deadlineReminder: true
    }
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (type) => {
    if (isEditing) {
      setTempData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [type]: !prev.notifications[type]
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [type]: !prev.notifications[type]
        }
      }));
    }
  };

  const stats = [
    { label: 'Laporan Dikirim', value: 42, trend: '+12%', icon: FileText, color: 'from-red-500 to-red-600' },
    { label: 'Laporan Berhasil', value: 38, trend: '+8%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Laporan Tertunda', value: 3, trend: '-2%', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Laporan Ditolak', value: 1, trend: '0%', icon: AlertCircle, color: 'from-red-700 to-red-800' },
  ];

  const quickActions = [
    { label: 'Ubah Password', icon: Key, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Keamanan Akun', icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Bahasa & Region', icon: Globe, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Preferensi Notifikasi', icon: Bell, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Profil Saya</h1>
              <p className="text-red-600">Kelola informasi akun dan preferensi</p>
            </div>
          </div>
          
          {isEditing ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profil</span>
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-white to-red-50/50 rounded-xl border border-red-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-900">{stat.value}</p>
                    <p className="text-sm text-red-600 font-medium mt-1">{stat.label}</p>
                  </div>
                  <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-3 text-xs font-medium text-red-500">
                  {stat.trend} dari bulan lalu
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {isEditing ? tempData.avatar : profileData.avatar}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-red-200 hover:bg-red-50">
                        <Camera className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900">
                      {isEditing ? tempData.name : profileData.name}
                    </h2>
                    <p className="text-red-600">{profileData.position}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        ID: IRS-2023-001
                      </div>
                      <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        Pelapor
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Nama Lengkap
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                      placeholder="Nama lengkap"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <User className="w-4 h-4 text-red-600" />
                      <span className="text-red-900">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                      placeholder="email@example.com"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <Mail className="w-4 h-4 text-red-600" />
                      <span className="text-red-900">{profileData.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Nomor Telepon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                      placeholder="+62 812-3456-7890"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="text-red-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Jabatan
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                      placeholder="Jabatan"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <Building className="w-4 h-4 text-red-600" />
                      <span className="text-red-900">{profileData.position}</span>
                    </div>
                  )}
                </div>

                {/* Organization */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Organisasi
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                      placeholder="Nama organisasi"
                    />
                  ) : (
                    <div className="px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200 text-red-900">
                      {profileData.organization}
                    </div>
                  )}
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-bold text-red-800 mb-2">
                    Bergabung Sejak
                  </label>
                  <div className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <span className="text-red-900">{profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-red-100 to-white rounded-lg border border-red-200">
                    <Bell className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900">Pengaturan Notifikasi</h2>
                    <p className="text-sm text-red-600">Kelola preferensi notifikasi Anda</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {Object.entries(isEditing ? tempData.notifications : profileData.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-red-50 to-white border border-red-100">
                  <div>
                    <p className="font-bold text-red-900">
                      {key === 'email' && 'Notifikasi Email'}
                      {key === 'push' && 'Notifikasi Push'}
                      {key === 'monthlyReport' && 'Laporan Bulanan'}
                      {key === 'deadlineReminder' && 'Pengingat Deadline'}
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {key === 'email' && 'Kirim notifikasi ke email Anda'}
                      {key === 'push' && 'Notifikasi langsung di dashboard'}
                      {key === 'monthlyReport' && 'Ringkasan laporan bulanan'}
                      {key === 'deadlineReminder' && 'Pengingat deadline laporan'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-red-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg p-6">
            <h3 className="text-lg font-bold text-red-900 mb-4">Aksi Cepat</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${action.bg} rounded-lg`}>
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                    </div>
                    <span className="font-medium text-red-800">{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
                </button>
              ))}
            </div>
            
            {/* Logout Button */}
            <button className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium">
              <LogOut className="w-4 h-4" />
              <span>Keluar Akun</span>
            </button>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg p-6">
            <h3 className="text-lg font-bold text-red-900 mb-4">Info Akun</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-white border border-red-100">
                <span className="text-red-700">Status Akun</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Aktif</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-white border border-red-100">
                <span className="text-red-700">Terakhir Login</span>
                <span className="text-red-900 font-medium">2 jam lalu</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-white border border-red-100">
                <span className="text-red-700">Sesi Aktif</span>
                <span className="text-red-900 font-medium">1 Device</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Status Sistem</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-100">APOLO</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-100">E-Reporting</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-100">SIPINA</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500">
              <p className="text-red-100 text-sm">Semua sistem berjalan normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;