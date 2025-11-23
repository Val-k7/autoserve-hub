import * as React from "react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, success, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              "absolute left-3 transition-all duration-300 pointer-events-none font-medium",
              isFocused || hasValue || props.value
                ? "-top-2.5 text-xs bg-background px-1 text-primary"
                : "top-2.5 text-sm text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground transition-all duration-300",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-lg focus-visible:shadow-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500/50 focus-visible:border-red-500 focus-visible:shadow-red-500/20",
              success && "border-green-500/50 focus-visible:border-green-500 focus-visible:shadow-green-500/20",
              !error && !success && "border-border",
              label && "pt-4",
              className,
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {/* Validation Icons */}
          {(error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && (
                <AlertCircle className="h-5 w-5 text-red-500 animate-scale-in" />
              )}
              {success && (
                <Check className="h-5 w-5 text-green-500 animate-scale-in" />
              )}
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1 animate-fade-in">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
