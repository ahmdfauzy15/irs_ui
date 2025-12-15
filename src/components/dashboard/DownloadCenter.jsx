import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  FileArchive,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Share2,
  File,
  Database,
  X,
  Eye,
  ExternalLink,
  Calendar,
  HardDrive,
  Users,
  BarChart,
  Clock,
  Copy,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { allDownloadsData } from '../../data/downloadsData';
import { sectorsData } from '../../data/sectorsData';

const DownloadCenter = () => {
  const [downloads, setDownloads] = useState(allDownloadsData);
  const [filteredDownloads, setFilteredDownloads] = useState(allDownloadsData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadProgress, setDownloadProgress] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAplikasiDropdown, setShowAplikasiDropdown] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const aplikasiDropdownRef = useRef(null);
  
  // Filter states
  const [selectedAplikasi, setSelectedAplikasi] = useState(['APOLO', 'EREPORTING', 'SIPINA']);
  const [selectedNamaSektor, setSelectedNamaSektor] = useState('');
  const [selectedLevelSektor, setSelectedLevelSektor] = useState('');
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  // Get unique values for filters
  const aplikasiOptions = ['APOLO', 'EREPORTING', 'SIPINA'];
  const sektorOptions = sectorsData.map(sector => sector.namaSektor);
  const levelSektorOptions = ['Semua', ...new Set(sectorsData.map(s => s.levelSektor).filter(Boolean))];

  // File types configuration dengan tema merah yang diperbarui
  const fileTypes = {
    pdf: { icon: File, color: 'text-red-500', bg: 'bg-red-50/80', label: 'PDF' },
    excel: { icon: FileSpreadsheet, color: 'text-green-600', bg: 'bg-green-50/80', label: 'Excel' },
    archive: { icon: FileArchive, color: 'text-amber-600', bg: 'bg-amber-50/80', label: 'ZIP' },
    csv: { icon: Database, color: 'text-blue-600', bg: 'bg-blue-50/80', label: 'CSV' }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aplikasiDropdownRef.current && !aplikasiDropdownRef.current.contains(event.target)) {
        setShowAplikasiDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get sector details from kodeSektor
  const getSectorDetails = (kodeSektor) => {
    return sectorsData.find(s => s.kodeSektor === kodeSektor) || null;
  };

  // Handle multiple aplikasi selection dengan dropdown
  const toggleAplikasi = (aplikasi) => {
    setSelectedAplikasi(prev => {
      if (prev.includes(aplikasi)) {
        return prev.filter(item => item !== aplikasi);
      } else {
        return [...prev, aplikasi];
      }
    });
  };

  // Select all aplikasi
  const selectAllAplikasi = () => {
    setSelectedAplikasi([...aplikasiOptions]);
  };

  // Clear all aplikasi
  const clearAllAplikasi = () => {
    setSelectedAplikasi([]);
  };

  // Apply filters
  useEffect(() => {
    let result = downloads;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(file => {
        const sectorDetails = getSectorDetails(file.sektorKode);
        const sectorName = sectorDetails ? sectorDetails.namaSektor.toLowerCase() : '';
        
        return (
          file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.aplikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sectorName.includes(searchQuery.toLowerCase())
        );
      });
    }

    // Filter by aplikasi (multiple selection)
    if (selectedAplikasi.length > 0) {
      result = result.filter(file => selectedAplikasi.includes(file.aplikasi));
    }

    // Filter by nama sektor
    if (selectedNamaSektor) {
      const kodeSektor = sectorsData.find(s => s.namaSektor === selectedNamaSektor)?.kodeSektor;
      if (kodeSektor) {
        result = result.filter(file => file.sektorKode === kodeSektor);
      }
    }

    // Filter by level sektor
    if (selectedLevelSektor && selectedLevelSektor !== 'Semua') {
      result = result.filter(file => {
        const sector = getSectorDetails(file.sektorKode);
        return sector && sector.levelSektor === selectedLevelSektor;
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;
        const sectorA = getSectorDetails(a.sektorKode);
        const sectorB = getSectorDetails(b.sektorKode);

        switch(sortConfig.key) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'namaSektor':
            aValue = sectorA?.namaSektor || '';
            bValue = sectorB?.namaSektor || '';
            break;
          case 'levelSektor':
            aValue = sectorA?.levelSektor || '';
            bValue = sectorB?.levelSektor || '';
            break;
          case 'tipeSektor':
            aValue = sectorA?.tipeSektor || '';
            bValue = sectorB?.tipeSektor || '';
            break;
          case 'aplikasi':
            aValue = a.aplikasi;
            bValue = b.aplikasi;
            break;
          default:
            aValue = a[sortConfig.key];
            bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredDownloads(result);
  }, [searchQuery, selectedAplikasi, selectedNamaSektor, selectedLevelSektor, sortConfig, downloads]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4 ml-1 text-red-400" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="w-4 h-4 ml-1 text-red-600" />;
    }
    return <ChevronDown className="w-4 h-4 ml-1 text-red-600" />;
  };

  const handleDownload = async (file, isBulk = false) => {
    if (isBulk && selectedFiles.length === 0) {
      alert('Pilih file yang ingin diunduh');
      return;
    }

    const filesToDownload = isBulk ? 
      downloads.filter(f => selectedFiles.includes(f.id)) : 
      [file];

    filesToDownload.forEach(file => {
      setDownloadProgress(prev => ({ ...prev, [file.id]: 0 }));
      
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          const progress = prev[file.id] + 10;
          if (progress >= 100) {
            clearInterval(interval);
            
            setDownloads(prev => prev.map(f => 
              f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f
            ));
            
            if (isBulk) {
              setSelectedFiles([]);
            }

            // Create and trigger download
            setTimeout(() => {
              const content = `Laporan: ${file.name}\nAplikasi: ${file.aplikasi}\nSektor: ${getSectorDetails(file.sektorKode)?.namaSektor || 'Tidak Diketahui'}\nUkuran: ${file.size}\nStatus: ${file.status}`;
              const blob = new Blob([content], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${file.name.split('.')[0]}.txt`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
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

  const handleViewDetails = (file) => {
    setSelectedFile(file);
    setShowDetailModal(true);
  };

  const handleBulkDownload = () => {
    if (selectedFiles.length > 0) {
      handleDownload(null, true);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredDownloads.length && filteredDownloads.length > 0) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredDownloads.map(f => f.id));
    }
  };

  const handleSelectFile = (id) => {
    setSelectedFiles(prev => 
      prev.includes(id) 
        ? prev.filter(fileId => fileId !== id)
        : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedAplikasi(['APOLO', 'EREPORTING', 'SIPINA']);
    setSelectedNamaSektor('');
    setSelectedLevelSektor('');
    setSearchQuery('');
    setShowFilters(false);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Get application color with red theme
  const getAppColor = (app) => {
    switch(app) {
      case 'APOLO': return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-800', border: 'border-red-300' };
      case 'EREPORTING': return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-800', border: 'border-red-300' };
      case 'SIPINA': return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-800', border: 'border-red-300' };
      default: return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-800', border: 'border-red-300' };
    }
  };

  const getTipeSektorColor = (tipe) => {
    switch(tipe) {
      case 'Syariah': return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'Konvensional': return { bg: 'bg-gradient-to-r from-red-100 to-red-200', text: 'text-red-800', border: 'border-red-300' };
      default: return { bg: 'bg-gradient-to-r from-red-50 to-red-100', text: 'text-red-600', border: 'border-red-200' };
    }
  };

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Copy nama file ke clipboard
  const copyFileName = (fileName) => {
    navigator.clipboard.writeText(fileName);
    alert('Nama file berhasil disalin ke clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
      {/* Header dengan tema merah */}
      <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-900">Pusat Unduhan Laporan</h2>
              <p className="text-sm text-red-600">Unduh laporan berdasarkan sektor dan aplikasi</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {selectedFiles.length > 0 && (
              <button
                onClick={handleBulkDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Unduh {selectedFiles.length} File</span>
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span>Filter ({showFilters ? 'Tutup' : 'Buka'})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="p-6 border-b border-red-100 bg-red-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
            <input
              type="text"
              placeholder="Cari laporan, sektor, atau aplikasi..."
              className="w-full pl-10 pr-4 py-2.5 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900 placeholder-red-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start space-x-4">
            <div className="text-sm text-red-700">
              <span className="font-semibold">{filteredDownloads.length}</span> laporan tersedia
            </div>
            <button
              onClick={handleResetFilters}
              className="text-sm text-red-600 hover:text-red-800 hover:underline font-medium"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fade-in">
            {/* Filter Aplikasi - Dropdown Multiple Selection */}
            <div className="relative" ref={aplikasiDropdownRef}>
              <label className="block text-sm font-medium text-red-700 mb-2">Aplikasi</label>
              <button
                onClick={() => setShowAplikasiDropdown(!showAplikasiDropdown)}
                className="w-full flex items-center justify-between px-4 py-2.5 border border-red-300 rounded-lg bg-white text-red-900 hover:bg-red-50 transition-colors"
              >
                <span className="truncate">
                  {selectedAplikasi.length === 0 ? 'Pilih Aplikasi' : 
                   selectedAplikasi.length === aplikasiOptions.length ? 'Semua Aplikasi' :
                   `${selectedAplikasi.length} aplikasi terpilih`}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAplikasiDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showAplikasiDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-red-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 border-b border-red-200">
                    <div className="flex justify-between">
                      <button
                        onClick={selectAllAplikasi}
                        className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Pilih Semua
                      </button>
                      <button
                        onClick={clearAllAplikasi}
                        className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Hapus Semua
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    {aplikasiOptions.map(app => (
                      <label key={app} className="flex items-center space-x-2 p-2 hover:bg-red-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAplikasi.includes(app)}
                          onChange={() => toggleAplikasi(app)}
                          className="rounded border-red-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-red-700">{app}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Filter Nama Sektor */}
            <div>
              <label className="block text-sm font-medium text-red-700 mb-2">Jenis Sektor</label>
              <select
                className="w-full border border-red-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900"
                value={selectedNamaSektor}
                onChange={(e) => setSelectedNamaSektor(e.target.value)}
              >
                <option value="">Semua Sektor</option>
                {sektorOptions.map(sektor => (
                  <option key={sektor} value={sektor}>{sektor}</option>
                ))}
              </select>
            </div>
            
            {/* Filter Level Sektor */}
            <div>
              <label className="block text-sm font-medium text-red-700 mb-2">Level Sektor</label>
              <select
                className="w-full border border-red-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900"
                value={selectedLevelSektor}
                onChange={(e) => setSelectedLevelSektor(e.target.value)}
              >
                {levelSektorOptions.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Downloads Table - Responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-red-100">
          <thead className="bg-red-50">
            <tr>
              <th className="px-4 lg:px-6 py-4 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedFiles.length === filteredDownloads.length && filteredDownloads.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-red-300 focus:ring-red-500 text-red-600"
                />
              </th>
              <th 
                className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Nama Laporan</span>
                  <span className="sm:hidden">Laporan</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors hidden md:table-cell"
                onClick={() => requestSort('namaSektor')}
              >
                <div className="flex items-center">
                  Jenis Sektor
                  {getSortIcon('namaSektor')}
                </div>
              </th>
              <th 
                className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors hidden lg:table-cell"
                onClick={() => requestSort('levelSektor')}
              >
                <div className="flex items-center">
                  Level
                  {getSortIcon('levelSektor')}
                </div>
              </th>
              <th 
                className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors hidden xl:table-cell"
                onClick={() => requestSort('tipeSektor')}
              >
                <div className="flex items-center">
                  Tipe
                  {getSortIcon('tipeSektor')}
                </div>
              </th>
              <th 
                className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('aplikasi')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Aplikasi</span>
                  <span className="sm:hidden">App</span>
                  {getSortIcon('aplikasi')}
                </div>
              </th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-red-100">
            {filteredDownloads.map((file) => {
              const FileIcon = fileTypes[file.type]?.icon || FileText;
              const fileTypeConfig = fileTypes[file.type] || fileTypes.pdf;
              const sectorDetails = getSectorDetails(file.sektorKode);
              const appColor = getAppColor(file.aplikasi);
              const tipeSektorColor = getTipeSektorColor(sectorDetails?.tipeSektor);
              
              return (
                <React.Fragment key={file.id}>
                  <tr 
                    className={`hover:bg-red-50/50 transition-colors ${
                      selectedFiles.includes(file.id) ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="px-4 lg:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-red-300 focus:ring-red-500 text-red-600"
                      />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-start space-x-3 min-w-0">
                        <div className={`p-2 rounded-lg ${fileTypeConfig.bg} flex-shrink-0 mt-1`}>
                          <FileIcon className={`w-4 h-4 ${fileTypeConfig.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div 
                            className="font-medium text-red-900 cursor-pointer hover:text-red-700 truncate max-w-[200px] lg:max-w-xs"
                            onClick={() => handleViewDetails(file)}
                            title="Klik untuk melihat detail lengkap"
                          >
                            {file.name}
                          </div>
                          <div className="text-xs text-red-600 flex items-center space-x-2 mt-1 flex-wrap gap-y-1">
                            <span className="capitalize">{fileTypeConfig.label}</span>
                            <span>•</span>
                            <span>{file.size}</span>
                            <span className="md:hidden">
                              <span>•</span> {sectorDetails?.namaSektor?.split(' ')[0] || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="max-w-[150px] lg:max-w-xs">
                        <div className="text-sm font-medium text-red-900 truncate" title={sectorDetails?.namaSektor}>
                          {sectorDetails?.namaSektor || 'Tidak Diketahui'}
                        </div>
                        <div className="text-xs text-red-500 truncate">
                          {file.sektorKode}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 truncate max-w-[100px]`}>
                        {sectorDetails?.levelSektor || '-'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                      {sectorDetails?.tipeSektor ? (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tipeSektorColor.bg} ${tipeSektorColor.text} border ${tipeSektorColor.border}`}>
                          {sectorDetails.tipeSektor}
                        </span>
                      ) : (
                        <span className="text-sm text-red-500">-</span>
                      )}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs font-medium ${appColor.bg} ${appColor.text} border ${appColor.border} truncate max-w-[100px]`}>
                        {file.aplikasi}
                      </span>
                    </td>
                    {/* COLOM AKSI - Tombol Lihat Detail dipindahkan ke sini */}
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Tombol Lihat Detail - Sekarang di kolom Aksi */}
                        <button
                          onClick={() => handleViewDetails(file)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300"
                          title="Lihat detail lengkap"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDownload(file)}
                          disabled={downloadProgress[file.id] > 0}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 disabled:opacity-50 border border-red-200 hover:border-red-300"
                          title="Unduh"
                        >
                          {downloadProgress[file.id] > 0 ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleShare(file)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300 hidden sm:inline-flex"
                          title="Bagikan"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => toggleRowExpansion(file.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300"
                          title={expandedRows.includes(file.id) ? "Sembunyikan detail" : "Tampilkan detail"}
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform ${expandedRows.includes(file.id) ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row untuk Detail Tambahan */}
                  {expandedRows.includes(file.id) && (
                    <tr className="bg-red-50/30">
                      <td colSpan="7" className="px-4 lg:px-6 py-4">
                        <div className="bg-white rounded-lg border border-red-200 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                                <Info className="w-4 h-4 mr-2" />
                                Detail File
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Format</span>
                                  <span className="font-medium text-red-900">{fileTypeConfig.label}</span>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Ukuran</span>
                                  <span className="font-medium text-red-900">{file.size}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Diunduh</span>
                                  <span className="font-medium text-red-900">{file.downloads} kali</span>
                                </div> */}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                                <BarChart className="w-4 h-4 mr-2" />
                                Status
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Status</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${file.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {file.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Terakhir Update</span>
                                  <span className="text-sm text-red-900">{formatDate(file.lastUpdated)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                Aksi Cepat
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleDownload(file)}
                                  className="text-xs px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                                >
                                  Unduh
                                </button>
                                <button
                                  onClick={() => handleShare(file)}
                                  className="text-xs px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
                                >
                                  Bagikan
                                </button>
                                <button
                                  onClick={() => copyFileName(file.name)}
                                  className="text-xs px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
                                >
                                  Salin Nama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            
            {filteredDownloads.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 lg:px-6 py-12 text-center">
                  <div className="text-red-500">
                    <Search className="w-12 h-12 mx-auto mb-3 text-red-300" />
                    <p className="text-lg font-medium mb-2 text-red-700">Tidak ada laporan ditemukan</p>
                    <p className="mb-4 text-red-600">Coba ubah filter pencarian atau reset filter</p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Reset Filter
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal untuk Nama Laporan Panjang */}
      {showDetailModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-4xl w-full border border-red-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Detail Laporan Lengkap</h3>
                  <p className="text-sm text-red-600 mt-1">Informasi lengkap tentang laporan ini</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Bagian Nama File Lengkap */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-red-700">Nama Laporan Lengkap</h4>
                  <button
                    onClick={() => copyFileName(selectedFile.name)}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Salin
                  </button>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="font-mono text-sm text-red-900 whitespace-pre-wrap break-words leading-relaxed">
                    {selectedFile.name}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kolom Kiri */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Informasi File
                    </h4>
                    <div className="bg-white border border-red-100 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Format File</span>
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-lg ${fileTypes[selectedFile.type]?.bg} mr-2`}>
                              {fileTypes[selectedFile.type]?.icon ? 
                                React.createElement(fileTypes[selectedFile.type].icon, { 
                                  className: `w-4 h-4 ${fileTypes[selectedFile.type].color}` 
                                }) : 
                                <FileText className="w-4 h-4 text-red-500" />
                              }
                            </div>
                            <span className="font-medium text-red-900">{fileTypes[selectedFile.type]?.label}</span>
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Ukuran File</span>
                          <span className="font-medium text-red-900">{selectedFile.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Total Unduhan</span>
                          <span className="font-medium text-red-900">{selectedFile.downloads} kali</span>
                        </div> */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Status</span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            selectedFile.status === 'Aktif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedFile.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Timeline
                    </h4>
                    <div className="bg-white border border-red-100 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Dibuat</span>
                          <span className="text-sm text-red-900">{formatDate(selectedFile.createdAt)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Terakhir Diupdate</span>
                          <span className="text-sm text-red-900">{formatDate(selectedFile.lastUpdated)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Terakhir Diunduh</span>
                          <span className="text-sm text-red-900">{formatDate(selectedFile.lastDownloaded)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Kolom Kanan */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                      <BarChart className="w-4 h-4 mr-2" />
                      Informasi Aplikasi & Sektor
                    </h4>
                    <div className="bg-white border border-red-100 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Aplikasi</span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getAppColor(selectedFile.aplikasi).bg} ${getAppColor(selectedFile.aplikasi).text}`}>
                            {selectedFile.aplikasi}
                          </span>
                        </div>
                        {(() => {
                          const sectorDetails = getSectorDetails(selectedFile.sektorKode);
                          return (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-red-600">Jenis Sektor</span>
                                <span className="font-medium text-red-900 text-right">{sectorDetails?.namaSektor || 'Tidak Diketahui'}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-red-600">Kode Sektor</span>
                                <span className="font-mono text-red-900">{selectedFile.sektorKode}</span>
                              </div>
                              {sectorDetails?.levelSektor && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Level Sektor</span>
                                  <span className="font-medium text-red-900">{sectorDetails.levelSektor}</span>
                                </div>
                              )}
                              {sectorDetails?.tipeSektor && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-red-600">Tipe Sektor</span>
                                  <span className="font-medium text-red-900">{sectorDetails.tipeSektor}</span>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  
                  {/* <div>
                    <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                      <HardDrive className="w-4 h-4 mr-2" />
                      Deskripsi
                    </h4>
                    <div className="bg-white border border-red-100 rounded-lg p-4">
                      <p className="text-sm text-red-600 leading-relaxed">
                        Laporan ini berisi data lengkap sesuai dengan kategori dan sektor yang ditentukan. 
                        File tersedia dalam format yang mudah diakses dan dapat diunduh kapan saja.
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-red-100">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="flex-1 min-w-[200px] flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span>Unduh Laporan Sekarang</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShare(selectedFile);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 min-w-[200px] flex items-center justify-center space-x-2 px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Bagikan Laporan</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                    }}
                    className="flex-1 min-w-[200px] flex items-center justify-center space-x-2 px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                    <span>Tutup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full border border-red-100 shadow-2xl">
            <div className="p-6 border-b border-red-100 bg-red-50 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-red-900">Bagikan Laporan</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-red-600 mt-1 truncate">{selectedFile.name}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Email Penerima
                  </label>
                  <input
                    type="email"
                    className="w-full border border-red-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                    placeholder="nama@contoh.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    className="w-full border border-red-300 rounded-lg px-3 py-2.5 h-24 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
                    placeholder="Tambahkan pesan untuk penerima..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-red-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-300"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Laporan berhasil dibagikan!');
                  setShowShareModal(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md"
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