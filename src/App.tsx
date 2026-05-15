/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SelectedWorksSection from "./components/SelectedWorksSection";
import JournalSection from "./components/JournalSection";
import ExplorationsSection from "./components/ExplorationsSection";
import ContactFooter from "./components/ContactFooter";
import Lightbox from "./components/Lightbox";
import Cursor from "./components/Cursor";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Stats Section
  const StatsSection = () => (
    <section className="bg-bg py-24 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-display italic mb-4">12+</span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">Years Behind the Lens</span>
        </div>
        <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-display italic mb-4">800+</span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">Sessions Completed</span>
        </div>
        <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-display italic mb-4">24</span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">Awards Received</span>
        </div>
      </div>
    </section>
  );

  return (
    <div className="relative min-h-screen selection:bg-text-primary selection:text-bg">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <SelectedWorksSection onImageClick={(img) => setActiveImage(img)} />
        <JournalSection />
        <ExplorationsSection />
        <StatsSection />
        <ContactFooter />
      </main>

      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
