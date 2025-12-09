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
  LogOut
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
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
    alert('Perubahan berhasil disimpan!');
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
    { label: 'Laporan Dikirim', value: 42, icon: '📊' },
    { label: 'Laporan Berhasil', value: 38, icon: '✅' },
    { label: 'Laporan Tertunda', value: 3, icon: '⏳' },
    { label: 'Laporan Ditolak', value: 1, icon: '❌' },
  ];

  const recentActivities = [
    { id: 1, action: 'Mengirim laporan APOLO Q1 2024', time: '2 jam lalu', status: 'success' },
    { id: 2, action: 'Mengubah password akun', time: 'Kemarin', status: 'info' },
    { id: 3, action: 'Mengunduh laporan bulanan', time: '3 hari lalu', status: 'success' },
    { id: 4, action: 'Login dari device baru', time: '1 minggu lalu', status: 'warning' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil dan preferensi akun Anda</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profil</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Informasi Profil</h2>
                <div className="text-sm text-gray-500">ID: IRS-2023-001</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {isEditing ? tempData.avatar : profileData.avatar}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.avatar}
                      onChange={(e) => handleInputChange('avatar', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
                      placeholder="Inisial"
                      maxLength={2}
                    />
                  ) : (
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{profileData.name}</p>
                      <p className="text-sm text-gray-500">{profileData.position}</p>
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{profileData.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{profileData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jabatan
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span>{profileData.position}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat
                    </label>
                    {isEditing ? (
                      <textarea
                        value={tempData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows="2"
                      />
                    ) : (
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        <span>{profileData.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departemen
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <span>{profileData.department}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bergabung Sejak
                      </label>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{profileData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Pengaturan Notifikasi</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {Object.entries(isEditing ? tempData.notifications : profileData.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {key === 'email' && 'Notifikasi Email'}
                      {key === 'push' && 'Notifikasi Push'}
                      {key === 'monthlyReport' && 'Laporan Bulanan'}
                      {key === 'deadlineReminder' && 'Pengingat Deadline'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {key === 'email' && 'Kirim notifikasi ke email Anda'}
                      {key === 'push' && 'Notifikasi langsung di dashboard'}
                      {key === 'monthlyReport' && 'Ringkasan laporan bulanan'}
                      {key === 'deadlineReminder' && 'Pengingat deadline laporan'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      value ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Laporan</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{stat.icon}</span>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      index === 0 ? 'text-blue-600' :
                      index === 1 ? 'text-green-600' :
                      index === 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {index === 0 ? '+12%' :
                       index === 1 ? '+8%' :
                       index === 2 ? '-2%' : '0%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left">
                <Key className="w-5 h-5 text-gray-600" />
                <span>Ubah Password</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left">
                <Shield className="w-5 h-5 text-gray-600" />
                <span>Keamanan Akun</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left">
                <Globe className="w-5 h-5 text-gray-600" />
                <span>Bahasa & Region</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left">
                <Bell className="w-5 h-5 text-gray-600" />
                <span>Preferensi Notifikasi</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600 text-left">
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;