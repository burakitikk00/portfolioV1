"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HelloSection from "./components/HelloSection";
import CreativeDevHero from "./components/CreativeDevHero";
import AboutMeSection from "./components/AboutMeSection";
import WhatIHelpSection from "./components/WhatIHelpSection";
import LiquidWorkSection from "./components/LiquidWorkSection";
import ProjectSliderSection from "./components/ProjectSliderSection";
import ContactSection from "./components/ContactSection";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Slide Definitions
 * Maps all 7 original sections into full-screen (100vh) slide components.
 * CRITICAL: Zero changes to component designs, Tailwind classes, HTML or colors.
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
    name: "Creative Dev",
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
    id: "work",
    num: "05",
    name: "Work",
    component: <LiquidWorkSection />,
  },
  {
    id: "showcase",
    num: "06",
    name: "Projeler",
    component: <ProjectSliderSection />,
  },
  {
    id: "contact",
    num: "07",
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

  // Track slide direction globally so nested sliders know which edge was entered from
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __portfolioSlideDirection?: number }).__portfolioSlideDirection = direction;
    }
  }, [direction]);

  /**
   * 1. Mouse Wheel Handler with momentum & internal scroll detection
   */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Threshold to ignore micro jitters
      if (Math.abs(e.deltaY) < 18) return;

      const delta = e.deltaY > 0 ? 1 : -1;

      // Check if project showcase handler is active and handles the scroll
      const win = window as unknown as { __portfolioProjectScrollHandler?: ((d: number) => boolean) | null };
      if (win.__portfolioProjectScrollHandler) {
        const handled = win.__portfolioProjectScrollHandler(delta);
        if (handled) return;
      }

      // Check if current active slide has internal scrollable content (e.g., WhatIHelp card stacks)
      const container = activeSlideContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const hasScrollableContent = scrollHeight > clientHeight + 35;

        if (hasScrollableContent) {
          // If scrolling down and haven't reached the bottom yet, let native slide container scroll
          if (delta === 1 && scrollTop + clientHeight < scrollHeight - 25) {
            return;
          }
          // If scrolling up and haven't reached the top yet, let native slide container scroll
          if (delta === -1 && scrollTop > 25) {
            return;
          }
        }
      }

      // Ready to transition to next/previous slide
      triggerSlideChange(delta);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [triggerSlideChange]);

  /**
   * 2. Touch Gestures Handler (Mobile / Tablet Swipe)
   */
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;

      const diffY = touchStartYRef.current - touchEndY;
      const diffX = touchStartXRef.current - touchEndX;

      // Ensure gesture is primarily vertical and exceeds swipe threshold
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 45) {
        const delta = diffY > 0 ? 1 : -1;

        const win = window as unknown as { __portfolioProjectScrollHandler?: ((d: number) => boolean) | null };
        if (win.__portfolioProjectScrollHandler) {
          const handled = win.__portfolioProjectScrollHandler(delta);
          if (handled) {
            touchStartYRef.current = null;
            touchStartXRef.current = null;
            return;
          }
        }

        const container = activeSlideContainerRef.current;
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          const hasScrollableContent = scrollHeight > clientHeight + 35;

          if (hasScrollableContent) {
            if (delta === 1 && scrollTop + clientHeight < scrollHeight - 25) {
              return;
            }
            if (delta === -1 && scrollTop > 25) {
              return;
            }
          }
        }

        triggerSlideChange(delta);
      }

      touchStartYRef.current = null;
      touchStartXRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [triggerSlideChange]);

  /**
   * 3. Keyboard Navigation (Arrow keys, Space, PageUp/Down, Home/End)
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

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.code === "Space") {
        const win = window as unknown as { __portfolioProjectScrollHandler?: ((d: number) => boolean) | null };
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
        const win = window as unknown as { __portfolioProjectScrollHandler?: ((d: number) => boolean) | null };
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

      let mappedId = targetId;
      if (targetId === "experience") mappedId = "showcase";

      const targetIndex = SLIDES.findIndex((s) => s.id === mappedId);
      if (targetIndex !== -1) {
        e.preventDefault();
        goToSlide(targetIndex);
      }
    };

    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      const id = this.id;
      let mappedId = id;
      if (id === "experience") mappedId = "showcase";

      const targetIndex = SLIDES.findIndex((s) => s.id === mappedId);
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

  // Reset internal container scroll position whenever slide index changes
  useEffect(() => {
    if (activeSlideContainerRef.current) {
      activeSlideContainerRef.current.scrollTop = 0;
    }
  }, [currentSlideIndex]);

  return (
    <main className="fixed inset-0 w-full h-screen overflow-hidden bg-[#050505] text-[#ededed] select-none">
      {/* Hidden Anchor Bridge Elements for scrollIntoView compatibility */}
      <div className="sr-only pointer-events-none" aria-hidden="true">
        {SLIDES.map((slide) => (
          <span key={slide.id} id={slide.id} />
        ))}
        <span id="experience" />
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
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Scrollable Container per slide */}
            <div
              ref={activeSlideContainerRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar"
            >
              {SLIDES[currentSlideIndex].component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle Vertical Pagination Indicator (Right Side) */}
      <aside
        aria-label="Sayfa Navigasyonu"
        className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3.5 pointer-events-auto"
      >
        {/* Quick Prev Button */}
        <button
          onClick={() => triggerSlideChange(-1)}
          disabled={currentSlideIndex === 0}
          aria-label="Önceki Bölüm"
          className="p-1 rounded-full text-zinc-500 hover:text-[#dfc3a2] hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Dots List */}
        <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl">
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
                {/* Floating Tooltip */}
                <span className="pointer-events-none absolute right-full mr-3.5 px-2.5 py-1 rounded-md bg-[#121214]/95 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#dfc3a2] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
                  {slide.num} // {slide.name}
                </span>

                {/* Dot Element */}
                <div
                  className={`relative rounded-full transition-all duration-400 ease-out ${
                    isActive
                      ? "w-2.5 h-7 bg-[#dfc3a2] shadow-[0_0_12px_rgba(223,195,162,0.8)]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/60 group-hover:scale-125"
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
          className="p-1 rounded-full text-zinc-500 hover:text-[#dfc3a2] hover:bg-white/5 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Minimal Progress Indicator */}
        <div className="text-[10px] font-mono tracking-wider text-zinc-500 select-none pt-1">
          <span className="text-[#dfc3a2] font-semibold">{SLIDES[currentSlideIndex].num}</span>
          <span className="opacity-40">/</span>
          <span>0{SLIDES.length}</span>
        </div>
      </aside>
    </main>
  );
}