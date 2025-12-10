// Update src/App.jsx
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
import DownloadCenter from './components/dashboard/DownloadCenter'; // Tambahkan ini
import AIAssistant from './components/common/AIAssistant'; // Tambahkan ini

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
                  <Route path="/download" element={<DownloadCenter />} /> {/* Ganti ini */}
                </Routes>
              </div>
            </main>
          </div>
        </div>
        
        {/* AI Assistant Floating Button */}
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;