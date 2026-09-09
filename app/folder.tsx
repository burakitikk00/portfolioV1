"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HelloSection from "./components/HelloSection";
import CreativeDevHero from "./components/CreativeDevHero";
import AboutMeSection from "./components/AboutMeSection";
import WhatIHelpSection from "./components/WhatIHelpSection";
import ExperienceSection from "./components/ExperienceSection";
import LiquidWorkSection from "./components/LiquidWorkSection";
import ProjectSliderSection from "./components/ProjectSliderSection";
import ContactSection from "./components/ContactSection";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Slide Definitions
 * Maps all 8 original sections into full-screen (100vh) slide components.
 */
const SLIDES = [
  {
    id: "hello",
    num: "01",
    name: "Giriş",
    component: <HelloSection />,
  },
  {
    id: "creative-dev",
    num: "02",
    name: "Software Dev",
    component: <CreativeDevHero />,
  },
  {
    id: "about",
    num: "03",
    name: "Hakkımda",
    component: <AboutMeSection />,
  },
  {
    id: "what-i-help",
    num: "04",
    name: "Yetenekler",
    component: <WhatIHelpSection />,
  },
  {
    id: "experience",
    num: "05",
    name: "Deneyimler",
    component: <ExperienceSection />,
  },
  {
    id: "work",
    num: "06",
    name: "Work",
    component: <LiquidWorkSection />,
  },
  {
    id: "showcase",
    num: "07",
    name: "Projeler",
    component: <ProjectSliderSection />,
  },
  {
    id: "contact",
    num: "08",
    name: "İletişim",
    component: <ContactSection />,
  },
];

/**
 * Slide transition variants using the requested Apple-style Quintic ease curve [0.76, 0, 0.24, 1]
 */
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: "0%",
    opacity: 1,
    transition: {
      y: { type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.75 },
      opacity: { duration: 0.4, ease: "easeOut" },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-35%" : "35%",
    opacity: 0,
    transition: {
      y: { type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.4 },
      opacity: { duration: 0.35, ease: "easeIn" },
    },
  }),
};

