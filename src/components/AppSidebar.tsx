import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Home,
  LayoutDashboard,
  Store,
  ScrollText,
  Settings,
  Users,
  UserCircle,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const mainItems = [
  { title: 'Accueil', url: '/', icon: Home },
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Catalogue', url: '/catalog', icon: Store },
  { title: 'Logs', url: '/logs', icon: ScrollText },
];

const adminItems = [
  { title: 'Utilisateurs', url: '/users', icon: Users },
  { title: 'Configuration', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { currentUser, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast({
      title: 'Déconnecté',
      description: 'À bientôt !',
    });
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-border/40 backdrop-blur-xl bg-background/80">
      <SidebarHeader className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary via-accent to-primary animate-gradient-shift shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AutoServe
              </h1>
              <p className="text-xs text-muted-foreground">Gestion moderne</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "justify-center" : ""}>
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                    className={`
                      group relative overflow-hidden transition-all duration-300
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-md border border-primary/20' 
                        : 'hover:bg-accent/10 hover:translate-x-1'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <div className={`
                        p-1.5 rounded-lg transition-all duration-300
                        ${isActive(item.url) 
                          ? 'bg-primary/20 text-primary' 
                          : 'group-hover:bg-accent/20'
                        }
                      `}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <>
            <Separator className="my-4 bg-border/40" />
            <SidebarGroup>
              <SidebarGroupLabel className={isCollapsed ? "justify-center" : ""}>
                {!isCollapsed && "Administration"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.url)}
                        tooltip={isCollapsed ? item.title : undefined}
                        className={`
                          group relative overflow-hidden transition-all duration-300
                          ${isActive(item.url) 
                            ? 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-md border border-primary/20' 
                            : 'hover:bg-accent/10 hover:translate-x-1'
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center gap-3 w-full">
                          <div className={`
                            p-1.5 rounded-lg transition-all duration-300
                            ${isActive(item.url) 
                              ? 'bg-primary/20 text-primary' 
                              : 'group-hover:bg-accent/20'
                            }
                          `}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {!isCollapsed && isActive(item.url) && (
                            <ChevronRight className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <Separator className="mb-2 bg-border/40" />
        
        {/* System Status Indicator */}
        <div className="mb-3 p-3 rounded-xl glass-card depth-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-lg shadow-green-500/50" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping opacity-75" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">État système</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">Opérationnel</p>
              </div>
            )}
          </div>
        </div>
        
        {/* User Profile */}
        {currentUser && (
          <SidebarMenuButton
            asChild
            tooltip={isCollapsed ? "Profil" : undefined}
            className="hover:bg-accent/10 transition-all duration-300"
          >
            <Link to="/profile" className="flex items-center gap-3 w-full">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <UserCircle className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{currentUser}</p>
                  <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'Utilisateur'}</p>
                </div>
              )}
            </Link>
          </SidebarMenuButton>
        )}

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={toggleTheme}
          className="w-full hover:bg-accent/10 transition-all duration-300"
          title={isCollapsed ? (theme === 'dark' ? 'Mode clair' : 'Mode sombre') : undefined}
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          {!isCollapsed && (
            <span className="ml-3">{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
          )}
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={handleLogout}
          className="w-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
          title={isCollapsed ? "Déconnexion" : undefined}
        >
          <div className="p-1.5 rounded-lg bg-destructive/20">
            <LogOut className="h-4 w-4" />
          </div>
          {!isCollapsed && <span className="ml-3">Déconnexion</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
