import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ArcadeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export function ArcadeButton({
  children,
  onClick,
  variant = "primary",
  className,
  disabled = false,
}: ArcadeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative group cursor-pointer transition-all duration-300 ease-out",
        "px-12 py-8 min-w-[280px]",
        "text-3xl font-bold tracking-wider uppercase",
        "rounded-lg border-2",
        "transform hover:scale-105 active:scale-95",
        variant === "primary" && [
          "bg-primary/20 border-primary text-primary-foreground",
          "neon-glow-pink hover:neon-glow-pink-intense",
          "hover:bg-primary/30",
        ],
        variant === "secondary" && [
          "bg-secondary/20 border-secondary text-secondary-foreground",
          "neon-glow-gold hover:shadow-[0_0_20px_hsl(var(--gold)/0.6),0_0_40px_hsl(var(--gold)/0.4),0_0_60px_hsl(var(--gold)/0.3)]",
          "hover:bg-secondary/30",
        ],
        className
      )}
    >
      {/* Inner glow border */}
      <span
        className={cn(
          "absolute inset-1 rounded-md border opacity-50",
          variant === "primary" && "border-primary/50",
          variant === "secondary" && "border-secondary/50"
        )}
      />

      {/* Button text with glow */}
      <span
        className={cn(
          "relative z-10",
          variant === "primary" && "text-glow-pink",
          variant === "secondary" && "text-glow-gold"
        )}
      >
        {children}
      </span>

      {/* Animated pulse ring on hover */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          variant === "primary" && "animate-pulse bg-primary/10",
          variant === "secondary" && "animate-pulse bg-secondary/10"
        )}
      />
    </button>
  );
}
