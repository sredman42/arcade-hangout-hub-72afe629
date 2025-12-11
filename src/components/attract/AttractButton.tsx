import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AttractButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "default" | "large";
  className?: string;
  disabled?: boolean;
}

/**
 * Large, touch-friendly button for Attract Mode
 * Designed for shop environments with mixed lighting
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
    primary: "bg-primary/20 border-primary text-primary hover:bg-primary/30 hover:shadow-attract-primary",
    secondary: "bg-secondary/20 border-secondary text-secondary-foreground hover:bg-secondary/30 hover:shadow-attract-secondary",
    danger: "bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30",
  };

  const sizeStyles = {
    default: "min-h-16 px-8 py-4 text-xl",
    large: "min-h-24 px-12 py-6 text-3xl",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        "relative flex items-center justify-center gap-3",
        "font-display font-bold uppercase tracking-wider",
        "border-2 rounded-lg",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Touch-friendly sizing
        "touch-manipulation select-none",
        // Variant and size
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
}
