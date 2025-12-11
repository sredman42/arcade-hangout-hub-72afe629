import { cn } from "@/lib/utils";

type MediaMode = "static" | "carousel" | "video";

interface AttractMediaDisplayProps {
  mode: MediaMode;
  currentImageSrc?: string;
  videoSrc?: string;
  isTransitioning?: boolean;
  className?: string;
}

/**
 * Media display area for Attract Mode
 * Supports: static image, image carousel, video playback
 * 
 * Logic to implement later:
 * - Image carousel rotation (every X seconds)
 * - Video interrupt (every 30-45 seconds)
 * - Smooth fade transitions between media
 */
export function AttractMediaDisplay({
  mode,
  currentImageSrc,
  videoSrc,
  isTransitioning = false,
  className,
}: AttractMediaDisplayProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-background", className)}>
      {/* Static Image / Carousel Image Layer */}
      {(mode === "static" || mode === "carousel") && currentImageSrc && (
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat",
            "transition-opacity duration-1000 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundImage: `url(${currentImageSrc})` }}
        />
      )}

      {/* Video Layer */}
      {mode === "video" && videoSrc && (
        <video
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "transition-opacity duration-1000 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          // onEnded callback to implement: switch back to images
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/40" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.5) 100%)",
        }}
      />
    </div>
  );
}
