"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import {
  FileText,
  Layers,
  Code,
  Play,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  type LucideIcon,
} from "lucide-react";

interface ServiceCardItem {
  id: string;
  stage: string;
  number: string;
  title: string;
  description: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: "red" | "crimson" | "orange" | "purple";
  isHighlighted: boolean;
  tags: string[];
  capabilities: string[];
  metric: {
    label: string;
    value: string;
  };
}

const CARDS_DATA: ServiceCardItem[] = [
  {
    id: "service-card-1",
    stage: "Aşama 01",
    number: "01",
    title: "Full-Stack Web Geliştirme",
    description:
      "Next.js ve React ekosistemiyle SEO uyumlu, yüksek hızlı, tip güvenli ve kullanıcı deneyimi odaklı modern web platformları inşa ediyorum.",
    subtitle: "Next.js SSR/SSG · React · TypeScript · Tailwind CSS",
    icon: Code,
    accentColor: "red",
    isHighlighted: false,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    capabilities: [
      "SSR / SSG / ISR Hibrit Render & Core Web Vitals Optimizasyonu",
      "Tip Güvenli Modern React & Next.js App Router Mimarisi",
      "Zustand & Context ile Yüksek Performanslı Global State",
    ],
    metric: {
      label: "Lighthouse Skoru",
      value: "98/100",
    },
  },
  {
    id: "service-card-2",
    stage: "Aşama 02",
    number: "02",
    title: "ERP & Süreç Entegrasyonu",
    description:
      "Netsim N4 ERP uygulamalı eğitimi ve saha tecrübemle; siparişten üretime, depodan satışa tüm kurumsal iş akışlarını analiz edip dijitalleştiriyorum.",
    subtitle: "Netsim N4 · Stok & Sipariş Akışı · Satınalma & Üretim",
    icon: Layers,
    accentColor: "crimson",
    isHighlighted: true,
    tags: ["Netsim N4", "Stok Yönetimi", "Sipariş Akışı", "Sistem Analizi", "MSSQL"],
    capabilities: [
      "Uçtan Uca Depo, Stok ve Tedarik Zinciri Süreç Analizi",
      "Kurumsal Sipariş, Satınalma ve Üretim Akışları Optimizasyonu",
      "Saha Operasyonları ile ERP Veri Bütünlüğü ve Senkronizasyonu",
    ],
    metric: {
      label: "ERP Süreç Verimi",
      value: "+45% Hız",
    },
  },
  {
    id: "service-card-3",
    stage: "Aşama 03",
    number: "03",
    title: "Backend & Veritabanı Mimarisi",
    description:
      "PostgreSQL ve MSSQL üzerinde ilişkisel veri modellemesi, Prisma ORM entegrasyonu ve NextAuth.js ile rol tabanlı 2FA yetkilendirme mimarileri kuruyorum.",
    subtitle: "PostgreSQL · MSSQL · Prisma ORM · NextAuth.js (2FA)",
    icon: Database,
    accentColor: "orange",
    isHighlighted: false,
    tags: ["PostgreSQL", "MSSQL", "Prisma ORM", "NextAuth.js", "REST API"],
    capabilities: [
      "ACID Uyumlu İlişkisel Veri Modellemesi & İndeksleme Stratejileri",
      "Prisma ORM ile Tip Güvenli ve Optimize Veritabanı Sorguları",
      "NextAuth.js & Rol Tabanlı Çok Aşamalı (2FA) Güvenlik Altyapısı",
    ],
    metric: {
      label: "Sorgu Yanıt Süresi",
      value: "< 35ms",
    },
  },
  {
    id: "service-card-4",
    stage: "Aşama 04",
    number: "04",
    title: "Masaüstü & Medya Otomasyonu",
    description:
      "Electron.js ile platformlar arası masaüstü uygulamaları geliştiriyor, donanım seviyesinde olayları dinleyerek FFmpeg ile medya işleme ve web otomasyonları üretiyorum.",
    subtitle: "Electron.js · FFmpeg · Sistem Olayları · Web Scraping",
    icon: Play,
    accentColor: "purple",
    isHighlighted: false,
    tags: ["Electron.js", "FFmpeg", "Web Scraping", "Otomasyon", "Node.js"],
    capabilities: [
      "Electron.js ile Çapraz Platform Masaüstü İşletim Sistemi Entegrasyonu",
      "FFmpeg & Node.js ile Donanım Hızlandırmalı Medya Kodlama Pipeline'ları",
      "Headless Browser ile Güvenilir ve Dayanıklı Veri Kazıma Botları",
    ],
    metric: {
      label: "İşlem Hızı",
      value: "60 FPS FFmpeg",
    },
  },
];

