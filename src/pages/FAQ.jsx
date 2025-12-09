import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'general', label: 'Umum' },
    { id: 'apolo', label: 'APOLO' },
    { id: 'ereporting', label: 'E-Reporting' },
    { id: 'sipina', label: 'SIPINA' },
    { id: 'technical', label: 'Teknis' },
  ];

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'Apa itu Sistem Pelaporan Terpusat IRS?',
      answer: 'Sistem Pelaporan Terpusat IRS adalah platform terintegrasi yang memungkinkan pengguna untuk mengelola berbagai jenis laporan keuangan dan operasional dalam satu sistem. Platform ini mencakup modul APOLO, E-Reporting, dan SIPINA.'
    },
    {
      id: 2,
      category: 'apolo',
      question: 'Bagaimana cara mengirim laporan APOLO?',
      answer: `Untuk mengirim laporan APOLO:
      1. Masuk ke halaman Laporan APOLO
      2. Klik tombol "Tambah Laporan"
      3. Isi formulir dengan data yang diperlukan
      4. Unggah dokumen pendukung
      5. Klik "Kirim" untuk mengajukan laporan`
    },
    // ... tambahkan FAQ lainnya
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
            <p className="text-gray-600">Temukan jawaban untuk pertanyaan umum tentang sistem IRS</p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <div className="mt-1">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {categories.find(c => c.id === faq.category)?.label}
                    </span>
                  </div>
                </div>
                {openItems.includes(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ditemukan</h3>
            <p className="text-gray-600">Tidak ada FAQ yang sesuai dengan pencarian Anda</p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-center text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">Tidak menemukan jawaban yang Anda cari?</h3>
        <p className="mb-6 opacity-90">Tim dukungan kami siap membantu Anda</p>
        <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors">
          Hubungi Dukungan
        </button>
      </div>
    </div>
  );
};

export default FAQ;