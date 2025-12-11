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
 * Features to implement:
 * 1. Static image display
 * 2. Image carousel (rotate every X seconds)
 * 3. Video interrupt (every 30-45 seconds, then return to images)
 * 4. VR toggle button
 * 5. Exit/Quit button
 * 
 * State to manage:
 * - currentMode: "static" | "carousel" | "video"
 * - currentImageIndex: number
 * - isVRMode: boolean
 * - isTransitioning: boolean
 * 
 * Timers to implement:
 * - Carousel rotation timer
 * - Video interrupt timer
 * - Idle timeout (optional)
 */
export function AttractMode({ className }: AttractModeProps) {
  // ============================================
  // STATE PLACEHOLDERS (implement logic later)
  // ============================================
  const currentMode: MediaMode = "static"; // TODO: Manage mode switching
  const currentImageSrc = driftBg1; // TODO: Cycle through images array
  const videoSrc = ""; // TODO: Add video source
  const isVRMode = false; // TODO: VR mode toggle state
  const isTransitioning = false; // TODO: Transition state

  // ============================================
  // HANDLERS (implement logic later)
  // ============================================
  const handleToggleVR = () => {
    // TODO: Toggle VR mode, call API
    console.log("Toggle VR Mode");
  };

  const handleExit = () => {
    // TODO: Exit application, call shutdown API
    console.log("Exit Application");
  };

  return (
    <div
      className={cn(
        "relative w-full h-screen overflow-hidden",
        "bg-background",
        className
      )}
    >
      {/* Background Media Layer */}
      <AttractMediaDisplay
        mode={currentMode}
        currentImageSrc={currentImageSrc}
        videoSrc={videoSrc}
        isTransitioning={isTransitioning}
      />

      {/* Controls Overlay */}
      <AttractControls
        isVRMode={isVRMode}
        onToggleVR={handleToggleVR}
        onExit={handleExit}
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
