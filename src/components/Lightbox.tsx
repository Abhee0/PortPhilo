import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  image: string | null;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-6xl w-full h-full flex items-center justify-center pointer-events-none"
          >
            <img
              src={image}
              alt="Work Preview"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-auto"
            />
            
            <button
               onClick={(e) => { e.stopPropagation(); onClose(); }}
               className="absolute top-4 right-4 md:-top-12 md:-right-12 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary hover:bg-stroke transition-colors pointer-events-auto"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