export default function Portfolio() {
  // State: [currentSlideIndex, direction (-1 for up, +1 for down)]
  const [[currentSlideIndex, direction], setSlideState] = useState<[number, number]>([0, 0]);

  // Stretch / rubberband state (0 to 1) for bottom edge transition
  const [bottomStretch, setBottomStretch] = useState(0);
  const overscrollYRef = useRef(0);
  const overscrollUpRef = useRef(0);
  const decayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce and animation lock refs
  const isAnimatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const activeSlideContainerRef = useRef<HTMLDivElement | null>(null);

  // Touch tracking refs
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  /**
   * Navigate to a slide relative to current (+1 or -1)
   */
  const paginate = useCallback((newDirection: number) => {
    setSlideState(([current]) => {
      const nextIndex = current + newDirection;
      if (nextIndex < 0 || nextIndex >= SLIDES.length) {
        return [current, 0];
      }
      return [nextIndex, newDirection];
    });
  }, []);

  /**
   * Jump directly to a specific slide index
   */
  const goToSlide = useCallback((targetIndex: number) => {
    setSlideState(([current]) => {
      if (targetIndex === current) return [current, 0];
      const newDir = targetIndex > current ? 1 : -1;
      return [targetIndex, newDir];
    });
  }, []);

  /**
   * Trigger slide transition with debounce protection
   */
  const triggerSlideChange = useCallback(
    (newDirection: number) => {
      const now = Date.now();
      if (isAnimatingRef.current || now - lastScrollTimeRef.current < 850) {
        return;
      }

      if (newDirection > 0 && currentSlideIndex < SLIDES.length - 1) {
        if (currentSlideIndex === 0) {
          const win = window as unknown as { __portfolioPlayHelloChime?: () => void };
          if (typeof win.__portfolioPlayHelloChime === "function") {
            win.__portfolioPlayHelloChime();
          }
        }
        isAnimatingRef.current = true;
        lastScrollTimeRef.current = now;
        paginate(1);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 900);
      } else if (newDirection < 0 && currentSlideIndex > 0) {
        isAnimatingRef.current = true;
        lastScrollTimeRef.current = now;
        paginate(-1);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 900);
      }
    },
    [currentSlideIndex, paginate]
  );

  // Track slide direction and helpers globally so nested sliders can navigate seamlessly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as unknown as {
        __portfolioSlideDirection?: number;
        __portfolioTriggerSlideChange?: (dir: number) => void;
        __portfolioGoToSlide?: (idx: number) => void;
      };
      win.__portfolioSlideDirection = direction;
      win.__portfolioTriggerSlideChange = triggerSlideChange;
      win.__portfolioGoToSlide = goToSlide;
    }
  }, [direction, triggerSlideChange, goToSlide]);

  /**
   * 1. Mouse Wheel Handler with momentum, stretch accumulation & internal scroll detection
   */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Threshold to ignore micro jitters
      if (Math.abs(e.deltaY) < 14) return;

      const isScrollingDown = e.deltaY > 0;
      const delta = isScrollingDown ? 1 : -1;
      const isWorkSlide = SLIDES[currentSlideIndex]?.id === "work";
      const isWhatIHelpSlide = SLIDES[currentSlideIndex]?.id === "what-i-help";

      // Check if project showcase is active
      const win = window as unknown as {
        __portfolioProjectScrollHandler?: ((d: number) => boolean) | null;
      };
      if (win.__portfolioProjectScrollHandler) {
        const handled = win.__portfolioProjectScrollHandler(delta);
        if (handled) {
          overscrollYRef.current = 0;
          setBottomStretch(0);
          return;
        }
      }

      // Check if current active slide has internal scrollable content (e.g., WhatIHelp card stacks)
      const container = activeSlideContainerRef.current;
      let isAtBottom = true;
      let isAtTop = true;

      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const hasScrollableContent = scrollHeight > clientHeight + 35;

        if (hasScrollableContent) {
          isAtBottom = scrollTop + clientHeight >= scrollHeight - (isWhatIHelpSlide ? 8 : 25);
          isAtTop = scrollTop <= 25;

          // If scrolling down and haven't reached the bottom yet, let native slide container scroll
          if (isScrollingDown && !isAtBottom) {
            overscrollYRef.current = 0;
            setBottomStretch(0);
            return;
          }
          // If scrolling up and haven't reached the top yet, let native slide container scroll
          if (!isScrollingDown && !isAtTop) {
            overscrollYRef.current = 0;
            setBottomStretch(0);
            return;
          }
        }
      }

      // If scrolling UP:
      if (!isScrollingDown) {
        // Reset any bottom stretch immediately
        if (decayTimerRef.current) clearTimeout(decayTimerRef.current);
        overscrollYRef.current = 0;
        setBottomStretch(0);

        if (isAtTop && currentSlideIndex > 0) {
          if (isWorkSlide) {
            overscrollUpRef.current = 0;
            triggerSlideChange(-1);
          } else {
            overscrollUpRef.current += Math.abs(e.deltaY);
            if (overscrollUpRef.current > 140) {
              overscrollUpRef.current = 0;
              triggerSlideChange(-1);
            } else {
              if (decayTimerRef.current) clearTimeout(decayTimerRef.current);
              decayTimerRef.current = setTimeout(() => {
                overscrollUpRef.current = 0;
              }, 240);
            }
          }
        }
        return;
      }

      // If scrolling DOWN and reached the bottom of current slide:
      if (isScrollingDown && isAtBottom) {
        // If animation is in progress, ignore
        if (isAnimatingRef.current) return;

        // On WORK and WHAT-I-HELP slides: smooth immediate transition to next section without upward drag/tutunma
        if (isWorkSlide || isWhatIHelpSlide) {
          overscrollYRef.current = 0;
          setBottomStretch(0);
          triggerSlideChange(1);
          return;
        }

        // On the last slide, give elastic rubberband bounce but do not navigate
        if (currentSlideIndex === SLIDES.length - 1) {
          overscrollYRef.current = Math.min(overscrollYRef.current + Math.abs(e.deltaY), 150);
          setBottomStretch(Math.min(overscrollYRef.current / 220, 0.65));
          if (decayTimerRef.current) clearTimeout(decayTimerRef.current);
          decayTimerRef.current = setTimeout(() => {
            overscrollYRef.current = 0;
            setBottomStretch(0);
          }, 240);
          return;
        }

        // For other slides: "en alta gelince hemen geçmesin biraz tutunsun aynı sayfada sonra geçsin. sündürme efekti ekle"
        const PULL_THRESHOLD = 260; // Accumulation threshold in pixels of wheel movement
        overscrollYRef.current += Math.abs(e.deltaY);

        const progress = Math.min(overscrollYRef.current / PULL_THRESHOLD, 1);
        setBottomStretch(progress);

        if (decayTimerRef.current) clearTimeout(decayTimerRef.current);

        if (overscrollYRef.current >= PULL_THRESHOLD) {
          // Tension threshold met! Release and transition
          overscrollYRef.current = 0;
          setTimeout(() => {
            setBottomStretch(0);
          }, 200);
          triggerSlideChange(1);
        } else {
          // If the user pauses or stops scrolling before threshold, gently hold and recoil back
          decayTimerRef.current = setTimeout(() => {
            overscrollYRef.current = 0;
            setBottomStretch(0);
          }, 280);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (decayTimerRef.current) clearTimeout(decayTimerRef.current);
    };
  }, [triggerSlideChange, currentSlideIndex]);

  /**
   * 2. Touch Gestures Handler (Mobile / Tablet Swipe with elastic stretch)
   */
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const diffY = touchStartYRef.current - touchY;
      const diffX = Math.abs(touchStartXRef.current - touchX);

      // On WORK and WHAT-I-HELP slides: no bottom stretch / tutunma effect
      if (SLIDES[currentSlideIndex]?.id === "work" || SLIDES[currentSlideIndex]?.id === "what-i-help") {
        return;
      }

      if (Math.abs(diffY) > diffX && diffY > 0) {
        // Swiping up (pulling bottom up towards next slide)
        const container = activeSlideContainerRef.current;
        let isAtBottom = true;
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          isAtBottom = scrollHeight <= clientHeight + 35 || scrollTop + clientHeight >= scrollHeight - 25;
        }

        if (isAtBottom && currentSlideIndex < SLIDES.length - 1) {
          const progress = Math.min(diffY / 130, 1);
          setBottomStretch(progress);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;

      const diffY = touchStartYRef.current - touchEndY;
      const diffX = Math.abs(touchStartXRef.current - touchEndX);

      touchStartYRef.current = null;
      touchStartXRef.current = null;

      const isWorkSlide = SLIDES[currentSlideIndex]?.id === "work";
      const isWhatIHelpSlide = SLIDES[currentSlideIndex]?.id === "what-i-help";

      if (Math.abs(diffY) > diffX && Math.abs(diffY) > 35) {
        const delta = diffY > 0 ? 1 : -1;

        const win = window as unknown as {
          __portfolioProjectScrollHandler?: ((d: number) => boolean) | null;
        };
        if (win.__portfolioProjectScrollHandler && win.__portfolioProjectScrollHandler(delta)) {
          setBottomStretch(0);
          return;
        }

        const container = activeSlideContainerRef.current;
        let isAtBottom = true;
        let isAtTop = true;
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          isAtBottom = scrollHeight <= clientHeight + 35 || scrollTop + clientHeight >= scrollHeight - (isWhatIHelpSlide ? 8 : 25);
          isAtTop = scrollTop <= 25;
        }

        if (delta === 1 && isAtBottom) {
          if (isWorkSlide || isWhatIHelpSlide) {
            // WORK and WHAT-I-HELP slides: smooth immediate slide transition on mobile swipe without tutunma/resistance
            triggerSlideChange(1);
          } else if (diffY >= 75 && currentSlideIndex < SLIDES.length - 1) {
            triggerSlideChange(1);
          }
        } else if (delta === -1 && isAtTop && currentSlideIndex > 0) {
          triggerSlideChange(-1);
        }
      }

      setBottomStretch(0);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [triggerSlideChange, currentSlideIndex]);

  /**
   * 3. Keyboard Navigation (Arrow keys, PageUp/Down, Home/End)
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      // Ignore space key to prevent unwanted scrolling or page jumping
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        return;
      }

      const win = window as unknown as {
        __portfolioProjectScrollHandler?: ((d: number) => boolean) | null;
      };

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (win.__portfolioProjectScrollHandler) {
          const handled = win.__portfolioProjectScrollHandler(1);
          if (handled) {
            e.preventDefault();
            return;
          }
        }
        e.preventDefault();
        triggerSlideChange(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (win.__portfolioProjectScrollHandler) {
          const handled = win.__portfolioProjectScrollHandler(-1);
          if (handled) {
            e.preventDefault();
            return;
          }
        }
        e.preventDefault();
        triggerSlideChange(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerSlideChange, goToSlide]);

  /**
   * 4. Anchor Link & scrollIntoView Bridge
   * Intercepts clicks on in-page links (e.g. href="#about") and calls to element.scrollIntoView
   */
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const targetId = href.replace("#", "");

      const targetIndex = SLIDES.findIndex((s) => s.id === targetId);
      if (targetIndex !== -1) {
        e.preventDefault();
        goToSlide(targetIndex);
      }
    };

    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      const id = this.id;
      const targetIndex = SLIDES.findIndex((s) => s.id === id);
      if (targetIndex !== -1) {
        goToSlide(targetIndex);
        return;
      }
      return originalScrollIntoView.call(this, options);
    };

    window.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("click", handleAnchorClick, true);
      Element.prototype.scrollIntoView = originalScrollIntoView;
    };
  }, [goToSlide]);

  // Reset stretch and overscroll state whenever slide index changes (do not touch exiting slide's scrollTop)
  useEffect(() => {
    setBottomStretch(0);
    overscrollYRef.current = 0;
    overscrollUpRef.current = 0;
  }, [currentSlideIndex]);

  return (
    <main className="fixed inset-0 w-full max-w-[100vw] h-screen overflow-x-hidden overflow-y-hidden bg-[#050505] text-[#ededed] select-none">
      {/* Hidden Anchor Bridge Elements for scrollIntoView compatibility */}
      <div className="sr-only pointer-events-none" aria-hidden="true">
        {SLIDES.map((slide) => (
          <span key={slide.id} id={slide.id} />
        ))}
      </div>

      {/* Full-Page Slideshow Container */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={() => {
              isAnimatingRef.current = false;
            }}
            className="absolute inset-0 w-full h-full overflow-hidden gpu-accelerated"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Sündürme / Elastic Rubberband Stretch Container */}
            <motion.div
              animate={{
                y:
                  SLIDES[currentSlideIndex]?.id === "work" || SLIDES[currentSlideIndex]?.id === "what-i-help"
                    ? 0
                    : -bottomStretch * 46,
                scaleY:
                  SLIDES[currentSlideIndex]?.id === "work" || SLIDES[currentSlideIndex]?.id === "what-i-help"
                    ? 1
                    : 1 + bottomStretch * 0.024,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
                mass: 0.5,
              }}
              style={{
                transformOrigin: "top center",
                willChange: "transform",
              }}
              className="w-full h-full overflow-hidden"
            >
              {/* Scrollable Container per slide */}
              <div
                ref={(el) => {
                  if (el) {
                    if (el !== activeSlideContainerRef.current) {
                      el.scrollTop = 0;
                    }
                    activeSlideContainerRef.current = el;
                  }
                }}
                className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar relative"
              >
                {SLIDES[currentSlideIndex].component}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sündürme (Rubberband Stretch) Effect at the Bottom (Disabled on WORK and WHAT-I-HELP pages) */}
      {SLIDES[currentSlideIndex]?.id !== "work" && SLIDES[currentSlideIndex]?.id !== "what-i-help" && (
        <div
          className="pointer-events-none fixed bottom-0 inset-x-0 z-40 flex flex-col items-center justify-end overflow-visible select-none transition-opacity duration-200"
          style={{
            opacity: bottomStretch > 0.03 ? 1 : 0,
          }}
          aria-hidden="true"
        >
          {/* Dynamic Curved SVG Membrane */}
          <div
            className="relative w-full overflow-visible flex items-end justify-center"
            style={{
              height: `${Math.max(bottomStretch * 72, 0)}px`,
            }}
          >
            <svg
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              className="absolute inset-x-0 bottom-0 w-full h-full overflow-visible pointer-events-none"
            >
              <defs>
                <linearGradient id="stretchGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dfc3a2" stopOpacity={bottomStretch * 0.35} />
                  <stop offset="50%" stopColor="#dfc3a2" stopOpacity={bottomStretch * 0.12} />
                  <stop offset="100%" stopColor="#dfc3a2" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Elastic liquid membrane pull */}
              <path
                d={`M 0 100 Q 500 ${Math.max(100 - bottomStretch * 135, -35)} 1000 100 L 1000 100 L 0 100 Z`}
                fill="url(#stretchGlowGrad)"
              />
              {/* Glowing boundary line */}
              <path
                d={`M 0 100 Q 500 ${Math.max(100 - bottomStretch * 135, -35)} 1000 100`}
                fill="none"
                stroke="#dfc3a2"
                strokeWidth={1.5 + bottomStretch * 2.5}
                strokeOpacity={0.35 + bottomStretch * 0.65}
                style={{
                  filter: `drop-shadow(0 -3px 10px rgba(223, 195, 162, ${bottomStretch * 0.9}))`,
                }}
              />
            </svg>

            {/* Elastic Tension Release Indicator / Feedback Badge */}
            <div
              className="relative z-10 flex flex-col items-center gap-1 mb-2.5 sm:mb-3 transition-transform duration-100"
              style={{
                transform: `translateY(${Math.max((1 - bottomStretch) * 10, 0)}px)`,
              }}
            >
              <div
                className={`flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md border transition-all duration-200 shadow-2xl ${
                  bottomStretch >= 0.88
                    ? "bg-[#dfc3a2] text-black border-[#dfc3a2] scale-105 font-bold shadow-[0_0_24px_rgba(223,195,162,0.9)]"
                    : "bg-[#121214]/95 text-[#dfc3a2] border-[#dfc3a2]/40"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    bottomStretch >= 0.88 ? "bg-black animate-ping" : "bg-[#dfc3a2] animate-pulse"
                  }`}
                />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase">
                  {currentSlideIndex === SLIDES.length - 1
                    ? "Son Sayfa"
                    : bottomStretch >= 0.88
                    ? "Bırakın // Geçiliyor"
                    : "Tutunun // Çekmeye Devam Edin"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    bottomStretch >= 0.88 ? "translate-y-0.5 scale-125" : ""
                  }`}
                />
              </div>

              {/* Micro Tension Progress Bar */}
              {currentSlideIndex < SLIDES.length - 1 && (
                <div className="w-24 sm:w-28 h-1 rounded-full bg-white/10 overflow-hidden border border-white/5 backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-[#dfc3a2]/40 via-[#dfc3a2] to-white rounded-full transition-all duration-75"
                    style={{ width: `${Math.min(Math.round(bottomStretch * 100), 100)}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Vertical Pagination Indicator (Right Side) */}
      <aside
        aria-label="Sayfa Navigasyonu"
        className="fixed right-2 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 sm:gap-3.5 pointer-events-auto"
      >
        {/* Quick Prev Button */}
        <button
          onClick={() => triggerSlideChange(-1)}
          disabled={currentSlideIndex === 0}
          aria-label="Önceki Bölüm"
          className="p-0.5 sm:p-1 rounded-full text-zinc-500 hover:text-[#dfc3a2] hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
        >
          <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Dots List */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/5 shadow-2xl">
          {SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Bölüm ${slide.num}: ${slide.name}`}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              >
                {/* Floating Tooltip - visible on desktop only */}
                <span className="hidden md:block pointer-events-none absolute right-full mr-3.5 px-2.5 py-1 rounded-md bg-[#121214]/95 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#dfc3a2] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
                  {slide.num} // {slide.name}
                </span>

                {/* Dot Element */}
                <div
                  className={`relative rounded-full transition-all duration-400 ease-out ${
                    isActive
                      ? "w-2 sm:w-2.5 h-5 sm:h-7 bg-[#dfc3a2] shadow-[0_0_12px_rgba(223,195,162,0.8)]"
                      : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/20 hover:bg-white/60 group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Quick Next Button */}
        <button
          onClick={() => triggerSlideChange(1)}
          disabled={currentSlideIndex === SLIDES.length - 1}
          aria-label="Sonraki Bölüm"
          className="p-0.5 sm:p-1 rounded-full text-zinc-500 hover:text-[#dfc3a2] hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
        >
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Minimal Progress Indicator */}
        <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 select-none pt-0.5 sm:pt-1">
          <span className="text-[#dfc3a2] font-semibold">{SLIDES[currentSlideIndex].num}</span>
          <span className="opacity-40">/</span>
          <span>0{SLIDES.length}</span>
        </div>
      </aside>
    </main>
  );
}