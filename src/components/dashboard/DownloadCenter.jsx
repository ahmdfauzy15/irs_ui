// src/components/dashboard/DownloadCenter.jsx
import React, { useState, useRef } from 'react';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  FileArchive,
  Filter,
  Search,
  CheckCircle,
  Clock,
  ChevronDown,
  ExternalLink,
  Layers,
  Share2,
  Eye,
  Calendar,
  Users,
  File,
  Image,
  Database
} from 'lucide-react';

const DownloadCenter = () => {
  const [downloads, setDownloads] = useState([
    { 
      id: 1, 
      name: 'Laporan Keuangan Q1 2024', 
      type: 'pdf', 
      size: '2.4 MB', 
      date: '2024-03-15', 
      status: 'completed',
      category: 'financial',
      downloads: 124
    },
    { 
      id: 2, 
      name: 'Data Transaksi Harian.xlsx', 
      type: 'excel', 
      size: '5.7 MB', 
      date: '2024-03-14', 
      status: 'pending',
      category: 'transaction',
      downloads: 89
    },
    { 
      id: 3, 
      name: 'Report_Bundle_Q1.zip', 
      type: 'archive', 
      size: '15.2 MB', 
      date: '2024-03-13', 
      status: 'completed',
      category: 'bundle',
      downloads: 156
    },
    { 
      id: 4, 
      name: 'Analisis Pasar.pdf', 
      type: 'pdf', 
      size: '3.1 MB', 
      date: '2024-03-12', 
      status: 'failed',
      category: 'analysis',
      downloads: 67
    },
    { 
      id: 5, 
      name: 'Data Nasabah (Encrypted).csv', 
      type: 'csv', 
      size: '8.9 MB', 
      date: '2024-03-11', 
      status: 'completed',
      category: 'customer',
      downloads: 42
    },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadProgress, setDownloadProgress] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const downloadRef = useRef(null);

  // Ganti FilePdf dengan File, dan gunakan ikon yang tersedia
  const fileTypes = {
    pdf: { icon: File, color: 'bg-red-100 text-red-600' },
    excel: { icon: FileSpreadsheet, color: 'bg-green-100 text-green-600' },
    archive: { icon: FileArchive, color: 'bg-yellow-100 text-yellow-600' },
    csv: { icon: Database, color: 'bg-blue-100 text-blue-600' }
  };

  const handleDownload = async (file, isBulk = false) => {
    if (isBulk && selectedFiles.length === 0) {
      alert('Pilih file yang ingin diunduh');
      return;
    }

    const filesToDownload = isBulk ? 
      downloads.filter(f => selectedFiles.includes(f.id)) : 
      [file];

    // Simulasi proses download
    filesToDownload.forEach(file => {
      setDownloadProgress(prev => ({ ...prev, [file.id]: 0 }));
      
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          const progress = prev[file.id] + 10;
          if (progress >= 100) {
            clearInterval(interval);
            
            // Update download count
            setDownloads(prev => prev.map(f => 
              f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f
            ));
            
            // Reset selection setelah download selesai
            if (isBulk) {
              setSelectedFiles([]);
            }

            // Trigger actual download (simulasi)
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = `#`;
              link.download = file.name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, 300);

            return { ...prev, [file.id]: 100 };
          }
          return { ...prev, [file.id]: progress };
        });
      }, 100);
    });
  };

  const handleShare = (file) => {
    setSelectedFile(file);
    setShowShareModal(true);
  };

  const handleBulkDownload = () => {
    if (selectedFiles.length > 0) {
      handleDownload(null, true);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === downloads.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(downloads.map(f => f.id));
    }
  };

  const handleSelectFile = (id) => {
    setSelectedFiles(prev => 
      prev.includes(id) 
        ? prev.filter(fileId => fileId !== id)
        : [...prev, id]
    );
  };

  const filteredDownloads = downloads.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pusat Unduhan</h2>
              <p className="text-sm text-gray-600">Kelola dan unduh semua laporan Anda</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {selectedFiles.length > 0 && (
              <button
                onClick={handleBulkDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Unduh {selectedFiles.length} File</span>
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari laporan atau dokumen..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{downloads.length}</span> file tersedia
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 animate-fade-in">
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Semua Kategori</option>
              <option>Keuangan</option>
              <option>Transaksi</option>
              <option>Analisis</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Semua Format</option>
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Dari Tanggal"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Sampai Tanggal"
            />
          </div>
        )}
      </div>

      {/* Downloads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedFiles.length === downloads.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ukuran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unduhan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDownloads.map((file) => {
              const FileIcon = fileTypes[file.type]?.icon || FileText;
              return (
                <tr 
                  key={file.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedFiles.includes(file.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${fileTypes[file.type]?.color}`}>
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{file.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{file.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      file.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : file.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {file.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {file.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-900">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{file.downloads}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloadProgress[file.id] > 0}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Unduh"
                      >
                        {downloadProgress[file.id] > 0 ? (
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleShare(file)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Bagikan"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      
                      {/* <button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Pratinjau"
                      >
                        <Eye className="w-5 h-5" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full animate-fade-in">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Bagikan Laporan</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedFile.name}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Penerima
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="contoh@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                    placeholder="Tambahkan pesan..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Laporan berhasil dibagikan!');
                  setShowShareModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadCenter;