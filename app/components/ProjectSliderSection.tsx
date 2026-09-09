"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectItem {
  id: number;
  tag: string;
  title: string;
  category: string;
  quarter: string;
  watermark: string[];
  description: string;
  tags: string[];
  image: string;
  badge: string;
  award: string;
  dotColor: string;
  liveUrl: string | null;
  githubUrl: string | null;
  summary: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    tag: "Interactive Experience // E-Commerce",
    title: "CANTACIM E-Ticaret",
    category: "— NEXT.JS 16 & REACT 19 & PRISMA // 01",
    quarter: "Q4 / 2024",
    watermark: ["I DESIGN", "VISUALS", "THAT FEEL ALIVE."],
    description:
      "Next.js 16 ile SSR destekli, NextAuth.js ile 2FA ve rol tabanlı yetkilendirme, Prisma ile karmaşık varyantlı ürün ağaçları, dinamik kupon motorları ve Shopier'den otomatik veri göçü içeren full-stack e-ticaret platformu.",
    tags: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "NextAuth.js", "Zustand"],
    image: "/cantacim.png",
    badge: "Concept 01 / Live",
    award: "Awarded Full-Stack • Production Ready",
    dotColor: "bg-[#ff3b30]",
    liveUrl: "https://burakitikk00-cantacim-v2.vercel.app/",
    githubUrl: "https://github.com/burakitikk00/cantacim",
    summary: "SSR mimarisi, 2FA güvenlik, Shopier veri aktarımı, dinamik kupon motoru ve sepet akışları.",
  },
  {
    id: 2,
    tag: "Native Desktop // Media Architecture",
    title: "ScreenPowerPro",
    category: "— .NET 9 & C# 13 (WINUI 3) & FFMPEG // 02",
    quarter: "Q2 / 2024",
    watermark: ["WINUI 3", "C# 13", "NATIVE."],
    description:
      ".NET 9, C# 13 ve Windows App SDK (WinUI 3 / MVVM) ile geliştirilmiş profesyonel 60 FPS yerel ekran kaydı ve otomatik zoom düzenleme masaüstü uygulaması. Win32 P/Invoke düşük seviyeli fare/klavye kancaları, akıllı ZoomEngineService (kümeleme tabanlı keyframe zoom), çok kanallı video editörü ve NAudio ile sıfır gecikmeli WASAPI ses kaydı altyapısına sahiptir. (Ayrıca Electron.js/React yedek mimarisi mevcuttur).",
    tags: [".NET 9", "C# 13", "WinUI 3", "FFmpeg CLI", "NAudio", "Win32 P/Invoke", "MVVM"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    badge: "Concept 02 / .NET 9 Native",
    award: "Native Windows App • 60 FPS Media Engine",
    dotColor: "bg-[#dfc3a2]",
    liveUrl: "https://github.com/burakitikk00/ScreenPowerPro",
    githubUrl: "https://github.com/burakitikk00/ScreenPowerPro",
    summary: "WinUI 3 & .NET 9 ile 60 FPS ekran kaydı, cluster tabanlı ZoomEngine, Win32 kancaları ve WASAPI ses motoru.",
  },
  {
    id: 3,
    tag: "Database Architecture // ERP System",
    title: "E-Ticaret & Stok Portalı",
    category: "— REACT & MSSQL & NODE.JS // 03",
    quarter: "Q3 / 2024",
    watermark: ["BRUTALIST", "EDITORIAL", "SYSTEMS."],
    description:
      "ERP mantığıyla çalışan kurumsal satış, stok ve ürün yönetimi simülasyonu. İlişkisel veritabanı mimarisi, dinamik sipariş akışı, anlık stok düşümü ve yönetici Dashboard'u içerir.",
    tags: ["React", "Node.js", "MSSQL", "PostgreSQL", "ERP Mimarisi"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    badge: "Concept 03 / Architecture",
    award: "Published Architecture • ERP System",
    dotColor: "bg-emerald-500",
    liveUrl: "https://github.com/burakitikk00/e-ticaret",
    githubUrl: "https://github.com/burakitikk00/e-ticaret",
    summary: "İlişkisel veri mimarisi, dinamik sipariş takibi ve anlık stok senkronizasyonu.",
  },
  {
    id: 4,
    tag: "Enterprise Platform // Dynamic CMS",
    title: "Hastuğ İnşaat Web Sitesi",
    category: "— REACT & MSSQL DİNAMİK YÖNETİM // 04",
    quarter: "Q4 / 2023",
    watermark: ["SPATIAL", "AUDIO", "INTERFACE."],
    description:
      "Firma ihtiyaçlarına yönelik dinamik altyapı ve yönetim paneli. Projelerin sergilenebileceği, admin panelinden anlık güncellenebilir modern kurumsal platform mimarisi.",
    tags: ["React", "Node.js", "MSSQL", "Admin Panel", "Kurumsal CMS"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    badge: "Concept 04 / Production",
    award: "Enterprise Ready • Dynamic CMS",
    dotColor: "bg-cyan-400",
    liveUrl: "https://github.com/burakitikk00/Hastugg",
    githubUrl: "https://github.com/burakitikk00/Hastugg",
    summary: "Admin panelli dinamik CMS, proje portföyü ve kurumsal tanıtım mimarisi.",
  },
];

/**
 * Slide Transition Variants (Apple-style Quintic Ease)
 * Entering projects slide in from bottom on scroll down, exiting projects lift up.
 */
const projectSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.7 },
      opacity: { duration: 0.4, ease: "easeOut" },
      scale: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-35%" : "35%",
    opacity: 0,
    scale: 0.97,
    transition: {
      y: { type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.45 },
      opacity: { duration: 0.35, ease: "easeIn" },
      scale: { duration: 0.45 },
    },
  }),
};

