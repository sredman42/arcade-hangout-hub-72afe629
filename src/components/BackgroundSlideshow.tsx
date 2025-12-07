import { useState, useEffect } from "react";
import driftBg1 from "@/assets/drift-bg-1.png";
import driftBg2 from "@/assets/drift-bg-2.png";
import driftBg3 from "@/assets/drift-bg-3.png";

const backgrounds = [driftBg1, driftBg2, driftBg3];
const SLIDE_DURATION = 30000; // 30 seconds per slide

export function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 1000); // Fade duration
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Current background */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
      />

      {/* Next background (for smooth transition) */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${backgrounds[(currentIndex + 1) % backgrounds.length]})`,
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-overlay" />
      
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 5% / 0.6) 100%)"
        }}
      />
    </div>
  );
}
