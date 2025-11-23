import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const ActivityTimeline = () => {
  const { logs } = useAppContext();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-500/10 to-emerald-500/10 border-green-500/20';
      case 'error':
        return 'from-red-500/10 to-rose-500/10 border-red-500/20';
      case 'warning':
        return 'from-orange-500/10 to-yellow-500/10 border-orange-500/20';
      default:
        return 'from-blue-500/10 to-cyan-500/10 border-blue-500/20';
    }
  };

  return (
    <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl button-texture-primary">
            <Clock className="h-6 w-6 text-white" />
          </div>
          Activité récente
        </CardTitle>
        <CardDescription className="text-base">
          Historique des événements du système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Aucune activité récente</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={log.id}
                  className={`
                    relative p-4 rounded-xl bg-gradient-to-br border depth-2
                    hover:scale-[1.02] transition-all duration-300 cursor-pointer
                    animate-fade-in
                    ${getBackgroundColor(log.type)}
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Timeline connector */}
                  {index < logs.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-3 bg-gradient-to-b from-border to-transparent" />
                  )}

                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="mt-0.5 flex-shrink-0 p-2 rounded-lg bg-background/50 backdrop-blur-sm">
                      {getIcon(log.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-foreground">{log.appName}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(log.timestamp, {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {log.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