interface ServiceCardProps {
  card: ServiceCardItem;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
  scrollContainer?: React.RefObject<HTMLElement>;
  onSelect: (index: number) => void;
}

/**
 * ServiceCard:
 * Sticky card that scales down (1 -> 0.95 -> 0.91 -> 0.87) and slightly dims as subsequent cards
 * scroll up and naturally overlap it like physical sheets on a desk.
 */
function ServiceCard({
  card,
  index,
  total,
  containerProgress,
  scrollContainer,
  onSelect,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  // useScroll directly on this card component
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    container: scrollContainer,
    offset: ["start end", "start start"],
  });

  // 3D Depth Animation:
  // Card 0 scales down when Card 1 overlaps it, and slightly more as Cards 2 & 3 stack
  // Card 1 scales down when Card 2 overlaps it, and slightly more as Card 3 stacks
  // Card 2 scales down when Card 3 overlaps it
  // Card 3 stays at scale 1 and opacity 1
  const scale = useTransform(
    containerProgress,
    index === 0
      ? [0, 0.26, 0.52, 0.78, 1]
      : index === 1
      ? [0, 0.26, 0.52, 0.78, 1]
      : index === 2
      ? [0, 0.52, 0.78, 1]
      : [0, 1],
    index === 0
      ? [1, 0.95, 0.91, 0.88, 0.88]
      : index === 1
      ? [1, 1, 0.95, 0.91, 0.91]
      : index === 2
      ? [1, 1, 0.95, 0.95]
      : [1, 1]
  );

  const opacity = useTransform(
    containerProgress,
    index === 0
      ? [0, 0.26, 0.52, 0.78, 1]
      : index === 1
      ? [0, 0.26, 0.52, 0.78, 1]
      : index === 2
      ? [0, 0.52, 0.78, 1]
      : [0, 1],
    index === 0
      ? [1, 0.65, 0.48, 0.38, 0.38]
      : index === 1
      ? [1, 1, 0.65, 0.48, 0.48]
      : index === 2
      ? [1, 1, 0.65, 0.65]
      : [1, 1]
  );

  const filterBrightness = useTransform(
    containerProgress,
    index === 0
      ? [0, 0.26, 0.52, 0.78]
      : index === 1
      ? [0, 0.26, 0.52, 0.78]
      : index === 2
      ? [0, 0.52, 0.78]
      : [0, 1],
    index === 0
      ? ["brightness(100%)", "brightness(82%)", "brightness(68%)", "brightness(55%)"]
      : index === 1
      ? ["brightness(100%)", "brightness(100%)", "brightness(82%)", "brightness(68%)"]
      : index === 2
      ? ["brightness(100%)", "brightness(100%)", "brightness(82%)"]
      : ["brightness(100%)", "brightness(100%)"]
  );

  // Accent styling mappings
  const accentBadge = {
    red: "bg-red-950/70 border-red-800/80 text-red-400",
    crimson: "bg-rose-950/70 border-rose-800/80 text-rose-400",
    orange: "bg-orange-950/70 border-orange-800/80 text-orange-400",
    purple: "bg-purple-950/70 border-purple-800/80 text-purple-400",
  }[card.accentColor];

  const accentPill = {
    red: "text-red-400 border-red-500/30 bg-red-950/40",
    crimson: "text-rose-400 border-rose-500/30 bg-rose-950/40",
    orange: "text-orange-400 border-orange-500/30 bg-orange-950/40",
    purple: "text-purple-400 border-purple-500/30 bg-purple-950/40",
  }[card.accentColor];

  return (
    <motion.div
      ref={cardRef}
      id={card.id}
      style={{
        // CSS position: sticky with cascaded top offset so the header tabs neatly peek out
        top: `calc(clamp(64px, 10vh, 100px) + ${index * 20}px)`,
        zIndex: (index + 1) * 10,
        scale,
        opacity,
        filter: filterBrightness,
        transformOrigin: "top center",
      }}
      whileHover={{
        scale: 0.99,
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }}
      onClick={() => onSelect(index)}
      className={`sticky w-full max-w-5xl mx-auto rounded-[28px] sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between select-none cursor-pointer transition-shadow duration-500 ${
        index > 0 ? "mt-[24vh] sm:mt-[28vh]" : "mt-0"
      } ${
        card.isHighlighted
          ? "bg-zinc-900 border border-red-500/40 border-t-red-400/80 shadow-[0_-16px_36px_rgba(229,27,36,0.22),0_24px_60px_rgba(0,0,0,0.95)]"
          : "bg-zinc-900 border border-zinc-800/90 border-t-zinc-600/50 shadow-[0_-18px_38px_rgba(0,0,0,0.85),0_25px_60px_rgba(0,0,0,0.95)]"
      } min-h-[480px] h-[60vh] sm:h-[64vh] max-h-[660px]`}
    >
      {/* Top Header Row of the Card */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 sm:pb-5">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner transition-transform duration-300 group-hover:scale-105 ${accentBadge}`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                {card.stage}
              </span>
              {card.isHighlighted && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-red-600/20 text-red-400 border border-red-500/30">
                  ÖNE ÇIKAN
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline-block">
              {card.subtitle.split("·")[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                card.isHighlighted ? "bg-red-500 animate-ping" : "bg-emerald-400"
              }`}
            />
            <span>AKTİF</span>
          </div>

          <span className="font-mono text-xs sm:text-sm font-bold px-3 py-1 rounded-xl bg-black/50 border border-zinc-800 text-zinc-300">
            [ {card.number} ]
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="my-auto py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.14]">
            {card.title}
          </h3>

          <p className="mt-3.5 text-zinc-300 text-sm sm:text-[15px] leading-relaxed max-w-xl">
            {card.description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-red-400">
            <span className="text-zinc-600 font-bold">›</span>
            <span className="text-zinc-400">{card.subtitle}</span>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {card.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1.5 text-xs font-mono rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Architectural Highlights Glass Panel */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-between bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 uppercase font-semibold">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span>Mimari Kabiliyetler</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${accentPill}`}>
              {card.metric.value}
            </span>
          </div>

          <div className="space-y-2.5 my-2">
            {card.capabilities.map((cap, capIdx) => (
              <div key={capIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-850 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Metrik Değeri</span>
            <span className="text-zinc-200 font-semibold">{card.metric.label}</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="pt-4 sm:pt-5 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>Katman 0{index + 1} / 0{total}</span>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 group-hover:text-white transition">
          <span className="hidden sm:inline">Detayları İncele</span>
          <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatIHelpSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState(1);
  const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement> | undefined>(
    undefined
  );

  // Fallback MotionValue to guarantee rock-solid scroll tracking across all environments:
  // slide container in folder.tsx, standard full-page scroll, or Lenis smooth scroll
  const manualProgress = useMotionValue(0);

  // Detect whether the section is housed in an overflow-y-auto slide container (e.g. folder.tsx)
  useEffect(() => {
    if (!sectionRef.current) return;
    let parent = sectionRef.current.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const style = window.getComputedStyle(parent);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        setScrollContainer({ current: parent });
        return;
      }
      parent = parent.parentElement;
    }
  }, []);

  // Framer Motion useScroll hook with container support
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    container: scrollContainer,
    offset: ["start start", "end end"],
  });

  // Calculate high-fidelity relative scroll progress for overlapping cards
  useEffect(() => {
    const containerEl = scrollContainer?.current || (typeof window !== "undefined" ? window : null);
    const targetEl = cardsContainerRef.current;
    if (!containerEl || !targetEl) return;

    const handleScroll = () => {
      let currentScroll = 0;
      let totalScroll = 1;

      if (containerEl === window) {
        const rect = targetEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        totalScroll = rect.height - windowHeight;
        currentScroll = -rect.top;
      } else {
        const cEl = containerEl as HTMLElement;
        const cRect = cEl.getBoundingClientRect();
        const tRect = targetEl.getBoundingClientRect();
        totalScroll = tRect.height - cRect.height;
        currentScroll = cRect.top - tRect.top;
      }

      if (totalScroll > 0) {
        const p = Math.max(0, Math.min(1, currentScroll / totalScroll));
        manualProgress.set(p);
      }
    };

    containerEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => containerEl.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, manualProgress]);

  // Sync active card indicator dynamically as the deck stacks
  useEffect(() => {
    return manualProgress.on("change", (latest) => {
      if (latest < 0.26) {
        setActiveCard(1);
      } else if (latest < 0.52) {
        setActiveCard(2);
      } else if (latest < 0.78) {
        setActiveCard(3);
      } else {
        setActiveCard(4);
      }
    });
  }, [manualProgress]);

  const scrollToCard = useCallback((cardIndex: number) => {
    setActiveCard(cardIndex + 1);
    const cardEl = document.getElementById(CARDS_DATA[cardIndex].id);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <section
      id="what-i-help"
      ref={sectionRef}
      className="snap-section bg-[#080808] text-zinc-100 font-sans antialiased selection:bg-red-600 selection:text-white relative min-h-screen py-16 sm:py-24 px-4 sm:px-8 lg:px-12"
    >
      {/* Ambient background glows: restricted to an absolute layer to prevent overflow clipping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-zinc-800/15 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Category breadcrumb */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-zinc-500 mb-8">
          <span className="text-red-500 font-bold">03</span>
          <span className="text-zinc-700">/</span>
          <span>YETKİNLİKLER & MİMARİ MÜHENDİSLİK</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-zinc-850">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Hangi Alanda <br />
              Değer{" "}
              <span className="text-red-600 font-serif italic tracking-normal drop-shadow-[0_2px_20px_rgba(229,27,36,0.5)]">
                Katıyorum?
              </span>
            </h2>

            <p className="mt-5 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Modern web teknolojileri, ERP entegrasyonları ve ölçeklenebilir veritabanı mimarileriyle
              kurumsal ve bireysel projeleri uçtan uca hayata geçiriyorum.
            </p>
          </div>

          {/* Right Status Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
            {/* Active Stack Counter Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800/90 font-mono text-xs text-zinc-400 select-none shadow-sm">
              <span className="text-zinc-500">AKTİF ALAN:</span>
              <span className="text-red-400 font-semibold transition-all duration-300">
                0{activeCard} / 04
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            </div>

            {/* Quick Navigation Stepper Dots */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/60 border border-zinc-800/80">
              {CARDS_DATA.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Kart ${i + 1}: ${card.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeCard === i + 1
                      ? "w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Arsenal */}
        <div className="pt-6 pb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3.5">
            <Cpu className="w-3.5 h-3.5 text-red-500" />
            <span>Kullandığım Teknolojiler & Araçlar</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: "Next.js", color: "hover:border-zinc-500" },
              { name: "React", color: "hover:border-sky-500/50 hover:text-sky-400" },
              { name: "TypeScript", color: "hover:border-blue-500/50 hover:text-blue-400" },
              { name: "Node.js", color: "hover:border-emerald-500/50 hover:text-emerald-400" },
              { name: "PostgreSQL", color: "hover:border-cyan-500/50 hover:text-cyan-400" },
              { name: "MSSQL", color: "hover:border-red-500/50 hover:text-red-400" },
              { name: "Prisma ORM", color: "hover:border-teal-500/50 hover:text-teal-400" },
              { name: "Netsim N4 ERP", color: "hover:border-amber-500/50 hover:text-amber-400" },
              { name: "Electron.js", color: "hover:border-indigo-500/50 hover:text-indigo-400" },
              { name: "Zustand", color: "hover:border-rose-500/50 hover:text-rose-400" },
              { name: "Git / GitHub", color: "hover:border-purple-500/50 hover:text-purple-400" },
            ].map((tech, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors duration-200 cursor-default ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Sticky Overlapping Cards Deck Container */}
        {/* Dynamic height (~240vh) ensuring plenty of scroll travel for sequential stacking */}
        <div
          ref={cardsContainerRef}
          className="relative min-h-[240vh] pb-[35vh] pt-4"
        >
          {CARDS_DATA.map((card, idx) => (
            <ServiceCard
              key={card.id}
              card={card}
              index={idx}
              total={CARDS_DATA.length}
              containerProgress={manualProgress}
              scrollContainer={scrollContainer}
              onSelect={scrollToCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
