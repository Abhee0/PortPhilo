import { motion } from "motion/react";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { JOURNAL_ENTRIES } from "@/src/constants";
import PortfolioImage from "./ui/PortfolioImage";

export default function JournalSection() {
  return (
    <section id="journal" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
          </div>

          <button className="flex items-center gap-2 text-sm text-text-primary/70 hover:text-text-primary transition-colors group">
            View all entries
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row md:items-center gap-6 p-4 md:p-6 bg-surface/30 hover:bg-surface border border-stroke rounded-[2rem] md:rounded-full transition-all duration-500 cursor-pointer"
            >
              <div className="w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <PortfolioImage src={entry.image} alt={entry.title} className="w-full h-full" />
              </div>

              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <h3 className="text-lg md:text-xl font-medium flex-1 group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
                  {entry.title}
                </h3>

                <div className="flex items-center gap-6 text-[10px] md:text-xs text-muted uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="opacity-50" />
                    {entry.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="opacity-50" />
                    {entry.readTime}
                  </div>
                </div>
              </div>

              <div className="hidden md:flex w-10 h-10 rounded-full border border-stroke items-center justify-center group-hover:accent-gradient group-hover:border-transparent transition-all duration-500">
                <ArrowRight size={16} className="group-hover:text-bg transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
