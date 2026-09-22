import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface ScrollableTabsProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  hintText?: string;
  showArrows?: boolean;
  pillColor?: "blue" | "rose" | "amber" | "emerald" | "purple" | "stone" | "slate";
  gap?: string;
}

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  children,
  className = "",
  containerClassName = "",
  hintText = "Vuốt xem thêm",
  showArrows = true,
  pillColor = "blue",
  gap = "gap-2"
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Tolerance of 4px
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollWidth - (scrollLeft + clientWidth) > 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    window.addEventListener("resize", checkScroll);

    const observer = new ResizeObserver(() => {
      checkScroll();
    });
    observer.observe(el);

    return () => {
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  const handleScrollBy = (offset: number) => {
    setHasInteracted(true);
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkScroll, 250);
    }
  };

  // Vivid theme color maps for vibrant navigation buttons & badges
  const themeStyles = {
    blue: {
      btn: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/40 border-2 border-white",
      badge: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-white shadow-md shadow-blue-500/30",
    },
    rose: {
      btn: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md shadow-rose-500/40 border-2 border-white",
      badge: "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-white shadow-md shadow-rose-500/30",
    },
    amber: {
      btn: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/40 border-2 border-white",
      badge: "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-white shadow-md shadow-orange-500/30",
    },
    emerald: {
      btn: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/40 border-2 border-white",
      badge: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-white shadow-md shadow-emerald-500/30",
    },
    purple: {
      btn: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/40 border-2 border-white",
      badge: "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-white shadow-md shadow-purple-500/30",
    },
    stone: {
      btn: "bg-gradient-to-r from-stone-800 to-slate-900 hover:from-black hover:to-stone-900 text-white shadow-md shadow-stone-800/40 border-2 border-white",
      badge: "bg-gradient-to-r from-stone-800 to-slate-900 text-white border-white shadow-md shadow-stone-800/30",
    },
    slate: {
      btn: "bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white shadow-md shadow-slate-700/40 border-2 border-white",
      badge: "bg-gradient-to-r from-slate-700 to-slate-900 text-white border-white shadow-md shadow-slate-700/30",
    },
  }[pillColor];

  return (
    <div className={`relative group/scroll-tabs w-full max-w-full ${containerClassName}`}>
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={() => {
          checkScroll();
          if (!hasInteracted) setHasInteracted(true);
        }}
        className={`flex items-center ${gap} overflow-x-auto scrollbar-none overscroll-x-contain py-1 px-1 select-none ${className}`}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Left Fade Gradient Mask with High-Contrast Vivid Button */}
      {canScrollLeft && (
        <div 
          onClick={() => handleScrollBy(-180)}
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-auto flex items-center justify-start pl-1 z-20 cursor-pointer transition-all"
        >
          {showArrows && (
            <button
              type="button"
              aria-label="Cuộn sang trái"
              title="Cuộn sang trái"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-transform ${themeStyles.btn}`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      )}

      {/* Right Fade Gradient Mask with High-Contrast Vivid Button */}
      {canScrollRight && (
        <div 
          onClick={() => handleScrollBy(180)}
          className="absolute right-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-auto flex items-center justify-end pr-1 z-20 cursor-pointer transition-all"
        >
          {showArrows && (
            <button
              type="button"
              aria-label="Cuộn sang phải"
              title="Cuộn sang phải"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-transform animate-pulse ${themeStyles.btn}`}
            >
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      )}

      {/* Pulsing Hint Badge when more content is hidden on the right */}
      {canScrollRight && !hasInteracted && (
        <div 
          onClick={() => handleScrollBy(200)}
          className="absolute -top-3.5 right-3 z-30 pointer-events-auto cursor-pointer animate-bounce hidden xs:flex items-center"
        >
          <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border tracking-wide ${themeStyles.badge}`}>
            <span>{hintText}</span>
            <ChevronsRight className="w-3 h-3 stroke-[3]" />
          </span>
        </div>
      )}
    </div>
  );
};
