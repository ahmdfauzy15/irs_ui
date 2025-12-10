// src/components/dashboard/DashboardCarousel.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  Bell,
  ExternalLink
} from 'lucide-react';

const DashboardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Penting: Deadline Pelaporan Q1',
      description: 'Batas waktu pengiriman laporan keuangan Q1 2024 adalah 30 April 2024.',
      icon: AlertTriangle,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      cta: 'Lihat Detail',
      link: '/apolo'
    },
    {
      id: 2,
      title: 'Performa Terbaik Minggu Ini',
      description: 'Laporan Anda telah diproses 30% lebih cepat dari rata-rata.',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      cta: 'Analisis Data',
      link: '/dashboard'
    },
    {
      id: 3,
      title: 'Update Keamanan Sistem',
      description: 'Sistem telah diperbarui dengan enkripsi end-to-end terbaru.',
      icon: Shield,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      cta: 'Pelajari Lebih',
      link: '/about'
    },
    {
      id: 4,
      title: 'Notifikasi Penting',
      description: 'Ada 3 laporan yang memerlukan perhatian segera.',
      icon: Bell,
      color: 'bg-gradient-to-r from-purple-500 to-pink-600',
      cta: 'Buka Notifikasi',
      link: '/notifications'
    }
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Carousel Container */}
      <div className="relative h-64">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`${slide.color} h-32 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative p-6 h-full flex items-center">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
                      <p className="text-white/90 mt-1">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600">
                      {slide.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <span>{slide.cta}</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-gray-900 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Autoplay Control */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setAutoplay(!autoplay)}
          className="text-xs text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          {autoplay ? '⏸️ Jeda' : '▶️ Lanjut'}
        </button>
      </div>
    </div>
  );
};

export default DashboardCarousel;