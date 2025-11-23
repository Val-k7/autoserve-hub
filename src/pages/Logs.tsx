import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Logs système
          </h1>
          <p className="text-muted-foreground text-lg">
            Activité en temps réel des installations et applications
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scale-in">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-6">
                {logs.map((log, index) => (
                  <div
                    key={log.id}
                    className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-md"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="mt-0.5 p-2 rounded-lg bg-background/50 group-hover:bg-primary/10 transition-colors">
                      {getLogIcon(log.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant={getLogVariant(log.type)} className="text-xs font-medium shadow-sm">
                          {log.appName}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{log.message}</p>
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