export default function ProjectSliderSection() {
  const totalSlides = PROJECTS.length;

  // Initialize: if entering from slide below (direction = -1), start at last project
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window !== "undefined" && (window as unknown as { __portfolioSlideDirection?: number }).__portfolioSlideDirection === -1) {
      return totalSlides - 1;
    }
    return 0;
  });

  const [direction, setDirection] = useState<number>(1);
  const currentSlideRef = useRef(currentSlide);
  currentSlideRef.current = currentSlide;

  const isTransitioningRef = useRef(false);

  /**
   * Internal scroll delta handler:
   * Returns true if the project slider handled the step (1 to 2, 2 to 3, etc.)
   * Returns false if at the boundary (allowing folder.tsx to navigate to previous/next page)
   */
  const handleScrollDelta = useCallback(
    (delta: number): boolean => {
      if (isTransitioningRef.current) return true; // Consume event while animation runs

      const curr = currentSlideRef.current;

      if (delta > 0) {
        // User scrolls down -> Next project
        if (curr < totalSlides - 1) {
          isTransitioningRef.current = true;
          setDirection(1);
          setCurrentSlide(curr + 1);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 700);
          return true; // Handled!
        }
        // At last project -> Return false so folder.tsx can slide to Contact section
        return false;
      } else if (delta < 0) {
        // User scrolls up -> Previous project
        if (curr > 0) {
          isTransitioningRef.current = true;
          setDirection(-1);
          setCurrentSlide(curr - 1);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 700);
          return true; // Handled!
        }
        // At first project -> Return false so folder.tsx can slide to Work section
        return false;
      }

      return false;
    },
    [totalSlides]
  );

  // Register the scroll handler on window so folder.tsx can delegate scroll events seamlessly
  useEffect(() => {
    const win = window as unknown as { __portfolioProjectScrollHandler?: ((delta: number) => boolean) | null };
    win.__portfolioProjectScrollHandler = handleScrollDelta;

    // Capture-phase wheel listener for extra safety
    const handleWheelCapture = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      const d = e.deltaY > 0 ? 1 : -1;
      const handled = handleScrollDelta(d);
      if (handled) {
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener("wheel", handleWheelCapture, { capture: true, passive: true });

    return () => {
      win.__portfolioProjectScrollHandler = null;
      window.removeEventListener("wheel", handleWheelCapture, { capture: true });
    };
  }, [handleScrollDelta]);

  const goToSlide = (index: number) => {
    if (isTransitioningRef.current || index === currentSlide) return;
    isTransitioningRef.current = true;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700);
  };

  const project = PROJECTS[currentSlide];

  return (
    <section
      id="showcase"
      className="snap-section relative z-10 w-full min-h-screen lg:h-screen max-w-[100vw] py-4 sm:py-6 lg:py-6 px-3 sm:px-6 lg:px-14 flex flex-col justify-center bg-[#080808] text-neutral-200 bg-grid-lines selection:bg-[#dfc3a2] selection:text-black overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto relative flex flex-col justify-center">
        {/* Top Mini Meta Header (Technologies Bar & Counter) */}
        <div className="w-full flex items-center justify-between text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 sm:mb-3 px-1 sm:px-2">
          {/* Tech Stack List */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-5 overflow-x-auto no-scrollbar text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">
            <span className="hover:text-white transition cursor-default">Typescript</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition cursor-default">React 19 / Next 16</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition cursor-default">Tailwind CSS</span>
            <span className="text-neutral-700">•</span>
            <span className="text-[#dfc3a2] font-bold">GSAP & Framer</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition cursor-default">Prisma / SQL</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition cursor-default">Full-Stack</span>
          </div>

          {/* Interactive Slide Counter */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-2 sm:ml-4 whitespace-nowrap">
            <span className="text-neutral-400 text-[9px] sm:text-[10px] md:text-xs">PROJECT</span>
            <span
              id="slideCounter"
              className="text-white font-bold tracking-widest text-xs md:text-sm bg-neutral-900/90 border border-neutral-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded shadow-sm font-mono"
            >
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>
        </div>

        {/* Main Project Display Card Container */}
        <div className="relative w-full min-h-[480px] h-[75vh] sm:h-[580px] lg:h-[620px] max-h-[660px] rounded-2xl bg-neutral-950/90 border border-neutral-800/80 shadow-[0_30px_100px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between p-3.5 sm:p-8 lg:p-12 transition-all duration-700 backdrop-blur-sm gpu-accelerated">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={project.id}
              custom={direction}
              variants={projectSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="project-slide flex flex-col justify-between h-full w-full absolute inset-0 p-3.5 sm:p-8 lg:p-12 z-20 pointer-events-auto select-none overflow-y-auto lg:overflow-hidden no-scrollbar"
              id={`project-slide-${project.id}`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Background Massive Watermark Typography */}
              <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center px-4 md:px-12 opacity-[0.09] overflow-hidden -z-10">
                {project.watermark.map((line, idx) => (
                  <span
                    key={idx}
                    className="text-[10vw] leading-none font-black tracking-tighter uppercase font-display text-white whitespace-nowrap"
                  >
                    {line}
                  </span>
                ))}
              </div>

              {/* Top Meta Category Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-4 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${project.dotColor} shadow-[0_0_8px_currentColor] shrink-0`}></span>
                  <p className="text-[9px] sm:text-[11px] md:text-xs font-mono tracking-[0.12em] sm:tracking-[0.25em] uppercase text-neutral-400 whitespace-nowrap truncate">
                    {project.category}
                  </p>
                </div>
                <div className="text-[9px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase whitespace-nowrap shrink-0">
                  {project.quarter}
                </div>
              </div>

              {/* Central Content & Big Title Area */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-6 lg:gap-8 items-center my-auto py-1 sm:py-4">
                {/* Mobile Preview Image (Visible ONLY on mobile, directly under category) */}
                <div className="lg:hidden w-full flex items-center justify-center my-1">
                  <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-xl bg-neutral-900">
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-95 contrast-115"
                      src={project.image}
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/cantacim.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10">
                      {project.badge}
                    </div>
                  </div>
                </div>

                {/* Left Column: Primary Typography & Info */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-4 text-center lg:text-left items-center lg:items-start">
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.3em] font-mono text-[#dfc3a2] whitespace-nowrap block">
                      {project.tag}
                    </span>
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-light max-w-xl leading-relaxed pt-0.5 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                    {project.description}
                  </p>

                  {/* Tags / Tech Stack Pill Badges */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1 sm:pt-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-mono uppercase bg-neutral-900/90 text-neutral-300 rounded-full border border-neutral-700/60 hover:border-[#dfc3a2]/60 hover:text-white transition whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1.5 sm:pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#dfc3a2] text-black font-semibold text-[10px] sm:text-xs tracking-wider uppercase hover:bg-white transition-all shadow-md group whitespace-nowrap"
                      >
                        <span>Canlı Siteyi Aç</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 font-medium text-[10px] sm:text-xs tracking-wider uppercase hover:border-[#dfc3a2] hover:text-[#dfc3a2] transition-colors whitespace-nowrap"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Deposu</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Artwork Preview Banner (Desktop only) */}
                <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
                  <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl group bg-neutral-900">
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-95 contrast-115 group-hover:scale-105 transition-all duration-700"
                      src={project.image}
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/cantacim.png";
                      }}
                    />
                    {/* Stylized vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                    {/* Minimal Inner Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10">
                      {project.badge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div className="relative z-10 flex items-center justify-between pt-2 sm:pt-4 border-t border-white/[0.08]">
                <p className="text-[10px] sm:text-[11px] font-mono text-neutral-500 max-w-xs sm:max-w-md line-clamp-1">
                  {project.summary}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Rotating Circular Badge ('• LIVE DEMO • VIEW MASTERPIECE ↗') */}
          <a
            aria-label="Projeyi Canlı İncele"
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2.5 right-2.5 sm:bottom-6 sm:right-6 lg:bottom-9 lg:right-9 z-30 group flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-transform duration-300 hover:scale-110 focus:outline-none"
          >
            {/* Outer Rotating SVG Text */}
            <svg
              className="w-full h-full animate-spin-slow origin-center"
              viewBox="0 0 100 100"
              fill="none"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fill="#dfc3a2" fontFamily="monospace" fontSize="8.8" fontWeight="bold" letterSpacing="2.4">
                <textPath href="#circlePath" startOffset="0%">
                  • LIVE DEMO • VIEW MASTERPIECE ↗
                </textPath>
              </text>
            </svg>

            {/* Inner Core Button with Diagonal Arrow */}
            <div className="absolute inset-0 m-auto w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:bg-[#dfc3a2] transition-colors duration-300">
              <svg
                className="w-3.5 h-3.5 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>

        {/* Footer Navigation Bar (NO prev/next buttons, scroll driven) */}
        <div className="mt-2.5 sm:mt-4 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3 px-1 sm:px-2 text-center md:text-left">
          {/* Category Pills matching reference footer */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 md:gap-6 text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-widest uppercase text-neutral-400 whitespace-nowrap overflow-x-auto no-scrollbar max-w-full py-0.5">
            <span className="hover:text-[#dfc3a2] transition-colors text-white font-semibold flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]"></span> UI / UX
            </span>
            <span className="text-neutral-700 shrink-0">•</span>
            <span className="hover:text-[#dfc3a2] transition-colors text-white font-semibold shrink-0">
              INTERACTIVE WEB
            </span>
            <span className="text-neutral-700 shrink-0">•</span>
            <span className="hover:text-[#dfc3a2] transition-colors shrink-0">
              FULL-STACK DEVELOPMENT
            </span>
            <span className="text-neutral-700 shrink-0">•</span>
            <span className="hover:text-[#dfc3a2] transition-colors shrink-0">
              SYSTEM ARCHITECTURE
            </span>
          </div>

          {/* Scroll prompt & minimal progress indicator (NO buttons) */}
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            <span className="hidden sm:inline-flex items-center gap-2 text-neutral-400 text-[10px] tracking-widest">
              <span>Aşağı Kaydır</span>
              <span className="inline-block animate-bounce">↓</span>
            </span>
            <div className="flex items-center space-x-1.5" id="dotIndicators">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? "w-6 sm:w-7 bg-[#dfc3a2] shadow-[0_0_8px_rgba(223,195,162,0.6)]"
                      : "w-1.5 sm:w-2 bg-neutral-800 hover:bg-neutral-600"
                  }`}
                  aria-label={`Proje ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
