import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRipple, RippleContainer } from "@/components/ui/ripple";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary via-primary to-accent text-white shadow-md hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-100 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        destructive: "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-100 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        outline: "border-2 border-primary/30 bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        secondary: "bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-secondary-foreground shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground hover:shadow-sm hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 animate-gradient-shift",
        success: "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-100 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disableRipple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disableRipple = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Determine ripple color based on variant
    const getRippleColor = () => {
      switch (variant) {
        case 'destructive':
          return 'rgba(239, 68, 68, 0.4)';
        case 'success':
          return 'rgba(34, 197, 94, 0.4)';
        case 'premium':
          return 'rgba(168, 85, 247, 0.4)';
        case 'outline':
          return 'rgba(59, 130, 246, 0.3)';
        case 'ghost':
          return 'rgba(59, 130, 246, 0.2)';
        default:
          return 'rgba(255, 255, 255, 0.4)';
      }
    };
    
    const { ripples, addRipple, duration, color } = useRipple(getRippleColor());
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        addRipple(e);
      }
      onClick?.(e);
    };
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }))} 
        ref={ref} 
        onClick={handleClick}
        {...props}
      >
        {!disableRipple && <RippleContainer ripples={ripples} duration={duration} color={color} />}
        {props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
