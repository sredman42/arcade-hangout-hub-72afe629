import { Monitor, Glasses, Power, Settings } from "lucide-react";
import { AttractButton } from "./AttractButton";
import { cn } from "@/lib/utils";

interface AttractControlsProps {
  isVRMode: boolean;
  onToggleVR?: () => void;
  onExit?: () => void;
  onSettings?: () => void;
  showSettings?: boolean;
  className?: string;
}

/**
 * Overlay controls for Attract Mode
 * 
 * Visual Features:
 * - Centered bottom layout with visual balance
 * - Large primary action with pulsing glow
 * - Secondary actions in balanced row
 * - Touch-friendly spacing (min 48px touch targets)
 * - High contrast text with glow for readability
 * 
 * Typography:
 * - Headings: font-display (Orbitron)
 * - Body/Labels: font-body (Rajdhani)
 */
export function AttractControls({
  isVRMode,
  onToggleVR,
  onExit,
  onSettings,
  showSettings = false,
  className,
}: AttractControlsProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        "flex flex-col",
        className
      )}
    >
      {/* ========== TOP BAR - Status/Branding Area ========== */}
      <div className="flex-none p-6 md:p-8 lg:p-10">
        {/* Optional: Add logo or status indicators here */}
      </div>

      {/* ========== SPACER ========== */}
      <div className="flex-1" />

      {/* ========== BOTTOM CONTROLS AREA ========== */}
      <div className="flex-none p-6 md:p-10 lg:p-14">
        <div className="pointer-events-auto flex flex-col items-center gap-8 md:gap-10">
          
          {/* Primary Action: Mode Toggle */}
          <div className="relative">
            {/* Ambient glow behind button */}
            <div 
              className="absolute inset-0 -m-4 rounded-3xl opacity-50 blur-2xl animate-attract-pulse"
              style={{ background: "hsl(var(--primary) / 0.3)" }}
            />
            
            <AttractButton
              variant="primary"
              size="xl"
              onClick={onToggleVR}
              className="relative min-w-80 md:min-w-96"
            >
              {isVRMode ? (
                <>
                  <Glasses />
                  <span className="text-glow-pink">VR MODE</span>
                </>
              ) : (
                <>
                  <Monitor />
                  <span className="text-glow-pink">MONITOR MODE</span>
                </>
              )}
            </AttractButton>
          </div>

          {/* Secondary Actions Row */}
          <div className="flex items-center gap-4 md:gap-6">
            {showSettings && (
              <AttractButton
                variant="secondary"
                size="default"
                onClick={onSettings}
              >
                <Settings />
                <span>SETTINGS</span>
              </AttractButton>
            )}

            <AttractButton
              variant="danger"
              size="default"
              onClick={onExit}
            >
              <Power />
              <span>EXIT</span>
            </AttractButton>
          </div>

          {/* Touch Prompt */}
          <p 
            className={cn(
              "mt-4 font-body text-lg md:text-xl uppercase tracking-[0.3em]",
              "text-muted-foreground/50",
              "animate-attract-fade"
            )}
          >
            Touch to Start
          </p>
        </div>
      </div>

      {/* ========== CORNER ACCENTS ========== */}
      {/* Bottom-left accent */}
      <div 
        className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(135deg, transparent 50%, hsl(var(--primary) / 0.3) 100%)"
        }}
      />
      {/* Bottom-right accent */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(-135deg, transparent 50%, hsl(var(--primary) / 0.3) 100%)"
        }}
      />
    </div>
  );
}
