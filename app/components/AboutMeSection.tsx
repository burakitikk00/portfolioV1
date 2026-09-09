"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMeSection() {
  return (
    <section
      id="about"
      className="snap-section bg-[#080808] text-[#CECECE] antialiased selection:bg-[#E3C896] selection:text-black min-h-screen lg:h-screen w-full max-w-[100vw] flex flex-col justify-center py-6 sm:py-8 lg:py-8 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background decorative cyber-grid overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-radial from-[#E3C896]/5 via-transparent to-transparent opacity-40 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col justify-between my-auto">
        {/* Section Header */}
        <header className="w-full flex flex-col items-center justify-center mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.28em] text-[#E3C896] font-mono uppercase mb-1 sm:mb-1.5 whitespace-nowrap">
            <span className="text-[#E3C896] font-bold">03</span>
            <span className="text-[#E3C896]/50">{"//"}</span>
            <span className="text-white/80">KODLARIN ARDINDAKİ İSİM</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-medium tracking-[0.14em] sm:tracking-[0.16em] text-[#E3C896] uppercase text-center drop-shadow-[0_0_20px_rgba(227,200,150,0.35)]">
            HAKKIMDA
          </h2>

          <div className="w-full max-w-4xl mt-2.5 sm:mt-4 flex items-center justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E3C896]/40 to-transparent"></div>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive RPG Character Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{
                scale: 0.98,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="group relative w-full max-w-[270px] sm:max-w-[330px] xl:max-w-[380px] aspect-[4/5] rounded-sm overflow-hidden bg-gradient-to-b from-[#0d0d0e] to-black border border-white/10 shadow-glow-gold hover:border-[#E3C896]/50 transition-all duration-500 cursor-crosshair"
            >
              {/* Cyberpunk Corner Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#E3C896]/60 z-30 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-[#E3C896]"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#E3C896]/60 z-30 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-[#E3C896]"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#E3C896]/60 z-30 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-[#E3C896]"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#E3C896]/60 z-30 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-[#E3C896]"></div>

              {/* Top Micro HUD Telemetry */}
              <div className="absolute top-3 inset-x-4 flex justify-between items-center text-[9px] font-mono tracking-widest text-[#E3C896]/70 z-20 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SİSTEM SENKRONİZE // 60FPS
                </span>
                <span className="opacity-70">ID: #BURAK-ITIK</span>
              </div>

              {/* Holographic Scanline Sweep (On Hover) */}
              <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-[#E3C896]/20 via-[#E3C896]/5 to-transparent hud-scanner pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Portrait Image */}
              <div className="w-full h-full relative overflow-hidden bg-black">
                <Image
                  alt="Burak İtik Portre"
                  src="/profilev2.webp"
                  fill
                  sizes="(max-width: 640px) 270px, (max-width: 1024px) 330px, 380px"
                  loading="lazy"
                  quality={85}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-95 contrast-105 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>
                <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
              </div>

              {/* Hover Game HUD Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/95 to-transparent z-20 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-end justify-between border-b border-[#E3C896]/30 pb-2 mb-2">
                  <div>
                    <p className="text-[9px] font-mono tracking-[0.25em] text-[#E3C896] uppercase">
                      KARAKTER PROFİLİ
                    </p>
                    <h3 className="text-xl md:text-2xl font-tech font-bold text-white tracking-wider flex items-center gap-2">
                      BURAK İTİK

                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[8px] font-mono uppercase bg-emerald-950/80 text-emerald-400 px-2 py-0.5 border border-emerald-500/30 tracking-wider">
                      ÇEVRİMİÇİ
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[9px] font-mono text-white/70 pt-1">
                  <div>
                    <span className="block text-[#E3C896]/60 text-[8px]">SINIF</span>
                    <span className="text-white font-semibold">FULL-STACK</span>
                  </div>
                  <div>
                    <span className="block text-[#E3C896]/60 text-[8px]">ODAK</span>
                    <span className="text-white font-semibold">NEXT.JS & REACT</span>
                  </div>
                  <div>
                    <span className="block text-[#E3C896]/60 text-[8px]">UZMANLIK</span>
                    <span className="text-white font-semibold">MİMARİ TASARIM</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-[#E3C896]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>HEDEF KİLİTLENDİ {"//"} YENİ PROJELER</span>
                  <span>GÖREVE HAZIR</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 lg:pl-4 text-center lg:text-left items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start gap-3 whitespace-nowrap">
              <div className="w-6 sm:w-7 h-[1px] bg-[#E3C896]/60"></div>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.28em] text-[#E3C896] uppercase">
                BEN KİMİM ?
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-[34px] font-sans font-bold text-white tracking-tight uppercase leading-[1.2] max-w-2xl text-center lg:text-left">
              TASARIMIN KODLA VE{" "}
              <span className="text-[#E3C896] font-normal font-serif tracking-normal">
                İŞ SÜREÇLERİYLE
              </span>{" "}
              BULUŞTUĞU DİJİTAL SİSTEMLER KURUYORUM.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-sans pt-1 text-center md:text-left">
              <p className="border-l-0 md:border-l border-white/10 pl-0 md:pl-3">
                Erciyes Üniversitesi Bilgisayar Mühendisliği mezunuyum. Yazılım geliştirme, ERP  ve modern web teknolojilerinde edindiğim yetkinliklerle projeler geliştiriyorum.
              </p>
              <p className="border-l-0 md:border-l border-white/10 pl-0 md:pl-3">
                2 farklı kurumda staj yaptım (Suffatech & KASKİ), lisans eğitimimi tamamladım ve 10+ proje geliştirdim. Karmaşık problemleri çözme yeteneğim ve yenilikçi yaklaşımlarımla en güncel teknolojilere hızla adapte oluyorum.
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-1 sm:my-2"></div>

            {/* Stats Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 sm:gap-y-4 gap-x-3 sm:gap-x-4 pt-1 font-mono uppercase text-xs w-full text-center sm:text-left">
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    LOKASYON
                  </span>
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wider mt-0.5">
                    TÜRKİYE / UZAKTAN
                  </p>
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    ZİHNİYET
                  </span>
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wider mt-0.5">
                    SÜREKLİ GELİŞİM
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    ROL / UNVAN
                  </span>
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wider mt-0.5">
                    FULL-STACK & ERP
                  </p>
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    PROJELER
                  </span>
                  <p className="text-[#E3C896] text-[11px] sm:text-[12px] font-bold tracking-wider mt-0.5">
                    10+ TAMAMLANAN
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 col-span-2 sm:col-span-1">
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    SERTİFİKA
                  </span>
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wider mt-0.5">
                    N4 ERP (40 SAAT)
                  </p>
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E3C896]/70">
                    EĞİTİM
                  </span>
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wider mt-0.5">
                    ERCİYES ÜNİ. (%30 İNG)
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-center sm:text-left w-full">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E3C896] animate-ping"></span>
                <span className="text-zinc-300">YENİ PROJELER VE İŞ BİRLİKLERİNE AÇIK</span>
              </div>
              <span className="text-[#E3C896]/60 hidden sm:inline-block tracking-widest">
                [ 2026 GÜNCEL PORTFOLYO ]
              </span>
            </div>
          </div>
        </div>

        <footer className="mt-6 sm:mt-10 lg:mt-12 text-center text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-600 uppercase border-t border-white/5 pt-3 sm:pt-4">
          Burak İtik • Bilgisayar Mühendisi & Full-Stack Developer • Tüm Hakları Saklıdır
        </footer>
      </div>
    </section>
  );
}
