import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Mail, Filter } from 'lucide-react';

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
      answer: 'Sistem Pelaporan Terpusat IRS adalah platform terintegrasi untuk mengelola berbagai laporan keuangan dan operasional dalam satu sistem. Termasuk modul APOLO, E-Reporting, dan SIPINA.'
    },
    {
      id: 2,
      category: 'apolo',
      question: 'Bagaimana cara mengirim laporan APOLO?',
      answer: '1. Masuk ke halaman Laporan APOLO\n2. Klik tombol "Tambah Laporan"\n3. Isi formulir dengan data yang diperlukan\n4. Unggah dokumen pendukung\n5. Klik "Kirim" untuk mengajukan laporan'
    },
    {
      id: 3,
      category: 'ereporting',
      question: 'Kapan deadline pelaporan E-Reporting?',
      answer: 'Deadline pelaporan E-Reporting adalah setiap tanggal 10 bulan berikutnya. Pastikan laporan disampaikan tepat waktu untuk menghindari sanksi.'
    },
    {
      id: 4,
      category: 'sipina',
      question: 'Apa yang harus dilakukan jika laporan SIPINA ditolak?',
      answer: 'Periksa notifikasi penolakan, perbaiki data sesuai arahan, dan kirim ulang laporan. Sistem akan memberikan petunjuk revisi yang diperlukan.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'Bagaimana cara reset password?',
      answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirim ke email Anda.'
    },
    {
      id: 6,
      category: 'general',
      question: 'Apakah sistem IRS tersedia 24/7?',
      answer: 'Ya, sistem IRS dapat diakses 24/7 untuk pelaporan. Dukungan teknis tersedia pada jam kerja Senin-Jumat 08:00-17:00.'
    },
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
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-red-900">FAQ</h1>
              <p className="text-red-600">Temukan jawaban untuk pertanyaan umum</p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-red-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              className="pl-10 pr-4 py-3 w-full border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-red-100 to-white rounded-lg border border-red-200">
              <Filter className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-red-900">Filter Kategori</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 hover:border-red-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 mb-8">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gradient-to-br from-white to-red-50/50 rounded-xl border border-red-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-red-50/30 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-red-900">{faq.question}</h3>
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-red-100 to-white text-red-700 rounded-full border border-red-200">
                      {categories.find(c => c.id === faq.category)?.label}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg border ${openItems.includes(faq.id) ? 'border-red-200' : 'border-red-100'}`}>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-6 pt-2 border-t border-red-100 animate-fade-in">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                    <p className="text-red-700 whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
              <Search className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Tidak ditemukan</h3>
            <p className="text-red-600 max-w-md mx-auto">
              Tidak ada FAQ yang sesuai dengan pencarian Anda. Coba kata kunci lain.
            </p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Masih ada pertanyaan?</h3>
          <p className="text-red-100 mb-6 max-w-md mx-auto">
            Tim dukungan kami siap membantu Anda dengan pertanyaan lebih lanjut
          </p>
          <button className="bg-white text-red-700 hover:bg-red-50 font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
            Hubungi Dukungan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;