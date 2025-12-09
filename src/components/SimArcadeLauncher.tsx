import { useState, useEffect, useCallback } from "react";
import { Monitor, Headset } from "lucide-react";
import { ArcadeButton } from "./ArcadeButton";
import { BackgroundSlideshow } from "./BackgroundSlideshow";
import { SecondaryControls } from "./SecondaryControls";
import { toast } from "sonner";
import { startVRMode, startMonitorMode, shutdownApp, checkHealth } from "@/lib/api";

export function SimArcadeLauncher() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  const checkBackendHealth = useCallback(async () => {
    setIsCheckingConnection(true);
    const healthy = await checkHealth();
    setIsConnected(healthy);
    setIsCheckingConnection(false);
  }, []);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 5000);
    return () => clearInterval(interval);
  }, [checkBackendHealth]);

  const handleVRMode = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await startVRMode();
      toast.success("Launching VR Mode...", {
        description: "Prepare your headset!",
      });
    } catch (error) {
      toast.error("Failed to start VR Mode", {
        description: error instanceof Error ? error.message : "Backend not responding",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMonitorMode = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await startMonitorMode();
      toast.success("Launching Monitor Mode...", {
        description: "Starting on display...",
      });
    } catch (error) {
      toast.error("Failed to start Monitor Mode", {
        description: error instanceof Error ? error.message : "Backend not responding",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettings = () => {
    toast.info("Settings", {
      description: "Opening settings panel...",
    });
  };

  const handleExit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await shutdownApp();
      toast.error("Exit", {
        description: "Closing launcher...",
      });
    } catch (error) {
      toast.error("Failed to exit", {
        description: error instanceof Error ? error.message : "Backend not responding",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background slideshow */}
      <BackgroundSlideshow />

      {/* Secondary controls (top-right corner) */}
      <SecondaryControls
        debugMode={false}
        isConnected={isConnected}
        isCheckingConnection={isCheckingConnection}
        onSettingsClick={handleSettings}
        onExitClick={handleExit}
      />

      {/* Main content - centered mode buttons */}
      <main className="relative z-10 flex flex-col items-center gap-8">
        {/* Mode selection buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <ArcadeButton onClick={handleVRMode} variant="primary" disabled={isLoading}>
            <span className="flex items-center gap-4">
              <Headset className="w-10 h-10" />
              VR Mode
            </span>
          </ArcadeButton>

          <ArcadeButton onClick={handleMonitorMode} variant="secondary" disabled={isLoading}>
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
