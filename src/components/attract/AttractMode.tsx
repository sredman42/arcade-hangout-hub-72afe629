import { AttractMediaDisplay } from "./AttractMediaDisplay";
import { AttractControls } from "./AttractControls";
import { cn } from "@/lib/utils";

// Placeholder imports - replace with actual assets
import driftBg1 from "@/assets/drift-bg-1.png";

type MediaMode = "static" | "carousel" | "video";

interface AttractModeProps {
  className?: string;
}

/**
 * Attract Mode - Main orchestrator component
 * 
 * ============================================
 * VISUAL DESIGN NOTES
 * ============================================
 * 
 * COLOR PALETTE (optimized for bright workshop + VR):
 * - Primary: Hot pink/magenta (330° hue) - high visibility
 * - Secondary: Gold/bronze (40° hue) - warm accent
 * - Background: Near-black (5% lightness) - maximum contrast
 * - Text: Pure white on dark, with glow effects
 * 
 * TYPOGRAPHY PAIRING:
 * - Headings/Buttons: font-display (Orbitron) - bold, arcade feel
 * - Body/Labels: font-body (Rajdhani) - readable, technical
 * 
 * SPACING TOKENS:
 * - Touch targets: min 48px (12 tailwind units)
 * - Button gaps: 16-24px (4-6 tailwind units)
 * - Screen padding: 24-56px responsive (6-14 tailwind units)
 * 
 * ============================================
 * STATE PLACEHOLDERS (implement logic later)
 * ============================================
 */
export function AttractMode({ className }: AttractModeProps) {
  // STATE PLACEHOLDERS
  const currentMode: MediaMode = "static";
  const currentImageSrc = driftBg1;
  const videoSrc = "";
  const isVRMode = false;
  const isTransitioning = false;

  // HANDLER PLACEHOLDERS
  const handleToggleVR = () => {
    console.log("Toggle VR Mode");
  };

  const handleExit = () => {
    console.log("Exit Application");
  };

  const handleSettings = () => {
    console.log("Open Settings");
  };

  return (
    <div
      className={cn(
        "relative w-full h-screen overflow-hidden",
        "bg-background",
        // Ensure crisp rendering
        "antialiased",
        className
      )}
    >
      {/* Background Media Layer */}
      <AttractMediaDisplay
        mode={currentMode}
        currentImageSrc={currentImageSrc}
        videoSrc={videoSrc}
        isTransitioning={isTransitioning}
        showControlsBlur={true}
      />

      {/* Controls Overlay */}
      <AttractControls
        isVRMode={isVRMode}
        onToggleVR={handleToggleVR}
        onExit={handleExit}
        onSettings={handleSettings}
        showSettings={false}
      />

      {/* Scanline effect overlay (subtle CRT feel) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.1) 2px, hsl(var(--foreground) / 0.1) 4px)",
          backgroundSize: "100% 4px"
        }}
      />
    </div>
  );
}

/**
 * ============================================
 * IMPLEMENTATION NOTES FOR LOGIC HANDOFF
 * ============================================
 * 
 * 1. IMAGE CAROUSEL LOGIC:
 *    - Create array of image sources
 *    - useEffect with setInterval for rotation (e.g., every 10 seconds)
 *    - Set isTransitioning = true, wait for fade, change index, set false
 * 
 * 2. VIDEO INTERRUPT LOGIC:
 *    - Timer runs in background (30-45 seconds)
 *    - When triggered: fade to video, play, onEnded -> return to carousel
 *    - Reset interrupt timer after video ends
 * 
 * 3. VR TOGGLE:
 *    - Call API: startVRMode() or startMonitorMode() from @/lib/api
 *    - Update isVRMode state
 *    - Show toast feedback
 * 
 * 4. EXIT:
 *    - Call API: shutdownApp() from @/lib/api
 *    - Handle errors with toast
 * 
 * 5. RESPONSIVE SCALING:
 *    - Already handled via Tailwind responsive classes
 *    - Test on 1080p and VR desktop views
 *    - Buttons use min-h for touch targets
 */
