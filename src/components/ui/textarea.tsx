import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
  showCounter?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, maxLength, showCounter = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      
      // Auto-resize
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      
      props.onChange?.(e);
    };

    const setRefs = (element: HTMLTextAreaElement) => {
      textareaRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              "absolute left-3 -top-2.5 text-xs bg-background px-1 font-medium transition-colors duration-300 z-10",
              isFocused ? "text-primary" : "text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}
        
        <textarea
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border-2 bg-background px-4 py-3 text-base ring-offset-background transition-all duration-300 resize-none",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-lg focus-visible:shadow-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus-visible:border-red-500 focus-visible:shadow-red-500/20",
            !error && "border-border",
            className,
          )}
          ref={setRefs}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        
        {/* Character Counter */}
        {(showCounter || maxLength) && (
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-mono px-2 py-1 rounded-lg transition-colors duration-300",
                maxLength && charCount > maxLength * 0.9
                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                  : "bg-background/50 text-muted-foreground",
              )}
            >
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </span>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
