import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

const roles = ["Portrait", "Landscape", "Editorial", "Fine Art"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    }

    // Role Cycler
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    // GSAP Entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(".name-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.1,
      })
      .to(".blur-in", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
      }, "-=0.8");
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          PORTFOLIO '26
        </span>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 translate-y-[50px] opacity-0 shadow-sm shadow-black/20">
          Ritesh kakade
        </h1>

        <div className="blur-in text-sm md:text-xl text-text-primary/90 mb-6 font-light">
          A <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block min-w-[120px] text-left md:text-center">
            {roles[roleIndex]}
          </span> photographer based in Pune.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Crafting images that speak beyond the frame — finding beauty in light, shadow, and the fleeting moments in between.
        </p>

        <div className="blur-in flex flex-col sm:flex-row gap-4 items-center">
          <button className="group relative px-7 py-3.5 rounded-full text-sm font-medium bg-text-primary text-bg transition-all hover:scale-105 active:scale-95">
            <div className="absolute inset-0 rounded-full accent-gradient p-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-full bg-bg rounded-full" />
            </div>
            <span className="relative z-10 group-hover:text-text-primary transition-colors">View Portfolio</span>
          </button>
          
          <button className="group relative px-7 py-3.5 rounded-full text-sm font-medium border-2 border-stroke bg-bg/50 text-text-primary backdrop-blur-sm transition-all hover:scale-105 active:scale-95 hover:border-transparent">
             <div className="absolute inset-0 rounded-full accent-gradient p-[1px] opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="relative z-10">Book a Session</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-12 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
