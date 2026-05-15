import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "500px", href: "#" },
  { name: "Behance", href: "#" },
];

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Video
    const video = videoRef.current;
    if (video) {
        const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
        } else if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        }
    }

    // GSAP Marquee
    const animateMarquee = (el: HTMLElement, direction: number) => {
        gsap.to(el, {
            xPercent: direction * 50,
            duration: 30,
            ease: "none",
            repeat: -1,
        });
    };

    if (marqueeRef1.current) animateMarquee(marqueeRef1.current, -1);
    if (marqueeRef2.current) animateMarquee(marqueeRef2.current, 1);

  }, []);

  return (
    <footer id="contact" className="relative bg-bg pt-24 md:pt-32 pb-8 overflow-hidden min-h-[80vh] flex flex-col justify-between">
      {/* Background flipped video */}
      <div className="absolute inset-x-0 top-0 h-full z-0 opacity-40 grayscale pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Marquee Section */}
      <div className="relative z-10 flex flex-col gap-4 py-8 overflow-hidden">
        <div ref={marqueeRef1} className="whitespace-nowrap flex gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="text-7xl md:text-[10rem] font-display italic text-stroke select-none">
                    CAPTURING LIGHT •
                </span>
            ))}
        </div>
        <div ref={marqueeRef2} className="whitespace-nowrap flex gap-8 -ml-[100%]">
            {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="text-7xl md:text-[10rem] font-display italic text-text-primary/10 select-none">
                    STORYTELLING •
                </span>
            ))}
        </div>
      </div>

      {/* CTA Area */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-normal leading-tight mb-12">
            Let's create something <br /> <span className="font-display italic">extraordinary</span> together.
        </h2>

        <a
          href="mailto:hello@riteshkakade.com"
          className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-medium overflow-hidden"
        >
          <div className="absolute inset-0 accent-gradient p-[2px] opacity-100 group-hover:animate-gradient-shift rounded-full" />
          <div className="absolute inset-[2px] bg-bg rounded-full transition-colors group-hover:bg-transparent" />
          <span className="relative z-10 group-hover:text-bg transition-colors">hello@riteshkakade.com</span>
        </a>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 pt-20 border-t border-stroke flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
            {socialLinks.map(link => (
                <a key={link.name} href={link.href} className="text-xs text-muted hover:text-text-primary transition-colors tracking-widest uppercase">
                    {link.name}
                </a>
            ))}
        </div>

        <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs text-muted font-medium tracking-wide">Available for commissions — 2026</span>
        </div>

        <span className="text-[10px] text-muted opacity-50 uppercase tracking-[0.2em]">
            © 2026 RITESH KAKADE PHOTO. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
