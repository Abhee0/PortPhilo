import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SELECTED_WORKS } from "@/src/constants";
import { cn } from "@/src/lib/utils";
import PortfolioImage from "./ui/PortfolioImage";

interface SelectedWorksSectionProps {
  onImageClick: (image: string) => void;
}

export default function SelectedWorksSection({ onImageClick }: SelectedWorksSectionProps) {
  return (
    <section id="work" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal leading-tight">
              Featured <span className="font-display italic">series</span>
            </h2>
            <p className="text-muted mt-6 max-w-lg leading-relaxed">
              A curated selection of projects spanning portraiture, landscape, and editorial work.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stroke hover:border-transparent group relative overflow-hidden transition-all duration-500">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] bg-bg rounded-full" />
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium group-hover:translate-x-1 transition-transform">
              View full gallery <ArrowRight size={16} />
            </span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {SELECTED_WORKS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onImageClick(project.image)}
              className={cn(
                "group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer",
                project.colSpan,
                project.aspect
              )}
            >
              {/* Background Image */}
              <PortfolioImage
                src={project.image}
                alt={project.title}
                className="w-full h-full grayscale-[0.1] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 contrast-[1.02] brightness-[0.98] group-hover:brightness-100"
              />
              
              {/* Grain/Halftone Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:4px_4px]" />

              {/* Hover States */}
              <div className="absolute inset-0 bg-bg/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-text-primary text-bg rounded-full relative group/label overflow-hidden">
                      <div className="absolute inset-0 accent-gradient p-[1px] animate-gradient-shift rounded-full" />
                      <div className="absolute inset-[1.5px] bg-white rounded-full" />
                      <span className="relative z-10 text-sm font-medium">
                        View — <span className="font-display italic">{project.title}</span>
                      </span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
