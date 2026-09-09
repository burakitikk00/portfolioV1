"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowDown, Volume2, VolumeX } from "lucide-react";
import { playHelloChime, isSoundMuted, toggleSoundMuted, subscribeSoundMuted } from "../lib/sound";

export default function HelloSection() {
  const [animKey, setAnimKey] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(!isSoundMuted());

  useEffect(() => {
    // Keep sound state synchronized across components
    setIsSoundEnabled(!isSoundMuted());
    const unsubscribe = subscribeSoundMuted((muted) => {
      setIsSoundEnabled(!muted);
    });
    return unsubscribe;
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = toggleSoundMuted();
    setIsSoundEnabled(!newMuted);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, [animKey]);

  const handleReplay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playHelloChime();
    setShowPrompt(false);
    setAnimKey((prev) => prev + 1);
  }, []);

  const handleNavigateToNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      playHelloChime();

      const win = window as unknown as {
        __portfolioTriggerSlideChange?: ((dir: number) => void) | null;
        __portfolioGoToSlide?: ((idx: number) => void) | null;
      };

      if (typeof win.__portfolioTriggerSlideChange === "function") {
        win.__portfolioTriggerSlideChange(1);
      } else if (typeof win.__portfolioGoToSlide === "function") {
        win.__portfolioGoToSlide(1);
      } else {
        const nextSection = document.getElementById("creative-dev");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  useEffect(() => {
    // Keyboard controls (R for replay)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        return;
      }
      if (e.key.toLowerCase() === "r") {
        handleReplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleReplay]);

  return (
    <section
      id="hello"
      className="snap-section relative w-full max-w-[100vw] h-full min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#dfc3a2] bg-grain select-none overflow-hidden"
    >
      {/* Top System Minimal Bar */}
      <header className="absolute top-0 inset-x-0 h-14 sm:h-16 px-4 sm:px-6 md:px-12 flex items-center justify-between text-[11px] sm:text-xs tracking-widest uppercase text-[#dfc3a2]/40 z-20">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]"></span>
          <span className="font-light tracking-wider text-[10px] sm:text-[11px] text-zinc-400">
            Sistem Aktif · Portfolyo
          </span>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto">
          {/* Audio / Chime Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Ses Kontrolü"
            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              isSoundEnabled
                ? "border-neutral-800 bg-neutral-900/60 text-[#dfc3a2] hover:border-[#dfc3a2]/40 hover:bg-neutral-800/80 shadow-[0_0_12px_rgba(223,195,162,0.12)]"
                : "border-neutral-800/40 bg-neutral-900/30 text-neutral-500 opacity-60 hover:opacity-100"
            }`}
            title={isSoundEnabled ? "Sesi Kapat (Chime Açık)" : "Sesi Aç (Chime Kapalı)"}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#dfc3a2]" />
            ) : (
              <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
            )}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wide lowercase">
              {isSoundEnabled ? "ses açık" : "sessiz"}
            </span>
          </button>

          {/* Replay Animation Button */}
          <button
            onClick={handleReplay}
            aria-label="Animasyonu Yeniden Oynat"
            className="hover:text-zinc-200 transition-colors duration-200 cursor-pointer flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800/80 opacity-70 hover:opacity-100"
            title="Animasyonu Yeniden Oynat (veya R tuşuna basın)"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[9px] sm:text-[10px] tracking-normal font-mono lowercase">tekrar oynat</span>
          </button>
        </div>
      </header>

      {/* Center Stage: The Classic "hello" SVG Canvas */}
      <div
        onClick={handleNavigateToNext}
        className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-700 active:scale-95"
        title="Giriş yapmak için tıklayın"
      >
        <div
          key={animKey}
          className="w-full max-w-2xl hello-glow-container flex items-center justify-center"
        >
          {/* Exact cursive Apple Macintosh ligature representation in vector strokes */}
          <svg
            className="w-full h-auto overflow-visible select-none pointer-events-none drop-shadow-sm"
            fill="none"
            viewBox="0 0 680 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="warmAppleGold" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop offset="0%" stopColor="#f5e5d3" />
                <stop offset="50%" stopColor="#dfc3a2" />
                <stop offset="100%" stopColor="#cfab85" />
              </linearGradient>
              <filter id="softGlow" width="140%" height="140%" x="-20%" y="-20%">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="1.5" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Continuous Cursive Stroke */}
            <path
              className="stroke-write"
              d="
                M 90 220
                C 80 200, 85 140, 115 78
                C 126 55, 142 42, 148 60
                C 152 75, 142 125, 134 185
                C 130 215, 126 238, 126 238
                C 126 238, 135 186, 160 162
                C 182 140, 206 142, 202 182
                C 198 214, 190 236, 218 236
                C 238 236, 258 210, 274 185
                C 285 168, 290 156, 280 152
                C 264 146, 250 178, 252 205
                C 255 233, 275 238, 305 236
                C 330 234, 345 200, 362 145
                C 378 95, 394 48, 408 55
                C 418 62, 408 110, 392 178
                C 382 222, 382 238, 404 238
                C 426 238, 444 198, 460 148
                C 478 92, 492 46, 508 55
                C 518 64, 506 112, 492 180
                C 482 226, 482 238, 506 238
                C 530 238, 552 215, 570 186
                C 586 160, 582 145, 560 146
                C 534 148, 524 184, 528 210
                C 532 232, 556 238, 580 232
                C 604 224, 626 198, 642 186
              "
              filter="url(#softGlow)"
              id="hello-path"
              stroke="url(#warmAppleGold)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>

      {/* Ambient Subtle Bottom Controls / Status Indicator */}
      <footer className="absolute bottom-6 sm:bottom-10 inset-x-0 px-4 flex flex-col items-center justify-center space-y-3 pointer-events-auto">
        <motion.div
          animate={{ opacity: showPrompt ? 1 : 0.7 }}
          transition={{ duration: 0.8 }}
          onClick={handleNavigateToNext}
          className="text-center cursor-pointer group flex flex-col items-center space-y-2.5"
          title="Sonraki bölüme geçmek için tıklayın"
        >
          {/* Illuminated Interactive Indicator Dot with ripple ping */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#f3e7d5] opacity-90 shadow-[0_0_12px_#dfc3a2] group-hover:scale-125 transition-transform duration-300"></span>
            <span className="absolute w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-[#dfc3a2]/40 animate-ping pointer-events-none"></span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-[10.5px] sm:text-xs font-mono font-normal tracking-[0.16em] sm:tracking-[0.25em] text-[#dfc3a2]/70 group-hover:text-[#dfc3a2] transition-colors uppercase flex items-center gap-1.5 sm:gap-2">
              <span>Aşağı kaydırın veya giriş için tıklayın</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce text-[#dfc3a2]" />
            </p>
          </div>
        </motion.div>

        {/* Minimalist presence dot indicator */}
        <div className="flex items-center space-x-1.5 opacity-30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]/20"></span>
        </div>
      </footer>
    </section>
  );
}
