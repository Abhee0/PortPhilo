import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={cn(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300",
          scrolled && "shadow-md shadow-black/40 scale-95"
        )}
      >
        {/* Logo */}
        <a 
          href="#" 
          className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-bg overflow-hidden transition-transform hover:scale-110"
        >
          <div className="absolute inset-0 accent-gradient p-[1px]">
            <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-text-primary text-[13px] tracking-tight">RK</span>
            </div>
          </div>
        </a>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-2 opacity-50" />

        <div className="flex items-center gap-1">
          {["Home", "Work", "Journal"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-2 opacity-50" />

        <a
          href="#contact"
          className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full px-4 py-1.5 sm:py-2 text-text-primary overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300" />
          <div className="absolute inset-[1px] bg-surface rounded-full z-0" />
          <span className="relative z-10 flex items-center gap-1.5">
            Book a shoot <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
