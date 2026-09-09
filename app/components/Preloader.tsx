"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds smooth count

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      // Smooth cubic ease out
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      const current = Math.floor(eased * 100);
      setProgress(current);

      if (progressRatio < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 350);
      }
    };

    const animId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 sm:p-14 bg-[#050505] text-[#ededed] select-none pointer-events-auto"
        >
          {/* Top Telemetry */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-[0.28em] text-zinc-500 uppercase">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-400">BURAK İTİK // PORTFOLIO</span>
            </div>
            <span className="hidden sm:inline-block text-zinc-600">
              INITIALIZING CREATIVE ENGINE
            </span>
          </div>

          {/* Center Stage: Hello. Display */}
          <div className="flex flex-col items-center justify-center my-auto space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-6xl sm:text-8xl md:text-9xl text-[#dfc3a2] tracking-normal drop-shadow-[0_0_40px_rgba(223,195,162,0.25)]"
            >
              Hello<span className="text-red-500 font-sans not-italic">.</span>
            </motion.h1>

            {/* Minimalist Progress Track */}
            <div className="w-52 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#dfc3a2] via-[#edd8c4] to-[#cfab85]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Telemetry & Counter */}
          <div className="flex items-end justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfc3a2]"></span>
              <span>LOADING SYSTEM ASSETS</span>
            </div>

            <div className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-tighter">
              {progress < 10 ? `0${progress}` : progress}
              <span className="text-base sm:text-lg font-normal text-[#dfc3a2] ml-1.5">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
