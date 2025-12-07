import { Monitor, Headset } from "lucide-react";
import { ArcadeButton } from "./ArcadeButton";
import { BackgroundSlideshow } from "./BackgroundSlideshow";
import { SecondaryControls } from "./SecondaryControls";
import { toast } from "sonner";

export function SimArcadeLauncher() {
  const handleVRMode = () => {
    toast.success("Launching VR Mode...", {
      description: "Prepare your headset!",
    });
  };

  const handleMonitorMode = () => {
    toast.success("Launching Monitor Mode...", {
      description: "Starting on display...",
    });
  };

  const handleSettings = () => {
    toast.info("Settings", {
      description: "Opening settings panel...",
    });
  };

  const handleExit = () => {
    toast.error("Exit", {
      description: "Closing launcher...",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background slideshow */}
      <BackgroundSlideshow />

      {/* Secondary controls (top-right corner) */}
      <SecondaryControls
        debugMode={false}
        onSettingsClick={handleSettings}
        onExitClick={handleExit}
      />

      {/* Main content - centered mode buttons */}
      <main className="relative z-10 flex flex-col items-center gap-8">
        {/* Mode selection buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <ArcadeButton onClick={handleVRMode} variant="primary">
            <span className="flex items-center gap-4">
              <Headset className="w-10 h-10" />
              VR Mode
            </span>
          </ArcadeButton>

          <ArcadeButton onClick={handleMonitorMode} variant="secondary">
            <span className="flex items-center gap-4">
              <Monitor className="w-10 h-10" />
              Monitor Mode
            </span>
          </ArcadeButton>
        </div>
      </main>
    </div>
  );
}
