import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  AlertCircle,
  Globe,
  Shield,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

// Knowledge Base untuk IRS OJK
const OJK_KNOWLEDGE_BASE = {
  systems: {
    apolo: {
      name: "APOLO",
      fullName: "Aplikasi Pelaporan Online",
      description: "Sistem pelaporan online OJK untuk Lembaga Jasa Keuangan",
      purpose: "Menyampaikan laporan keuangan, kinerja, dan kepatuhan LJK",
      features: [
        "Laporan keuangan bulanan/triwulan/tahunan",
        "Laporan GCG (Good Corporate Governance)",
        "Laporan risiko dan manajemen",
        "Laporan transaksi dan operasional"
      ],
      url: "https://apolo.ojk.go.id"
    },
    ereporting: {
      name: "E-Reporting",
      fullName: "Electronic Reporting",
      description: "Sistem pelaporan elektronik untuk emiten dan perusahaan publik",
      purpose: "Menyampaikan laporan keuangan dan informasi material",
      features: [
        "Laporan keuangan emiten",
        "Laporan informasi material",
        "Laporan kepemilikan saham",
        "Laporan corporate action"
      ],
      url: "https://ereporting.ojk.go.id"
    },
    sipina: {
      name: "SIPINA",
      fullName: "Sistem Informasi Nasabah Asing",
      description: "Sistem pelaporan informasi nasabah asing",
      purpose: "Pelaporan transaksi nasabah asing untuk kepatuhan PPSK",
      features: [
        "Laporan nasabah asing individu/korporasi",
        "Laporan transaksi valas",
        "Laporan sumber dana asing",
        "Laporan kepatuhan AML/CFT"
      ],
      url: "https://sipina.ojk.go.id"
    }
  },

  deadlines: {
    apolo: {
      monthly: "Tanggal 30 setiap bulan",
      quarterly: "Tanggal 30 bulan setelah triwulan berakhir",
      annual: "Tanggal 30 April tahun berikutnya"
    },
    ereporting: {
      quarterly: "Tanggal 45 hari setelah triwulan berakhir",
      annual: "Tanggal 90 hari setelah tahun berakhir",
      material: "Segera setelah terjadi peristiwa material"
    },
    sipina: {
      monthly: "Tanggal 10 bulan berikutnya",
      quarterly: "Tanggal 15 bulan setelah triwulan berakhir"
    }
  },

  formats: {
    accepted: [
      { type: "PDF", maxSize: "50MB", notes: "Tidak terproteksi, teks selectable" },
      { type: "Excel (.xlsx, .xls)", maxSize: "50MB", notes: "Tanpa macro, format standar" },
      { type: "CSV (.csv)", maxSize: "50MB", notes: "Encoding UTF-8, separator koma" },
      { type: "ZIP (.zip)", maxSize: "100MB", notes: "Untuk multiple files, tidak ada executable" }
    ],
    rejected: [
      "File terproteksi password",
      "File corrupted/rusak",
      "File dengan ekstensi tidak dikenal",
      "File executable (.exe, .bat, etc)"
    ]
  },

  commonIssues: [
    {
      problem: "Login gagal",
      solution: "Reset password melalui link 'Lupa Password' atau hubungi helpdesk"
    },
    {
      problem: "Upload file gagal",
      solution: "Periksa ukuran file, format, dan koneksi internet"
    },
    {
      problem: "Submit error",
      solution: "Coba refresh halaman, clear cache, atau gunakan browser lain"
    },
    {
      problem: "Status pending terlalu lama",
      solution: "Hubungi helpdesk dengan nomor ticket yang diberikan"
    }
  ],

  contacts: {
    helpdesk: "(021) 2960-0000",
    email: "helpdesk@ojk.go.id",
    website: "https://www.ojk.go.id",
    workingHours: "Senin - Jumat, 08:00 - 16:00 WIB"
  }
};

// Fungsi untuk memahami intent pengguna
const understandIntent = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Mapping kata kunci ke intent
  const intents = {
    apolo: ['apolo', 'laporan keuangan', 'lembaga jasa keuangan', 'ljk'],
    ereporting: ['e-reporting', 'emiten', 'perusahaan publik', 'saham'],
    sipina: ['sipina', 'nasabah asing', 'valas', 'aml', 'ppsk'],
    deadline: ['deadline', 'jatuh tempo', 'waktu', 'kapan'],
    format: ['format', 'file', 'ekstensi', 'ukuran', 'upload'],
    tutorial: ['cara', 'tutorial', 'panduan', 'step', 'langkah'],
    status: ['status', 'cek', 'tracking', 'riwayat'],
    problem: ['error', 'masalah', 'gagal', 'tidak bisa', 'trouble'],
    contact: ['kontak', 'hubungi', 'helpdesk', 'support', 'telepon']
  };

  // Temukan intent yang cocok
  const matchedIntents = [];
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      matchedIntents.push(intent);
    }
  }

  return matchedIntents.length > 0 ? matchedIntents : ['general'];
};

