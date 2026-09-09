"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Copy,
  Check,
  Linkedin,
  MapPin,
  Calendar,
  ArrowUpRight,
  Layout,
  Code,
  Cpu,
  Sparkles,
  Clock,
  Github,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Full-Stack Web Geliştirme",
    "ERP & Süreç Entegrasyonu",
  ]);
  const [selectedSlot, setSelectedSlot] = useState("Yarın");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("tr-TR", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${timeStr} GMT+3`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("burakitikk00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const scopes = [
    { name: "Full-Stack Web Geliştirme", icon: Code },
    { name: "ERP & Süreç Entegrasyonu", icon: Cpu },
    { name: "Backend & Veritabanı Mimarisi", icon: Layout },
    { name: "Masaüstü & Medya Otomasyonu", icon: Sparkles },
  ];

  const slots = [
    { label: "Yarın", time: "14:00 - 14:30" },
    { label: "Perşembe", time: "16:00 - 16:30" },
    { label: "Özel Tarih", time: "Görüşme Belirle" },
  ];

  return (
    <section
      id="contact"
      className="snap-section bg-[#08080a] text-zinc-100 font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-[#e2be82] selection:text-black py-10 sm:py-12 lg:py-14 px-5 sm:px-8 md:px-12 lg:px-20"
    >
      {/* Background Ambient Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#e2be82]/10 blur-[130px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-white/[0.03] blur-[140px] pointer-events-none rounded-full z-0"></div>

      <div className="relative z-10 max-w-[1480px] mx-auto min-h-screen flex flex-col justify-between">
        {/* Top Header */}
        <header className="w-full flex items-center justify-between pb-8 border-b border-white/[0.04]">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md text-xs font-medium tracking-wider text-zinc-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#e2be82] animate-pulse"></span>
            <PhoneCall className="w-3.5 h-3.5 text-[#e2be82]" />
            <span>İLETİŞİM</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-400 font-mono tracking-wide">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>
              TÜRKİYE <span>{currentTime || "14:45 GMT+3"}</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">Yeni İş Birlikleri ve Projelere Açık</span>
          </div>
        </header>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-auto py-12">
          {/* Left Column: Headline & Direct Contact Pills */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-9">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-medium tracking-tight text-white leading-[1.08]">
                Birlikte anlamlı
                <br />
                <span className="bg-gradient-to-r from-[#fcedd0] via-[#e2be82] to-[#bc8a42] bg-clip-text text-transparent font-normal">
                  projeler
                </span>
                <br />
                üretelim.
              </h2>
              <p className="mt-7 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-lg">
                Aklınızda bir proje, iş teklifi veya sadece tanışmak istediğiniz bir fikir mi var? Mesajınızı bekliyorum.
              </p>
            </div>

            {/* Stacked Action Cards */}
            <div className="flex flex-col gap-3.5 pt-2 max-w-xl">
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{
                  scale: 0.985,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] group-hover:border-[#e2be82]/30 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      E-Posta Gönder
                    </p>
                    <a
                      href="mailto:burakitikk00@gmail.com"
                      className="text-sm sm:text-base font-medium text-zinc-200 mt-0.5 hover:text-[#e2be82] transition-colors select-all"
                    >
                      burakitikk00@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                  title="E-posta adresini kopyala"
                  aria-label="Kopyala"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
                whileHover={{
                  scale: 0.985,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                href="https://linkedin.com/in/burakitik00"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      LinkedIn Profilim
                    </p>
                    <p className="text-sm sm:text-base font-medium text-zinc-200 mt-0.5">
                      linkedin.com/in/burakitik00
                    </p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 group-hover:text-white group-hover:bg-zinc-800 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.a>

              {/* GitHub Card */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.24 }}
                whileHover={{
                  scale: 0.985,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                href="https://github.com/burakitikk00"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      GitHub Repolarım
                    </p>
                    <p className="text-sm sm:text-base font-medium text-zinc-200 mt-0.5">
                      github.com/burakitikk00
                    </p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 group-hover:text-white group-hover:bg-zinc-800 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{
                  scale: 0.985,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Lokasyon
                    </p>
                    <p className="text-sm sm:text-base font-medium text-zinc-200 mt-0.5">
                      Kayseri & İstanbul, Türkiye • Uzaktan (Remote)
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-400 font-mono">
                  GMT +3
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Dashboard */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full bg-[#111114] border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative flex flex-col justify-between backdrop-blur-xl">
              {/* Inner Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.07] gap-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#e2be82]">
                    İş Birliği Başlat
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-1">
                    Proje Talebi & Detayları
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Yeni Projelere Hazır</span>
                </div>
              </div>

              {/* 1. Scope Selection */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    1. Hizmet Kapsamını Seçin
                  </label>
                  <span className="text-xs text-zinc-500 font-mono">Çoklu seçim aktif</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scopes.map((scope) => {
                    const isSelected = selectedScopes.includes(scope.name);
                    const Icon = scope.icon;
                    return (
                      <button
                        key={scope.name}
                        type="button"
                        onClick={() => toggleScope(scope.name)}
                        className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between h-[82px] cursor-pointer ${
                          isSelected
                            ? "bg-[#16161c] border-[#e2be82]/60 ring-1 ring-[#e2be82]/60 text-zinc-200"
                            : "bg-zinc-900/90 border-white/[0.06] text-zinc-400 hover:border-[#e2be82]/40 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <Icon
                            className={`w-4 h-4 ${
                              isSelected ? "text-[#e2be82]" : "text-zinc-400"
                            }`}
                          />
                          <span
                            className={`text-[10px] font-mono ${
                              isSelected ? "text-[#e2be82]" : "text-zinc-500"
                            }`}
                          >
                            {isSelected ? "SEÇİLDİ" : "EKLE"}
                          </span>
                        </div>
                        <span className="text-xs font-medium leading-snug">{scope.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Instant Booking Slots */}
              <div className="mb-7 bg-zinc-950/60 p-4 rounded-2xl border border-white/[0.04]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#e2be82]" />
                    2. Hızlı Görüşme Zamanı
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">Saat Dilimi: GMT+3</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.label;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`py-2.5 px-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-zinc-900/90 border border-[#e2be82]/60 text-[#fcedd0]"
                            : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:border-[#e2be82]/40 hover:bg-zinc-800"
                        }`}
                      >
                        {slot.label}
                        <span className="block text-[10px] text-zinc-400 font-sans mt-0.5 whitespace-nowrap">
                          {slot.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Partnership Standards */}
              <div className="space-y-2.5 mb-8">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  3. Çalışma Prensipleri
                </label>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.03]">
                  <span className="text-xs font-mono text-[#e2be82] pt-0.5">01</span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">
                      Hızlı Geri Dönüş Garantisi
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Tüm mesaj ve iş birliği taleplerine 12-24 saat içinde doğrudan geri dönüş.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.03]">
                  <span className="text-xs font-mono text-[#e2be82] pt-0.5">02</span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">
                      Şeffaf Süreç ve Güvenilir Teslimat
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Belirlenen takvim, düzenli iletişim ve sürpriz maliyet olmadan eksiksiz proje teslimi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`mailto:burakitikk00@gmail.com?subject=Proje Talebi - ${selectedScopes.join(", ")}&body=Merhaba Burak,%0D%0A%0D%0AŞu alanlarda seninle görüşmek istiyorum: ${selectedScopes.join(", ")}.%0D%0ATercih Edilen Zaman: ${selectedSlot}.`}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#f7e6c4] via-[#e2be82] to-[#b6853d] text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_4px_25px_rgba(226,190,130,0.25)]"
              >
                <span>İş Birliği Talebi Gönder</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-mono tracking-wider gap-3 pb-6">
          <div>© 2026 BURAK İTİK — BİLGİSAYAR MÜHENDİSİ & FULL-STACK DEVELOPER</div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#hello" className="hover:text-white transition">
              BAŞA DÖN ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
