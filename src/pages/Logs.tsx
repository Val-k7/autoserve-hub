import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Logs = () => {
  const { logs } = useAppContext();

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-full">
      <div className="container py-8 animate-fade-in">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-3 text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient-shift">
                  Logs système
                </h1>
                <p className="text-muted-foreground text-lg">
                  Activité en temps réel des installations et applications
                </p>
              </div>
              <Button variant="outline" size="lg" className="gap-2">
                <Filter className="h-5 w-5" />
                Filtrer
              </Button>
            </div>
          </div>
        </div>

        {/* Logs Container */}
        <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-500 animate-scale-in depth-3">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-6">
                {logs.map((log, index) => (
                  <div
                    key={log.id}
                    className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Icon with glow */}
                    <div className="relative">
                      <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
                        {getLogIcon(log.type)}
                      </div>
                      <div className="relative p-2 rounded-xl bg-background/50 group-hover:bg-primary/10 transition-all duration-300 depth-2">
                        {getLogIcon(log.type)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant={getLogVariant(log.type)} className="text-xs font-semibold shadow-md px-3 py-1">
                          {log.appName}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono px-3 py-1 rounded-lg bg-background/50 border border-border/30">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed font-medium">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logs;
