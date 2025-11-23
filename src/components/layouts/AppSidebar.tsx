import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
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
  Sparkles,
  Activity,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mainItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Catalogue", url: "/catalog", icon: Store },
  { title: "Logs", url: "/logs", icon: ScrollText },
  { title: "Documentation", url: "/documentation", icon: BookOpen },
];

const adminItems = [
  { title: "Utilisateurs", url: "/users", icon: Users },
  { title: "Configuration", url: "/settings", icon: Settings },
];

type SystemStatus = "operational" | "warning" | "error";

interface SystemMetrics {
  status: SystemStatus;
  uptime: string;
  activeUsers: number;
  activeApps: number;
  lastCheck: Date;
}

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { currentUser, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isCollapsed = state === "collapsed";

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    status: "operational",
    uptime: "99.9%",
    activeUsers: 12,
    activeApps: 8,
    lastCheck: new Date(),
  });

  // Simulate system checks
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      let newStatus: SystemStatus = "operational";

      if (random < 0.05) newStatus = "error";
      else if (random < 0.2) newStatus = "warning";

      setSystemMetrics((prev) => ({
        ...prev,
        status: newStatus,
        lastCheck: new Date(),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnecté",
      description: "À bientôt !",
    });
    navigate("/login");
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
                      ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-md border border-primary/20"
                          : "hover:bg-accent/10 hover:translate-x-1"
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <div
                        className={`
                        p-1.5 rounded-lg transition-all duration-300
                        ${isActive(item.url) ? "bg-primary/20 text-primary" : "group-hover:bg-accent/20"}
                      `}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      {!isCollapsed && isActive(item.url) && <ChevronRight className="h-4 w-4 ml-auto text-primary" />}
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
                          ${
                            isActive(item.url)
                              ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-md border border-primary/20"
                              : "hover:bg-accent/10 hover:translate-x-1"
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center gap-3 w-full">
                          <div
                            className={`
                            p-1.5 rounded-lg transition-all duration-300
                            ${isActive(item.url) ? "bg-primary/20 text-primary" : "group-hover:bg-accent/20"}
                          `}
                          >
                            <item.icon className="h-4 w-4" />
                          </div>
                          {!isCollapsed && <span className="font-medium">{item.title}</span>}
                          {!isCollapsed && isActive(item.url) && <ChevronRight className="h-4 w-4 ml-auto text-primary" />}
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

        {/* System Status Indicator - Multi-level */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 hover:bg-accent/50">
              <div className="relative flex-shrink-0">
                {systemMetrics.status === "operational" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
                  </>
                )}
                {systemMetrics.status === "warning" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-orange-500 animate-ping opacity-75" />
                  </>
                )}
                {systemMetrics.status === "error" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
                  </>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-foreground">État système</p>
                  <p className="text-xs text-muted-foreground">
                    {systemMetrics.status === "operational" && "Opérationnel"}
                    {systemMetrics.status === "warning" && "Attention requise"}
                    {systemMetrics.status === "error" && "Problème détecté"}
                  </p>
                </div>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 glass-card border-primary/20" side="top" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Métriques système
                </h4>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-background/50">
                  {systemMetrics.status === "operational" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  {systemMetrics.status === "warning" && <AlertCircle className="w-3 h-3 text-orange-500" />}
                  {systemMetrics.status === "error" && <AlertCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-xs font-medium">
                    {systemMetrics.status === "operational" && "OK"}
                    {systemMetrics.status === "warning" && "Warning"}
                    {systemMetrics.status === "error" && "Error"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-background/30">
                  <span className="text-xs text-muted-foreground">Disponibilité</span>
                  <span className="text-sm font-semibold text-green-500">{systemMetrics.uptime}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg bg-background/30">
                  <span className="text-xs text-muted-foreground">Utilisateurs actifs</span>
                  <span className="text-sm font-semibold">{systemMetrics.activeUsers}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg bg-background/30">
                  <span className="text-xs text-muted-foreground">Apps en cours</span>
                  <span className="text-sm font-semibold">{systemMetrics.activeApps}</span>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Dernière vérification : {systemMetrics.lastCheck.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        {currentUser && (
          <SidebarMenuButton asChild tooltip={isCollapsed ? "Profil" : undefined} className="hover:bg-accent/10 transition-all duration-300">
            <Link to="/profile" className="flex items-center gap-3 w-full">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <UserCircle className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{currentUser}</p>
                  <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Utilisateur"}</p>
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
          title={isCollapsed ? (theme === "dark" ? "Mode clair" : "Mode sombre") : undefined}
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          {!isCollapsed && <span className="ml-3">{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>}
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
