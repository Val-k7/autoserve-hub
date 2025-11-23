import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-primary/5">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          {/* Global header with trigger */}
          <header className="sticky top-0 z-40 h-14 border-b border-border/40 backdrop-blur-xl bg-background/80 flex items-center px-4 shadow-sm">
            <SidebarTrigger className="hover:bg-accent/50 transition-colors duration-300 rounded-lg">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-lg shadow-green-500/50" />
                <span className="text-sm text-muted-foreground font-medium">
                  Système opérationnel
                </span>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
