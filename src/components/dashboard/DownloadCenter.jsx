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
  Check,
  Eye,
  MoreVertical,
  Info,
  Clock,
  AlertCircle,
  RefreshCw,
  BarChart3,
  FileSignature,
  Gavel
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAplikasiDropdown, setShowAplikasiDropdown] = useState(false);
  const aplikasiDropdownRef = useRef(null);
  const [expandedRows, setExpandedRows] = useState([]);
  
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
  const aplikasiOptions = [
    { value: 'APOLO', icon: BarChart3, color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { value: 'EREPORTING', icon: FileSignature, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: 'SIPINA', icon: Gavel, color: 'bg-green-100 text-green-700 border-green-200' }
  ];
  
  const sektorOptions = sectorsData.map(sector => sector.namaSektor);
  const levelSektorOptions = ['Semua', ...new Set(sectorsData.map(s => s.levelSektor).filter(Boolean))];

  // File types configuration dengan variasi warna
  const fileTypes = {
    pdf: { 
      icon: File, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      label: 'PDF' 
    },
    excel: { 
      icon: FileSpreadsheet, 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      border: 'border-green-200',
      label: 'Excel' 
    },
    archive: { 
      icon: FileArchive, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200',
      label: 'Archive' 
    },
    csv: { 
      icon: Database, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200',
      label: 'CSV' 
    }
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

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
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
    setSelectedAplikasi(aplikasiOptions.map(app => app.value));
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
      return <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />;
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

  // Get application color dengan variasi
  const getAppColor = (app) => {
    const option = aplikasiOptions.find(a => a.value === app);
    return option || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get tipe sektor color
  const getTipeSektorColor = (tipe) => {
    switch(tipe) {
      case 'Syariah': return 'bg-green-50 text-green-700 border-green-200';
      case 'Konvensional': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header dengan design modern */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-md">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pusat Unduhan Laporan</h2>
              <p className="text-sm text-gray-600">Unduh laporan berdasarkan sektor dan aplikasi</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {selectedFiles.length > 0 && (
              <button
                onClick={handleBulkDownload}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Unduh {selectedFiles.length} File</span>
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2.5 border rounded-lg transition-all duration-300 ${
                showFilters 
                  ? 'bg-red-50 border-red-300 text-red-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="p-6 border-b border-gray-200 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari laporan, sektor, atau aplikasi..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">{filteredDownloads.length}</span> laporan tersedia
            </div>
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fade-in">
            {/* Filter Aplikasi - Dropdown Multiple Selection */}
            <div className="relative" ref={aplikasiDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aplikasi</label>
              <button
                onClick={() => setShowAplikasiDropdown(!showAplikasiDropdown)}
                className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span className="truncate">
                  {selectedAplikasi.length === 0 ? 'Pilih Aplikasi' : 
                   selectedAplikasi.length === aplikasiOptions.length ? 'Semua Aplikasi' :
                   `${selectedAplikasi.length} aplikasi terpilih`}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAplikasiDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showAplikasiDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200">
                    <div className="flex justify-between">
                      <button
                        onClick={selectAllAplikasi}
                        className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Pilih Semua
                      </button>
                      <button
                        onClick={clearAllAplikasi}
                        className="text-xs text-gray-600 hover:text-gray-800 px-2 py-1"
                      >
                        Hapus Semua
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    {aplikasiOptions.map(app => {
                      const Icon = app.icon;
                      const isSelected = selectedAplikasi.includes(app.value);
                      return (
                        <label key={app.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAplikasi(app.value)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <Icon className="w-4 h-4" />
                          <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                            {app.value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Filter Nama Sektor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Sektor</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Level Sektor</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900"
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

      {/* Downloads Table - Improved Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedFiles.length === filteredDownloads.length && filteredDownloads.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 focus:ring-red-500 text-red-600"
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Nama Laporan
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort('namaSektor')}
              >
                <div className="flex items-center">
                  Sektor
                  {getSortIcon('namaSektor')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort('aplikasi')}
              >
                <div className="flex items-center">
                  Aplikasi
                  {getSortIcon('aplikasi')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Detail
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDownloads.map((file) => {
              const FileIcon = fileTypes[file.type]?.icon || FileText;
              const fileTypeConfig = fileTypes[file.type] || fileTypes.pdf;
              const sectorDetails = getSectorDetails(file.sektorKode);
              const appOption = getAppColor(file.aplikasi);
              const isExpanded = expandedRows.includes(file.id);
              
              return (
                <React.Fragment key={file.id}>
                  <tr 
                    className={`hover:bg-gray-50/80 transition-colors ${
                      selectedFiles.includes(file.id) ? 'bg-red-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-gray-300 focus:ring-red-500 text-red-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3 min-w-0">
                        <div className={`p-2 rounded-lg ${fileTypeConfig.bg} ${fileTypeConfig.border} border flex-shrink-0`}>
                          <FileIcon className={`w-5 h-5 ${fileTypeConfig.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 group">
                            <button
                              onClick={() => toggleRowExpansion(file.id)}
                              className="text-left hover:text-red-700 focus:outline-none"
                            >
                              {file.name}
                              <ChevronDown className={`w-4 h-4 inline ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(file.status)}`}>
                              {file.status}
                            </span>
                            <span className="text-xs text-gray-500">{file.size}</span>
                            <span className="text-xs text-gray-500">{fileTypeConfig.label}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                          {sectorDetails?.namaSektor || 'Tidak Diketahui'}
                        </div>
                        <div className="flex items-center space-x-2">
                          {sectorDetails?.levelSektor && (
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {sectorDetails.levelSektor}
                            </span>
                          )}
                          {sectorDetails?.tipeSektor && (
                            <span className={`text-xs px-2 py-1 rounded ${getTipeSektorColor(sectorDetails.tipeSektor)}`}>
                              {sectorDetails.tipeSektor}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {appOption.icon && <appOption.icon className="w-4 h-4" />}
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${appOption.color}`}>
                          {file.aplikasi}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <div className="truncate max-w-[120px]">Kode: {file.sektorKode}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleDownload(file)}
                          disabled={downloadProgress[file.id] > 0}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Unduh"
                        >
                          {downloadProgress[file.id] > 0 ? (
                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleShare(file)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Bagikan"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => toggleRowExpansion(file.id)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Detail"
                        >
                          <Info className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Content */}
                  {isExpanded && (
                    <tr className="bg-gray-50/50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 animate-fade-in">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Detail File</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Nama:</span>
                                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Tipe:</span>
                                  <span className="text-sm text-gray-900">{fileTypeConfig.label}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Ukuran:</span>
                                  <span className="text-sm text-gray-900">{file.size}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Status:</span>
                                  <span className={`text-sm ${file.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {file.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Detail Sektor</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Nama:</span>
                                  <span className="text-sm text-gray-900">{sectorDetails?.namaSektor || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Kode:</span>
                                  <span className="text-sm text-gray-900">{file.sektorKode}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Level:</span>
                                  <span className="text-sm text-gray-900">{sectorDetails?.levelSektor || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Tipe:</span>
                                  <span className="text-sm text-gray-900">{sectorDetails?.tipeSektor || '-'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Aksi Cepat</h4>
                              <div className="space-y-2">
                                <button
                                  onClick={() => handleDownload(file)}
                                  disabled={downloadProgress[file.id] > 0}
                                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Download className="w-4 h-4" />
                                  <span className="text-sm">Unduh File</span>
                                </button>
                                <button
                                  onClick={() => handleShare(file)}
                                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <Share2 className="w-4 h-4" />
                                  <span className="text-sm">Bagikan</span>
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
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium mb-2 text-gray-700">Tidak ada laporan ditemukan</p>
                    <p className="mb-4 text-gray-600">Coba ubah filter pencarian atau reset filter</p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
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

      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Bagikan Laporan</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">{selectedFile.name}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Penerima
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                    placeholder="nama@contoh.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 h-24 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                    placeholder="Tambahkan pesan untuk penerima..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Laporan berhasil dibagikan!');
                  setShowShareModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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