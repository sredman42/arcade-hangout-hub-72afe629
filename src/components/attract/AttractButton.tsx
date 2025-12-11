import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AttractButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "default" | "large" | "xl";
  className?: string;
  disabled?: boolean;
}

/**
 * Large, touch-friendly arcade button for Attract Mode
 * Designed for shop environments with mixed lighting
 * 
 * Visual Features:
 * - Glowing edge borders with neon effect
 * - Pressed state with inset shadow
 * - Hover/focus glow intensification
 * - High contrast for visibility
 */
export function AttractButton({
  children,
  onClick,
  variant = "primary",
  size = "default",
  className,
  disabled = false,
}: AttractButtonProps) {
  const variantStyles = {
    primary: cn(
      // Base state - hot pink neon
      "bg-gradient-to-b from-primary/30 to-primary/10",
      "border-2 border-primary/80",
      "text-primary-foreground",
      "shadow-[0_0_20px_hsl(var(--primary)/0.4),inset_0_1px_0_hsl(var(--primary-foreground)/0.1)]",
      // Hover - intensify glow
      "hover:bg-gradient-to-b hover:from-primary/40 hover:to-primary/20",
      "hover:border-primary",
      "hover:shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--primary)/0.3),inset_0_1px_0_hsl(var(--primary-foreground)/0.2)]",
      // Focus - ring glow
      "focus:ring-4 focus:ring-primary/40",
      // Active/Pressed - inset effect
      "active:bg-gradient-to-b active:from-primary/20 active:to-primary/30",
      "active:shadow-[inset_0_4px_12px_hsl(var(--background)/0.5),0_0_20px_hsl(var(--primary)/0.5)]",
      "active:translate-y-0.5"
    ),
    secondary: cn(
      // Base state - gold/bronze
      "bg-gradient-to-b from-secondary/30 to-secondary/10",
      "border-2 border-secondary/80",
      "text-secondary-foreground",
      "shadow-[0_0_15px_hsl(var(--secondary)/0.3),inset_0_1px_0_hsl(var(--secondary-foreground)/0.1)]",
      // Hover
      "hover:bg-gradient-to-b hover:from-secondary/40 hover:to-secondary/20",
      "hover:border-secondary",
      "hover:shadow-[0_0_25px_hsl(var(--secondary)/0.5),0_0_50px_hsl(var(--secondary)/0.2)]",
      // Focus
      "focus:ring-4 focus:ring-secondary/40",
      // Active
      "active:bg-gradient-to-b active:from-secondary/20 active:to-secondary/30",
      "active:shadow-[inset_0_4px_12px_hsl(var(--background)/0.5)]",
      "active:translate-y-0.5"
    ),
    danger: cn(
      // Base state - destructive red
      "bg-gradient-to-b from-destructive/25 to-destructive/10",
      "border-2 border-destructive/70",
      "text-destructive-foreground",
      "shadow-[0_0_15px_hsl(var(--destructive)/0.3)]",
      // Hover
      "hover:bg-gradient-to-b hover:from-destructive/35 hover:to-destructive/15",
      "hover:border-destructive",
      "hover:shadow-[0_0_25px_hsl(var(--destructive)/0.5)]",
      // Focus
      "focus:ring-4 focus:ring-destructive/40",
      // Active
      "active:bg-gradient-to-b active:from-destructive/15 active:to-destructive/25",
      "active:shadow-[inset_0_4px_12px_hsl(var(--background)/0.5)]",
      "active:translate-y-0.5"
    ),
  };

  const sizeStyles = {
    default: "min-h-16 px-8 py-4 text-xl gap-3",
    large: "min-h-24 px-12 py-6 text-2xl md:text-3xl gap-4",
    xl: "min-h-32 px-16 py-8 text-3xl md:text-4xl gap-5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base layout
        "relative flex items-center justify-center",
        "font-display font-bold uppercase tracking-wider",
        "rounded-xl",
        // Smooth transitions
        "transition-all duration-200 ease-out",
        "transform-gpu will-change-transform",
        // Focus outline removal (using ring instead)
        "outline-none",
        // Disabled state
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none",
        "disabled:shadow-none disabled:hover:shadow-none",
        // Touch-friendly
        "touch-manipulation select-none",
        // Icon sizing within button
        "[&_svg]:w-[1.2em] [&_svg]:h-[1.2em] [&_svg]:shrink-0",
        // Variant and size styles
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {/* Inner highlight line */}
      <span 
        className={cn(
          "absolute inset-x-3 top-1 h-px rounded-full opacity-40",
          variant === "primary" && "bg-gradient-to-r from-transparent via-primary-foreground to-transparent",
          variant === "secondary" && "bg-gradient-to-r from-transparent via-secondary-foreground to-transparent",
          variant === "danger" && "bg-gradient-to-r from-transparent via-destructive-foreground to-transparent"
        )}
      />
      {children}
    </button>
  );
}
