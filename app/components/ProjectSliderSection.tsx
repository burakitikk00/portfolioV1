"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

export default function ProjectSliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      tag: "Full-Stack E-Ticaret Platformu",
      title: "CANTACIM E-Ticaret",
      category: "— NEXT.JS 16 & REACT 19 & PRISMA // 01",
      quarter: "2024 - 2025",
      watermark: ["CANTACIM", "E-COMMERCE", "FULLSTACK"],
      description:
        "Next.js 16 ile SSR destekli, NextAuth.js ile 2FA ve rol tabanlı yetkilendirme, Prisma ile karmaşık varyantlı ürün ağaçları, dinamik kupon motorları ve Shopier'den otomatik veri göçü içeren full-stack e-ticaret platformu.",
      tags: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "NextAuth.js", "Zustand", "Web Scraping"],
      image: "/cantacim.png",
      badge: "Canlıda // v2.0",
      award: "Full-Stack Üretim",
      liveUrl: "https://burakitikk00-cantacim-v2.vercel.app/",
      githubUrl: "https://github.com/burakitikk00/cantacim",
      summary: "SSR, 2FA güvenlik, Shopier veri göçü, dinamik kupon motoru ve sepet akışları.",
    },
    {
      id: 2,
      tag: "Masaüstü Uygulaması & Medya İşleme",
      title: "ScreenPowerPro",
      category: "— ELECTRON.JS & FFMPEG // 02",
      quarter: "2024",
      watermark: ["SCREEN", "POWER", "PRO"],
      description:
        "Ekran kayıtlarını alıp fare tıklamalarına göre otomatik zoom/pan efektleri ekleyen masaüstü uygulaması. Sistem seviyesinde donanım olayları dinlenerek FFmpeg ile medya işleme gerçekleştirildi.",
      tags: ["Electron.js", "React", "Zustand", "FFmpeg", "Node.js"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
      badge: "Masaüstü Aracı",
      award: "Sistem & Medya İşleme",
      liveUrl: null,
      githubUrl: "https://github.com/burakitikk00/ScreenPowerPro",
      summary: "Otomatik zoom/pan efektleri, sistem donanım olay dinleyicisi ve video filtreleme.",
    },
    {
      id: 3,
      tag: "ERP Mimarili Stok Yönetimi",
      title: "E-Ticaret & Stok Portalı",
      category: "— REACT & MSSQL & NODE.JS // 03",
      quarter: "2024",
      watermark: ["ERP", "STOCK", "PORTAL"],
      description:
        "ERP mantığıyla çalışan satış, stok ve ürün yönetimi simülasyonu. İlişkisel veritabanı mimarisi, sipariş akışı, stok düşümü ve yönetici Dashboard'u içerir.",
      tags: ["React", "Node.js", "MSSQL", "PostgreSQL", "ERP Mimarisi"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      badge: "İlişkisel Veritabanı",
      award: "Stok & Sipariş Otomasyonu",
      liveUrl: null,
      githubUrl: "https://github.com/burakitikk00/e-ticaret",
      summary: "İlişkisel veri mimarisi, dinamik sipariş takibi ve anlık stok güncellemeleri.",
    },
    {
      id: 4,
      tag: "Dinamik Kurumsal Platform & CMS",
      title: "Hastuğ İnşaat Web Sitesi",
      category: "— REACT & MSSQL DİNAMİK YÖNETİM // 04",
      quarter: "2023 - 2024",
      watermark: ["HASTUG", "CONSTRUCTION", "CMS"],
      description:
        "Firma ihtiyaçlarına yönelik dinamik altyapı ve yönetim paneli. Projelerin sergilenebileceği, admin panelinden anlık güncellenebilir kurumsal web sitesi.",
      tags: ["React", "Node.js", "MSSQL", "Admin Panel", "Kurumsal CMS"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      badge: "Kurumsal Web Sitesi",
      award: "Dinamik Yönetim Paneli",
      liveUrl: null,
      githubUrl: "https://github.com/burakitikk00/Hastugg",
      summary: "Admin panelli dinamik CMS, proje portföyü ve kurumsal tanıtım mimarisi.",
    },
  ];

  const totalSlides = projects.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentProject = projects[currentSlide];

  return (
    <section
      id="showcase"
      className="snap-section relative z-10 w-full min-h-screen lg:h-screen py-8 sm:py-12 lg:py-8 px-4 md:px-8 lg:px-14 flex flex-col justify-center bg-[#080808] text-neutral-200 bg-grid-lines selection:bg-[#dfc3a2] selection:text-black overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Top Mini Meta Header */}
        <div className="w-full flex items-center justify-between text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dfc3a2] animate-pulse"></span>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#dfc3a2]">
              PROJE VİTRİNİ // ÇALIŞMALARIM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400">PROJE</span>
            <span className="text-white font-bold tracking-widest text-sm bg-neutral-900 border border-neutral-800 px-3 py-1 rounded">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>
        </div>

        {/* Main Project Display Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{
            scale: 0.985,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          className="relative w-full min-h-[580px] md:min-h-[620px] rounded-2xl bg-neutral-950/90 border border-neutral-800/80 shadow-[0_30px_100px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between p-6 md:p-12 transition-all duration-700"
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={currentProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-between h-full w-full relative z-20"
            >
              {/* Watermark */}
              <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center opacity-[0.07] overflow-hidden -z-10">
                {currentProject.watermark.map((line, i) => (
                  <span
                    key={i}
                    className="text-[12vw] leading-none font-black tracking-tighter uppercase font-display text-white whitespace-nowrap"
                  >
                    {line}
                  </span>
                ))}
              </div>

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <p className="text-[11px] md:text-xs font-mono tracking-[0.25em] uppercase text-neutral-400">
                    {currentProject.category}
                  </p>
                </div>
                <div className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                  {currentProject.quarter}
                </div>
              </div>

              {/* Central Content */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#dfc3a2]">
                      {currentProject.tag}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
                      {currentProject.title}
                    </h3>
                  </div>

                  <p className="text-neutral-300 text-sm md:text-base font-light max-w-lg leading-relaxed pt-2">
                    {currentProject.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-3">
                    {currentProject.tags.map((tag, tI) => (
                      <span
                        key={tI}
                        className="px-3 py-1 text-xs font-mono uppercase bg-neutral-900/90 text-neutral-300 rounded-full border border-neutral-700/60 hover:border-neutral-500 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex items-center gap-3 pt-4">
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#dfc3a2] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <span>Canlı Siteyi Aç</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-medium text-xs tracking-wider uppercase hover:border-[#dfc3a2] hover:text-[#dfc3a2] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Deposu</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Artwork */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <motion.div
                    whileHover={{
                      scale: 0.98,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }}
                    className="relative w-full max-w-[380px] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-neutral-900"
                  >
                    <img
                      alt={currentProject.title}
                      className="w-full h-full object-cover filter brightness-95 contrast-110 group-hover:scale-105 transition-all duration-700"
                      src={currentProject.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10">
                      {currentProject.badge}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <p className="text-[11px] font-mono text-neutral-400 max-w-sm line-clamp-1">
                  {currentProject.summary}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    {currentProject.award}
                  </span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Interactive Navigation Controls inside Card */}
          <div className="relative z-30 flex items-center justify-between pt-6 border-t border-white/5 mt-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === currentSlide
                      ? "w-6 bg-[#dfc3a2]"
                      : "w-2 bg-neutral-700 hover:bg-neutral-500"
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#dfc3a2] transition"
                aria-label="Önceki Proje"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#dfc3a2] transition"
                aria-label="Sonraki Proje"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
