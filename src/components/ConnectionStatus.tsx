import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
  isChecking: boolean;
}

export function ConnectionStatus({ isConnected, isChecking }: ConnectionStatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-all",
        isChecking
          ? "border-muted-foreground/30 bg-muted/30 text-muted-foreground"
          : isConnected
          ? "border-primary/50 bg-primary/20 text-primary neon-glow-pink"
          : "border-destructive/50 bg-destructive/20 text-destructive"
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          isChecking
            ? "bg-muted-foreground animate-pulse"
            : isConnected
            ? "bg-primary"
            : "bg-destructive"
        )}
      />
      <span>
        {isChecking ? "Checking..." : isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}
