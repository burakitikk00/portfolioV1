import React, { memo } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Compass, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const EXPERIENCES = [
  {
    company: "SUFFATECH",
    role: "Web Yazılım Geliştirme Stajyeri",
    date: "Haz 2024 - Ağu 2024",
    url: "https://www.suffatech.com",
    logo: "/suffatech.webp",
    isCustomLogo: false,
    desc: "Modern web teknolojileri, responsive arayüz mimarileri ve kullanıcı deneyimi odaklı frontend geliştirme süreçleri.",
    tags: ["Next.js", "React", "TypeScript", "Frontend"],
  },
  {
    company: "KASKİ Genel Müdürlüğü",
    role: "Bilgi İşlem ve Ağ Stajyeri",
    date: "Haz 2023 - Ağu 2023",
    url: "https://www.kaski.gov.tr/",
    logo: "/kaski.webp",
    isCustomLogo: false,
    desc: "Geniş ölçekli kurumsal ağ altyapısı, sunucu sistemleri, ağ güvenliği ve bilgi işlem operasyonel destek süreçleri.",
    tags: ["Ağ Yönetimi", "Sistem Güvenliği", "Donanım", "IT Support"],
  },
  {
    company: "Hilal Elektrik",
    role: "Saha Operasyonları ve Elektrik Tesisat Sorumlusu",
    date: "2018 - Devam Ediyor",
    url: null,
    logo: "HE",
    isCustomLogo: true,
    desc: "Teknik saha operasyonlarının yönetimi, şantiye koordinasyonu, karmaşık altyapı tesisatlarının planlanması ve teslimi.",
    tags: ["Saha Operasyonları", "Proje Yönetimi", "Kriz Çözümü"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="snap-section bg-[#060608] text-neutral-100 font-sans antialiased selection:bg-[#dfc3a2] selection:text-black min-h-screen w-full max-w-[100vw] py-6 sm:py-10 lg:py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#dfc3a2]/5 blur-[160px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-red-950/10 blur-[180px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between my-auto">
        {/* Section Header */}
        <header className="w-full flex flex-col items-center justify-center mb-6 sm:mb-10 lg:mb-12 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.28em] text-[#dfc3a2] font-mono uppercase mb-1.5 sm:mb-2 whitespace-nowrap">
            <span className="font-bold text-[#dfc3a2]">05</span>
            <span className="text-[#dfc3a2]/50">{"//"}</span>
            <span className="text-zinc-400">KARİYER, EĞİTİM & VİZYON</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase text-center">
            DENEYİMLER & AKADEMİK GEÇMİŞ
          </h2>

          <p className="mt-2.5 sm:mt-4 text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed text-center">
            Kurumsal stajlardan saha sorumluluklarına, lisans eğitiminden ERP uzmanlık eğitimine kadar edindiğim tecrübeler.
          </p>
        </header>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Work Experiences */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center gap-2.5 pb-2 text-xs font-mono uppercase tracking-widest text-[#dfc3a2]">
              <Briefcase className="w-4 h-4" />
              <span className="font-bold">Profesyonel & Saha Deneyimi</span>
            </div>

            <div className="flex flex-col space-y-3.5">
              {EXPERIENCES.map((exp, idx) => {
                const ContentWrapper = exp.url ? "a" : "div";
                return (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{
                      scale: 0.985,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }}
                  >
                    <ContentWrapper
                      href={exp.url || undefined}
                      target={exp.url ? "_blank" : undefined}
                      rel={exp.url ? "noopener noreferrer" : undefined}
                      className={`block p-5 sm:p-6 rounded-2xl bg-[#0f0f13]/90 border border-white/[0.07] hover:border-[#dfc3a2]/50 transition-all duration-300 group shadow-lg ${
                        exp.url ? "cursor-pointer hover:bg-[#14141a]" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* Logo container */}
                          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center p-2 flex-shrink-0 group-hover:border-[#dfc3a2]/40 transition-colors overflow-hidden relative">
                            {exp.isCustomLogo ? (
                              <span className="text-xs font-mono font-bold text-[#dfc3a2]">
                                {exp.logo}
                              </span>
                            ) : (
                              <Image
                                src={exp.logo}
                                alt={exp.company}
                                width={36}
                                height={36}
                                className="object-contain filter brightness-110"
                              />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#dfc3a2] transition-colors">
                                {exp.company}
                              </h3>
                              {exp.url && (
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfc3a2] transition-colors" />
                              )}
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-0.5">
                              {exp.role}
                            </p>
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                              {exp.desc}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-900/90 text-zinc-400 border border-white/5 whitespace-nowrap flex-shrink-0">
                          {exp.date}
                        </span>
                      </div>

                      {/* Tag badges */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </ContentWrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education & Certificates & Vision */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-2.5 pb-2 text-xs font-mono uppercase tracking-widest text-[#dfc3a2]">
              <GraduationCap className="w-4 h-4" />
              <span className="font-bold">Eğitim & Sertifikalar</span>
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{
                scale: 0.985,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="p-5 sm:p-6 rounded-2xl bg-[#0f0f13]/90 border border-white/[0.07] hover:border-[#dfc3a2]/40 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#dfc3a2] flex-shrink-0">
                    ERÜ
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      Erciyes Üniversitesi
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-0.5">
                      Bilgisayar Mühendisliği (Lisans)
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      %30 İngilizce Müfredat • Yazılım Mimarileri & Sistem Analizi
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-white/5 whitespace-nowrap">
                  2020 - 2025
                </span>
              </div>
            </motion.div>

            {/* Certificate Card: N4 ERP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{
                scale: 0.985,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="p-5 sm:p-6 rounded-2xl bg-[#0f0f13]/90 border border-[#dfc3a2]/30 hover:border-[#dfc3a2]/60 transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-0.5 bg-[#dfc3a2]/20 border-b border-l border-[#dfc3a2]/40 rounded-bl-xl text-[9px] font-mono text-[#dfc3a2] font-semibold uppercase">
                Uygulamalı Eğitim
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfc3a2]/10 border border-[#dfc3a2]/40 flex items-center justify-center font-mono font-bold text-xs text-[#dfc3a2] flex-shrink-0">
                  <Award className="w-5 h-5 text-[#dfc3a2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    N4 ERP Uygulamalı Eğitimi
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#dfc3a2] mt-0.5">
                    Netsim Yazılım • 40 Saat (Aralık 2025)
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                    Stok, Sipariş, Üretim ve Satınalma modüllerinde uçtan uca uygulamalı ERP süreçleri tamamlandı.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Career Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{
                scale: 0.985,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121217] via-[#0f0f14] to-[#0a0a0d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start gap-3.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-[#dfc3a2] flex-shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Kariyer Hedefi & Vizyon
                  </h4>
                  <p className="text-[11px] text-zinc-400">Sürekli Gelişim & Sahiplenme İlkesi</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans italic border-l-2 border-[#dfc3a2]/60 pl-3 py-1">
                &ldquo;Modern yazılım mimarilerinde uzmanlaşmayı hedefliyorum. Ailemden aldığım güçlü çalışma ahlakı ve azmimle güvenebileceğiniz bir takım arkadaşı olmak en büyük gayem. Her işe büyük bir sahiplenme duygusuyla yaklaşır, hakkını vererek yapmaya çalışırım.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
