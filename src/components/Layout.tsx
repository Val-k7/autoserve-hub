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
      <div className="min-h-screen flex w-full mesh-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          {/* Global header with trigger - enhanced with depth */}
          <header className="sticky top-0 z-40 h-14 border-b border-border/40 backdrop-blur-2xl bg-background/80 flex items-center px-4 depth-3">
            <SidebarTrigger className="hover:bg-accent/50 transition-all duration-300 rounded-xl hover:scale-110 hover:shadow-lg">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 w-fit depth-2">
                <div className="relative">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-lg shadow-green-500/50" />
                  <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
