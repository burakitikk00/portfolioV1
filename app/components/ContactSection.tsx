"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Copy,
  Check,
  Linkedin,
  MapPin,
  ArrowUpRight,
  Layout,
  Code,
  Cpu,
  Sparkles,
  Clock,
  Github,
  MessageSquare,
  Send,
  RotateCcw,
  Edit3,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Scope Configuration with custom descriptions & contextual bullets
const SCOPES_CONFIG = [
  {
    id: "web",
    name: "Full-Stack Web Geliştirme",
    tag: "Web & UI/UX",
    detail: "Next.js & React ile yüksek performanslı, responsive arayüzler",
    bullet: "Modern, duyarlı web uygulaması ve reaktif arayüz mimarisi",
    icon: Code,
  },
  {
    id: "erp",
    name: "ERP & Süreç Entegrasyonu",
    tag: "Entegrasyon & Veri",
    detail: "Kurumsal süreç optimizasyonu, ERP/CRM entegrasyonu ve senkronizasyon",
    bullet: "Kurumsal ERP/CRM entegrasyonu ve otomatik iş akışı kurgusu",
    icon: Cpu,
  },
  {
    id: "backend",
    name: "Backend & Veritabanı Mimarisi",
    tag: "API & DB",
    detail: "Ölçeklenebilir REST/GraphQL API altyapısı ve güvenli veritabanı tasarımı",
    bullet: "Ölçeklenebilir backend mimarisi ve güvenli veritabanı modellemesi",
    icon: Layout,
  },
  {
    id: "automation",
    name: "Masaüstü & Medya Otomasyonu",
    tag: "Otomasyon & Araçlar",
    detail: "Masaüstü araçları, video/medya işleme pipeline'ları ve otomasyon",
    bullet: "Masaüstü çözümleri ve iş süreçlerini hızlandıran medya otomasyonları",
    icon: Sparkles,
  },
];

// Meeting Time Slots Configuration
const SLOTS_CONFIG = [
  {
    label: "Yarın",
    time: "14:00 - 14:30",
    fullDesc: "Yarın saat 14:00 - 14:30 (GMT+3)",
  },
  {
    label: "Perşembe",
    time: "16:00 - 16:30",
    fullDesc: "Perşembe saat 16:00 - 16:30 (GMT+3)",
  },
  {
    label: "Özel Tarih",
    time: "Görüşme Belirle",
    fullDesc: "Ortaklaşa belirleyeceğimiz esnek bir tarih ve saatte",
  },
];

