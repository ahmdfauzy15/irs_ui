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
  FileDown,
  ExternalLink,
  Eye
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

  // File types configuration dengan tema merah
  const fileTypes = {
    pdf: { icon: File, color: 'bg-red-100 text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    excel: { icon: FileSpreadsheet, color: 'bg-red-100 text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    archive: { icon: FileArchive, color: 'bg-red-100 text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    csv: { icon: Database, color: 'bg-red-100 text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
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

  // Get application color with red theme
  const getAppColor = (app) => {
    switch(app) {
      case 'APOLO': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      case 'EREPORTING': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      case 'SIPINA': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      default: return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
    }
  };

  const getTipeSektorColor = (tipe) => {
    switch(tipe) {
      case 'Syariah': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'Konvensional': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      default: return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' };
    }
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
              className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900 placeholder-red-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
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

      {/* Downloads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-red-100">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-4 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedFiles.length === filteredDownloads.length && filteredDownloads.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-red-300 focus:ring-red-500 text-red-600"
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Nama Laporan
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('namaSektor')}
              >
                <div className="flex items-center">
                  JenisSektor
                  {getSortIcon('namaSektor')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('levelSektor')}
              >
                <div className="flex items-center">
                  Level Sektor
                  {getSortIcon('levelSektor')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('tipeSektor')}
              >
                <div className="flex items-center">
                  Tipe Sektor
                  {getSortIcon('tipeSektor')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => requestSort('aplikasi')}
              >
                <div className="flex items-center">
                  Aplikasi
                  {getSortIcon('aplikasi')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
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
                <tr 
                  key={file.id} 
                  className={`hover:bg-red-50/50 transition-colors ${
                    selectedFiles.includes(file.id) ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="rounded border-red-300 focus:ring-red-500 text-red-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${fileTypeConfig.color} ${fileTypeConfig.border} border`}>
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-red-900 truncate max-w-xs hover:text-red-700 cursor-pointer">
                          {file.name}
                        </div>
                        <div className="text-sm text-red-600 flex items-center space-x-2">
                          <span className="capitalize">{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-red-900 truncate">
                        {sectorDetails?.namaSektor || 'Tidak Diketahui'}
                      </div>
                      <div className="text-xs text-red-500 truncate">
                        Kode: {file.sektorKode}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200`}>
                      {sectorDetails?.levelSektor || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {sectorDetails?.tipeSektor ? (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tipeSektorColor.bg} ${tipeSektorColor.text} border ${tipeSektorColor.border}`}>
                        {sectorDetails.tipeSektor}
                      </span>
                    ) : (
                      <span className="text-sm text-red-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${appColor.bg} ${appColor.text} border ${appColor.border}`}>
                      {file.aplikasi}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloadProgress[file.id] > 0}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 hover:border-red-300"
                        title="Unduh"
                      >
                        {downloadProgress[file.id] > 0 ? (
                          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleShare(file)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300"
                        title="Bagikan"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {filteredDownloads.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
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

      {/* Share Modal dengan tema merah */}
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