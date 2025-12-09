import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  FileText, 
  Download, 
  Info, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
  BarChart3,
  FileSignature,
  Gavel,
  User,
  Settings,
  X,
  Menu,
  Bell
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      // Auto close sidebar on mobile when resizing to desktop
      if (newWidth >= 1024 && isOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  // Handle scroll untuk efek shadow pada sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (windowWidth >= 1024) {
        setScrolled(window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowWidth]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowWidth < 1024 && isOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, windowWidth, toggleSidebar]);

  const menuItems = [
    { path: '/', icon: Home, label: 'Home', exact: true },
    {
      type: 'dropdown',
      icon: FileText,
      label: 'Laporan',
      open: reportsOpen,
      toggle: () => setReportsOpen(!reportsOpen),
      subItems: [
        { path: '/apolo', icon: BarChart3, label: 'Laporan APOLO' },
        { path: '/ereporting', icon: FileSignature, label: 'Laporan e-Reporting' },
        { path: '/sipina', icon: Gavel, label: 'Laporan SIPINA' },
      ]
    },
    { path: '/notifications', icon: Bell, label: 'Notifikasi', badge: 3 },
    { path: '/download', icon: Download, label: 'Download' },
    { path: '/profile', icon: User, label: 'Profil Saya' }, 
    { path: '/settings', icon: Settings, label: 'Pengaturan' },
  ];

  const bottomMenuItems = [
    { path: '/about', icon: Info, label: 'Tentang Kami' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    
    // Close sidebar on mobile after clicking menu item
    if (windowWidth < 1024) {
      toggleSidebar();
    }
  };

  // Determine sidebar width based on screen size
  const getSidebarWidth = () => {
    if (windowWidth < 1024) return '18rem'; // Mobile
    if (windowWidth < 1280) return '16rem'; // Tablet/Desktop small
    return '20rem'; // Desktop large
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div 
        ref={sidebarRef}
        className={`
          fixed lg:sticky
          top-0 left-0 h-screen
          z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${scrolled ? 'lg:shadow-xl' : 'lg:shadow-lg'}
        `}
        style={{ 
          width: getSidebarWidth(),
          maxHeight: '100vh'
        }}
      >
        {/* Sidebar Content */}
        <div className="
          h-full
          bg-white border-r border-gray-200
          flex flex-col
          overflow-hidden
        ">
          
          {/* Sidebar Header */}
          <div className="
            p-4 lg:p-6 
            border-b border-gray-100 
            bg-white
            flex-shrink-0
          ">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg lg:text-xl">IRS</span>
              </div> */}
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
  <img 
    src="/irs-logos.png" 
    alt="Logo IRS" 
    className="w-8 h-8 object-contain"
  />
</div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">IRS OJK</h1>
                <p className="text-xs text-gray-500 truncate">Sistem Pelaporan Terpusat</p>
              </div>
            </div>
          </div>

          {/* Menu Items - Scrollable Area */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <nav className="p-3 lg:p-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  item.type === 'dropdown' ? (
                    <div key={item.label} className="mb-2">
                      <button
                        onClick={item.toggle}
                        className={`
                          w-full flex items-center justify-between px-3 lg:px-4 py-3 rounded-xl
                          transition-all duration-200
                          hover:bg-gray-100 active:scale-[0.98]
                          ${item.open ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                          ${isActive('/apolo') || isActive('/ereporting') || isActive('/sipina') ? 'bg-blue-50 text-blue-600' : ''}
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium truncate text-left">{item.label}</span>
                        </div>
                        {item.open ? (
                          <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200" />
                        )}
                      </button>
                      
                      {item.open && (
                        <div className="ml-3 lg:ml-4 mt-1 space-y-1 pl-3 lg:pl-8 border-l-2 border-blue-100 animate-fade-in">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.label}
                              onClick={() => handleMenuItemClick(subItem.path)}
                              className={`
                                w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 rounded-lg
                                transition-all duration-200 text-left
                                hover:bg-gray-100 active:scale-[0.98]
                                ${isActive(subItem.path) 
                                  ? 'bg-blue-50 text-blue-600 font-medium' 
                                  : 'text-gray-600'
                                }
                              `}
                            >
                              <subItem.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleMenuItemClick(item.path)}
                      className={`
                        w-full flex items-center justify-between px-3 lg:px-4 py-3 rounded-xl
                        transition-all duration-200 relative
                        hover:bg-gray-100 active:scale-[0.98]
                        ${isActive(item.path, item.exact) 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100 font-medium' 
                          : 'text-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate text-left">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="
                          absolute -top-1 -right-1 
                          w-5 h-5 
                          bg-red-500 text-white 
                          text-xs rounded-full 
                          flex items-center justify-center
                          animate-bounce-in
                        ">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                ))}
              </div>

              {/* Bottom Menu */}
              <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-100">
                <div className="space-y-1">
                  {bottomMenuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleMenuItemClick(item.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-xl
                        transition-all duration-200 text-left
                        hover:bg-gray-100 active:scale-[0.98]
                        ${isActive(item.path) 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-gray-700'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="
            p-3 lg:p-4 
            border-t border-gray-100 
            bg-white
            flex-shrink-0
          ">
            <div className="flex items-center justify-between">
              <div className="text-xs lg:text-sm text-gray-500 min-w-0">
                <p className="truncate">v1.0.0</p>
                <p className="truncate">© 2025 OJK</p>
              </div>
              <div className="text-xs text-gray-400 hidden lg:block">
                <p className="whitespace-nowrap">Sistem Terpusat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;