// Project Types Configuration
const PROJECT_TYPES = [
  { id: "new", label: "Yeni Proje", desc: "Sıfırdan mimari ve geliştirme" },
  { id: "enhance", label: "Mevcut Sistem", desc: "Modernizasyon veya yeni modül" },
  { id: "consult", label: "Danışmanlık", desc: "Teknik mimari ve kod inceleme" },
];

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Interactive Selections
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Full-Stack Web Geliştirme",
    "ERP & Süreç Entegrasyonu",
  ]);
  const [selectedSlot, setSelectedSlot] = useState("Yarın");
  const [projectType, setProjectType] = useState("new");

  // Optional Sender details
  const [senderName, setSenderName] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [showOptionalInputs, setShowOptionalInputs] = useState(false);

  // Manual message edit override
  const [isCustomEditing, setIsCustomEditing] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [justUpdated, setJustUpdated] = useState(false);

  // Istanbul Clock
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

  // Flash micro-indicator when selections change
  const triggerUpdateFlash = () => {
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 900);
  };

  const toggleScope = (scopeName: string) => {
    setSelectedScopes((prev) => {
      const next = prev.includes(scopeName)
        ? prev.filter((s) => s !== scopeName)
        : [...prev, scopeName];
      return next;
    });
    triggerUpdateFlash();
  };

  const handleSelectSlot = (slotLabel: string) => {
    setSelectedSlot(slotLabel);
    triggerUpdateFlash();
  };

  const handleSelectProjectType = (typeId: string) => {
    setProjectType(typeId);
    triggerUpdateFlash();
  };

  // Dynamic Message Generator
  const generatedMessage = useMemo(() => {
    const cleanName = senderName.trim();
    const cleanNote = customNote.trim();
    const slotObj = SLOTS_CONFIG.find((s) => s.label === selectedSlot);
    const slotDesc = slotObj ? slotObj.fullDesc : selectedSlot;
    const typeObj = PROJECT_TYPES.find((t) => t.id === projectType);

    const greeting = cleanName
      ? `Merhaba Burak,\n\nBen ${cleanName}, portfolyon üzerinden seninle iletişime geçiyorum.`
      : `Merhaba Burak,\n\nPortfolyon üzerinden seninle iletişime geçiyorum.`;

    let scopesContent = "";
    if (selectedScopes.length > 0) {
      scopesContent = selectedScopes
        .map((scopeName) => {
          const conf = SCOPES_CONFIG.find((sc) => sc.name === scopeName);
          return `  • ${scopeName}${conf ? ` (${conf.bullet})` : ""}`;
        })
        .join("\n");
    } else {
      scopesContent = "  • Genel Danışmanlık ve Yeni Proje Fikir Değerlendirmesi";
    }

    const typeLine = typeObj
      ? `• ${typeObj.label} (${typeObj.desc})`
      : "• Yeni İş Birliği";

    let body = `${greeting}\n\n`;
    body += `Aşağıda belirttiğim kapsamda seninle birlikte çalışmak ve süreci planlamak istiyorum:\n\n`;
    body += `📌 Hizmet Kapsamı:\n${scopesContent}\n\n`;
    body += `🚀 Proje Durumu / Türü:\n  ${typeLine}\n\n`;
    body += `⏱️ Tercih Edilen Toplantı Zamanı:\n  • ${slotDesc}\n\n`;

    if (cleanNote) {
      body += `📝 Ek Detay / Not:\n  "${cleanNote}"\n\n`;
    }

    body += `Detayları ve yol haritasını değerlendirmek üzere geri dönüşünü rica ederim.\n\nİyi çalışmalar${cleanName ? `,\n${cleanName}` : "!"}`;

    return body;
  }, [selectedScopes, selectedSlot, projectType, senderName, customNote]);

  // Sync custom message buffer whenever auto-generated changes, unless user is actively custom-editing
  useEffect(() => {
    if (!isCustomEditing) {
      setCustomMessage(generatedMessage);
    }
  }, [generatedMessage, isCustomEditing]);

  // Active message to display and send
  const activeMessage = isCustomEditing ? customMessage : generatedMessage;

  // Dynamic Subject
  const dynamicSubject = useMemo(() => {
    const scopePart =
      selectedScopes.length > 0
        ? selectedScopes.join(", ")
        : "İş Birliği & Danışmanlık";
    const namePart = senderName.trim() ? ` - ${senderName.trim()}` : "";
    return `Proje Talebi: ${scopePart}${namePart}`;
  }, [selectedScopes, senderName]);

  // Actions
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("burakitikk00@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(activeMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2200);
  };

  const handleResetToAuto = () => {
    setIsCustomEditing(false);
    setCustomMessage(generatedMessage);
    triggerUpdateFlash();
  };

  // Pre-encoded mailto URL
  const mailtoUrl = `mailto:burakitikk00@gmail.com?subject=${encodeURIComponent(
    dynamicSubject
  )}&body=${encodeURIComponent(activeMessage)}`;

  return (
    <section
      id="contact"
      className="snap-section bg-[#08080a] text-zinc-100 font-sans antialiased min-h-screen w-full max-w-[100vw] relative overflow-x-hidden selection:bg-[#e2be82] selection:text-black py-6 sm:py-8 lg:py-10 px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Ambient Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#e2be82]/10 blur-[130px] pointer-events-none rounded-full z-0"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-white/[0.03] blur-[140px] pointer-events-none rounded-full z-0"></div>

      <div className="relative z-10 max-w-[1520px] mx-auto min-h-screen flex flex-col justify-between">
        {/* Top Header */}
        <header className="w-full flex items-center justify-between pb-3 sm:pb-5 border-b border-white/[0.04]">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-medium tracking-wider text-zinc-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#e2be82] animate-pulse"></span>
            <PhoneCall className="w-3.5 h-3.5 text-[#e2be82]" />
            <span>İLETİŞİM & DİNAMİK MESAJ MERKEZİ</span>
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

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start my-auto py-4 sm:py-6 lg:py-8">
          {/* Left Column: Direct Links & Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6 text-center lg:text-left items-center lg:items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e2be82]/10 border border-[#e2be82]/20 text-[#e2be82] text-[10px] sm:text-[11px] font-mono mb-3 tracking-wider uppercase">
                <Zap className="w-3 h-3" />
                <span>Akıllı İletişim Formu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[56px] font-medium tracking-tight text-white leading-[1.08]">
                Birlikte anlamlı
                <br />
                <span className="bg-gradient-to-r from-[#fcedd0] via-[#e2be82] to-[#bc8a42] bg-clip-text text-transparent font-normal">
                  projeler
                </span>
                <br />
                üretelim.
              </h2>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-lg">
                Seçtiğiniz hizmetlere ve toplantı zamanına göre sağ tarafta dinamik bir mesaj otomatik olarak hazırlanır. İster tek tıkla e-posta gönderin, ister panoya kopyalayın.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-2 sm:gap-2.5 pt-1 w-full max-w-xl mx-auto lg:mx-0">
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a]"
              >
                <div className="flex items-center gap-3 text-left min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] group-hover:border-[#e2be82]/30 transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      E-Posta Adresi
                    </p>
                    <a
                      href="mailto:burakitikk00@gmail.com"
                      className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-[#e2be82] transition-colors truncate block"
                    >
                      burakitikk00@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer shrink-0 ml-2"
                  title="E-posta adresini kopyala"
                  aria-label="Kopyala"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                href="https://linkedin.com/in/burakitik00"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a]"
              >
                <div className="flex items-center gap-3 text-left min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      LinkedIn
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      linkedin.com/in/burakitik00
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 group-hover:text-white group-hover:bg-zinc-800 transition-all shrink-0 ml-2">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>

              {/* GitHub Card */}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                href="https://github.com/burakitikk00"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-[#e2be82]/40 transition-all duration-300 hover:bg-[#15151a]"
              >
                <div className="flex items-center gap-3 text-left min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      GitHub
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      github.com/burakitikk00
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/90 text-zinc-400 border border-white/5 group-hover:text-white group-hover:bg-zinc-800 transition-all shrink-0 ml-2">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#111114] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-left min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#e2be82] transition-colors shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Lokasyon
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      Kayseri & İstanbul, Türkiye • Remote
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-white/5 text-[10px] sm:text-xs text-zinc-400 font-mono shrink-0 ml-2">
                  GMT +3
                </div>
              </motion.div>
            </div>

            {/* Principles Badges on Left */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl mx-auto lg:mx-0 pt-1 text-left">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.04]">
                <ShieldCheck className="w-4 h-4 text-[#e2be82] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-semibold text-zinc-200">
                    12-24 Saat İçinde Yanıt
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    Tüm mesaj ve iş birliklerine doğrudan dönüş.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.04]">
                <Zap className="w-4 h-4 text-[#e2be82] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-semibold text-zinc-200">
                    Şeffaf & Çevik Teslimat
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    Sürpriz maliyet olmadan planlı geliştirme.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Form & Live Message Box */}
          <div className="lg:col-span-7 w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="w-full bg-[#111114] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl relative flex flex-col justify-between backdrop-blur-xl">
              {/* Inner Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-white/[0.07] gap-2 text-left">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#e2be82]">
                    İş Birliği & Mesaj Oluşturucu
                  </span>
                  <h3 className="text-base sm:text-xl font-semibold text-white tracking-tight mt-0.5">
                    Seçimlerinize Göre Dinamik Mesaj
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 self-start sm:self-center px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Canlı Senkronize</span>
                </div>
              </div>

              {/* 1. Hizmet Kapsamı Seçimi */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <span>1. Hizmet Kapsamını Seçin</span>
                    <span className="text-[9px] font-normal text-zinc-500 font-mono">
                      ({selectedScopes.length} seçili)
                    </span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">Çoklu seçim</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SCOPES_CONFIG.map((scope) => {
                    const isSelected = selectedScopes.includes(scope.name);
                    const Icon = scope.icon;
                    return (
                      <button
                        key={scope.name}
                        type="button"
                        onClick={() => toggleScope(scope.name)}
                        className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-[68px] sm:h-[72px] cursor-pointer ${
                          isSelected
                            ? "bg-[#171720] border-[#e2be82]/70 ring-1 ring-[#e2be82]/60 text-zinc-100 shadow-[0_0_15px_rgba(226,190,130,0.12)]"
                            : "bg-zinc-900/90 border-white/[0.06] text-zinc-400 hover:border-[#e2be82]/40 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                isSelected ? "text-[#e2be82]" : "text-zinc-400"
                              }`}
                            />
                            <span className="text-[9px] font-mono text-zinc-400">
                              {scope.tag}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                              isSelected
                                ? "bg-[#e2be82]/20 text-[#e2be82]"
                                : "bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {isSelected ? "SEÇİLDİ" : "+ EKLE"}
                          </span>
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium leading-tight truncate">
                          {scope.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Toplantı Zamanı ve Proje Türü */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4 sm:mb-5">
                {/* Zaman Slotu */}
                <div className="bg-zinc-950/60 p-2.5 sm:p-3 rounded-xl border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#e2be82]" />
                      2. Görüşme Zamanı
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">GMT+3</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {SLOTS_CONFIG.map((slot) => {
                      const isSelected = selectedSlot === slot.label;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => handleSelectSlot(slot.label)}
                          className={`py-1.5 px-1 rounded-lg font-mono text-[10px] sm:text-[11px] transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-zinc-900 border border-[#e2be82]/70 text-[#fcedd0] font-semibold shadow-sm"
                              : "bg-zinc-900/60 border border-white/5 text-zinc-400 hover:border-[#e2be82]/30 hover:bg-zinc-800"
                          }`}
                        >
                          {slot.label}
                          <span className="block text-[8px] sm:text-[9px] text-zinc-500 font-sans mt-0.5 truncate">
                            {slot.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Proje Türü */}
                <div className="bg-zinc-950/60 p-2.5 sm:p-3 rounded-xl border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#e2be82]" />
                      Proje Türü
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">Hedef</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = projectType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleSelectProjectType(type.id)}
                          className={`py-1.5 px-1 rounded-lg font-mono text-[10px] sm:text-[11px] transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-zinc-900 border border-[#e2be82]/70 text-[#fcedd0] font-semibold shadow-sm"
                              : "bg-zinc-900/60 border border-white/5 text-zinc-400 hover:border-[#e2be82]/30 hover:bg-zinc-800"
                          }`}
                        >
                          {type.label}
                          <span className="block text-[8px] sm:text-[9px] text-zinc-500 font-sans mt-0.5 truncate">
                            {type.desc.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Opsiyonel Detay Ekle Aç/Kapat Butonu */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowOptionalInputs(!showOptionalInputs)}
                  className="text-[10px] sm:text-[11px] text-[#e2be82] hover:text-[#fcedd0] transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
                >
                  <span>{showOptionalInputs ? "− Detayları Gizle" : "+ İsim / Not Ekle (Opsiyonel)"}</span>
                </button>
                {senderName || customNote ? (
                  <span className="text-[9px] text-emerald-400 font-mono">Özel alanlar eklendi</span>
                ) : null}
              </div>

              {/* Opsiyonel Form Alanları */}
              {showOptionalInputs && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 bg-zinc-950/70 p-3 rounded-xl border border-white/[0.05]"
                >
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-1 font-mono">
                      Adınız veya Şirketiniz
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz / Acme Ltd."
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        triggerUpdateFlash();
                      }}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#e2be82]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-1 font-mono">
                      Kısa Not / Bütçe / Detay
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 2 ay içinde teslim hedefliyoruz"
                      value={customNote}
                      onChange={(e) => {
                        setCustomNote(e.target.value);
                        triggerUpdateFlash();
                      }}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#e2be82]"
                    />
                  </div>
                </motion.div>
              )}

              {/* 3. Dinamik Mesaj Önizleme Paneli (Terminal / Glass Style) */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#e2be82]" />
                    <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                      3. Hazırlanan Dinamik Mesaj
                    </label>
                    {justUpdated && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[9px] font-mono text-[#e2be82] bg-[#e2be82]/15 px-1.5 py-0.5 rounded border border-[#e2be82]/30"
                      >
                        ✓ Güncellendi
                      </motion.span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCustomEditing ? (
                      <button
                        type="button"
                        onClick={handleResetToAuto}
                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono transition-colors cursor-pointer"
                        title="Otomatik dinamik senkrona geri dön"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Sıfırla</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsCustomEditing(true)}
                        className="text-[10px] text-zinc-400 hover:text-[#e2be82] flex items-center gap-1 font-mono transition-colors cursor-pointer"
                        title="Mesajı doğrudan düzenle"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mesaj Kutusu */}
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-zinc-950/80 shadow-inner group">
                  {/* Terminal Header Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-white/[0.05] text-[10px] font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                      <span className="ml-2 text-zinc-500 text-[9px]">mesaj_taslagi.txt</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-[#e2be82] hidden sm:inline">
                        {isCustomEditing ? "Manuel Düzenleme" : "Otomatik Üretildi"}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="flex items-center gap-1 text-[9px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded transition-colors cursor-pointer"
                      >
                        {copiedMessage ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span className="text-emerald-400">Kopyalandı</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message Content Area */}
                  {isCustomEditing ? (
                    <textarea
                      rows={7}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full p-3 bg-transparent text-zinc-200 font-mono text-[11px] sm:text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-[#e2be82]/50"
                    />
                  ) : (
                    <div className="p-3 max-h-[160px] sm:max-h-[185px] overflow-y-auto text-zinc-300 font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre-line select-text scrollbar-thin scrollbar-thumb-zinc-800">
                      {activeMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                {/* Primary Button: İşbirliği Talebi Gönder */}
                <a
                  href={mailtoUrl}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#f7e6c4] via-[#e2be82] to-[#b6853d] text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_4px_25px_rgba(226,190,130,0.25)] cursor-pointer group"
                >
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>İşbirliği Talebi Gönder</span>
                </a>

                {/* Secondary Button: Panoya Kopyala */}
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl sm:rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-mono text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Mesajı Kopyala</span>
                    </>
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-3 sm:pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 font-mono tracking-wider gap-2 sm:gap-3 pb-3 sm:pb-5 text-center sm:text-left">
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
