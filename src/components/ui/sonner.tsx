import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:glass-card group-[.toaster]:border-2 group-[.toaster]:border-primary/20 group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:depth-3 group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-base",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-primary group-[.toast]:to-accent group-[.toast]:text-white group-[.toast]:shadow-lg group-[.toast]:shadow-primary/50 group-[.toast]:font-semibold group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:hover:opacity-90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl group-[.toast]:px-4",
          closeButton:
            "group-[.toast]:bg-background group-[.toast]:border-2 group-[.toast]:border-border group-[.toast]:text-foreground group-[.toast]:hover:bg-destructive/10 group-[.toast]:hover:border-destructive group-[.toast]:hover:text-destructive group-[.toast]:rounded-xl group-[.toast]:transition-all",
          success:
            "group-[.toaster]:border-green-500/30 group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-green-500/10 group-[.toaster]:to-emerald-500/10 group-[.toaster]:shadow-green-500/20",
          error:
            "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-red-500/10 group-[.toaster]:to-orange-500/10 group-[.toaster]:shadow-red-500/20",
          warning:
            "group-[.toaster]:border-yellow-500/30 group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-yellow-500/10 group-[.toaster]:to-orange-500/10 group-[.toaster]:shadow-yellow-500/20",
          info:
            "group-[.toaster]:border-blue-500/30 group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-blue-500/10 group-[.toaster]:to-cyan-500/10 group-[.toaster]:shadow-blue-500/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
