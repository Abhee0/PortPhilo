import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Capture", "Compose", "Expose"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2700;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextCount = Math.floor(progress * 100);
      
      setCount(nextCount);
      setWordIndex(Math.min(Math.floor(progress * words.length), words.length - 1));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12 overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          LENS
        </motion.span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-end pr-4">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        
        <div className="relative h-[3px] w-full bg-stroke/50 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full accent-gradient"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            style={{ transformOrigin: "left", boxShadow: "0 0 8px rgba(200, 169, 126, 0.35)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
