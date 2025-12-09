import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Mail, 
  Settings,
  LogOut
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const getPageTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/': return 'Dashboard IRS';
      case '/apolo': return 'Laporan APOLO';
      case '/ereporting': return 'Laporan e-Reporting';
      case '/sipina': return 'Laporan SIPINA';
      case '/notifications': return 'Notifikasi';
      case '/profile': return 'Profil Saya';
      case '/settings': return 'Pengaturan';
      case '/about': return 'Tentang Kami';
      case '/faq': return 'FAQ';
      default: return 'Dashboard IRS';
    }
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    switch(path) {
      case '/': return ['Dashboard'];
      case '/apolo': return ['Laporan', 'APOLO'];
      case '/ereporting': return ['Laporan', 'e-Reporting'];
      case '/sipina': return ['Laporan', 'SIPINA'];
      case '/notifications': return ['Notifikasi'];
      case '/profile': return ['Profil Saya'];
      case '/settings': return ['Pengaturan'];
      case '/about': return ['Tentang Kami'];
      case '/faq': return ['FAQ'];
      default: return [getPageTitle()];
    }
  };

  const breadcrumbs = getBreadcrumb();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Mencari: ${searchQuery}`);
      setSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Page Title and Breadcrumb */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {getPageTitle()}
                </h1>
                {!isMobile && (
                  <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={index}>
                        <span className={index === breadcrumbs.length - 1 ? 'font-medium text-gray-700' : ''}>
                          {crumb}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                          <ChevronDown className="w-3 h-3 rotate-[-90deg] mx-1" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              {isMobile && !showMobileSearch && (
                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <span className={index === breadcrumbs.length - 1 ? 'font-medium text-gray-700' : ''}>
                        {crumb}
                      </span>
                      {index < breadcrumbs.length - 1 && (
                        <ChevronDown className="w-2 h-2 rotate-[-90deg] mx-1" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Box - Visible on tablet and desktop */}
            {!isMobile && (
              <div className="hidden md:flex items-center">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari laporan, pengguna..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none text-sm w-48 lg:w-56 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            )}

            {/* Mobile Search Toggle Button */}
            {isMobile && (
              <button 
                onClick={handleMobileSearchToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* Notifications */}
            {/* <button 
              onClick={handleNotificationsClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button> */}

            {/* User Profile */}
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="User menu"
                aria-expanded={showUserMenu}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  JD
                </div>
                {!isMobile && (
                  <div className="hidden sm:block text-left min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">John Doe</p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">Pelapor</p>
                  </div>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      <span>Profil Saya</span>
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Pengaturan</span>
                    </button>
                    <div className="border-t border-gray-100">
                      <button 
                        onClick={() => {
                          alert('Anda telah keluar dari sistem');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Shows when toggled */}
        {showMobileSearch && isMobile && (
          <div className="mt-3 animate-slide-in">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari laporan, notifikasi..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;