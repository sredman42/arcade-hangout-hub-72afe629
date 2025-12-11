import { cn } from "@/lib/utils";

type MediaMode = "static" | "carousel" | "video";

interface AttractMediaDisplayProps {
  mode: MediaMode;
  currentImageSrc?: string;
  videoSrc?: string;
  isTransitioning?: boolean;
  showControlsBlur?: boolean;
  className?: string;
}

/**
 * Media display area for Attract Mode
 * Supports: static image, image carousel, video playback
 * 
 * Visual Features:
 * - Multi-layer gradient overlays for depth
 * - Optional blur zone behind controls
 * - Mode-specific styling (static vs carousel)
 * - Vignette effect for focus
 * - High contrast for bright workshop lighting
 */
export function AttractMediaDisplay({
  mode,
  currentImageSrc,
  videoSrc,
  isTransitioning = false,
  showControlsBlur = true,
  className,
}: AttractMediaDisplayProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-background", className)}>
      
      {/* ========== STATIC IMAGE MODE ========== */}
      {mode === "static" && currentImageSrc && (
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat",
            "transition-opacity duration-1000 ease-in-out",
            isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100",
            // Static mode: subtle zoom animation potential
            "transform-gpu"
          )}
          style={{ backgroundImage: `url(${currentImageSrc})` }}
        />
      )}

      {/* ========== CAROUSEL IMAGE MODE ========== */}
      {mode === "carousel" && currentImageSrc && (
        <>
          {/* Current image layer */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat",
              "transition-all duration-1000 ease-in-out",
              "transform-gpu",
              isTransitioning 
                ? "opacity-0 scale-[1.02]" 
                : "opacity-100 scale-100"
            )}
            style={{ backgroundImage: `url(${currentImageSrc})` }}
          />
          {/* Carousel indicator accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </>
      )}

      {/* ========== VIDEO MODE ========== */}
      {mode === "video" && videoSrc && (
        <video
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "transition-opacity duration-1000 ease-in-out",
            "transform-gpu",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          src={videoSrc}
          autoPlay
          muted
          playsInline
        />
      )}

      {/* ========== OVERLAY LAYERS ========== */}
      
      {/* Layer 1: Top fade - darken header area */}
      <div 
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background) / 0.7) 0%, transparent 100%)"
        }}
      />

      {/* Layer 2: Bottom gradient - strong fade for controls readability */}
      <div 
        className="absolute inset-x-0 bottom-0 h-96 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.6) 40%, transparent 100%)"
        }}
      />

      {/* Layer 3: Side vignette for focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, hsl(var(--background) / 0.4) 100%)"
        }}
      />

      {/* Layer 4: Subtle color tint based on mode */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none mix-blend-overlay opacity-20",
          mode === "static" && "bg-primary/10",
          mode === "carousel" && "bg-secondary/10",
          mode === "video" && "bg-accent/10"
        )}
      />

      {/* Layer 5: Optional blur zone behind controls */}
      {showControlsBlur && (
        <div 
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none backdrop-blur-sm"
          style={{
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)"
          }}
        />
      )}

      {/* Layer 6: Edge glow accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 100px hsl(var(--primary) / 0.1), inset 0 0 200px hsl(var(--background) / 0.3)"
        }}
      />
    </div>
  );
}
