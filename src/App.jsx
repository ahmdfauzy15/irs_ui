import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import ApoloReports from './pages/ApoloReports';
import EReporting from './pages/EReporting';
import SIPINA from './pages/SIPINA';
import Notifications from './pages/Notifications';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header 
              toggleSidebar={toggleSidebar} 
              sidebarOpen={sidebarOpen} 
            />
            
            {/* Page Content */}
            <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
              <div className="max-w-full">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/apolo" element={<ApoloReports />} />
                  <Route path="/ereporting" element={<EReporting />} />
                  <Route path="/sipina" element={<SIPINA />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/profile" element={<Profile />} /> 
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/download" element={
                    <div className="flex items-center justify-center min-h-[60vh]">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Dalam Pengembangan</h3>
                        <p className="text-gray-600">Fitur ini akan segera hadir dalam waktu dekat</p>
                      </div>
                    </div>
                  } />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;