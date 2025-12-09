import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  Mail,
  Filter,
  CheckCheck,
  Trash2,
  Archive,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Laporan APOLO Berhasil Dikirim",
      message: "Laporan Keuangan Q1 2023 telah berhasil dikirim dan diverifikasi oleh sistem.",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      category: "apolo"
    },
    {
      id: 2,
      title: "Deadline Laporan Mendekati",
      message: "Laporan e-Reporting triwulanan deadline 3 hari lagi. Silakan segera selesaikan.",
      type: "warning",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: true,
      category: "ereporting"
    },
    {
      id: 3,
      title: "Laporan SIPINA Ditolak",
      message: "Laporan SIPINA Anda ditolak karena data tidak lengkap. Silakan perbaiki dan kirim ulang.",
      type: "danger",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      category: "sipina"
    },
    {
      id: 4,
      title: "Update Sistem IRS",
      message: "Versi terbaru sistem IRS v1.2.0 telah dirilis dengan berbagai perbaikan dan fitur baru.",
      type: "info",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      category: "system"
    },
    {
      id: 5,
      title: "Laporan Audit Disetujui",
      message: "Laporan audit internal Q1 2023 telah disetujui oleh auditor.",
      type: "success",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      category: "apolo"
    },
    {
      id: 6,
      title: "Maintenance Jadwal",
      message: "Akan ada maintenance sistem pada Minggu, 12 Januari 2025 pukul 00:00 - 04:00 WIB.",
      type: "info",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true,
      category: "system"
    }
  ]);

  const [filter, setFilter] = useState('all'); // all, unread, read
  const [categoryFilter, setCategoryFilter] = useState('all'); // all, apolo, ereporting, sipina, system

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read status
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Filter by category
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'danger': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeBadge = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };
    
    const labels = {
      success: 'Sukses',
      warning: 'Peringatan',
      danger: 'Penting',
      info: 'Informasi',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const styles = {
      apolo: 'bg-blue-100 text-blue-800',
      ereporting: 'bg-cyan-100 text-cyan-800',
      sipina: 'bg-pink-100 text-pink-800',
      system: 'bg-gray-100 text-gray-800',
    };
    
    const labels = {
      apolo: 'APOLO',
      ereporting: 'E-Reporting',
      sipina: 'SIPINA',
      system: 'Sistem',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return format(timestamp, 'dd MMM yyyy', { locale: id });
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const archiveNotification = (id) => {
    // In a real app, you would move to archive
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `${unreadCount} notifikasi belum dibaca` 
                : 'Semua notifikasi telah dibaca'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              unreadCount === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Filter Notifikasi</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  filter === 'unread' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Belum Dibaca
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'read' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sudah Dibaca
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                <option value="apolo">APOLO</option>
                <option value="ereporting">E-Reporting</option>
                <option value="sipina">SIPINA</option>
                <option value="system">Sistem</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border ${
                notification.read ? 'border-gray-200' : 'border-blue-200'
              } overflow-hidden transition-all duration-200 hover:shadow-md`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Notification Icon */}
                  <div className={`p-3 rounded-xl ${
                    notification.read ? 'bg-gray-100' : 'bg-blue-50'
                  }`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.read ? 'text-gray-900' : 'text-blue-900'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{notification.message}</p>
                      </div>
                      <div className="text-sm text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(notification.timestamp)}
                      </div>
                    </div>

                    {/* Badges and Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {getTypeBadge(notification.type)}
                        {getCategoryBadge(notification.category)}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Tandai Dibaca</span>
                          </button>
                        )}
                        <button
                          onClick={() => archiveNotification(notification.id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-700"
                        >
                          <Archive className="w-4 h-4" />
                          <span className="hidden sm:inline">Arsipkan</span>
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada notifikasi</h3>
            <p className="text-gray-600">Tidak ada notifikasi yang sesuai dengan filter Anda</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-500">Total Notifikasi</p>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500">Belum Dibaca</p>
            </div>
            <Mail className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-gray-500">Sukses</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.category === 'apolo').length}
              </p>
              <p className="text-sm text-gray-500">APOLO</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;