// Fungsi untuk generate response berdasarkan intent
const generateResponse = (query, intents) => {
  const responses = [];

  // Helper untuk format response
  const addSection = (title, content) => {
    responses.push(`**${title}**\n${content}`);
  };

  // Helper untuk list items
  const addList = (title, items) => {
    const list = items.map(item => `• ${item}`).join('\n');
    responses.push(`**${title}**\n${list}`);
  };

  // Proses setiap intent
  intents.forEach(intent => {
    switch(intent) {
      case 'apolo':
        const apolo = OJK_KNOWLEDGE_BASE.systems.apolo;
        addSection(`📊 Sistem ${apolo.name}`, 
          `${apolo.description}\n\n` +
          `**Tujuan:** ${apolo.purpose}\n\n` +
          `**Fitur Laporan:**\n` +
          apolo.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**Deadline:**\n` +
          `• Bulanan: ${OJK_KNOWLEDGE_BASE.deadlines.apolo.monthly}\n` +
          `• Triwulanan: ${OJK_KNOWLEDGE_BASE.deadlines.apolo.quarterly}\n` +
          `• Tahunan: ${OJK_KNOWLEDGE_BASE.deadlines.apolo.annual}`
        );
        break;

      case 'ereporting':
        const ereporting = OJK_KNOWLEDGE_BASE.systems.ereporting;
        addSection(`📈 Sistem ${ereporting.name}`, 
          `${ereporting.description}\n\n` +
          `**Tujuan:** ${ereporting.purpose}\n\n` +
          `**Fitur Laporan:**\n` +
          ereporting.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**Deadline:**\n` +
          `• Triwulanan: ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.quarterly}\n` +
          `• Tahunan: ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.annual}\n` +
          `• Peristiwa Material: ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.material}`
        );
        break;

      case 'sipina':
        const sipina = OJK_KNOWLEDGE_BASE.systems.sipina;
        addSection(`🌍 Sistem ${sipina.name}`, 
          `${sipina.description}\n\n` +
          `**Tujuan:** ${sipina.purpose}\n\n` +
          `**Fitur Laporan:**\n` +
          sipina.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**Deadline:**\n` +
          `• Bulanan: ${OJK_KNOWLEDGE_BASE.deadlines.sipina.monthly}\n` +
          `• Triwulanan: ${OJK_KNOWLEDGE_BASE.deadlines.sipina.quarterly}`
        );
        break;

      case 'deadline':
        addSection('📅 Deadline Pelaporan',
          `**APOLO:**\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.apolo.monthly}\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.apolo.quarterly}\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.apolo.annual}\n\n` +
          
          `**E-REPORTING:**\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.quarterly}\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.annual}\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.material}\n\n` +
          
          `**SIPINA:**\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.sipina.monthly}\n` +
          `• ${OJK_KNOWLEDGE_BASE.deadlines.sipina.quarterly}\n\n` +
          
          `⚠️ **Catatan:**\n` +
          `• Submit minimal 3 hari sebelum deadline\n` +
          `• Hari libur tidak memperpanjang deadline\n` +
          `• Keterlambatan dikenakan sanksi administratif`
        );
        break;

      case 'format':
        addSection('📎 Format File yang Diterima',
          `**DITERIMA:**\n` +
          OJK_KNOWLEDGE_BASE.formats.accepted.map(f => 
            `• **${f.type}** (maks ${f.maxSize}) - ${f.notes}`
          ).join('\n') + `\n\n` +
          
          `**DITOLAK:**\n` +
          OJK_KNOWLEDGE_BASE.formats.rejected.map(f => `• ${f}`).join('\n') + `\n\n` +
          
          `💡 **Tips Upload:**\n` +
          `• Pastikan file tidak corrupt\n` +
          `• Cek ukuran sebelum upload\n` +
          `• Gunakan format standar\n` +
          `• Backup file sebelum submit`
        );
        break;

      case 'tutorial':
        addSection('🎯 Panduan Umum',
          `**Langkah-langkah Pelaporan:**\n` +
          `1. Login ke portal IRS OJK\n` +
          `2. Pilih sistem yang sesuai (APOLO/E-Reporting/SIPINA)\n` +
          `3. Klik "Buat Laporan Baru"\n` +
          `4. Isi data periode dan informasi\n` +
          `5. Upload dokumen pendukung\n` +
          `6. Review dan verifikasi data\n` +
          `7. Submit laporan\n` +
          `8. Simpan nomor ticket/refrensi\n\n` +
          
          `**Best Practices:**\n` +
          `• Siapkan data sebelum login\n` +
          `• Gunakan koneksi internet stabil\n` +
          `• Simpan draft secara berkala\n` +
          `• Cek preview sebelum submit\n` +
          `• Download bukti submit`
        );
        break;

      case 'status':
        addSection('🔍 Cek Status Laporan',
          `**Cara Cek Status:**\n` +
          `1. Login ke dashboard IRS\n` +
          `2. Buka menu "Riwayat Laporan"\n` +
          `3. Cari berdasarkan periode/nomor\n` +
          `4. Klik detail untuk info lengkap\n\n` +
          
          `**Kode Status:**\n` +
          `🟢 **Draft** - Belum disubmit\n` +
          `🟡 **Dalam Review** - Sedang diproses\n` +
          `🔵 **Perlu Revisi** - Ada koreksi\n` +
          `🟠 **Pending** - Menunggu verifikasi\n` +
          `✅ **Approved** - Diterima\n` +
          `❌ **Rejected** - Ditolak\n\n` +
          
          `**Jika Status Tertunda:**\n` +
          `• Tunggu 1-2 hari kerja\n` +
          `• Cek email untuk notifikasi\n` +
          `• Hubungi helpdesk jika >3 hari`
        );
        break;

      case 'problem':
        addList('🔧 Troubleshooting Umum', 
          OJK_KNOWLEDGE_BASE.commonIssues.map(issue => 
            `${issue.problem}: ${issue.solution}`
          )
        );
        break;

      case 'contact':
        addSection('📞 Kontak Support',
          `**Helpdesk IRS OJK:**\n` +
          `📞 Telepon: ${OJK_KNOWLEDGE_BASE.contacts.helpdesk}\n` +
          `📧 Email: ${OJK_KNOWLEDGE_BASE.contacts.email}\n` +
          `🌐 Website: ${OJK_KNOWLEDGE_BASE.contacts.website}\n` +
          `⏰ Jam Operasi: ${OJK_KNOWLEDGE_BASE.contacts.workingHours}\n\n` +
          
          `**Layanan:**\n` +
          `• Bantuan teknis sistem\n` +
          `• Reset password\n` +
          `• Konsultasi pelaporan\n` +
          `• Pengaduan sistem`
        );
        break;

      case 'general':
      default:
        responses.push(
          `🤖 **Asisten AI IRS OJK**\n\n` +
          `Saya siap membantu Anda dengan sistem pelaporan OJK:\n\n` +
          `📊 **Sistem yang Didukung:**\n` +
          `• APOLO - Laporan Lembaga Jasa Keuangan\n` +
          `• E-Reporting - Laporan Emiten\n` +
          `• SIPINA - Laporan Nasabah Asing\n\n` +
          
          `❓ **Apa yang bisa saya bantu:**\n` +
          `• Deadline pelaporan\n` +
          `• Format file yang diterima\n` +
          `• Panduan step-by-step\n` +
          `• Cek status laporan\n` +
          `• Troubleshooting masalah\n` +
          `• Kontak helpdesk\n\n` +
          
          `💡 **Contoh pertanyaan:**\n` +
          `"Cara membuat laporan APOLO?"\n` +
          `"Kapan deadline bulan ini?"\n` +
          `"Format file apa yang didukung?"`
        );
        break;
    }
  });

  // Gabungkan semua response
  let finalResponse = responses.join('\n\n---\n\n');

  // Tambahkan disclaimer jika response terlalu pendek
  if (finalResponse.length < 300) {
    finalResponse += `\n\n📌 **Catatan:**\n` +
      `• Informasi ini berdasarkan knowledge base IRS OJK\n` +
      `• Untuk informasi terbaru, kunjungi ${OJK_KNOWLEDGE_BASE.contacts.website}\n` +
      `• Hubungi helpdesk untuk kasus spesifik`;
  }

  return finalResponse;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "🤖 **Selamat datang di Asisten AI IRS OJK!**\n\n" +
            "Saya siap membantu Anda dengan semua kebutuhan pelaporan ke OJK.\n\n" +
            "📋 **Topik yang bisa saya bantu:**\n" +
            "• Sistem APOLO, E-Reporting, SIPINA\n" +
            "• Deadline dan jadwal pelaporan\n" +
            "• Format file dan requirements\n" +
            "• Panduan lengkap pelaporan\n" +
            "• Troubleshooting masalah\n" +
            "• Kontak support\n\n" +
            "💬 **Apa yang ingin Anda tanyakan?**", 
      sender: 'ai', 
      timestamp: new Date(),
      source: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Quick suggestions berdasarkan knowledge base
  const suggestions = [
    { text: "Cara membuat laporan APOLO?", icon: FileText },
    { text: "Kapan deadline bulan ini?", icon: Calendar },
    { text: "Format file apa yang didukung?", icon: FileText },
    { text: "Masalah login/upload?", icon: AlertTriangle },
    { text: "Cek status laporan?", icon: CheckCircle },
    { text: "Kontak helpdesk OJK?", icon: Phone }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Simpan ke history
    if (!searchHistory.includes(inputMessage.toLowerCase())) {
      setSearchHistory(prev => [...prev, inputMessage.toLowerCase()].slice(-10));
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulasi AI berpikir
    await new Promise(resolve => setTimeout(resolve, 800));

    // Analisis intent dan generate response
    const intents = understandIntent(inputMessage);
    const aiResponse = generateResponse(inputMessage, intents);

    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
      source: 'knowledge-base',
      intents: intents
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'apolo':
        window.open(OJK_KNOWLEDGE_BASE.systems.apolo.url, '_blank');
        break;
      case 'ereporting':
        window.open(OJK_KNOWLEDGE_BASE.systems.ereporting.url, '_blank');
        break;
      case 'sipina':
        window.open(OJK_KNOWLEDGE_BASE.systems.sipina.url, '_blank');
        break;
      case 'website':
        window.open(OJK_KNOWLEDGE_BASE.contacts.website, '_blank');
        break;
      case 'helpdesk':
        window.location.href = `tel:${OJK_KNOWLEDGE_BASE.contacts.helpdesk}`;
        break;
      case 'email':
        window.location.href = `mailto:${OJK_KNOWLEDGE_BASE.contacts.email}`;
        break;
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Toast notification
    showToast('✓ Teks disalin ke clipboard');
  };

  const handleClearChat = () => {
    if (messages.length > 2) {
      setMessages([
        { 
          id: 1, 
          text: "🤖 **Selamat datang di Asisten AI IRS OJK!**\n\n" +
                "Percakapan telah dibersihkan. Ada yang bisa saya bantu?", 
          sender: 'ai', 
          timestamp: new Date(),
          source: 'reset'
        }
      ]);
    }
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 right-6 bg-green-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Buka Asisten AI"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <div className="absolute -top-1 -right-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
        </div>
        <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant IRS
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content - Diperkecil */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm h-[500px] flex flex-col animate-slide-in border border-gray-200">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">IRS AI Assistant</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                    Offline • Knowledge Base OJK
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Reset percakapan"
                  disabled={messages.length <= 2}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${messages.length <= 2 ? 'opacity-50' : ''}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-3 py-2 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleQuickAction('apolo')}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors flex items-center"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    APOLO
                  </button>
                  <button
                    onClick={() => handleQuickAction('ereporting')}
                    className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-2 py-1 rounded-lg transition-colors flex items-center"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    E-Reporting
                  </button>
                  <button
                    onClick={() => handleQuickAction('sipina')}
                    className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 px-2 py-1 rounded-lg transition-colors flex items-center"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    SIPINA
                  </button>
                </div>
                <button
                  onClick={() => handleQuickAction('website')}
                  className="text-xs text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  OJK
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[90%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.sender === 'ai' && (
                        <div className={`p-1 rounded flex-shrink-0 mt-0.5 ${
                          message.source === 'welcome' ? 'bg-gradient-to-r from-blue-100 to-indigo-100' : 'bg-blue-50'
                        }`}>
                          {message.source === 'welcome' ? (
                            <Sparkles className="w-3 h-3 text-blue-600" />
                          ) : (
                            <BookOpen className="w-3 h-3 text-blue-600" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.text.split('**').map((part, index) => 
                            index % 2 === 1 ? (
                              <strong key={index} className="font-semibold">{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </div>
                        <div className={`mt-2 flex items-center justify-between ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs">{formatTime(message.timestamp)}</span>
                            {message.sender === 'ai' && message.intents && (
                              <div className="flex items-center space-x-1">
                                {message.intents.map(intent => (
                                  <span 
                                    key={intent} 
                                    className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
                                  >
                                    {intent}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.sender === 'ai' && (
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => handleCopy(message.text)}
                                className="hover:opacity-80 transition-opacity p-0.5"
                                title="Salin teks"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="p-1 bg-white/20 rounded flex-shrink-0">
                          <User className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs text-gray-600">Mencari informasi...</span>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75" />
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 pt-2 pb-1 border-t border-gray-100 bg-white">
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Pertanyaan cepat:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion.text)}
                    className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border border-gray-200 px-2 py-1.5 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center"
                  >
                    <suggestion.icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Tanya tentang sistem IRS OJK..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  {isTyping && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                  aria-label="Kirim pesan"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleQuickAction('helpdesk')}
                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center"
                    title="Telepon helpdesk"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Helpdesk
                  </button>
                  <button
                    onClick={() => handleQuickAction('email')}
                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center"
                    title="Kirim email"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </button>
                </div>
                <p className="text-[10px] text-gray-500">
                  📚 Knowledge Base OJK
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default AIAssistant;