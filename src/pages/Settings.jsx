import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Moon,
  Download,
  Eye,
  Key,
  User,
  Lock,
  Database,
  Palette,
  Clock,
  Save,
  RotateCcw
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'id',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      theme: 'light',
      defaultView: 'dashboard'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      soundEnabled: true,
      reportReminders: true,
      deadlineAlerts: true,
      systemUpdates: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true,
      passwordExpiryDays: 90,
      autoLogout: true
    },
    appearance: {
      density: 'comfortable',
      fontSize: 'medium',
      sidebarCollapsed: false,
      showAvatars: true,
      colorScheme: 'blue'
    },
    data: {
      autoBackup: true,
      backupFrequency: 'weekly',
      exportFormat: 'csv',
      retentionPeriod: 365,
      dataSharing: false
    }
  });

  const [tempSettings, setTempSettings] = useState({ ...settings });

  const tabs = [
    { id: 'general', label: 'Umum', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'appearance', label: 'Tampilan', icon: Palette },
    { id: 'data', label: 'Data', icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setSettings({ ...tempSettings });
    alert('Pengaturan berhasil disimpan!');
  };

  const handleReset = () => {
    setTempSettings({ ...settings });
    alert('Pengaturan telah direset!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bahasa
          </label>
          <select
            value={tempSettings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zona Waktu
          </label>
          <select
            value={tempSettings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Asia/Jakarta">WIB (Jakarta)</option>
            <option value="Asia/Makassar">WITA (Makassar)</option>
            <option value="Asia/Jayapura">WIT (Jayapura)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format Tanggal
          </label>
          <select
            value={tempSettings.general.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format Waktu
          </label>
          <select
            value={tempSettings.general.timeFormat}
            onChange={(e) => handleSettingChange('general', 'timeFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="24h">24 Jam</option>
            <option value="12h">12 Jam (AM/PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tema
          </label>
          <select
            value={tempSettings.general.theme}
            onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="light">Terang</option>
            <option value="dark">Gelap</option>
            <option value="auto">Sesuai Sistem</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tampilan Default
          </label>
          <select
            value={tempSettings.general.defaultView}
            onChange={(e) => handleSettingChange('general', 'defaultView', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="dashboard">Dashboard</option>
            <option value="apolo">Laporan APOLO</option>
            <option value="ereporting">Laporan e-Reporting</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(tempSettings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium text-gray-900">
                {key === 'emailNotifications' && 'Notifikasi Email'}
                {key === 'pushNotifications' && 'Notifikasi Push'}
                {key === 'soundEnabled' && 'Suara Notifikasi'}
                {key === 'reportReminders' && 'Pengingat Laporan'}
                {key === 'deadlineAlerts' && 'Alert Deadline'}
                {key === 'systemUpdates' && 'Update Sistem'}
                {key === 'marketingEmails' && 'Email Marketing'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {key === 'emailNotifications' && 'Kirim notifikasi ke email Anda'}
                {key === 'pushNotifications' && 'Notifikasi real-time di browser'}
                {key === 'soundEnabled' && 'Mainkan suara saat ada notifikasi'}
                {key === 'reportReminders' && 'Pengingat untuk laporan yang belum dikirim'}
                {key === 'deadlineAlerts' && 'Alert untuk deadline yang mendekati'}
                {key === 'systemUpdates' && 'Informasi update sistem dan maintenance'}
                {key === 'marketingEmails' && 'Promo dan informasi produk terbaru'}
              </p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', key, !value)}
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
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Tambah keamanan ekstra dengan 2FA</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'twoFactorAuth', !tempSettings.security.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tempSettings.security.twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  tempSettings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {tempSettings.security.twoFactorAuth && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                ⚠️ Aktifkan 2FA untuk keamanan maksimal. Anda akan memerlukan kode dari aplikasi authenticator setiap kali login.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Timeout Sesi</p>
              <p className="text-sm text-gray-500">Waktu tunggu sebelum auto logout</p>
            </div>
            <select
              value={tempSettings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value={15}>15 menit</option>
              <option value={30}>30 menit</option>
              <option value={60}>1 jam</option>
              <option value={120}>2 jam</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Alert Login Baru</p>
              <p className="text-sm text-gray-500">Kirim notifikasi saat login dari device baru</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'loginAlerts', !tempSettings.security.loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tempSettings.security.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  tempSettings.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Auto Logout</p>
              <p className="text-sm text-gray-500">Otomatis logout saat idle</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'autoLogout', !tempSettings.security.autoLogout)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tempSettings.security.autoLogout ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  tempSettings.security.autoLogout ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Density
          </label>
          <select
            value={tempSettings.appearance.density}
            onChange={(e) => handleSettingChange('appearance', 'density', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ukuran Font
          </label>
          <select
            value={tempSettings.appearance.fontSize}
            onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="small">Kecil</option>
            <option value="medium">Sedang</option>
            <option value="large">Besar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skema Warna
          </label>
          <div className="flex space-x-2">
            {['blue', 'indigo', 'green', 'purple'].map((color) => (
              <button
                key={color}
                onClick={() => handleSettingChange('appearance', 'colorScheme', color)}
                className={`w-8 h-8 rounded-full ${
                  tempSettings.appearance.colorScheme === color
                    ? 'ring-2 ring-offset-2 ring-blue-500'
                    : ''
                } ${
                  color === 'blue' ? 'bg-blue-500' :
                  color === 'indigo' ? 'bg-indigo-500' :
                  color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-medium text-gray-900">Sidebar Collapsed</p>
            <p className="text-sm text-gray-500">Sembunyikan label sidebar</p>
          </div>
          <button
            onClick={() => handleSettingChange('appearance', 'sidebarCollapsed', !tempSettings.appearance.sidebarCollapsed)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              tempSettings.appearance.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                tempSettings.appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-medium text-gray-900">Show Avatars</p>
            <p className="text-sm text-gray-500">Tampilkan avatar pengguna</p>
          </div>
          <button
            onClick={() => handleSettingChange('appearance', 'showAvatars', !tempSettings.appearance.showAvatars)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              tempSettings.appearance.showAvatars ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                tempSettings.appearance.showAvatars ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Auto Backup</p>
              <p className="text-sm text-gray-500">Otomatis backup data secara berkala</p>
            </div>
            <button
              onClick={() => handleSettingChange('data', 'autoBackup', !tempSettings.data.autoBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tempSettings.data.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  tempSettings.data.autoBackup ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {tempSettings.data.autoBackup && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frekuensi Backup
              </label>
              <select
                value={tempSettings.data.backupFrequency}
                onChange={(e) => handleSettingChange('data', 'backupFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-medium text-gray-900 mb-2">Format Export Data</p>
            <p className="text-sm text-gray-500 mb-4">Format file untuk export data</p>
            <div className="flex space-x-3">
              {['csv', 'excel', 'pdf', 'json'].map((format) => (
                <button
                  key={format}
                  onClick={() => handleSettingChange('data', 'exportFormat', format)}
                  className={`px-4 py-2 rounded-lg border ${
                    tempSettings.data.exportFormat === format
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div className="mb-4">
            <p className="font-medium text-gray-900">Retention Period</p>
            <p className="text-sm text-gray-500">Lama penyimpanan data (hari)</p>
          </div>
          <input
            type="range"
            min={30}
            max={730}
            step={30}
            value={tempSettings.data.retentionPeriod}
            onChange={(e) => handleSettingChange('data', 'retentionPeriod', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>30 hari</span>
            <span>{tempSettings.data.retentionPeriod} hari</span>
            <span>730 hari</span>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Data Sharing</p>
              <p className="text-sm text-gray-500">Izinkan penggunaan data untuk pengembangan</p>
            </div>
            <button
              onClick={() => handleSettingChange('data', 'dataSharing', !tempSettings.data.dataSharing)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tempSettings.data.dataSharing ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  tempSettings.data.dataSharing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
            <p className="text-gray-600">Kelola pengaturan akun dan preferensi sistem</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Settings Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 border-b-2 whitespace-nowrap
                  transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
          {activeTab === 'data' && renderDataSettings()}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Pengaturan Aktif</p>
            </div>
            <SettingsIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-500">Notifikasi Aktif</p>
            </div>
            <Bell className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-500">Fitur Keamanan</p>
            </div>
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-500">Hari Backup</p>
            </div>
            <Database className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;