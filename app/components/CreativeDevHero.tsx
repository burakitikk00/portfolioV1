"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedText from "./AnimatedText";

export default function CreativeDevHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms at differentiated speeds
  const mainHeadingY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const mainHeadingOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const subCategoriesY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const subCategoriesOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const footerY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const footerOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const badgeScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      ref={heroRef}
      id="creative-dev"
      className="snap-section bg-[#eee8df] text-[#111111] h-screen min-h-[560px] flex flex-col justify-between selection:bg-black selection:text-[#eee8df] overflow-hidden antialiased relative px-4 sm:px-8 md:px-12 py-5 sm:py-7"
    >
      {/* Main Header */}
      <motion.header
        style={{ y: headerY, opacity: headerOpacity }}
        className="w-full flex items-center justify-between z-20 pt-1 sm:pt-2"
      >
        <div className="flex items-center">
          <a
            href="#hello"
            className="font-signature text-2xl sm:text-3xl font-semibold tracking-wide text-[#111111] hover:opacity-75 transition-opacity"
          >
            burak itik
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-[11px] font-medium tracking-[0.2em] uppercase text-[#111111]">
          <a className="hover:opacity-50 transition-opacity" href="#about">
            HAKKIMDA
          </a>
          <a className="hover:opacity-50 transition-opacity" href="#what-i-help">
            YETENEKLER
          </a>
          <a className="hover:opacity-50 transition-opacity" href="#experience">
            DENEYİMLER
          </a>
          <a className="hover:opacity-50 transition-opacity" href="#showcase">
            PROJELER
          </a>
          <a className="hover:opacity-50 transition-opacity" href="#contact">
            İLETİŞİM
          </a>
        </nav>

        {/* Menu Indicator */}
        <div className="flex items-center">
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border border-[#111111] rounded-full hover:bg-[#111111] hover:text-[#eee8df] transition-all"
          >
            İLETİŞİME GEÇ
          </a>
        </div>
      </motion.header>

      {/* Hero Massive Headline with Letter-by-Letter AnimatedText & Parallax */}
      <main className="flex-1 flex flex-col items-center justify-center w-full my-auto py-4 sm:py-6 select-none overflow-hidden">
        <motion.div
          style={{ y: mainHeadingY, opacity: mainHeadingOpacity, willChange: "transform, opacity" }}
          className="w-full text-center flex flex-col items-center justify-center max-w-7xl mx-auto"
        >
          <h1
            className="font-hero text-[clamp(3.5rem,min(15vw,18vh),13.5rem)] font-black uppercase text-[#111111] leading-[0.88] tracking-tight block py-0 my-0"
            style={{ transform: "scaleY(1.16)", transformOrigin: "center" }}
          >
            <AnimatedText text="CREATIVE" delay={0.1} />
          </h1>

          <div className="relative flex items-center justify-center -mt-[1.5vw] sm:-mt-[1vw]">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, type: "spring", stiffness: 400, damping: 20 }}
              className="hidden sm:inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#111111] mr-3 sm:mr-4 mb-1.5"
            />
            <span
              className="font-hero text-[clamp(2.2rem,min(9.5vw,11.5vh),8rem)] font-black uppercase text-[#111111] leading-[0.88] tracking-normal"
              style={{ transform: "scaleY(1.16)", transformOrigin: "center" }}
            >
              <AnimatedText text="DEVELOPER" delay={0.3} />
            </span>
          </div>

          {/* Sub-categories */}
          <motion.div
            style={{ y: subCategoriesY, opacity: subCategoriesOpacity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-4 sm:space-x-6 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#111111] mt-4 sm:mt-6"
          >
            <span className="hover:opacity-60 cursor-pointer transition-opacity">FULL-STACK</span>
            <span className="text-[7px] leading-none">●</span>
            <span className="hover:opacity-60 cursor-pointer transition-opacity">MODERN WEB</span>
            <span className="text-[7px] leading-none">●</span>
            <span className="hover:opacity-60 cursor-pointer transition-opacity">ERP & MİMARİ</span>
          </motion.div>
        </motion.div>
      </main>

      {/* Main Footer */}
      <motion.footer
        style={{ y: footerY, opacity: footerOpacity }}
        className="w-full pb-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 z-20 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#111111]"
      >
        {/* Footer Left */}
        <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start space-x-2 order-2 md:order-1">
          <span className="font-medium text-black">© 2026</span>
          <span className="font-signature text-xl normal-case font-bold tracking-normal">
            burak itik
          </span>
        </div>

        {/* Footer Center: Scroll to explore */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center order-1 md:order-2">
          <a
            className="flex flex-col items-center space-y-1 group cursor-pointer text-[#111111] font-semibold"
            href="#about"
          >
            <span className="group-hover:opacity-60 transition-opacity">KEŞFETMEK İÇİN KAYDIRIN</span>
            <div className="animate-bounce flex flex-col items-center pt-0.5">
              <svg
                className="w-3.5 h-4 stroke-current fill-none stroke-[1.8]"
                viewBox="0 0 14 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1v10M3 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="7" cy="13.5" fill="currentColor" r="0.75" />
              </svg>
            </div>
          </a>
        </div>

        {/* Footer Right: Rotating Stamp Badge */}
        <motion.div
          style={{ scale: badgeScale }}
          className="w-full md:w-1/3 flex flex-col items-center md:items-end justify-center order-3"
        >
          <a
            aria-label="Birlikte çalışalım"
            className="group relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer"
            href="#contact"
          >
            <svg
              className="w-full h-full spin-badge transition-transform duration-500 ease-out"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  id="circlePathHero"
                />
              </defs>
              <circle
                cx="50"
                cy="50"
                fill="none"
                opacity="0.6"
                r="43"
                stroke="#111111"
                strokeDasharray="2 1.5"
                strokeWidth="1.2"
              />
              <text className="text-[7.4px] font-medium tracking-[0.22em] uppercase fill-[#111111]">
                <textPath href="#circlePathHero" startOffset="0%">
                  BİRLİKTE ÇALIŞALIM • PROJE ÜRETELİM • 
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4 text-[#111111]" />
            </div>
          </a>
        </motion.div>
      </motion.footer>
    </section>
  );
}
