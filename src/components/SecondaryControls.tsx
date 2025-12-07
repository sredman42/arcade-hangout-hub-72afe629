import { Settings, X, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryControlsProps {
  debugMode?: boolean;
  onSettingsClick?: () => void;
  onExitClick?: () => void;
}

export function SecondaryControls({
  debugMode = false,
  onSettingsClick,
  onExitClick,
}: SecondaryControlsProps) {
  return (
    <div className="fixed top-6 right-6 flex items-center gap-4 z-50">
      {/* Debug Indicator */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-all",
          debugMode
            ? "border-primary bg-primary/20 text-primary neon-glow-pink"
            : "border-muted-foreground/30 bg-muted/30 text-muted-foreground"
        )}
      >
        <Bug className="w-4 h-4" />
        <span>DEBUG {debugMode ? "ON" : "OFF"}</span>
      </div>

      {/* Settings Button */}
      <button
        onClick={onSettingsClick}
        className={cn(
          "p-3 rounded-md border border-secondary/50 bg-secondary/10",
          "text-secondary hover:bg-secondary/20 hover:border-secondary",
          "transition-all duration-200 hover:neon-glow-gold"
        )}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Exit Button */}
      <button
        onClick={onExitClick}
        className={cn(
          "p-3 rounded-md border border-destructive/50 bg-destructive/10",
          "text-destructive hover:bg-destructive/20 hover:border-destructive",
          "transition-all duration-200",
          "hover:shadow-[0_0_15px_hsl(0_84%_60%/0.5)]"
        )}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
