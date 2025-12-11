import { Monitor, Glasses, Power } from "lucide-react";
import { AttractButton } from "./AttractButton";
import { cn } from "@/lib/utils";

interface AttractControlsProps {
  isVRMode: boolean;
  onToggleVR?: () => void;
  onExit?: () => void;
  className?: string;
}

/**
 * Overlay controls for Attract Mode
 * Large, readable buttons for shop environment
 * 
 * Layout: Bottom-centered with VR toggle and Exit button
 */
export function AttractControls({
  isVRMode,
  onToggleVR,
  onExit,
  className,
}: AttractControlsProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        "flex flex-col justify-end items-center",
        "p-8 md:p-12 lg:p-16",
        className
      )}
    >
      {/* Main Controls Container */}
      <div className="pointer-events-auto flex flex-col items-center gap-6">
        {/* VR Mode Toggle - Large primary action */}
        <AttractButton
          variant="primary"
          size="large"
          onClick={onToggleVR}
          className="min-w-72 animate-attract-pulse"
        >
          {isVRMode ? (
            <>
              <Glasses className="w-10 h-10" />
              <span>VR MODE</span>
            </>
          ) : (
            <>
              <Monitor className="w-10 h-10" />
              <span>MONITOR MODE</span>
            </>
          )}
        </AttractButton>

        {/* Secondary Controls Row */}
        <div className="flex gap-4">
          <AttractButton
            variant="danger"
            size="default"
            onClick={onExit}
          >
            <Power className="w-6 h-6" />
            <span>EXIT</span>
          </AttractButton>
        </div>
      </div>

      {/* Touch prompt - fades when idle */}
      <p className="mt-8 text-muted-foreground/60 text-lg font-body uppercase tracking-widest animate-attract-fade">
        Touch to Start
      </p>
    </div>
  );
}
