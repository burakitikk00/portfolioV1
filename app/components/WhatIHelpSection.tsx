"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Layers, Code, Play, ArrowUpRight } from "lucide-react";

export default function WhatIHelpSection() {
  const [activeCard, setActiveCard] = useState(1);

  const cards = [
    {
      id: "card-1",
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
    },
    {
      id: "card-2",
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
    },
    {
      id: "card-3",
      stage: "Aşama 03",
      number: "03",
      title: "Backend & Veritabanı Mimarisi",
      description:
        "PostgreSQL ve MSSQL üzerinde ilişkisel veri modellemesi, Prisma ORM entegrasyonu ve NextAuth.js ile rol tabanlı 2FA yetkilendirme mimarileri kuruyorum.",
      subtitle: "PostgreSQL · MSSQL · Prisma ORM · NextAuth.js (2FA)",
      icon: FileText,
      accentColor: "orange",
      isHighlighted: false,
      tags: ["PostgreSQL", "MSSQL", "Prisma ORM", "NextAuth.js", "REST API"],
    },
    {
      id: "card-4",
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
    },
  ];

  return (
    <section
      id="what-i-help"
      className="snap-section bg-[#080808] text-zinc-100 font-sans antialiased selection:bg-red-600 selection:text-white relative min-h-screen overflow-x-hidden py-20 px-6 sm:px-8 lg:px-12"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 blur-[160px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-zinc-800/15 blur-[140px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Category breadcrumb */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-zinc-500 mb-8">
          <span className="text-red-500 font-bold">03</span>
          <span className="text-zinc-700">/</span>
          <span>YETKİNLİKLER & MİMARİ MÜHENDİSLİK</span>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          {/* Sticky Left Column */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 pt-2 pb-8 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hangi Alanda <br />
                Değer{" "}
                <span className="text-red-600 font-serif italic tracking-normal drop-shadow-[0_2px_20px_rgba(229,27,36,0.5)]">
                  Katıyorum?
                </span>
              </h2>

              <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                Modern web teknolojileri, ERP entegrasyonları ve ölçeklenebilir veritabanı mimarileriyle kurumsal ve bireysel projeleri uçtan uca hayata geçiriyorum.
              </p>

              {/* Active Stack Progress Counter */}
              <div className="mt-8 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/90 font-mono text-xs text-zinc-400 select-none shadow-sm">
                <span className="text-zinc-500">AKTİF ALAN:</span>
                <span className="text-red-400 font-semibold transition-all duration-300">
                  0{activeCard} / 04
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              </div>

              {/* Tools Arsenal */}
              <div className="mt-10 sm:mt-12">
                <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4">
                  Kullandığım Teknolojiler
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-zinc-500 transition">
                    Next.js
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-sky-500/50 hover:text-sky-400 transition">
                    React
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-blue-500/50 hover:text-blue-400 transition">
                    TypeScript
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400 transition">
                    Node.js
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400 transition">
                    PostgreSQL
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-red-500/50 hover:text-red-400 transition">
                    MSSQL
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-teal-500/50 hover:text-teal-400 transition">
                    Prisma ORM
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 transition">
                    Netsim N4 ERP
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-indigo-500/50 hover:text-indigo-400 transition">
                    Electron.js
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-rose-500/50 hover:text-rose-400 transition">
                    Zustand
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-purple-500/50 hover:text-purple-400 transition">
                    Git / GitHub
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll guidance cues */}
            <div className="hidden lg:flex flex-col gap-3 mt-14 text-zinc-500 text-xs tracking-wider">
              <div className="flex items-center gap-3">
                <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5">
                  <span className="w-1 h-2 bg-red-500 rounded-full animate-bounce"></span>
                </div>
                <span>Hizmet katmanlarını incelemek için kaydırın</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveCard(i + 1);
                      document.getElementById(`card-${i + 1}`)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`h-2 rounded-full transition-all ${
                      activeCard === i + 1 ? "w-6 bg-red-500" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Stacking Cards Container */}
          <div className="lg:col-span-7 flex flex-col space-y-16 sm:space-y-24 lg:space-y-32 pt-2 pb-24 relative">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  id={card.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{
                    scale: 0.98,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  onViewportEnter={() => setActiveCard(idx + 1)}
                  className={`stack-card sticky top-28 w-full max-w-[500px] mx-auto lg:mx-0 aspect-square min-h-[440px] sm:min-h-[480px] rounded-3xl p-7 sm:p-9 flex flex-col justify-between group transition-all duration-500 cursor-pointer ${
                    card.isHighlighted
                      ? "bg-gradient-to-br from-red-600 via-rose-600 to-red-700 border border-red-400/50 text-white shadow-glow-red"
                      : "bg-[#141416]/95 border border-zinc-800/90 backdrop-blur-md shadow-card-dark text-white"
                  }`}
                  style={{ top: `${112 + idx * 16}px`, zIndex: (idx + 1) * 10 }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${
                          card.isHighlighted
                            ? "bg-white/20 backdrop-blur-md text-white shadow-inner"
                            : card.accentColor === "orange"
                            ? "bg-orange-950/50 border border-orange-700/60 text-orange-400"
                            : card.accentColor === "purple"
                            ? "bg-purple-950/50 border border-purple-700/60 text-purple-400"
                            : "bg-red-950/60 border border-red-800/60 text-red-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
                          card.isHighlighted ? "text-rose-200" : "text-zinc-400"
                        }`}
                      >
                        {card.stage}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          card.isHighlighted ? "bg-white animate-ping" : "bg-red-500/80"
                        }`}
                      ></span>
                      <span
                        className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          card.isHighlighted
                            ? "text-white bg-black/30 border-white/25"
                            : "text-zinc-400 bg-zinc-900/80 border-zinc-800"
                        }`}
                      >
                        [ {card.number} ]
                      </span>
                    </div>
                  </div>

                  {/* Middle section */}
                  <div className="my-auto py-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      {card.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm sm:text-[15px] leading-relaxed ${
                        card.isHighlighted ? "text-rose-100 font-medium" : "text-zinc-300"
                      }`}
                    >
                      {card.description}
                    </p>
                    <div
                      className={`mt-4 flex items-center gap-2 text-xs font-mono ${
                        card.isHighlighted ? "text-rose-200" : "text-zinc-500"
                      }`}
                    >
                      <span className={card.isHighlighted ? "text-white font-bold" : "text-red-500 font-bold"}>
                        ›
                      </span>
                      <span>{card.subtitle}</span>
                    </div>
                  </div>

                  {/* Bottom tags */}
                  <div
                    className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      card.isHighlighted ? "border-white/25" : "border-zinc-800/80"
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {card.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                            card.isHighlighted
                              ? "bg-white/15 backdrop-blur-md text-white border-white/30 hover:bg-white/25"
                              : "bg-zinc-800/80 text-zinc-300 border-zinc-700/60 hover:border-zinc-500"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition flex-shrink-0 ${
                        card.isHighlighted
                          ? "bg-black/20 border-white/30 text-white group-hover:bg-white/20"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
