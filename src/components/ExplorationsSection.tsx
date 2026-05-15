import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORATIONS } from "@/src/constants";
import { cn } from "@/src/lib/utils";
import PortfolioImage from "./ui/PortfolioImage";

gsap.registerPlugin(ScrollTrigger);

export default function ExplorationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = triggerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pinned content
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-content",
        pinSpacing: false,
      });

      // Parallax Items
      const items = gsap.utils.toArray<HTMLElement>(".parallax-item");
      items.forEach((item, i) => {
        const speed = i % 2 === 0 ? 100 : -150;
        gsap.to(item, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned Title Layer */}
      <div className="pinned-content h-screen w-full flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
        <div className="max-w-2xl transform">
           <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6 block">Explorations</span>
           <h2 className="text-5xl md:text-8xl font-normal mb-8 leading-[0.9]">
             Visual <span className="font-display italic">playground</span>
           </h2>
           <p className="text-muted max-w-sm mx-auto text-sm md:text-base leading-relaxed">
             Experimental work, behind-the-scenes captures, and personal projects that push the boundaries of my vision.
           </p>
        </div>
      </div>

      {/* Parallax Image Layer */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-20 -mt-[100vh]">
        <div className="grid grid-cols-2 gap-12 md:gap-40 py-20">
          {EXPLORATIONS.map((exp, idx) => (
            <div
              key={exp.id}
              className={cn(
                "parallax-item flex justify-center",
                idx % 2 !== 0 && "mt-48 md:mt-80"
              )}
            >
              <div className={cn(
                "group relative aspect-square w-full max-w-[280px] md:max-w-[420px] bg-surface rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:-rotate-1 cursor-pointer",
                exp.rotation
              )}>
                <PortfolioImage 
                  src={exp.image} 
                  alt={`Exploration ${exp.id}`} 
                  className="w-full h-full grayscale-[0.4] opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-10 mix-blend-overlay transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
